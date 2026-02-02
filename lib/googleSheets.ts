import { google } from 'googleapis';

type SubmissionData = {
    date: string;
    time: string;
    message: string;
};

export async function appendToSheet(data: SubmissionData) {
    try {
        // Check if env vars are present
        if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
            console.warn('Google Sheets credentials missing in environment variables.');
            return null;
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        // Append to Sheet1
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A:C',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [data.date, data.time, data.message]
                ],
            },
        });

        return true;
    } catch (error) {
        console.error('Error appending to Google Sheet:', error);
        throw error;
    }
}
