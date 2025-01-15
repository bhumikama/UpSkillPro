"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import logo from "../../../images/Logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/" passHref>
          <Image src={logo} alt="UpSkillPro Logo" width={200} height={50} priority />
        </Link>
      </div>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/courses">Explore Courses</Link></li>
        <li><Link href="/instructor">Become an Instructor</Link></li>
        <li><Link href="/contact-us">Contact Us</Link></li>

         <li>
          <button className={`${styles.button} ${styles.signUpButton}`}>Sign Up</button>
        </li>
        <li>
          <button className={styles.button}>Log In</button>
        </li>
      </ul>

      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </nav>
  );
};

export default Navbar;