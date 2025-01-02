import React, { useState } from 'react';
import Navbar from '../../shared/Navbar';

function CalendarView() {
  // Sample data for past and upcoming communications
  const pastCommunications = [
    { date: '2024-12-20', method: 'Email', details: 'Sent follow-up email regarding project update' },
    { date: '2024-12-18', method: 'Phone Call', details: 'Discussed project specifications' },
  ];

  const upcomingCommunications = [
    { date: '2025-01-05', method: 'Meeting', details: 'Team meeting to discuss goals for Q1' },
    { date: '2025-01-10', method: 'Email', details: 'Send out newsletter' },
  ];

  // Function to check if a date has communication events
  const getCommunicationsForDate = (date) => {
    const communications = [...pastCommunications, ...upcomingCommunications];
    return communications.filter((comm) => comm.date === date);
  };

  // Generate the current month's calendar grid (simplified for now)
  const getCalendarDays = (currentDate) => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(); // Get the number of days in the month
    const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // Get the first day of the month (0-6)
    const calendarDays = [];
    
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }

    return calendarDays;
  };

  // Get current date, month, and year for state management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'

  // Change the current date to show the previous or next month
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Handle week view: showing the week of the current date
  const getWeekDays = () => {
    const weekDays = [];
    const startOfWeek = currentDate.getDate() - currentDate.getDay(); // Start from Sunday of the current week
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(currentDate.setDate(startOfWeek + i));
      weekDays.push(newDate.getDate());
    }
    return weekDays;
  };

  const calendarDays = viewMode === 'month' ? getCalendarDays(currentDate) : getWeekDays();

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className="p-4">
        {/* View Mode Toggle */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {viewMode === 'month' ? `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}` : `Week of ${currentDate.toLocaleDateString()}`}
          </h2>

          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => changeMonth(-1)}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => changeMonth(1)}
            >
              Next
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => setViewMode(viewMode === 'month' ? 'week' : 'month')}
            >
              {viewMode === 'month' ? 'Week View' : 'Month View'}
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <section className="mt-4">
          <div className={`grid ${viewMode === 'month' ? 'grid-cols-7' : 'grid-cols-7'} gap-2`}>
            {viewMode === 'month' && ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={index} className="font-semibold text-center">{day}</div>
            ))}
            
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`p-4 border border-gray-300 rounded-lg ${
                  day ? 'bg-white' : 'bg-gray-200'
                }`}
              >
                {day && (
                  <div className="text-center">
                    <span className="block">{day}</span>
                    {getCommunicationsForDate(`2025-${currentDate.getMonth() + 1 < 10 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1}-${day < 10 ? '0' + day : day}`).map((comm, idx) => (
                      <div key={idx} className="text-xs text-gray-600 mt-1">
                        <div>{comm.method}</div>
                        <div>{comm.details}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CalendarView;
