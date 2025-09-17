import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm CURA's AI assistant. I'm here to provide mental health support and guidance. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple pattern matching for mental health responses
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
      return "I understand you're feeling anxious. Anxiety is very common among students. Try the 4-7-8 breathing technique: breathe in for 4 counts, hold for 7, and exhale for 8. Would you like me to guide you through some other anxiety management techniques?";
    }
    
    if (lowerMessage.includes('stressed') || lowerMessage.includes('stress')) {
      return "Stress is a natural response to challenging situations. Here are some quick stress-relief techniques: 1) Take deep breaths, 2) Practice progressive muscle relaxation, 3) Take a short walk, 4) Listen to calming music. What's causing you the most stress right now?";
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      return "I'm sorry you're feeling this way. It's important to acknowledge these feelings. Remember that seeking help is a sign of strength. Consider talking to friends, family, or a professional counselor. Would you like information about booking a counseling session?";
    }
    
    if (lowerMessage.includes('exam') || lowerMessage.includes('study') || lowerMessage.includes('academic')) {
      return "Academic pressure can be overwhelming. Here are some study tips for better mental health: 1) Break tasks into smaller chunks, 2) Take regular breaks, 3) Maintain a sleep schedule, 4) Don't compare yourself to others. What specific academic challenges are you facing?";
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia')) {
      return "Good sleep is crucial for mental health. Try these sleep hygiene tips: 1) Set a consistent bedtime, 2) Avoid screens 1 hour before bed, 3) Keep your room cool and dark, 4) Practice relaxation techniques. How many hours of sleep are you getting?";
    }

    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone')) {
      return "Feeling lonely is more common than you think, especially in college. Consider joining student clubs, study groups, or our peer support community. Connection with others is vital for mental well-being. Would you like me to tell you about our community features?";
    }
    
    // Default responses
    const defaultResponses = [
      "Thank you for sharing that with me. Can you tell me more about what you're experiencing?",
      "I hear you. It sounds like you're going through a challenging time. What would be most helpful for you right now?",
      "That must be difficult for you. Remember, you're not alone in this journey. How can I best support you today?",
      "I appreciate you opening up about this. What strategies have you tried before to deal with similar situations?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm CURA's AI assistant. I'm here to provide mental health support and guidance. How are you feeling today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="pt-16 min-h-screen flex flex-col">
      {/* Header */}
      <div className="backdrop-blur-lg bg-white/80 border-b border-white/20 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#696cff] to-purple-600 flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">CURA AI Assistant</h1>
              <p className="text-sm text-gray-500">Always here to listen and help</p>
            </div>
          </div>
          
          <button
            onClick={clearChat}
            className="flex items-center space-x-2 px-4 py-2 bg-white/60 hover:bg-white/80 rounded-full text-gray-600 hover:text-gray-800 transition-all duration-200 border border-white/30"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div className={`flex items-start space-x-3 max-w-xs sm:max-w-md lg:max-w-lg ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-[#696cff] text-white' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                }`}>
                  {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                
                <div className={`backdrop-blur-lg rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-[#696cff] text-white'
                    : 'bg-white/70 text-gray-800 border border-white/30'
                } ${message.sender === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'}`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="backdrop-blur-lg bg-white/70 border border-white/30 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <Loader className="h-4 w-4 animate-spin text-gray-600" />
                    <span className="text-sm text-gray-600">CURA is typing...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="backdrop-blur-lg bg-white/80 border-t border-white/20 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... Press Enter to send"
                className="w-full px-4 py-3 pr-12 backdrop-blur-sm bg-white/60 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#696cff] focus:border-transparent transition-all duration-200 placeholder-gray-500"
                disabled={isTyping}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="w-12 h-12 bg-[#696cff] hover:bg-[#5a5df5] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-center mt-3 space-x-4">
            <p className="text-xs text-gray-500 text-center">
              This AI assistant provides general support. For serious mental health concerns, please seek professional help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};