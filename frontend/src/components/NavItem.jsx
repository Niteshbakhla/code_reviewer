import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavItem = ({ to, children }) => {
            return (
                        <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                        >
                                    <Link
                                                to={to}
                                                className="inline-block px-6 py-3 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-sm uppercase tracking-wide hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 active:scale-95 transition-all duration-300 shadow-lg"
                                    >
                                                {children}
                                    </Link>
                        </motion.div>
            );
};

export default NavItem;