import React from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Project from './pages/Project'
import Code from './pages/Code'
import NavItem from './components/NavItem'
import { AnimatePresence } from 'framer-motion'
import Collaboration from './pages/Collaboration'

const App = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />} />
          <Route path='/project' element={<Project />} />
          {/* <Route path='/code/:id' element={<Code />} /> */}
          <Route path='/collab/:id/:name' element={<Collaboration />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App