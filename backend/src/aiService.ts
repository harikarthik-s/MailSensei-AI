import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from './config';

const MODEL_NAME = "gemini-pro";
const API_KEY = config.google.apiKey || 'default_api_key'; // Provide a default or handle undefined

if (!API_KEY) {
  throw new Error('API_KEY is undefined');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

type RetryableFunction = () => Promise<any>;

const withExponentialBackoff = async (
  fn: RetryableFunction,
  retries = 5,
  initialDelay = 1000
): Promise<any> => {
  let delay = initialDelay;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      if (
        error.code === 8 || // RESOURCE_EXHAUSTED
        error.code === 'insufficient_quota'
      ) {
        if (attempt === retries - 1) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      } else {
        throw error;
      }
    }
  }
};

export const categorizeEmail = async (subject: string, content: string): Promise<string> => {
  const categorize: RetryableFunction = async () => {
    const prompt = `You are an AI assistant that categorizes emails. Categorize the email as either 'Interested', 'Not Interested', or 'More Information'. Respond with only the category.\n\nSubject: ${subject}\n\nContent: ${content}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = (await response.text()).trim();

    return text || 'Uncategorized';
  };

  try {
    const category = await withExponentialBackoff(categorize);
    console.log('Categorized as:', category);
    return category;
  } catch (error) {
    console.error('Error in categorizeEmail:', error);
    return 'Uncategorized';
  }
};

export const generateResponse = async (category: string, subject: string, content: string): Promise<string> => {
  const generate: RetryableFunction = async () => {
    let prompt = '';
    if (category === 'Interested') {
      prompt = `You are a helpful assistant responding to an email that shows interest. The sender is interested to know more. Respond by asking if they are willing to hop on to a demo call by suggesting a time.\n\nCategory: ${category}\nSubject: ${subject}\n\nContent: ${content}\n\nGenerate a response:`;
    } else if (category === 'Not Interested') {
      prompt = `You are a helpful assistant responding to an email that shows disinterest. Thank them for their time and let them know they can reach out in the future if they change their mind.\n\nCategory: ${category}\nSubject: ${subject}\n\nContent: ${content}\n\nGenerate a response:`;
    } else if (category === 'More Information') {
      prompt = `You are a helpful assistant responding to an email that requests more information. Provide additional details or documentation and offer to answer any further questions.\n\nCategory: ${category}\nSubject: ${subject}\n\nContent: ${content}\n\nGenerate a response:`;
    }
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = (await response.text()).trim();

    return text || 'No response generated';
  };

  try {
    const response = await withExponentialBackoff(generate);
    console.log('Generated response:', response);
    return response;
  } catch (error) {
    console.error('Error in generateResponse:', error);
    return 'No response generated';
  }
};
