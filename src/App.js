import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import CompanyList from './components/Admin/CompanyList';
import CommunicationMethodList from './components/Admin/CommunicationMethodList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/companies" element={<CompanyList />} />
        <Route path="/admin/communication-methods" element={<CommunicationMethodList />} />
      </Routes>
    </Router>
  );
}

export default App;
