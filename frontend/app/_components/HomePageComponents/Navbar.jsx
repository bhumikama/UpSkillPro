"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="container mx-auto bg-white   border-black my-4  py-2">
      <div className="flex items-center justify-between px-6 ">
        <div className="flex items-center">
          <Link href="/" passHref>
            <Image
              src="/upskillpro_logo.png"
              alt="Logo"
              width={150}
              height={40}
              priority
            />
          </Link>
        </div>

        <ul className="hidden md:flex flex-1 justify-center items-center gap-6">
          <li>
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-500 font-semibold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="about-us"
              className="text-gray-700 hover:text-blue-500 font-semibold"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/courses"
              className="text-gray-700 hover:text-blue-500 font-semibold"
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              href="/courses"
              className="text-gray-700 hover:text-blue-500 font-semibold"
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              href="/signup?role=instructor"
              className="text-gray-700 hover:text-blue-500 font-semibold"
            >
              Become an Instructor
            </Link>
          </li>
          <li>
            <Link
              href="/contact-us"
              className="text-gray-700 hover:text-blue-500 font-semibold"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600">
            <Link href="/signup">Sign Up</Link>
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800">
            <Link href="/login">Log In</Link>
          </button>
        </div>

        <div
          className="md:hidden flex items-center cursor-pointer"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-black" />
          ) : (
            <Menu className="w-6 h-6 text-black" />
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-white z-20">
          <div className="flex justify-end p-4">
            <button
              onClick={closeMenu}
              className="text-gray-700 font-bold text-xl focus:outline-none"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col items-center gap-6 text-lg">
            <Link
              href="/"
              onClick={closeMenu}
              className="text-gray-700 hover:text-blue-500 font-semibold"
            >
              Home
            </Link>
            <Link
              href="/courses"
              onClick={closeMenu}
              className="text-gray-700 hover:text-blue-500 font-semibold"
            >
              Explore
            </Link>
            <Link
              href="/courses"
              onClick={closeMenu}
              className="text-gray-700 hover:text-blue-500 font-semibold"
            >
              Courses
            </Link>
            <Link
              href="/signup?role=instructor"
              onClick={closeMenu}
              className="text-gray-700 hover:text-blue-500 font-semibold"
            >
              Become an Instructor
            </Link>
            <Link
              href="/contact-us"
              onClick={closeMenu}
              className="text-gray-700 hover:text-blue-500 font-semibold"
            >
              Contact Us
            </Link>
            <button
              onClick={closeMenu}
              className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600"
            >
              <Link href="/signup">Sign Up</Link>
            </button>
            <button
              onClick={closeMenu}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
            >
              <Link href="/login">Log In</Link>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
