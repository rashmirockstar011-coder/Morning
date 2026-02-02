import { getTodayQuote } from '@/lib/quoteSelector';
import QuoteView from './QuoteView';

// Ensure the page is rendered dynamically on the server for each request
// so the quote rotation logic runs against the current server time.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  const quote = getTodayQuote();

  return <QuoteView quote={quote} />;
}
