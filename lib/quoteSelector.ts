import quotes from '@/data/quotes.json';

// Fixed start date for deterministic rotation
const START_DATE = '2025-01-01T00:00:00Z';

export type Quote = {
  id: number;
  text: string;
};

export function getTodayQuote(): Quote {
  const start = new Date(START_DATE).getTime();
  const now = new Date().getTime(); // UTC time on server
  const msPerDay = 1000 * 60 * 60 * 24;
  
  // Calculate diff in milliseconds and convert to days
  const diff = now - start;
  const daysElapsed = Math.floor(diff / msPerDay);
  
  const count = quotes.length;
  if (count === 0) {
    return { id: 0, text: "Good morning. (No quotes found in data)" };
  }
  
  // Ensure non-negative index
  const index = ((daysElapsed % count) + count) % count;
  
  return quotes[index];
}
