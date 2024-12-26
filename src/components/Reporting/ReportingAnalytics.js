import React, { useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

const ReportingAnalytics = () => {
  const [filter, setFilter] = useState({
    company: "",
    dateRange: "",
    method: "",
  });

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const communicationData = {
    labels: ["LinkedIn Post", "Email", "Phone Call"],
    datasets: [
      {
        label: "Communication Frequency",
        data: [12, 19, 7],
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
      },
    ],
  };

  const engagementData = {
    labels: ["Email", "Phone Call", "LinkedIn"],
    datasets: [
      {
        label: "Engagement Effectiveness",
        data: [65, 40, 85],
        backgroundColor: ["#FF5722", "#03A9F4", "#8BC34A"],
      },
    ],
  };

  const overdueData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Overdue Communications",
        data: [5, 15, 8, 10],
        borderColor: "#FF5252",
        backgroundColor: "rgba(255, 82, 82, 0.2)",
      },
    ],
  };

  const handleDownload = (format) => {
    alert(`Download report as ${format.toUpperCase()} coming soon!`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Reporting & Analytics</h1>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input
            type="text"
            name="company"
            value={filter.company}
            onChange={handleFilterChange}
            placeholder="Filter by Company"
            className="border rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="dateRange"
            value={filter.dateRange}
            onChange={handleFilterChange}
            className="border rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="method"
            value={filter.method}
            onChange={handleFilterChange}
            className="border rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Filter by Method</option>
            <option value="Email">Email</option>
            <option value="LinkedIn">LinkedIn Post</option>
            <option value="Phone">Phone Call</option>
          </select>
        </div>
      </div>

      {/* Graphs Section in Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Communication Frequency */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Communication Frequency</h2>
          <Bar data={communicationData} />
        </div>

        {/* Engagement Effectiveness */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Engagement Effectiveness</h2>
          <Pie data={engagementData} />
        </div>

        {/* Overdue Communication Trends */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Overdue Communication Trends</h2>
          <Line data={overdueData} />
        </div>
      </div>

      {/* Downloadable Reports Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-700">Downloadable Reports</h2>
        <div className="space-x-6">
          <button
            onClick={() => handleDownload("pdf")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Download PDF
          </button>
          <button
            onClick={() => handleDownload("csv")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Download CSV
          </button>
        </div>
      </div>

      {/* Real-Time Activity Log Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Real-Time Activity Log</h2>
        <ul className="space-y-4">
          <li className="bg-gray-100 p-4 rounded-lg shadow-sm">LinkedIn Post for Company A - 2 hours ago</li>
          <li className="bg-gray-100 p-4 rounded-lg shadow-sm">Email sent to Company B - 1 day ago</li>
          <li className="bg-gray-100 p-4 rounded-lg shadow-sm">Phone Call with Company C - 3 days ago</li>
        </ul>
      </div>
    </div>
  );
};

export default ReportingAnalytics;
