import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ title, location });
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
