# 🚀 IMPORT THIS - Complete Merged Workflow

**File**: `workflows/FASHION-INSIGHTS-COMPLETE-MERGED.json`

This is THE ONE file you requested with **ALL features merged together**. No more importing multiple files or copying nodes manually!

---

## ✅ What's Included (Everything!)

### 1. 🤖 Security Agents
- **Workflow Controller Agent**: Checks budget ($15/month max), frequency (weekly), post limits (50 max)
- **Content Safety Filter Agent**: ZERO TOLERANCE blocking for Palestine, politics, profanity

### 2. 📸 Automated Instagram Scraping
- Bright Data integration (50 posts from 5 curated influencers)
- Runs every Monday 9 AM automatically
- Budget-controlled ($3.75/week for 50 posts)

### 3. 🧠 AI Fashion Analysis
- OpenAI GPT-4o-mini analysis
- Secured system prompts (prompt injection protection)
- Fashion trend identification, color palettes, product recommendations

### 4. 📧 Email Newsletter System
- Beautiful HTML email template (Lovable-designed)
- Google Sheets subscriber management
- Mailjet SMTP sending
- **Voice chatbot CTA button** (with click tracking!)
- Newsletter signup form in email

### 5. 🎨 Devi AI Influencer Content
- Instagram carousel scripts (7 slides) - **WITH "Link in bio to subscribe" CTA** ✅
- TikTok/Reels scripts (30-60s) - **WITH newsletter CTA** ✅
- Blog posts (HTML + Markdown) - **WITH subscribe link** ✅
- Authentic influencer tone (not pushy sales)

### 6. 📊 Complete Analytics Tracking
- Bitly link shortening for ALL links
- UTM parameter tracking
- Google Sheets analytics dashboard (2 tabs: Overview + Link Clicks)
- Tracks:
  - Every affiliate product click
  - Voice chatbot button clicks
  - Newsletter signup conversions
  - Email forwards

### 7. 💰 Affiliate Link Processing
- Amazon Associates integration
- Rakuten/LTK support
- Commission tracking

---

## 📊 Workflow Structure (33 Nodes Total)

```
Monday 9 AM Trigger
    ↓
🤖 Workflow Controller Agent (budget/frequency check)
    ↓
✅ Should Run? (IF node)
    ↓
📸 Bright Data Scrape (50 posts)
    ↓
Parse Bright Data Response
    ↓
🛡️ Content Safety Filter Agent (Palestine/politics/profanity blocking)
    ↓
Filter Posts & Extract Product Links
    ↓
Prepare AI Analysis
    ↓
AI Fashion Analysis (OpenAI with secured prompts)
    ↓
Extract AI Response
    ↓
Format Final Report
    ↓
┌─────────────────────┴─────────────────────┐
│                                           │
│  BRANCH 1: Email Newsletter               │  BRANCH 2: Devi + Analytics
│  ↓                                        │  ↓
│  Get Subscribers (Google Sheets)          │  Devi Master Content Generator
│  ↓                                        │  ↓
│  Filter Active Subscribers                │  ├─→ Devi Blog Post (with newsletter CTA!)
│  ↓                                        │  ├─→ Devi Instagram (with "Link in bio"!)
│  Loop Over Subscribers                    │  └─→ Devi TikTok (with newsletter CTA!)
│  ↓                                        │      ↓
│  Prepare Email (uses shortened links!)    │      Devi Affiliate Link Processor
│  ↓                                        │      ↓
│  Send Newsletter via Mailjet              │      📊 Prepare Links for Bitly + UTM
│  ↓                                        │      ↓
│  Loop Back                                │      📊 Bitly - Shorten Links
│                                           │      ↓
│                                           │      📊 Aggregate Shortened Links
│                                           │      ↓
│                                           │      📊 Prepare Analytics for Google Sheets
│                                           │      ↓
│                                           │      ├─→ 📊 Google Sheets - Log Overview
│                                           │      └─→ 📊 Google Sheets - Log Link Clicks
└───────────────────────────────────────────┘
```

**Email preparation waits for analytics** to use shortened links with tracking!

---

## 🎯 Quick Start (60 Minutes)

### STEP 1: Import Workflow (2 min)
1. Open n8n: `http://localhost:5678`
2. Go to: **Workflows** → **Import from File**
3. Select: `workflows/FASHION-INSIGHTS-COMPLETE-MERGED.json`
4. Click: **Import**
5. Click: **Save**

**Result**: You now have ONE complete workflow with 33 nodes ✅

---

### STEP 2: Add Credentials (20 min)

#### A. OpenAI (5 min)
1. Get API key: https://platform.openai.com/api-keys
2. Click: **"AI Fashion Analysis (OpenAI)"** node
3. Click: **Credentials** → **Create New**
4. Paste API key → **Test & Save**

#### B. Bright Data (3 min)
1. Get credentials: https://brightdata.com
2. Click: **"📸 Bright Data - Get Instagram Posts"** node
3. Update URL: Replace `YOUR_DATASET_ID_HERE`
4. Update Authorization header: Replace `YOUR_API_TOKEN_HERE`

#### C. Google Sheets (5 min)
1. Create spreadsheet: **"Newsletter Subscribers"**
2. Add columns: `email | name | status | subscribed_date`
3. Create spreadsheet: **"Fashion Newsletter Analytics"**
4. Add 2 tabs:
   - **Overview** (columns: week_number, issue_date, emails_sent, open_rate, total_clicks, voice_chat_clicks, affiliate_clicks, top_product, timestamp)
   - **Link Clicks** (columns: week_number, link_id, link_type, product_name, short_url, long_url, total_clicks, last_updated)
5. Click: **"Get Subscribers from Google Sheets"** node
6. Click: **Credentials** → **Create New** → **OAuth2**
7. Authorize Google account
8. Select: **"Newsletter Subscribers"** spreadsheet
9. Repeat for analytics nodes (select **"Fashion Newsletter Analytics"** spreadsheet)

#### D. Mailjet SMTP (4 min)
1. Sign up: https://app.mailjet.com/signup (FREE tier: 6,000 emails/month)
2. Get API keys: **Account** → **API Keys**
3. Click: **"Send Newsletter via Mailjet"** node
4. Click: **Credentials** → **Create New**
5. Enter:
   - Host: `in-v3.mailjet.com`
   - Port: `587`
   - User: [Mailjet API Key]
   - Password: [Mailjet Secret Key]
6. **Test & Save**

#### E. Bitly (3 min)
1. Sign up: https://bitly.com/ (FREE tier: 50 links/month)
2. Get token: **Settings** → **API** → **Generate Token**
3. Click: **"📊 Bitly - Shorten Links"** node
4. Update Authorization header: Replace `YOUR_BITLY_ACCESS_TOKEN_HERE`

**Result**: All 5 services connected ✅

---

### STEP 3: Update Configuration (10 min)

#### A. Update Newsletter URL
1. Find node: **"🤖 Workflow Controller Agent"**
2. Find line: `newsletter_url: 'https://your-project.lovable.app'`
3. Replace with: Your Lovable project URL (or keep localhost for testing: `http://localhost:5173`)

This URL is used for:
- Voice chatbot button in email
- Newsletter signup links
- All Bitly shortened links

#### B. Update Last Run Date (For Production)
1. Find node: **"🤖 Workflow Controller Agent"**
2. Find line: `const lastRunDate = new Date('2025-01-20');`
3. Replace with: Today's date (or keep as-is for testing)

**Result**: Configuration updated ✅

---

### STEP 4: Test Workflow (25 min)

#### A. Add Test Subscriber (2 min)
1. Open Google Sheet: **"Newsletter Subscribers"**
2. Add row:
   ```
   email: your@email.com
   name: Test User
   status: active
   subscribed_date: 2025-01-27
   ```

#### B. Run Workflow (3 min)
1. Click: **"🧪 Manual Test Trigger"** node
2. Click: **"Execute workflow"** (top right)
3. Wait 2-3 minutes
4. All nodes should turn green ✅

#### C. Check Your Email (5 min)
1. Open inbox
2. Look for: **"📸 Fashion Insights: [Trend]..."**
3. Verify:
   - Beautiful HTML design ✅
   - Fashion trends + colors ✅
   - Product images ✅
   - **"Try Voice Chat Now 🎤"** button ✅
   - Newsletter signup form ✅

#### D. Test Voice Chatbot Button (5 min)
1. Click: **"Try Voice Chat Now 🎤"** in email
2. Should open: Your Lovable landing page (or localhost)
3. Should see: Voice chatbot microphone button
4. Test it: Click mic → Ask **"What's trending?"**
5. Should see: Marketing-tone response + product cards ✅

#### E. Check Analytics (5 min)
1. Open Google Sheet: **"Fashion Newsletter Analytics"**
2. Check **Overview** tab → Should see logged data ✅
3. Check **Link Clicks** tab → Should see all tracked links ✅
4. Open Bitly dashboard → Should see shortened links ✅
5. Click a product link in email → Check Bitly shows +1 click ✅

#### F. Check Devi Content (5 min)
1. In n8n, click: **"Devi Instagram Script Generator"** node
2. View output → Should see:
   - 7 slide carousel script
   - Caption includes: **"💌 Want weekly fashion insights in your inbox? Link in bio to subscribe!"** ✅
3. Click: **"Devi TikTok Script Generator"** node
4. View output → Should see:
   - 30-60s video script
   - CTA includes: **"💌 Link in bio to get weekly fashion insights delivered to your inbox!"** ✅
5. Click: **"Devi Blog Post Generator"** node
6. View output → Should see:
   - HTML blog post
   - CTA section: **"💌 Get This in Your Inbox"** with subscribe link ✅

**Result**: Complete system working! 🎉

---

## 🎨 What You Get

### Email Newsletter
- **Sends to**: All active subscribers in Google Sheets
- **Frequency**: Every Monday 9 AM (automated)
- **Contains**:
  - This week's top fashion trend
  - Trending color palette (with color swatches)
  - Visual moodboard (6 Instagram images)
  - Product recommendations (with affiliate links)
  - Featured influencer posts
  - **Voice chatbot CTA button** (tracked with Bitly!)
  - Newsletter signup form (for forwards)

### Devi Social Media Content
- **Instagram carousel**: 7-slide script with design notes, **includes "Link in bio" newsletter CTA**
- **TikTok/Reels script**: 30-60s video with hook/body/CTA, **includes newsletter CTA**
- **Blog post**: Full HTML + Markdown, **includes newsletter subscribe section**
- **Voice context**: JSON file for Lovable voice chatbot

### Analytics Dashboard
- **Overview tab**: Weekly stats (emails sent, open rate, total clicks, voice chat clicks, affiliate clicks, top product)
- **Link Clicks tab**: Per-link tracking (short URL, long URL, click count)
- **Bitly dashboard**: Real-time click tracking for all links
- **Mailjet dashboard**: Email open/click rates

---

## 💡 Key Features

### ✅ Security First
- Workflow Controller checks budget/frequency before EVERY run
- Content Safety Filter blocks Palestine/politics/profanity
- OpenAI secured system prompts (prompt injection protection)

### ✅ Marketing-Focused Voice Chatbot
- Enthusiastic, sales-oriented tone
- Shows product cards with images
- Demonstrates products visually
- "Shop Now" buttons with affiliate links

### ✅ Devi Drives Newsletter Signups
- Instagram: "💌 Want weekly fashion insights in your inbox? Link in bio to subscribe!"
- TikTok: "💌 Link in bio to get weekly fashion insights delivered to your inbox!"
- Blog: Subscribe CTA section with newsletter link

### ✅ Complete Click Tracking
- Every link shortened with Bitly
- UTM parameters on all links
- Google Sheets logs all data
- Voice chatbot button clicks tracked
- Affiliate link clicks tracked
- Newsletter signup clicks tracked

### ✅ Budget-Controlled Automation
- Max $15/month total ($5/week for 50 posts)
- Frequency: Once per week minimum
- Post limit: 50 posts maximum
- Automatic checks before every run

---

## 🔧 Customization

### Update Influencer List
1. Find node: **"🤖 Workflow Controller Agent"**
2. Update: `curated_influencers: ['user1', 'user2', 'user3', 'user4', 'user5']`

### Update Budget Limits
1. Find node: **"🤖 Workflow Controller Agent"**
2. Update:
   - `max_posts_per_week: 50`
   - `max_cost_per_week: 5.00`
   - `cost_per_post: 0.075`

### Update Schedule
1. Click: **"📅 Every Monday 9 AM"** node
2. Change: Day of week, hour, minute

### Update Newsletter URL
1. Find node: **"🤖 Workflow Controller Agent"**
2. Update: `newsletter_url: 'https://your-project.lovable.app'`

---

## 🆘 Troubleshooting

### Workflow fails at "Should Run?"
→ Workflow Controller decided not to run (check budget/frequency)
→ Update `lastRunDate` in Workflow Controller Agent to force run

### No subscribers in email send
→ Add yourself to Google Sheets "Newsletter Subscribers" first

### Voice chatbot link doesn't work
→ Deploy Lovable site, update `newsletter_url` in Workflow Controller Agent

### Analytics show 0 clicks
→ Normal initially! Send test email, click links yourself

### Bitly fails to shorten links
→ Check Bitly token is correct in "📊 Bitly - Shorten Links" node
→ Free tier: 50 links/month limit

### Email doesn't arrive
→ Check spam folder
→ Verify Mailjet credentials
→ Check Mailjet dashboard for delivery status

### Devi content missing newsletter CTAs
→ Run workflow again - the CTAs are in the code
→ Check outputs of Devi generator nodes

---

## 📚 Next Steps

1. **TODAY**: Import workflow, add credentials, test workflow ✅
2. **THIS WEEK**: Deploy Lovable landing page, set up Instagram/TikTok @devine.me
3. **NEXT WEEK**: Add 10-20 real subscribers, run first production newsletter
4. **ONGOING**: Monitor analytics, optimize based on click data

---

## 🎉 That's It!

You now have THE COMPLETE system with:
- ✅ Security agents (budget + content filtering)
- ✅ Automated Instagram scraping (Bright Data)
- ✅ AI fashion analysis (OpenAI)
- ✅ Email newsletter (Mailjet)
- ✅ Voice chatbot CTA button (tracked!)
- ✅ Devi content generators (with newsletter CTAs!)
- ✅ Complete analytics tracking (Bitly + Google Sheets)
- ✅ Affiliate link processing (Amazon Associates)

**ONE file to import. ZERO manual node copying.**

---

**🚀 Start now: Import `workflows/FASHION-INSIGHTS-COMPLETE-MERGED.json` and follow the 60-minute Quick Start!**

*Everything you asked for is merged into this ONE workflow! 💜*
