import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <header className="bg-blue-600 w-full py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-3xl font-bold text-center">Communication Tracking Calendar</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center px-4 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Streamline your communication with companies</h2>
        <p className="text-gray-600 max-w-2xl mb-8">
          This tool helps you log past interactions, plan future communications, and ensure timely follow-ups. Stay organized and maintain strong professional relationships effortlessly.
        </p>

        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-gray-200 text-blue-600 px-6 py-3 rounded-md shadow hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300">
              Signup
            </button>
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 w-full py-4 text-center text-white mt-4">
        <p>&copy; 2024 Communication Tracking Calendar. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
