
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { knowledgeBase } from "../src/data/knowledge-base";

// 1. Get the API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("Gemini API key is not configured. Please add it to your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { question, module, imageBase64 } = await req.json();

    if (!question || !imageBase64) {
      return new Response(JSON.stringify({ error: 'Question and image are required' }), { status: 400 });
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

    // 3. Switch to a multimodal model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 4. Construct the multipart prompt
    const textPrompt = `
      You are an expert AI Support Assistant. Your task is to analyze the user's question and the attached screenshot.
      Then, based **exclusively** on the knowledge base articles provided below, provide a concise and helpful answer to the user's question.
      Read any error messages or text in the screenshot to better understand the context.
      If the articles don't contain a relevant answer, state that you couldn't find a solution in the knowledge base and suggest creating a ticket.

      ---
      PROVIDED KNOWLEDGE BASE ARTICLES:
      ${context}
      ---
      USER'S QUESTION:
      "${question}"
      ---
      YOUR ANALYSIS AND ANSWER:
    `;

    // 5. Define the image part of the prompt
    const imagePart: Part = {
      inline_data: {
        mime_type: imageBase64.match(/data:(.*);base64,/)[1] || 'image/png',
        data: imageBase64.split(',')[1],
      },
    };

    const promptParts = [textPrompt, imagePart];

    // 6. Call the API with both text and image
    const result = await model.generateContent(promptParts);
    const response = await result.response;
    const text = response.text();

    // 7. Send the response back to the frontend
    return new Response(JSON.stringify({ answer: text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in Gemini API call:", error);
    return new Response(JSON.stringify({ error: "Failed to get a response from the AI. Check your API key.", details: error.message }), { status: 500 });
  }
}
