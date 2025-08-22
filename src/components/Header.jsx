import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleAddPostClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowLogin(true);
    }
    closeMobileMenu();
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/all-posts", label: "All Posts" },
    { path: "/add", label: "Add Post", requiresAuth: true },
    { path: "/about", label: "About" },
  ];

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 text-xl lg:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-all duration-300 group"
              onClick={closeMobileMenu}
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <svg
                  className="w-4 h-4 lg:w-6 lg:h-6 text-white"
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
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Mini Blog
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={link.requiresAuth ? handleAddPostClick : undefined}
                  className={`relative font-medium transition-all duration-300 py-2 px-1 group ${
                    isActive(link.path)
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-teal-600 transform transition-all duration-300 ${
                      isActive(link.path)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-4 py-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium text-sm">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-2.5 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 top-2.5" : "top-1"
                  }`}
                />
                <span
                  className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 top-2.5 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 top-2.5" : "top-4"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={closeMobileMenu}
        />

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed top-16 right-0 w-80 max-w-[90vw] h-[calc(100vh-4rem)] bg-white shadow-2xl transform transition-all duration-300 ease-out ${
            isMobileMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Navigation */}
            <nav className="flex-1 px-6 py-8 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={
                    link.requiresAuth ? handleAddPostClick : closeMobileMenu
                  }
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-100 p-6">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-all duration-300 font-medium shadow-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowLogin(true);
                    closeMobileMenu();
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-3 rounded-lg transition-all duration-300 font-medium shadow-lg"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLogin && (
        <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
      )}
    </>
  );
};

export default Header;
