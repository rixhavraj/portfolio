import React from 'react'
import {Link} from 'react-router-dom'


function Navbar() {
  return (
    <div >
         <nav className="text-white shadow-md">
      <div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" flex justify-between h-16 items-center">
          {<img src="/RJLOGO.jpg" alt='website logo' className='h-25 w-auto mix-blend-difference'></img>}

          {/*desktop menu*/}
          <div className="hidden md:flex space-x-6">
            <Link to="/"
            className="hover:text-gray-400">Home</Link>
            <Link to ="/about"
            className="hover:text-gray-400">About</Link>
            {/* <Link to ="/projects"
            className = "hover:text-gray-400"> Projects</Link>
            <Link to ="/Contact" className='hover:text-gray-400'>Contact</Link> */}
          </div>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar