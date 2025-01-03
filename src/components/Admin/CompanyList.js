import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../../shared/Navbar';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import CompanyForm from './CompanyForm';
import Footer from '../../shared/Footer';

function CompanyList() {
  const [companies, setCompanies] = useState(() => {
    const storedCompanies = localStorage.getItem('companies');
    return storedCompanies ? JSON.parse(storedCompanies) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const handleAddCompany = (company) => {
    if (editingCompany) {
      const updatedCompanies = companies.map((c) => (c.id === company.id ? company : c));
      setCompanies(updatedCompanies);
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
      toast.success('Company updated successfully!');
    } else {
      const newCompanies = [...companies, { ...company, id: companies.length + 1 }];
      setCompanies(newCompanies);
      localStorage.setItem('companies', JSON.stringify(newCompanies));
      toast.success('Company added successfully!');
    }
    setShowModal(false);
    setEditingCompany(null);
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setShowModal(true);
  };

  const handleDeleteCompany = (companyId) => {
    const updatedCompanies = companies.filter((company) => company.id !== companyId);
    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    toast.error('Company deleted successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-roboto">
      {/* Toast Notifications */}
      <Toaster position="top-right" />

      {/* Header */}
      <Navbar role={'admin'} />

      {/* Main Section */}
      <div className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Company Management</h1>
        <div className="flex justify-center mb-8">
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-transform transform hover:scale-105"
            onClick={() => {
              setEditingCompany(null);
              setShowModal(true);
            }}
          >
            Add Company
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
          <table className="min-w-full table-auto text-gray-700">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">S.No</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr
                  key={company.id}
                  className="border-b hover:bg-gray-100 transition-all duration-200"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{company.name}</td>
                  <td className="px-6 py-4">{company.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-4">
                      <button
                        title="Edit"
                        className="p-2 rounded-full text-green-500 hover:text-white hover:bg-green-500 transition duration-200"
                        onClick={() => handleEditCompany(company)}
                      >
                        <CiEdit size={20} />
                      </button>
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
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl transform transition-transform scale-95 hover:scale-105">
            <CompanyForm
              company={editingCompany}
              onClose={() => setShowModal(false)}
              onSubmit={handleAddCompany}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CompanyList;
