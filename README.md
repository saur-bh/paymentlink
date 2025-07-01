# Kidaura Invoice Payment Link Generator

This project is a Node.js + Express web app for fetching, saving, and generating payment links for Kidaura invoices.

## Features
- Fetch invoices from Kidaura GraphQL API for a selected month, year, and centre.
- Save fetched invoices as drafts (JSON) on the server.
- Generate PhonePe payment links for each invoice, with the option to edit the phone number before generating.
- User-friendly web interface with copy/open link modal.

## Folder Structure
```
project-root/
├── public/
│   └── driver.html         # Main frontend UI
├── drafts/                 # Saved invoice drafts (JSON)
├── server/
│   ├── generateLink.js     # (Batch) Script for generating links
│   └── phonepe.js          # PhonePe link generation logic
├── server.js               # Express server
├── package.json            # Node.js dependencies
```

## Setup
1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Environment variables:**
   Create a `.env` file in the root with the following (get values from PhonePe):
   ```env
   PP_MERCHANT_ID=your_merchant_id
   PP_SALT_KEY=your_salt_key
   PP_SALT_INDEX=your_salt_index
   PP_HOST_URL=https://api.phonepe.com
   PP_CALLBACK_URL=https://your-callback-url.com
   ```

3. **Start the server:**
   ```sh
   node server.js
   ```
   The app will be available at http://localhost:3000/driver.html

## Usage
- Open the app in your browser.
- Select year, month, and centre, then fetch invoices.
- Click "Save Drafts" to save the current invoices as a JSON file.
- For any invoice, click "Generate Link" to edit the phone and generate a payment link. Use the modal to copy or open the link.

## Notes
- The server must be running for all features to work.
- Payment link generation requires valid PhonePe API credentials.
- Drafts are saved in the `drafts/` folder as JSON files.

## License
MIT
