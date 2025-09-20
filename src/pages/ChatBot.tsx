import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, MessageCircle, AlertTriangle, Phone, BookOpen, Brain, Activity, X, Sparkles } from 'lucide-react';
import { geminiService } from '../services/geminiService';

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
        text: "Hello! I'm CURA, your AI mental health companion powered by Google Gemini. How are you feeling today? You can share anything with me - I'm here to listen and support you with intelligent, empathetic responses.",
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

  const getIntelligentResponse = async (userMessage: string): Promise<string> => {
    try {
      // Use Gemini AI for intelligent responses
      const response = await geminiService.generateResponse(userMessage);
      
      // Check if it's a crisis response and show crisis resources
      if (response.includes('KIRAN Helpline') || response.includes('crisis')) {
        setShowCrisisResources(true);
      }
      
      return response;
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback to simple responses if Gemini fails
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
        return "I understand that anxiety can feel overwhelming. Try taking slow, deep breaths - inhale for 4 counts, hold for 4, and exhale for 6. This simple technique can help calm your nervous system.";
      }
      
      if (lowerMessage.includes('sad') || lowerMessage.includes('depressed')) {
        return "I hear that you're going through a difficult time. It's okay to feel sad, and your feelings are valid. Sometimes just talking about what's on your mind can help.";
      }
      
      return "I'm here to listen and support you. Sometimes it helps to talk through what you're experiencing. What's on your mind today?";
    }
  };

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const userMessage = inputText;
      const newMessage: Message = {
        id: Date.now(),
        text: userMessage,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      setIsTyping(true);

      try {
        // Get AI response from Gemini
        const aiResponse = await getIntelligentResponse(userMessage);
        
        const botResponse: Message = {
          id: Date.now() + 1,
          text: aiResponse,
          isUser: false,
          timestamp: new Date(),
          type: detectCrisis(userMessage) ? 'crisis' : undefined
        };
        
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        
        // Fallback response
        const fallbackResponse: Message = {
          id: Date.now() + 1,
          text: "I'm having trouble connecting right now, but I'm still here to listen. Please try again, or if you need immediate support, please reach out to our crisis resources.",
          isUser: false,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, fallbackResponse]);
      } finally {
        setIsTyping(false);
      }
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

  const clearChatHistory = () => {
    setMessages([{
      id: 1,
      text: "Hello! I'm CURA, your AI mental health companion powered by Google Gemini. How are you feeling today? You can share anything with me - I'm here to listen and support you.",
      isUser: false,
      timestamp: new Date(),
    }]);
    geminiService.clearHistory();
    localStorage.removeItem('cura-chat-history');
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
          <div className="flex items-center justify-center mb-2">
            <Sparkles className="h-8 w-8 text-[#696cff] mr-3" />
            <h1 className="text-4xl font-bold cura-gradient-text">AI Mental Health Companion</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Powered by Google Gemini AI • Your safe space to express, explore, and find support
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
          {/* Chat Header */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/20">
            <h3 className="text-lg font-semibold text-gray-900">Chat with CURA AI</h3>
            <button
              onClick={clearChatHistory}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Clear Chat
            </button>
          </div>
          
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