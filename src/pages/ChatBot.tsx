import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, MessageCircle, AlertTriangle, Phone, BookOpen, Brain, Activity, X } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'crisis' | 'breathing' | 'resource' | 'mood';
}

interface MoodEntry {
  id: number;
  mood: string;
  timestamp: Date;
  note?: string;
}

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentMood, setCurrentMood] = useState<string>('');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [showCrisisResources, setShowCrisisResources] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Crisis detection keywords
  const crisisKeywords = [
    'suicide', 'kill myself', 'end it all', 'not worth living', 'better off dead',
    'self harm', 'hurt myself', 'cut myself', 'harm myself', 'die', 'death',
    'hopeless', 'no point', 'give up', 'can\'t go on', 'end my life'
  ];

  // Load conversation history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('cura-chat-history');
    const savedMoodHistory = localStorage.getItem('cura-mood-history');
    
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(parsedMessages);
    } else {
      // Initial welcome message
      setMessages([{
        id: 1,
        text: "Hello! I'm CURA, your mental health companion. How are you feeling today? You can share anything with me - I'm here to listen and support you.",
        isUser: false,
        timestamp: new Date(),
      }]);
    }

    if (savedMoodHistory) {
      const parsedMoodHistory = JSON.parse(savedMoodHistory).map((mood: any) => ({
        ...mood,
        timestamp: new Date(mood.timestamp)
      }));
      setMoodHistory(parsedMoodHistory);
    }
  }, []);

  // Save conversation history to localStorage
  useEffect(() => {
    localStorage.setItem('cura-chat-history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('cura-mood-history', JSON.stringify(moodHistory));
  }, [moodHistory]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const detectCrisis = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return crisisKeywords.some(keyword => lowerText.includes(keyword));
  };

  const getIntelligentResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Crisis detection
    if (detectCrisis(userMessage)) {
      setShowCrisisResources(true);
      return "I'm concerned about what you're sharing. Your safety is the most important thing right now. Please reach out to someone you trust or contact emergency services immediately.";
    }

    // Anxiety responses
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried') || lowerMessage.includes('nervous')) {
      return "I understand that anxiety can feel overwhelming. Let's try a breathing exercise together. Breathe in for 4 counts, hold for 4, and breathe out for 6. Would you like me to guide you through this?";
    }

    // Depression responses
    if (lowerMessage.includes('depressed') || lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('empty')) {
      return "I hear that you're going through a difficult time. Depression can make everything feel heavy. Remember that this feeling is temporary, even if it doesn't feel that way. What's one small thing that brought you even a tiny bit of comfort today?";
    }

    // Academic stress
    if (lowerMessage.includes('study') || lowerMessage.includes('exam') || lowerMessage.includes('assignment') || lowerMessage.includes('academic') || lowerMessage.includes('grades')) {
      return "Academic pressure can be really overwhelming. Let's break this down together. What specific aspect of your studies is causing the most stress right now? Sometimes talking through it can help us find a manageable approach.";
    }

    // Family pressure
    if (lowerMessage.includes('family') || lowerMessage.includes('parents') || lowerMessage.includes('pressure') || lowerMessage.includes('expectations')) {
      return "Family expectations can feel like a heavy weight. It's okay to feel overwhelmed by what others expect of you. Your feelings are valid. What would you like your family to understand about what you're going through?";
    }

    // Sleep issues
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia') || lowerMessage.includes('exhausted')) {
      return "Sleep is so important for your mental health. Try creating a bedtime routine: turn off screens 1 hour before bed, keep your room cool and dark, and practice relaxation techniques. How many hours of sleep are you getting?";
    }

    // Loneliness
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated')) {
      return "Feeling lonely is more common than you think, especially in college. Consider joining student clubs, study groups, or our peer support community. Connection with others is vital for mental well-being. Would you like me to tell you about our community features?";
    }

    // General support
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('struggling')) {
      return "I'm glad you reached out. It takes courage to ask for help. You're not alone in this. What would be most helpful for you right now - talking through your feelings, getting some practical advice, or just having someone listen?";
    }

    // Default responses
    const defaultResponses = [
      "Thank you for sharing that with me. I'm here to listen and support you. How does that make you feel?",
      "I appreciate you opening up to me. Your feelings are valid and important. What would help you feel better right now?",
      "I'm listening, and I care about what you're going through. Sometimes just talking about it can help. What else is on your mind?",
      "Thank you for trusting me with this. You're being very brave by sharing. How can I best support you right now?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      setIsTyping(true);

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now() + 1,
          text: getIntelligentResponse(inputText),
          isUser: false,
          timestamp: new Date(),
          type: detectCrisis(inputText) ? 'crisis' : undefined
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleQuickResponse = (response: string) => {
    setInputText(response);
  };

  const handleMoodSelection = (mood: string) => {
    setCurrentMood(mood);
    const moodEntry: MoodEntry = {
      id: Date.now(),
      mood,
      timestamp: new Date()
    };
    setMoodHistory(prev => [...prev, moodEntry]);
    
    const moodMessage: Message = {
      id: Date.now(),
      text: `I'm feeling ${mood.toLowerCase()} today.`,
      isUser: true,
      timestamp: new Date(),
      type: 'mood'
    };
    setMessages(prev => [...prev, moodMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickResponses = [
    "I'm feeling overwhelmed",
    "I'm having trouble sleeping",
    "I feel lonely",
    "I'm stressed about exams",
    "I need someone to talk to",
    "I'm feeling anxious"
  ];

  const moodOptions = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😌', label: 'Calm', value: 'calm' },
    { emoji: '😐', label: 'Neutral', value: 'neutral' },
    { emoji: '😔', label: 'Sad', value: 'sad' },
    { emoji: '😰', label: 'Anxious', value: 'anxious' },
    { emoji: '😤', label: 'Frustrated', value: 'frustrated' }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0] pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-[#696cff] to-[#5a5df5] rounded-full">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold cura-gradient-text mb-2">AI Mental Health Companion</h1>
          <p className="text-gray-600 text-lg">
            Your safe space to express, explore, and find support
          </p>
        </div>

        {/* Crisis Resources Modal */}
        {showCrisisResources && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="cura-card max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                  <h3 className="text-xl font-bold text-red-600">Crisis Support</h3>
                </div>
                <button
                  onClick={() => setShowCrisisResources(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-gray-700 mb-4">
                If you're having thoughts of self-harm, please reach out for immediate help:
              </p>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-red-50 rounded-lg">
                  <Phone className="h-5 w-5 text-red-500 mr-3" />
                  <div>
                    <p className="font-semibold">KIRAN Helpline</p>
                    <p className="text-lg font-mono">1800-599-0019</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <p className="font-semibold">Emergency Services</p>
                    <p className="text-lg font-mono">100</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowCrisisResources(false)}
                className="w-full mt-4 cura-button-primary"
              >
                I Understand
              </button>
            </div>
          </div>
        )}

        {/* Mood Tracking */}
        <div className="cura-card p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Activity className="h-5 w-5 text-[#696cff] mr-2" />
            How are you feeling today?
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodSelection(mood.value)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  currentMood === mood.value
                    ? 'border-[#696cff] bg-[#696cff]/10'
                    : 'border-white/40 hover:border-[#696cff]/50'
                }`}
              >
                <div className="text-2xl mb-1">{mood.emoji}</div>
                <div className="text-xs font-medium">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Container */}
        <div className="cura-card p-6 h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl backdrop-blur-lg ${
                    message.isUser
                      ? 'bg-gradient-to-r from-[#696cff] to-[#5a5df5] text-white shadow-lg'
                      : message.type === 'crisis'
                      ? 'bg-red-50 border border-red-200 text-red-800'
                      : 'bg-white/80 text-gray-800 border border-white/30'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {!message.isUser && (
                      <Bot className="h-5 w-5 text-[#696cff] mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {message.isUser && (
                      <User className="h-5 w-5 text-white/80 mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/80 p-4 rounded-2xl backdrop-blur-lg border border-white/30">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5 text-[#696cff]" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#696cff] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#696cff] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-[#696cff] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Response Buttons */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Quick responses:</p>
            <div className="flex flex-wrap gap-2">
              {quickResponses.map((response, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickResponse(response)}
                  className="px-3 py-1 text-xs bg-white/60 hover:bg-white/80 text-gray-700 rounded-full border border-white/40 transition-all duration-200 hover:scale-105"
                >
                  {response}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              className="flex-1 px-6 py-4 bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#696cff] focus:border-transparent transition-all duration-200 placeholder-gray-500 text-base"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="px-6 py-4 bg-gradient-to-r from-[#696cff] to-[#5a5df5] hover:from-[#5a5df5] hover:to-[#4c4de8] text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => handleQuickResponse("I'm feeling anxious and need help")}
            className="cura-card p-4 text-center hover:scale-105 transition-transform duration-200"
          >
            <Brain className="h-6 w-6 text-[#696cff] mx-auto mb-2" />
            <p className="text-sm font-medium">Feeling Anxious?</p>
          </button>
          <button 
            onClick={() => handleQuickResponse("I need someone to talk to")}
            className="cura-card p-4 text-center hover:scale-105 transition-transform duration-200"
          >
            <MessageCircle className="h-6 w-6 text-[#696cff] mx-auto mb-2" />
            <p className="text-sm font-medium">Need to Talk?</p>
          </button>
          <button 
            onClick={() => handleQuickResponse("I'm stressed about my studies")}
            className="cura-card p-4 text-center hover:scale-105 transition-transform duration-200"
          >
            <BookOpen className="h-6 w-6 text-[#696cff] mx-auto mb-2" />
            <p className="text-sm font-medium">Study Stress?</p>
          </button>
          <button 
            onClick={() => setShowCrisisResources(true)}
            className="cura-card p-4 text-center hover:scale-105 transition-transform duration-200"
          >
            <AlertTriangle className="h-6 w-6 text-red-500 mx-auto mb-2" />
            <p className="text-sm font-medium">Crisis Support</p>
          </button>
        </div>
      </div>
    </div>
  );
};