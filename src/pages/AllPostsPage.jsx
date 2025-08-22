import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import API_BASE_URL from "../config/api";
import { useAuth } from "../context/AuthContext";

const AllPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  const fetchPosts = async (page = 1, search = "") => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(page),
        limit: String(6),
        search,
      });
      if (user?.id) params.set("excludeAuthorId", user.id);

      const response = await axios.get(
        `${API_BASE_URL}/api/posts?${params.toString()}`
      );
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage, searchTerm);
    // Refetch when logged-in user changes to keep exclusion accurate
  }, [currentPage, searchTerm, user?.id]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">{error}</div>
            <button
              onClick={() => fetchPosts(currentPage, searchTerm)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16 animate-fadeInUp opacity-0 [animation-delay:0.2s]">
          <h1 className="text-responsive-lg font-bold text-gray-800 mb-6 gradient-text">
            Community Stories
          </h1>
          <p className="text-responsive-md text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover amazing content from our talented community of writers.
            Explore diverse perspectives and inspiring stories from around the
            world.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 animate-fadeInUp opacity-0 [animation-delay:0.4s]">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">Community</div>
              <div className="text-sm text-gray-600">Writers & Stories</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-teal-600">Explore</div>
              <div className="text-sm text-gray-600">Fresh Content Daily</div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12 animate-fadeInUp opacity-0 [animation-delay:0.6s]">
          <SearchBar onSearch={handleSearch} />
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 animate-fadeInUp opacity-0 [animation-delay:0.8s]">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
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
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 17H9v-2.5A3.5 3.5 0 0112.5 11h0A3.5 3.5 0 0116 14.5V17z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {searchTerm ? "No posts found" : "No posts yet"}
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {searchTerm
                  ? "Try adjusting your search terms or browse all posts."
                  : "Be the first to share your story with the community!"}
              </p>
              {searchTerm ? (
                <button
                  onClick={() => handleSearch("")}
                  className="btn-modern bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                >
                  Clear Search
                </button>
              ) : (
                <a
                  href="/add"
                  className="btn-modern bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                >
                  Write First Post
                </a>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 animate-fadeInUp opacity-0 [animation-delay:0.8s]">
              {posts.map((post, index) => (
                <article
                  key={post._id}
                  className="card-modern group hover:shadow-2xl border border-gray-100/50"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={
                        post.imageUrl ||
                        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      }
                      alt={post.title}
                      className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Date Badge */}
                    <div className="absolute top-4 right-4 glass-effect rounded-full px-3 py-1 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
                      <span className="text-xs font-medium text-gray-700">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>

                    {/* Read More Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Link
                        to={`/posts/${post._id}`}
                        className="btn-modern bg-white/90 text-blue-600 hover:bg-white px-6 py-2 rounded-full font-semibold shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300"
                      >
                        Read Article
                      </Link>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>

                    {/* Author Info */}
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                        <span className="text-white text-sm font-bold">
                          {post.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 text-sm">
                          {post.author}
                        </span>
                        <div className="text-xs text-gray-500">
                          {formatDate(post.createdAt)}
                        </div>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-sm">
                      {truncateContent(post.content)}
                    </p>

                    {/* Read More Link */}
                    <Link
                      to={`/posts/${post._id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-all duration-300 group/link"
                    >
                      <span>Continue Reading</span>
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div
                className="flex justify-center mt-16 animate-fadeInUp opacity-0"
                style={{ animationDelay: `${0.8 + posts.length * 0.1 + 0.2}s` }}
              >
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-3 border border-gray-100">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn-modern flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl border border-gray-200"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 rounded-xl font-medium text-sm transition-all duration-300 ${
                            currentPage === page
                              ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg"
                              : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn-modern flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl border border-gray-200"
                  >
                    Next
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllPostsPage;
