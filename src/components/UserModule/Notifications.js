import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Notifications = () => {
  // Sample communications data
  const communications = [
    { date: '2024-12-20', company: 'Company A', status: 'Overdue' },
    { date: '2024-12-25', company: 'Company B', status: 'Due Today' },
    { date: '2024-12-27', company: 'Company C', status: 'Upcoming' },
    { date: '2024-12-22', company: 'Company D', status: 'Overdue' },
    { date: '2024-12-25', company: 'Company E', status: 'Due Today' },
  ];

  const [overdueCount, setOverdueCount] = useState(0);
  const [dueTodayCount, setDueTodayCount] = useState(0);

  useEffect(() => {
    // Get today's date
    const today = new Date();
    
    // Filter overdue and today's communications
    const overdueCommunications = communications.filter(
      (comm) => new Date(comm.date) < today && comm.status === 'Overdue'
    );
    const dueTodayCommunications = communications.filter(
      (comm) => format(new Date(comm.date), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd') && comm.status === 'Due Today'
    );

    // Set the counts
    setOverdueCount(overdueCommunications.length);
    setDueTodayCount(dueTodayCommunications.length);
  }, [communications]);

  return (
    <div className="p-6">
      {/* Notification Icon */}
      <div className="relative mb-6">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <div className="absolute top-0 right-0 flex items-center justify-center bg-red-600 text-white rounded-full text-xs font-bold w-6 h-6">
          {overdueCount + dueTodayCount}
        </div>
      </div>

      {/* Notification Grids */}
      <div className="grid grid-cols-2 gap-6">
        {/* Overdue Communications */}
        <div className="bg-red-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-red-600">Overdue Communications</h2>
          <ul>
            {communications
              .filter((comm) => new Date(comm.date) < new Date() && comm.status === 'Overdue')
              .map((comm, index) => (
                <li key={index} className="text-sm text-red-700">
                  {comm.company} - {format(new Date(comm.date), 'MMMM d, yyyy')}
                </li>
              ))}
            {overdueCount === 0 && <li className="text-sm text-gray-500">No overdue communications.</li>}
          </ul>
        </div>

        {/* Today's Communications */}
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-yellow-600">Today's Communications</h2>
          <ul>
            {communications
              .filter(
                (comm) => format(new Date(comm.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') && comm.status === 'Due Today'
              )
              .map((comm, index) => (
                <li key={index} className="text-sm text-yellow-700">
                  {comm.company} - {format(new Date(comm.date), 'MMMM d, yyyy')}
                </li>
              ))}
            {dueTodayCount === 0 && <li className="text-sm text-gray-500">No communications due today.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
