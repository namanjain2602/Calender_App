import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../../shared/Navbar';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import Footer from '../../shared/Footer';

const companyColors = {
  Wipro: 'bg-blue-100 text-blue-800',
  TCS: 'bg-green-100 text-green-800',
  Infosys: 'bg-yellow-100 text-yellow-800', // Add more colors as needed
};

function Notifications() {
  const [notifications, setNotifications] = useState({
    overdue: [],
    today: [],
  });

  useEffect(() => {
    const storedCompanies = JSON.parse(localStorage.getItem('companies')) || [];
    const currentDate = new Date();

    const calculateNotifications = () => {
      const overdue = [];
      const today = [];

      storedCompanies.forEach((company, companyIndex) => {
        const overdueCommunications = [];
        const todayCommunications = [];

        company.lastCommunications?.forEach((comm, commIndex) => {
          if (!comm.read) {
            const commDate = new Date(comm.date);
            const daysDifference = Math.floor((currentDate - commDate) / (1000 * 3600 * 24));

            if (daysDifference > 0) {
              overdueCommunications.push({ ...comm, due: daysDifference, companyIndex, commIndex });
            } else if (daysDifference === 0) {
              todayCommunications.push({ ...comm, due: 0, companyIndex, commIndex });
            }
          }
        });

        if (overdueCommunications.length > 0) {
          overdue.push({ name: company.name, lastCommunications: overdueCommunications });
        }

        if (todayCommunications.length > 0) {
          today.push({ name: company.name, lastCommunications: todayCommunications });
        }
      });

      setNotifications({ overdue, today });
    };

    calculateNotifications();
  }, []);

  const markAsRead = (type, companyIndex, commIndex) => {
    const storedCompanies = JSON.parse(localStorage.getItem('companies')) || [];
    const targetCompany = storedCompanies[companyIndex];

    if (targetCompany && targetCompany.lastCommunications) {
      targetCompany.lastCommunications[commIndex].read = true;
    }

    localStorage.setItem('companies', JSON.stringify(storedCompanies));

    setNotifications((prev) => {
      const updatedNotifications = { ...prev };
      updatedNotifications[type][companyIndex].lastCommunications = updatedNotifications[type][companyIndex].lastCommunications.filter(
        (_, index) => index !== commIndex
      );

      if (updatedNotifications[type][companyIndex].lastCommunications.length === 0) {
        updatedNotifications[type] = updatedNotifications[type].filter((_, index) => index !== companyIndex);
      }

      return updatedNotifications;
    });
  };

  const calculateCount = (type) => {
    return notifications[type].reduce(
      (count, company) => count + company.lastCommunications.length,
      0
    );
  };

  const overdueCount = calculateCount('overdue');
  const todayCount = calculateCount('today');

  useEffect(() => {
    if (overdueCount > 0) {
      toast.error(`You have ${overdueCount} overdue communications!`);
    }
    if (todayCount > 0) {
      toast.success(`You have ${todayCount} communications due today!`);
    }
  }, [overdueCount, todayCount]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Toaster position="top-right" />
      <Navbar role={'user'} />
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <div className="rounded-lg shadow p-4">
          <h2 className="text-xl font-bold text-red-800 mb-4">Overdue Communications</h2>
          {notifications.overdue.map((company, companyIndex) => (
            <div
              key={companyIndex}
              className={`p-4 mb-4 rounded-lg shadow ${companyColors[company.name] || 'bg-gray-100'}`}
            >
              <h3 className="font-semibold">{company.name}</h3>
              {company.lastCommunications.map((comm, commIndex) => (
                <div key={comm.id} className="flex justify-between items-center mb-2">
                  <p>
                    <span className="font-bold">Type:</span> {comm.type} <br />
                    <span className="font-bold">Last Communication:</span> {comm.date} - Due {comm.due} days ago
                  </p>
                  <button
                    className="text-sm text-blue-500 underline"
                    onClick={() => markAsRead('overdue', comm.companyIndex, comm.commIndex)}
                  >
                    Mark as Read
                  </button>
                </div>
              ))}
            </div>
          ))}
          {notifications.overdue.length === 0 && <p className="text-red-600">No overdue communications.</p>}
        </div>

        <div className="rounded-lg shadow p-4">
          <h2 className="text-xl font-bold text-yellow-800 mb-4">Today's Communications</h2>
          {notifications.today.map((company, companyIndex) => (
            <div
              key={companyIndex}
              className={`p-4 mb-4 rounded-lg shadow ${companyColors[company.name] || 'bg-gray-100'}`}
            >
              <h3 className="font-semibold">{company.name}</h3>
              {company.lastCommunications.map((comm, commIndex) => (
                <div key={comm.id} className="flex justify-between items-center mb-2">
                  <p>
                    <span className="font-bold">Type:</span> {comm.type} <br />
                    <span className="font-bold">Last Communication:</span> {comm.date}
                  </p>
                  <button
                    className="text-sm text-blue-500 underline"
                    onClick={() => markAsRead('today', comm.companyIndex, comm.commIndex)}
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
      <Footer />
    </div>
  );
}

export default Notifications;
