import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Pages
import Home from './pages/Home';
import Universities from './pages/Universities';
import UniversityDetail from './pages/UniversityDetail';
import Courses from './pages/Courses';
import Compare from './pages/Compare';
import Ambassadors from './pages/Ambassadors';
import Articles from './pages/Articles';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard';
import TeamPage from './pages/Team';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/universities" element={<Universities />} />
              <Route path="/universities/:id" element={<UniversityDetail />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/team" element={<TeamPage/> }/>
              <Route path="/ambassadors" element={<Ambassadors />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;