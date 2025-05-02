import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { RiArrowLeftLine } from 'react-icons/ri'

const Project = () => {
            const [projectName, setProjectName] = useState('');
            const navigate = useNavigate();

            const handleSubmit = async (e) => {
                        e.preventDefault();
                        if (projectName.trim()) {
                                    const { data } = await axios.post(`http://localhost:3000/projects/create`, { projectName })
                                    console.log(data)
                                    setProjectName('');
                                    navigate("/")
                        }
            };

            return (
                        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
                                    <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.1 }}
                                                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
                                    >
                                                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                                                            <motion.button
                                                                        whileHover={{ scale: 1.1 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        onClick={() => navigate('/')}
                                                                        className="mr-3 p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition-all duration-200"
                                                                        aria-label="Go back to homepage"
                                                            >
                                                                        <RiArrowLeftLine className="w-6 h-6" />
                                                            </motion.button>
                                                            Create New Project</h1>
                                                <div className="space-y-6">
                                                            <div>
                                                                        <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                                                                                    Project Name
                                                                        </label>
                                                                        <input
                                                                                    id="projectName"
                                                                                    type="text"
                                                                                    value={projectName}
                                                                                    onChange={(e) => setProjectName(e.target.value)}
                                                                                    placeholder="Enter your project name"
                                                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-gray-700 placeholder-gray-400"
                                                                        />
                                                            </div>
                                                            <motion.button
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                        onClick={handleSubmit}
                                                                        disabled={!projectName.trim()}
                                                                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
                                                            >
                                                                        Create Project
                                                            </motion.button>
                                                           
                                                </div>
                                    </motion.div>
                        </div>
            );
};

export default Project;