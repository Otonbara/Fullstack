import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import axios from 'axios';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    // Fake job data for testing
    const fakeJobs = [
      { id: 1, title: 'Software Engineer', location: 'New York' },
      { id: 2, title: 'Product Manager', location: 'San Francisco' },
      { id: 3, title: 'Data Scientist', location: 'Remote' },
      { id: 4, title: 'Front-End Developer', location: 'Los Angeles' },
      { id: 5, title: 'Back-End Developer', location: 'Chicago' },
      { id: 6, title: 'UX/UI Designer', location: 'Austin' },
    ];

    setJobs(fakeJobs);
    setFilteredJobs(fakeJobs); // Initially showing all jobs
  }, []);

  const handleSearch = ({ title, location }) => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(title.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Search for Jobs</h2>
      <SearchBar onSearch={handleSearch} />
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobSearch;
