import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import axios from 'axios';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/jobs/list/');
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
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
