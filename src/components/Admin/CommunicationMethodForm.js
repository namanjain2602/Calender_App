import React, { useState, useEffect } from 'react';

function CommunicationMethodForm({ methodToEdit, onSubmit, onClose }) {
  const [method, setMethod] = useState({
    name: '',
    description: '',
    sequence: '',
    mandatory: false,
  });

  useEffect(() => {
    if (methodToEdit) {
      setMethod(methodToEdit); // Populate fields for editing
    }
  }, [methodToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMethod({
      ...method,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (method.name && method.sequence) {
      onSubmit(method);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {methodToEdit ? 'Edit Communication Method' : 'Add Communication Method'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={method.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea
            name="description"
            value={method.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Sequence</label>
          <input
            type="number"
            name="sequence"
            value={method.sequence}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="mandatory"
            checked={method.mandatory}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-semibold text-gray-700">Mandatory</label>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
            {methodToEdit ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommunicationMethodForm;
