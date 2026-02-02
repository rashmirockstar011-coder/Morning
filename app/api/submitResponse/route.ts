import { NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/googleSheets';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { date, time, message } = body;

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Message is required.' },
                { status: 400 }
            );
        }

        // Default Date/Time if not provided (though client should provide it)
        const submittedDate = date || new Date().toLocaleDateString();
        const submittedTime = time || new Date().toLocaleTimeString();

        await appendToSheet({
            date: submittedDate,
            time: submittedTime,
            message: message.trim()
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
