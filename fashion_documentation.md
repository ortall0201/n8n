# Fashion Insights - Project Documentation & Current State

**Last Updated:** November 26, 2025
**Status:** Debugging email delivery in main newsletter workflow

---

## Project Overview

**Fashion Insights** is a 100% n8n-native AI-powered fashion newsletter automation system that:
- Scrapes Instagram posts from fashion influencers
- Analyzes trends using OpenAI GPT-4o-mini
- Extracts product links and coupon codes
- Generates and sends weekly HTML newsletters via Mailjet
- Manages subscribers via Google Sheets
- Uses Figma MCP for UI design synchronization

**Core Principle:** ALL automation happens in n8n (localhost:5678 for testing). No Make.com, Zapier, or external platforms.

---

## Architecture Completed

### ✅ What's Been Built

1. **MCP Configuration** (`mcp.config.json`)
   - Figma MCP for UI generation (ONLY)
   - Removed all Make.com references
   - Configured environment variables

2. **Main Newsletter Workflow** (`workflows/fashion-insights-INFLUENCER-PRODUCTS.json`)
   - Manual trigger for local testing
   - Instagram scraping via Bright Data/Apify HTTP Request
   - Product link & coupon code extraction
   - OpenAI AI analysis integration
   - Google Sheets subscriber management
   - Loop over subscribers with Split In Batches
   - HTML email generation with products & trends
   - Mailjet SMTP email delivery

3. **Google Sheets OAuth2 Setup**
   - Created OAuth consent screen
   - Added test users (ortalgr@gmail.com, ortallasry@gmail.com)
   - Configured OAuth2 credentials in n8n
   - Successfully retrieved 2 subscribers from sheet

4. **Documentation Created**
   - `N8N-NATIVE-SUMMARY.md` - Architecture overview
   - `workflows/N8N-LOCAL-TESTING-GUIDE.md` - Local testing guide
   - Updated `.env.example` - Removed Make.com variables
   - Updated `package.json` - Added n8n testing scripts

---

## Current Workflow State

### Workflow: Instagram Fashion Insights - Influencer Products + Voice AI

**Nodes (in execution order):**

1. ✅ **Start Weekly Newsletter (Manual for Testing)** - Manual Trigger
2. ✅ **Bright Data - Get Instagram Posts** - HTTP Request (26 posts scraped)
3. ✅ **Parse Bright Data Response** - Code node
4. ✅ **Filter Posts & Extract Product Links** - Code node
5. ✅ **Prepare AI Analysis** - Code node
6. ✅ **AI Fashion Analysis (OpenAI)** - OpenAI node (GPT-4o-mini)
7. ✅ **Extract AI Response** - Set node
8. ✅ **Format Final Report** - Code node (trends generated)
9. ✅ **Get Subscribers from Google Sheets** - Google Sheets node (2 subscribers retrieved)
10. ❓ **Filter Active Subscribers** - Code node (NEEDS CHECKING)
11. ❓ **Loop Over Subscribers** - Split In Batches node (NEEDS CHECKING)
12. ❓ **Prepare Email with Products** - Code node (NEEDS CHECKING)
13. ❌ **Send Newsletter via Mailjet** - Email Send node (NOT EXECUTING)
14. ❓ **Loop Back** - Split In Batches node

**Checkmarks Status:**
- ✅ = Green checkmark (executed successfully)
- ❓ = Unknown/needs verification
- ❌ = Gray (not executing) or Red (error)

---

## Current Problem: Emails Not Sending

### Symptoms
- Workflow execution shows as "successful"
- Instagram scraping works: 26 posts analyzed
- AI analysis works: Trends generated (Minimal glowy makeup, nostalgic fashion, etc.)
- Google Sheets works: 2 subscribers retrieved (ortalgr@gmail.com, ortallasry@gmail.com)
- BUT: **Emails are NOT being sent**
- User reports: "not all nodes showing green checkmarks"

### Root Cause Hypothesis
The workflow is stopping early before reaching the email sending node. Likely causes:

1. **Filter Active Subscribers node** is filtering out ALL subscribers
   - Code checks: `status === 'active' || status === 'subscribed'`
   - Google Sheets `status` column might be blank, "yes", or something else
   - If filter returns 0 items, the loop never executes

2. **Loop Over Subscribers node** is not iterating correctly
   - If previous node returns 0 items, loop doesn't run
   - If loop configuration is wrong, it won't execute child nodes

3. **Prepare Email with Products node** might have code errors
   - Uses: `const subscriber = $json;`
   - Expects: `subscriber.email` and `subscriber.name`
   - If Google Sheets columns don't match, this fails

4. **Send Newsletter via Mailjet node** configuration issues
   - Sender email was placeholder: `YOUR_VERIFIED_EMAIL@example.com`
   - **FIXED:** Now set to `ortalgr@gmail.com`
   - Mailjet SMTP credentials may not be configured
   - `toEmail` field set to `={{ $json.to }}` (depends on previous node output)

---

## Debugging Steps Completed

### ✅ Fixed Issues

1. **Schedule Trigger Error** ("days.join is not a function")
   - Reverted to Manual Trigger for local testing

2. **Google OAuth 403 Error** ("blocked app")
   - Added ortalgr@gmail.com to OAuth consent screen test users
   - Fixed: User can now sign in

3. **Google Sheets "Unable to sign without access token"**
   - Assigned OAuth2 credential to Google Sheets node
   - Fixed: Successfully retrieving subscribers

4. **Google Sheets "No output data"**
   - Removed "Return only First Matching Row" option
   - Configured: Operation = Get Many, Return All Results
   - Fixed: Now returns 2 subscribers

5. **Email Sender Address**
   - Changed from `YOUR_VERIFIED_EMAIL@example.com` to `ortalgr@gmail.com`
   - Fixed: Matches verified Mailjet sender email

6. **Docker Container Crash**
   - Restarted n8n container: `docker restart n8n`
   - Status: Container running, n8n accessible at localhost:5678

### ❌ Current Blocker

**Workflow stops before sending emails** - Not all nodes showing green checkmarks after execution.

---

## Next Debugging Steps (PRIORITY ORDER)

### Step 1: Identify Last Executing Node
**Action:** In n8n UI, after executing workflow, check which node is the last one with a green checkmark.

**Questions to answer:**
- Is "Filter Active Subscribers" green? If yes, how many items does it show?
- Is "Loop Over Subscribers" green?
- Is "Prepare Email with Products" green or gray?
- Is "Send Newsletter via Mailjet" green or gray?

**If "Filter Active Subscribers" shows 0 items:**
- The filter is removing all subscribers
- Need to check Google Sheets `status` column values
- Quick fix: Bypass filter entirely (connect directly to loop)

---

### Step 2: Check Google Sheets Column Names
**Action:** Verify exact column names in Google Sheets

**Required columns:**
- `email` (lowercase, exact spelling)
- `name` (lowercase, exact spelling)
- `status` (lowercase, exact spelling)

**Expected values in `status` column:**
- "active" or "subscribed" (lowercase)

**If columns don't match:**
- Either rename columns in Google Sheets
- OR update code in "Filter Active Subscribers" and "Prepare Email with Products" nodes

---

### Step 3: Bypass Filter for Testing
**Action:** Temporarily remove the filter to test email sending directly

**How to do it:**
1. In n8n workflow canvas
2. Delete connection: "Get Subscribers from Google Sheets" → "Filter Active Subscribers"
3. Create new connection: "Get Subscribers from Google Sheets" → "Loop Over Subscribers"
4. Execute workflow
5. Check if emails are sent

**If emails send successfully:**
- Problem confirmed: Filter was blocking all subscribers
- Fix the filter logic or Google Sheets status values

---

### Step 4: Hardcode Email for Testing
**Action:** Bypass subscriber data entirely and hardcode email address

**Edit "Prepare Email with Products" node code:**

Find the return statement at the end:
```javascript
return [{
  json: {
    to: subscriber.email,
    name: subscriberName,
    subject: `📸 Fashion Insights: ${insights.top_trends[0]} + Influencer Picks! 🛍️`,
    html: emailHTML
  }
}];
```

Replace with:
```javascript
return [{
  json: {
    to: "ortalgr@gmail.com",
    name: "Ortal",
    subject: `📸 Fashion Insights: ${insights.top_trends[0]} + Influencer Picks! 🛍️`,
    html: emailHTML
  }
}];
```

**If this works:**
- Problem confirmed: Subscriber data structure doesn't match expected format
- Check Google Sheets column names

---

### Step 5: Verify Mailjet SMTP Credentials
**Action:** Ensure Mailjet credentials are properly configured in n8n

**Check in "Send Newsletter via Mailjet" node:**
- **Credential to connect with:** Should show "Mailjet SMTP" (green checkmark)
- If no credential: Create new SMTP credential
  - Host: `in-v3.mailjet.com`
  - Port: `587`
  - Security: `TLS`
  - User: Mailjet API Key
  - Password: Mailjet API Secret

**From Email must be verified in Mailjet:**
- Current value: `ortalgr@gmail.com`
- Must be verified sender in Mailjet account

---

### Step 6: Check Loop Configuration
**Action:** Verify "Loop Over Subscribers" node settings

**Expected configuration:**
- **Batch Size:** 1 (send one email at a time for testing)
- **Options:** None required

**Check output:**
- After execution, click on node
- Should show: "1 item" per iteration
- If shows "0 items" - loop never executed (previous node returned nothing)

---

## What's Left to Complete (After Email Fix)

### Part 1: Lovable UI Generation & Deployment
**Status:** PENDING

**Tasks:**
1. Run Figma MCP sync: `npm run figma:sync`
2. Generate React/TypeScript components in `lovable-ui/pages/`
3. Deploy to Lovable platform
4. Configure public URLs

**Files needed:**
- Figma designs (already configured in `mcp.config.json`)
- Lovable project ID and API key (in `.env`)

---

### Part 2: Newsletter Signup Webhook
**Status:** PENDING

**Tasks:**
1. Import `workflows/newsletter-signup-webhook.json` into n8n
2. Configure webhook endpoint: `POST /webhook/newsletter-signup`
3. Test locally:
   ```bash
   curl -X POST http://localhost:5678/webhook/newsletter-signup \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "name": "Test User"}'
   ```
4. Verify subscriber added to Google Sheets
5. Update Lovable UI to point to webhook URL

---

### Part 3: Voice AI Integration (Optional)
**Status:** PENDING

**Tasks:**
1. Import `workflows/fashion-voice-ai.json` into n8n
2. Configure ElevenLabs API credentials
3. Test voice script generation
4. Add to newsletter workflow (optional)

---

### Part 4: Latest Issue API
**Status:** PENDING

**Tasks:**
1. Import `workflows/latest-issue-api.json` into n8n
2. Configure webhook endpoint: `GET /webhook/latest-issue`
3. Test locally:
   ```bash
   curl http://localhost:5678/webhook/latest-issue
   ```
4. Integrate with Lovable UI

---

### Part 5: End-to-End Testing
**Status:** PENDING

**Complete flow test:**
1. User visits Lovable UI
2. Signs up for newsletter (webhook saves to Google Sheets)
3. n8n weekly workflow runs (Schedule Trigger)
4. Scrapes Instagram, analyzes with AI
5. Sends newsletter to all active subscribers
6. User can view latest issue via API
7. User can unsubscribe

---

## Quick Reference Commands

### n8n Docker
```bash
# Start n8n
docker run -it --rm --name n8n -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n

# Check status
docker ps | grep n8n

# Restart
docker restart n8n

# View logs
docker logs n8n --tail 50
```

### Testing Webhooks
```bash
# Test newsletter signup
curl -X POST http://localhost:5678/webhook/newsletter-signup \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "name": "Test User"}'

# Test latest issue API
curl http://localhost:5678/webhook/latest-issue
```

### Figma MCP
```bash
# Sync all designs
npm run figma:sync

# Sync specific page
npm run figma:sync:landing

# Dry run (preview changes)
npm run figma:sync:dry-run
```

---

## Environment Variables Required

```bash
# n8n (already running on Docker)
N8N_HOST=localhost
N8N_PORT=5678
N8N_PROTOCOL=http
WEBHOOK_URL=http://localhost:5678/

# Figma (UI Generation)
FIGMA_PERSONAL_ACCESS_TOKEN=<token>
FIGMA_FILE_KEY=<file-key>

# Google Sheets (Subscribers)
GOOGLE_SHEETS_SUBSCRIBERS_ID=<sheet-id>
GOOGLE_CLIENT_ID=<client-id>
GOOGLE_CLIENT_SECRET=<client-secret>

# Mailjet (Email Delivery)
MAILJET_API_KEY=<api-key>
MAILJET_API_SECRET=<api-secret>
MAILJET_SENDER_EMAIL=ortalgr@gmail.com

# Instagram Scraping
BRIGHT_DATA_API_KEY=<api-key>
# OR
APIFY_API_TOKEN=<token>

# OpenAI (AI Analysis)
OPENAI_API_KEY=<api-key>

# ElevenLabs (Voice AI - Optional)
ELEVENLABS_API_KEY=<api-key>

# Lovable (Frontend)
LOVABLE_PROJECT_ID=<project-id>
PUBLIC_WEBSITE_URL=<website-url>
```

---

## Critical Files

| File | Purpose | Status |
|------|---------|--------|
| `workflows/fashion-insights-INFLUENCER-PRODUCTS.json` | Main newsletter workflow | ✅ Created, ❌ Emails not sending |
| `workflows/newsletter-signup-webhook.json` | Signup webhook | ⏳ Not imported yet |
| `workflows/fashion-voice-ai.json` | Voice AI generation | ⏳ Not imported yet |
| `workflows/latest-issue-api.json` | Latest issue API | ⏳ Not imported yet |
| `mcp.config.json` | Figma MCP config | ✅ Configured |
| `.env.example` | Environment variables template | ✅ Updated |
| `N8N-NATIVE-SUMMARY.md` | Architecture overview | ✅ Complete |
| `workflows/N8N-LOCAL-TESTING-GUIDE.md` | Testing guide | ✅ Complete |
| `fashion_documentation.md` | This file | ✅ Current state snapshot |

---

## Prompt for Claude Code (Resume Work)

```
You are working on the Fashion Insights project - a 100% n8n-native fashion newsletter automation system.

CURRENT BLOCKER: The main newsletter workflow executes but emails are NOT being sent. Not all nodes are showing green checkmarks after execution.

CONTEXT:
- Workflow successfully scrapes 26 Instagram posts
- AI analysis completes (trends generated)
- Google Sheets returns 2 subscribers (ortalgr@gmail.com, ortallasry@gmail.com)
- BUT emails never arrive in inbox
- User reports: "not all nodes showing green V"

LIKELY CAUSE:
The "Filter Active Subscribers" node is filtering out ALL subscribers, causing the loop to never execute, so the email sending node never runs.

NEXT STEP:
Ask the user which node is the LAST one showing a green checkmark after execution. This will tell us exactly where the workflow stops.

Then debug according to the priority steps in fashion_documentation.md:
1. Check if "Filter Active Subscribers" returns 0 items
2. Verify Google Sheets column names and status values
3. Bypass filter for testing (connect directly to loop)
4. Hardcode email address for testing
5. Verify Mailjet SMTP credentials

FILES TO CHECK:
- workflows/fashion-insights-INFLUENCER-PRODUCTS.json (lines 149-158 for filter node)
- workflows/fashion-insights-INFLUENCER-PRODUCTS.json (lines 170-178 for email prep node)
- workflows/fashion-insights-INFLUENCER-PRODUCTS.json (lines 179-199 for Mailjet node)

The user is testing locally at http://localhost:5678.
```

---

**End of Documentation**

*This document should be updated as we progress through debugging and implementation.*
