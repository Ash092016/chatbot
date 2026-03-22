import { GoogleGenAI } from "@google/genai";
import { GEOPOLITICS_SYSTEM_PROMPT } from "./constants";

let ai = null;
let currentApiKey = null;
let chatHistory = [];

// Latest models (in order of preference)
const MODELS = [
  "gemini-3-flash-preview",
  "gemini-3-pro-preview",
];

export function initializeChat(apiKey) {
  currentApiKey = apiKey;
  ai = new GoogleGenAI({ apiKey });
  chatHistory = [];
}

export async function sendMessage(message) {
  if (!ai) {
    throw new Error("Chat not initialized. Please enter your API key.");
  }

  // Add user message to history
  chatHistory.push({ role: "user", parts: [{ text: message }] });

  for (const modelName of MODELS) {
    try {
      const response = await ai.models.generateContentStream({
        model: modelName,
        systemInstruction: GEOPOLITICS_SYSTEM_PROMPT,
        contents: chatHistory,
        config: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 2048,
        },
      });

      // Return an async generator that also builds history
      return buildStream(response, modelName);
    } catch (error) {
      const msg = error.message || "";
      const is429 = msg.includes("429") || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED");
      if (is429) {
        console.warn(`[GeoPulse] ${modelName} quota exceeded, trying next model...`);
        continue;
      }
      throw new Error(msg || "Unexpected error. Please try again.");
    }
  }

  throw new Error(
    "Your Gemini API key's daily quota is exhausted.\n\nTo fix this:\n1. Go to https://aistudio.google.com/apikey\n2. Sign in with a DIFFERENT Google account\n3. Create a new API key and enter it by clicking 'New Chat'"
  );
}

async function* buildStream(response, modelName) {
  let fullText = "";
  for await (const chunk of response) {
    const text = chunk.text || "";
    fullText += text;
    yield text;
  }
  // Add assistant response to history for multi-turn chat
  chatHistory.push({ role: "model", parts: [{ text: fullText }] });
  console.log(`[GeoPulse] Response from ${modelName}`);
}

export function resetChat() {
  chatHistory = [];
}
