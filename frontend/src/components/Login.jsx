import React from "react";
import { motion } from "framer-motion";
import Gmail from "../img/gmail.svg";
import Outlook from "../img/outlook.svg";

const Login = () => {

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:3000/auth/gmail";
    };

    const handleOutlookLogin = () => {
        window.location.href = "http://localhost:3000/auth/outlook";
    };

    

    return (
         <div className="w-screen h-screen" style={{ backgroundColor: '#10151d' }}>
            <motion.div
                className="text-lg h-[-20%] font-light flex justify-center pt-10 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            >
                A ReachInBox Task
            </motion.div>
            <motion.div
                className="text-8xl h-[30%] font-semibold flex flex-col justify-end pb-10 items-center text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                MailSensei AI
            </motion.div>
            <motion.div
                className="text-lg font-light flex justify-center pt-20 pb-3 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            >
                Get started with:
            </motion.div>
            <div className="w-full flex flex-row justify-center gap-8 h-[40%]">
                <motion.button
                    onClick={handleGoogleLogin}
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
                    className="bg-[#603bce] hover:bg-[#a77ff9] text-white rounded-xl w-60 font-semibold h-20 flex flex-row justify-center"
                >
                    <span className="mt-6 mr-3 ">Gmail</span>
                    <img src={Gmail} alt="Gmail logo" className="mt-6 w-6 h-6" />
                </motion.button>
                <motion.button
                    onClick={handleOutlookLogin}
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
                    className="bg-[#603bce]  hover:bg-[#a77ff9] text-white rounded-xl w-60 font-semibold h-20 flex flex-row justify-center"
                >
                    <span className="mt-6 mr-3 ">Outlook</span>
                    <img src={Outlook} alt="Outlook logo" className="mt-6 w-6 h-6 " />
                </motion.button>
            </div>
        </div>
    );
}

export default Login;
