import React, { useState, useEffect } from 'react';
import CommunicationMethodForm from './CommunicationMethodForm';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import Navbar from '../../shared/Navbar';

function CommunicationMethodList() {
  const [methods, setMethods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [methodToEdit, setMethodToEdit] = useState(null);

  // Default communication methods
  const defaultMethods = [
    { id: 1, name: 'LinkedIn Post', description: '', sequence: 1, mandatory: true },
    { id: 2, name: 'LinkedIn Message', description: '', sequence: 2, mandatory: true },
    { id: 3, name: 'Email', description: '', sequence: 3, mandatory: true },
    { id: 4, name: 'Phone Call', description: '', sequence: 4, mandatory: false },
    { id: 5, name: 'Other', description: '', sequence: 5, mandatory: false },
  ];

  useEffect(() => {
    // Load default methods on component mount
    setMethods(defaultMethods);
  }, []);

  const handleAddOrUpdateMethod = (method) => {
    if (method.id) {
      // Update existing method
      setMethods((prevMethods) =>
        prevMethods.map((m) => (m.id === method.id ? method : m))
      );
    } else {
      // Add a new method
      setMethods((prevMethods) => [
        ...prevMethods,
        { ...method, id: prevMethods.length + 1 },
      ]);
    }
    setShowModal(false); // Close modal after saving
    setMethodToEdit(null); // Reset edit state
  };

  const handleDeleteMethod = (id) => {
    setMethods((prevMethods) => prevMethods.filter((m) => m.id !== id));
  };

  const handleEditMethod = (method) => {
    setMethodToEdit(method); // Set the selected method to edit
    setShowModal(true); // Open modal
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex flex-col items-center">Communication Method Management</h1>
        <div className="flex flex-col items-center mb-8">
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => {
              setShowModal(true);
              setMethodToEdit(null); // Reset edit state for a new entry
            }}
          >
            Add Communication Method
          </button>
        </div>

        <div className="bg-white rounded-md shadow-md overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Method</th>
                <th className="px-6 py-3 text-left font-semibold">Mandatory</th>
                <th className="px-6 py-3 text-left font-semibold">Sequence</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {methods.map((method) => (
                <tr key={method.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{method.name}</td>
                  <td className="px-6 py-4">{method.mandatory ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4">{method.sequence}</td>
                  <td className="px-6 py-4 flex space-x-4">
                    <button
                      className="p-2 rounded-full text-blue-500 hover:text-white hover:bg-blue-500 transition duration-200"
                      onClick={() => handleEditMethod(method)}
                    >
                      <CiEdit size={20} />
                    </button>
                    <button
                      className="p-2 rounded-full text-red-500 hover:text-white hover:bg-red-500 transition duration-200"
                      onClick={() => handleDeleteMethod(method.id)}
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Section */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <CommunicationMethodForm
              methodToEdit={methodToEdit}
              onSubmit={handleAddOrUpdateMethod}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunicationMethodList;
