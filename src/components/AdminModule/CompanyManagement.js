import React, { useState } from 'react';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [companyData, setCompanyData] = useState({
    name: '',
    location: '',
    linkedin: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    communicationPeriodicity: '',
  });

  const handleAddCompany = () => {
    const newCompany = { ...companyData };
    setCompanies([...companies, newCompany]);
    setCompanyData({
      name: '',
      location: '',
      linkedin: '',
      emails: '',
      phoneNumbers: '',
      comments: '',
      communicationPeriodicity: '',
    });
  };

  const handleDeleteCompany = (index) => {
    const updatedCompanies = companies.filter((_, i) => i !== index);
    setCompanies(updatedCompanies);
  };

  const handleEditCompany = (index) => {
    const company = companies[index];
    setCompanyData({ ...company });
    handleDeleteCompany(index); // Optionally delete the original and replace with the updated
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Company Management</h2>

        {/* Company Form */}
        <div className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={companyData.name}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={companyData.location}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn Profile"
            value={companyData.linkedin}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="emails"
            placeholder="Emails (comma separated)"
            value={companyData.emails}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="phoneNumbers"
            placeholder="Phone Numbers (comma separated)"
            value={companyData.phoneNumbers}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="comments"
            placeholder="Comments"
            value={companyData.comments}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="communicationPeriodicity"
            placeholder="Communication Periodicity (e.g., every 2 weeks)"
            value={companyData.communicationPeriodicity}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-center">
            <button
              onClick={handleAddCompany}
              className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
            >
              Add Company
            </button>
          </div>
        </div>

        {/* Company List */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Company List</h3>
          <ul className="space-y-6">
            {companies.map((company, index) => (
              <li
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition duration-300"
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Company Name:</span>
                    <span className="text-gray-800">{company.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Location:</span>
                    <span className="text-gray-800">{company.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">LinkedIn:</span>
                    <a
                      href={company.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {company.linkedin}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Emails:</span>
                    <span className="text-gray-800">{company.emails}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Phone Numbers:</span>
                    <span className="text-gray-800">{company.phoneNumbers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Comments:</span>
                    <span className="text-gray-800">{company.comments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Communication Periodicity:</span>
                    <span className="text-gray-800">{company.communicationPeriodicity}</span>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => handleEditCompany(index)}
                      className="text-yellow-500 hover:text-yellow-600 font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCompany(index)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompanyManagement;
