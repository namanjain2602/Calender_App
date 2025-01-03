import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Navbar({ role }) {
  const navigate = useNavigate();
  const [errorShown, setErrorShown] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin=()=>{
    let loggedAs = localStorage.getItem("loggedAs");

    if (!loggedAs || loggedAs.toLowerCase() !== role.toLowerCase()) {
      if (!errorShown) {
        toast.error("Login with appropriate role credentials!");
        setErrorShown(true); // Set error as shown
        navigate("/"); // Redirect to the home or login page
      }
    }
  };
  const handleLogout = () => {
    // Clear user session or localStorage data
    localStorage.removeItem('loggedAs');

    // Show a toast notification
    toast.success('You have been logged out successfully!');

    // Navigate to the login page
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-white text-xl font-bold">CommTracker</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {role === 'admin' && (
              <>
                <a
                  href="/admin/companies"
                  className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Companies
                </a>
                <a
                  href="/admin/communication-methods"
                  className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Communication Methods
                </a>
                <a
                  href="/reports"
                  className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Reports
                </a>
              </>
            )}
            {role === 'user' && (
              <>
                <a
                  href="/user/dashboard"
                  className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </a>
                <a
                  href="/user/notifications"
                  className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Notifications
                </a>
                <a
                  href="/user/calendar"
                  className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Calendar
                </a>
              
              </>
            )}
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-300 hover:text-white focus:outline-none"
              onClick={() => alert('Mobile menu not implemented')}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
