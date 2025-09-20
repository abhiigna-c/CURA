import { useState } from 'react';
import { ClerkProvider, useUser, useAuth } from '@clerk/clerk-react';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { ChatBot } from './pages/ChatBot';
import { Appointments } from './pages/Appointments';
import { Resources } from './pages/Resources';
import { Community } from './pages/Community';
import { CrisisSupport } from './pages/CrisisSupport';
import { AdminDashboard } from './pages/AdminDashboard';
import { ClerkAuth } from './components/ClerkAuth';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  college: string;
};

// Main App Component with Clerk Integration
function AppContent() {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoading, setIsLoading] = useState(false);

  // Convert Clerk user to our User type
  const user: User | null = clerkUser ? {
    id: clerkUser.id,
    name: clerkUser.fullName || clerkUser.firstName || 'Anonymous',
    email: clerkUser.primaryEmailAddress?.emailAddress || '',
    role: clerkUser.publicMetadata?.role as 'student' | 'admin' || 'student',
    college: clerkUser.publicMetadata?.college as string || 'Unknown College'
  } : null;

  // Simulate loading states
  const handlePageChange = (page: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 300);
  };

  const handleLogout = async () => {
    await signOut();
    setCurrentPage('landing');
  };

  const renderPage = () => {
    if (isLoading || !isLoaded) {
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
      case 'sign-in':
        return <ClerkAuth mode="sign-in" />;
      case 'sign-up':
        return <ClerkAuth mode="sign-up" />;
      default:
        return <LandingPage onNavigate={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFF0] via-[#F8F9FF] to-[#FFF8E1]">
      <Header 
        user={user} 
        onNavigate={handlePageChange} 
        currentPage={currentPage}
      />
      <main className="transition-all duration-300 ease-in-out">
        {renderPage()}
      </main>
    </div>
  );
}

// Main App Component with Clerk Provider
function App() {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error("Missing Publishable Key. Please add VITE_CLERK_PUBLISHABLE_KEY to your .env.local file");
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <AppContent />
    </ClerkProvider>
  );
}

export default App;