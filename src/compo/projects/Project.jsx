import React from 'react'

function project() {
  return (
    <div className='text-white '>
      <section className=' min-h-screen h-screen flext flex-col justify-center item-center text-center bg-gradient-to-b from green-900 via-gray-900 to-black px-4 pt-16 text-white'>
        <h1 className='text-4xl md:text-6xl font-bold text-green-400'>Full-Stact Developer</h1>
        <h className='text-xl md:text-2xl mb-6'>& Wordpress Expert</h>
        <p className='max-w-2xl pt-5 text-gray-400 pl-9 mx-auto mb-8'>
          I combine design prowess with technical skills to create stunning websites and immersive digital experiences.
        </p>
      </section>

      <div className=' min-h-screen h-screen bg-gradient-to-b from green-900 via-gray-900 to-black px-4 pt-16 text-white'>
      <div className=' flex gap-6 mb-6'>
        <a href='#' className='hover:text-green-400'>🌐</a>
        <a href='#instagram' className='hover:text-green-400'>instagram</a>
        <a href='#linkedin' className='hover:text-green-400'>Linkedin</a>
        <a href='#x' className='hover:text-green-400'>X</a>
        <a href='#github' className='hover:text-green-400'>github</a>

        <div className=' flex gap-4'>
          <a href = '/project' className='bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-full font-semibold'>Have any Project?</a>
          <a href='#' className='border border-green-500 px-6 py-3 rounded-full hover:bg-green-500 hover:text-black transition'>Hire me</a>
        </div>
      </div>
      <section className='px-6 py-16 max-w-6xl mx-auto bg-green-600 rounded-2xl'>
        <h1 classNam='text-3xl font-bold mb-8 text-green-400 '>About me</h1>
        <div className='bg-gray-900 p-6 rounded-xl'>
          <p className='text-gray-300'>
            Hi, I'm Rishav Raj. I worked with bussinesses to create beautiful and functional web designs. My skills include design, branding, wordpress, and full-stack development.
          </p>
        </div>
      </section>
      </div>
















      <div className="min-h-screen bg-[#f5f0e1] flex justify-center py-12 px-4 md:px-8" style={{backgroundImage: "url('https://placehold.co/1000x1000/f5f0e1/635a4d?text=.'})", backgroundSize: '4px', backgroundRepeat: 'repeat'}}>
      <div className="max-w-3xl w-full">
        {/* Header/Title */}
        <header className="flex flex-col items-center text-center my-8 md:my-16">
          <div className="w-full max-w-lg mb-8 rounded-lg overflow-hidden shadow-lg">
            <img src="WhatsApp Image 2025-07-20 at 01.41.19_f2999d60.jpg" alt="A person and a dog on a beach" className="w-full h-auto" />
          </div>
          <p className="text-xl font-medium tracking-wide">LOWFI</p>
          <p className="text-sm italic text-gray-600">Be where you are, otherwise you will miss your life.</p>
        </header>

        {/* Blog Posts */}
        <main>
          {/* Post 1 */}
          <article className="mb-12">
            <p className="text-xs text-gray-500 mb-2">February 15, 2024</p>
            <h2 className="text-3xl font-bold font-serif mb-4">THE ART OF DOING NOTHING</h2>
            <p className="text-md leading-relaxed text-gray-700">
              In an era that glorifies busyness, the radical act of doing nothing can seem counterintuitive, or even frivolous. Yet, the art of stillness is an ancient one, celebrated by philosophers and sages alike for its restorative powers. In a world that is constantly moving, the ability to pause and embrace stillness is more vital than... <a href="#" className="underline">Read more</a>
            </p>
          </article>

          {/* Post 2 */}
          <article className="mb-12">
            <p className="text-xs text-gray-500 mb-2">February 15, 2024</p>
            <h2 className="text-3xl font-bold font-serif mb-4">SAVORING FLAVORS AND EXPERIENCES</h2>
            <p className="text-md leading-relaxed text-gray-700">
              In a world where multitasking is often the norm, meals can become mindless acts, consumed while we're distracted or on the move. The mindfulness of eating stands in stark contrast to this hurried approach, inviting us to slow down, savor each bite, and truly experience our food. This practice not only enhances the enjoyment of... <a href="#" className="underline">Read more</a>
            </p>
          </article>
          
          {/* Post 3 */}
          <article className="mb-12">
            <p className="text-xs text-gray-500 mb-2">February 15, 2024</p>
            <h2 className="text-3xl font-bold font-serif mb-4">CREATING AN ENVIRONMENT CONDUCIVE TO MINDFULNESS</h2>
            <p className="text-md leading-relaxed text-gray-700">
              In the pursuit of mindfulness, our surroundings can have a profound impact on our inner sense of peace and focus. A mindful space promotes serenity and provides a sanctuary from the bustle of everyday life. By thoughtfully curating our environments, we can foster a setting that nurtures our meditation practice and encourages us to live... <a href="#" className="underline">Read more</a>
            </p>
          </article>

          {/* Pagination */}
          <div className="flex justify-end text-sm text-gray-600 font-bold mb-12">
            <a href="#" className="hover:text-gray-900">Next Page →</a>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex justify-between items-center text-sm text-gray-500 pt-8 border-t border-gray-300">
          <div className="flex space-x-2">
            <span>&copy;</span>
            <span>x</span>
            <span>t</span>
          </div>
          <p>Designed with <a href="#" className="underline">WordPress</a></p>
        </footer>
      </div>
    </div>
    </div>
    
  )
}

export default project