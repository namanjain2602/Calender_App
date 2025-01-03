import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import CommunicationMethodForm from './CommunicationMethodForm';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';

function CommunicationMethodList() {
  const [methods, setMethods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [methodToEdit, setMethodToEdit] = useState(null);

  useEffect(() => {
    const storedMethods = JSON.parse(localStorage.getItem('methods')) || [];
    setMethods(storedMethods);
  }, []);

  const handleAddOrUpdateMethod = (method) => {
    let updatedMethods;
    if (method.id) {
      updatedMethods = methods.map((m) => (m.id === method.id ? method : m));
      toast.success('Communication method updated successfully!');
    } else {
      updatedMethods = [...methods, { ...method, id: methods.length + 1 }];
      toast.success('Communication method added successfully!');
    }
    setMethods(updatedMethods);
    localStorage.setItem('methods', JSON.stringify(updatedMethods));
    setShowModal(false);
    setMethodToEdit(null);
  };

  const handleDeleteMethod = (id) => {
    const updatedMethods = methods.filter((m) => m.id !== id);
    setMethods(updatedMethods);
    localStorage.setItem('methods', JSON.stringify(updatedMethods));
    toast.error('Communication method deleted successfully!');
  };

  const handleEditMethod = (method) => {
    setMethodToEdit(method);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-roboto">
      {/* Toast Notifications */}
      <Toaster position="top-right" />

      <Navbar role={'admin'} />

      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Communication Method Management</h1>
        <div className="flex justify-center mb-8">
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={() => {
              setShowModal(true);
              setMethodToEdit(null); // Reset edit state for a new entry
            }}
          >
            Add Communication Method
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full table-auto text-gray-700">
            <thead className="bg-gray-600 text-white">
              <tr>
              <th className="px-6 py-3 text-left">S.No</th>
                <th className="px-6 py-3 text-left">Method</th>
                <th className="px-6 py-3 text-left">Mandatory</th>
                <th className="px-6 py-3 text-left">Sequence</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {methods.length > 0 ? (
                methods.map((method,index) => (
                  <tr key={method.id} className="border-b hover:bg-gray-50 transition duration-200">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{method.name}</td>
                    <td className="px-6 py-4">{method.mandatory ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4">{method.sequence}</td>
                    <td className="px-6 py-4 flex space-x-4">
                      <button
                        className="p-2 rounded-full text-green-500 hover:text-white hover:bg-green-500 transition duration-200"
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
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center px-6 py-4 text-gray-700">
                    No communication methods available
                  </td>
                </tr>
              )}
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
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transform transition-transform scale-95 hover:scale-105">
            <CommunicationMethodForm
              methodToEdit={methodToEdit}
              onSubmit={handleAddOrUpdateMethod}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CommunicationMethodList;
