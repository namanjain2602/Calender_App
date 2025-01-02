import React from 'react';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <Navbar />
      <div className="container mx-auto py-12 px-6">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Welcome to Communication Tracker
          </h1>
          <p className="text-lg text-gray-600">
            Your one-stop solution to keep track of all your communications and stay organized.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature Card 1 */}
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Track Companies</h2>
            <p className="text-gray-600">
              Manage and track communication history with your key partners and clients.
            </p>
          </div>
          {/* Feature Card 2 */}
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Communication Methods</h2>
            <p className="text-gray-600">
              Record communication via email, phone, LinkedIn, and more.
            </p>
          </div>
          {/* Feature Card 3 */}
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Interactive Dashboard</h2>
            <p className="text-gray-600">
              View all communication at a glance with easy-to-read data visualizations.
            </p>
          </div>
          {/* Feature Card 4 */}
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Calendar Integration</h2>
            <p className="text-gray-600">
              Plan and schedule upcoming communications with a user-friendly calendar.
            </p>
          </div>
          {/* Feature Card 5 */}
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Notifications</h2>
            <p className="text-gray-600">
              Stay updated with reminders for your scheduled communications.
            </p>
          </div>
          {/* Feature Card 6 */}
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Generate Reports</h2>
            <p className="text-gray-600">
              Create comprehensive reports to evaluate your communication strategies.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
