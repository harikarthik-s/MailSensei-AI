# MailSensei-AI - A ReachInBox Backend Task

## Overview
MailSensei-AI is an intelligent email management tool designed to parse and analyze emails from Google and Outlook accounts. It uses AI to understand the context of emails, automatically categorizes them, and provides automated responses based on the content. The tool integrates OAuth for secure access to Gmail and Outlook, and utilizes BullMQ for efficient task scheduling. Built with TypeScript, this tool is an automation that requires minimal manual intervention.

## Features
- **OAuth Integration**: Securely connect Google and Outlook accounts.
- **AI-Powered Context Understanding**: Leverage OpenAI to comprehend the content of incoming emails.
- **Automatic Labeling**: Emails are categorized into:
  - Interested
  - Not Interested
  - More Information
- **Automated Responses**: Context-based replies are generated and sent automatically.
- **Task Scheduling**: BullMQ is used to manage and schedule tasks efficiently.

## Media
- **Video Explanation**:
  https://drive.google.com/file/d/1WKATlqZH6oRv4s_JqIVFp6tcqoDClVVX/view?usp=drive_link
  
- **Screenshots**: 
  ![Frontend Login Screen](https://github.com/user-attachments/assets/e52ce5c8-f700-406d-9107-dd15d96a66a7)
  ![Oauth](https://github.com/user-attachments/assets/be45b8fd-dbf8-441f-a966-ff736f282379)
  ![Process email Endpoint](https://github.com/user-attachments/assets/11c24088-905d-4e6f-87f0-b339bb9cd07f)
  ![mailinbox](https://github.com/user-attachments/assets/ac304afe-ed8e-4078-8ab1-9e803a7059a7)
  ![Automated AI response](https://github.com/user-attachments/assets/4299b5a9-3ac2-475e-9b9d-b29313830f6d)

## Prerequisites
- Node.js
- npm
- Redis server (for BullMQ)
- Google Cloud Console account (for Gmail OAuth setup)
- Azure Portal account (for Outlook OAuth setup)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/harikarthik-s/MailSensei-AI.git
cd MailSensei-AI
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add the following:

```plaintext
# Gmail Configuration
GMAIL_CLIENT_ID=your-gmail-client-id
GMAIL_CLIENT_SECRET=your-gmail-client-secret
GMAIL_REDIRECT_URI=http://localhost:3000/oauth2callback
GMAIL_REFRESH_TOKEN=your-gmail-refresh-token

# Outlook Configuration
OUTLOOK_CLIENT_ID=your-outlook-client-id
OUTLOOK_CLIENT_SECRET=your-outlook-client-secret
OUTLOOK_TENANT_ID=your-outlook-tenant-id
OUTLOOK_REDIRECT_URI=http://localhost:3000/auth/callback

# OpenAI Configuration
GEMINI_API_KEY=your-geminiAI-api-key

# BullMQ Configuration
REDIS_HOST=your-redis-host
REDIS_PORT=your-redis-port
REDIS_PASSWORD=your-redis-password
```

### 3. Set Up OAuth Credentials

#### For Gmail:
- Set up OAuth 2.0 credentials in the Google Cloud Console.
- Use the above values for `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, and `GMAIL_REDIRECT_URI`.

#### For Outlook:
- Register an application in the Azure Portal.
- Configure the necessary permissions and use the above values for `OUTLOOK_CLIENT_ID`, `OUTLOOK_CLIENT_SECRET`, `OUTLOOK_TENANT_ID`, and `OUTLOOK_REDIRECT_URI`.

### 4. Run the Backend
```bash
cd backend
npm install
npm start
```

### 5. Run the Frontend
```bash
cd frontend
npm install
npm start
```

### 6. Authenticate Email Accounts
- **Gmail**: Visit [http://localhost:3000/auth/gmail](http://localhost:3000/auth/gmail) or [http://localhost:3000/auth](http://localhost:3000/auth).
- **Outlook**: Visit [http://localhost:3000/auth/outlook](http://localhost:3000/auth/outlook).

### 7. Process Emails
- **Gmail**: [http://localhost:3000/process-email/gmail](http://localhost:3000/process-email/gmail)
- **Outlook**: [http://localhost:3000/process-email/outlook](http://localhost:3000/process-email/outlook)

## Live Demo
During the assignment review, demonstrate the following:
1. Connecting new email accounts for both Google and Outlook using OAuth.
2. Sending an email to these accounts from another account.
3. Showcasing the tool reading incoming emails to the connected accounts.
4. Categorizing the email based on the content and assigning a label (Interested, Not Interested, More Information).
5. The tool should then suggest and send an appropriate response based on the content.

## Additional Resources
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Microsoft Outlook OAuth Documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow)

