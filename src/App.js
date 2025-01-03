import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import CompanyList from './components/Admin/CompanyList';
import CommunicationMethodList from './components/Admin/CommunicationMethodList';
import DashboardTable from './components/Users/DashboardTable';
import Notifications from './components/Users/Notifications';
import CalendarView from './components/Users/CalendarView';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Reports from './components/Admin/Reports';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
    <Toaster position="top-right" />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/companies" element={<CompanyList />} />
        <Route path="/admin/communication-methods" element={<CommunicationMethodList />} />
        <Route path="/user/dashboard" element={<DashboardTable />} />
        <Route path="/user/notifications" element={<Notifications />} />
        <Route path="/user/calendar" element={<CalendarView />} />
        <Route path="/reports" element={<Reports />} />
        
      </Routes>
    </Router>
    </>
  );
}

export default App;
