import { useState, useRef, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { HiSparkles } from "react-icons/hi2";
import { RiRobot2Fill } from "react-icons/ri";
import { TypeAnimation } from 'react-type-animation';
import { MdEmojiEmotions } from "react-icons/md";
import { AiFillAudio } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";

const Home = () => {
    const [chatHistory, setchatHistory] = useState([]);
    const chatBodyRef = useRef();
    const msgRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const msg = msgRef.current.value.trim();
        if (!msg) return;
        msgRef.current.value = ""

        setchatHistory((history) => [...history, { role: "user", text: msg }]);

        setTimeout(() => {
            setchatHistory((history) => [...history, { role: "model", text: "Thinking..." }])

            generateBotResponse([...chatHistory, { role: "user", text: msg }]);
        }, 600);
    }

    const generateBotResponse = async (history) => {
        const updateHistory = (text) => {
            setchatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text }]);
        }

        history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

        const requestOptions = {
            "method": "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: history })
        }

        try {
            const response = await fetch(import.meta.env.VITE_API_URL, requestOptions)
            const data = await response.json();
            if (!response.ok) throw new Error(data.error.message || "Something went wrong...")

            const responseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
            updateHistory(responseText);
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }, [chatHistory])

    return (
        <>
            <div className="container relative w-full sm:w-[80%] lg:w-[60%] rounded-xl bg-gray-200 dark:bg-[#1f1e1e] mx-auto bord h-[88vh] flex flex-col">
                <div className="header text-black dark:text-neutral-200 border-b border-gray-700 flex px-4 py-4 items-center w-full justify-between mb-7">
                    <h3 className="flex items-center max-sm:mx-auto max-sm:text-sm gap-2">
                        AI Chatbot using Google Gemini
                        <HiSparkles />
                    </h3>

                    <div className="text-sm cursor-pointer max-sm:hidden font-semibold hover:underline">Version - 1.2</div>
                </div>


                <div ref={chatBodyRef} className="flex-1 overflow-y-auto p-4">
                    <div className="flex gap-1">
                        <div className="ai-icon h-10 w-10 flex items-center justify-center rounded-full text-black dark:text-neutral-200 bg-gray-300 dark:bg-[#2d2d2d]">
                            <RiRobot2Fill size={20} />
                        </div>
                        <div className="chat-message text-white bg-gray-500 dark:bg-gray-700 w-fit text-wrap p-3 rounded-lg mb-7">
                            <TypeAnimation
                                sequence={['Hello! How can I assist you today? I am Google Gemini.', 1000]}
                                speed={80}
                                cursor={false}
                                wrapper="span"
                                repeat={Infinity}
                            />
                        </div>
                    </div>

                    {chatHistory.map((chat, index) => (
                        chat.role === "model" ? (
                            /* Bot Message */
                            <div key={index} className="flex gap-1">
                                <div className="ai-icon h-10 w-10 flex items-center justify-center rounded-full text-black dark:text-neutral-200 bg-gray-300 dark:bg-[#2d2d2d]">
                                    <RiRobot2Fill size={20} />
                                </div>
                                <div className="chat-message text-white bg-gray-500 dark:bg-gray-700 w-fit text-wrap p-3 rounded-lg mb-7">{chat.text}</div>
                            </div>
                        ) : (
                            /* User Message */
                            <div key={index} className="flex justify-end">
                                <div className="chat-message text-white bg-blue-600 w-fit text-wrap p-3 rounded-lg mb-10">
                                    {chat.text}
                                </div>
                            </div>
                        )
                    ))}
                </div>

                <form className="message relative bottom-0 bg-gray-200 dark:bg-[#1f1e1e] px-3 py-3" onSubmit={handleSubmit}>
                    <input ref={msgRef} className="input w-full px-3 py-6 rounded-lg bg-transparent border border-gray-500 text-black dark:text-white" type="text" name="text" placeholder="What's on your mind?" />

                    <div className="flex send items-center gap-4 absolute right-7 top-8">
                        <IoIosSend size={27} className="text-black dark:text-white cursor-pointer" />
                        <MdEmojiEmotions size={27} className="max-sm:hidden block text-black dark:text-white cursor-pointer"/>
                        <AiFillAudio size={27} className="max-sm:hidden block text-black dark:text-white cursor-pointer"/>
                        <HiDotsHorizontal size={27} className="max-sm:block hidden text-black dark:text-white cursor-pointer"/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Home
