# ⚡ Quick Start Checklist - Fashion Insights System

**Total Time**: ~30 minutes to get running!

---

## ✅ Step 1: Get Your API Keys (15 min)

### OpenAI (Required)
- **URL**: https://platform.openai.com/api-keys
- **Action**: Click "Create new secret key"
- **Copy**: Key starting with `sk-...`
- **Cost**: ~$1-2 per week

### Mailjet (Required - FREE)
- **URL**: https://www.mailjet.com/
- **Action**: Sign up → Account Settings → SMTP & API Settings
- **Copy**:
  - Username (your email or API key)
  - Password (API Secret)
  - Server: `in-v3.mailjet.com`
  - Port: `587`
- **Cost**: FREE (200 emails/day)

### Bright Data (Required)
- **URL**: https://brightdata.com/
- **Action**: Sign up → Datasets → Instagram Posts
- **Copy**:
  - API Token
  - Dataset ID (from dataset URL)
- **Cost**: ~$50-100/month

---

## ✅ Step 2: Start n8n (2 min)

```bash
cd C:\Users\user\Desktop\n8n
pnpm start
```

Then open: **http://localhost:5678**

---

## ✅ Step 3: Import Main Workflow (3 min)

1. In n8n: Click **"Workflows"** (left sidebar)
2. Click **"Add Workflow"** → **"Import from File"**
3. Select: **`workflows/fashion-insights-INFLUENCER-PRODUCTS.json`**
4. Click **"Import"**

✅ **You should see**: ~15 nodes with schedule, scraping, AI analysis, and Devi content generation

---

## ✅ Step 4: Add Credentials (5 min)

### A. OpenAI
1. Click **"Credentials"** (left sidebar)
2. Click **"Add Credential"** → Search **"OpenAI"**
3. Paste your API key (the `sk-...` one)
4. Click **"Save"**

### B. Mailjet (SMTP)
1. Click **"Add Credential"** → Search **"SMTP"**
2. Enter:
   - Host: `in-v3.mailjet.com`
   - Port: `587`
   - User: Your Mailjet username
   - Password: Your Mailjet password
3. Click **"Save"**

### C. Bright Data
1. Click **"Add Credential"** → Search **"HTTP Header Auth"**
2. Enter:
   - Name: `Bright Data API`
   - Header Name: `Authorization`
   - Header Value: `Bearer YOUR_BRIGHT_DATA_TOKEN`
3. Click **"Save"**

---

## ✅ Step 5: Connect Credentials to Nodes (3 min)

Go back to your workflow:

### OpenAI Node
1. Click on **"AI Fashion Analysis (OpenAI)"** node
2. In settings → **Credentials** → Select **"OpenAI Account"**

### SMTP Node
1. Click on **"Send Newsletter Email"** node (if you have one)
2. In settings → **Credentials** → Select your SMTP credential

### Bright Data Node
1. Click on **"Bright Data - Get Instagram Posts"** node
2. In settings → **Credentials** → Select **"Bright Data API"**
3. **IMPORTANT**: Update the URL with your Dataset ID:
   - Change: `YOUR_DATASET_ID_HERE`
   - To: Your actual Dataset ID (e.g., `gd_abcd1234xyz`)

---

## ✅ Step 6: Test Run (2 min)

1. Click **"Test workflow"** button (top-right)
2. Watch nodes turn green one by one
3. ✅ **All green** = Success!
4. ❌ **Any red** = Click the red node to see error

**Common Issues**:
- Red on Bright Data → Check API token and Dataset ID
- Red on OpenAI → Check API key is correct
- Red on Email → Check SMTP credentials

---

## ✅ Step 7: Activate Schedule (1 min)

1. Click the Schedule Trigger node (first node)
2. Verify: Every Monday at 9:00 AM
3. Toggle **"Active"** switch (top-right) to **ON**
4. Switch turns green ✅

**Done!** Your workflow will run automatically every Monday at 9 AM.

---

## 🎯 What Happens Now?

### Every Monday at 9 AM:
1. ✅ Scrapes 500-1000 Instagram posts
2. ✅ AI analyzes trends, colors, styles
3. ✅ Extracts products and links
4. ✅ Sends newsletter to subscribers
5. ✅ **Devi generates**:
   - Blog post content
   - Instagram carousel script
   - TikTok/Reels script
   - Affiliate links
   - Voice context

**Total runtime**: ~2 minutes

---

## 🔒 Security Status

✅ **All OpenAI nodes are secured** with:
- Prompt injection protection
- Clean language enforcement (no profanity)
- Domain restrictions (fashion only)
- Secrets protection

✅ **Optional**: Import `workflows/llm-security-gateway.json` for extra security layer (recommended but not required)

---

## 📊 Quick Reference

| Service | Credential Type | Where Used |
|---------|----------------|------------|
| **OpenAI** | API Key | AI Fashion Analysis node |
| **Mailjet** | SMTP | Send Newsletter Email node |
| **Bright Data** | HTTP Header Auth | Get Instagram Posts node |
| **Google Sheets** | OAuth2 (optional) | Get Subscribers node |

---

## ⚠️ Before First Run

- [ ] OpenAI credential added
- [ ] Mailjet credential added
- [ ] Bright Data credential added
- [ ] Bright Data URL updated with Dataset ID
- [ ] From Email address set in SMTP node
- [ ] Test run completed successfully (all green)
- [ ] Schedule active (green toggle)

---

## 🆘 Quick Troubleshooting

### "Credential not found"
→ Go to Credentials tab, create and save all credentials first

### "Cannot connect to Bright Data"
→ Check API token is correct AND Dataset ID is in the URL

### "OpenAI API error"
→ Check API key starts with `sk-` AND you have credits in OpenAI account

### "Email not sending"
→ Verify "From Email" is verified in Mailjet dashboard

---

## 📚 Full Documentation

For detailed guides, see:
- **Complete setup**: `START-HERE-SETUP-GUIDE.md`
- **Security details**: `SECURITY-README.md`
- **Devi persona**: `DEVI-PERSONA.md`
- **Troubleshooting**: `START-HERE-SETUP-GUIDE.md` (bottom section)

---

## 🎉 Success Indicators

You're ready when:
- ✅ n8n running at http://localhost:5678
- ✅ Workflow imported and active
- ✅ All credentials added and connected
- ✅ Test run shows all green nodes
- ✅ Schedule toggle is green

**Then wait for Monday 9 AM or click "Test workflow" to run manually!**

---

*Last Updated: 2025-11-27*
*Time to complete: ~30 minutes*
*Everything is secured and ready to go!*
