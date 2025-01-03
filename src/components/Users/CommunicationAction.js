import React, { useState } from 'react';
import Footer from '../../shared/Footer';

function CommunicationAction({ company, communicationTypes, onClose, onAddCommunication }) {
  const [newComm, setNewComm] = useState({
    type: '',
    date: '',
    notes: '', // Added notes field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComm({ ...newComm, [name]: value });
  };

  const handleSubmit = () => {
    if (newComm.type && newComm.date) {
      // Trigger the onAddCommunication function passed from the parent component
      onAddCommunication(newComm.type, newComm.date, newComm.notes); // Pass notes as well
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Add Communication for {company.name}</h2>

        {/* Communication Type */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Communication Type:</label>
          <select
            name="type"
            value={newComm.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Type</option>
            {communicationTypes.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date:</label>
          <input
            type="date"
            name="date"
            value={newComm.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Notes:</label>
          <textarea
            name="notes"
            value={newComm.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter additional notes (optional)"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Save Communication
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CommunicationAction;
