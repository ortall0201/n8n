# Instagram Fashion Insights - Setup Guide

> Mock version with test data - Perfect for learning and testing locally!

---

## What This Workflow Does

🎯 **Scrapes Instagram fashion posts** (mock data for testing)
🤖 **Analyzes trends with AI** (OpenAI GPT-4o-mini)
📊 **Generates actionable insights** for fashion businesses

---

## Workflow Flow

```
Start Scraper (Manual Trigger)
    ↓
Mock Instagram Posts (10 fashion posts with realistic data)
    ↓
Filter Quality Posts (>1000 likes only)
    ↓
Prepare AI Analysis (Create analysis prompt)
    ↓
AI Fashion Analysis (OpenAI GPT-4o-mini)
    ↓
Extract AI Response
    ↓
Format Final Report
```

---

## What You'll Get

**Fashion Insights Report with:**
- ✅ Top 5 trending styles
- ✅ Popular colors this season
- ✅ Rising hashtags
- ✅ Key brands mentioned
- ✅ Overall sentiment
- ✅ Business recommendations

---

## Setup Instructions

### Step 1: Import the Workflow

1. **Open your n8n:** http://localhost:5678

2. **Click "⋮" menu** (top right) → **"Import from file"**

3. **Select file:**
   ```
   C:\Users\user\Desktop\n8n\workflows\fashion-insights-instagram-mock.json
   ```

4. **Click "Import"**

✅ Workflow is now imported!

---

### Step 2: Setup OpenAI Credentials

**You need an OpenAI API key** to run the AI analysis.

#### Get OpenAI API Key (If you don't have one):

1. **Go to:** https://platform.openai.com/api-keys

2. **Sign up** or **log in**

3. **Click "Create new secret key"**

4. **Copy the key** (looks like: `sk-proj-...`)

5. **Add $5-10 credit** to your OpenAI account (Settings → Billing)

#### Add to n8n:

1. **In the workflow, click on the "AI Fashion Analysis (OpenAI)" node**

2. **Click "Credential to connect with"** dropdown

3. **Click "+ Create New Credential"**

4. **Paste your OpenAI API key**

5. **Click "Save"**

✅ OpenAI is now connected!

---

### Step 3: Test the Workflow

1. **Click "Test workflow"** button (top right, play icon ▶)

2. **Watch the execution:**
   - Mock Instagram Posts → ✅ (10 posts generated)
   - Filter Quality Posts → ✅ (High-engagement posts)
   - Prepare AI Analysis → ✅ (Prompt created)
   - AI Fashion Analysis → ✅ (OpenAI analyzes trends)
   - Format Final Report → ✅ (Structured insights)

3. **Click on "Format Final Report" node**

4. **See your fashion insights!**

Expected output:
```json
{
  "report_title": "Instagram Fashion Insights - November 25, 2025",
  "posts_analyzed": 10,
  "top_trends": [
    "Oversized blazers",
    "Cargo pants revival",
    "Sustainable fashion",
    "Chunky sneakers",
    "Neutral/monochrome palettes"
  ],
  "popular_colors": ["beige", "cream", "burgundy", "forest green"],
  "popular_styles": ["streetwear", "minimalist", "vintage"],
  "rising_hashtags": ["#cargopants", "#sustainablefashion", "#ootd"],
  "key_brands": ["Burberry", "Max Mara", "Reformation"],
  "sentiment": "positive",
  "summary": "Fall 2025 fashion shows strong trends...",
  "recommendations": [
    "Focus on sustainable fashion marketing",
    "Stock oversized outerwear",
    "Emphasize neutral color palettes"
  ]
}
```

✅ **Workflow working!**

---

## Understanding the Mock Data

The workflow includes **10 realistic Instagram fashion posts** with:

**Post Examples:**
- Oversized blazer trends (#fashion, #streetstyle)
- Monochrome/neutral tones (#minimalist)
- Cargo pants revival (#streetwear)
- Vintage/sustainable fashion (#thrifted)
- Bold colors for fall (#colorblock)
- Luxury investment pieces (#designer)
- Chunky sneakers (#sneakerhead)
- Romantic cottagecore (#feminine)
- Professional workwear (#powerdressing)

**Each post includes:**
- Username (realistic fashion accounts)
- Caption (authentic fashion commentary)
- Likes & comments (realistic engagement)
- Hashtags (trending fashion tags)
- Engagement rate
- Posted date

---

## Cost Estimate

**OpenAI API usage:**
- Model: GPT-4o-mini (cheapest option)
- Cost per analysis: ~$0.005-0.01 (less than 1 cent)
- 100 analyses: ~$0.50-1.00

**Very affordable for testing and even production use!**

---

## Next Steps After Testing

### Phase 2: Add Real Instagram Data

Once you've perfected the workflow logic:

1. **Install Instagram node:**
   ```
   Settings → Community Nodes → Install
   Package: n8n-nodes-instagram-integrations
   ```

2. **Replace "Mock Instagram Posts" node** with:
   - Instagram Integrations node
   - Search by hashtag
   - Real data collection

3. **Setup Instagram Business account** (see main guide)

---

### Phase 3: Add Output Options

Add one or more output nodes after "Format Final Report":

**Option 1: Google Sheets** (Track trends over time)
```
Google Sheets → Append Row
Sheet: Fashion Insights
Columns: Date, Top Trends, Colors, Brands, etc.
```

**Option 2: Email Report** (Daily digest)
```
Gmail → Send Email
To: team@yourcompany.com
Subject: Daily Fashion Insights
Body: {{ $json.summary }}
```

**Option 3: Slack Notification** (Team alerts)
```
Slack → Send Message
Channel: #fashion-insights
Message: New trends detected: {{ $json.top_trends }}
```

**Option 4: Notion Database** (Knowledge base)
```
Notion → Create Database Item
Database: Fashion Trends
Properties: Date, Trends, Colors, Recommendations
```

---

## Customization Ideas

### Change Search Focus

Edit "Mock Instagram Posts" node to test different fashion niches:

**Luxury Fashion:**
```javascript
// Add hashtags: #luxuryfashion, #designer, #couture
// Focus on high-end brands
```

**Sustainable Fashion:**
```javascript
// Add hashtags: #sustainablefashion, #ecofashion, #slowfashion
// Focus on ethical brands
```

**Streetwear:**
```javascript
// Add hashtags: #streetwear, #hypebeast, #sneakerhead
// Focus on urban style
```

### Adjust AI Analysis

Edit "Prepare AI Analysis" node prompt to focus on:
- Specific demographics (Gen Z, Millennials)
- Seasonal trends (Spring/Summer vs Fall/Winter)
- Regional preferences (EU vs US vs Asia)
- Price points (budget vs luxury)

---

## Troubleshooting

### Issue: "OpenAI node failed"

**Causes:**
- No API key configured
- Invalid API key
- No OpenAI credit

**Solutions:**
1. Check OpenAI credentials in node
2. Verify API key is valid
3. Add credit to OpenAI account (min $5)

---

### Issue: "No output in Format Final Report"

**Cause:** AI response not in expected JSON format

**Solution:**
- Check "Extract AI Response" node output
- AI sometimes adds markdown formatting
- The "Format Final Report" node handles this automatically

---

### Issue: "Workflow runs but data looks wrong"

**Cause:** Mock data not realistic enough for your use case

**Solution:**
- Edit "Mock Instagram Posts" node
- Customize the mock posts for your specific fashion niche
- Add more posts (currently 10, can add 50-100)

---

## Performance Tips

**Speed up analysis:**
- Use GPT-4o-mini (current, fastest and cheapest)
- Reduce maxTokens to 1000 for shorter responses
- Filter to top 20 posts instead of all

**Reduce costs:**
- Already using cheapest model (GPT-4o-mini)
- Cache results (run daily, not hourly)
- Batch multiple hashtags in one analysis

---

## What's Different from Production?

**Mock Version (Current):**
- ✅ 10 hardcoded fashion posts
- ✅ Tests entire workflow logic
- ✅ Perfect for learning and testing
- ✅ No Instagram API setup needed
- ✅ Runs 100% locally

**Production Version (Future):**
- 🔄 Real Instagram data via API
- 🔄 Live hashtag searches
- 🔄 Hundreds of posts analyzed
- 🔄 Requires Instagram Business account
- 🔄 Runs on schedule (daily/hourly)

**The logic is identical!** Once this works, switching to real Instagram data is just replacing one node.

---

## Learning Objectives

By testing this workflow, you'll learn:

1. ✅ **How to structure data** for AI analysis
2. ✅ **How to write AI prompts** for specific insights
3. ✅ **How to parse AI responses** reliably
4. ✅ **How to format output** for business use
5. ✅ **How Code nodes work** in n8n
6. ✅ **How to chain nodes** for complex workflows

---

## Ready to Test!

1. **Import the workflow** ✅
2. **Add OpenAI API key** ✅
3. **Click "Test workflow"** ✅
4. **Review fashion insights** ✅

**Time needed:** 5-10 minutes
**Cost:** ~$0.01 per test

---

## Next: Add Real Instagram

When you're ready for real data:
- See: `best_practice.md` for Instagram API setup
- Install: `n8n-nodes-instagram-integrations`
- Replace: Mock node with Instagram node
- Scale: Analyze hundreds of posts daily

🚀 **Start testing your fashion insights workflow now!**
