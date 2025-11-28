# 📊 Add Analytics Tracking to Workflow

**Current Status**: ❌ No click tracking configured

**After this guide**: ✅ Track every click on affiliate links, voice chatbot button, and newsletter CTAs

---

## 🎯 What You'll Track

### 1. Email Metrics (Already Built-In):
- ✅ Email opens
- ✅ Total clicks
- ✅ Delivery rate
- ✅ Bounce rate

**Where**: Mailjet dashboard (FREE, already included)

### 2. Link Clicks (Need to Add):
- ❌ Affiliate product clicks (per product)
- ❌ Voice chatbot button clicks
- ❌ Newsletter signup clicks
- ❌ Blog post clicks

**Solution**: Add Bitly link shortening + tracking

### 3. Analytics Dashboard (Need to Add):
- ❌ Centralized analytics in Google Sheets
- ❌ Click trends over time
- ❌ Top performing products
- ❌ Conversion tracking

**Solution**: Add Google Sheets logging nodes

---

## 🚀 Option 1: Quick Setup (FREE Tools) ⭐ RECOMMENDED

Use free tier tools - perfect for starting out!

### Tools Needed:
1. **Bitly** (FREE: 50 links/month) - Link shortening + click tracking
2. **Google Sheets** (FREE) - Analytics dashboard
3. **Mailjet** (FREE: 6,000 emails/month) - Email open/click tracking

### Cost: $0/month ✅

---

## 📋 Step-by-Step: Add Analytics

### STEP 1: Sign Up for Bitly (5 min)

1. Go to: https://bitly.com/
2. Sign up (FREE account)
3. Go to: Settings → API → Generate Access Token
4. Copy token: `abc123xyz...`

**FREE tier limits**:
- 50 shortened links per month
- Unlimited clicks
- Basic analytics (clicks, locations, referrers)

**Enough for**:
- 8 products per newsletter × 4 newsletters/month = 32 links
- Plus voice chatbot button + blog links = ~40 links/month
- ✅ Within free limit!

---

### STEP 2: Add Bitly Node to Workflow (10 min)

#### A. Install Bitly Node

In n8n:
1. Settings → Community Nodes
2. Search: `n8n-nodes-bitly`
3. Click **Install**
4. Restart n8n: `pnpm start`

#### B. Add Bitly Credential

1. Click any workflow
2. Add new node: **Bitly**
3. Click **Credentials** → **Create New**
4. Enter:
   - **Access Token**: `[Your Bitly token]`
5. Test connection → Save

---

### STEP 3: Add Link Shortening to Workflow (15 min)

#### A. Create "Shorten Affiliate Links" Node

**Position**: After "Devi Affiliate Processor" node (before email)

**Node Type**: Code (JavaScript)

**Code**:
```javascript
// PREPARE LINKS FOR BITLY SHORTENING
const content = $json;

// Create array of all links to shorten
const linksToShorten = [];

// Add affiliate product links
content.products.forEach((product, index) => {
  linksToShorten.push({
    id: `product_${index}`,
    type: 'affiliate',
    product_name: product.name,
    original_url: product.affiliate_url,
    utm_source: 'newsletter',
    utm_medium: 'email',
    utm_campaign: `week_${content.week_number}`,
    utm_content: product.name.toLowerCase().replace(/\s/g, '_')
  });
});

// Add voice chatbot link
linksToShorten.push({
  id: 'voice_chatbot',
  type: 'voice_chat',
  original_url: 'https://your-project.lovable.app',
  utm_source: 'newsletter',
  utm_medium: 'email',
  utm_campaign: `week_${content.week_number}`,
  utm_content: 'voice_chat_button'
});

// Add newsletter signup link (for forwarding)
linksToShorten.push({
  id: 'newsletter_signup',
  type: 'signup',
  original_url: 'https://your-project.lovable.app',
  utm_source: 'newsletter_forward',
  utm_medium: 'email',
  utm_campaign: `week_${content.week_number}`,
  utm_content: 'forward_subscribe'
});

// Return each link as separate item for Bitly node
return linksToShorten.map(link => ({
  json: {
    ...link,
    long_url: `${link.original_url}${link.original_url.includes('?') ? '&' : '?'}utm_source=${link.utm_source}&utm_medium=${link.utm_medium}&utm_campaign=${link.utm_campaign}&utm_content=${link.utm_content}`
  }
}));
```

#### B. Add Bitly Node

**Position**: After "Prepare Links for Bitly"

**Node Type**: HTTP Request (or Bitly community node if installed)

**Settings**:
- **Method**: POST
- **URL**: `https://api-ssl.bitly.com/v4/shorten`
- **Authentication**: Header Auth
  - Header: `Authorization`
  - Value: `Bearer [YOUR_BITLY_TOKEN]`
- **Body**:
```json
{
  "long_url": "={{ $json.long_url }}",
  "domain": "bit.ly",
  "title": "={{ $json.product_name || $json.type }}"
}
```

**Output**: Returns shortened URL (e.g., `https://bit.ly/3abc123`)

#### C. Aggregate Shortened Links

**Node Type**: Code (JavaScript)

**Code**:
```javascript
// AGGREGATE SHORTENED LINKS BACK TO CONTENT
const shortenedLinks = $input.all();
const originalContent = $('Devi Affiliate Processor').first().json;

// Map shortened links back to products
const linkMap = {};
shortenedLinks.forEach(item => {
  const id = item.json.id;
  const shortUrl = item.json.link || item.json.short_url;
  linkMap[id] = shortUrl;
});

// Update product URLs with shortened links
const updatedProducts = originalContent.products.map((product, index) => {
  return {
    ...product,
    short_link: linkMap[`product_${index}`] || product.affiliate_url,
    tracking_enabled: true
  };
});

// Store other shortened links
const voiceChatLink = linkMap['voice_chatbot'];
const newsletterSignupLink = linkMap['newsletter_signup'];

return [{
  json: {
    ...originalContent,
    products: updatedProducts,
    voice_chat_link: voiceChatLink,
    newsletter_signup_link: newsletterSignupLink
  }
}];
```

#### D. Update Email Template

In "Prepare Email with Products" node, replace product URLs:

**Old**:
```javascript
<a href="${product.link}" style="...">Shop →</a>
```

**New**:
```javascript
<a href="${product.short_link}" style="...">Shop →</a>
```

**Old** (voice chatbot):
```javascript
<a href="https://your-project.lovable.app" style="...">Try Voice Chat Now 🎤</a>
```

**New**:
```javascript
<a href="${voiceChatLink}" style="...">Try Voice Chat Now 🎤</a>
```

---

### STEP 4: Create Analytics Dashboard in Google Sheets (10 min)

#### A. Create Spreadsheet

1. Create new Google Sheet: "Fashion Newsletter Analytics"
2. Create 3 tabs:
   - **Overview** - Summary metrics
   - **Link Clicks** - Detailed click data
   - **Raw Data** - All tracking events

#### B. Tab 1: Overview

**Column headers**:
```
A: Week Number
B: Issue Date
C: Emails Sent
D: Open Rate
E: Total Clicks
F: Voice Chat Clicks
G: Affiliate Clicks
H: Top Product
```

#### C. Tab 2: Link Clicks

**Column headers**:
```
A: Link ID
B: Link Type (affiliate/voice_chat/signup)
C: Product Name
D: Short URL
E: Total Clicks
F: Last Updated
```

#### D. Tab 3: Raw Data

**Column headers**:
```
A: Timestamp
B: Week Number
C: Link ID
D: Link Type
E: Product Name
F: Clicks
G: Referrers
```

---

### STEP 5: Add Google Sheets Logging Node (10 min)

#### A. Create "Log Newsletter Stats" Node

**Position**: After email sending completes

**Node Type**: Code (JavaScript)

**Code**:
```javascript
// LOG NEWSLETTER STATS TO GOOGLE SHEETS
const content = $('Aggregate Shortened Links').first().json;
const emailResults = $('Loop Back').first().json;

// Prepare overview row
const overview = {
  week_number: content.week_number,
  issue_date: content.issue_date,
  emails_sent: emailResults.total || 0,
  open_rate: '0%', // Will be updated from Mailjet
  total_clicks: 0, // Will be updated from Bitly
  voice_chat_clicks: 0,
  affiliate_clicks: 0,
  top_product: content.products[0]?.name || 'N/A'
};

// Prepare link tracking rows
const linkRows = [];

// Add affiliate links
content.products.forEach(product => {
  linkRows.push({
    link_id: `product_${product.name.toLowerCase().replace(/\s/g, '_')}`,
    link_type: 'affiliate',
    product_name: product.name,
    short_url: product.short_link,
    total_clicks: 0, // Will be updated from Bitly API
    last_updated: new Date().toISOString()
  });
});

// Add voice chat link
linkRows.push({
  link_id: 'voice_chatbot',
  link_type: 'voice_chat',
  product_name: 'Voice Chatbot CTA',
  short_url: content.voice_chat_link,
  total_clicks: 0,
  last_updated: new Date().toISOString()
});

return [{
  json: {
    overview: overview,
    link_tracking: linkRows
  }
}];
```

#### B. Add Google Sheets Append Node

**Node Type**: Google Sheets (Append)

**Settings**:
- **Credential**: Your Google Sheets account
- **Operation**: Append
- **Spreadsheet**: Fashion Newsletter Analytics
- **Sheet**: Overview
- **Data to Send**:
```json
{
  "week_number": "={{ $json.overview.week_number }}",
  "issue_date": "={{ $json.overview.issue_date }}",
  "emails_sent": "={{ $json.overview.emails_sent }}",
  "open_rate": "={{ $json.overview.open_rate }}",
  "total_clicks": "={{ $json.overview.total_clicks }}",
  "voice_chat_clicks": "={{ $json.overview.voice_chat_clicks }}",
  "affiliate_clicks": "={{ $json.overview.affiliate_clicks }}",
  "top_product": "={{ $json.overview.top_product }}"
}
```

#### C. Add Another Google Sheets Node for Link Tracking

**Node Type**: Google Sheets (Append)

**Settings**:
- **Sheet**: Link Clicks
- **Data**: Each link from `$json.link_tracking` array

---

### STEP 6: Fetch Click Data from Bitly (15 min)

#### A. Create Scheduled Workflow "Update Analytics"

**New Workflow**: Create separate workflow

**Trigger**: Schedule (Every day at 10 AM)

**Purpose**: Fetch click data from Bitly and update Google Sheets

#### B. Get Link Clicks from Bitly

**Node Type**: HTTP Request

**Settings**:
- **Method**: GET
- **URL**: `https://api-ssl.bitly.com/v4/groups/[GROUP_ID]/bitlinks?size=50`
- **Authentication**: Header Auth
  - Header: `Authorization`
  - Value: `Bearer [YOUR_BITLY_TOKEN]`

**Output**: Returns all your shortened links

#### C. Get Click Stats for Each Link

**Node Type**: HTTP Request (in loop)

**Settings**:
- **Method**: GET
- **URL**: `https://api-ssl.bitly.com/v4/bitlinks/{{ $json.link }}/clicks/summary?unit=day&units=7`
- **Authentication**: Same as above

**Output**: Returns click count for last 7 days

#### D. Update Google Sheets with Click Data

**Node Type**: Google Sheets (Update)

**Logic**: Match Bitly link to Google Sheets row and update click count

---

## 📊 What You'll See in Analytics

### Mailjet Dashboard (Email Metrics):
```
Email Sent: 150
Opened: 87 (58% open rate)
Clicked: 42 (28% click rate)
Bounced: 3 (2%)
```

### Bitly Dashboard (Link Clicks):
```
Voice Chat Button: 23 clicks
Product 1 (Blazer): 15 clicks
Product 2 (Handbag): 12 clicks
Product 3 (Shoes): 8 clicks
Newsletter Signup: 6 clicks
```

### Google Sheets (Overview):
```
Week 5 | 2025-01-27 | 150 emails | 58% open | 64 clicks | Voice:23 | Affiliate:35
Week 4 | 2025-01-20 | 142 emails | 61% open | 58 clicks | Voice:19 | Affiliate:31
Week 3 | 2025-01-13 | 128 emails | 55% open | 51 clicks | Voice:17 | Affiliate:28
```

### Google Sheets (Link Clicks):
```
product_blazer | affiliate | Oversized Blazer | bit.ly/3abc | 15 clicks | 2025-01-27
voice_chatbot  | voice_chat | Voice Chatbot CTA | bit.ly/3def | 23 clicks | 2025-01-27
product_handbag | affiliate | Luxury Handbag | bit.ly/3ghi | 12 clicks | 2025-01-27
```

---

## 🎯 Complete Analytics Stack

### Level 1: Email (Mailjet - Built-in)
- Emails sent
- Open rate
- Total clicks
- Bounce rate

### Level 2: Links (Bitly - Need to add)
- Individual link clicks
- Click locations (countries)
- Referrers (where clicks came from)
- Click over time

### Level 3: Dashboard (Google Sheets - Need to add)
- Week-over-week trends
- Top performing products
- Voice chat vs affiliate clicks
- Growth tracking

---

## ⚡ Quick Setup (30 min total)

### TODAY:
1. ✅ Sign up for Bitly (5 min)
2. ✅ Add Bitly credential to n8n (2 min)
3. ✅ Add link shortening nodes (15 min)
4. ✅ Create Google Sheets analytics template (5 min)
5. ✅ Add Google Sheets logging node (3 min)

### THIS WEEK:
6. ✅ Create "Update Analytics" workflow (15 min)
7. ✅ Test complete flow (10 min)
8. ✅ Monitor first week's data (ongoing)

---

## 🆘 Alternative: Simple Manual Tracking

If you don't want to set up automation yet:

### Option A: Bitly Manual
1. Manually shorten links in Bitly dashboard
2. Paste shortened links into email template
3. Check Bitly dashboard for clicks

**Time**: 10 min/week

### Option B: UTM Only
1. Add UTM parameters to all links manually
2. Track in Google Analytics (if you have a website)
3. View traffic sources in GA dashboard

**Time**: 5 min/week

### Option C: Mailjet Only
1. Use only Mailjet's built-in click tracking
2. See total clicks (not per-link)
3. Good enough to see overall engagement

**Time**: 0 min (automatic)

---

## ✅ After Setup Checklist

Test your analytics:
- [ ] Send test email to yourself
- [ ] Click voice chatbot button → Check Bitly shows +1 click
- [ ] Click affiliate product link → Check Bitly shows +1 click
- [ ] Check Google Sheets → See logged data
- [ ] Check Mailjet dashboard → See email opens
- [ ] Wait 24 hours → Run "Update Analytics" workflow
- [ ] Verify Google Sheets has updated click counts

---

## 📈 What You'll Learn from Analytics

### Week 1:
- How many people open emails?
- Which products get most clicks?
- Do people use voice chatbot?

### Week 2-4:
- Is open rate improving?
- Which trends resonate most?
- What time/day gets best engagement?

### Month 2-3:
- Subscriber growth rate
- Revenue per subscriber (from affiliates)
- Content optimization opportunities

---

## 💡 Pro Tips

### 1. Track Everything from Day 1
Don't wait! Analytics help you improve faster.

### 2. Weekly Review
Every Monday after sending, review:
- Open rate (target: >40%)
- Click rate (target: >20%)
- Voice chat clicks (shows engagement)
- Top products (focus on these)

### 3. A/B Testing
Try different:
- Subject lines
- Product placements
- CTA button text
- Send times

### 4. UTM Parameters
Always use consistent naming:
- `utm_source`: newsletter / instagram / tiktok
- `utm_medium`: email / social
- `utm_campaign`: week_5 / summer_2025
- `utm_content`: product_name / voice_chat

---

## 🎉 Summary

**Current**: ❌ No click tracking

**After setup**: ✅ Complete analytics
- Email opens/clicks (Mailjet)
- Individual link clicks (Bitly)
- Analytics dashboard (Google Sheets)
- Week-over-week trends
- Product performance tracking

**Time investment**: 30 minutes setup

**Ongoing time**: 0 minutes (automatic) + 5 min/week review

**Cost**: $0 (all free tiers)

---

*Track everything from day 1! Data helps you grow faster! 📊*
