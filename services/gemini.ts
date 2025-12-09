import { GoogleGenAI, Type } from "@google/genai";
import { RESUME_CONTENT } from "../constants";

// Initialize Gemini
// NOTE: We assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEnhancedBio = async (
  currentBio: string,
  role: string,
  tone: 'professional' | 'casual' | 'tech' | 'creative'
): Promise<string> => {
  try {
    const prompt = `
      You are an expert copywriter for tech portfolios.
      Rewrite the following bio for a "${role}" to sound more "${tone}".
      Keep it under 250 characters.
      
      Here is the user's detailed Resume Context to help you write a more accurate bio:
      ---
      ${RESUME_CONTENT}
      ---
      
      Current Bio Draft: "${currentBio}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bio: { type: Type.STRING },
          },
          required: ['bio'],
        },
      }
    });

    const json = JSON.parse(response.text || '{}');
    return json.bio || currentBio;
  } catch (error) {
    console.error("Error generating bio:", error);
    return currentBio; // Fallback
  }
};

export const analyzeProfileAndSuggestTags = async (
  links: { title: string; description?: string }[]
): Promise<string[]> => {
  try {
    const prompt = `
      Analyze these portfolio links and the user's background:
      Links: ${JSON.stringify(links)}
      Resume Highlights: ${RESUME_CONTENT.slice(0, 500)}...
      
      Generate 3 short, punchy hashtags (no # symbol needed) that describe this person's expertise.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
      }
    });

    const json = JSON.parse(response.text || '{}');
    return json.tags || ['Developer', 'Web', 'Creative'];
  } catch (error) {
    return ['Developer', 'Tech', 'Builder'];
  }
};