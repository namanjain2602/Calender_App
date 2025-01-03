import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../shared/Footer";
import Signup from "../signup/Signup";
import Login from "../login/Login"; // Import Login Component

function Home() {
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  // Default data for local storage
  const defaultData = {
    companies: [
      {
        id: 1,
        name: "Entnt",
        location: "Gurgaon",
        linkedin: "https://www.linkedin.com/in/naman-jain-26june02/",
        emails: "entnt@gmail.com",
        phoneNumbers: "6397811808",
        comments: "none",
        periodicity: "weekly",
        lastCommunications: [
          { type: "Email", date: "2025-01-03", notes: "", read: false },
          { type: "LinkedIn Post", date: "2025-01-02", notes: "", read: false },
        ],
        nextCommunication: {
          type: "Email",
          date: "2025-01-03",
          read: false,
        },
      },
      {
        id: 2,
        name: "VBS",
        location: "Gurgaon",
        linkedin: "https://www.linkedin.com/in/naman-jain-26june02/",
        emails: "vbs@gmail.com",
        phoneNumbers: "6397811808",
        comments: "hello",
        periodicity: "weekly",
        lastCommunications: [
          { type: "Call", date: "2025-01-01", notes: "", read: false },
          { type: "LinkedIn Post", date: "2025-01-03", notes: "", read: false },
          { type: "Email", date: "2025-01-04", notes: "", read: false },
        ],
        nextCommunication: {
          type: "Call",
          date: "2025-01-01",
          read: false,
        },
      },
    ],
    methods: [
      { name: "LinkedIn Post", description: "Post", sequence: "1", mandatory: true, id: 1 },
      { name: "Email", description: "write email", sequence: "2", mandatory: true, id: 2 },
      { name: "Call", description: "calling service", sequence: "3", mandatory: true, id: 3 },
    ],
    users: {
      Admin: [
        { name: "Deepak", email: "deepak@gmail.com", password: "Deepak", mobile: "6397811808", role: "Admin" },
      ],
      User: [
        { name: "Naman", email: "naman@gmail.com", password: "Naman", mobile: "6397811808", role: "User" },
      ],
    },
  };

  useEffect(() => {
    // Check and initialize local storage data
    Object.keys(defaultData).forEach((key) => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(defaultData[key]));
      }
    });
  }, []);

  const toggleSignupModal = () => {
    setSignupModalOpen(!isSignupModalOpen);
  };

  const toggleLoginModal = () => {
    setLoginModalOpen(!isLoginModalOpen);
  };

  const handleCloseModal = (e) => {
    // Close modal if the click is outside the modal content
    if (e.target.id === "modal-overlay") {
      setSignupModalOpen(false);
      setLoginModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 flex flex-col">
      <nav className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 text-white font-extrabold text-xl">
              Communication Tracker
            </div>
            <div className="flex space-x-6 items-center">
              <button
                onClick={toggleLoginModal}
                className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </button>
              <button
                onClick={toggleSignupModal}
                className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-12 px-6 flex-grow">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Welcome to Communication Tracker
          </h1>
          <p className="text-lg text-gray-600">
            Your one-stop solution to keep track of all your communications and
            stay organized.
          </p>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="relative bg-white rounded-lg shadow-md w-full max-w-md h-auto p-6"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from propagating
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 rounded-full"
              onClick={toggleLoginModal}
              aria-label="Close Modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Login
            </h2>

            {/* Login Component */}
            <Login />
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="relative bg-white rounded-lg shadow-md w-full max-w-md h-auto p-6"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from propagating
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 rounded-full"
              onClick={toggleSignupModal}
              aria-label="Close Modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Sign Up
            </h2>

            {/* Signup Component */}
            <Signup setSignupModalOpen={setSignupModalOpen} />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
