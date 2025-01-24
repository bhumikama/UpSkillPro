/*"use client";
import React, { useState } from "react";
import styles from "./TabSelector.module.css";

const App = () => {
  const [selectedTab, setSelectedTab] = useState("tab1");

  const images = {
    tab1: {
      small: "/images/app_test.png",
      large: "/images/app_test.png",
    },
    tab2: {
      small: "/images/api_test.png",
      large: "/images/api_test.png",
    },
    tab3: {
      small: "/images/architecture.png",
      large: "/images/architecture.png",
    },
  };

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {Object.keys(images).map((tab) => (
          <button
            key={tab}
            className={`${styles.tabButton} ${
              selectedTab === tab ? styles.active : ""
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            <img
              src={images[tab].small}
              alt={`Small image for ${tab}`}
              className={styles.tabImage}
            />
          </button>
        ))}
      </div>
      <div className={styles.imageContainer}>
        <img
          src={images[selectedTab].large}
          alt={`Large image for ${selectedTab}`}
        />
      </div>
    </div>
  );
};

export default App;
*/

/*import React from "react";

const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      
        <div className="space-y-6">
      
          <div className="flex items-center bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mr-4">💡</div>
            <div>
              <h3 className="text-xl font-bold">
                Bite-Sized Learning for Big Results
              </h3>
              <p className="text-sm mt-2">
                Whether you have 10 minutes or an hour, you’ll always make
                progress.
              </p>
            </div>
          </div>

         
          <div className="flex items-center bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mr-4">📜</div>
            <div>
              <h3 className="text-xl font-bold">
                Earn Certifications That Matter
              </h3>
              <p className="text-sm mt-2">
                Showcase your achievements with certifications recognized by
                industry leaders.
              </p>
            </div>
          </div>

       
          <div className="flex items-center bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mr-4">👥</div>
            <div>
              <h3 className="text-xl font-bold">
                A Thriving Community of Learners
              </h3>
              <p className="text-sm mt-2">
                Connect, collaborate, and grow with a global community of
                learners who share your passions and ambitions.
              </p>
            </div>
          </div>

          <div className="flex items-center bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mr-4">📱</div>
            <div>
              <h3 className="text-xl font-bold">Learn Anywhere, Anytime</h3>
              <p className="text-sm mt-2">
                Our mobile-friendly design means you can learn on the go,
                whether you’re at home, on the bus, or waiting for coffee.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Unique Features of <span className="text-gray-800">UpSkillPro</span>
          </h2>
          <p className="text-gray-600 mb-8">
            We know attention spans are short—that’s why our lessons are
            designed to be quick, impactful, and easy to fit into your day.
          </p>
          <img
            src="/images/upskillpro.png"
            alt="Illustration"
            className="max-w-full mx-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
*/

"use client";
import React, { useState } from "react";

const features = [
  {
    title: "Bite-Sized Learning for Big Results",
    description:
      "Whether you have 10 minutes or an hour, you’ll always make progress.",
    icon: "💡",
  },
  {
    title: "Earn Certifications That Matter",
    description:
      "Showcase your achievements with certifications recognized by industry leaders.",
    icon: "📜",
  },
  {
    title: "A Thriving Community of Learners",
    description:
      "Connect, collaborate, and grow with a global community of learners who share your passions and ambitions.",
    icon: "👥",
  },
  {
    title: "Learn Anywhere, Anytime",
    description:
      "Our mobile-friendly design means you can learn on the go, whether you’re at home, on the bus, or waiting for coffee.",
    icon: "📱",
  },
];

const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Unique Features of <span className="text-indigo-600">UpSkillPro</span>
        </h1>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Tabs */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center p-4 rounded-lg shadow-md cursor-pointer transition ${
                  activeIndex === index
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="text-3xl mr-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </div>
            ))}
          </div>

          {/* Right Side: Active Feature Details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {features[activeIndex].title}
            </h2>
            <p className="text-base text-gray-600">
              {features[activeIndex].description}
            </p>
            <img
              src="/images/upskillpro.png"
              alt="Illustration"
              className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
