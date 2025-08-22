import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_BASE_URL from "../config/api";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [post, setPost] = useState(null);

  // Handle image URL change and preview
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);

    // Simple URL validation and preview
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/posts/${id}`);
        const postData = res.data;

        // Check if the current user is the author of the post
        if (postData.authorId !== user.id) {
          setError("You can only edit your own posts.");
          setLoading(false);
          return;
        }

        setPost(postData);
        setTitle(postData.title);
        setContent(postData.content);
        setAuthor(postData.author);
        setImageUrl(postData.imageUrl || "");
        setImagePreview(postData.imageUrl || null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post for edit:", err);
        setError("Failed to load post for editing.");
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, isAuthenticated, navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!title || !content) {
      setError("Please fill in all required fields (Title and Content).");
      return;
    }

    // Validate image URL if provided
    if (
      imageUrl &&
      !imageUrl.startsWith("http://") &&
      !imageUrl.startsWith("https://")
    ) {
      setError(
        "Please enter a valid image URL (starting with http:// or https://)"
      );
      return;
    }

    try {
      const postData = {
        title,
        content,
        author: user.name,
        userId: user.id,
        imageUrl: imageUrl || null,
      };

      await axios.put(`${API_BASE_URL}/api/posts/${id}`, postData);
      setSuccess(true);

      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate(`/posts/${id}`);
      }, 1500);
    } catch (err) {
      console.error("Error updating post:", err);
      if (err.response?.status === 403) {
        setError("You can only edit your own posts.");
      } else {
        setError("Failed to update post. Please try again.");
      }
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post for editing...</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mb-6">
            <svg
              className="w-10 h-10 text-white"
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
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Edit Post</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Update your post content, add or change the featured image, and make
            it even better!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-xl border border-gray-100"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
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
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Post updated successfully!
            </div>
          )}

          {/* Form Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-semibold mb-3"
                >
                  📝 Post Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter an engaging title for your post..."
                  className="w-full px-4 py-3 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="block text-gray-700 text-sm font-semibold mb-3"
                >
                  👤 Author Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="author"
                  placeholder="Your name or pen name..."
                  className="w-full px-4 py-3 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-gray-700 text-sm font-semibold mb-3"
                >
                  🖼️ Featured Image URL{" "}
                  <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  placeholder="https://example.com/your-image.jpg"
                  className="w-full px-4 py-3 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                />
                <p className="text-xs text-gray-500 mt-2">
                  💡 Tip: Use high-quality images from Unsplash, Pexels, or your
                  own hosted images
                </p>
              </div>
            </div>

            {/* Right Column - Image Preview */}
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-3">
                  🎨 Image Preview
                </label>
                <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                        onError={() => {
                          setImagePreview(null);
                          setError(
                            "Invalid image URL. Please check the URL and try again."
                          );
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <button
                          type="button"
                          onClick={() => {
                            setImageUrl("");
                            setImagePreview(null);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200"
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
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400">
                      <svg
                        className="w-12 h-12 mx-auto mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm">
                        Enter an image URL to see preview
                      </p>
                      <p className="text-xs mt-1">
                        Supports JPG, PNG, GIF, WebP
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Image Suggestions */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-3">
                  ⚡ Quick Suggestions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      name: "Tech",
                      url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      name: "Nature",
                      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      name: "Business",
                      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      name: "Creative",
                      url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    },
                  ].map((suggestion) => (
                    <button
                      key={suggestion.name}
                      type="button"
                      onClick={() => {
                        setImageUrl(suggestion.url);
                        setImagePreview(suggestion.url);
                      }}
                      className="px-3 py-2 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors duration-200"
                    >
                      {suggestion.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section - Full Width */}
          <div className="mb-8">
            <label
              htmlFor="content"
              className="block text-gray-700 text-sm font-semibold mb-3"
            >
              ✍️ Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              rows="12"
              placeholder="Write your amazing content here... Share your thoughts, experiences, and insights with your readers."
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">
                💡 Tip: Use line breaks to separate paragraphs for better
                readability
              </p>
              <p className="text-xs text-gray-400">
                {content.length} characters
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-500">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-red-500">*</span> Required fields
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate(`/posts/${id}`)}
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
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center px-8 py-3 text-white bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Update Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
