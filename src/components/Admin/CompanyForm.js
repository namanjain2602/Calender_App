import React, { useState, useEffect } from 'react';

function CompanyForm({ company, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: '',
    location: '',
    linkedin: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    periodicity: 'weekly',
  });

  useEffect(() => {
    if (company) {
      setFormData(company);  // Prefill data when editing
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);  // Submit the form
    setFormData({
      id: Date.now(),
      name: '',
      location: '',
      linkedin: '',
      emails: '',
      phoneNumbers: '',
      comments: '',
      periodicity: 'weekly',
    });
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto p-4">
      {/* Dynamic Title */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        {company ? 'Edit Company' : 'Add Company'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-large mb-2 ">Company Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter company name"
            className="w-full px-4 py-3 border rounded-lg shadow-sm"
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="w-full px-4 py-3 border rounded-lg shadow-sm"
          />
        </div>

        {/* LinkedIn Profile */}
        <div>
          <label htmlFor="linkedin" className="block text-gray-700 font-medium mb-2">LinkedIn Profile</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="Enter LinkedIn profile link"
            className="w-full px-4 py-3 border rounded-lg shadow-sm"
          />
        </div>

        {/* Emails */}
        <div>
          <label htmlFor="emails" className="block text-gray-700 font-medium mb-2">Emails</label>
          <input
            type="email"
            name="emails"
            value={formData.emails}
            onChange={handleChange}
            placeholder="Enter email addresses (comma-separated)"
            className="w-full px-4 py-3 border rounded-lg shadow-sm"
          />
        </div>

        {/* Phone Numbers */}
        <div>
          <label htmlFor="phoneNumbers" className="block text-gray-700 font-medium mb-2">Phone Numbers</label>
          <input
            type="text"
            name="phoneNumbers"
            value={formData.phoneNumbers}
            onChange={handleChange}
            placeholder="Enter phone numbers (comma-separated)"
            className="w-full px-4 py-3 border rounded-lg shadow-sm"
          />
        </div>

        {/* Comments */}
        <div>
          <label htmlFor="comments" className="block text-gray-700 font-medium mb-2">Comments</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Enter comments or additional information"
            rows="4"
            className="w-full px-4 py-3 border rounded-lg shadow-sm"
          ></textarea>
        </div>

        {/* Communication Periodicity */}
        <div>
          <label htmlFor="periodicity" className="block text-gray-700 font-medium mb-2">Communication Periodicity</label>
          <select
            name="periodicity"
            value={formData.periodicity}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm"
          >
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Every 2 Weeks</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            {company ? 'Update' : 'Add'} Company
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanyForm;
