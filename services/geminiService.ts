
import { SearchResult } from "../types";

export const fetchAiHealthPost = async (language: string): Promise<{ title: string; content: string }> => {
  try {
    const response = await fetch('/api/ai/health-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language })
    });

    if (!response.ok) throw new Error('Failed to fetch AI health post from server');

    const data = await response.json();
    return {
      title: data.title || "Latest Phellinus Research",
      content: data.content || "An exciting update in mycology research..."
    };
  } catch (error) {
    console.error("Gemini Server Error:", error);
    return {
      title: "Research Summary (Error Loading)",
      content: "Could not fetch the latest research at this moment. Please try again later."
    };
  }
};

export const searchHealthInfo = async (query: string, language: string): Promise<SearchResult> => {
  try {
    const response = await fetch('/api/ai/search-health', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, language })
    });

    if (!response.ok) throw new Error('Failed to search health info from server');

    const data = await response.json();
    return {
      text: data.text || "No results found.",
      sources: data.sources || []
    };
  } catch (error) {
    console.error("Search Server Error:", error);
    return {
      text: "An error occurred while searching. Please try again.",
      sources: []
    };
  }
};
