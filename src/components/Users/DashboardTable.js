import React, { useState } from 'react';
import Navbar from '../../shared/Navbar';

function DashboardTable() {
  const [companies, setCompanies] = useState([
    {
      name: 'Wipro',
      lastCommunications: [
        { type: 'Email', date: '2024-12-30' },
        { type: 'LinkedIn', date: '2024-11-25' },
      ],
      nextCommunication: { type: 'Email', date: '2024-12-31' },
      overdue: false,
      dueToday: false,
    },
    {
      name: 'TCS',
      lastCommunications: [
        { type: 'Email', date: '2024-12-01' },
        { type: 'LinkedIn Message', date: '2024-11-25' },
      ],
      nextCommunication: { type: 'Call', date: '2024-12-31' },
      overdue: true,
      dueToday: false,
    },
  ]);

  // State to manage form inputs
  const [newCommunication, setNewCommunication] = useState({
    type: '',
    date: '',
    companyIndex: null,
  });

  // Function to handle adding a communication
  const handleAddCommunication = () => {
    const { type, date, companyIndex } = newCommunication;

    if (type && date && companyIndex !== null) {
      setCompanies((prevCompanies) => {
        return prevCompanies.map((company, i) => {
          if (i === companyIndex) {
            const updatedLastCommunications = [
              { type, date },
              ...company.lastCommunications.slice(0, 4), // Keep only the last 5
            ];
            return {
              ...company,
              lastCommunications: updatedLastCommunications,
              nextCommunication: { type, date },
            };
          }
          return company;
        });
      });

      // Reset the form inputs
      setNewCommunication({ type: '', date: '', companyIndex: null });
    }
  };

  const getRowClass = (company) => {
    if (company.overdue) return 'bg-red-100';
    if (company.dueToday) return 'bg-yellow-100';
    return 'bg-green-100';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <h1 className="text-2xl font-bold text-center py-6">Dashboard</h1>
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Company Name</th>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">
                  Last Five Communications
                </th>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">
                  Next Scheduled Communication
                </th>
                <th className="text-left px-6 py-3 text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr
                  key={index}
                  className={`${getRowClass(company)} border-b hover:bg-gray-100`}
                >
                  <td className="px-6 py-4 text-gray-700">{company.name}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {company.lastCommunications.map((comm, i) => (
                      <div
                        key={i}
                        className="hover:underline cursor-pointer"
                        title={`Type: ${comm.type}, Date: ${comm.date}`}
                      >
                        {comm.type} ({comm.date})
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {company.nextCommunication
                      ? `${company.nextCommunication.type} (${company.nextCommunication.date})`
                      : 'No scheduled communication'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
                      onClick={() =>
                        setNewCommunication((prev) => ({
                          ...prev,
                          companyIndex: index,
                        }))
                      }
                    >
                      Add Communication
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Communication Form */}
        {newCommunication.companyIndex !== null && (
          <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add Communication for {companies[newCommunication.companyIndex].name}
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Type:</label>
                <input
                  type="text"
                  value={newCommunication.type}
                  onChange={(e) =>
                    setNewCommunication((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Email, Call, LinkedIn"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date:</label>
                <input
                  type="date"
                  value={newCommunication.date}
                  onChange={(e) =>
                    setNewCommunication((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                onClick={handleAddCommunication}
                className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition"
              >
                Save Communication
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardTable;
