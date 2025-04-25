import React, { useEffect } from 'react'
import { motion } from "framer-motion"
import { useParams } from 'react-router-dom'

const Code = () => {
            const { id } = useParams();

            useEffect(() => { 
                        console.log(id)
            }, [])
            return (
                        <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}

                        >
                                    <h1 className='text-6xl' >Code</h1>
                        </motion.div>
            )
}

export default Code