import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { RiArrowRightLine } from 'react-icons/ri';


const Home = () => {
            const [projects, setProjects] = useState([])

            const fetchData = async () => {
                        try {
                                    const { data } = await axios.get(`http://localhost:3000/projects/get-all?page=${1}&limit=${9}`)

                                    setProjects(data.projects.projects)
                        } catch (error) {
                                    console.log(error)
                        }
            }

            useEffect(() => {

                        fetchData();
            }, [])

            return (
                        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 ">
                                    <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.1 }}
                                                className="flex justify-between items-center mb-8 "
                                    >
                                                <h1 className="text-4xl font-bold text-gray-800">My Projects</h1>
                                                <Link to="/project">
                                                            <motion.button
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm uppercase tracking-wide hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition-all duration-300 shadow-lg"
                                                            >
                                                                        Create Project
                                                            </motion.button>
                                                </Link>
                                    </motion.div>

                                    {projects.length === 0 ? (
                                                <motion.p
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ duration: 0.1 }}
                                                            className="text-center text-gray-500 text-lg"
                                                >
                                                            No projects yet. Create your first project!
                                                </motion.p>
                                    ) : (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                            {projects.map((project) => (
                                                                        <motion.div
                                                                                    key={project.id}
                                                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                                    transition={{ duration: 0.1 }}
                                                                                    whileHover={{ y: -2 }}
                                                                                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                                                                        >
                                                                                    <div className="p-6">
                                                                                                <div className="flex items-center justify-between mb-4">
                                                                                                            <h2 className="text-xl font-bold text-gray-800 truncate">{project.name}</h2>

                                                                                                </div>
                                                                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                                                                            This is a placeholder description for {project.name}.
                                                                                                </p>
                                                                                                <div className="flex justify-end">
                                                                                                            <Link to={`/collab/${project._id}/${project.name}`}>
                                                                                                                        <motion.button
                                                                                                                                    whileHover={{ scale: 1.05 }}
                                                                                                                                    whileTap={{ scale: 0.95 }}
                                                                                                                                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition-all duration-200"
                                                                                                                        >
                                                                                                                                    View Project
                                                                                                                                    <RiArrowRightLine className="ml-2 w-4 h-4" />
                                                                                                                        </motion.button>
                                                                                                            </Link>
                                                                                                </div>
                                                                                    </div>
                                                                        </motion.div>
                                                            ))}
                                                </div>
                                    )}
                        </div>
            );
};

export default Home;