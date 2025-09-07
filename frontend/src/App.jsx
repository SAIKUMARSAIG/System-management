import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ComplaintList from './pages/ComplaintList';
import CreateComplaint from './pages/CreateComplaint';
import BackendStatus from './components/BackendStatus';

function App() {
  const [currentUser, setCurrentUser] = useState('citizen1');
  const [userRole, setUserRole] = useState('citizen');

  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Header 
          currentUser={currentUser} 
          userRole={userRole} 
          setCurrentUser={setCurrentUser}
          setUserRole={setUserRole}
        />
        <main className="container mx-auto">
          {/* <BackendStatus /> */}
          <Routes>
            <Route path="/" element={<Dashboard userRole={userRole} />} />
            <Route path="/complaints" element={<ComplaintList userRole={userRole} currentUser={currentUser} />} />
            <Route path="/create" element={<CreateComplaint currentUser={currentUser} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;