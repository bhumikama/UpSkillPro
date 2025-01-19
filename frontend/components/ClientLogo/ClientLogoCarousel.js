// components/LogoCarousel.js
import React from "react";
import styles from "./ClientLogoCarousel.module.css";

const ClientLogoCarousel = () => {
  return (
    <div>
      <h2 className={styles.heading}>Brands that trusts us</h2>
      <div className={styles.container}>
        <img
          src="/images/icons8-volkswagen-50.png"
          alt="Logo 1"
          className={styles.icon}
        />
        <img
          src="/images/icons8-vimeo-50.png"
          alt="Logo 2"
          className={styles.icon}
        />
        <img
          src="/images/icons8-samsung-80.png"
          alt="Logo 3"
          className={styles.icon}
        />
        <img
          src="/images/icons8-party-balloon-48.png"
          alt="Logo 4"
          className={styles.icon}
        />
        <img
          src="/images/icons8-hewlett-packard-50.png"
          alt="Logo 5"
          className={styles.icon}
        />
        <img
          src="/images/icons8-h-and-m-50.png"
          alt="Logo 6"
          className={styles.icon}
        />
        <img
          src="/images/icons8-cafe-48.png"
          alt="Logo 7"
          className={styles.icon}
        />
        <img
          src="/images/icons8-bmw-50.png"
          alt="Logo 8"
          className={styles.icon}
        />
      </div>
    </div>
  );
};

export default ClientLogoCarousel;
