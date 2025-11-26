# Fashion Newsletter with Influencer Products + Voice AI - Complete Setup

> Extract real product links from influencer posts, manage subscribers via Google Sheets, add newsletter signup, and create AI voice summaries!

---

## 🎯 What This System Does

### Core Features
- ✅ **Scrapes Instagram** fashion posts from influencers
- ✅ **Extracts product links** from captions (Shop My, LTK, Amazon, etc.)
- ✅ **Detects coupon codes** automatically
- ✅ **AI analyzes** fashion trends with OpenAI
- ✅ **Newsletter with influencer products** - Real links from actual influencers
- ✅ **Google Sheets subscribers** - Auto-saves signups
- ✅ **Newsletter signup form** - Beautiful HTML form
- ✅ **Voice AI summary** - Create podcast-style audio (BONUS!)
- ✅ **Weekly automation** via Mailjet

---

## 📊 System Architecture

```
┌──────────────────────────────────────────────┐
│ 1. NEWSLETTER SIGNUP (New Subscribers)       │
│    HTML Form → n8n Webhook → Google Sheets   │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│ 2. WEEKLY NEWSLETTER GENERATION              │
│    Instagram → Extract Products → AI Analysis│
│    → Load Subscribers → Send Emails          │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│ 3. VOICE AI (BONUS)                          │
│    Latest Insights → Create Script           │
│    → ElevenLabs TTS → MP3 Audio File         │
└──────────────────────────────────────────────┘
```

---

## 📁 Files Created

| File | Purpose |
|------|---------|
| `fashion-insights-INFLUENCER-PRODUCTS.json` | Main newsletter workflow ⭐ |
| `newsletter-signup-webhook.json` | Signup form webhook |
| `newsletter-signup-form.html` | Beautiful signup page |
| `fashion-voice-ai-generator.json` | Voice AI generator (bonus) |
| `INFLUENCER-PRODUCTS-COMPLETE-SETUP.md` | This guide |

---

## 🚀 Quick Start (60 Minutes)

### Phase 1: Google Sheets Setup (10 min)

#### 1.1 Create Your Google Sheet

1. **Go to:** https://sheets.google.com
2. **Click:** + Blank
3. **Name it:** "Fashion Newsletter Master"

#### 1.2 Create "Subscribers" Tab

**Add these headers in row 1:**

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| email | name | status | signup_date | signup_timestamp | source |

**Add yourself as first subscriber (row 2):**
- **A2:** your-email@gmail.com
- **B2:** Your Name
- **C2:** active
- **D2:** 2025-11-26
- **E2:** 2025-11-26T10:00:00Z
- **F2:** manual

#### 1.3 Create "Insights" Tab (for Voice AI later)

1. **Add new sheet tab** called "Insights"
2. **Add headers:**
   | A | B | C | D | E | F |
   |---|---|---|---|---|---|
   | date | summary | top_trends | popular_colors | key_brands | sentiment |

3. You'll populate this automatically from the workflow

---

### Phase 2: Main Newsletter Workflow (20 min)

#### 2.1 Import Workflow

1. **Open n8n:** http://localhost:5678
2. **Import:** `fashion-insights-INFLUENCER-PRODUCTS.json`
3. **Click "Import"**

#### 2.2 Configure Credentials

**A) OpenAI:**
1. Click "AI Fashion Analysis (OpenAI)" node
2. Add OpenAI API key
3. Get key: https://platform.openai.com/api-keys

**B) Google Sheets:**
1. Click "Get Subscribers from Google Sheets" node
2. Connect Google OAuth
3. Select your sheet: "Fashion Newsletter Master"
4. Sheet name: "Subscribers"

**C) Mailjet SMTP:**
1. Click "Send Newsletter via Mailjet" node
2. Add SMTP credentials:
   - Host: in-v3.mailjet.com
   - Port: 587
   - User: (Mailjet API Key)
   - Password: (Mailjet Secret Key)
3. Get credentials: https://app.mailjet.com/account/apikeys

**D) Bright Data (Optional for now):**
- You can test with mock data first
- Or set up Bright Data: https://brightdata.com

#### 2.3 Test the Workflow

1. **Run workflow** (Execute Workflow button)
2. **Check output** of "Filter Posts & Extract Product Links" node
3. **Should see:**
   - Instagram posts
   - `product_links` array
   - `coupon_codes` array
   - `has_products` boolean

4. **Check your email!**

---

### Phase 3: Newsletter Signup Form (15 min)

#### 3.1 Import Signup Webhook Workflow

1. **Import:** `newsletter-signup-webhook.json`
2. **Configure Google Sheets** (same sheet as before)
3. **Click "Webhook - Newsletter Signup" node**
4. **Copy the webhook URL** (looks like: `http://localhost:5678/webhook/newsletter-signup`)

#### 3.2 Update Signup Form

1. **Open:** `newsletter-signup-form.html` in a text editor
2. **Find line 205:**
   ```javascript
   const webhookURL = 'http://localhost:5678/webhook/newsletter-signup';
   ```
3. **Replace with your actual webhook URL**
4. **Save the file**

#### 3.3 Test Signup Form

1. **Open `newsletter-signup-form.html` in browser**
2. **Fill in name and email**
3. **Click "Subscribe Now"**
4. **Should see:** "Welcome! You're now subscribed!" message
5. **Check Google Sheet** - new subscriber should appear

---

### Phase 4: Voice AI Integration (15 min) - BONUS!

#### 4.1 Get ElevenLabs Free API Key

1. **Sign up:** https://elevenlabs.io (FREE tier: 10,000 characters/month)
2. **Go to:** Profile → API Keys
3. **Copy your API key**

#### 4.2 Import Voice AI Workflow

1. **Import:** `fashion-voice-ai-generator.json`
2. **Click "ElevenLabs Text-to-Speech" node**
3. **Update:**
   - `xi-api-key`: Paste your ElevenLabs API key
   - `VOICE_ID`: Use default voice `21m00Tcm4TlvDq8ikWAM` (Rachel)

**Available Voices (Free):**
- Rachel: `21m00Tcm4TlvDq8ikWAM` (American female)
- Drew: `29vD33N1CtxCmqQRPOHJ` (American male)
- Clyde: `2EiwWnXFnvU5JabPnv8n` (American male)
- Paul: `5Q0t7uMcjvnagumLfvZi` (British male)

#### 4.3 Test Voice Generation

1. **First, save insights to Google Sheet** (run main workflow once)
2. **Then run voice AI workflow**
3. **Check output** - you'll get an MP3 file path
4. **Listen to the audio!**

---

## 🎨 Understanding Product Extraction

### How It Works

The workflow extracts product links from Instagram captions using:

#### 1. URL Pattern Matching
Looks for common shopping link patterns:
- `shopmy.us/*` - ShopMy links
- `liketoknow.it/*` - LTK (LIKEtoKNOW.it)
- `ltk.app/*` - LTK mobile links
- `amazon.com/*` - Amazon affiliate links
- `zara.com/*` - Direct retailer links
- `hm.com/*`, `asos.com/*`, etc.

#### 2. Coupon Code Detection
Automatically finds discount codes like:
- "Use code FASHION20"
- "Promo: SAVE15"
- "Discount code: STYLE25"

#### 3. Tagged Products
If available from Instagram API:
- Product tags
- Shopping stickers
- Shoppable posts

### Example Caption:
```
Loving this oversized blazer from Zara! 🔥

Shop my look here: https://shopmy.us/fashionista/12345

Use code FASHION20 for 20% off! 💕

#fashion #ootd #style
```

**Extracted:**
- **product_links:** [`https://shopmy.us/fashionista/12345`]
- **coupon_codes:** [`FASHION20`]
- **has_products:** true
- **has_coupons:** true

---

## 📧 Newsletter Structure

Your subscribers receive:

```
┌─────────────────────────────────────────┐
│           HEADER (Gradient)             │
│      📸 Fashion Insights                │
│      Tuesday, November 26, 2025         │
│      Hi [Name]!                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│       THIS WEEK'S TRENDS               │
│  AI-generated summary...                │
│  Sentiment: POSITIVE • Posts: 45        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│       TOP 5 TRENDS                      │
│  1. Oversized blazers                   │
│  2. Cargo pants revival                 │
│  3. Sustainable fashion                 │
│  4. Chunky sneakers                     │
│  5. Neutral palettes                    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│       COLORS, BRANDS, HASHTAGS         │
│  🎨 Popular Colors: Beige, Cream...     │
│  🏷️ Key Brands: Zara, H&M...           │
│  #️⃣ Rising Hashtags: #ootd #fashion    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│    🛍️ SHOP INFLUENCER PICKS ⭐ NEW!     │
│                                         │
│  [Product Image] @influencer_name       │
│  "Loving this oversized blazer..."     │
│  🎟️ Code: FASHION20                    │
│  [Shop This Look →]                     │
│                                         │
│  [4 more influencer products...]        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│       FEATURED INSTAGRAM POSTS          │
│  [5 posts with images and captions]    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│       BUSINESS RECOMMENDATIONS          │
│  AI-generated action items...           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│       SUBSCRIBE CTA                     │
│  💌 Love This Newsletter?               │
│  [Subscribe to Fashion Insights]        │
└─────────────────────────────────────────┘
```

---

## 🔊 Voice AI Features

### What It Creates

A podcast-style audio summary with:
- Welcome intro
- Top 5 trends countdown
- Color and brand mentions
- Hashtag highlights
- Action recommendations
- Sign-off

### Voice Script Example:

```
Hey fashion lovers! Welcome to this week's Fashion Insights!

This week we analyzed 48 posts from top influencers,
and the sentiment is POSITIVE!

Here are the top 5 trends:

Number one: Oversized blazers. They're everywhere!
Number two: Cargo pants revival. Yes, they're back!
...

When it comes to colors, we're seeing beige, cream, and burgundy.

Don't forget to check out the full newsletter for product links!

Stay stylish!
```

### Output:
- **Format:** MP3 audio file
- **Duration:** ~60-90 seconds
- **Voice:** Natural AI voice (Rachel, Drew, or Clyde)
- **Use case:** Embed in website, share on social media, or add to podcast

---

## 🌐 Deploying to Production

### Option 1: Host Signup Form on Hostinger

1. **Upload `newsletter-signup-form.html`** to your Hostinger website
2. **Update webhook URL** to point to your production n8n:
   ```javascript
   const webhookURL = 'https://your-n8n-domain.com/webhook/newsletter-signup';
   ```
3. **Make sure n8n is publicly accessible**

### Option 2: Embed Form in Your Website

Copy the form HTML and paste into your existing website:
```html
<!-- Copy everything inside <body> tag from newsletter-signup-form.html -->
```

### Option 3: Use Notion/Carrd/Webflow

Create a simple landing page and link to your hosted form.

---

## ⏰ Weekly Automation

### Schedule Newsletter Workflow

1. **In main workflow, delete "Start Weekly Newsletter" node**
2. **Add "Schedule Trigger" node:**
   - Type: `Cron`
   - Expression: `0 9 * * 1` (Every Monday at 9 AM)
3. **Connect to "Bright Data" node**
4. **Save workflow**

Now it runs automatically every week!

---

## 📊 Product Link Sources

### Common Shopping Link Platforms

| Platform | Example URL | Use Case |
|----------|-------------|----------|
| **LTK (LIKEtoKNOW.it)** | liketoknow.it/ltk/abc123 | Influencer affiliate platform |
| **ShopMy** | shopmy.us/influencer/12345 | Creator storefronts |
| **Amazon Associates** | amazon.com/dp/B08XYZ?tag=... | Amazon affiliate links |
| **Direct Retailer** | zara.com/us/en/blazer-p12345 | Direct product pages |
| **Linktree** | linktr.ee/influencer | Link in bio tools |

The workflow automatically detects these and extracts them!

---

## 🎯 Customization Options

### Change Products Section Style

Edit **"Prepare Email with Products"** node, line ~120:

```javascript
// Pink background (influencer style)
background-color: #fff5f5;
border: 1px solid #ffd6d6;

// Or try blue (professional)
background-color: #f0f9ff;
border: 1px solid #bfdbfe;

// Or green (sustainable)
background-color: #f0fdf4;
border: 1px solid #bbf7d0;
```

### Show More/Fewer Products

Line ~10:
```javascript
const postsWithProducts = allPosts.filter(item => item.json.has_products).slice(0, 5);
```
Change `5` to desired number (3-10 recommended)

### Add Affiliate Disclosure

Customize the disclosure text in the products section (line ~160):
```javascript
<em>Note: Some links may be affiliate links...</em>
```

---

## 💰 Monetization Strategies

### 1. Affiliate Revenue
- **Sign up** for affiliate networks (LTK, rewardStyle, Amazon Associates)
- **Replace influencer links** with your own affiliate links (if allowed)
- **Track clicks** with UTM parameters
- **Earn commission** on sales

### 2. Sponsored Content
- **Partner with brands** to feature their products
- **Highlight specific items** in the products section
- **Add "Sponsored" label**
- **Charge per feature** or per click

### 3. Premium Membership
- **Free tier:** Basic newsletter
- **Premium tier:** Early access, exclusive products, voice summaries
- **Use Stripe** for payments
- **Filter subscribers** by tier in Google Sheets

---

## 🔧 Troubleshooting

### "No product links found"

**Cause:** Instagram posts don't contain shopping links

**Solutions:**
1. Target influencers who use LTK/ShopMy
2. Look for posts with "link in bio"
3. Scrape influencer bio links separately
4. Manually curate products (see affiliate workflow)

### "Coupon codes not detected"

**Cause:** Non-standard format

**Solution:** Update regex in "Filter Posts & Extract Product Links" node:
```javascript
const couponRegex = /(?:code|promo|discount|use|CODE)\\s*[:"]?\\s*([A-Z0-9]{4,15})/gi;
```

### "Voice AI file not found"

**Cause:** Audio file not saved correctly

**Solution:** Check n8n has write permissions to `/files` directory

### "Signup form not working"

**Cause:** Webhook URL incorrect or CORS issue

**Solutions:**
1. Check webhook URL in HTML matches n8n
2. Enable CORS in n8n settings
3. Make sure webhook workflow is active (not paused)

---

## 📈 Analytics & Tracking

### Track Subscriber Growth

Add to Google Sheets "Subscribers" tab:
- Column G: `utm_source` (where they signed up from)
- Column H: `referrer` (who referred them)
- Column I: `click_count` (manual: how many product clicks)

### Track Product Clicks

Add UTM parameters to product links:
```javascript
const productUrl = `${post.shopping_url}?utm_source=newsletter&utm_medium=email&utm_campaign=fashion_insights`;
```

Then track in Google Analytics!

### Track Email Performance

Mailjet provides:
- Open rates
- Click rates
- Bounce rates
- Unsubscribe rates

Check dashboard: https://app.mailjet.com/stats

---

## 🎓 Advanced Features (Future)

### 1. AI Product Matching
Instead of extracting from captions, use AI to match products to trends:
```javascript
// In OpenAI prompt, ask for product suggestions
"Also suggest 5 specific products that match these trends"
```

### 2. Personalized Recommendations
Segment subscribers by style preference:
- Minimalist → Show minimal products
- Streetwear → Show urban products
- Luxury → Show high-end products

### 3. Interactive Voice Chat
Create a chatbot that answers fashion questions using insights:
- Integrate with Twilio
- Use OpenAI GPT-4 for conversations
- Save conversations to Google Sheets

### 4. Instagram Story Generator
Auto-create Instagram Stories from insights:
- Use Canva API or Bannerbear
- Generate branded graphics
- Include product links
- Post automatically

---

## ✅ Final Checklist

### Before First Send:
- [ ] Main workflow imported and configured
- [ ] OpenAI API key added
- [ ] Google Sheets connected (Subscribers tab)
- [ ] Mailjet SMTP configured
- [ ] Test email sent and received
- [ ] Product links extracting correctly
- [ ] Coupon codes detecting (if present)

### Signup Form:
- [ ] Signup webhook workflow imported
- [ ] Webhook URL copied
- [ ] Signup form HTML updated with webhook URL
- [ ] Form tested - subscriber added to Google Sheet
- [ ] Form hosted/embedded on website

### Voice AI (Optional):
- [ ] ElevenLabs API key obtained
- [ ] Voice AI workflow imported
- [ ] Test audio generated successfully
- [ ] Audio file accessible

### Automation:
- [ ] Schedule trigger configured (weekly)
- [ ] Test scheduled run (or wait for Monday)
- [ ] Monitoring set up (email alerts on failure)

---

## 🎉 You're Ready!

Your complete fashion newsletter system now includes:

✅ **Influencer product extraction** from real Instagram posts
✅ **AI-powered trend analysis**
✅ **Google Sheets subscriber management**
✅ **Beautiful newsletter signup form**
✅ **Automated weekly sending via Mailjet**
✅ **Voice AI summaries** (bonus!)

**Revenue potential:**
- Affiliate commissions from product links
- Sponsored content placements
- Premium membership tier
- Brand partnerships

**Growth potential:**
- 100 subscribers: ~$10-50/month
- 1,000 subscribers: ~$100-500/month
- 10,000 subscribers: ~$1,000-5,000/month

**Time investment:**
- Initial setup: 60 minutes (done!)
- Weekly maintenance: 15-30 minutes (review & send)
- Scaling: Minimal (it's automated!)

---

## 📞 Support & Resources

### Free Tools Used:
- **n8n:** Workflow automation (self-hosted free)
- **Google Sheets:** Subscriber management (free)
- **Mailjet:** Email sending (200 free/day)
- **OpenAI:** AI analysis (~$0.01/newsletter)
- **ElevenLabs:** Voice AI (10K characters/month free)

### Learning Resources:
- n8n Docs: https://docs.n8n.io
- Mailjet Docs: https://dev.mailjet.com
- ElevenLabs Docs: https://docs.elevenlabs.io
- Instagram API: https://developers.facebook.com/docs/instagram

### Community:
- n8n Forum: https://community.n8n.io
- Fashion Newsletter Discord: [Create your own!]

---

## 🚀 Next Steps

1. **Today:** Test full workflow end-to-end
2. **This Week:** Add 10-50 subscribers via signup form
3. **This Month:** Send 4 newsletters, track engagement
4. **Next Quarter:** Scale to 500+ subscribers, monetize

**Ready to launch your fashion influencer newsletter? 🎉**

---

*Last updated: November 26, 2025*
*Version: 1.0 - Influencer Products + Voice AI*
*Made with ❤️ for fashion content creators*
