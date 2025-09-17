import React, { useState } from 'react';
import { Eye, EyeOff, Heart, Mail, Lock, User, GraduationCap } from 'lucide-react';
import { User as UserType } from '../App';

interface SignupPageProps {
  onSignup: (user: UserType) => void;
  onNavigate: (page: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
    year: '',
    phone: '',
    agreeTerms: false,
    agreePrivacy: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.college.trim()) newErrors.college = 'College/University is required';
    if (!formData.year) newErrors.year = 'Academic year is required';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    if (!formData.agreePrivacy) newErrors.agreePrivacy = 'You must agree to the privacy policy';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user: UserType = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: 'student',
        college: formData.college
      };
      onSignup(user);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-md w-full">
        <div className="backdrop-blur-lg bg-white/80 rounded-3xl border border-white/30 shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-12 w-12 text-[#696cff] mr-3" />
              <span className="text-3xl font-bold text-gray-900">CURA</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Join CURA</h2>
            <p className="text-gray-600">Create your account for mental health support</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 1 ? 'bg-[#696cff] text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${currentStep > 1 ? 'bg-[#696cff]' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 2 ? 'bg-[#696cff] text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Account Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-white/60 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] focus:border-transparent transition-all duration-200 ${
                        errors.name ? 'border-red-300' : 'border-white/30'
                      }`}
                      required
                    />
                  </div>
                  {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-white/60 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] focus:border-transparent transition-all duration-200 ${
                        errors.email ? 'border-red-300' : 'border-white/30'
                      }`}
                      required
                    />
                  </div>
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 bg-white/60 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] focus:border-transparent transition-all duration-200 ${
                        errors.password ? 'border-red-300' : 'border-white/30'
                      }`}
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
                  {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 bg-white/60 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] focus:border-transparent transition-all duration-200 ${
                        errors.confirmPassword ? 'border-red-300' : 'border-white/30'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-[#696cff] hover:bg-[#5a5df5] text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 2: Additional Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
                
                <div>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="college"
                      placeholder="College/University Name"
                      value={formData.college}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-white/60 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] focus:border-transparent transition-all duration-200 ${
                        errors.college ? 'border-red-300' : 'border-white/30'
                      }`}
                      required
                    />
                  </div>
                  {errors.college && <p className="text-red-600 text-xs mt-1">{errors.college}</p>}
                </div>

                <div>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/60 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] focus:border-transparent transition-all duration-200 ${
                      errors.year ? 'border-red-300' : 'border-white/30'
                    }`}
                    required
                  >
                    <option value="">Select Academic Year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                    <option value="graduate">Graduate</option>
                    <option value="phd">PhD</option>
                  </select>
                  {errors.year && <p className="text-red-600 text-xs mt-1">{errors.year}</p>}
                </div>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] focus:border-transparent transition-all duration-200"
                />

                <div className="space-y-3">
                  <div>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="mt-1 rounded border-gray-300 text-[#696cff] focus:ring-[#696cff]"
                        required
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        I agree to the <button type="button" className="text-[#696cff] hover:text-[#5a5df5] font-medium">Terms of Service</button>
                      </span>
                    </label>
                    {errors.agreeTerms && <p className="text-red-600 text-xs mt-1">{errors.agreeTerms}</p>}
                  </div>
                  
                  <div>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreePrivacy"
                        checked={formData.agreePrivacy}
                        onChange={handleInputChange}
                        className="mt-1 rounded border-gray-300 text-[#696cff] focus:ring-[#696cff]"
                        required
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        I agree to the <button type="button" className="text-[#696cff] hover:text-[#5a5df5] font-medium">Privacy Policy</button>
                      </span>
                    </label>
                    {errors.agreePrivacy && <p className="text-red-600 text-xs mt-1">{errors.agreePrivacy}</p>}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-xl font-semibold transition-all duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-[#696cff] hover:bg-[#5a5df5] disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-[#696cff] hover:text-[#5a5df5] font-medium transition-colors duration-200"
              >
                Sign in
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