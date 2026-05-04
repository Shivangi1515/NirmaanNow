import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | null = null;

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}



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
      return executeSimulation(prompt, context);
    }
  } else {
    // Advanced Simulation when no API key is present
    return executeSimulation(prompt, context);
  }
};

const executeSimulation = async (prompt: string, context: any = {}): Promise<string> => {
  try {
    let contextualPrompt = `${SYSTEM_PROMPT}\n\n`;
    if (Object.keys(context).length > 0) {
      contextualPrompt += `User Context Data:\n${JSON.stringify(context, null, 2)}\n\n`;
    }
    contextualPrompt += `User says: "${prompt}"\n\nNirmaan's response:`;

    // Use Pollinations open text API as a free fallback LLM
    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(contextualPrompt)}`);
    if (!response.ok) throw new Error('Pollinations API failed');
    return await response.text();
  } catch (error) {
    console.error("Pollinations Fallback Error:", error);
    return "I am experiencing high network latency and cannot process your thoughts right now. Please take a deep breath and try again in a moment.";
  }
};
