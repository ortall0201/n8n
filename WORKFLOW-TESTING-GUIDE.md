# n8n Workflows - Testing Guide

**Created:** November 26, 2025
**Status:** Ready for Testing

---

## Overview

You now have 2 working n8n workflows:

1. **Main Newsletter Workflow** - Scrapes Instagram, analyzes with AI, sends newsletters
2. **Newsletter Signup Webhook** - Allows users to subscribe via web form

---

## Workflow 1: Main Newsletter (UPDATED ✅)

**File:** `workflows/fashion-insights-INFLUENCER-PRODUCTS.json`

### What Was Fixed:
✅ **AI Prompt** - Now analyzes MULTIPLE influencers and creates diverse summaries
✅ **Loop Configuration** - Now sends emails to ALL subscribers (not just 1)
✅ **Subscribe Button** - Now points to `http://localhost:5678/webhook/newsletter-signup`
✅ **Unsubscribe Link** - Now points to `http://localhost:5678/webhook/unsubscribe`

### How to Import & Test:

1. **Delete old workflow** (if already imported):
   - Go to n8n: http://localhost:5678
   - Find "Instagram Fashion Insights - Influencer Products + Voice AI"
   - Click ⋮ → Delete

2. **Import updated workflow**:
   - Click "Add workflow" → "Import from File"
   - Select: `C:\Users\user\Desktop\n8n\workflows\fashion-insights-INFLUENCER-PRODUCTS.json`
   - Click "Import"

3. **Configure credentials** (if needed):
   - Google Sheets: Should already be connected
   - OpenAI: Add your API key if not configured
   - Mailjet SMTP: Should already be connected

4. **Execute the workflow**:
   - Click "Execute Workflow" button
   - **IMPORTANT**: If only the first node turns green, click on the "Start Weekly Newsletter" node and click "Test step"
   - Wait for all nodes to execute (about 30-60 seconds)

5. **Verify results**:
   - Check inbox for **2 emails** (ortalgr@gmail.com and ortallasry@gmail.com)
   - Open the email and check:
     - ✅ Diverse AI summary (mentioning multiple influencers)
     - ✅ Images displayed
     - ✅ Subscribe button works (goes to webhook)
     - ✅ Product links present

---

## Workflow 2: Newsletter Signup Webhook (READY ✅)

**File:** `workflows/newsletter-signup-webhook.json`

### Features:
✅ Validates email addresses
✅ Checks for duplicates
✅ Adds to Google Sheets automatically
✅ Returns JSON response with success/error
✅ CORS enabled for web forms

### How to Import & Test:

1. **Import workflow**:
   - Click "Add workflow" → "Import from File"
   - Select: `C:\Users\user\Desktop\n8n\workflows\newsletter-signup-webhook.json`
   - Click "Import"

2. **Activate the webhook**:
   - Open the workflow
   - Toggle the **"Active"** switch in the top-right to **ON**
   - The webhook is now listening at: `http://localhost:5678/webhook/newsletter-signup`

3. **Test with curl**:
   ```bash
   curl -X POST http://localhost:5678/webhook/newsletter-signup \
     -H "Content-Type: application/json" \
     -d '{"email": "newuser@example.com", "name": "New User"}'
   ```

4. **Expected response**:
   ```json
   {
     "success": true,
     "message": "Welcome! You're now subscribed to Fashion Insights! 🎉",
     "email": "newuser@example.com"
   }
   ```

5. **Verify in Google Sheets**:
   - Open your Subscribers sheet
   - Check if "newuser@example.com" was added
   - Should have columns: email, name, signup_date, source, status

---

## Test Checklist

### Main Newsletter Workflow:
- [ ] Imported updated workflow to n8n
- [ ] All credentials configured (Google Sheets, OpenAI, Mailjet)
- [ ] Workflow executed successfully (all nodes green)
- [ ] Received **2 emails** (both subscribers)
- [ ] AI summary mentions **multiple influencers** (not just one)
- [ ] Images display in email
- [ ] Subscribe button links to `http://localhost:5678/webhook/newsletter-signup`
- [ ] Newsletter looks good and professional

### Newsletter Signup Webhook:
- [ ] Imported workflow to n8n
- [ ] Workflow activated (toggle ON)
- [ ] Tested with curl command (success response)
- [ ] New subscriber added to Google Sheets
- [ ] Duplicate email rejection works (try same email twice)
- [ ] Invalid email rejection works (test with "invalid-email")

---

## Common Issues & Solutions

### Issue: Only 1 email sent (not 2)
**Solution:**
- Check "Loop Over Subscribers" node has `batchSize: 1`
- Check arrows are connected properly between nodes
- Execute workflow again

### Issue: No images in email
**Solution:**
- Instagram may be blocking image hotlinking
- Images work on some email clients but not others
- Consider adding image proxy later (not critical for now)

### Issue: Subscribe button doesn't work
**Solution:**
- Make sure Newsletter Signup Webhook workflow is **activated** (toggle ON)
- Check webhook URL is exactly: `http://localhost:5678/webhook/newsletter-signup`
- Try clicking from email and check browser console for errors

### Issue: AI summary still repeats one influencer
**Solution:**
- Re-import the workflow (the updated AI prompt should fix this)
- Check "Prepare AI Analysis" node has the improved prompt mentioning "MULTIPLE influencers"

### Issue: Webhook returns 404
**Solution:**
- Activate the Newsletter Signup Webhook workflow
- Check the webhook path in the node settings is "newsletter-signup"
- Restart n8n if needed: `docker restart n8n`

---

## Next Steps

After both workflows are working:

### 1. Create Unsubscribe Webhook
- Similar to signup webhook
- Updates Google Sheets status to "unsubscribed"
- Shows confirmation page

### 2. Create Lovable UI (Optional)
- Generate React components from Figma
- Embed newsletter signup form
- Deploy to Lovable

### 3. Schedule the Newsletter
- Change Manual Trigger to Schedule Trigger
- Set to run weekly (e.g., every Monday at 9 AM)
- Test scheduled execution

### 4. Production Deployment
- Get a public domain
- Update webhook URLs from localhost to public domain
- Deploy n8n to cloud (Railway, Digital Ocean, etc.)
- Update Mailjet sender domain

---

## Useful Commands

```bash
# Start n8n
docker run -it --rm --name n8n -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n

# Check n8n status
docker ps | grep n8n

# Restart n8n
docker restart n8n

# View n8n logs
docker logs n8n --tail 50

# Test newsletter signup
curl -X POST http://localhost:5678/webhook/newsletter-signup \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "name": "Test User"}'

# Test with PowerShell (Windows)
Invoke-WebRequest -Uri "http://localhost:5678/webhook/newsletter-signup" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"email":"test@example.com","name":"Test User"}'
```

---

## Support

If you encounter issues:
1. Check n8n logs: `docker logs n8n`
2. Check workflow execution history in n8n UI
3. Verify all credentials are properly configured
4. Ensure Docker container is running: `docker ps`

---

**Last Updated:** November 26, 2025
**Version:** 2.0 (n8n-native, all fixes applied)
