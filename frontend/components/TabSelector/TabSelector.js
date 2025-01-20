"use client";
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
