import React, { useState } from 'react';

const CommunicationMethodManagement = ({ onMethodsChange }) => {
  const [methods, setMethods] = useState([
    { name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, mandatory: true },
    { name: 'LinkedIn Message', description: 'Send LinkedIn Message', sequence: 2, mandatory: true },
    { name: 'Email', description: 'Send Email', sequence: 3, mandatory: true },
    { name: 'Phone Call', description: 'Call the company', sequence: 4, mandatory: false },
    { name: 'Other', description: 'Other methods of communication', sequence: 5, mandatory: false },
  ]);

  const handleAddMethod = () => {
    const newMethod = {
      name: 'New Method',
      description: '',
      sequence: methods.length + 1,
      mandatory: false,
    };
    setMethods([...methods, newMethod]);
    onMethodsChange([...methods, newMethod]);  // Callback to update parent component
  };

  const handleDeleteMethod = (index) => {
    const updatedMethods = methods.filter((_, i) => i !== index);
    setMethods(updatedMethods);
    onMethodsChange(updatedMethods);  // Update parent component
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMethods = [...methods];
    updatedMethods[index][name] = value;
    setMethods(updatedMethods);
    onMethodsChange(updatedMethods);  // Update parent component
  };

  const handleCheckboxChange = (index) => {
    const updatedMethods = [...methods];
    updatedMethods[index].mandatory = !updatedMethods[index].mandatory;
    setMethods(updatedMethods);
    onMethodsChange(updatedMethods);  // Update parent component
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Manage Communication Methods</h2>

        {/* Communication Methods List */}
        <div className="space-y-6">
          {methods.map((method, index) => (
            <div key={index} className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  name="name"
                  value={method.name}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Method Name"
                  className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  name="description"
                  value={method.description}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Description"
                  className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="sequence"
                  value={method.sequence}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Sequence"
                  className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={method.mandatory}
                    onChange={() => handleCheckboxChange(index)}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="text-gray-700 font-semibold">Mandatory</label>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDeleteMethod(index)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Delete Method
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Method Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleAddMethod}
            className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Add New Communication Method
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationMethodManagement;
