import React from 'react';
import { Phone, MessageCircle, AlertTriangle, Heart, Clock, Shield, Users, MapPin, ExternalLink } from 'lucide-react';

export const CrisisSupport: React.FC = () => {
  const emergencyContacts = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '9152987821',
      description: '24/7 crisis support in Hindi and English',
      type: 'call'
    },
    {
      name: 'AASRA Suicide Prevention',
      number: '9820466726',
      description: '24x7 helpline for suicide prevention',
      type: 'call'
    },
    {
      name: 'Sneha Suicide Prevention',
      number: '044-24640050',
      description: 'Chennai-based 24x7 suicide prevention helpline',
      type: 'call'
    },
    {
      name: 'iCall Psychosocial Helpline',
      number: '9152987821',
      description: 'Professional counselors available 8 AM - 10 PM',
      type: 'call'
    }
  ];

  const onlineResources = [
    {
      name: 'YourDOST',
      url: 'https://yourdost.com',
      description: 'Online counseling platform for students',
      features: ['Chat', 'Call', 'Anonymous']
    },
    {
      name: 'Mindpeace',
      url: 'https://mindpeace.in',
      description: 'Mental health support and counseling',
      features: ['Professional Counselors', 'Crisis Support']
    },
    {
      name: 'eKalyan',
      url: 'https://ekalyan.cgg.gov.in',
      description: 'Government mental health portal',
      features: ['Resources', 'Directory', 'Support']
    }
  ];

  const warningSigns = [
    {
      icon: AlertTriangle,
      title: 'Immediate Danger Signs',
      signs: [
        'Talking about wanting to die or kill oneself',
        'Looking for ways to kill oneself',
        'Talking about feeling hopeless or having no purpose',
        'Talking about feeling trapped or in unbearable pain',
        'Talking about being a burden to others'
      ],
      color: 'text-red-600 bg-red-50 border-red-200'
    },
    {
      icon: Heart,
      title: 'Emotional Warning Signs',
      signs: [
        'Increased alcohol or drug use',
        'Extreme mood swings',
        'Expressing feelings of rage or anger',
        'Feeling humiliated or ashamed',
        'Withdrawing from friends and family'
      ],
      color: 'text-orange-600 bg-orange-50 border-orange-200'
    },
    {
      icon: Users,
      title: 'Behavioral Changes',
      signs: [
        'Dramatic changes in sleep patterns',
        'Giving away prized possessions',
        'Saying goodbye to loved ones',
        'Putting affairs in order',
        'Taking great risks that could lead to death'
      ],
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200'
    }
  ];

  const copingStrategies = [
    {
      title: 'Immediate Coping Techniques',
      techniques: [
        'Practice deep breathing (4-7-8 technique)',
        'Use ice or cold water on your face/hands',
        'Listen to calming music',
        'Call a trusted friend or family member',
        'Write down your feelings',
        'Take a warm shower or bath'
      ]
    },
    {
      title: 'Grounding Exercises',
      techniques: [
        '5-4-3-2-1 technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste',
        'Progressive muscle relaxation',
        'Mindful walking or movement',
        'Focus on your breath',
        'Hold an ice cube or stress ball',
        'Repeat positive affirmations'
      ]
    }
  ];

  return (
    <div className="pt-16 min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-red-500 mr-3" />
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Crisis Support
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            If you're in crisis, you're not alone. Help is available 24/7. Your life matters and there are people who want to help.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="backdrop-blur-lg bg-gradient-to-r from-red-500/20 to-pink-500/20 border-2 border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-red-900">In Immediate Danger?</h2>
              <p className="text-red-800">If you are having thoughts of suicide or self-harm, please reach out immediately.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="tel:9152987821"
              className="flex items-center justify-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-xl"
            >
              <Phone className="h-5 w-5" />
              <span>Call Crisis Helpline</span>
            </a>
            
            <button className="flex items-center justify-center space-x-3 bg-white/80 hover:bg-white text-red-600 px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-xl border border-red-200">
              <MessageCircle className="h-5 w-5" />
              <span>Chat with Counselor</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <div className="space-y-6">
            <div className="backdrop-blur-lg bg-white/60 rounded-2xl border border-white/30 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Phone className="h-6 w-6 text-[#696cff] mr-2" />
                Emergency Helplines
              </h2>
              
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="bg-white/70 rounded-xl p-4 border border-white/40">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        24/7
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{contact.description}</p>
                    <a
                      href={`tel:${contact.number}`}
                      className="flex items-center space-x-2 bg-[#696cff] hover:bg-[#5a5df5] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      <Phone className="h-4 w-4" />
                      <span>{contact.number}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Online Resources */}
            <div className="backdrop-blur-lg bg-white/60 rounded-2xl border border-white/30 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MessageCircle className="h-6 w-6 text-[#696cff] mr-2" />
                Online Support
              </h2>
              
              <div className="space-y-4">
                {onlineResources.map((resource, index) => (
                  <div key={index} className="bg-white/70 rounded-xl p-4 border border-white/40">
                    <h3 className="font-semibold text-gray-900 mb-2">{resource.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {resource.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-[#696cff] hover:text-[#5a5df5] text-sm font-medium transition-colors duration-200"
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Warning Signs and Coping */}
          <div className="space-y-6">
            {/* Warning Signs */}
            <div className="backdrop-blur-lg bg-white/60 rounded-2xl border border-white/30 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 text-orange-500 mr-2" />
                Warning Signs
              </h2>
              
              <div className="space-y-4">
                {warningSign.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <div key={index} className={`border-l-4 rounded-lg p-4 ${category.color}`}>
                      <div className="flex items-center mb-3">
                        <IconComponent className="h-5 w-5 mr-2" />
                        <h3 className="font-semibold">{category.title}</h3>
                      </div>
                      <ul className="text-sm space-y-1">
                        {category.signs.map((sign, signIndex) => (
                          <li key={signIndex} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{sign}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Coping Strategies */}
            <div className="backdrop-blur-lg bg-white/60 rounded-2xl border border-white/30 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="h-6 w-6 text-green-500 mr-2" />
                Coping Strategies
              </h2>
              
              <div className="space-y-6">
                {copingStrategies.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-900 mb-3">{category.title}</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {category.techniques.map((technique, techIndex) => (
                        <div key={techIndex} className="bg-white/50 rounded-lg p-3 border border-white/30">
                          <p className="text-sm text-gray-700">{technique}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Campus Resources */}
        <div className="mt-12 backdrop-blur-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/30 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
            <MapPin className="h-6 w-6 text-[#696cff] mr-2" />
            Campus Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/50 rounded-xl">
              <Shield className="h-10 w-10 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Campus Security</h3>
              <p className="text-sm text-gray-600 mb-3">24/7 emergency response</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Contact Security
              </button>
            </div>
            
            <div className="text-center p-4 bg-white/50 rounded-xl">
              <Heart className="h-10 w-10 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Health Center</h3>
              <p className="text-sm text-gray-600 mb-3">Medical and mental health services</p>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                Find Center
              </button>
            </div>
            
            <div className="text-center p-4 bg-white/50 rounded-xl">
              <Users className="h-10 w-10 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Student Services</h3>
              <p className="text-sm text-gray-600 mb-3">Academic and personal support</p>
              <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                Get Support
              </button>
            </div>
          </div>
        </div>

        {/* Safety Plan */}
        <div className="mt-12 backdrop-blur-lg bg-white/60 rounded-2xl border border-white/30 p-8 text-center">
          <Clock className="h-12 w-12 text-[#696cff] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Create a Safety Plan</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            A safety plan is a personalized, practical plan that can help you avoid dangerous situations and know how to react when you start having thoughts of suicide.
          </p>
          <button className="bg-[#696cff] hover:bg-[#5a5df5] text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200">
            Build My Safety Plan
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <div className="backdrop-blur-lg bg-yellow-50/80 border border-yellow-200 rounded-2xl p-6">
            <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
            <p className="text-sm text-yellow-800 max-w-2xl mx-auto">
              <strong>Disclaimer:</strong> This page provides general information and resources for crisis support. 
              It is not a substitute for professional medical advice, diagnosis, or treatment. 
              In case of immediate danger, please call emergency services or visit your nearest hospital.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};