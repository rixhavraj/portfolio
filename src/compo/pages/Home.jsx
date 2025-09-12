import React from 'react'
import Video from '../../Video'
import { FadeInUp } from '../animations/Fadein'
import { SlideInLeft } from '../animations/Sideinleft'
import { SlideInRight } from '../animations/Sideinright'

const Home= ()=> {
  return (
  <>
  

  <div className='min-h-screen h-screen flext flex-col justify-center item-center text-center bg-gradient-to-b from green-900 via-gray-900 to-black text-'>
      <section className='relative h-screen flex flex-col justify-center items-center text-center'
      style={{backgroundImage: 'image', backgroundSize:'cover'}} >
        <div className='absolute insert-0 bg-black/70'></div>
        <div className='relative z-10'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4 text-white'>Hi I'm <span className='text-yellow-400'> RISHAV RAJ</span></h1>
          <p className='text-gray-200 max-w-2xl mx-auto mb-6 font-extrabold'>
            I am professional web designer. I design responsive and attractive 
            websites to help you make business purpose websites.
          </p>
          <a href='/about' className=' bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-500 transition'>About me</a>
        </div>
      </section>

       </div>

    <div className="bg-gray-100 font-sans leading-normal tracking-normal text-gray-900">
      {/* Upper Section */}
      <div className="p-8 md:p-16 lg:p-24 bg-gray-300 shadow-lg rounded-b-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
          
          {/* Preparation */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full font-bold">1</div>
              <h2 className="text-xl font-bold">Preparation</h2>
            </div>
            <ul className="list-none space-y-2 text-gray-600 hover:texr">
              <li>Filling out the brief</li>
              <li>Initial analysis</li>
              <li>Client kick-off</li>
              <li>Planning</li>
            </ul>
          </div>

          {/* Design */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full font-bold">2</div>
              <h2 className="text-xl font-bold">Design</h2>
            </div>
            <ul className="list-none space-y-2 text-gray-600">
              <li>Gathering the content</li>
              <li>Wireframing</li>
              <li>Style exploration</li>
              <li>Creating Hi-Fi concept</li>
              <li>Developer review</li>
            </ul>
          </div>

          {/* Development */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full font-bold">3</div>
              <h2 className="text-xl font-bold">Development</h2>
            </div>
            <ul className="list-none space-y-2 text-gray-600">
              <li>Project setup</li>
              <li>UI development</li>
              <li>Design review</li>
              <li>CMS connection</li>
              <li>QA review</li>
            </ul>
          </div>

          {/* Handover */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full font-bold">4</div>
              <h2 className="text-xl font-bold">Handover</h2>
            </div>
            <ul className="list-none space-y-2 text-gray-600">
              <li>Hosting setup</li>
              <li>Deployment</li>
              <li>Design assets transfer</li>
              <li>Launch</li>
              <li>Beer party! 🍻</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <section className="bg-gray-800 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
          <div>
            <img src="HTML" alt="HTML" className="mx-auto w-20 mb-4" />
            <h3 className="font-bold text-xl">HTML</h3>
            <p className="text-gray-400 mt-2">
              I have strong expertise in HTML for creating well-structured and responsive web pages.
            </p>
          </div>

          <div>
            <img src="/assets/css.png" alt="CSS" className="mx-auto w-20 mb-4" />
            <h3 className="font-bold text-xl">REACT JS</h3>
            <p className="text-gray-400 mt-2">
              I am skilled in React.js with TailwindCss, developing dynamic and interactive user interface.
            </p>
          </div>

          <div>
            <img src="/assets/js.png" alt="JavaScript" className="mx-auto w-20 mb-4" />
            <h3 className="font-bold text-xl">C++</h3>
            <p className="text-gray-400 mt-2">
              I have knowledge of c++, which strengthens my problem-solving and programming logic.
            </p>
          </div>

          <div>
            <img src="/assets/python.png" alt="Python" className="mx-auto w-20 mb-4" />
            <h3 className="font-bold text-xl">DBMS</h3>
            <p className="text-gray-400 mt-2">
              I have hands-on experience with MYSQL and other DBs, efficiently handling data queries and storage. 
            </p>
          </div>

          <div>
            <img src="/assets/sass.png" alt="Sass" className="mx-auto w-20 mb-4" />
            <h3 className="font-bold text-xl">WORDPRESS</h3>
            <p className="text-gray-400 mt-2">
              I have expertise and experienced with WordPress, building and customizing professional websites.
            </p>
          </div>

          <div>
            <img src="/assets/mysql.png" alt="MySQL" className="mx-auto w-20 mb-4" />
            <h3 className="font-bold text-xl">LEARNING</h3>
            <p className="text-gray-400 mt-2">
              Currently learning and using AI with more efficiency.
            </p>
          </div>
        </div>
      </section>
    
    
      {/* <section className='h-screen flex flex-col justify-center items-center text-center px-6'>
        <h1 className ='text-4xl md:text-6xl text-white font-extrabold mb-4'>
          Welcome to <span className='text-blue-500'> My PortFolio Website</span>
        </h1>
        <p className='text-lg md:text-xl text-gray-300 max-w-2xl mb-6 font-bold'>
          I build modern websites experienced with React, Tailwindcss, and cutting-edge tools
        </p>
        <a href="/services" className= 'border border-white hover:bg-blue-700 text-white  px-6 py-3 rounded-full text-lg font-medium transition'>Get Started</a>
      </section> */}

      {/* <section className='grid md:grid-cols-4 gap-4 px-6 py-12  -mt-10 relative z-20'>
        {[
          {title:'SEO', icon: 'G ' },
          {title:'Wordpress', icon: '🎨'},
          {title:'web Design', icon:'🌐'},
          {title:'Wallpaper Design', icon:'⭐'},
        ].map((service,idx)=>(<div key={idx} className='bg-gradient-to-b from green-900 via-gray-900 to-black p-6 rounded-md text-center font-semibold hover:scale-105 transition'>
          <div className='text-4xl mb-2'>{service.icon}</div>
          {service.title}
        </div>))}
      </section> */}


      {/*feature*/}

     

      



{/*
      <section className='py-16 px-6 max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-center mb-12'>Our Features</h2>
        <div classname='grid md:grid-cols-3 gap-8'>
          <div className='bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-lg transition'>
            <h3 className='text-xl font-semibold
            mb-2'>Fast</h3>
            <p className='text-gray-400'>
              Optimized websites with fast performance.
            </p>
          </div>
          <div className='bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-lg transition'>
            <h3 className='text-xl font-semibold mb-2'>Responsive</h3>
            <p className='text-gray-400'>
              Works seamlessly across all devices and screen sizes
            </p>
          </div>
          <div className='bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-lg transition'>
            <h3 className='text-xl font-semibold
            mb-2'>Modern</h3>
            <p className='text-gray-400'>Sleek, modern UI with latest design practices.</p>
          </div>
        </div>
      </section>

      {/*about section*/}
      {/*}

      <section className='py-16 px-6 bg-gray-900 flex flex-col items-center text-center'>
        <h2 className='text-3xl font-bold mb-4'>About Us</h2>
          <p className='max-w-3xl mx:auto text-gray-300'>
          I am so passionate developer who loves building clean and functional
          digital products. Our goal is to provide 
          high-quality, scalable, and user-friendly solutions.
          </p>
          </section>

          <setion className='py-20 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>Ready to start your journey?</h2>
          </setion>
          */}

          


    </>
  );
};

export default Home