import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { ChatBot } from './pages/ChatBot';
import { Appointments } from './pages/Appointments';
import { Resources } from './pages/Resources';
import { Community } from './pages/Community';
import { CrisisSupport } from './pages/CrisisSupport';
import { AdminDashboard } from './pages/AdminDashboard';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  college: string;
};

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading states
  const handlePageChange = (page: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 300);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('landing');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      );
    }

    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handlePageChange} />;
      case 'chat':
        return <ChatBot />;
      case 'appointments':
        return <Appointments />;
      case 'resources':
        return <Resources />;
      case 'community':
        return <Community user={user} />;
      case 'crisis':
        return <CrisisSupport />;
      case 'admin':
        return user?.role === 'admin' ? <AdminDashboard /> : <LandingPage onNavigate={handlePageChange} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={handlePageChange} />;
      case 'signup':
        return <SignupPage onSignup={handleLogin} onNavigate={handlePageChange} />;
      default:
        return <LandingPage onNavigate={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFF0] via-[#F8F9FF] to-[#FFF8E1]">
      <Header 
        user={user} 
        onNavigate={handlePageChange} 
        onLogout={handleLogout}
        currentPage={currentPage}
      />
      <main className="transition-all duration-300 ease-in-out">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;