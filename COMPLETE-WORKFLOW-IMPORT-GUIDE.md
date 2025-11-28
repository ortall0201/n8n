# 🚀 Complete Workflow Import Guide

**Your workflow is 90% ready!** Here's exactly what to import and configure.

---

## ✅ What Your Workflow Does

```
Monday 9 AM
    ↓
📊 Scrapes Instagram (Bright Data) - 50 posts
    ↓
🤖 AI Analysis (OpenAI) - Fashion trends
    ↓
✉️ Sends Email Newsletter to subscribers
    |  ↳ Includes Voice Chatbot CTA button
    ↓
📱 Generates Devi Social Media Content:
    • Instagram carousel script
    • TikTok/Reels script
    • Blog post
    • Affiliate products
```

**User Flow**:
1. User subscribes on Lovable landing page → Saved to Google Sheets
2. Monday workflow runs → Scrapes Instagram → Analyzes trends
3. Email sent with trends + "Try Voice Chat Now" button
4. User clicks button → Goes to Lovable site
5. User chats with marketing-tone voice chatbot
6. Devi posts on Instagram/TikTok → "Link in bio to subscribe!"

---

## 📂 Step 1: Import Workflow (2 min)

### File to Import:
`workflows/fashion-insights-INFLUENCER-PRODUCTS.json`

### How to Import:
1. Open n8n: `http://localhost:5678`
2. Click **Workflows** (left sidebar)
3. Click **Import from File** (top right)
4. Select: `fashion-insights-INFLUENCER-PRODUCTS.json`
5. Click **Import**

✅ **Done!** You now have a complete workflow with 15+ nodes.

---

## 🔑 Step 2: Add Credentials (10 min)

Your workflow needs 4 credentials:

### A. OpenAI API Key

**Node**: "AI Fashion Analysis (OpenAI)"

1. Click the node
2. Click **Credentials** dropdown
3. Click **+ Create New**
4. Enter API key: `sk-...`
5. Save

**Get API key**: https://platform.openai.com/api-keys

---

### B. Bright Data API

**Node**: "Bright Data - Get Instagram Posts"

1. Click the node
2. Find **URL** field: `https://api.brightdata.com/datasets/v3/snapshot/YOUR_DATASET_ID_HERE`
3. Replace `YOUR_DATASET_ID_HERE` with your actual dataset ID
4. Find **Authorization** header: `Bearer YOUR_API_TOKEN_HERE`
5. Replace `YOUR_API_TOKEN_HERE` with your actual token

**Get credentials**: https://brightdata.com → Datasets → Instagram

---

### C. Google Sheets (Subscribers)

**Node**: "Get Subscribers from Google Sheets"

1. Click the node
2. Click **Credentials** dropdown
3. Click **+ Create New Credential**
4. Click **OAuth2 Connect**
5. Authorize Google account
6. Select your spreadsheet
7. Sheet name: `Subscribers`

**Spreadsheet structure**:
```
Column A: email
Column B: name
Column C: status (active/subscribed)
Column D: subscribed_date
```

---

### D. Mailjet SMTP (Email Sending)

**Node**: "Send Newsletter via Mailjet"

1. Click the node
2. Click **Credentials** dropdown
3. Click **+ Create New**
4. Enter:
   - **Host**: `in-v3.mailjet.com`
   - **Port**: `587`
   - **User**: Your Mailjet API Key
   - **Password**: Your Mailjet Secret Key
5. Save

**Get credentials**: https://app.mailjet.com/account/api_keys

**Free tier**: 200 emails/day, 6,000/month

---

## 🎤 Step 3: Update Voice Chatbot Link (5 min)

Your email already has a voice chatbot CTA button! You just need to update the URL.

### Find the Node:
"Prepare Email with Products" (line 245)

### Find This Section in the Code:
```javascript
<!-- CTA Button -->
<a href="http://localhost:8080" style="...">
  Try Voice Chat Now 🎤
</a>
```

### Update the URL:

**Option A: Deploy Lovable First (Recommended)**
1. Deploy your `figma-connect-landing` to Lovable
2. Get URL: `https://your-project.lovable.app`
3. Replace in code:
```javascript
<a href="https://your-project.lovable.app" style="...">
  Try Voice Chat Now 🎤
</a>
```

**Option B: Use Localhost (Testing Only)**
1. Keep as: `http://localhost:5173`
2. Only works when testing locally
3. Replace with production URL before going live

### Also Update These URLs in Email:
1. **Newsletter form action** (line ~520):
```javascript
<form action="http://localhost:5678/webhook/newsletter-signup" method="POST">
```
Change to your n8n production URL when deployed.

2. **Unsubscribe link** (line ~580):
```javascript
<a href="http://localhost:5678/webhook/unsubscribe-confirm">Unsubscribe</a>
```
Change to your n8n production URL when deployed.

---

## 📱 Step 4: Add Newsletter CTA to Devi Posts (10 min)

Your Devi generators need to include "Link in bio" CTAs.

### Nodes to Update:
1. **Devi Instagram Script Generator** (line 323)
2. **Devi TikTok Script Generator** (line 337)
3. **Devi Blog Post Generator** (line 310)

### A. Instagram Script Generator

**Find this line** (~line 322):
```javascript
const igCaption = `${content.week_label.toUpperCase()} 💜\n\n${content.intro.split('\n\n')[1] || 'This week's fashion trends are 🔥'}\n\nSwipe to see:\n${content.trends.slice(0, 3).map((t, i) => `→ ${t}`).join('\n')}\n\nFull blog post + product links in bio!\n\n#fashiontrends #weeklyinspo #styleinspo #fashionblogger #ootd #fashionista #trendreport #devinevibes`;
```

**Replace with**:
```javascript
const igCaption = `${content.week_label.toUpperCase()} 💜\n\n${content.intro.split('\n\n')[1] || 'This week's fashion trends are 🔥'}\n\nSwipe to see:\n${content.trends.slice(0, 3).map((t, i) => `→ ${t}`).join('\n')}\n\n💌 Want weekly fashion insights in your inbox? Link in bio to subscribe!\n\nFull blog post + product links also in bio! ✨\n\n#fashiontrends #weeklyinspo #styleinspo #fashionblogger #ootd #fashionista #trendreport #devinevibes`;
```

**Change**: Added newsletter CTA before product links

---

### B. TikTok Script Generator

**Find this line** (~line 335):
```javascript
const cta = `Full trend report + all product links in my bio. Follow @devine.me for weekly fashion insights 💜`;
```

**Replace with**:
```javascript
const cta = `Link in bio to get weekly fashion insights delivered to your inbox! 💌 Plus product links + full trend report. Follow @devine.me for daily fashion inspo 💜`;
```

**Change**: Added newsletter CTA first, then products

---

### C. Blog Post Generator

**Find the CTA section** (~line 309):
```javascript
<section class=\"cta\">
  <h2>Get This in Your Inbox</h2>
  <p>Join ${Math.floor(Math.random() * 1000 + 500)} fashion lovers who get my weekly insights every Monday.</p>
  <a href=\"/\" class=\"btn-primary\">Subscribe Now</a>
</section>
```

**Replace href with your landing page URL**:
```javascript
<section class=\"cta\">
  <h2>Get This in Your Inbox</h2>
  <p>Join ${Math.floor(Math.random() * 1000 + 500)} fashion lovers who get my weekly insights every Monday.</p>
  <a href=\"https://your-project.lovable.app\" class=\"btn-primary\">Subscribe Now 💌</a>
</section>
```

**Change**: Updated link to actual landing page

---

## 🛡️ Step 5 (Optional): Add Security Agents (20 min)

Your workflow already has basic security in OpenAI prompts. To add agent-based control:

### Option A: Import Security Agents Separately

1. Import `workflows/fashion-insights-FULLY-SECURED.json`
2. Copy these nodes:
   - "Workflow Controller Agent"
   - "Content Safety Filter Agent"
3. Paste into your main workflow
4. Connect them between "Bright Data" and "Prepare AI Analysis"

### Option B: Skip for Now

- Current security is good enough for testing
- OpenAI prompt already blocks Palestine/politics/profanity
- Add agents later when you're ready for production

---

## 🧪 Step 6: Test Your Workflow (5 min)

### A. Manual Test:

1. Click **"Start Weekly Newsletter (Manual for Testing)"** node
2. Click **"Execute workflow"** (top right)
3. Watch nodes turn green (this will take 2-3 minutes)

### B. Check Outputs:

**Node: "Format Final Report"**
- Should show: trends, colors, styles, summary

**Node: "Prepare Email with Products"**
- Should show: HTML email with voice chatbot button

**Node: "Devi Instagram Script Generator"**
- Should show: Instagram carousel slides + caption with "Link in bio"

**Node: "Devi TikTok Script Generator"**
- Should show: TikTok script with newsletter CTA

### C. Expected Flow:
```
✅ Bright Data scrapes posts
✅ Parses Instagram data
✅ AI analyzes fashion trends
✅ Formats report
✅ Gets subscribers from Google Sheets
✅ Prepares email with voice chatbot CTA
✅ Sends emails
✅ Generates Devi social media content
```

---

## 📧 Step 7: Test Email Reception (5 min)

### Add yourself to Google Sheets:

**Spreadsheet**: Your subscribers sheet

**Add row**:
```
email: your@email.com
name: Test User
status: active
subscribed_date: 2025-01-27
```

### Run workflow again:

1. Click **Manual Trigger**
2. Execute
3. Check your inbox

### What you should receive:

**Subject**: `📸 Fashion Insights: [Top Trend]... 🎨`

**Email content**:
- Header with purple gradient
- Top trend section
- Trending colors
- Moodboard (6 images)
- Products section
- Featured influencer posts
- **"Try Voice Chat Now 🎤" button** ← CLICK THIS
- Newsletter signup form

### Click "Try Voice Chat Now":
- Should open your Lovable landing page
- Should see voice chatbot microphone button
- Click microphone → Test voice chat
- Try: "What's trending?" → Should see marketing-focused response + product cards

---

## 🎯 Step 8: Configure Instagram/TikTok (10 min)

Your Devi social media scripts are generated! Now set up the accounts.

### Instagram (@devine.me):

**Profile**:
- Name: Devi (Devine)
- Bio:
```
Devi 💜 Fashion Insider
✨ Weekly trend reports
🛍️ Style tips & picks
📧 Newsletter 👇
```
- **Link**: `https://your-project.lovable.app`

**Content Strategy**:
1. Workflow generates Instagram carousel script
2. Use script to create carousel in Canva/Figma
3. Post with generated caption
4. Users click "Link in bio" → Subscribe!

### TikTok (@devine.me):

**Profile**:
- Name: Devi
- Bio:
```
Devi 💜 AI Fashion Bestie
Weekly fashion trends 🔥
Newsletter 👇
```
- **Link**: `https://your-project.lovable.app`

**Content Strategy**:
1. Workflow generates TikTok script
2. Record video using script
3. Post with generated caption
4. Users click "Link in bio" → Subscribe!

---

## 📊 What Happens Each Week

### Monday 9 AM (Automatic):

```
1. Workflow starts (Schedule Trigger)
2. Scrapes 50 Instagram posts (Bright Data)
3. AI analyzes fashion trends (OpenAI)
4. Gets subscribers from Google Sheets
5. Sends email newsletter to all active subscribers
   ↳ Email includes "Try Voice Chat Now" button
6. Generates Devi content:
   • Instagram carousel script (7 slides)
   • TikTok/Reels script (30-60s)
   • Blog post (HTML + Markdown)
   • Affiliate product links
```

### After Workflow Runs:

1. **Check email**: Verify subscribers received newsletter
2. **Check Devi outputs**: Get Instagram/TikTok scripts
3. **Create social content**: Use scripts to make posts
4. **Post to social media**: Instagram + TikTok
5. **Monitor signups**: New subscribers → Google Sheets
6. **Track clicks**: Mailjet dashboard shows email opens/clicks

---

## 🔄 Complete User Journey

### Discovery:
1. User sees Devi's Instagram/TikTok post
2. Post says: "Link in bio to subscribe! 💌"
3. User clicks link in bio
4. Lands on your Lovable site

### Engagement:
5. User sees newsletter signup form
6. User tries voice chatbot (marketing tone)
7. Chatbot shows product recommendations
8. User subscribes to newsletter

### Retention:
9. Monday morning → User receives email
10. Email has trends + voice chatbot CTA
11. User clicks "Try Voice Chat Now"
12. Returns to Lovable site
13. Continues conversation with chatbot
14. Clicks affiliate product links → You earn commission!

### Growth:
15. User loves newsletter → Shares with friends
16. Friends see Devi on Instagram
17. Cycle repeats → More subscribers! 📈

---

## ✅ Final Checklist

### Workflow Setup:
- [ ] Imported `fashion-insights-INFLUENCER-PRODUCTS.json`
- [ ] Added OpenAI credential
- [ ] Added Bright Data dataset ID + token
- [ ] Added Google Sheets credential
- [ ] Added Mailjet SMTP credential

### URL Configuration:
- [ ] Deployed Lovable landing page
- [ ] Updated voice chatbot URL in email template
- [ ] Updated newsletter form action URL
- [ ] Updated unsubscribe link URL

### Devi Content Updates:
- [ ] Added newsletter CTA to Instagram script
- [ ] Added newsletter CTA to TikTok script
- [ ] Updated blog post subscription link

### Testing:
- [ ] Ran manual test trigger
- [ ] Verified all nodes executed successfully
- [ ] Received test email
- [ ] Clicked voice chatbot button → Works
- [ ] Voice chatbot has marketing tone → Works
- [ ] Product cards display in chat → Works

### Social Media:
- [ ] Set up Instagram @devine.me profile
- [ ] Set up TikTok @devine.me profile
- [ ] Added landing page URL to bios
- [ ] Ready to post Devi-generated content

### Production:
- [ ] Schedule activated (Monday 9 AM)
- [ ] Added real subscribers to Google Sheets
- [ ] Tested complete user journey
- [ ] Monitoring analytics (Mailjet, Google Sheets)

---

## 🆘 Troubleshooting

### "Workflow fails at Bright Data node"
**Fix**:
- Check dataset ID is correct
- Check Authorization header: `Bearer [TOKEN]`
- Check Bright Data account has credits

### "No subscribers in email send"
**Fix**:
- Check Google Sheets has subscribers
- Check status column is "active" or "subscribed"
- Test with your own email first

### "Email doesn't arrive"
**Fix**:
- Check Mailjet credentials are correct
- Check Mailjet account is verified
- Check spam folder
- Verify email address is correct

### "Voice chatbot link doesn't work"
**Fix**:
- Check Lovable site is deployed and live
- Check URL in email template is correct
- Test URL by pasting directly in browser

### "Devi content doesn't include newsletter CTA"
**Fix**:
- Verify you updated the code nodes
- Check caption/script output after running
- Re-run workflow after updating

---

## 🎉 You're Ready!

**What you have now**:
✅ Complete automated fashion newsletter system
✅ Instagram scraping + AI analysis
✅ Email newsletter with voice chatbot CTA
✅ Voice chatbot with marketing tone + product demos
✅ Devi social media content generation
✅ Affiliate product integration
✅ Complete subscriber journey

**Next steps**:
1. Import the workflow (**TODAY**)
2. Add credentials (**TODAY**)
3. Test it (**TODAY**)
4. Set up social media accounts (**THIS WEEK**)
5. Go live! (**NEXT WEEK**)

---

*Everything is ready! Import and test RIGHT NOW! 🚀*
