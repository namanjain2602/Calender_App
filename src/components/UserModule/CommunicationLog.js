import React, { useState } from 'react';

const CommunicationLog = () => {
  const [companies] = useState([
    'Company A',
    'Company B',
    'Company C',
    'Company D',
    'Company E',
  ]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [communicationType, setCommunicationType] = useState('');
  const [communicationDate, setCommunicationDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleCompanySelect = (company) => {
    if (selectedCompanies.includes(company)) {
      setSelectedCompanies(selectedCompanies.filter((c) => c !== company));
    } else {
      setSelectedCompanies([...selectedCompanies, company]);
    }
  };

  const handleSubmit = () => {
    // Simulate logging the communication
    console.log('Communication logged:', {
      companies: selectedCompanies,
      communicationType,
      communicationDate,
      notes,
    });

    // Reset highlights for selected companies (simulated)
    alert(`Highlights reset for: ${selectedCompanies.join(', ')}`);

    // Reset state
    setSelectedCompanies([]);
    setCommunicationType('');
    setCommunicationDate('');
    setNotes('');
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Communication Log</h1>

      {/* Company Selection */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-medium mb-2">Select Companies</h2>
        <div className="grid grid-cols-2 gap-2">
          {companies.map((company, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg cursor-pointer border ${
                selectedCompanies.includes(company)
                  ? 'bg-blue-200 border-blue-400'
                  : 'bg-white border-gray-300'
              }`}
              onClick={() => handleCompanySelect(company)}
            >
              {company}
            </div>
          ))}
        </div>
      </div>

      {/* Communication Performed Button */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        onClick={() => setShowModal(true)}
        disabled={selectedCompanies.length === 0}
      >
        Communication Performed
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Log Communication</h2>

            {/* Communication Type */}
            <div className="mb-4">
              <label className="block font-medium mb-2">Type of Communication</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={communicationType}
                onChange={(e) => setCommunicationType(e.target.value)}
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="LinkedIn Post">LinkedIn Post</option>
                <option value="Email">Email</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date of Communication */}
            <div className="mb-4">
              <label className="block font-medium mb-2">Date of Communication</label>
              <input
                type="date"
                className="w-full p-2 border rounded-lg"
                value={communicationDate}
                onChange={(e) => setCommunicationDate(e.target.value)}
              />
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label className="block font-medium mb-2">Notes</label>
              <textarea
                className="w-full p-2 border rounded-lg"
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationLog;
