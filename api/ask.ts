
import { GoogleGenerativeAI } from "@google/generative-ai";
// Adjust the import path to match your project structure
import { knowledgeBase } from "../src/data/knowledge-base";

// 1. IMPORTANT: Replace with your actual API key or use environment variables
const API_KEY = "YOUR_GEMINI_API_KEY"; 

const genAI = new GoogleGenerativeAI(API_KEY);

// This is a basic serverless function handler. 
// Platforms like Vercel or Netlify will automatically run this.
export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { question, module } = await req.json();

    if (!question) {
      return new Response(JSON.stringify({ error: 'Question is required' }), { status: 400 });
    }

    // 2. Retrieve relevant knowledge base articles
    const relevantArticles = knowledgeBase.filter(article => 
      (module && article.module === module) || 
      article.tags.some(tag => question.toLowerCase().includes(tag.toLowerCase())) ||
      article.title.toLowerCase().includes(question.toLowerCase())
    );

    const context = relevantArticles.map(article => 
      `Title: ${article.title}\nDescription: ${article.description}`
    ).join('\n---\n');

    // 3. Construct a detailed prompt for the LLM
    const prompt = `
      You are an expert AI Support Assistant. Your task is to answer the user's question based **exclusively** on the knowledge base articles provided below.
      Do not use any other information or your own general knowledge. 
      If the answer cannot be found in the provided articles, you must respond with: "I'm sorry, but I couldn't find any relevant information in the knowledge base to answer your question."

      ---
      PROVIDED KNOWLEDGE BASE ARTICLES:
      ${context}
      ---
      USER'S QUESTION:
      "${question}"
      ---
      YOUR ANSWER:
    `;

    // 4. Call the Gemini API to get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 5. Send the response back to the frontend
    return new Response(JSON.stringify({ answer: text }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Error in Gemini API call:", error);
    return new Response(JSON.stringify({ error: "Failed to get a response from the AI." }), { status: 500 });
  }
}
