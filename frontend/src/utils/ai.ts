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

export const generateAIResponse = async (messages: { role: string, content: string }[], context: any = {}): Promise<string> => {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Build the chat history for Gemini
      const chat = model.startChat({
        history: messages.slice(0, -1).map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
        generationConfig: {
          maxOutputTokens: 500,
        },
      });

      const userMessage = messages[messages.length - 1].content;
      let contextualPrompt = `${SYSTEM_PROMPT}\n\n`;
      if (Object.keys(context).length > 0) {
        contextualPrompt += `User Context Data (for your awareness):\n${JSON.stringify(context, null, 2)}\n\n`;
      }
      contextualPrompt += userMessage;

      const result = await chat.sendMessage(contextualPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini AI Error:", error);
      return executeSimulation(messages, context);
    }
  } else {
    return executeSimulation(messages, context);
  }
};

const executeSimulation = async (messages: { role: string, content: string }[], context: any = {}): Promise<string> => {
  try {
    const lastMessage = messages[messages.length - 1].content;
    const historySnippet = messages.slice(-5, -1).map(m => `${m.role}: ${m.content}`).join('\n');
    
    let contextualPrompt = `${SYSTEM_PROMPT}\n\nConversation History:\n${historySnippet}\n\n`;
    if (Object.keys(context).length > 0) {
      contextualPrompt += `User Context:\n${JSON.stringify(context, null, 2)}\n\n`;
    }
    contextualPrompt += `User: ${lastMessage}\nNirmaan:`;

    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(contextualPrompt)}`);
    if (!response.ok) throw new Error('Pollinations API failed');
    return await response.text();
  } catch (error) {
    console.error("Simulation Fallback Error:", error);
    return "I am here and listening, but I'm having trouble connecting to my deep intelligence modules. Let's keep talking, and I'll do my best to support you.";
  }
};
