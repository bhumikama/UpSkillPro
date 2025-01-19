import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import { FaLinkedin } from "react-icons/fa";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 text-gray-800 min-h-screen flex flex-col items-center py-12 px-4">
        <div className="max-w-full sm:max-w-4xl bg-white border border-gray-800 rounded-lg p-8 shadow-lg mb-12">
          <h1 className="text-3xl font-bold text-black mb-8 text-left">
            About Us
          </h1>
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            At{" "}
            <strong className="font-semibold text-gray-800">UpSkillPRO</strong>,
            we’re redefining what it means to learn in the digital age. Designed
            with Gen Z in mind, we’re more than just an e-learning
            platform—we’re a movement for knowledge, creativity, and
            empowerment.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Our mission is simple: make learning accessible, engaging, and
            tailored to your lifestyle. Whether you’re mastering a new skill,
            preparing for your dream career, or diving into a passion project,
            we’re here to help you grow, one lesson at a time.
          </p>
          <h2 className="text-2xl font-normal mb-4 text-gray-800">
            What sets us apart?
          </h2>
          <ul className="list-disc pl-6 mb-6 text-lg text-gray-700">
            <li className="mb-3">
              <span className="font-normal text-gray-700">
                Bite-Sized, Powerful Lessons:
              </span>{" "}
              Learn on your terms, anytime, anywhere.
            </li>
            <li className="mb-3">
              <span className="font-normal text-gray-700">
                A Community of Creators:
              </span>{" "}
              Connect with inspiring instructors and like-minded peers who share
              your goals.
            </li>
            <li className="mb-3">
              <span className="font-normal text-gray-700">
                Interactive and Fun:
              </span>{" "}
              Forget boring textbooks—our platform is packed with videos,
              quizzes, and real-world projects.
            </li>
            <li className="mb-3">
              <span className="font-normal text-gray-700">
                Skills that Matter:
              </span>{" "}
              From tech to creativity to self-growth, our courses are built to
              keep you ahead of the curve.
            </li>
          </ul>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            For instructors, we're the perfect partner to share your expertise, 
            grow your personal brand, and earn while making a difference. For students,
            we're your gateway to knowledge that fits your vibe and vision for the 
            future. At UpSkillPro we believe that learning should never feel like a chore -
            it should feel like an adventure.
            Together, let's unlock your potential and create a world where knowledge knows no
            limits.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            Welcome to{" "}
            <strong className="font-semibold text-gray-800">UpSkillPRO</strong>
            —where Gen Z learns, creates, and thrives. 🚀
          </p>
        </div>

        <footer className="text-center py-4 text-gray-600 mb-12">
          <p className="text-lg font-medium">Crafted with Passion by HackYourFuture's Finest</p>
          <h3>Our team is a powerhouse of talent, creativity, and determination, proudly brought together by HackYourFuture.</h3>
        </footer>

        <div className="max-w-4xl grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <img src="https://media.licdn.com/dms/image/v2/D4D03AQHAMxy-dBe2Uw/profile-displayphoto-shrink_800_800/B4DZPtpWoYHUAc-/0/1734858862322?e=1742428800&v=beta&t=8bn7UMpgqWxGHAFZyBonn9ky48iW367MUG_jGphX5SY" 
           className="w-full h-64 object-cover"
            />
            <div className="bg-gray-100 p-4 text-center">
            <h4 className="text-xl font-semibold text-gray-800">Hussein Oyelaja</h4>
            <p className="text-gray-600">Full Stack Developer</p>
              <a
                href="https://www.linkedin.com/in/oyelaja-hussein/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
              >
                <FaLinkedin className="inline-block mr-2" /> LinkedIn
              </a>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQHZOqjGe3QL5g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726315744301?e=1742428800&v=beta&t=NGqkdQJ0ZLWYc5K6wbhnlbz9nF4EJ3dtQN3rQ3w9taA"
              alt=""
              className="w-full h-64 object-cover"
            />
            <div className="bg-gray-100 p-4 text-center">
              <h5 className="text-xl font-semibold text-gray-800">Hanna Vorontsova</h5>
              <p className="text-gray-600">Full Stack Developer</p>
              <a
                href="https://www.linkedin.com/in/hanna-vorontsova-2417a6115/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
              >
                <FaLinkedin className="inline-block mr-2" /> LinkedIn
              </a>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://avatars.githubusercontent.com/u/33240586?v=4"
              className="w-full h-62 object-cover"
            />
            <div className="bg-gray-100 p-4 text-center">
              <h6 className="text-xl font-semibold text-gray-800">Bhumika Mallikarjun</h6>
              <p className="text-gray-600">Full Stack Developer</p>
              <a
                href="https://www.linkedin.com/in/bhumika-mallikarjun/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
              >
                <FaLinkedin className="inline-block mr-2" /> LinkedIn
              </a>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://avatars.githubusercontent.com/u/29924205?v=4"
              className="w-full h-64 object-cover"
            />
            <div className="bg-gray-100 p-4 text-center">
              <h7 className="text-xl font-semibold text-gray-800">
                Rajesh Kumar Bhatt
              </h7>
              <p className="text-gray-600">Full Stack Developer</p>
              <a
                href="https://www.linkedin.com/in/rajesh-kumar-bhatt-aba8361b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
              >
                <FaLinkedin className="inline-block mr-2" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AboutUs;
