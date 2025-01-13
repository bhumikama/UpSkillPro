import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 text-gray-800 min-h-screen flex flex-col items-center py-12 px-4">
            <div className="max-w-4xl bg-white border border-gray-300 rounded-lg p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">
            About Us
          </h1>
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            At <strong className="font-semibold text-indigo-700">UpSkillPRO</strong>, we’re redefining what it means to learn in the digital age. Designed with Gen Z in mind, we’re more than just an e-learning platform—we’re a movement for knowledge, creativity, and empowerment.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Our mission is simple: make learning accessible, engaging, and tailored to your lifestyle. Whether you’re mastering a new skill, preparing for your dream career, or diving into a passion project, we’re here to help you grow, one lesson at a time.
          </p>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            What sets us apart?
          </h2>
          <ul className="list-disc pl-6 mb-6 text-lg text-gray-700">
            <li className="mb-3">
              <strong className="text-indigo-700">Bite-Sized, Powerful Lessons:</strong> Learn on your terms, anytime, anywhere.
            </li>
            <li className="mb-3">
              <strong className="text-indigo-700">A Community of Creators:</strong> Connect with inspiring instructors and like-minded peers who share your goals.
            </li>
            <li className="mb-3">
              <strong className="text-indigo-700">Interactive and Fun:</strong> Forget boring textbooks—our platform is packed with videos, quizzes, and real-world projects.
            </li>
          </ul>
          <p className="text-lg leading-relaxed text-gray-700">
            Welcome to <strong className="font-semibold text-indigo-700">UpSkillPRO</strong>—where Gen Z learns, creates, and thrives. 🚀
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
