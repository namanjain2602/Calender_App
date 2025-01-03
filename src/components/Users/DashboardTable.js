import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster
import Navbar from '../../shared/Navbar';
import CommunicationAction from './CommunicationAction'; // Import CommunicationAction
import Footer from '../../shared/Footer';

function DashboardTable() {
  const [companies, setCompanies] = useState([]);
  const [communicationTypes, setCommunicationTypes] = useState([]);
  const [newCommunication, setNewCommunication] = useState({
    type: '',
    date: '',
    companyIndex: null,
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch companies and communication types from local storage
    const storedCompanies = JSON.parse(localStorage.getItem('companies')) || [];
    const storedCommunicationTypes = JSON.parse(localStorage.getItem('methods')) || [];

    setCompanies(storedCompanies);
    setCommunicationTypes(storedCommunicationTypes);
  }, []);

  // Function to handle adding a communication
const handleAddCommunication = (type, date, notes) => {
  const { companyIndex } = newCommunication;

  if (type && date && companyIndex !== null) {
    const updatedCompanies = [...companies];
    const company = updatedCompanies[companyIndex];

    // Ensure that lastCommunications is initialized as an empty array if undefined
    company.lastCommunications = company.lastCommunications || [];

    // Add new communication with `read: false` field
    const updatedCommunications = [
      { type, date, notes, read: false }, // Add the `read` field
      ...company.lastCommunications.slice(0, 4), // Keep only the last 5 communications
    ];

    company.lastCommunications = updatedCommunications;
    company.nextCommunication = { type, date ,read: false}; // Set the next communication

    // Save the updated companies list to localStorage
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));

    // Update state
    setCompanies(updatedCompanies);

    // Reset the form inputs
    setNewCommunication({ type: "", date: "", companyIndex: null });
    setShowModal(false); // Close the modal after saving

    // Show success toast notification
    toast.success("Communication added successfully!");
  }
};

  // Get the row class based on communication status (overdue, dueToday, etc.)
  const getRowClass = (company) => {
    if (company.disableHighlight) return ''; // If highlight is disabled, return no class

    if (company.overdue) return 'bg-red-100'; // Red highlight for overdue communication
    if (company.dueToday) return 'bg-yellow-100'; // Yellow highlight for communication due today
    return 'bg-green-100'; // Green highlight for on-time communication
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toast Notifications */}
      <Toaster position="top-right" />

      <Navbar role={'user'}/>
      <h1 className="text-2xl font-bold text-center py-6">Dashboard</h1>
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="text-left px-6 py-3  font-semibold">Company Name</th>
                <th className="text-left px-6 py-3  font-semibold">
                  Last Five Communications
                </th>
                <th className="text-left px-6 py-3 font-semibold">
                  Next Scheduled Communication
                </th>
                <th className="text-left px-6 py-3  font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.length > 0 ? (
                companies.map((company, index) => (
                  <tr
                    key={index}
                    className={`${getRowClass(company)} border-b hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4 text-gray-700">{company.name}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {company.lastCommunications && company.lastCommunications.length > 0 ? (
                        company.lastCommunications.map((comm, i) => (
                          <div
                            key={i}
                            className="relative hover:underline cursor-pointer"
                            title={comm.notes ? `Notes: ${comm.notes}` : ''} // Show notes as a tooltip
                          >
                            {comm.type} ({comm.date})
                            {comm.notes && (
                              <div className="absolute top-0 left-0 w-full p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                {comm.notes}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div>No communications yet</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {company.nextCommunication
                        ? `${company.nextCommunication.type} (${company.nextCommunication.date})`
                        : 'No scheduled communication'}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
                        onClick={() => {
                          setNewCommunication({ ...newCommunication, companyIndex: index });
                          setShowModal(true); // Show the modal
                        }}
                      >
                        Add Communication
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center px-6 py-4 text-gray-700">
                    No companies available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add Communication Modal */}
        {showModal && (
          <CommunicationAction
            company={companies[newCommunication.companyIndex]}
            communicationTypes={communicationTypes}
            onClose={() => setShowModal(false)}
            onAddCommunication={handleAddCommunication} // Pass the function to save communication
          />
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default DashboardTable;
