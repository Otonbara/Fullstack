// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.jpg';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Hero Section with Background Image */}
      <section
        className="relative flex items-center justify-center text-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
        <div className="relative z-10 text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to SkillMatch</h1>
          <p className="text-xl mb-6">
            Your trusted platform for finding your dream job or the perfect candidate
          </p>
          {/* Link to Register Page */}
          <Link
            to="/register"
            className="bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Job Match Algorithm</h3>
            <p>Find the best job opportunities tailored to your skills and preferences.</p>
            {/* Link to Register Page */}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Join Now
            </Link>
          </div>
          <div className="bg-gray-100 p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Easy Profile Setup</h3>
            <p>Create a profile to showcase your experience and skills to employers.</p>
            {/* Link to Register Page */}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Get Started
            </Link>
          </div>
          <div className="bg-gray-100 p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Employer Access</h3>
            <p>Employers can post jobs and find qualified candidates effortlessly.</p>
            {/* Link to Register Page */}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-16 bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Start Your Job Search Today!</h2>
        <p className="text-lg mb-6">
          Find your next career opportunity or hire your next team member with SkillMatch.
        </p>
        {/* Link to Register Page */}
        <Link
          to="/register"
          className="bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
        >
          Join Now
        </Link>
      </section>
    </div>
  );
};

export default Home;