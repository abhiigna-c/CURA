import React, { useState } from 'react';
import { Eye, EyeOff, Heart, Mail, Lock } from 'lucide-react';
import { User } from '../App';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // Mock authentication
      if (formData.email && formData.password) {
        const user: User = {
          id: '1',
          name: formData.email === 'admin@cura.com' ? 'Admin User' : 'Student User',
          email: formData.email,
          role: formData.email === 'admin@cura.com' ? 'admin' : 'student',
          college: formData.email === 'admin@cura.com' ? 'CURA Platform' : 'Sample College'
        };
        onLogin(user);
      } else {
        setError('Please enter valid credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="backdrop-blur-lg bg-white/80 rounded-3xl border border-white/30 shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-12 w-12 text-[#696cff] mr-3" />
              <span className="text-3xl font-bold text-gray-900">CURA</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your mental health support</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] focus:border-transparent transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#696cff] focus:ring-[#696cff]"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-[#696cff] hover:text-[#5a5df5] font-medium transition-colors duration-200"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#696cff] hover:bg-[#5a5df5] disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50/80 border border-blue-200 rounded-xl">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</h4>
            <div className="text-xs text-blue-800 space-y-1">
              <p><strong>Student:</strong> student@demo.com / password</p>
              <p><strong>Admin:</strong> admin@cura.com / password</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="text-[#696cff] hover:text-[#5a5df5] font-medium transition-colors duration-200"
              >
                Sign up
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('landing')}
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};