import React, { useState } from 'react';
import Navbar from '../../shared/Navbar';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import CompanyForm from './CompanyForm'; // Import the CompanyForm component

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null); // Store the company being edited

  const handleAddCompany = (company) => {
    if (editingCompany) {
      // If editing, update the company in the list
      setCompanies(companies.map((c) => (c.id === company.id ? company : c)));
    } else {
      // If not editing, add a new company
      setCompanies([...companies, company]);
    }
    setShowModal(false); // Close the modal
    setEditingCompany(null); // Clear the editing company state
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company); // Set the company being edited
    setShowModal(true); // Open the modal
  };

  const handleDeleteCompany = (companyId) => {
    setCompanies(companies.filter((company) => company.id !== companyId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Navbar />

      {/* Main Section */}
      <div className="container mx-auto py-8 px-4">
        {/* Centered Add Company Button */}
        <h1 className="text-2xl font-bold mb-6 flex flex-col items-center">Company Management</h1>
        <div className="flex justify-center mb-8">
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition transform hover:scale-105"
            onClick={() => {
              setEditingCompany(null); // Clear editing state for a fresh form
              setShowModal(true); // Open the modal
            }}
          >
            Add Company
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Name</th>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Location</th>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4 text-gray-700">{company.name}</td>
                  <td className="px-6 py-4 text-gray-700">{company.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      {/* Edit Button */}
                      <button
                        title="Edit"
                        className="p-2 rounded-full text-blue-500 hover:text-white hover:bg-blue-500 transition duration-200"
                        onClick={() => handleEditCompany(company)}
                      >
                        <CiEdit size={20} />
                      </button>

                      {/* Delete Button */}
                      <button
                        title="Delete"
                        className="p-2 rounded-full text-red-500 hover:text-white hover:bg-red-500 transition duration-200"
                        onClick={() => handleDeleteCompany(company.id)}
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for CompanyForm */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl">
            <CompanyForm
              company={editingCompany}
              onClose={() => setShowModal(false)}
              onSubmit={handleAddCompany}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyList;
