import React from 'react';
import { Menu, X, Heart, LogOut } from 'lucide-react';
import { User as UserType } from '../App';

interface HeaderProps {
  user: UserType | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ user, onNavigate, onLogout, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigationItems = [
    { name: 'Home', page: 'landing' },
    { name: 'AI Chat', page: 'chat' },
    { name: 'Appointments', page: 'appointments' },
    { name: 'Resources', page: 'resources' },
    { name: 'Community', page: 'community' },
    { name: 'Crisis Support', page: 'crisis' },
  ];

  if (user?.role === 'admin') {
    navigationItems.push({ name: 'Admin', page: 'admin' });
  }

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/80 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => onNavigate('landing')}
          >
            <Heart className="h-8 w-8 text-[#696cff] mr-2" />
            <span className="text-2xl font-bold text-gray-900">CURA</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentPage === item.page
                    ? 'bg-[#696cff] text-white shadow-lg'
                    : 'text-gray-700 hover:bg-white/60 hover:text-[#696cff]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.college}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 text-gray-700 hover:text-[#696cff] font-medium transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-6 py-2 bg-[#696cff] hover:bg-[#5a5df5] text-white rounded-full font-medium transition-all duration-200 hover:shadow-lg"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/60 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden backdrop-blur-lg bg-white/95 border-b border-white/20">
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.page
                    ? 'bg-[#696cff] text-white'
                    : 'text-gray-700 hover:bg-white/60'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            {!user && (
              <div className="pt-4 space-y-2 border-t border-white/20">
                <button
                  onClick={() => {
                    onNavigate('login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-white/60 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onNavigate('signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full px-4 py-3 bg-[#696cff] text-white rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};