import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#141e30] to-[#243b55] text-white p-6 md:p-12">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            Want to work <br /> with us?
          </h2>
          <p className="text-gray-300 mt-4 max-w-md">
            Stop thinking of something when you can have it! Contact us now and
            make a rocket out of your website.
          </p>
          <p className="mt-6 text-sm text-gray-400">
            Privacy Policy <br />
            ⚠️ <br />
            ©️
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col space-y-6">
          <div>
            <h3 className="text-gray-400 uppercase text-sm">Send us a note</h3>
            <a
              href="mailto:hello@unikorns.work"
              className="text-lg font-semibold hover:underline"
            >
              rishavr741@gmail.com
            </a>
          </div>

          <div>
            <h3 className="text-gray-400 uppercase text-sm">Stalk us :</h3>
            <ul className="space-y-2">
              <li><a href="https://www.instagram.com/rixhavraj?igsh=i" target='_blank' className="hover:underline">Instagram</a></li>
              {/* <li><a href="#" className="hover:text-purple-400">Facebook</a></li> */}
              <li><a href="https://www.linkedin.com/in/rixhavraj" className="hover:underline">LinkedIn</a></li>
              <li><a href="https://github.com/rixhavraj" className="hover:underline">Github</a></li>
             
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer