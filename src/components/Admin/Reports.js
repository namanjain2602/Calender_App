import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Toaster } from 'react-hot-toast';
import jsPDF from 'jspdf';
import { CSVLink } from 'react-csv';
import 'jspdf-autotable'; // Import autoTable plugin for jsPDF
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Reports() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const storedCompanies = localStorage.getItem('companies');
    if (storedCompanies) {
      setCompanies(JSON.parse(storedCompanies));
    }
  }, []);

  // Calculate communication type frequency
  const getCommunicationTypeFrequency = () => {
    const typeCount = {};

    companies.forEach((company) => {
      company.lastCommunications.forEach((comm) => {
        typeCount[comm.type] = (typeCount[comm.type] || 0) + 1;
      });
    });

    return typeCount;
  };

  // Calculate read/unread notifications
  const getReadUnreadNotifications = () => {
    const readUnreadCount = { Read: 0, Unread: 0 };

    companies.forEach((company) => {
      company.lastCommunications.forEach((comm) => {
        if (comm.status === 'read') {
          readUnreadCount.Read += 1;
        } else {
          readUnreadCount.Unread += 1;
        }
      });
    });

    return readUnreadCount;
  };

  // Pie chart data for Read/Unread Notifications
  const readUnreadData = getReadUnreadNotifications();

  const pieChartData = {
    labels: ['Read', 'Unread'],
    datasets: [
      {
        data: [readUnreadData.Read, readUnreadData.Unread],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  // Communication type frequency data for Bar Graph
  const communicationTypeFrequency = getCommunicationTypeFrequency();
  const communicationLabels = Object.keys(communicationTypeFrequency);
  const communicationValues = Object.values(communicationTypeFrequency);

  const barChartData = {
    labels: communicationLabels,
    datasets: [
      {
        label: 'Frequency of Communication Types',
        data: communicationValues,
        backgroundColor: '#FFCE56',
        borderColor: '#FFCE56',
        borderWidth: 1,
      },
    ],
  };

  // Generate PDF with Table Format
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Communication Type Frequency Report', 20, 20);

    // Table headers and data
    const tableData = communicationLabels.map((label, index) => [label, communicationValues[index]]);
    doc.autoTable({
      head: [['Type', 'Frequency']],
      body: tableData,
      startY: 30,
      theme: 'grid',
      headStyles: { fillColor: [0, 123, 255] },
    });

    doc.save('communication_report.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <Navbar role={'admin'} />
      <div className="bg-gray-100 min-h-screen p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Communication Reports</h2>

        {/* Chart Container */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Communication Type Frequency (Bar Graph) */}

          <div className="ml-48 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-h-[400px]">
            <h3 className="text-2xl font-semibold mb-4 text-center">Communication Type Frequency</h3>
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  x: {
                    beginAtZero: true,
                    ticks: {
                      font: {
                        size: 12,
                      },
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      font: {
                        size: 12,
                      },
                    },
                  },
                },
              }}
              height={250}
            />
          </div>
          <div className="mt-8 flex flex-col items-end gap-4">
            <CSVLink
              data={communicationLabels.map((label, index) => ({
                Type: label,
                Frequency: communicationValues[index],
              }))}
              filename="communication_data.csv"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-40 text-center"
            >
              Download CSV
            </CSVLink>
            <button
              onClick={generatePDF}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-40 text-center"
            >
              Download PDF
            </button>
          </div>
          {/* Pie Chart for Read/Unread Notifications */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-h-[400px]">
            <h3 className="text-2xl font-semibold mb-4 text-center">Read/Unread Notifications</h3>
            <Pie
    data={pieChartData}
    options={{
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 14,
            },
          },
        },
      },
      layout: {
        padding: 20, // Optional padding to add space around the chart
      },
      elements: {
        arc: {
          borderWidth: 2, // Thickness of the border
          borderRadius: 5, // Smooth edges (optional)
        },
      },
      cutout: '0%', // If using a doughnut chart, adjust the inner radius
      radius: '80%', // Decrease this value to shrink the overall pie size
    }}
    height={250}
  />

          </div>
        </div>

        {/* CSV and PDF Download Buttons */}

      </div>
      <Footer />
    </div>
  );
}

export default Reports;
