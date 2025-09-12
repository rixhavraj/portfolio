import React from 'react'

function Contact(){
    return(
        <>
         




    {/*new projext from here*/}









    <div className="bg-gray-100 min-h-screen font-sans leading-normal tracking-normal text-gray-900 overflow-hidden">
      <header className="absolute top-0 left-0 right-0 z-10 p-4 md:p-8">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-xl font-bold">Freelancer</div>
          <ul className="hidden md:flex space-x-6 text-gray-600">
            <li><a href="#" className="hover:text-gray-900">Home</a></li>
            <li><a href="#" className="hover:text-gray-900">About</a></li>
            <li><a href="#" className="hover:text-gray-900">Services</a></li>
            <li><a href="#" className="hover:text-gray-900">Portfolio</a></li>
            <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
            <li><a href="#" className="hover:text-gray-900">Experience</a></li>
          </ul>
        </nav>
      </header>
      
      <main className="relative flex flex-col md:flex-row items-center justify-center min-h-screen">
        {/* Left Section with Social Icons */}
        <div className="hidden md:flex flex-col space-y-4 items-center justify-center p-4">
          <a href="linkedin.com" className="text-gray-400 hover:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.864c0-1.259-.011-2.887-1.758-2.887-1.759 0-2.022 1.378-2.022 2.793v2.964h-1.998v-6h1.998v.875h.027c.277-.591.956-.996 1.961-.996 2.103 0 2.493 1.385 2.493 3.195v3.016z"/></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.188 4.382-2.316 9.516-9.133 9.516-1.84 0-3.552-.5-5.029-1.385.747.094 1.5.14 2.279.14 4.17 0 7.498-1.722 9.17-6.072-1.173.69-2.585 1.092-4.092 1.092-2.906 0-5.465-1.963-6.38-4.632.401.076.79.112 1.194.112 1.737 0 3.336-.583 4.606-1.554-1.776-.044-3.292-1.202-3.817-2.812.247.045.499.068.756.068.368 0 .73-.048 1.077-.145-1.849-.399-3.236-2.01-3.236-3.992 0-2.052 1.697-3.698 3.821-3.698.37 0 .736.04 1.09.123-1.077-.798-2.456-1.272-3.955-1.272-1.118 0-2.181.258-3.125.726.54-3.132 3.425-5.32 6.78-5.32 3.355 0 6.24 2.188 6.78 5.32-1.18.798-2.56 1.272-3.955 1.272-2.103 0-3.945-1.07-5.071-2.695.277.045.565.068.858.068.618 0 1.22-.083 1.802-.249 1.168-1.554 2.684-2.812 4.382-3.236-.399-.184-.813-.277-1.237-.277-2.535 0-4.622 1.956-5.465 4.61-3.553.799-6.381 2.825-7.79 5.865-1.408 3.039-1.789 6.273-1.087 9.508 1.487 2.68 3.864 4.502 6.64 4.502 3.896 0 6.576-1.688 8.083-4.501.996-1.805 1.547-3.987 1.547-6.236 0-1.769-.26-3.483-.756-5.074.887.277 1.768.675 2.593 1.173-1.487 2.68-3.864 4.502-6.64 4.502-3.896 0-6.576-1.688-8.083-4.501.996-1.805 1.547-3.987 1.547-6.236 0-1.769-.26-3.483-.756-5.074.887.277 1.768.675 2.593 1.173z"/></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-8 17v-10h4v10h-4zm6.758 0h-4.758v-10h4.758c1.373 0 2.601.564 3.498 1.503.896.938 1.353 2.215 1.295 3.655-.06.495-.147.986-.254 1.472-.107.485-.224.968-.352 1.442-.128.473-.266.939-.413 1.393-.147.454-.298.899-.451 1.332h-4.537v-4.577c0-.987-.197-1.896-.58-2.673-.384-.776-.991-1.39-1.821-1.846-.83-.455-1.802-.683-2.915-.683-1.113 0-2.085.228-2.915.683-.83.456-1.437 1.07-1.821 1.846-.383.777-.58 1.686-.58 2.673v4.577h-4.758v-10h4.758v1.722c.706-1.073 1.687-1.92 2.943-2.544 1.255-.623 2.646-.935 4.17-.935 2.502 0 4.673.864 6.514 2.593 1.84 1.728 2.76 3.992 2.76 6.792v4.86z"/></svg>
          </a>
        </div>

        {/* Hero Content Section */}
        <div className="relative flex-1 p-8 md:p-16 lg:p-24 text-center md:text-left">
          <div className="max-w-xl mx-auto md:mx-0">
            <p className="text-lg md:text-xl text-green-500 font-bold mb-2">Hello I'm</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Rishav Raj</h1>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Professional Freelance Web Designer</h2>
            <p className="text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed diam nonummy euismod tempor invidunt ut labore et dolore magna aliquyam.
            </p>
            <button><a href='#' className='border  black px-6 py-3 rounded-full hover:bg-green-500 hover:text-white transition'>Hire me</a>
            </button>
          </div>
        </div>

        {/* Right Section with Image and Background Shape */}
        <div className="relative flex-1 min-h-screen">
          <div className="absolute inset-0 bg-green-500 transform skew-y-12 md:skew-y-0 md:skew-x-12 origin-bottom-right" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 25% 100%)' }}></div>
          <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16 lg:p-24">
            <img 
              src="IMG-20250720-WA0004[1].jpg" 
              alt="A smiling developer"
              className="relative z-10 w-full h-auto max-w-sm rounded-lg shadow-lg"
            />
          </div>
        </div>
      </main>
    </div>














     <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-8 z-10">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-xl font-bold font-serif">Melissa Yap</div>
          <ul className="flex space-x-6 text-sm uppercase tracking-wider text-gray-500">
            <li><a href="#" className="hover:text-black">Home</a></li>
            <li><a href="#" className="hover:text-black">CV</a></li>
            <li><a href="#" className="hover:text-black">Writing</a></li>
            <li><a href="#" className="hover:text-black">Social</a></li>
            <li><a href="#" className="hover:text-black">Get In Touch</a></li>
            <li><a href="#" className="hover:text-black">*</a></li>
          </ul>
        </nav>
      </header>
      
      {/* Main Content */}
      <main className="relative flex flex-col md:flex-row min-h-screen pt-24 md:pt-0">
        
        {/* Left Section - Image */}
        <div className="relative flex-1 p-8 md:p-16 flex items-center justify-center bg-yellow-600">
          <img 
            src="rishav.jpg" 
            alt="A smiling woman"
            className="w-full h-auto max-w-sm rounded-lg shadow-xl"
          />
        </div>

        {/* Right Section - Text Content */}
        <div className="relative flex-1 p-8 md:p-16 lg:p-24 flex items-center">
          <div className="max-w-xl mx-auto md:mx-0">
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#f5e9e9' }}>
              <h1 className="text-4xl md:text-5xl font-serif font-light mb-4 text-gray-900 leading-tight">A little about me</h1>
              <p className="text-md md:text-lg font-serif italic mb-6">
                15 years experience in branding, social media and copywriting.
              </p>
              <p className="text-sm md:text-md text-gray-700 leading-relaxed mb-6">
                I graduated with a Bachelor of Commerce (Marketing) degree from the University of Melbourne where I kicked off my career as a brand marketer for global brands including MINI Cooper, Tennis Australia and Coca-Cola. I have also worked and lived in London, New York City, where I developed social media strategies in the fashion/retail, consulting and beauty space. I am currently based in Los Angeles;
                I recently switched courses to content marketing, writing for a B2B SAAS technology company called MNTN where I was responsible for all types of customer facing copy. It is these experiences and global perspectives that lend to the nature of my work. I have written across fashion, beauty, foods, arts, technology and lifestyle, and my work has been featured on CNN, Monocle, Fortune, WeWork and Broadsheet, amongst other publications.
              </p>
              <p className="text-sm md:text-md text-gray-700 leading-relaxed">
                Read more about me on <a href="#" className="underline font-bold hover:text-gray-900">Freelance Founders</a>, <a href="#" className="underline font-bold hover:text-gray-900">Shoutout LA</a> and my podcast with <a href="#" className="underline font-bold hover:text-gray-900">The Juice</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
        
        </>

    )
}
export default Contact