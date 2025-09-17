import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  type: 'individual' | 'group' | 'crisis';
  status: 'scheduled' | 'completed' | 'cancelled';
  counselor?: string;
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
    anonymous: true
  });
  
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      date: '2024-01-20',
      time: '14:00',
      type: 'individual',
      status: 'scheduled',
      counselor: 'Dr. Priya Sharma'
    },
    {
      id: '2',
      date: '2024-01-15',
      time: '16:00',
      type: 'group',
      status: 'completed',
      counselor: 'Dr. Rajesh Kumar'
    }
  ]);

  const [showBooking, setShowBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        anonymous: true
      });
    }, 1000);
  };

  const appointmentTypes = [
    {
      type: 'individual',
      title: 'Individual Counseling',
      description: 'One-on-one session with a licensed counselor',
      duration: '50 minutes',
      price: 'Free for students'
    },
    {
      type: 'group',
      title: 'Group Therapy',
      description: 'Small group sessions with peers facing similar challenges',
      duration: '90 minutes',
      price: 'Free for students'
    },
    {
      type: 'crisis',
      title: 'Crisis Intervention',
      description: 'Immediate support for urgent mental health needs',
      duration: '30-60 minutes',
      price: 'Free - Available 24/7'
    }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  if (bookingSuccess) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="backdrop-blur-lg bg-white/80 rounded-3xl p-8 border border-white/30 shadow-2xl">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Booked Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your counseling session has been scheduled. You'll receive a confirmation email shortly with session details.
            </p>
            <button
              onClick={() => setBookingSuccess(false)}
              className="w-full bg-[#696cff] hover:bg-[#5a5df5] text-white py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              Back to Appointments
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
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
                className="group backdrop-blur-lg bg-gradient-to-r from-[#696cff]/10 to-purple-500/10 hover:from-[#696cff]/20 hover:to-purple-500/20 border border-white/30 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl"
              >
                <Calendar className="h-12 w-12 text-[#696cff] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Book New Session</h3>
                <p className="text-gray-600">Schedule a counseling appointment</p>
              </button>

              <div className="backdrop-blur-lg bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-white/30 rounded-2xl p-6 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Crisis Support</h3>
                <p className="text-gray-600">Immediate help available 24/7</p>
              </div>

              <div className="backdrop-blur-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-white/30 rounded-2xl p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Anonymous & Secure</h3>
                <p className="text-gray-600">Complete privacy guaranteed</p>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="backdrop-blur-lg bg-white/60 rounded-2xl border border-white/30 p-6">
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
                    className="mt-4 bg-[#696cff] hover:bg-[#5a5df5] text-white px-6 py-2 rounded-xl transition-colors duration-200"
                  >
                    Book Your First Session
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div className="max-w-2xl mx-auto">
            <div className="backdrop-blur-lg bg-white/70 rounded-2xl border border-white/30 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
                <button
                  onClick={() => setShowBooking(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-8">
                {[1, 2, 3].map((step) => (
                  <React.Fragment key={step}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= step ? 'bg-[#696cff] text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-16 h-1 ${
                        currentStep > step ? 'bg-[#696cff]' : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="anonymous"
                        name="anonymous"
                        checked={formData.anonymous}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-[#696cff] focus:ring-[#696cff]"
                      />
                      <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
                        Keep my appointment anonymous (recommended)
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder={formData.anonymous ? "Anonymous Student" : "Full Name"}
                        value={formData.anonymous ? "Anonymous Student" : formData.name}
                        onChange={handleInputChange}
                        disabled={formData.anonymous}
                        className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] transition-all duration-200"
                        required
                      />
                      
                      <input
                        type="email"
                        name="email"
                        placeholder="Email (for confirmation only)"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] transition-all duration-200"
                        required
                      />
                      
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone (optional)"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] transition-all duration-200"
                      />
                      
                      <input
                        type="text"
                        name="college"
                        placeholder="College/University"
                        value={formData.college}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] transition-all duration-200"
                        required
                      />
                      
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] transition-all duration-200"
                        required
                      >
                        <option value="">Select Year</option>
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                        <option value="graduate">Graduate</option>
                      </select>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-[#696cff] hover:bg-[#5a5df5] text-white px-6 py-3 rounded-xl transition-colors duration-200"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Appointment Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Appointment Type
                        </label>
                        <div className="space-y-3">
                          {appointmentTypes.map((type) => (
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
                                className={`block p-4 bg-white/60 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                  formData.appointmentType === type.type
                                    ? 'border-[#696cff] bg-[#696cff]/10'
                                    : 'border-white/30 hover:border-[#696cff]/50'
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-semibold text-gray-900">{type.title}</h4>
                                    <p className="text-sm text-gray-600 mb-1">{type.description}</p>
                                    <div className="flex space-x-4 text-xs text-gray-500">
                                      <span>{type.duration}</span>
                                      <span>{type.price}</span>
                                    </div>
                                  </div>
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] transition-all duration-200"
                          required
                        />
                        
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] transition-all duration-200"
                          required
                        >
                          <option value="">Select Time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>

                      <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] transition-all duration-200"
                      >
                        <option value="normal">Normal Priority</option>
                        <option value="high">High Priority</option>
                        <option value="urgent">Urgent (Crisis)</option>
                      </select>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-xl transition-colors duration-200"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-[#696cff] hover:bg-[#5a5df5] text-white px-6 py-3 rounded-xl transition-colors duration-200"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Additional Information */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                    
                    <textarea
                      name="concerns"
                      placeholder="Please describe your concerns or what you'd like to discuss (optional but helpful)"
                      value={formData.concerns}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#696cff] transition-all duration-200 resize-none"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Have you had counseling before?
                      </label>
                      <div className="flex space-x-4">
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

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium">Privacy Notice</p>
                          <p className="mt-1">Your information is completely confidential and will only be shared with your assigned counselor. We follow strict HIPAA guidelines to protect your privacy.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-xl transition-colors duration-200"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="bg-[#696cff] hover:bg-[#5a5df5] text-white px-8 py-3 rounded-xl transition-colors duration-200 font-semibold"
                      >
                        Book Appointment
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