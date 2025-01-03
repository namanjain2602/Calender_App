import React, { useState, useEffect } from 'react';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';

function CalendarView() {
  const [companies, setCompanies] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // "month", "week", "day", "agenda"
  const [hoveredDate, setHoveredDate] = useState(null);

  // Fetch companies data from localStorage
  useEffect(() => {
    const storedCompanies = localStorage.getItem('companies');
    if (storedCompanies) {
      setCompanies(JSON.parse(storedCompanies));
    }
  }, []);

  const changeDate = (direction) => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + direction);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + direction * 7);
    } else if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + direction);
    }
    setCurrentDate(newDate);
  };

  const getCalendarDays = () => {
    if (viewMode === 'month') {
      const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
      const calendarDays = Array(startDay).fill(null);

      for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i);
      }
      return calendarDays;
    } else if (viewMode === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      return Array.from({ length: 7 }, (_, i) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        return day;
      });
    } else if (viewMode === 'day') {
      return [currentDate];
    }
  };

  const formatDate = (date) => {
    if (!date) return null;
    const day = date instanceof Date ? date.getDate() : date;
    const month = date instanceof Date ? date.getMonth() + 1 : currentDate.getMonth() + 1;
    const year = date instanceof Date ? date.getFullYear() : currentDate.getFullYear();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  // Get communications for the current date
  const getCommunicationsForDate = (date) => {
    const formattedDate = formatDate(date);
    return companies
      .flatMap((company) =>
        company.lastCommunications
          .filter((comm) => comm.date === formattedDate)
          .map((comm) => ({
            companyName: company.name,
            communicationType: comm.type,
            communicationDate: comm.date,
          }))
      );
  };

  const agendaItems = companies
    .flatMap((company) => company.lastCommunications)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar role={'user'}/>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800">Communications Calendar</h2>
          <div className="flex space-x-3">
            <button
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </button>
            <button
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              onClick={() => changeDate(-1)}
            >
              Back
            </button>
            <button
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              onClick={() => changeDate(1)}
            >
              Next
            </button>
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          {['Month', 'Week', 'Day', 'Agenda'].map((mode) => (
            <button
              key={mode}
              className={`px-5 py-2 rounded-md text-lg font-medium transition ${
                viewMode === mode.toLowerCase()
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => setViewMode(mode.toLowerCase())}
            >
              {mode}
            </button>
          ))}
        </div>

        {viewMode === 'agenda' ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Agenda</h3>
            {agendaItems.map((item, index) => (
              <div key={index} className="p-4 bg-blue-50 rounded-lg mb-3 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">{item.details}</span>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </h3>
            <div className="grid grid-cols-7 gap-3">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <div key={index} className="text-center text-lg font-semibold text-gray-500">
                  {day}
                </div>
              ))}
              {getCalendarDays().map((day, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg text-sm relative transition ${
                    day ? 'bg-white hover:bg-blue-50' : 'bg-gray-100'
                  } ${viewMode === 'week' && day instanceof Date ? 'col-span-1' : ''}`}
                  onMouseEnter={() => setHoveredDate(day && formatDate(day))}
                  onMouseLeave={() => setHoveredDate(null)}
                >
                  {day && (
                    <>
                      <div className="font-medium text-center text-gray-800">
                        {day instanceof Date ? day.getDate() : day}
                      </div>
                      {getCommunicationsForDate(day).length > 0 && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-2"></div>
                      )}
                      {hoveredDate === formatDate(day) && (
                        <div className="absolute top-0 left-0 bg-white shadow-lg p-3 rounded-md text-xs">
                          {getCommunicationsForDate(day).map((comm, idx) => (
                            <div key={idx} className="text-gray-700">{comm.communicationType}</div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default CalendarView;
