import React from 'react';
import Navbar from '@/components/Navbar/Navbar';

const ContactForm = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-md p-10 max-w-md w-full mt-10">
        <form>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-5 py-4 border-2 border-gray-300 rounded-full text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black hover:border-white transition duration-300"
            />
          </div>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-5 py-4 border-2 border-gray-300 rounded-full text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black hover:border-white transition duration-300"
            />
          </div>
          
          <div className="mb-5">
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-5 py-4 border-2 border-gray-300 rounded-full text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black hover:border-white transition duration-300"
            />
          </div>
          
          <div className="mb-5">
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black hover:border-white transition duration-300"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition duration-300"
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;