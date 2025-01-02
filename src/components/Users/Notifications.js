import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../../shared/Navbar';
import { MdOutlineNotificationsActive } from 'react-icons/md';

const companyColors = {
  Wipro: 'bg-blue-100 text-blue-800',
  TCS: 'bg-green-100 text-green-800',
  Infosys: 'bg-yellow-100 text-yellow-800', // Add more colors as needed
};

function Notifications() {
  const [notifications, setNotifications] = useState({
    overdue: [
      {
        name: 'Wipro',
        lastCommunications: [
          { id: 1, type: 'Email', date: '2024-12-30', due: 1 },
          { id: 2, type: 'LinkedIn', date: '2024-11-25', due: 36 },
        ],
      },
      {
        name: 'TCS',
        lastCommunications: [
          { id: 3, type: 'Email', date: '2024-12-01', due: 30 },
          { id: 4, type: 'LinkedIn', date: '2024-11-25', due: 36 },
        ],
      },
    ],
    today: [
      {
        name: 'Wipro',
        lastCommunications: [
          { id: 5, type: 'Call', date: '2024-12-30', due: 0 },
        ],
      },
    ],
  });

  const calculateCount = (type) => {
    return notifications[type].reduce(
      (count, company) => count + company.lastCommunications.length,
      0
    );
  };

  const [overdueCount, setOverdueCount] = useState(calculateCount('overdue'));
  const [todayCount, setTodayCount] = useState(calculateCount('today'));

  useEffect(() => {
    if (overdueCount > 0) {
      toast.error(`You have ${overdueCount} overdue communications!`);
    }
    if (todayCount > 0) {
      toast.success(`You have ${todayCount} communications due today!`);
    }
  }, [overdueCount, todayCount]);

  const markAsRead = (type, companyIndex, commId) => {
    setNotifications((prev) => {
      const updatedNotifications = { ...prev };
      updatedNotifications[type][companyIndex].lastCommunications = updatedNotifications[type][companyIndex].lastCommunications.filter(
        (comm) => comm.id !== commId
      );

      if (updatedNotifications[type][companyIndex].lastCommunications.length === 0) {
        updatedNotifications[type] = updatedNotifications[type].filter(
          (_, index) => index !== companyIndex
        );
      }

      return updatedNotifications;
    });

    if (type === 'overdue') {
      setOverdueCount(calculateCount('overdue') - 1);
    } else if (type === 'today') {
      setTodayCount(calculateCount('today') - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <Navbar /> {/* Add Navbar here */}
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Overdue Notifications Section */}
        <div className="rounded-lg shadow p-4">
          <h2 className="text-xl font-bold text-red-800 mb-4">Overdue Communications</h2>
          {notifications.overdue.map((company, companyIndex) => (
            <div
              key={companyIndex}
              className={`p-4 mb-4 rounded-lg shadow ${companyColors[company.name] || 'bg-gray-100'}`}
            >
              <h3 className="font-semibold">{company.name}</h3>
              {company.lastCommunications.map((comm) => (
                <div key={comm.id} className="flex justify-between items-center mb-2">
                  <p>
                    <span className="font-bold">Type:</span> {comm.type} <br />
                    <span className="font-bold">Last Communication:</span> {comm.date} - Due {comm.due} days ago
                  </p>
                  <button
                    className="text-sm text-blue-500 underline"
                    onClick={() => markAsRead('overdue', companyIndex, comm.id)}
                  >
                    Mark as Read
                  </button>
                </div>
              ))}
            </div>
          ))}
          {notifications.overdue.length === 0 && <p className="text-red-600">No overdue communications.</p>}
        </div>

        {/* Today's Notifications Section */}
        <div className="rounded-lg shadow p-4">
          <h2 className="text-xl font-bold text-yellow-800 mb-4">Today's Communications</h2>
          {notifications.today.map((company, companyIndex) => (
            <div
              key={companyIndex}
              className={`p-4 mb-4 rounded-lg shadow ${companyColors[company.name] || 'bg-gray-100'}`}
            >
              <h3 className="font-semibold">{company.name}</h3>
              {company.lastCommunications.map((comm) => (
                <div key={comm.id} className="flex justify-between items-center mb-2">
                  <p>
                    <span className="font-bold">Type:</span> {comm.type} <br />
                    <span className="font-bold">Last Communication:</span> {comm.date}
                  </p>
                  <button
                    className="text-sm text-blue-500 underline"
                    onClick={() => markAsRead('today', companyIndex, comm.id)}
                  >
                    Mark as Read
                  </button>
                </div>
              ))}
            </div>
          ))}
          {notifications.today.length === 0 && <p className="text-yellow-600">No communications for today.</p>}
        </div>
      </div>

      {/* Notifications Button */}
      <div className="fixed bottom-4 right-4">
        <div className="relative">
          <button className="bg-blue-500 text-white p-4 rounded-full shadow hover:bg-blue-600">
            <MdOutlineNotificationsActive />
          </button>
          <div
            className="absolute top-0 right-0 bg-red-600 text-white text-sm rounded-full px-2"
            title={`${overdueCount} overdue, ${todayCount} due today`}
          >
            {overdueCount + todayCount}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
