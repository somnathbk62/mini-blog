import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts by title, content, or author..."
          className="w-full px-6 py-4 pl-14 pr-24 text-gray-700 bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-base shadow-lg hover:shadow-xl group-hover:border-blue-300"
        />

        {/* Search Icon */}
        <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
          <svg
            className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 transform hover:scale-110"
              title="Clear search"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <button
            type="submit"
            className="btn-modern bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <svg
              className="w-4 h-4 sm:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>

      {/* Search Suggestions/Tips */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          💡 Try searching for topics like "technology", "travel", or author
          names
        </p>
      </div>
    </form>
  );
};

export default SearchBar;
