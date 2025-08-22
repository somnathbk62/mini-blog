import React, { useState } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import PostList from "../components/PostList";
import Login from "../components/Login";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useAuth();

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30">
      <Hero />

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-20">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp opacity-0 [animation-delay:0.2s]">
          <h2 className="text-responsive-lg font-bold text-gray-800 mb-6 gradient-text">
            {user ? "Your Latest Stories" : "Latest Blog Posts"}
          </h2>
          <p className="text-responsive-md text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {user
              ? "Manage and explore your published articles. Share your thoughts with the world."
              : "Discover inspiring stories, insightful articles, and creative content from our community of writers."}
          </p>

          {/* Stats or CTA */}
          {user && (
            <div className="flex flex-wrap justify-center gap-6 mt-8 animate-fadeInUp opacity-0 [animation-delay:0.4s]">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-blue-600">
                  Your Posts
                </div>
                <div className="text-sm text-gray-600">Manage your content</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-teal-600">
                  Community
                </div>
                <div className="text-sm text-gray-600">
                  Connect with writers
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12 animate-fadeInUp opacity-0 [animation-delay:0.6s]">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Posts Grid */}
        {user ? (
          <div className="animate-fadeInUp opacity-0 [animation-delay:0.8s]">
            <PostList
              search={searchQuery}
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              setTotalPages={setTotalPages}
              includeAuthorId={user.id}
            />
          </div>
        ) : (
          /* Guest User Message */
          <div className="text-center py-20 animate-fadeInUp opacity-0 [animation-delay:0.8s]">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Welcome to Mini Blog!
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Join our community to start sharing your stories and discover
                amazing content from writers around the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowLogin(true)}
                  className="btn-modern bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                >
                  Get Started
                </button>
                <a
                  href="/all-posts"
                  className="btn-modern bg-white text-gray-700 hover:text-blue-600 px-8 py-3 rounded-xl font-semibold border border-gray-200 hover:border-blue-300"
                >
                  Browse Posts
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions for Logged-in Users */}
        {user && (
          <div className="mt-20 text-center animate-fadeInUp opacity-0 [animation-delay:1s]">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Share Your Story?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Your voice matters. Create compelling content and connect with
                readers who share your interests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/add"
                  className="btn-modern bg-white text-blue-600 hover:text-blue-700 px-8 py-3 rounded-xl font-semibold shadow-lg"
                >
                  Write New Post
                </a>
                <a
                  href="/all-posts"
                  className="btn-modern bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-xl font-semibold"
                >
                  Explore Community
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLogin && (
        <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
      )}
    </div>
  );
};

export default HomePage;
