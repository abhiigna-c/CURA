import React from 'react';
import { ArrowRight, Star, Users, Shield, Heart, MessageCircle, Calendar, BookOpen, Headphones, Award } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI-Powered Support",
      description: "Get instant help with our intelligent chatbot trained on mental health resources",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Calendar,
      title: "Anonymous Counseling",
      description: "Book confidential sessions with licensed professionals",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: BookOpen,
      title: "Wellness Resources",
      description: "Access curated content on stress, anxiety, depression, and more",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Peer Community",
      description: "Connect with fellow students in a safe, supportive environment",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const testimonials = [
    {
      name: "Priya S.",
      college: "IIT Delhi",
      text: "CURA helped me through my toughest semester. The AI chatbot was available 24/7 when I needed support the most.",
      rating: 5
    },
    {
      name: "Arjun M.",
      college: "NIT Surathkal",
      text: "The anonymous counseling feature gave me the confidence to seek help. The platform is incredibly user-friendly.",
      rating: 5
    },
    {
      name: "Sneha R.",
      college: "BITS Pilani",
      text: "The peer community helped me realize I wasn't alone in my struggles. Great platform for student mental health.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Helped" },
    { number: "500+", label: "Counseling Sessions" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="backdrop-blur-lg bg-white/30 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/20">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your Mental Health
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#696cff] to-[#FFFC69]">
                Matters
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              CURA provides comprehensive mental health support designed specifically for Indian college students. 
              Get confidential counseling, AI-powered guidance, and connect with a supportive peer community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => onNavigate('chat')}
                className="group flex items-center space-x-2 bg-[#696cff] hover:bg-[#5a5df5] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <span>Start AI Chat</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button
                onClick={() => onNavigate('appointments')}
                className="flex items-center space-x-2 bg-white/80 hover:bg-white text-[#696cff] px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl border border-white/40"
              >
                <Calendar className="h-5 w-5" />
                <span>Book Session</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="backdrop-blur-sm bg-white/20 rounded-xl p-4 border border-white/30">
                  <div className="text-2xl lg:text-3xl font-bold text-[#696cff]">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to maintain good mental health during your college journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group backdrop-blur-lg bg-white/60 hover:bg-white/80 rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
                onClick={() => onNavigate(feature.title.includes('AI') ? 'chat' : feature.title.includes('Anonymous') ? 'appointments' : feature.title.includes('Resources') ? 'resources' : 'community')}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#696cff]/5 to-[#FFFC69]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Students Nationwide
            </h2>
            <p className="text-xl text-gray-600">See what students are saying about CURA</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="backdrop-blur-lg bg-white/70 rounded-2xl p-6 border border-white/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.college}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-lg bg-gradient-to-r from-[#696cff]/10 to-[#FFFC69]/10 rounded-3xl p-12 border border-white/30">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to Prioritize Your Mental Health?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have found support, guidance, and community through CURA.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('signup')}
                className="bg-[#696cff] hover:bg-[#5a5df5] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                Get Started Free
              </button>
              
              <button
                onClick={() => onNavigate('crisis')}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl flex items-center space-x-2"
              >
                <Shield className="h-5 w-5" />
                <span>Crisis Support</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};