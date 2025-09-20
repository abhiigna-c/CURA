import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Get the generative model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Mental health context for the AI
const MENTAL_HEALTH_CONTEXT = `
You are CURA, a compassionate AI mental health companion designed specifically for Indian college students. Your role is to:

1. Provide empathetic, supportive responses to mental health concerns
2. Offer practical coping strategies and techniques
3. Recognize when professional help is needed
4. Be culturally sensitive to Indian student experiences
5. Maintain a warm, non-judgmental tone
6. Focus on immediate support and practical advice

Guidelines:
- Always prioritize safety - if someone mentions self-harm or suicide, immediately direct them to crisis resources
- Be encouraging and validate their feelings
- Suggest practical, actionable steps
- Keep responses concise but meaningful (2-3 sentences)
- Use a supportive, friendly tone
- Avoid giving medical diagnoses or treatment advice
- Encourage professional help when appropriate

Crisis Resources to mention:
- KIRAN Helpline: 1800-599-0019
- Emergency Services: 100
- Campus counseling services

Remember: You're here to support, not replace professional mental health care.
`;

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class GeminiService {
  private chatHistory: ChatMessage[] = [];

  // Crisis detection keywords
  private crisisKeywords = [
    'suicide', 'kill myself', 'end it all', 'not worth living', 'better off dead',
    'self harm', 'hurt myself', 'cut myself', 'harm myself', 'die', 'death',
    'hopeless', 'no point', 'give up', 'can\'t go on', 'end my life'
  ];

  // Check if message contains crisis indicators
  private isCrisisMessage(message: string): boolean {
    const lowerMessage = message.toLowerCase();
    return this.crisisKeywords.some(keyword => lowerMessage.includes(keyword));
  }

  // Get crisis response
  private getCrisisResponse(): string {
    return `I'm deeply concerned about what you're sharing. Your safety is the most important thing right now. Please reach out for immediate help:

🚨 **Crisis Support:**
- **KIRAN Helpline**: 1800-599-0019 (24/7)
- **Emergency Services**: 100
- **Campus Security**: Available 24/7

You are not alone, and there are people who want to help you. Please don't hesitate to reach out to someone you trust or these crisis resources immediately.`;
  }

  // Generate AI response
  async generateResponse(userMessage: string): Promise<string> {
    try {
      // Check for crisis indicators first
      if (this.isCrisisMessage(userMessage)) {
        return this.getCrisisResponse();
      }

      // Add user message to history
      this.chatHistory.push({
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      });

      // Prepare conversation history for Gemini
      const conversationHistory = this.chatHistory
        .slice(-10) // Keep last 10 messages for context
        .map(msg => `${msg.role === 'user' ? 'User' : 'CURA'}: ${msg.content}`)
        .join('\n');

      // Create the prompt with context
      const prompt = `${MENTAL_HEALTH_CONTEXT}

Previous conversation:
${conversationHistory}

Current user message: ${userMessage}

Please respond as CURA, the mental health companion. Keep your response supportive, practical, and concise.`;

      // Generate response
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiResponse = response.text();

      // Add AI response to history
      this.chatHistory.push({
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      });

      // Keep only last 20 messages to manage memory
      if (this.chatHistory.length > 20) {
        this.chatHistory = this.chatHistory.slice(-20);
      }

      return aiResponse;

    } catch (error) {
      console.error('Error generating Gemini response:', error);
      
      // Fallback responses based on common mental health topics
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
        return "I understand that anxiety can feel overwhelming. Try taking slow, deep breaths - inhale for 4 counts, hold for 4, and exhale for 6. This simple technique can help calm your nervous system. Would you like to talk about what's making you feel anxious?";
      }
      
      if (lowerMessage.includes('sad') || lowerMessage.includes('depressed')) {
        return "I hear that you're going through a difficult time. It's okay to feel sad, and your feelings are valid. Sometimes just talking about what's on your mind can help. What's one small thing that might bring you comfort today?";
      }
      
      if (lowerMessage.includes('stress') || lowerMessage.includes('stressed')) {
        return "Stress can feel overwhelming, especially in college. Let's break this down together. What specific aspect is causing you the most stress right now? Sometimes identifying the main source can help us find manageable solutions.";
      }
      
      // Default fallback
      return "I'm here to listen and support you. Sometimes it helps to talk through what you're experiencing. What's on your mind today?";
    }
  }

  // Clear chat history
  clearHistory(): void {
    this.chatHistory = [];
  }

  // Get chat history
  getHistory(): ChatMessage[] {
    return [...this.chatHistory];
  }

  // Add system message
  addSystemMessage(message: string): void {
    this.chatHistory.push({
      role: 'assistant',
      content: message,
      timestamp: new Date()
    });
  }
}

// Export singleton instance
export const geminiService = new GeminiService();
