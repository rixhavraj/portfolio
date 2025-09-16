import React from 'react'
import { Link, Route, Routes,  } from 'react-router-dom'
import Home from './compo/pages/Home'
import About from './compo/pages/About'
import Navbar from './compo/pages/Navbar'
import Project from './compo/projects/Project'
import Footer from './compo/pages/Footer'
import Contact from './Contact'

const App = () => {
  return (
    <>
     <Navbar />
     <div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path = "/projects" element={<Project/>} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      
    </div>
    <Footer/>
    
    </>
  )
}


export default App

