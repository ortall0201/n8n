# N8N Local Testing Guide for Fashion Insights

Complete guide for running Fashion Insights automation 100% locally using n8n.

---

## 🎯 Architecture Overview

**Fashion Insights** uses **100% n8n-native automation**:

```
┌──────────────────────────────────────────────────┐
│         Fashion Insights - n8n Architecture      │
├──────────────────────────────────────────────────┤
│                                                  │
│  Figma MCP ──► Lovable UI ──► n8n (localhost)  │
│  (Design)       (Frontend)     (ALL Automation) │
│                                                  │
│  n8n Handles Everything:                        │
│  • Instagram scraping (Bright Data/Apify)       │
│  • AI analysis (OpenAI)                         │
│  • Newsletter generation                        │
│  • Email delivery (Mailjet)                     │
│  • Subscriber management (Google Sheets)        │
│  • Voice AI (ElevenLabs)                        │
│  • Webhooks (local + production)                │
│  • Scheduling (cron triggers)                   │
│  • Event-driven automation                      │
│                                                  │
└──────────────────────────────────────────────────┘
```

**No Make.com. No Zapier. No external automation tools. Just n8n.**

---

## ⚙️ Local Setup

### 1. Start n8n Locally

```bash
# Option 1: Docker (Recommended)
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n

# Option 2: NPM
npx n8n

# Option 3: Global Install
npm install -g n8n
n8n start
```

**Access:** http://localhost:5678

### 2. Configure Environment Variables

Create `.env` file:

```bash
# n8n Local Testing
N8N_HOST=localhost
N8N_PORT=5678
N8N_PROTOCOL=http
WEBHOOK_URL=http://localhost:5678/

# Figma
FIGMA_PERSONAL_ACCESS_TOKEN=your-figma-token
FIGMA_FILE_KEY=your-figma-file-key

# Instagram Scraping
BRIGHT_DATA_API_KEY=your-key
# OR
APIFY_API_TOKEN=your-token

# OpenAI
OPENAI_API_KEY=your-openai-key

# Google Sheets
GOOGLE_SHEETS_SUBSCRIBERS_ID=your-sheet-id
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Mailjet
MAILJET_API_KEY=your-api-key
MAILJET_API_SECRET=your-api-secret
MAILJET_SENDER_EMAIL=your-email@example.com

# ElevenLabs (Optional)
ELEVENLABS_API_KEY=your-key
```

### 3. Import Workflows

```bash
# Import existing workflow JSON files
# n8n UI → Import from File
# Or drag-and-drop JSON files into n8n editor
```

---

## 📋 N8N Workflows

### Workflow 1: Newsletter Generation (Main)

**File:** `fashion-insights-newsletter.json`

**Trigger:** Manual / Schedule (Weekly, Saturday 9AM)

**Flow:**
```
Schedule Trigger
  ↓
HTTP Request (Bright Data/Apify) → Scrape Instagram posts
  ↓
Code → Extract product links & coupon codes
  ↓
HTTP Request (OpenAI) → AI trend analysis
  ↓
Google Sheets → Get subscribers
  ↓
Split In Batches (100)
  ↓
Loop:
  ├→ Code → Prepare email HTML
  ├→ Mailjet → Send newsletter
  └→ (Next batch)
  ↓
Google Sheets → Save insights
  ↓
Webhook (Optional) → Notify completion
```

**Local Webhook URLs:**
- Newsletter signup: `http://localhost:5678/webhook/newsletter-signup`
- Latest issue: `http://localhost:5678/webhook/latest-issue`

---

### Workflow 2: Newsletter Signup

**File:** `newsletter-signup-webhook.json`

**Trigger:** Webhook (POST /webhook/newsletter-signup)

**Flow:**
```
Webhook Trigger
  ↓
Code → Validate email
  ↓
IF → Email valid?
  ├→ TRUE:
  │   ├→ Google Sheets → Check for duplicates
  │   ├→ IF → Already exists?
  │   │   ├→ FALSE → Google Sheets → Append subscriber
  │   │   └→ TRUE → Skip
  │   └→ Respond (200) → {"success": true}
  └→ FALSE:
      └→ Respond (400) → {"error": "Invalid email"}
```

**Test Locally:**
```bash
curl -X POST http://localhost:5678/webhook/newsletter-signup \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "name": "Test User"}'
```

---

### Workflow 3: Voice AI Generator

**File:** `fashion-voice-ai.json`

**Trigger:** Manual / Webhook

**Flow:**
```
Manual Trigger / Webhook
  ↓
Google Sheets → Get latest insights
  ↓
Code → Create voice script
  ↓
HTTP Request (ElevenLabs) → Generate voice
  ↓
Code → Save MP3 (base64 to file)
  ↓
Respond → Return audio URL
```

---

### Workflow 4: Latest Issue API

**File:** `latest-issue-api.json`

**Trigger:** Webhook (GET /webhook/latest-issue)

**Flow:**
```
Webhook Trigger
  ↓
Google Sheets → Get latest insights row
  ↓
Code → Format as JSON
  ↓
Respond → Return JSON
```

**Test Locally:**
```bash
curl http://localhost:5678/webhook/latest-issue
```

---

## 🔧 N8N Node Configuration

### HTTP Request Node (Instagram Scraping)

**Bright Data Example:**
```json
{
  "method": "POST",
  "url": "https://api.brightdata.com/datasets/v3/trigger",
  "authentication": "predefinedCredentialType",
  "nodeCredentialType": "brightDataApi",
  "jsonParameters": true,
  "bodyParametersJson": {
    "dataset_id": "gd_instagram_posts",
    "discover_by": "user",
    "user": ["@fashionista", "@styleguide"]
  }
}
```

**Apify Example:**
```json
{
  "method": "POST",
  "url": "https://api.apify.com/v2/acts/apify~instagram-scraper/runs",
  "authentication": "predefinedCredentialType",
  "nodeCredentialType": "apifyApi",
  "jsonParameters": true,
  "bodyParametersJson": {
    "usernames": ["fashionista", "styleguide"],
    "resultsLimit": 50
  }
}
```

### Code Node (Product Link Extraction)

```javascript
const posts = $input.all();
const results = [];

for (const post of posts) {
  const caption = post.json.caption || '';

  // Extract product links
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = caption.match(urlRegex) || [];

  const shoppingDomains = [
    'shopmy.us',
    'liketoknow.it',
    'ltk.app',
    'amazon.com',
    'zara.com',
    'hm.com',
    'shop.app'
  ];

  const productLinks = urls.filter(url =>
    shoppingDomains.some(domain => url.toLowerCase().includes(domain))
  );

  // Extract coupon codes
  const codeRegex = /(?:use code|קוד)\s+([A-Z0-9]{4,20})/gi;
  const codes = [...caption.matchAll(codeRegex)].map(m => m[1]);

  results.push({
    json: {
      handle: post.json.username,
      post_url: post.json.url,
      product_links: productLinks,
      coupon_codes: codes,
      timestamp: new Date().toISOString()
    }
  });
}

return results;
```

### Google Sheets Node (Get Subscribers)

```json
{
  "operation": "read",
  "sheetName": "Subscribers",
  "range": "A2:C",
  "keyRow": 1
}
```

### Mailjet Node (Send Email)

```json
{
  "resource": "send",
  "operation": "send",
  "fromEmail": "={{$env.MAILJET_SENDER_EMAIL}}",
  "fromName": "Fashion Insights",
  "toEmail": "={{$json.email}}",
  "subject": "Fashion Insights: This Week's Trends",
  "htmlBody": "={{$json.html_content}}",
  "sendToAll": false
}
```

---

## 🧪 Local Testing Scenarios

### Scenario 1: Test Newsletter Signup

```bash
# 1. Start n8n locally
docker run -it --rm --name n8n -p 5678:5678 docker.n8n.io/n8nio/n8n

# 2. Import newsletter-signup-webhook.json
# 3. Activate workflow
# 4. Test webhook:

curl -X POST http://localhost:5678/webhook/newsletter-signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "source": "website"
  }'

# Expected response:
# {"success": true, "message": "Subscribed successfully"}
```

### Scenario 2: Test Newsletter Generation

```bash
# 1. Configure credentials in n8n:
#    - Bright Data API / Apify
#    - OpenAI
#    - Google Sheets OAuth2
#    - Mailjet SMTP

# 2. Import fashion-insights-newsletter.json
# 3. Click "Execute Workflow" (manual trigger)
# 4. Monitor execution in n8n UI
# 5. Check Google Sheets for saved insights
# 6. Check inbox for newsletter
```

### Scenario 3: Test Latest Issue API

```bash
# 1. Import latest-issue-api.json
# 2. Activate workflow
# 3. Test:

curl http://localhost:5678/webhook/latest-issue

# Expected response:
# {
#   "date": "2025-11-26",
#   "summary": "Oversized blazers and neon colors dominate...",
#   "top_trends": ["Oversized blazers", "Neon colors", "Vintage denim"],
#   "products": [...],
#   "sentiment": "positive"
# }
```

---

## 🔍 Debugging Local Workflows

### 1. Check n8n Logs

```bash
# Docker
docker logs n8n

# Or in n8n UI:
# Executions → Click execution → View logs
```

### 2. Test Nodes Individually

- Click "Execute Node" to test single nodes
- Check output in right panel
- Verify data transformations step-by-step

### 3. Use Webhook Test

n8n provides a test URL for webhooks:
- Production: `http://localhost:5678/webhook/your-path`
- Test: `http://localhost:5678/webhook-test/your-path`

### 4. Enable Debug Logging

```bash
# Set environment variable
N8N_LOG_LEVEL=debug

# Docker
docker run -it --rm --name n8n -p 5678:5678 \
  -e N8N_LOG_LEVEL=debug \
  docker.n8n.io/n8nio/n8n
```

---

## 📊 Performance Tips for Local Testing

1. **Use Small Data Sets**
   - Limit Instagram scraping to 10-20 posts for testing
   - Test with 5-10 subscribers instead of full list

2. **Split In Batches**
   - Always use Split In Batches node for loops
   - Batch size: 10-50 items for local testing

3. **Cache API Responses**
   - Save scraping results to Google Sheets
   - Reuse cached data for multiple test runs

4. **Mock External APIs**
   - Use Code node to return mock data during development
   - Switch to real APIs when ready

---

## 🚀 Moving from Local → Production

### 1. Update Environment Variables

```bash
# Change from local to production URLs
WEBHOOK_URL=https://your-domain.com/
N8N_PROTOCOL=https
N8N_HOST=your-domain.com
```

### 2. Update Webhook URLs in UI

- Find all webhook nodes in workflows
- Update from `localhost:5678` to production URL
- Update in Lovable UI components

### 3. Enable Scheduling

- Activate schedule triggers
- Set appropriate cron expressions
- Monitor execution history

---

## ✅ Complete Local Testing Checklist

- [ ] n8n running at localhost:5678
- [ ] All credentials configured (Google, Mailjet, OpenAI, etc.)
- [ ] Newsletter signup webhook responds correctly
- [ ] Latest issue API returns JSON
- [ ] Newsletter generation workflow completes
- [ ] Emails send successfully (check inbox)
- [ ] Google Sheets updates correctly
- [ ] Voice AI generates audio (if enabled)
- [ ] Error handling works (test invalid inputs)
- [ ] All workflows show green checkmarks in n8n UI

---

## 📚 Additional Resources

- **n8n Docs**: https://docs.n8n.io
- **n8n Community**: https://community.n8n.io
- **Fashion Insights Workflows**: `workflows/` directory
- **Brain Unified Guide**: `brain/brain-unified.md`

---

**Fashion Insights** is now **100% n8n-native** ✅

All automation runs in n8n. No external platforms needed.
Test everything locally at localhost:5678 before deploying.

---

*Last updated: November 26, 2025*
