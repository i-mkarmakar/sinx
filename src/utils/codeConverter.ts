import { GoogleGenerativeAI } from "@google/generative-ai";

export const convertCode = async (
  sourceCode: string,
  sourceLang: string,
  targetLang: string
): Promise<string> => {
  try {
    const apiKey = localStorage.getItem('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('Please set your Gemini API key in settings');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    const prompt = `Convert this ${sourceLang} code to ${targetLang}. Only return the converted code without any explanations:\n\n${sourceCode}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('No response from Gemini API');
    }

    return text.trim();
  } catch (error: any) {
    console.error('Error converting code:', error);
    
    if (error.message?.includes('API key not valid')) {
      throw new Error('Invalid Gemini API key. Please check your API key in settings.');
    }
    
    throw error instanceof Error ? error : new Error('An unexpected error occurred');
  }
};