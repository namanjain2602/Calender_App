import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';

function AdminDashboard() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-lg text-gray-600">Manage your company's communication tasks efficiently</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Management Card */}
            <Link
              to="/admin/companymanagement"
              className="bg-blue-600 p-6 rounded-lg shadow-lg hover:bg-blue-700 transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">Company Management</h2>
              <p className="text-gray-200 mb-4">Add, edit, or remove company details. Manage the companies for efficient communication tracking.</p>
            </Link>

            {/* Communication Methods Management Card */}
            <Link
              to="/admin/communicationmethodmanagement"
              className="bg-green-600 p-6 rounded-lg shadow-lg hover:bg-green-700 transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">Communication Methods Management</h2>
              <p className="text-gray-200 mb-4">Define and manage communication methods to ensure consistent outreach and follow-ups.</p>
            </Link>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">© 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;
