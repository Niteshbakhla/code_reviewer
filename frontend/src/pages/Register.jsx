
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
            const [formData, setFormData] = useState({
                        name: '',
                        email: '',
                        password: '',
            });
            const [errors, setErrors] = useState({});

            const handleChange = (e) => {
                        const { name, value } = e.target;
                        setFormData({ ...formData, [name]: value });
            };

            const validateForm = () => {
                        const newErrors = {};
                        if (!formData.name.trim()) newErrors.name = 'Username is required';
                        if (!formData.email.trim()) newErrors.email = 'Email is required';
                        else if (!/\S+@gmail+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
                        if (!formData.password) newErrors.password = 'Password is required';
                        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
                        // if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
                        return newErrors;
            };

            const handleSubmit = async (e) => {
                        e.preventDefault();
                        try {
                                    const newErrors = validateForm();
                                    if (Object.keys(newErrors).length > 0) {
                                                setErrors(newErrors);
                                                return;
                                    }
                                    setErrors({});
                                    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/auth/register`, formData);
                                    toast.success(data.message)
                        } catch (error) {
                                    toast.error(error.response.data.message)
                                    console.log(error)
                        }
            };

            return (
                        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                                                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
                                                {/* <div className="flex flex-col items-center mb-6">
                                                            <img src="https://via.placeholder.com/100" alt="Logo" className="w-24 h-24 mb-4" />
                                                </div> */}
                                                <form onSubmit={handleSubmit} className="space-y-4">
                                                            <div>
                                                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Name</label>
                                                                        <input
                                                                                    type="text"
                                                                                    id="username"
                                                                                    name="name"
                                                                                    value={formData.name}
                                                                                    onChange={handleChange}
                                                                                    className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                                                                    placeholder="Enter your name"
                                                                        />
                                                                        <div className='h-4 '>
                                                                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                                                        </div>
                                                            </div>
                                                            <div>
                                                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                                                        <input
                                                                                    type="email"
                                                                                    id="email"
                                                                                    name="email"
                                                                                    value={formData.email}
                                                                                    onChange={handleChange}
                                                                                    className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                                                                    placeholder="Enter your email"
                                                                        />
                                                                        <div className='h-4'>
                                                                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                                                        </div>
                                                            </div>
                                                            <div>
                                                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                                                        <input
                                                                                    type="password"
                                                                                    id="password"
                                                                                    name="password"
                                                                                    value={formData.password}
                                                                                    onChange={handleChange}
                                                                                    className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                                                                    placeholder="Enter your password"
                                                                        />
                                                                        <div className='h-4'>
                                                                                    {errors.password && <p className="text-red-500 text-sm ">{errors.password}</p>}
                                                                        </div>
                                                            </div>
                                                            <div>
                                                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                                                        <input
                                                                                    type="password"
                                                                                    id="confirmPassword"
                                                                                    name="confirmPassword"
                                                                                    value={formData.confirmPassword}
                                                                                    onChange={handleChange}
                                                                                    className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                                                                    placeholder="Confirm your password"
                                                                        />
                                                                        <div className='h-4'>
                                                                                    {errors.confirmPassword && <p className="text-red-500 text-sm ">{errors.confirmPassword}</p>}
                                                                        </div>
                                                            </div>
                                                            <button
                                                                        type="submit"
                                                                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300"
                                                            >
                                                                        Register
                                                            </button>
                                                </form>
                                                <p className="mt-4 text-center text-sm text-gray-600">
                                                            Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link>
                                                </p>
                                    </div>
                        </div>
            );
};

export default RegisterPage;
