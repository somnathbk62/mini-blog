import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage"; // Import the new HomePage
import AddPostPage from "./pages/AddPostPage"; // Import the new AddPostPage
import PostDetailsPage from "./pages/PostDetailsPage"; // Import the new PostDetailsPage
import EditPostPage from "./pages/EditPostPage"; // Import the new EditPostPage
import AllPostsPage from "./pages/AllPostsPage"; // Import the new AllPostsPage

// About Page Component
const AboutPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            About Mini Blog
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            A modern, clean, and professional blogging platform built with
            cutting-edge technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Fast & Modern
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Built with React and Vite for lightning-fast performance and
              modern development experience.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Reliable Database
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Powered by MongoDB for scalable and flexible data storage with
              Mongoose for elegant modeling.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Tech Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚛️</span>
              </div>
              <p className="font-semibold text-gray-700">React</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎨</span>
              </div>
              <p className="font-semibold text-gray-700">Tailwind CSS</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🟢</span>
              </div>
              <p className="font-semibold text-gray-700">Node.js</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🍃</span>
              </div>
              <p className="font-semibold text-gray-700">MongoDB</p>
            </div>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Built with ❤️</h3>
          <p className="text-lg opacity-90">
            This Mini Blog demonstrates full CRUD functionality with modern web
            technologies.
          </p>
          <p className="text-sm opacity-75 mt-4">
            Developed as a showcase of React, Node.js, Express.js, and MongoDB
            integration.
          </p>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30">
          <Header />
          <main className="flex-grow mt-16 lg:mt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/all-posts" element={<AllPostsPage />} />
              <Route path="/add" element={<AddPostPage />} />
              <Route path="/edit/:id" element={<EditPostPage />} />
              <Route path="/posts/:id" element={<PostDetailsPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
