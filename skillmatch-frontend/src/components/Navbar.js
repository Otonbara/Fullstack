// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-200">
          SkillMatch
        </Link>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul className={`flex-col md:flex md:flex-row md:space-x-6 ${isOpen ? 'flex' : 'hidden'} absolute md:static bg-blue-600 md:bg-transparent w-full md:w-auto top-16 left-0 md:top-auto md:left-auto z-10`}>
          <li>
            <Link
              to="/"
              className="block px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/jobs"
              className="block px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Jobs
            </Link>
          </li>
          <li>
            <Link
              to="/job-search"
              className="block px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Job Search
            </Link>
          </li>
          <li>
            <Link
              to="/post-job"
              className="block px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Post Job
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="block px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="block px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="block px-4 py-2 rounded hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;