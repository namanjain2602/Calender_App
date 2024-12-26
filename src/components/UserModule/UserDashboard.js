import React from 'react';
import { Tooltip } from 'react-tooltip'; // Tooltip library
import 'react-tooltip/dist/react-tooltip.css';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';

const UserDashboard = () => {
  const companies = [
    {
      name: 'Company A',
      lastCommunications: [
        { type: 'Email', date: '2024-12-20', notes: 'Follow-up email regarding the proposal.' },
        { type: 'LinkedIn Post', date: '2024-12-15', notes: 'Shared job updates.' },
      ],
      nextCommunication: { type: 'Phone Call', date: '2024-12-30' },
      highlight: 'red',
    },
    {
      name: 'Company B',
      lastCommunications: [
        { type: 'Phone Call', date: '2024-12-18', notes: 'Discussed project requirements.' },
        { type: 'Email', date: '2024-12-10', notes: 'Sent meeting summary.' },
      ],
      nextCommunication: { type: 'LinkedIn Post', date: '2024-12-26' },
      highlight: 'yellow',
    },
    {
      name: 'Company C',
      lastCommunications: [
        { type: 'Email', date: '2024-12-12', notes: 'Confirmed participation in the event.' },
      ],
      nextCommunication: { type: 'Follow-up', date: '2024-12-28' },
      highlight: '',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        {/* Content Section */}
        <div className="flex-grow bg-gray-50 p-8 overflow-hidden">
          <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">User Dashboard</h1>

            {/* Dashboard Table */}
            <div className="overflow-x-auto flex-grow">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-4 border-b text-left font-semibold text-gray-600">Company Name</th>
                    <th className="p-4 border-b text-left font-semibold text-gray-600">
                      Last Five Communications
                    </th>
                    <th className="p-4 border-b text-left font-semibold text-gray-600">
                      Next Scheduled Communication
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-100 ${company.highlight === 'red'
                        ? 'bg-red-100'
                        : company.highlight === 'yellow'
                          ? 'bg-yellow-100'
                          : ''
                        }`}
                    >
                      {/* Company Name */}
                      <td className="p-4 border-b font-medium text-gray-800">{company.name}</td>

                      {/* Last Five Communications */}
                      <td className="p-4 border-b">
                        {company.lastCommunications.length > 0 ? (
                          <ul>
                            {company.lastCommunications.map((comm, i) => (
                              <li
                                key={i}
                                data-tooltip-id={`tooltip-${company.name}-${i}`}
                                data-tooltip-content={comm.notes}
                                className="cursor-pointer text-blue-600 underline"
                              >
                                {comm.type} - {comm.date}
                                <Tooltip id={`tooltip-${company.name}-${i}`} />
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-500">No recent communications</span>
                        )}
                      </td>

                      {/* Next Scheduled Communication */}
                      <td className="p-4 border-b">
                        {company.nextCommunication ? (
                          <span>
                            {company.nextCommunication.type} - {company.nextCommunication.date}
                          </span>
                        ) : (
                          <span className="text-gray-500">No upcoming communication</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default UserDashboard;
