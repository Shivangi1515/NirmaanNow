import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | null = null;

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

// Fallback advanced simulation
const MOCK_RESPONSES: Record<string, string> = {
  "Help me reflect on today": "Take a deep breath. What was the most prominent emotion you felt today? Often, naming the feeling is the first step to processing it.",
  "Plan my week": "Let's break it down gently. What are the top 3 priorities that would make you feel accomplished by Friday?",
  "Suggest habits for my goals": "If you're aiming for better health, try starting with just drinking a glass of water first thing in the morning. Small steps build lasting bridges.",
  "Summarize my mood pattern": "Looking at your recent logs, you seem to feel more anxious on weekdays, but calm on weekends. Perhaps introducing a 5-minute mindfulness break during work could help?",
  "default": "I'm analyzing your context... That's a great thought. Tell me more about what's on your mind."
};

const SYSTEM_PROMPT = `
You are Nirmaan, an elite, highly empathetic, and technologically advanced AI life-operating system companion. 
Your goal is to help the user build better habits, achieve their goals, and gently process their emotions.
Keep your responses concise, profound, and deeply helpful. Limit responses to 2-3 short paragraphs maximum.
Speak with a tone that is ethereal, calm, intelligent, and deeply supportive.
`;

export const generateAIResponse = async (prompt: string, context: any = {}): Promise<string> => {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      let contextualPrompt = `${SYSTEM_PROMPT}\n\n`;
      if (Object.keys(context).length > 0) {
        contextualPrompt += `User Context Data:\n${JSON.stringify(context, null, 2)}\n\n`;
      }
      contextualPrompt += `User says: "${prompt}"\n\nNirmaan's response:`;

      const result = await model.generateContent(contextualPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini AI Error:", error);
      // Fallback to simulation if API fails
      return executeSimulation(prompt);
    }
  } else {
    // Advanced Simulation when no API key is present
    return executeSimulation(prompt);
  }
};

const executeSimulation = async (prompt: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerPrompt = prompt.toLowerCase();
      let response = MOCK_RESPONSES['default'];
      
      if (lowerPrompt.includes('reflect') || lowerPrompt.includes('today')) response = MOCK_RESPONSES["Help me reflect on today"];
      else if (lowerPrompt.includes('plan') || lowerPrompt.includes('week')) response = MOCK_RESPONSES["Plan my week"];
      else if (lowerPrompt.includes('habit') || lowerPrompt.includes('goal')) response = MOCK_RESPONSES["Suggest habits for my goals"];
      else if (lowerPrompt.includes('mood') || lowerPrompt.includes('feel')) response = MOCK_RESPONSES["Summarize my mood pattern"];
      
      resolve(response);
    }, 1500); // Simulate network latency
  });
};
