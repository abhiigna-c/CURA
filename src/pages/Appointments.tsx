import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, CheckCircle, AlertCircle, ChevronRight, ChevronLeft, Heart, Brain, Shield, Zap } from 'lucide-react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  type: 'individual' | 'group' | 'crisis';
  status: 'scheduled' | 'completed' | 'cancelled';
  counselor?: string;
  urgency?: 'normal' | 'high' | 'urgent';
}

interface FormErrors {
  [key: string]: string;
}

interface MoodData {
  mood: string;
  timestamp: Date;
}

export const Appointments: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    appointmentType: '',
    date: '',
    time: '',
    urgency: 'normal',
    concerns: '',
    previousCounseling: 'no',
    anonymous: true,
    emergency: false,
    moodData: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      date: '2024-01-20',
      time: '14:00',
      type: 'individual',
      status: 'scheduled',
      counselor: 'Dr. Priya Sharma',
      urgency: 'normal'
    },
    {
      id: '2',
      date: '2024-01-15',
      time: '16:00',
      type: 'group',
      status: 'completed',
      counselor: 'Dr. Rajesh Kumar',
      urgency: 'high'
    }
  ]);

  const [showBooking, setShowBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [moodHistory, setMoodHistory] = useState<MoodData[]>([]);

  // Load mood data from localStorage
  useEffect(() => {
    const savedMoodHistory = localStorage.getItem('cura-mood-history');
    if (savedMoodHistory) {
      const parsedMoodHistory = JSON.parse(savedMoodHistory).map((mood: any) => ({
        ...mood,
        timestamp: new Date(mood.timestamp)
      }));
      setMoodHistory(parsedMoodHistory);
      
      // Set recent mood data for appointment context
      if (parsedMoodHistory.length > 0) {
        const recentMood = parsedMoodHistory[parsedMoodHistory.length - 1];
        setFormData(prev => ({ ...prev, moodData: recentMood.mood }));
      }
    }
  }, []);

  // Generate available time slots based on selected date
  useEffect(() => {
    if (selectedDate) {
      const baseSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
      // Simulate some slots being unavailable
      const unavailableSlots = ['10:00', '15:00'];
      setAvailableSlots(baseSlots.filter(slot => !unavailableSlots.includes(slot)));
    }
  }, [selectedDate]);

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.anonymous && !formData.name.trim()) {
        newErrors.name = 'Name is required when not anonymous';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required for confirmation';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.college.trim()) {
        newErrors.college = 'College/University is required';
      }
      if (!formData.year) {
        newErrors.year = 'Please select your year';
      }
    }

    if (step === 2) {
      if (!formData.appointmentType) {
        newErrors.appointmentType = 'Please select an appointment type';
      }
    }

    if (step === 3) {
      if (!formData.date) {
        newErrors.date = 'Please select a date';
      }
      if (!formData.time) {
        newErrors.time = 'Please select a time slot';
      }
    }

    if (step === 4) {
      // Step 4 is optional information, no required validation
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      // Create new appointment
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        date: formData.date,
        time: formData.time,
        type: formData.appointmentType as 'individual' | 'group' | 'crisis',
        status: 'scheduled',
        counselor: getCounselorName(formData.appointmentType),
        urgency: formData.urgency as 'normal' | 'high' | 'urgent'
      };

      // Add to appointments list
      setAppointments(prev => [newAppointment, ...prev]);

      // Simulate booking
      setTimeout(() => {
        setBookingSuccess(true);
        setShowBooking(false);
        setCurrentStep(1);
        setFormData({
          name: '',
          email: '',
          phone: '',
          college: '',
          year: '',
          appointmentType: '',
          date: '',
          time: '',
          urgency: 'normal',
          concerns: '',
          previousCounseling: 'no',
          anonymous: true,
          emergency: false,
          moodData: ''
        });
        setErrors({});
      }, 1500);
    }
  };

  const getCounselorName = (appointmentType: string): string => {
    const counselors = {
      'individual': 'Dr. Sarah Johnson',
      'group': 'Dr. Michael Chen',
      'crisis': 'Dr. Emergency Support'
    };
    return counselors[appointmentType as keyof typeof counselors] || 'Dr. Available Counselor';
  };

  const appointmentTypes = [
    {
      type: 'individual',
      title: 'Individual Counseling',
      description: 'One-on-one session with a licensed counselor',
      duration: '50 minutes',
      price: 'Free for students',
      icon: User,
      color: 'from-blue-500 to-blue-600'
    },
    {
      type: 'group',
      title: 'Group Therapy',
      description: 'Small group sessions with peers facing similar challenges',
      duration: '90 minutes',
      price: 'Free for students',
      icon: Heart,
      color: 'from-green-500 to-green-600'
    },
    {
      type: 'crisis',
      title: 'Crisis Intervention',
      description: 'Immediate support for urgent mental health needs',
      duration: '30-60 minutes',
      price: 'Free - Available 24/7',
      icon: AlertCircle,
      color: 'from-red-500 to-red-600'
    }
  ];

  const urgencyLevels = [
    { value: 'normal', label: 'Normal Priority', color: 'text-green-600', icon: CheckCircle },
    { value: 'high', label: 'High Priority', color: 'text-yellow-600', icon: AlertCircle },
    { value: 'urgent', label: 'Urgent (Crisis)', color: 'text-red-600', icon: Zap }
  ];

  const getMoodRecommendation = () => {
    if (!moodHistory.length) return null;
    
    const recentMood = moodHistory[moodHistory.length - 1].mood;
    const moodRecommendations: { [key: string]: { type: string; message: string; color: string } } = {
      'anxious': { type: 'individual', message: 'Consider individual counseling for anxiety management', color: 'text-blue-600' },
      'sad': { type: 'individual', message: 'Individual counseling can help with feelings of sadness', color: 'text-blue-600' },
      'frustrated': { type: 'group', message: 'Group therapy might help with shared experiences', color: 'text-green-600' },
      'happy': { type: 'individual', message: 'Great time to work on personal growth and goals', color: 'text-green-600' },
      'calm': { type: 'group', message: 'Group sessions can help maintain your positive state', color: 'text-green-600' }
    };

    return moodRecommendations[recentMood] || null;
  };

  const moodRecommendation = getMoodRecommendation();

  if (bookingSuccess) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="cura-card p-8">
            <div className="w-20 h-20 bg-gradient-to-r from-[#FFFC69] to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Booked Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your counseling session has been scheduled. You'll receive a confirmation email shortly with session details.
            </p>
            <button
              onClick={() => setBookingSuccess(false)}
              className="cura-button-primary w-full"
            >
              Back to Appointments
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen px-4 sm:px-6 lg:px-8 py-8 bg-[#FFFFF0]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold cura-gradient-text mb-4">
            Mental Health Appointments
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book confidential counseling sessions with licensed professionals. All appointments are completely anonymous and secure.
          </p>
        </div>

        {!showBooking ? (
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setShowBooking(true)}
                className="group cura-card p-6 text-center hover:scale-105 transition-all duration-300"
              >
                <Calendar className="h-12 w-12 text-[#696cff] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Book New Session</h3>
                <p className="text-gray-600">Schedule a counseling appointment</p>
              </button>

              <div className="cura-card p-6 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Crisis Support</h3>
                <p className="text-gray-600">Immediate help available 24/7</p>
              </div>

              <div className="cura-card p-6 text-center">
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Anonymous & Secure</h3>
                <p className="text-gray-600">Complete privacy guaranteed</p>
              </div>
            </div>

            {/* Mood-based Recommendation */}
            {moodRecommendation && (
              <div className="cura-card p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-r from-[#696cff] to-[#5a5df5] rounded-full">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Based on Your Recent Mood</h3>
                    <p className={`${moodRecommendation.color} font-medium`}>
                      {moodRecommendation.message}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Your recent mood: <span className="font-medium capitalize">{moodHistory[moodHistory.length - 1]?.mood}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Upcoming Appointments */}
            <div className="cura-card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Appointments</h2>
              
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="bg-white/70 rounded-xl p-4 border border-white/40">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-[#696cff] to-purple-600 rounded-xl flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 capitalize">
                              {appointment.type} Session
                            </h3>
                            <p className="text-sm text-gray-600">{appointment.counselor}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(appointment.date).toLocaleDateString()}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.time}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'scheduled' 
                              ? 'bg-blue-100 text-blue-800'
                              : appointment.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {appointment.status}
                          </span>
                          {appointment.urgency && appointment.urgency !== 'normal' && (
                            <div className={`mt-1 text-xs font-medium ${
                              appointment.urgency === 'urgent' ? 'text-red-600' : 'text-yellow-600'
                            }`}>
                              {appointment.urgency.toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No appointments scheduled</p>
                  <button
                    onClick={() => setShowBooking(true)}
                    className="mt-4 cura-button-primary"
                  >
                    Book Your First Session
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div className="max-w-3xl mx-auto">
            <div className="cura-card p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
                <button
                  onClick={() => setShowBooking(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
                >
                  ✕
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <React.Fragment key={step}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step 
                        ? 'bg-gradient-to-r from-[#696cff] to-[#5a5df5] text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                        currentStep > step 
                          ? 'bg-gradient-to-r from-[#696cff] to-[#5a5df5]' 
                          : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h3>
                      <p className="text-gray-600">Tell us a bit about yourself for your appointment</p>
                    </div>
                    
                    <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="anonymous"
                          name="anonymous"
                          checked={formData.anonymous}
                          onChange={handleInputChange}
                          className="w-5 h-5 rounded border-gray-300 text-[#696cff] focus:ring-[#696cff] focus:ring-2"
                        />
                        <label htmlFor="anonymous" className="ml-3 text-sm text-gray-700">
                          <span className="font-semibold text-gray-900">Keep my appointment anonymous</span>
                          <br />
                          <span className="text-xs text-gray-500">Recommended for maximum privacy</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="relative group">
                          <input
                            type="text"
                            name="name"
                            placeholder=" "
                            value={formData.anonymous ? "Anonymous Student" : formData.name}
                            onChange={handleInputChange}
                            disabled={formData.anonymous}
                            className={`cura-input ${errors.name ? 'border-red-500 ring-red-200' : 'focus:ring-[#696cff]/20'} ${formData.anonymous ? 'bg-gray-100 cursor-not-allowed' : 'group-hover:border-[#696cff]/50'}`}
                            required
                          />
                          <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                            formData.anonymous || formData.name 
                              ? 'top-1 text-xs text-gray-500 scale-90 -translate-y-1' 
                              : 'top-3 text-gray-500 group-focus-within:text-[#696cff] group-focus-within:scale-90 group-focus-within:-translate-y-2'
                          }`}>
                            {formData.anonymous ? "Anonymous Student" : "Full Name"}
                          </label>
                          {errors.name && <p className="text-red-500 text-sm mt-2 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.name}
                          </p>}
                        </div>
                        
                        <div className="relative group">
                          <input
                            type="email"
                            name="email"
                            placeholder=" "
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`cura-input ${errors.email ? 'border-red-500 ring-red-200' : 'focus:ring-[#696cff]/20 group-hover:border-[#696cff]/50'}`}
                            required
                          />
                          <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                            formData.email 
                              ? 'top-1 text-xs text-gray-500 scale-90 -translate-y-1' 
                              : 'top-3 text-gray-500 group-focus-within:text-[#696cff] group-focus-within:scale-90 group-focus-within:-translate-y-2'
                          }`}>
                            Email Address
                          </label>
                          <span className="absolute right-4 top-2 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded-full">Required</span>
                          {errors.email && <p className="text-red-500 text-sm mt-2 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.email}
                          </p>}
                        </div>
                        
                        <div className="relative group">
                          <input
                            type="tel"
                            name="phone"
                            placeholder=" "
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="cura-input group-hover:border-[#696cff]/50 focus:ring-[#696cff]/20"
                          />
                          <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                            formData.phone 
                              ? 'top-1 text-xs text-gray-500 scale-90 -translate-y-1' 
                              : 'top-3 text-gray-500 group-focus-within:text-[#696cff] group-focus-within:scale-90 group-focus-within:-translate-y-2'
                          }`}>
                            Phone Number
                          </label>
                          <span className="absolute right-4 top-2 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded-full">Optional</span>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="relative group">
                          <input
                            type="text"
                            name="college"
                            placeholder=" "
                            value={formData.college}
                            onChange={handleInputChange}
                            className={`cura-input ${errors.college ? 'border-red-500 ring-red-200' : 'focus:ring-[#696cff]/20 group-hover:border-[#696cff]/50'}`}
                            required
                          />
                          <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                            formData.college 
                              ? 'top-1 text-xs text-gray-500 scale-90 -translate-y-1' 
                              : 'top-3 text-gray-500 group-focus-within:text-[#696cff] group-focus-within:scale-90 group-focus-within:-translate-y-2'
                          }`}>
                            College/University
                          </label>
                          {errors.college && <p className="text-red-500 text-sm mt-2 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.college}
                          </p>}
                        </div>
                        
                        <div className="relative group">
                          <select
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            className={`cura-input ${errors.year ? 'border-red-500 ring-red-200' : 'focus:ring-[#696cff]/20 group-hover:border-[#696cff]/50'}`}
                            required
                          >
                            <option value="">Academic Year</option>
                            <option value="1st">1st Year</option>
                            <option value="2nd">2nd Year</option>
                            <option value="3rd">3rd Year</option>
                            <option value="4th">4th Year</option>
                            <option value="graduate">Graduate Student</option>
                          </select>
                          <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                            formData.year 
                              ? 'top-1 text-xs text-gray-500 scale-90 -translate-y-1' 
                              : 'top-3 text-gray-500 group-focus-within:text-[#696cff] group-focus-within:scale-90 group-focus-within:-translate-y-2'
                          }`}>
                            Academic Year
                          </label>
                          {errors.year && <p className="text-red-500 text-sm mt-2 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.year}
                          </p>}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="cura-button-primary flex items-center space-x-3 px-8 py-4 text-lg"
                      >
                        <span>Continue to Appointment Type</span>
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Appointment Type */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Session Type</h3>
                      <p className="text-gray-600">Select the type of counseling that best fits your needs</p>
                    </div>
                    
                    <div className="space-y-4">
                      {appointmentTypes.map((type) => {
                        const IconComponent = type.icon;
                        return (
                          <div key={type.type} className="relative">
                            <input
                              type="radio"
                              id={type.type}
                              name="appointmentType"
                              value={type.type}
                              checked={formData.appointmentType === type.type}
                              onChange={handleInputChange}
                              className="sr-only"
                              required
                            />
                            <label
                              htmlFor={type.type}
                              className={`block p-6 cura-card cursor-pointer transition-all duration-200 ${
                                formData.appointmentType === type.type
                                  ? 'ring-2 ring-[#696cff] bg-[#696cff]/5'
                                  : 'hover:bg-white/80'
                              }`}
                            >
                              <div className="flex items-start space-x-4">
                                <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-xl flex items-center justify-center`}>
                                  <IconComponent className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 mb-2">{type.title}</h4>
                                  <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                                  <div className="flex space-x-4 text-xs text-gray-500">
                                    <span className="flex items-center space-x-1">
                                      <Clock className="h-3 w-3" />
                                      <span>{type.duration}</span>
                                    </span>
                                    <span>{type.price}</span>
                                  </div>
                                </div>
                                {formData.appointmentType === type.type && (
                                  <CheckCircle className="h-6 w-6 text-[#696cff]" />
                                )}
                              </div>
                            </label>
                          </div>
                        );
                      })}
                    </div>

                    {errors.appointmentType && <p className="text-red-500 text-sm">{errors.appointmentType}</p>}

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="cura-button-secondary flex items-center space-x-2"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="cura-button-primary flex items-center space-x-2"
                      >
                        <span>Continue</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Date & Time Selection */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Schedule Your Session</h3>
                      <p className="text-gray-600">Pick a date and time that works best for you</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={(e) => {
                            handleInputChange(e);
                            setSelectedDate(e.target.value);
                          }}
                          min={new Date().toISOString().split('T')[0]}
                          className={`cura-input ${errors.date ? 'border-red-500' : ''}`}
                          required
                        />
                        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className={`cura-input ${errors.time ? 'border-red-500' : ''}`}
                          required
                        >
                          <option value="">Choose a time slot</option>
                          {availableSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                        {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Priority Level</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {urgencyLevels.map((level) => {
                          const IconComponent = level.icon;
                          return (
                            <div key={level.value} className="relative">
                              <input
                                type="radio"
                                id={level.value}
                                name="urgency"
                                value={level.value}
                                checked={formData.urgency === level.value}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <label
                                htmlFor={level.value}
                                className={`block p-4 cura-card cursor-pointer transition-all duration-200 ${
                                  formData.urgency === level.value
                                    ? 'ring-2 ring-[#696cff] bg-[#696cff]/5'
                                    : 'hover:bg-white/80'
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <IconComponent className={`h-5 w-5 ${level.color}`} />
                                  <span className={`font-medium ${level.color}`}>{level.label}</span>
                                </div>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="cura-button-secondary flex items-center space-x-2"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="cura-button-primary flex items-center space-x-2"
                      >
                        <span>Continue</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Additional Information */}
                {currentStep === 4 && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Additional Information</h3>
                      <p className="text-gray-600">Help us prepare for your session (optional but helpful)</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What would you like to discuss? (Optional but helpful)
                      </label>
                      <textarea
                        name="concerns"
                        placeholder="Share any concerns, goals, or topics you'd like to focus on during your session..."
                        value={formData.concerns}
                        onChange={handleInputChange}
                        rows={4}
                        className="cura-input resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Have you had counseling before?
                      </label>
                      <div className="flex space-x-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="previousCounseling"
                            value="yes"
                            checked={formData.previousCounseling === 'yes'}
                            onChange={handleInputChange}
                            className="text-[#696cff] focus:ring-[#696cff]"
                          />
                          <span className="ml-2 text-sm text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="previousCounseling"
                            value="no"
                            checked={formData.previousCounseling === 'no'}
                            onChange={handleInputChange}
                            className="text-[#696cff] focus:ring-[#696cff]"
                          />
                          <span className="ml-2 text-sm text-gray-700">No</span>
                        </label>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-xl">
                      <div className="flex">
                        <Shield className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium">Privacy & Confidentiality</p>
                          <p className="mt-1">Your information is completely confidential and will only be shared with your assigned counselor. We follow strict HIPAA guidelines to protect your privacy.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="cura-button-secondary flex items-center space-x-2"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Back</span>
                      </button>
                      <button
                        type="submit"
                        className="cura-button-primary flex items-center space-x-2"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Book Appointment</span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};