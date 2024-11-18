import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostJob = () => {
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to post a job');
      return;
    }

    // Get Firebase ID token to authenticate with Django
    const idToken = await user.getIdToken();

    // Prepare the job data
    const jobData = {
      title,
      companyName,
      location,
      description,
      requirements,
      jobType,
    };

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/jobs/post/',  // Django API endpoint
        jobData,
        {
          headers: {
            'Authorization': `Bearer ${idToken}`,
          },
        }
      );

      alert('Job posted successfully!');
      navigate('/jobs');
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Post a Job</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow-md">
        {/* Job Title */}
        <div className="mb-4">
          <label className="block text-gray-700">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Company Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Job Type */}
        <div className="mb-4">
          <label className="block text-gray-700">Job Type</label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Job Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Job Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            required
          ></textarea>
        </div>

        {/* Job Requirements */}
        <div className="mb-4">
          <label className="block text-gray-700">Requirements</label>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
