import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white py-20 lg:py-32 text-center overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-float animate-delay-200"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-float animate-delay-500"></div>
      </div>

      {/* Hero Image Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-responsive-xl font-bold mb-6 animate-fadeInUp opacity-0 [animation-delay:0.2s]">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Mini Blog
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-responsive-md mb-10 max-w-3xl mx-auto leading-relaxed text-blue-50 animate-fadeInUp opacity-0 [animation-delay:0.4s]">
            Discover amazing stories, share your thoughts, and connect with a
            community of passionate writers from around the world.
          </p>

          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fadeInUp opacity-0 [animation-delay:0.6s]">
            <div className="glass-effect rounded-full px-6 py-3 transform hover:scale-105 transition-all duration-300 group">
              <span className="text-sm font-medium flex items-center gap-2">
                <span className="text-lg group-hover:animate-pulse-soft">
                  📚
                </span>
                <span>Amazing Stories</span>
              </span>
            </div>
            <div className="glass-effect rounded-full px-6 py-3 transform hover:scale-105 transition-all duration-300 group">
              <span className="text-sm font-medium flex items-center gap-2">
                <span className="text-lg group-hover:animate-pulse-soft">
                  ✍️
                </span>
                <span>Creative Writers</span>
              </span>
            </div>
            <div className="glass-effect rounded-full px-6 py-3 transform hover:scale-105 transition-all duration-300 group">
              <span className="text-sm font-medium flex items-center gap-2">
                <span className="text-lg group-hover:animate-pulse-soft">
                  🌟
                </span>
                <span>Vibrant Community</span>
              </span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp opacity-0 [animation-delay:0.8s]">
            <a
              href="#posts"
              className="btn-modern bg-white text-blue-600 hover:text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Explore Stories
            </a>
            <a
              href="/add"
              className="btn-modern bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Start Writing
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fadeInUp opacity-0 [animation-delay:1s]">
        <div className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300 cursor-pointer">
          <span className="text-sm mb-2 font-medium">Scroll to explore</span>
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
