import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RiSendPlaneFill, RiCodeSSlashLine, RiStarFill, RiArrowLeftLine } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from "socket.io-client"
import MonacoEditor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown"

const Collaboration = () => {

            const [socket, setSocketIo] = useState(null);
            const { id, name } = useParams();
            const [chatInput, setChatInput] = useState('');
            const [codeInput, setCodeInput] = useState('// Write your code here\nconsole.log("Hello, World!");');
            const [reviews, setReviews] = useState([
                        { id: 1, user: 'Charlie', rating: 4, comment: 'Great work, but needs more comments in code.' },
            ]);
            const [reviewComment, setReviewComment] = useState('');
            const [isLoading, setIsLoading] = useState(false)
            const [reviewRating, setReviewRating] = useState(5);
            const [chatMessages, setChatMessages] = useState([
                        { id: 1, user: 'Alice', text: 'Hey, how’s the project going?' },
                        { id: 2, user: 'Bob', text: 'Working on the backend now!' },
            ]);

            const navigate = useNavigate();

            // Handle chat message submission
            const handleChatSubmit = (e) => {
                        e.preventDefault();
                        if (chatInput.trim()) {
                                    // setChatMessages(prev => [...prev, { id: prev.length + 1, user: null, text: chatInput }])
                                    socket.emit("chat-message", chatInput)
                                    setChatInput('');
                        }
            };

            // Handle review submission
            const handleReviewSubmit = (e) => {
                        e.preventDefault();
                        if (reviewComment.trim()) {
                                    setReviews([...reviews, { id: reviews.length + 1, user: 'You', rating: reviewRating, comment: reviewComment }]);
                                    setReviewComment('');
                                    setReviewRating(5);
                        }
            };


            const handleCodeChange = (value) => {
                        setCodeInput(value);
                        socket.emit("code-change", value)
            }



            useEffect(() => {
                        const socketInstance = io("http://localhost:3000", {
                                    query: {
                                                project: id
                                    }
                        });
                        setSocketIo(socketInstance)

                        // socketInstance.emit("chat-history")
                        // socketInstance.on("chat-history", (message) => {
                        //             setChatMessages(prevMessage => [...prevMessage, ...message]);
                        // })

                        socketInstance.emit("get-code-change")
                        socketInstance.on("get-code-changes", (data) => {
                                    setCodeInput(data)
                        });

                        socketInstance.on("user-message", (message) => {
                                    // console.log(message)
                                    // { id: prevMessage.length + 1, user: message.user, text: message.text }
                                    setChatMessages(prevMessage => [...prevMessage, { id: prevMessage.length + 1, user: null, text: message }]);
                        });


                        socketInstance.on("code-changes", (data) => {
                                    console.log("code-change", data)
                                    setCodeInput(data)
                        })

                        socketInstance.on("get-review", (code) => {
                                    setReviewComment(code)
                                    setIsLoading(false)
                        })
                        return () => {

                                    socketInstance.disconnect()
                                    socketInstance.off("user-message");
                        }

            }, [])


            const getReviewCode = () => {
                        setIsLoading(true)
                        socket.emit("get-review", codeInput);
            }

            return (
                        <div className=" bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
                                    <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.1 }}
                                                className="max-w-7xl mx-auto"
                                    >

                                                <h1 className="text-4xl font-bold text-gray-800 mb-5 text-center flex justify-between">
                                                            <motion.button
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        onClick={() => navigate('/')}
                                                                        className="mr-3 p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition-all duration-200"
                                                                        aria-label="Go back to homepage"
                                                            >
                                                                        <RiArrowLeftLine className="w-6 h-6" />
                                                            </motion.button>Collaboration Hub

                                                            <span className="self-end text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-800 hover:to-indigo-800 transition duration-300 transform hover:scale-105 bg-white bg-opacity-20 backdrop-blur-md px-3 py-1 rounded-lg animate-fade-in md:text-2xl sm:text-xl">
                                                                        {name}
                                                            </span>
                                                </h1>
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                                            {/* Chat Section */}
                                                            <motion.div
                                                                        initial={{ opacity: 0, x: -20 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ duration: 0.1, delay: 0.1 }}
                                                                        className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-[600px]"
                                                            >
                                                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                                                                    <RiSendPlaneFill className="w-6 h-6 mr-2 text-indigo-600" />
                                                                                    Chat
                                                                        </h2>
                                                                        <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
                                                                                    {chatMessages.map((message) => (
                                                                                                <div key={message.id} className={`mb-3 ${message.user === 'You' ? 'text-right' : 'text-left'}`}>
                                                                                                            <p className="text-sm font-medium text-gray-700">{message.user}</p>
                                                                                                            <p className={`inline-block px-4 py-2 rounded-lg ${message.user === 'You' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                                                                                                        {message.text}
                                                                                                            </p>
                                                                                                </div>
                                                                                    ))}
                                                                        </div>
                                                                        <div className="flex items-center">
                                                                                    <input
                                                                                                type="text"
                                                                                                value={chatInput}
                                                                                                onChange={(e) => setChatInput(e.target.value)}
                                                                                                placeholder="Type a message..."
                                                                                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-gray-700 placeholder-gray-400"
                                                                                    />
                                                                                    <motion.button
                                                                                                whileHover={{ scale: 1.05 }}
                                                                                                whileTap={{ scale: 0.95 }}
                                                                                                onClick={handleChatSubmit}
                                                                                                disabled={!chatInput.trim()}
                                                                                                className="ml-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
                                                                                    >
                                                                                                <RiSendPlaneFill className="w-5 h-5" />
                                                                                    </motion.button>
                                                                        </div>
                                                            </motion.div>

                                                            {/* Code Section */}
                                                            <motion.div
                                                                        initial={{ opacity: 0, y: 20 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ duration: 0.1, delay: 0.2 }}
                                                                        className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-[600px]"
                                                            >
                                                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                                                                    <RiCodeSSlashLine className="w-6 h-6 mr-2 text-indigo-600" />
                                                                                    Code
                                                                        </h2>
                                                                        <MonacoEditor
                                                                                    height="100%"
                                                                                    defaultLanguage="javascript"
                                                                                    defaultValue={codeInput}
                                                                                    value={codeInput}
                                                                                    onChange={handleCodeChange}
                                                                                    theme="vs-dark"
                                                                        />
                                                                        <motion.button
                                                                                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                                                                                    onClick={getReviewCode}
                                                                                    disabled={isLoading}
                                                                                    className={`relative mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition-all duration-300 overflow-hidden cursor-pointer ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'
                                                                                                }`}
                                                                        >
                                                                                    {!isLoading && (
                                                                                                <motion.div
                                                                                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                                                                                                            initial={{ x: '-100%' }}
                                                                                                            whileHover={{ x: '100%' }}
                                                                                                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                                                                                                />
                                                                                    )}
                                                                                    <div className="relative flex items-center justify-center">
                                                                                                {isLoading ? (
                                                                                                            <>
                                                                                                                        <svg
                                                                                                                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                                                    fill="none"
                                                                                                                                    viewBox="0 0 24 24"
                                                                                                                        >
                                                                                                                                    <circle
                                                                                                                                                className="opacity-25"
                                                                                                                                                cx="12"
                                                                                                                                                cy="12"
                                                                                                                                                r="10"
                                                                                                                                                stroke="currentColor"
                                                                                                                                                strokeWidth="4"
                                                                                                                                    ></circle>
                                                                                                                                    <path
                                                                                                                                                className="opacity-75"
                                                                                                                                                fill="currentColor"
                                                                                                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                                                                                    ></path>
                                                                                                                        </svg>
                                                                                                                        Loading...
                                                                                                            </>
                                                                                                ) : (
                                                                                                            'Get Review'
                                                                                                )}
                                                                                    </div>
                                                                        </motion.button>
                                                            </motion.div>

                                                            {/* Review Section */}
                                                            <motion.div
                                                                        initial={{ opacity: 0, x: 20 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ duration: 0.1, delay: 0.3 }}
                                                                        className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-[600px]"
                                                            >


                                                                        <div className="space-y-4 h-full">

                                                                                    {
                                                                                                reviewComment ? (
                                                                                                            <div className='w-full h-full overflow-y-scroll'>
                                                                                                                        {<ReactMarkdown>{reviewComment}</ReactMarkdown>}
                                                                                                            </div>
                                                                                                ): (
                                                                                                            <h1>Your Code review</h1>
                                                                                                )
                                                                                    }
                                                                                    

                                                                                    
                                                                                    {/* <textarea
                                                                                                value={reviewComment}
                                                                                                onChange={(e) => setReviewComment(e.target.value)}
                                                                                                placeholder="Your code review..."
                                                                                                className="w-full h-full p-4  rounded-lg border border-gray-300 outline-none  transition-all duration-300 text-gray-700 placeholder-gray-400"
                                                                                                readOnly
                                                                                                rows="3"
                                                                                    /> */}

                                                                        </div>
                                                            </motion.div>
                                                </div>
                                    </motion.div>
                        </div>
            )
};

export default Collaboration;