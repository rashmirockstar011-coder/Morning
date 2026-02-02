# Good Morning

A daily rotating quote website.

## Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env.local` file in the root directory with the following variables:

    ```bash
    GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account-email@...
    GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
    GOOGLE_SHEET_ID=your-sheet-id
    ```

    *   **GOOGLE_SHEET_ID**: The ID from your Google Sheet URL: `https://docs.google.com/spreadsheets/d/[ID]/edit`
    *   **Service Account**: You need to create a Service Account in Google Cloud Console, enable the Google Sheets API, and share your Google Sheet with the service account email.

3.  **Run Locally:**
    ```bash
    npm run dev
    ```

4.  **Quotes:**
    Update `data/quotes.json` with your full list of quotes.

## Deployment

Deploy to Vercel and add the environment variables in the Vercel project settings.
