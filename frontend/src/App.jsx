import React, { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Project from './pages/Project'
import Code from './pages/Code'
import NavItem from './components/NavItem'
import { AnimatePresence } from 'framer-motion'
import Collaboration from './pages/Collaboration'
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setIsLogin } from './redux/slices/userSlice'

const App = () => {
  const location = useLocation();
    const disaptch = useDispatch();
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/auth/me`, { withCredentials: true })
      .then((res) => {
        disaptch(setIsLogin(true))
        // setIsAuthenticated(true)
      }).catch((err) => {
        disaptch(setIsLogin(false))
        // setIsAuthenticated(false)
      })
  }, [])
  return (
    <>
      <AnimatePresence mode='wait'>
        {/* <NavItem /> */}
        <Routes location={location} key={location.pathname}>
          <Route path='/project' element={<ProtectedRoutes><Project /></ProtectedRoutes>} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<Home />} />
          <Route path='/collab/:id/:name' element={<ProtectedRoutes><Collaboration /></ProtectedRoutes>} />

        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App