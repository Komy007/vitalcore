
import { GoogleGenAI, Type } from "@google/genai";
import { SearchResult } from "../types";

// Always use the named parameter for API key and assume it exists in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchAiHealthPost = async (language: string): Promise<{ title: string; content: string }> => {
  const prompt = `Generate a short, informative health news article about the latest research on Phellinus linteus (Sanghwang mushroom) in the year 2024 or 2025. 
  The article should mention potential benefits like anti-cancer properties, immune system boost, or diabetes management. 
  Language: ${language}. 
  Return the result in JSON format with "title" and "content" fields.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING }
          },
          required: ["title", "content"]
        }
      }
    });

    // response.text is a getter, do not call it as a function.
    const data = JSON.parse(response.text || '{}');
    return {
      title: data.title || "Latest Phellinus Research",
      content: data.content || "An exciting update in mycology research..."
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      title: "Research Summary (Error Loading)",
      content: "Could not fetch the latest research at this moment. Please try again later."
    };
  }
};

export const searchHealthInfo = async (query: string, language: string): Promise<SearchResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for information about: ${query}. Focus on scientific evidence and health studies. Language: ${language}.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    // Extracting grounding chunks for search sources as required by guidelines
    return {
      text: response.text || "No results found.",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Search Error:", error);
    return {
      text: "An error occurred while searching. Please try again.",
      sources: []
    };
  }
};
