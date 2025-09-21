import React, { useState } from 'react';
import { ArrowRight, Cloud, Brain, Zap } from 'lucide-react';

interface Concern {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  bgColor: string;
  heading: string;
  symptoms: string[];
}

interface MentalHealthConcernsProps {
  onNavigate?: (page: string) => void;
}

const MentalHealthConcerns: React.FC<MentalHealthConcernsProps> = ({ onNavigate }) => {
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);

  const concerns: Concern[] = [
    {
      id: 'depression',
      title: 'Depression',
      description: "Does your life feel impossible & hopeless? You don't have to manage it alone.",
      icon: Cloud,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50',
      heading: 'This Is What Clinical Depression Can Look Like...',
      symptoms: [
        'Sadness that just does not go away',
        'Lack of interest & joy in most things',
        'Lack of energy or constant fatigue',
        'Feeling worthless, hopeless or guilty',
        'Difficulty concentrating on day-to-day activities',
        'Eating & sleeping too much or too little',
        'Thoughts of death or suicide',
        'Physical aches and pains without clear cause'
      ]
    },
    {
      id: 'anxiety',
      title: 'Anxiety',
      description: 'Chronic worry, mental fatigue, and feeling like your thoughts are always one step ahead of you?',
      icon: Brain,
      iconColor: 'text-pink-500',
      bgColor: 'bg-pink-50',
      heading: 'This Is What Anxiety Disorders Can Look Like...',
      symptoms: [
        'Excessive worry about everyday situations',
        'Restlessness or feeling on edge',
        'Difficulty controlling worry or fear',
        'Physical symptoms like rapid heartbeat or sweating',
        'Avoiding situations that cause anxiety',
        'Panic attacks with intense fear or discomfort',
        'Trouble sleeping due to racing thoughts',
        'Muscle tension and headaches'
      ]
    },
    {
      id: 'adhd',
      title: 'ADHD',
      description: 'Difficulty staying focused, restless energy, and impulsive actions affecting your daily life?',
      icon: Zap,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
      heading: 'This Is What ADHD Can Look Like...',
      symptoms: [
        'Difficulty paying attention to details',
        'Trouble staying organized and managing time',
        'Easily distracted by external stimuli',
        'Difficulty completing tasks or following through',
        'Restlessness and fidgeting',
        'Impulsive decision-making',
        'Procrastination and difficulty starting tasks',
        'Forgetfulness in daily activities'
      ]
    }
  ];

  const handleConcernClick = (concernId: string) => {
    setSelectedConcern(prev => (prev === concernId ? null : concernId));
  };

  // getCardPosition removed — cards render in a single horizontal row by default.

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Mental Health Concerns</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Understanding common mental health challenges faced by college students</p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Cards row: single horizontal line, fixed-size cards */}
          <div className="w-full overflow-x-auto">
            <div className="inline-flex items-stretch space-x-6 px-4 py-2">
              {concerns.map((concern) => (
                <div
                  key={concern.id}
                  onClick={() => handleConcernClick(concern.id)}
                  className={`min-w-[240px] max-w-[240px] h-[300px] flex-shrink-0 flex flex-col justify-between backdrop-blur-lg bg-white/80 rounded-2xl p-4 border border-white/30 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105`}
                >
                  <div>
                    <div className={`w-14 h-14 rounded-2xl ${concern.bgColor} flex items-center justify-center mb-3`}> 
                      <concern.icon className={`h-6 w-6 ${concern.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 break-words">{concern.title}</h3>
                    <p className="text-sm text-gray-600 leading-snug mb-3 break-words">{concern.description}</p>
                  </div>

                  <div className="flex justify-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 bg-orange-100 hover:bg-orange-200`}>
                      <ArrowRight className="h-4 w-4 text-orange-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment / Symptoms Panel below the cards */}
          <div>
            {selectedConcern ? (
              <div className="backdrop-blur-lg bg-white/85 rounded-2xl p-8 border border-white/30 shadow-xl transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-xl ${concerns.find(c => c.id === selectedConcern)?.bgColor} flex items-center justify-center mr-4`}>
                    {React.createElement(concerns.find(c => c.id === selectedConcern)?.icon as any, {
                      className: `h-6 w-6 ${concerns.find(c => c.id === selectedConcern)?.iconColor}`
                    })}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">
                      {concerns.find(c => c.id === selectedConcern)?.title}
                    </h4>
                    <p className="text-gray-600">Symptoms & Signs</p>
                  </div>
                </div>

                <h5 className="text-lg font-semibold text-gray-800 mb-4">
                  {concerns.find(c => c.id === selectedConcern)?.heading}
                </h5>

                <div className="space-y-2 mb-6">
                  {concerns.find(c => c.id === selectedConcern)?.symptoms.map((symptom, index) => (
                    <div 
                      key={index} 
                      className="flex items-start space-x-3 p-2 rounded-lg bg-white/60 border border-white/40 hover:bg-white/80 transition-colors duration-150"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#696cff] mt-1 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700 leading-snug">
                        {symptom}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-600 mb-4 text-center">
                    If you're experiencing these symptoms, you're not alone. Help is available.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onNavigate) onNavigate('chat');
                      }}
                      className="bg-[#696cff] hover:bg-[#5a5df5] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      Get AI Support
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onNavigate) onNavigate('appointments');
                      }}
                      className="bg-white hover:bg-gray-50 text-[#696cff] border border-[#696cff] px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="backdrop-blur-lg bg-white/70 rounded-2xl p-8 border border-white/30 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#696cff]/20 to-purple-200/40 flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-10 w-10 text-[#696cff]" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Mental Health Assessment</h4>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Click on any mental health concern to learn about its symptoms and understand if you might be experiencing them. 
                  Our AI-powered support and licensed counselors are here to help.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Remember:</strong> Only a licensed professional can provide an official diagnosis. 
                    This information is for educational purposes only.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentalHealthConcerns;