'use client';

import { useState, useEffect } from 'react';
import { Quote } from '@/lib/quoteSelector';

export default function QuoteView({ quote }: { quote: Quote }) {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [dateTime, setDateTime] = useState<Date | null>(null);

    useEffect(() => {
        // Set initial date/time on client (to avoid hydration mismatch)
        setDateTime(new Date());

        // Update time every second
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setStatus('submitting');

        // Capture local date/time
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();

        try {
            const res = await fetch('/api/submitResponse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, time, message }),
            });

            if (res.ok) {
                setStatus('success');
                setMessage(''); // Clear input
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = dateTime ? days[dateTime.getDay()] : 'sunday';

    const formattedDate = dateTime ? dateTime.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    }) : '';

    const formattedTime = dateTime ? dateTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    }) : '';

    return (
        <main className={`min-h-screen flex flex-col items-center justify-center p-6 text-center transition-opacity duration-1000 ease-in-out bg-[#fdfbf7] relative overflow-hidden`}>

            {/* Background Elements */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-100 via-transparent to-transparent"></div>
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-rose-100 via-transparent to-transparent"></div>

            {/* Date/Time Widget - Top Right */}
            <div className="absolute top-8 right-8 md:top-12 md:right-12 text-right font-serif text-gray-400 opacity-90 pointer-events-none z-20">
                <p className="text-3xl md:text-4xl font-light text-gray-800 tracking-tight">{formattedTime}</p>
                <p className="text-xs md:text-sm tracking-[0.2em] uppercase mt-2 text-gray-500 font-sans">{formattedDate}</p>
            </div>

            <div className="max-w-xl w-full flex flex-col items-center gap-10 z-10">

                {/* Daily Cute Graphic */}
                <div className="w-40 h-40 md:w-48 md:h-48 relative animate-fade-in-up transition-transform hover:scale-105 duration-700">
                    {dateTime && (
                        <img
                            src={`/images/${currentDay}.png`}
                            alt={`${currentDay} graphic`}
                            className="w-full h-full object-contain mix-blend-multiply opacity-90"
                        />
                    )}
                </div>

                {/* Quote Section */}
                <div className="space-y-8 animate-fade-in-up2">
                    <div className="font-serif text-lg md:text-2xl text-gray-700 leading-loose italic px-2 whitespace-pre-line">
                        {quote.text}
                    </div>
                    <div className="w-10 h-0.5 bg-rose-200 mx-auto rounded-full"></div>
                </div>

                {/* Input Section */}
                <div className="w-full max-w-sm pt-8 animate-fade-in-up3">
                    {status === 'success' ? (
                        <div className="p-4 text-emerald-800/80 bg-emerald-50/50 rounded-lg border border-emerald-100/50 font-serif text-sm tracking-wide">
                            Has been sent. Have a lovely day.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Say good morning to me..."
                                className="w-full bg-transparent border-b border-gray-300 focus:border-rose-300 text-center py-2 px-4 outline-none transition-all duration-300 placeholder:text-gray-300 text-gray-600 font-serif text-lg focus:placeholder:text-gray-200"
                                disabled={status === 'submitting'}
                            />
                            <button
                                type="submit"
                                disabled={!message.trim() || status === 'submitting'}
                                className="text-[10px] uppercase tracking-[0.25em] text-gray-400 hover:text-rose-400 transition-colors disabled:opacity-30 disabled:hover:text-gray-400 font-medium pt-2"
                            >
                                {status === 'submitting' ? 'Sending...' : 'Send Reply'}
                            </button>
                            {status === 'error' && (
                                <p className="text-rose-400 text-xs font-serif italic">Something went wrong. Please try again.</p>
                            )}
                        </form>
                    )}
                </div>
            </div>

            <style jsx global>{`
              @keyframes fade-in-up {
                0% { opacity: 0; transform: translateY(20px); }
                100% { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in-up { animation: fade-in-up 1.2s ease-out forwards; }
              .animate-fade-in-up2 { animation: fade-in-up 1.2s ease-out 0.3s forwards; opacity: 0; }
              .animate-fade-in-up3 { animation: fade-in-up 1.2s ease-out 0.6s forwards; opacity: 0; }
            `}</style>
        </main>
    );
}
