import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config/api";

const PostList = ({
  search,
  currentPage,
  totalPages,
  handlePageChange,
  setTotalPages,
  includeAuthorId,
  excludeAuthorId,
}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page: String(currentPage),
          limit: String(5),
          search: search || "",
        });
        if (includeAuthorId) params.set("authorId", includeAuthorId);
        if (excludeAuthorId) params.set("excludeAuthorId", excludeAuthorId);

        const res = await axios.get(
          `${API_BASE_URL}/api/posts?${params.toString()}`
        );
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages); // Update totalPages from API response
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts. Please try again later.");
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage, search, includeAuthorId, excludeAuthorId]);

  if (loading) return <div className="text-center py-8">Loading posts...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  if (posts.length === 0)
    return <div className="text-center py-8">No posts found.</div>;

  // Default fallback images if no custom image is provided
  const defaultBlogImages = [
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <div
      id="posts"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {posts.map((post, index) => (
        <article
          key={post._id}
          className="card-modern group animate-fadeInUp opacity-0 hover:shadow-2xl border border-gray-100/50"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="relative overflow-hidden rounded-t-xl">
            <img
              src={
                post.imageUrl ||
                defaultBlogImages[index % defaultBlogImages.length]
              }
              alt="Blog Post Banner"
              className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Date Badge */}
            <div className="absolute top-4 right-4 glass-effect rounded-full px-3 py-1 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
              <span className="text-xs font-medium text-gray-700">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
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
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            {/* Content Preview */}
            <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-sm">
              {post.content.length > 120
                ? `${post.content.substring(0, 120)}...`
                : post.content}
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

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div
          className="flex justify-center mt-16 col-span-full animate-fadeInUp opacity-0"
          style={{ animationDelay: `${posts.length * 0.1 + 0.2}s` }}
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
    </div>
  );
};

export default PostList;
