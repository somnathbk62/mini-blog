import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-4 h-4 text-white"
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
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Mini Blog
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Share stories, connect with writers, and discover inspiring
              content.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-base font-semibold mb-3 text-gray-200">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-posts"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm hover:underline"
                >
                  All Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/add"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm hover:underline"
                >
                  Add Post
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm hover:underline"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="text-center md:text-right">
            <h3 className="text-base font-semibold mb-3 text-gray-200">
              Connect
            </h3>
            <div className="flex justify-center md:justify-end space-x-3">
              <div className="w-8 h-8 bg-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer transform hover:scale-110 shadow-md">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </div>
              <div className="w-8 h-8 bg-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer transform hover:scale-110 shadow-md">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </div>
              <div className="w-8 h-8 bg-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer transform hover:scale-110 shadow-md">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Mini Blog. All rights reserved.
            <span className="mx-2">•</span>
            Built with <span className="text-red-400">❤️</span> using React &
            Node.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
