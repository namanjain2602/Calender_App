import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="mb-4 sm:mb-0">
         
            <p className="text-sm">
            &copy; 2024 Calendar App. All rights reserved.
            </p>
          </div>

          {/* Center Section */}
          <div className="flex space-x-4">
            <a
              href="/about"
              className="text-gray-300 hover:text-white text-sm"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="text-gray-300 hover:text-white text-sm"
            >
              Contact
            </a>
            <a
              href="/privacy"
              className="text-gray-300 hover:text-white text-sm"
            >
              Privacy Policy
            </a>
          </div>

          {/* Right Section */}
          <div className="flex space-x-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-12 19h-3v-11h3v11zm-1.5-12.3c-1 0-1.7-.8-1.7-1.7s.7-1.7 1.7-1.7c1 0 1.7.8 1.7 1.7s-.7 1.7-1.7 1.7zm13.5 12.3h-3v-5.6c0-1.4-.5-2.4-1.8-2.4-1 0-1.5.7-1.8 1.3-.1.2-.1.5-.1.8v5.9h-3s.1-9.6 0-11h3v1.6c.4-.7 1.3-1.8 3.1-1.8 2.3 0 4 1.5 4 4.6v6.6z" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 .5c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.1 11.4.6.1.9-.3.9-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.2-1.3-1.5-1.3-1.5-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1 1.6-.6 1.6-.6.1-.8.5-1.1.8-1.3-2.6-.3-5.4-1.3-6.6-2.4-.3-.5-.5-1.1-.5-1.7 0-.5.1-.9.4-1.3-.2-.4-1.1-1.7.1-3.6 0 0 .8-.2 2.6.7.8-.2 1.7-.3 2.6-.3s1.8.1 2.6.3c1.8-.9 2.6-.7 2.6-.7 1.2 1.9.3 3.2.1 3.6.3.4.4.9.4 1.3 0 .6-.2 1.2-.5 1.7-1.2 1.1-4.1 2.1-6.6 2.4.5.4.9 1.2.9 2.4v3.6c0 .3.2.6.9.6 4.8-1.6 8.1-6.1 8.1-11.4 0-6.6-5.4-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-400">
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
