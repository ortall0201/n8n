# 🚀 START HERE - Complete Setup Guide

## Welcome! Let's Get Your System Running

This guide will walk you through **exactly what to do** to get your Fashion Insights newsletter + AI Influencer (Devi) system working.

**Don't worry - we'll do this step by step!** ✅

---

## 📋 What You're Setting Up

1. **Main Newsletter Workflow** - Analyzes Instagram, sends weekly emails
2. **Devi AI Influencer** - Creates blog posts, IG scripts, TikTok scripts
3. **Security Gateway** - Protects all AI from malicious inputs (optional but recommended)

**Total setup time**: ~30-45 minutes

---

## 🎯 PHASE 1: Essential Setup (Required)

### Step 1: Get Your API Keys (15 minutes)

You need these credentials before starting:

#### A. OpenAI API Key (Required)
**What it's for**: AI analysis of fashion trends

1. Go to: https://platform.openai.com/api-keys
2. Sign up or log in
3. Click **"Create new secret key"**
4. Copy the key (starts with `sk-...`)
5. **Save it somewhere safe!** (You can't see it again)

**Cost**: ~$0.50-2.00 per newsletter run (very cheap with gpt-4o-mini)

---

#### B. Mailjet SMTP (Required for sending emails)
**What it's for**: Sending newsletter emails to subscribers

1. Go to: https://www.mailjet.com/
2. Sign up for free account
3. Go to **Account Settings → SMTP & API Settings**
4. Copy:
   - **SMTP Username** (looks like an email or long string)
   - **SMTP Password** (API key)
   - **SMTP Server**: `in-v3.mailjet.com`
   - **Port**: `587`

**Cost**: FREE (up to 200 emails/day)

---

#### C. Bright Data / Instagram Scraping (Required)
**What it's for**: Getting Instagram posts for analysis

**Option A: Bright Data (Recommended - Easiest)**
1. Go to: https://brightdata.com/
2. Sign up for account
3. Go to **Datasets → Instagram Posts**
4. Get your **API Token**
5. Create a dataset and note the **Dataset ID**

**Cost**: ~$50-100/month for 500-1000 posts

**Option B: Apify (Alternative)**
1. Go to: https://apify.com/
2. Sign up for account
3. Find Instagram scraper actor
4. Get your **API Token**

**Cost**: Similar to Bright Data

---

#### D. Google Sheets (Optional - for storing data)
**What it's for**: Storing insights, subscriber list

1. Go to: https://console.cloud.google.com/
2. Create project
3. Enable Google Sheets API
4. Create Service Account
5. Download credentials JSON file

**Cost**: FREE

---

### Step 2: Import Main Workflow (5 minutes)

**What to import**: `fashion-insights-INFLUENCER-PRODUCTS.json`

**Instructions**:

1. **Open n8n**:
   ```bash
   cd C:\Users\user\Desktop\n8n
   pnpm start
   ```
   Then go to: http://localhost:5678

2. **Import Workflow**:
   - Click **"Workflows"** in left sidebar
   - Click **"Add Workflow"** dropdown → **"Import from File"**
   - Select: `workflows/fashion-insights-INFLUENCER-PRODUCTS.json`
   - Click **"Import"**

3. **You should see**: A workflow with ~20+ nodes
   - Weekly Schedule Trigger
   - Bright Data scraping
   - AI Fashion Analysis
   - Email sending
   - **NEW: Devi content generation nodes** (at the end)

---

### Step 3: Add Your Credentials (10 minutes)

Now let's add the API keys you copied earlier.

#### A. Add OpenAI Credential

1. In n8n, click **"Credentials"** (in left sidebar)
2. Click **"Add Credential"**
3. Search for **"OpenAI"**
4. Enter:
   - **API Key**: Paste your OpenAI key (sk-...)
5. Click **"Save"**

#### B. Add Mailjet SMTP Credential

1. Click **"Add Credential"** again
2. Search for **"SMTP"** or **"Mailjet"**
3. Enter:
   - **Host**: `in-v3.mailjet.com`
   - **Port**: `587`
   - **User**: Your Mailjet username
   - **Password**: Your Mailjet password
   - **From Email**: your-email@yourdomain.com (the email you verified in Mailjet)
4. Click **"Save"**

#### C. Add Bright Data Credential

1. Click **"Add Credential"**
2. Search for **"HTTP Header Auth"**
3. Enter:
   - **Name**: `Bright Data API`
   - **Header Name**: `Authorization`
   - **Header Value**: `Bearer YOUR_BRIGHT_DATA_TOKEN`
4. Click **"Save"**

#### D. Connect Credentials to Nodes

Go back to your workflow:

1. **Click on "Bright Data - Get Instagram Posts" node**
   - In node settings → **Credentials**
   - Select: `Bright Data API` (the one you just created)
   - **Also update the URL** with your Dataset ID

2. **Click on "AI Fashion Analysis (OpenAI)" node**
   - In node settings → **Credentials**
   - Select: `OpenAI Account` (the one you created)

3. **Click on "Send Newsletter Email" node** (if you have one)
   - In node settings → **Credentials**
   - Select: `SMTP/Mailjet` credential

---

### Step 4: Configure Important Settings (5 minutes)

#### A. Update Bright Data URL

In the **"Bright Data - Get Instagram Posts"** node:

**Find this line**:
```
url: "https://api.brightdata.com/datasets/v3/snapshot/YOUR_DATASET_ID_HERE"
```

**Replace `YOUR_DATASET_ID_HERE`** with your actual Dataset ID from Bright Data.

**Example**:
```
url: "https://api.brightdata.com/datasets/v3/snapshot/gd_abcd1234xyz"
```

---

#### B. Set Your Email Address

In the **"Send Newsletter Email"** node (or similar):

**Find**:
```json
{
  "fromEmail": "newsletter@fashioninsights.com",
  "toEmail": "={{ $json.email }}"
}
```

**Update `fromEmail`** to your actual verified email in Mailjet.

---

### Step 5: Test the Workflow (5 minutes)

**Let's make sure it works!**

1. **Click "Test workflow"** button (at top of n8n interface)
   - OR click **"Execute workflow"** button

2. **Watch the nodes execute**:
   - They should turn green one by one
   - If any turn red, click on it to see the error

3. **Common issues**:
   - **Red on Bright Data node**: Check API credentials and Dataset ID
   - **Red on OpenAI node**: Check API key is correct
   - **Red on Email node**: Check SMTP credentials

4. **If all green**: ✅ **SUCCESS!** Your workflow works!

---

## 🎯 PHASE 2: Devi AI Influencer (NEW - Already Included!)

**Good news**: Devi is already in your main workflow! 🎉

### What Devi Does Automatically

When your workflow runs, Devi will:
1. ✅ **Generate blog post content** (in Devi's voice)
2. ✅ **Create Instagram carousel script** (7 slides)
3. ✅ **Write TikTok/Reels script** (30-60 seconds)
4. ✅ **Add affiliate links** to products
5. ✅ **Update voice chat context**

### Where to Find Devi's Output

After running the workflow, Devi's content will be in:
- **Blog post**: Check the last few nodes for generated text
- **IG script**: JSON output with slides and captions
- **TikTok script**: Voiceover script with timing

**To use the content**:
- Copy the blog post text → Paste into your website
- Copy IG slides → Create carousel images with the text
- Copy TikTok script → Record video using the script

---

## 🎯 PHASE 3: Security Gateway (Optional - Recommended)

**What it does**: Protects your AI from malicious inputs (prompt injection, profanity, etc.)

**Good news**: This is optional for now. Your workflows already have basic security built in!

**If you want extra protection**:

1. **Import Security Gateway**:
   - Workflows → Import from File
   - Select: `workflows/llm-security-gateway.json`
   - Toggle **"Active"** ON

2. **Test it**:
   - Click **"Test workflow"**
   - Should run successfully
   - Note the webhook URL: `http://localhost:5678/webhook/llm-security-gateway`

3. **Integration** (advanced - skip for now):
   - See `docs/LLM_SECURITY_GATEWAY.md` for how to connect it

**For now**: Your workflows are already secure with the system prompts I added! ✅

---

## 📅 Schedule Your Newsletter (5 minutes)

### Make it Run Automatically Every Monday

Your workflow already has a **"Weekly Schedule Trigger"** node!

1. **Click on the Schedule Trigger node** (first node in workflow)

2. **Verify settings**:
   - **Rule**: Every week
   - **Day**: Monday
   - **Time**: 9:00 AM
   - **Timezone**: Check it matches your timezone

3. **Activate workflow**:
   - Toggle **"Active"** switch at top-right
   - Should turn from gray to green

4. **Now it will run automatically** every Monday at 9 AM! 🎉

---

## 👥 Add Subscribers (5 minutes)

### Option A: Manual Entry (Quick Start)

If you already have a subscriber list:

1. Create a Google Sheet with columns:
   - `email`
   - `name` (optional)

2. Add the **"Get Subscribers"** node in your workflow (if not already there)

3. Connect it to Google Sheets
   - Credentials → Add Google Sheets OAuth2
   - Follow authorization flow
   - Select your spreadsheet

### Option B: Newsletter Signup Form (Advanced - Skip for Now)

You can set up a signup form later using:
- `workflows/newsletter-signup-webhook.json`

**For now**: Just focus on getting the main workflow running!

---

## 🧪 Complete Test Checklist

Before going live, verify:

- [ ] **OpenAI credential works** (AI Fashion Analysis node runs)
- [ ] **Mailjet credential works** (can send test email)
- [ ] **Bright Data credential works** (gets Instagram posts)
- [ ] **Schedule trigger is active** (workflow will run Monday 9 AM)
- [ ] **All nodes turn green** when testing
- [ ] **Email sends successfully** (check your inbox)
- [ ] **Devi content generates** (see output in nodes)

---

## 🚨 Troubleshooting Common Issues

### Issue: "Credential not found"

**Fix**: Go to Credentials tab, make sure you created and saved all credentials.

---

### Issue: "Cannot connect to Bright Data"

**Fixes**:
1. Check API token is correct
2. Check Dataset ID is in the URL
3. Make sure you have credits in Bright Data account
4. Try running a test in Bright Data dashboard first

---

### Issue: "OpenAI API error"

**Fixes**:
1. Check API key is correct (starts with `sk-`)
2. Make sure you have credits in OpenAI account (add payment method)
3. Try with a different model (gpt-4o-mini is cheapest)

---

### Issue: "Email not sending"

**Fixes**:
1. Check SMTP credentials are correct
2. Verify email address in Mailjet dashboard
3. Make sure "From Email" is verified in Mailjet
4. Check Mailjet sending limits (200/day on free)

---

### Issue: "Workflow runs but no output"

**Fix**: Click on each node to see the data passing through. Check if any node has empty output.

---

## 📊 What Happens on Monday Morning

Here's the full flow when your workflow runs:

```
Monday 9:00 AM ⏰
    ↓
1. Scrape 500-1000 Instagram posts (30 seconds)
    ↓
2. AI analyzes trends, colors, styles (20 seconds)
    ↓
3. Extract products and links (5 seconds)
    ↓
4. Format insights report (5 seconds)
    ↓
5. ───┬─→ Generate newsletter email (10 seconds)
       │      ↓
       │   Send to subscribers (10 seconds)
       │
       └─→ Devi creates content (20 seconds):
              • Blog post
              • Instagram script
              • TikTok script
              • Affiliate links
              • Voice context

Total: ~2 minutes
```

**You'll receive**:
- ✅ Newsletter sent to all subscribers
- ✅ Devi's content ready to post (check n8n output)
- ✅ Trends data saved (if using Google Sheets)

---

## 💰 Expected Costs

| Service | Cost | What It's For |
|---------|------|---------------|
| **OpenAI API** | ~$1-3/week | AI trend analysis |
| **Mailjet** | FREE | Email sending (up to 200/day) |
| **Bright Data** | ~$50-100/month | Instagram scraping |
| **n8n** | FREE | Self-hosted automation |
| **Total** | ~$55-115/month | Complete system |

**If you get 1,000 subscribers** + monetize with affiliates = can earn $200-500/month (see `AFFILIATE-MONETIZATION-GUIDE.md`)

---

## 🎯 Your Next Actions (Priority Order)

### TODAY (30 minutes):
1. ✅ **Get API keys** (OpenAI, Mailjet, Bright Data)
2. ✅ **Import main workflow** (`fashion-insights-INFLUENCER-PRODUCTS.json`)
3. ✅ **Add credentials** to n8n
4. ✅ **Test workflow** (click "Test workflow" button)
5. ✅ **Activate schedule** (toggle "Active" ON)

### THIS WEEK:
6. ⏳ **Add first 10-50 subscribers** (friends, family, test group)
7. ⏳ **Wait for Monday 9 AM** (or trigger manually)
8. ⏳ **Check results** (did email send? did Devi generate content?)
9. ⏳ **Review Devi's output** (blog, IG, TikTok scripts)
10. ⏳ **Post first content** using Devi's scripts

### NEXT WEEK:
11. ⏳ **Set up affiliate accounts** (Amazon Associates, LTK)
12. ⏳ **Add affiliate links** to Devi's content
13. ⏳ **Promote newsletter** (grow to 100+ subscribers)
14. ⏳ **Generate Devi images** (using `DEVI-IMAGE-PROMPTS.md`)

---

## 🆘 Need Help?

### Quick Reference

| Issue | See Document |
|-------|--------------|
| **Setup steps** | This file (`START-HERE-SETUP-GUIDE.md`) |
| **Credentials help** | n8n docs: https://docs.n8n.io/credentials/ |
| **Devi system overview** | `DEVI-SYSTEM-README.md` |
| **Security info** | `SECURITY-README.md` |
| **Affiliate setup** | `AFFILIATE-MONETIZATION-GUIDE.md` |
| **Generate Devi images** | `DEVI-IMAGE-PROMPTS.md` |

### Can't Figure Something Out?

**Check these first**:
1. Is n8n running? (http://localhost:5678)
2. Are all credentials saved in n8n?
3. Do nodes turn green when testing?
4. Any red error icons? (click them to see details)

---

## ✅ Success Checklist

You're ready to launch when:

- [x] n8n is running
- [ ] OpenAI credential added and working
- [ ] Mailjet credential added and working
- [ ] Bright Data credential added and working
- [ ] Main workflow imported
- [ ] Test run completed successfully (all green nodes)
- [ ] Schedule trigger is active (Monday 9 AM)
- [ ] At least 10 subscribers added (for testing)
- [ ] Test email received in inbox
- [ ] Devi content generated successfully

**When all checked**: 🎉 **You're ready to go!**

---

## 🚀 Launch Day (Monday)

On Monday morning:

1. **Check your email** (you should receive the newsletter)
2. **Log into n8n** → Check workflow execution history
3. **Review Devi's content**:
   - Find the output in node results
   - Copy blog post text
   - Copy IG carousel script
   - Copy TikTok script
4. **Post content**:
   - Publish blog post to your website
   - Create IG carousel using Devi's script
   - Record TikTok using Devi's voiceover

**Celebrate!** 🎉 Your automated fashion insights system is live!

---

## 📌 Remember

✅ **Start simple**: Get main workflow running first
✅ **Test thoroughly**: Use small subscriber list initially
✅ **Review outputs**: Check Devi's content before posting
✅ **Grow gradually**: Add more subscribers over time
✅ **Monetize later**: Focus on content quality first

**You've got this!** 💪

---

*Last Updated: 2025-11-27*
*Version: 1.0*
*Questions? Check the docs folder or the troubleshooting section above!*
