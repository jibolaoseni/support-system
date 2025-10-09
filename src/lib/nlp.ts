
import { knowledgeBase, KBArticle } from '../data/knowledge-base';

// Simulate a delay to mimic an API call
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Searches the knowledge base for articles that match the user's query.
 * This is a simple keyword-matching implementation.
 * @param query The user's search query.
 * @param module The module selected by the user.
 * @returns A list of relevant knowledge base articles.
 */
const searchKnowledgeBase = (query: string, module: string): KBArticle[] => {
  const queryTokens = query.toLowerCase().split(/\s+/);
  const results: KBArticle[] = [];

  knowledgeBase.forEach(article => {
    if (article.status !== 'published') return;

    let score = 0;
    const title = article.title.toLowerCase();
    const content = article.description.toLowerCase();
    const tags = article.tags.map(t => t.toLowerCase());

    // Check for module match
    if (article.module.toLowerCase() === module.toLowerCase()) {
      score += 2;
    }

    // Check for keyword matches in title, content, and tags
    queryTokens.forEach(token => {
      if (title.includes(token)) {
        score += 3;
      }
      if (content.includes(token)) {
        score += 1;
      }
      if (tags.includes(token)) {
        score += 2;
      }
    });

    if (score > 2) {
      results.push({ ...article, score });
    }
  });

  // Sort results by score in descending order
  return results.sort((a, b) => (b.score || 0) - (a.score || 0));
};

/**
 * Simulates calling an LLM to get suggestions based on the user's input.
 * @param description The problem description from the user.
 * @param module The module selected by the user.
 * @returns A promise that resolves to a list of suggested knowledge base articles.
 */
export const getLLMSuggestions = async (
  description: string,
  module: string
): Promise<KBArticle[]> => {
  console.log('Simulating LLM call with:', { description, module });
  await sleep(1500); // Simulate network latency and processing time

  const relevantArticles = searchKnowledgeBase(description, module);
  
  console.log('LLM simulation found:', relevantArticles);
  return relevantArticles.slice(0, 3); // Return the top 3 suggestions
};
