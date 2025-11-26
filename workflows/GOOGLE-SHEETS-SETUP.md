# Google Sheets Subscriber Setup Guide

This guide shows you how to add subscriber management to your Fashion Insights newsletter using Google Sheets (100% free!).

## Step 1: Create Your Google Sheet

1. Go to https://sheets.google.com
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it: **"Fashion Newsletter Subscribers"**
4. In the first row, add these column headers:
   - **A1**: `email`
   - **B1**: `name`
   - **C1**: `status`
   - **D1**: `signup_date`

5. Add your subscribers starting from row 2:

| email | name | status | signup_date |
|-------|------|--------|-------------|
| ortalgr@gmail.com | Ortal | active | 2025-11-26 |
| friend@example.com | Friend | active | 2025-11-26 |

**Important:** Only subscribers with `status` = "active" will receive emails.

6. Copy the spreadsheet URL from your browser (you'll need it)

---

## Step 2: Import the New Workflow

1. In n8n, go to http://localhost:5678
2. Click **"Import"** (top right)
3. Select: `C:\Users\user\Desktop\n8n\workflows\fashion-insights-GOOGLE-SHEETS.json`
4. Click **Import**

---

## Step 3: Connect Google Sheets to n8n

1. In the workflow, click on **"Get Subscribers from Google Sheets"** node
2. Click on **"Credential to connect with"** dropdown
3. Click **"+ Create New Credential"**
4. Choose **"Google Sheets OAuth2 API"**
5. Click **"Sign in with Google"**
6. Select your Google account
7. Click **"Allow"** to grant n8n access to Google Sheets
8. Click **"Save"**

---

## Step 4: Configure the Google Sheets Node

1. Still in the **"Get Subscribers from Google Sheets"** node:
2. **Document**: Click the dropdown and search for your sheet by name: "Fashion Newsletter Subscribers"
   - Or paste your spreadsheet URL
3. **Sheet Name**: Select "Sheet1" (or whatever your sheet is named)
4. **Return All**: Make sure this is enabled (checked)
5. Click outside the node to save

---

## Step 5: Update Email Settings

1. Click on **"Send Fashion Newsletter"** node
2. Update **"From Email"** to your verified Mailjet email
3. Make sure SMTP credentials are set to "Mailjet SMTP"

---

## Step 6: Test the Workflow

1. Click **"Execute Workflow"** button
2. The workflow will:
   - Scrape Instagram posts
   - Analyze fashion trends with AI
   - Read all active subscribers from Google Sheets
   - Send a personalized newsletter to EACH subscriber

3. Check your inbox (and ask your friends to check theirs if you added them!)

---

## How It Works

The new workflow adds these nodes:

```
Format Final Report →
Get Subscribers from Google Sheets →
Filter Active Subscribers →
Loop Over Subscribers →
Prepare Email for Subscriber →
Send Fashion Newsletter →
Loop Back (repeat for next subscriber)
```

**Key Features:**
- ✅ Personalized greeting: "Hi Ortal!" (uses subscriber name)
- ✅ Only sends to "active" subscribers
- ✅ Easy to add/remove subscribers (just edit the Google Sheet)
- ✅ Completely free (Google Sheets is free)
- ✅ Unlimited subscribers

---

## Managing Subscribers

### Add a new subscriber:
1. Open your Google Sheet
2. Add a new row with: email, name, active, today's date

### Remove a subscriber:
1. Change their `status` from "active" to "inactive"
2. They won't receive future newsletters

### Re-activate a subscriber:
1. Change their `status` back to "active"

---

## Next Steps

Once Google Sheets is working:
1. ✅ **Google Sheets Subscribers** - DONE!
2. ⏭️ **Shopify Product Integration** - Match trends to products
3. ⏭️ **Hostinger Landing Page** - Collect signups automatically

---

## Troubleshooting

**"Could not find spreadsheet"**
- Make sure the spreadsheet URL is correct
- Make sure you granted Google Sheets access to n8n
- Try re-authenticating the Google credential

**"No subscribers found"**
- Check your Google Sheet has rows with data
- Make sure column headers are exactly: email, name, status, signup_date
- Make sure at least one subscriber has status = "active"

**"Email not received"**
- Check Mailjet credentials are configured
- Check "From Email" is verified in Mailjet
- Check spam/promotions folder
- Make sure subscriber email address is correct
