import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from '../src/components/home/Homepage';
import Login from './components/auth/login/Login';
import Signup from './components/auth/signup/Signup';
import CompanyManagement from './components/AdminModule/CompanyManagement';
import CommunicationMethodManagement from './components/AdminModule/CommunicationMethodManagement';
import AdminDashboard from './components/AdminModule/AdminDashboard';
import UserDashboard from './components/UserModule/UserDashboard';
import CalendarView from './components/UserModule/CalendarView';
import CommunicationLog from './components/UserModule/CommunicationLog';
import Notifications from './components/UserModule/Notifications';
import ReportingAnalytics from './components/Reporting/ReportingAnalytics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/companymanagement' element={<CompanyManagement />} />
        <Route path='/admin/communicationmethodmanagement' element={<CommunicationMethodManagement />} />
        <Route path='/user/dashboard' element={<UserDashboard />} />
        <Route path="/user/calendar" element={<CalendarView />} />
        <Route path="user/communicationlog" element={<CommunicationLog />} />
        <Route path="user/notifications" element={<Notifications />} />
        <Route path="admin/reports" element={<ReportingAnalytics />} />


      </Routes>
    </Router>
  );
}

export default App;
