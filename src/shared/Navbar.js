import React from 'react';
import { CgLogOut } from 'react-icons/cg';
import { IoNotificationsCircleSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, role, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left Side: Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-200 transition">
          MyApp
        </Link>

        {/* Center: Role-Based Navigation */}
        <div className="flex items-center space-x-6">
          {isLoggedIn && role === 'user' && 
            <>
              <Link
                to="/user/dashboard"
                className="text-lg font-medium hover:text-gray-200 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/user/calendarview"
                className="text-lg font-medium hover:text-gray-200 transition"
              >
                Calendar View
              </Link>
            </>
          }
          {isLoggedIn && role === 'admin' &&
            <>
              <Link
                to="/admin/dashboard"
                className="text-lg font-medium hover:text-gray-200 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/company-management"
                className="text-lg font-medium hover:text-gray-200 transition"
              >
                Company Management
              </Link>
              <Link
                to="/admin/communication-management"
                className="text-lg font-medium hover:text-gray-200 transition"
              >
                Communication Management
              </Link>
            </>
}
        </div>

        {/* Right Side: Notifications and Logout */}
        
        <div className="flex items-center space-x-6">
        {isLoggedIn && role === 'user' &&
            <Link to="/user/notifications" className="relative group">
              {/* Notification Icon */}
              <span className="material-icons text-3xl group-hover:text-gray-200 transition">
              <IoNotificationsCircleSharp />
              </span>
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-2 bg-red-500 text-xs text-white font-bold rounded-full w-5 h-5 flex items-center justify-center group-hover:bg-red-600">
                3
              </span>
            </Link>}
          
            {isLoggedIn && 
            <button
              onClick={handleLogout}
              className=" text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              <CgLogOut className="h-7 w-7" />
            </button>
}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
