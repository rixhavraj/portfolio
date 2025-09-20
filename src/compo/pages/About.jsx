import React from 'react'


const About = () => {
  return (

    <>
      <div className='min-h-screen h-screen flext flex-col justify-center item-center text-center bg-gradient-to-b from green-900 via-gray-900 to-black'>

        <section className='h-screen flex flex-col justify-center items-center text-center px-6'>
          <h1 className='text-4xl md:text-6xl text-white font-extrabold mb-4'>
            Welcome to <span className='text-blue-500'> My PortFolio Website</span>
          </h1>
          <p className='text-lg md:text-xl text-gray-300 max-w-2xl mb-6 font-bold'>
            I build modern websites experienced with React, Tailwindcss, and cutting-edge tools
          </p>
          <a href="#" className='border border-white hover:bg-blue-700 text-white  px-6 py-3 rounded-full text-lg font-medium transition'>Get Started</a>

        </section>



        {/* <section className='relative h-screen flex flex-col justify-center items-center text-center'
      style={{backgroundImage: 'image', backgroundSize:'cover'}} >
        <div className='absolute insert-0 bg-black/70'></div>
        <div className='relative z-10'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4 text-white'>Hi I'm <span className='text-yellow-400'> RISHAV RAJ</span></h1>
          <p className='text-gray-200 max-w-2xl mx-auto mb-6'>
            I am professional web designer. I design responsive and attractive 
            websites to help you make business purpose websites.
          </p>
          <a href='/home' className='bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-500 transition'>Order Now</a>
        </div>
      </section> */}


      </div>

      <section className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-amber-50">
        {/* Left Section with Social Icons */}


        {/* Hero Content Section */}
        <div className="relative flex-1 p-8 md:p-16 lg:p-24 text-center md:text-left">
          <div className="max-w-xl mx-auto md:mx-0">
            <p className="text-lg md:text-xl text-green-500 font-bold mb-2">Hello I'm</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Rishav Raj</h1>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Professional Freelance Web Designer</h2>
            <p className="text-gray-600 mb-8">
              I am a Freelancer skilled in web development with react and tailwindcss and experienced with wordpress, started as a curious student who loved solving puzzles with code. Over the years, I've evolved into a full-stack developer who thrives on creating seamless user experiences and robust backend systems. When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, or mentoring aspiring developers in my community..
            </p>
            <button><a href='#' className='border  black px-6 py-3 rounded-full hover:bg-green-500 hover:text-white transition'>Hire me</a>
            </button>
          </div>
        </div>

        {/* Right Section with Image and Background Shape */}
        <div className="relative flex-1 min-h-screen">
          <div className="absolute inset-0  transform skew-y-12 md:skew-y-0 md:skew-x-12 origin-bottom-right" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 25% 100%)' }}></div>
          <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16 lg:p-24">
            <img
              src="IMG-20250720-WA0004[1].jpg"
              alt="A smiling developer"
              className="relative z-10 w-full h-auto max-w-sm rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

    </>
  )
}

export default About