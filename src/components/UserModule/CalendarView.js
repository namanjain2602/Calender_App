import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns'; // Use date-fns for date formatting

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sample past communications data
  const pastCommunications = [
    { date: '2024-12-20', method: 'Email', company: 'Company A' },
    { date: '2024-12-18', method: 'LinkedIn Post', company: 'Company B' },
    { date: '2024-12-15', method: 'Phone Call', company: 'Company C' },
  ];

  // Sample upcoming communications data
  const upcomingCommunications = [
    { date: '2024-12-27', method: 'LinkedIn Message', company: 'Company D' },
    { date: '2024-12-30', method: 'Email', company: 'Company E' },
  ];

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Helper function to render a calendar day cell
  const renderDayCell = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const isPastCommunication = pastCommunications.some(
      (comm) => comm.date === formattedDate
    );
    const isUpcomingCommunication = upcomingCommunications.some(
      (comm) => comm.date === formattedDate
    );

    return (
      <div
        className={`flex justify-center items-center p-4 cursor-pointer rounded-lg transform transition-all duration-300 ease-in-out hover:scale-110 ${
          isPastCommunication ? 'bg-blue-200' : ''
        } ${isUpcomingCommunication ? 'bg-yellow-200' : ''}`}
        onClick={() => handleDateClick(date)}
      >
        <span className="font-semibold text-lg">{format(date, 'd')}</span>
      </div>
    );
  };

  // Render the calendar for the current month
  const renderCalendar = () => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const startOfWeek = start.getDay();
    const daysInMonth = end.getDate();
    
    const days = [];

    // Add empty cells for days before the start of the month
    for (let i = 0; i < startOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-4"></div>);
    }

    // Add the days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
      days.push(renderDayCell(date));
    }

    // Add empty cells for the days after the end of the month
    const remainingCells = 7 - (days.length % 7);
    for (let i = 0; i < remainingCells && remainingCells !== 7; i++) {
      days.push(<div key={`empty-end-${i}`} className="p-4"></div>);
    }

    return (
      <div className="grid grid-cols-7 gap-4">
        {days}
      </div>
    );
  };

  // Function to navigate to previous month
  const handlePrevMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  // Function to navigate to next month
  const handleNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center text-blue-600">View Calendar</h1>

      {/* Calendar Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevMonth}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Prev
        </button>
        <div className="text-2xl font-bold text-gray-700">
          {format(selectedDate, 'MMMM yyyy')}
        </div>
        <button
          onClick={handleNextMonth}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Next
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-gray-100 p-6 rounded-xl shadow-md mb-6">
        {/* Weekdays Header */}
        <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="p-2">{day}</div>
          ))}
        </div>

        {renderCalendar()}
      </div>

      {/* Communications for the selected date */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Communications for {format(selectedDate, 'MMMM d, yyyy')}
        </h3>

        <div className="mb-4">
          <h4 className="font-medium text-lg text-gray-700">Past Communications:</h4>
          <ul>
            {pastCommunications
              .filter((comm) => comm.date === format(selectedDate, 'yyyy-MM-dd'))
              .map((comm, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {comm.method} - <span className="font-semibold">{comm.company}</span>
                </li>
              ))}
            {pastCommunications
              .filter((comm) => comm.date === format(selectedDate, 'yyyy-MM-dd')).length === 0 && (
              <li className="text-sm text-gray-500">No past communications for this day.</li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-lg text-gray-700">Upcoming Communications:</h4>
          <ul>
            {upcomingCommunications
              .filter((comm) => comm.date === format(selectedDate, 'yyyy-MM-dd'))
              .map((comm, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {comm.method} - <span className="font-semibold">{comm.company}</span>
                </li>
              ))}
            {upcomingCommunications
              .filter((comm) => comm.date === format(selectedDate, 'yyyy-MM-dd')).length === 0 && (
              <li className="text-sm text-gray-500">No upcoming communications for this day.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
