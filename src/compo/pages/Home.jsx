import React from 'react'


const Home = () => {
  return (
    <>
      <div className='min-h-screen h-screen flext flex-col justify-center item-center text-center bg-gradient-to-b from green-900 via-gray-900 to-black '>
        <section className='relative h-screen flex flex-col justify-center items-center text-center'
          style={{ backgroundImage: 'image', backgroundSize: 'cover' }} >
          <div className='absolute insert-0 bg-black/70'></div>
          <div className='relative z-10'>
            <h1 className='text-4xl md:text-6xl font-bold mb-4 text-white'>Hi, I'm <span className='text-yellow-400'> RISHAV RAJ</span></h1>
            <p className='text-gray-200 max-w-2xl mx-auto mb-6 font-extrabold'>
              I am professional web designer. I design responsive and attractive
              websites to help you make business purpose websites.
            </p>
            <a href='/about' className=' bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-500 transition'>About me</a>
          </div>
          <video
            className="absolute top-0 left-0 h-full w-full object-cover -z-10"
            src="3130284-uhd_3840_2160_30fps.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </section>

      </div>


      <section className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-amber-50">
        {/* Left Section with Social Icons */}


        {/* Hero Content Section */}
        <div className="relative flex-1 p-8 md:p-16 lg:p-24 text-center md:text-left">
          <div className="max-w-xl mx-auto md:mx-0">
            <p className="text-lg md:text-xl text-green-500 font-bold mb-2">Hello I'm</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Rishav Raj</h1>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Professional Freelance Web Designer</h2>
            <p className="text-gray-900 mb-8">
              I am a Freelancer skilled in web development with react and tailwindcss and experienced with wordpress, started as a curious student who loved solving puzzles with code. Over the years, I've evolved into a full-stack developer who thrives on creating seamless user experiences and robust backend systems. When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, or mentoring aspiring developers in my community.
            </p>
            <button><a href='#' className='border  black px-6 py-3 rounded-full hover:bg-green-500 hover:text-white transition'>Hire me</a>
            </button>
          </div>
        </div>

        {/* Right Section with Image and Background Shape */}
        <div className="relative flex-1 min-h-screen">
          <div className="absolute inset-0  transform skew-y-12 md:skew-y-0 md:skew-x-12 origin-bottom-right"></div>
          <div className=" justify-center p-8 md:p-16 lg:p-24">
            <img
              src="IMG-20250720-WA0004[1].jpg"
              alt="A smiling developer"
              className="relative z-10 w-full h-auto max-w-sm rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <div className="bg-gray-100 font-sans leading-normal tracking-normal text-gray-900">
        {/* Upper Section */}
        <div className="p-8 md:p-16 lg:p-24 bg-amber-50 shadow-lg rounded-b-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">

            {/* Preparation */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full font-bold">1</div>
                <h2 className="text-xl font-bold">PREPATION</h2>
              </div>
              <ul className="list-none space-y-2 text-gray-900">
                <li className='hover:text-lg'>• Filling out the brief</li>
                <li className='hover:text-lg'>• Initial analysis</li>
                <li className='hover:text-lg'>• Client kick-off</li>
                <li className='hover:text-lg'>• Planning</li>
              </ul>
            </div>

            {/* Design */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full font-bold">2</div>
                <h2 className="text-xl font-bold">DESIGN</h2>
              </div>
              <ul className="list-none space-y-2 text-gray-900">
                <li className='hover:text-lg'>• Gathering the content</li>
                <li className='hover:text-lg'>• Wireframing</li>
                <li className='hover:text-lg'>• Style exploration</li>
                <li className='hover:text-lg'>• Creating Hi-Fi concept</li>  
                <li className='hover:text-lg'>• Developer review</li>
              </ul>
            </div>

            {/* Development */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full font-bold">3</div>
                <h2 className="text-xl font-bold">DEVELOPMENT</h2>
              </div>
              <ul className="list-none space-y-2 text-gray-900">
                <li className='hover:text-lg'>• Project setup</li>
                <li className='hover:text-lg'>• UI development</li>
                <li className='hover:text-lg'>• Design review</li>
                <li className='hover:text-lg'>• CMS connection</li>
                <li className='hover:text-lg'>• QA review</li>
              </ul>
            </div>

            {/* Handover */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full font-bold">4</div>
                <h2 className="text-xl font-bold">HANDOVER </h2>
              </div>
              <ul className="list-none space-y-2 text-gray-900">
                <li className='hover:text-lg'>• Hosting setup</li>
                <li className='hover:text-lg'>• Deployment</li>
                <li className='hover:text-lg'>• Design assets transfer</li>
                <li className='hover:text-lg'>• Launch</li>
                <li className='hover:text-lg'>• Beer party! 🍻</li> 
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-amber-50 text-black py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
          <div>
            <img src="icons8-html-5-144.png" alt="HTML" className="mx-auto w-20 mb-4" />
            <h3 className="font-bold text-xl">HTML</h3>
            <p className="text-gray-900 mt-2">
              I have strong expertise in HTML for creating well-structured and responsive web pages.
            </p>
          </div>

          <div>
            <img src="atom.png" alt="CSS" className="mx-auto w-20 mb-4" />
            <h3 className="font-bold text-xl">REACT JS</h3>
            <p className="text-gray-900 mt-2">
              I am skilled in React.js with TailwindCss, developing dynamic and interactive user interface.
            </p>
          </div>

          <div>
            <img src="C++ Icon.png" alt="cpp" className="mx-auto w-25 mb-6" />
            <h3 className="font-bold text-xl">C++</h3>
            <p className="text-gray-900 mt-2">
              I have knowledge of c++, which strengthens my problem-solving and programming logic.
            </p>
          </div>

          <div>
            <img src="database-management.png" alt="Python" className="mx-auto w-20 mb-4" />
            <h3 className="font-bold text-xl">DBMS</h3>
            <p className="text-gray-900 mt-2">
              I have hands-on experience with MYSQL and other DBs, efficiently handling data queries and storage.
            </p>
          </div>

          <div>
            <img src="wordpress.png" alt="Sass" className="mx-auto w-20 mb-4" />
            <h3 className="font-bold text-xl">WORDPRESS</h3>
            <p className="text-gray-800 mt-2">
              I have expertise and experienced with WordPress, building and customizing professional websites.
            </p>
          </div>

          <div>
            <img src="coding (1).png" alt="MySQL" className="mx-auto w-20 mb-4" />
            <h3 className="font-bold text-xl">LEARNING</h3>
            <p className="text-gray-900 mt-2">
              Currently learning and using AI with more efficiency.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f2ee] min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
          {/* Left side text */}
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              WORDPRESS
            </h1>

            <h2 className="font-bold text-lg text-gray-900 mb-3">
              Description
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              I am a WordPress expert with strong experience in building, customizing, and managing professional websites. I specialize in using page builders like Elementor to create responsive and visually appealing designs tailored to client needs. My skills include theme customization, plugin integration, and optimizing site performance and SEO. I’m also proficient in HTML, CSS, and basic PHP, allowing me to implement custom functionality and styling when required. I’ve delivered several client projects, ensuring fast load times, mobile responsiveness, and a seamless user experience. From landing pages to full websites, I handle content structuring, page management, and security setup with precision. Whether it’s troubleshooting technical issues or enhancing site aesthetics, I bring a problem-solving mindset and a focus on quality. My goal is to create WordPress sites that are not only functional but also scalable and easy to maintain.
            </p>

            <a
              href="https://tekurious.in/" target="_blank" // Or any other URL
              className="inline-block text-center bg-[#FD4556] text-white font-bold tracking-wider px-8 py-3 hover:bg-red-900 transition-colors duration-300 rounded-sm"
            >
              More
            </a>
          </div>

          {/* Right side image */}
          <div className="w-full h-full flex items-center justify-center">
            <video
              src="Screen Recording 2025-09-16 222521.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto rounded-md shadow-2xl"
            ></video>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f2ee] min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
          {/* Left side text */}
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              WEBDEV
            </h1>

            <h2 className="font-bold text-lg text-gray-900 mb-3">
              Description
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              A sophisticated, responsive portfolio website built with React and Tailwind CSS, featuring smooth scroll-triggered animations and modern design principles. This project demonstrates advanced front-end development skills and attention to user experience details.
              <br></br>

              <b>Features:</b>
              <br></br>

              • <b>Smooth Scroll Animations</b> : Custom-built animation system using Intersection Observer API for performance-optimized scroll-triggered effects
              <br></br>
              • <b>Responsive Design</b> : Mobile-first approach ensuring perfect display across all devices and screen sizes
              <br></br>
              • <b>Modern UI/UX</b> : Clean, professional design with carefully selected color palette and typography
              <br></br>
              • <b>Interactive Navigation</b> : Fixed navigation bar with smooth scrolling to sections and dynamic background changes
              <br></br>
              • <b>Performance Optimized</b> : Lightweight animations using CSS transforms and transitions for 60fps performance
              <br></br>
              • <b>Accessibility Focused</b> : Proper contrast ratios, semantic HTML, and screen reader compatibility
            </p>
          </div>

          {/* Right side image */}
          <div className="w-full h-full flex items-center justify-center">
            <video
              src="Screen Recording 2025-09-16 224952.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto rounded-md shadow-2xl"
            ></video>
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