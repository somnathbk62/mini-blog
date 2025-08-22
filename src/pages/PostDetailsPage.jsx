import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_BASE_URL from "../config/api";

const PostDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/posts/${id}`);
        setPost(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Post not found or an error occurred.");
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/posts/${id}`, {
          data: { userId: user.id },
        });
        navigate("/"); // Redirect to home after deletion
      } catch (err) {
        console.error("Error deleting post:", err);
        if (err.response?.status === 403) {
          setError("You can only delete your own posts.");
        } else {
          setError("Failed to delete post. Please try again.");
        }
      }
    }
  };

  const isAuthor = isAuthenticated && post && post.authorId === user.id;

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );

  if (!post)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-600"
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
          <p className="text-gray-600 text-lg">Post not found.</p>
        </div>
      </div>
    );

  // Default fallback images if no custom image is provided
  const defaultBlogImages = [
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  ];

  // Use custom image if available, otherwise use a random default
  const displayImage =
    post.imageUrl ||
    defaultBlogImages[Math.floor(Math.random() * defaultBlogImages.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-64 md:h-80">
            <img
              src={displayImage}
              alt="Blog Post Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {post.title}
                </h1>
                <div className="flex items-center text-gray-600">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">
                      {post.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{post.author}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-6 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Posts
                </button>

                {isAuthor && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/edit/${post._id}`)}
                      className="flex items-center px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit Post
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex items-center px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetailsPage;
