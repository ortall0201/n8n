# Fashion Influencer Insights Newsletter System - Architecture Overview

## 🎯 Understanding of Requirements

### Core Goal
Build a **legally-safe, ethically-sound** Fashion Influencer Insights Newsletter System that:

1. ✅ Analyzes **public** Instagram fashion trends using third-party scrapers
2. ✅ Extracts product links (ShopMy, LTK, Amazon, Zara) and coupon codes
3. ✅ **Never re-hosts influencer images or full content**
4. ✅ Sends weekly newsletters via Mailjet with trend insights + product picks
5. ✅ Manages subscribers in Google Sheets (GDPR-aware)
6. ✅ Generates optional voice summaries (TTS)
7. ✅ Uses **Lovable** as the primary frontend (landing, signup, latest issue)
8. ✅ Includes proper legal disclaimers and privacy docs
9. ✅ Makes **zero** claims of influencer endorsement
10. ✅ Stores minimal data: only extracted links, codes, AI summaries - NOT raw captions

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    LOVABLE FRONTEND                       │
│  - Landing Page (subscribe CTA)                          │
│  - Signup Form → n8n webhook                             │
│  - Latest Issue (trends + products, NO images)           │
│  - Legal Pages (disclaimer, privacy, terms)              │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│                    N8N WORKFLOWS                         │
│                                                          │
│  1. Newsletter Signup Webhook                           │
│     - Validates email                                    │
│     - Saves to Google Sheets                            │
│     - No duplicate signups                              │
│                                                          │
│  2. Weekly Newsletter Generator (Cron: Monday 10:00)    │
│     - Fetch scraped data (Bright Data/Apify)           │
│     - Extract product links + coupon codes              │
│     - AI analysis (OpenAI) - NO raw captions stored    │
│     - Generate newsletter HTML (no influencer images)   │
│     - Send via Mailjet to active subscribers            │
│     - Optional: Generate TTS audio                      │
│                                                          │
│  3. Latest Issue API (for Lovable)                      │
│     - Returns JSON with latest trends + products        │
│     - NO influencer images, only handles + links        │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│                    DATA STORAGE                          │
│                                                          │
│  Google Sheets:                                         │
│  - Subscribers (email, name, status, signup_date)       │
│  - Weekly_Insights (date, trends, products, audio_url)  │
│                                                          │
│  What We DON'T Store:                                   │
│  - ❌ Raw influencer captions (only AI summaries)       │
│  - ❌ Influencer images (only links to original posts)  │
│  - ❌ Any non-public data                              │
└──────────────────────────────────────────────────────────┘
```

---

## 🔒 Legal & Safety Guardrails (Hard-Coded)

### 1. Public Data Only
- **Scraper constraint**: Only public Instagram posts
- **No bypass attempts**: No login, no captcha circumvention, no private content
- **Code enforcement**: Data validation nodes reject any non-public data markers

### 2. No Content Re-Hosting
- **Images**: We NEVER store or serve influencer images
  - Newsletter shows: text only + link to original post
  - Lovable UI shows: neutral fashion graphics (abstract, stock photos)
- **Captions**: Processed temporarily, then discarded
  - We store only: `@handle`, `product_links[]`, `coupon_codes[]`, `AI_summary`

### 3. Data Minimization
**What we extract and keep:**
```json
{
  "influencer_handle": "@fashionista_daily",
  "post_url": "https://instagram.com/p/abc123",
  "product_links": [
    "https://shopmy.us/fashionista/12345",
    "https://www.zara.com/us/en/blazer-p12345.html"
  ],
  "coupon_codes": ["FASHION20", "SAVE15"],
  "ai_generated_summary": "Influencer highlighted oversized blazers in neutral tones",
  "extracted_date": "2025-11-26"
}
```

**What we DON'T keep:**
- ❌ Full raw captions
- ❌ Image files or URLs (only post URL for attribution)
- ❌ Follower counts, engagement metrics
- ❌ Any personal data beyond public handle

### 4. No Implied Endorsement
**Copy we use:**
- ✅ "Analyzing public fashion trends from social media"
- ✅ "This tool independently tracks emerging fashion trends"
- ✅ "All content rights remain with original creators"

**Copy we NEVER use:**
- ❌ "In partnership with @influencer"
- ❌ "Endorsed by top fashionistas"
- ❌ "Recommended by @username"

### 5. Attribution & Disclaimers
**Every output includes:**
- Influencer handle (text only): `@username`
- Link to original post: `[View on Instagram →]`
- Legal footer:
  > "This is an independent trend analysis tool. We are not affiliated with Instagram or the influencers we analyze. All content rights remain with original creators. Product links may be affiliate links."

### 6. Privacy & GDPR Compliance
- **Subscriber data**: Email + name only, stored in Google Sheets
- **Retention**: Active until unsubscribe
- **Deletion**: Manual process (document in Privacy Policy)
- **No tracking pixels** without consent
- **Cookie notice** if applicable

---

## 📊 Data Flow

### Weekly Newsletter Generation Flow

```
1. CRON TRIGGER (Monday 10:00 AM)
   ↓
2. FETCH SCRAPED DATA
   Input: Bright Data API response
   Output: Array of posts with captions
   ↓
3. EXTRACT PRODUCTS & COUPONS (Code Node)
   Input: Post captions (temporary)
   Processing:
   - Regex for product links (shopmy.us, liketoknow.it, amazon.*, zara.com, hm.com, asos.com)
   - Regex for coupons ("Use code XXX", "קוד קופון XXX")
   Output:
   {
     handle: "@username",
     post_url: "...",
     product_links: [...],
     coupon_codes: [...]
   }
   ❌ DISCARD: Full caption after extraction
   ↓
4. AI TREND ANALYSIS (OpenAI Node)
   Input: Aggregated extracted data (NOT raw captions)
   - "Analyze these product types and generate trend summary"
   Output:
   {
     trend_summary: "Oversized blazers and neutral tones dominate...",
     top_trends: ["Oversized outerwear", "Cargo pants", ...],
     tone: "energetic"
   }
   ↓
5. FETCH ACTIVE SUBSCRIBERS (Google Sheets)
   Query: status == "active"
   ↓
6. BUILD NEWSLETTER HTML (Code Node)
   - Header with logo/name
   - Trend summary (AI-generated)
   - Influencer Picks section:
     * @handle (text only)
     * "Shop this look →" button (product link)
     * Coupon code badge if available
     * NO images, only neutral graphics
   - Footer: Legal disclaimer
   ↓
7. SEND VIA MAILJET (Loop per subscriber)
   Subject: "Weekly Fashion Insights – [Top Trend]"
   ↓
8. (OPTIONAL) GENERATE TTS AUDIO
   - Create voice script from trends + products
   - Call ElevenLabs/OpenAI TTS
   - Store audio URL in Google Sheets
   ↓
9. SAVE TO GOOGLE SHEETS (Weekly_Insights tab)
   {
     date: "2025-11-26",
     trends: [...],
     products: [...],
     audio_url: "..."
   }
   ↓
10. PUBLISH LATEST ISSUE JSON (for Lovable)
   - Expose via webhook: GET /latest-issue
   - Returns sanitized JSON (no raw captions, no images)
```

---

## 🎨 Lovable Frontend Design

### Pages

#### 1. Landing Page (`/`)
```
┌──────────────────────────────────────────────┐
│         Fashion Trend Radar 📸               │
│    Influencer-Based Weekly Newsletter        │
│                                              │
│  Discover what's trending in fashion before  │
│  anyone else. AI-powered analysis of public  │
│  social media trends.                        │
│                                              │
│  [Subscribe to Newsletter →]                 │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                              │
│  How It Works:                               │
│  1. We analyze public fashion posts          │
│  2. AI extracts emerging trends              │
│  3. You get weekly insights + product picks  │
│                                              │
│  [Legal Disclaimer]                          │
└──────────────────────────────────────────────┘
```

**Styling:**
- Minimal, fashion magazine aesthetic
- White space, clean typography (Inter + Playfair Display)
- Color palette: Beige (#F5F1E8) + Black + Soft Pink (#FFE5E5)
- Hero section with gradient background
- Mobile-first, responsive

#### 2. Subscribe Modal/Page
```
┌──────────────────────────────────────────────┐
│  Join the Fashion Trend Radar               │
│                                              │
│  [Name Input]                                │
│  [Email Input]                               │
│                                              │
│  [ ] I agree to receive weekly newsletters   │
│                                              │
│  [Subscribe →]                               │
│                                              │
│  We respect your privacy. Unsubscribe anytime│
│  [Privacy Policy] [Terms]                    │
└──────────────────────────────────────────────┘
```

**API Call:**
```javascript
POST https://your-n8n.com/webhook/newsletter-signup
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

#### 3. Latest Issue Page (`/latest`)
```
┌──────────────────────────────────────────────┐
│  This Week's Fashion Insights               │
│  November 26, 2025                          │
│                                              │
│  🔥 Top Trends                               │
│  [AI-generated summary - no copied text]    │
│                                              │
│  🛍️ Influencer Picks                         │
│  ┌────────────────────────────────────┐     │
│  │ [Neutral graphic]                   │     │
│  │ @fashionista_daily                  │     │
│  │ "Oversized blazers are trending"    │     │
│  │ 🎟️ FASHION20                        │     │
│  │ [Shop this look →]                  │     │
│  └────────────────────────────────────┘     │
│  [4 more product cards...]                   │
│                                              │
│  🎧 Listen to Audio Summary                  │
│  [Audio player]                              │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  Disclaimer: Independent analysis. Not      │
│  affiliated with Instagram or influencers.  │
└──────────────────────────────────────────────┘
```

**API Call:**
```javascript
GET https://your-n8n.com/webhook/latest-issue
Response:
{
  "date": "2025-11-26",
  "trend_summary": "...",
  "top_trends": [...],
  "influencer_picks": [
    {
      "handle": "@fashionista_daily",
      "post_url": "https://instagram.com/p/...",
      "product_link": "https://shopmy.us/...",
      "coupon_code": "FASHION20",
      "ai_summary": "Highlighted oversized blazers"
    }
  ],
  "audio_url": "https://..."
}
```

#### 4. Legal Pages (`/legal/*`)
- `/legal/disclaimer` - Full disclaimer text
- `/legal/privacy` - Privacy policy
- `/legal/terms` - Terms of use
- `/legal/about` - How it works, safety notes

---

## 📁 Repository Structure

```
fashion-insights-system/
│
├── README.md                          # Main project documentation
├── SYSTEM_OVERVIEW.md                 # This file
├── SAFETY_NOTES.md                    # Legal/ethical guardrails summary
│
├── n8n/                               # n8n workflow definitions
│   ├── workflows/
│   │   ├── newsletter-signup-webhook.json
│   │   ├── weekly-newsletter-generator.json
│   │   └── latest-issue-api.json
│   ├── docs/
│   │   ├── WORKFLOW_SETUP.md
│   │   └── DATA_HANDLING.md
│   └── mock-data/
│       └── sample-scraped-posts.json
│
├── lovable-ui/                        # Lovable app (frontend)
│   ├── README.md
│   ├── config/
│   │   └── lovable-config.json
│   ├── pages/
│   │   ├── landing.jsx
│   │   ├── subscribe.jsx
│   │   ├── latest-issue.jsx
│   │   └── legal/
│   ├── components/
│   │   ├── ProductCard.jsx
│   │   ├── TrendSummary.jsx
│   │   └── AudioPlayer.jsx
│   └── api/
│       └── n8n-client.js
│
├── backend/                           # Optional API layer (if needed)
│   ├── package.json
│   ├── server.js
│   └── routes/
│       └── latest-issue.js
│
├── legal/                             # Legal documents
│   ├── DISCLAIMER_en.md
│   ├── DISCLAIMER_he.md               # (Hebrew - structure only)
│   ├── PRIVACY_POLICY_en.md
│   └── TERMS_OF_USE_en.md
│
├── docs/                              # Additional documentation
│   ├── DEPLOYMENT.md
│   ├── API_REFERENCE.md
│   └── TROUBLESHOOTING.md
│
└── assets/                            # Neutral graphics/logos
    ├── logo.svg
    └── neutral-fashion-graphics/
```

---

## 🔐 Security & Privacy

### API Keys & Secrets
Store in `.env` (NEVER commit):
```env
# n8n
N8N_WEBHOOK_BASE_URL=https://your-n8n.com

# Bright Data / Scraper
SCRAPER_API_KEY=...

# OpenAI
OPENAI_API_KEY=sk-...

# Mailjet
MAILJET_API_KEY=...
MAILJET_SECRET_KEY=...

# Google Sheets
GOOGLE_SHEETS_CREDENTIALS=...

# ElevenLabs (TTS)
ELEVENLABS_API_KEY=...

# Lovable
LOVABLE_PROJECT_ID=...
```

### Data Retention Policy
Document in `PRIVACY_POLICY_en.md`:

1. **Subscriber data**: Retained until unsubscribe
2. **Extracted product data**: 90 days
3. **Weekly insights**: 1 year
4. **Logs**: 30 days

### GDPR Compliance Checklist
- [ ] Privacy policy published
- [ ] Consent checkbox on signup
- [ ] Unsubscribe link in every email
- [ ] Data deletion process documented
- [ ] No unnecessary data collection
- [ ] Secure credential storage

---

## 🚀 Deployment Strategy

### Development
1. Local n8n (Docker): `http://localhost:5678`
2. Local Lovable dev server
3. Mock data for testing

### Staging
1. n8n Cloud or VPS
2. Lovable preview deployment
3. Test Google Sheets (separate from production)

### Production
1. n8n Cloud (recommended) or self-hosted VPS
2. Lovable production deployment
3. Production Google Sheets
4. Domain setup (e.g., fashionradar.com)
5. SSL certificates
6. Monitoring (n8n execution history + Lovable analytics)

---

## 📊 Monitoring & Analytics

### n8n Monitoring
- Workflow execution success rate
- Failed runs → Slack/email alerts
- Execution time tracking

### Newsletter Metrics (Mailjet)
- Open rates
- Click-through rates (on product links)
- Bounce rates
- Unsubscribe rates

### Lovable Analytics
- Page views
- Signup conversion rate
- Latest issue engagement

### Subscriber Growth
- Track in Google Sheets:
  - Daily signups
  - Active vs. inactive
  - Source attribution

---

## 🎯 Success Metrics

### Month 1
- ✅ 50 subscribers
- ✅ 4 newsletters sent
- ✅ 25% open rate
- ✅ Zero legal complaints

### Month 3
- ✅ 200 subscribers
- ✅ 12 newsletters sent
- ✅ 30% open rate
- ✅ Product link CTR > 5%

### Month 6
- ✅ 1,000 subscribers
- ✅ 24 newsletters sent
- ✅ Affiliate revenue tracking
- ✅ Voice AI adoption

---

## 🔄 Future Enhancements

### Phase 2
- Multi-language support (Hebrew)
- Personalized recommendations based on user preferences
- A/B testing for email subject lines

### Phase 3
- Mobile app (React Native)
- Real-time trend alerts
- Influencer collaboration platform

### Phase 4
- Premium tier with advanced analytics
- API for third-party integrations
- White-label solution for fashion brands

---

## 📚 Key References

- **n8n Documentation**: https://docs.n8n.io
- **Lovable Documentation**: https://docs.lovable.dev
- **Mailjet API**: https://dev.mailjet.com
- **OpenAI API**: https://platform.openai.com/docs
- **GDPR Compliance**: https://gdpr.eu

---

## ⚠️ Important Disclaimers

This system is designed with legal safety in mind, but **this is not legal advice**.

**Before production use:**
1. Consult with a lawyer familiar with:
   - Copyright law
   - Social media terms of service
   - Data privacy regulations (GDPR, CCPA)
   - Affiliate marketing disclosure requirements
2. Review Instagram's terms of service
3. Ensure scraper compliance
4. Add proper legal disclaimers
5. Implement GDPR data deletion procedures

**We make no guarantees of legal compliance. Use at your own risk.**

---

*Last updated: November 26, 2025*
*Version: 2.0 - Legal-Safe Architecture*
