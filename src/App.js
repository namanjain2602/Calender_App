import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import CompanyList from './components/Admin/CompanyList';
import CommunicationMethodList from './components/Admin/CommunicationMethodList';
import DashboardTable from './components/Users/DashboardTable';
import Notifications from './components/Users/Notifications';
import CalendarView from './components/Users/CalendarView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/companies" element={<CompanyList />} />
        <Route path="/admin/communication-methods" element={<CommunicationMethodList />} />
        <Route path="/user/dashboard" element={<DashboardTable />} />
        <Route path="/user/notifications" element={<Notifications />} />
        <Route path="/user/calendar" element={<CalendarView />} />
      </Routes>
    </Router>
  );
}

export default App;
