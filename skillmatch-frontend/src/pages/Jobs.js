import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/jobs/list/');  // Django API endpoint for fetching jobs
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        // Add some fake jobs in case the API fails
        setJobs([
          {
            id: 1,
            title: "Software Engineer",
            company: "Tech Solutions Ltd.",
            location: "Remote",
            description: "Join our team to build innovative software solutions. 3+ years of experience required.",
            posted: "2 days ago"
          },
          {
            id: 2,
            title: "Data Scientist",
            company: "DataWorks Inc.",
            location: "New York, NY",
            description: "We are looking for a Data Scientist to analyze data and build predictive models.",
            posted: "1 week ago"
          },
          {
            id: 3,
            title: "UX Designer",
            company: "Creative Studio",
            location: "San Francisco, CA",
            description: "Seeking a passionate UX Designer to help shape user experiences for our clients.",
            posted: "3 days ago"
          },
          {
            id: 4,
            title: "Full Stack Developer",
            company: "DevTech",
            location: "Austin, TX",
            description: "We need a skilled Full Stack Developer to join our development team. Must have React and Node.js experience.",
            posted: "5 days ago"
          }
        ]);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Available Jobs</h2>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default Jobs;
