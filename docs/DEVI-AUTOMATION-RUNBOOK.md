# 📚 Devi Automation Runbook

## Quick Reference Guide

This is your **one-stop operations manual** for running Devi automation.

---

## 🚀 Quick Start (First Time Setup)

### Step 1: Run Identity Setup (ONE TIME)
```bash
# In n8n:
1. Import: workflows/DEVI-SETUP-AUTOMATION.json
2. Click "Execute Workflow"
3. Follow instructions in each node:
   - Generate Midjourney face (30 min)
   - Clone ElevenLabs voice (20 min)
   - Create HeyGen avatar (20 min)
4. Upload identity files to GitHub devi-identity/
5. Mark as COMPLETE ✅
```

**Output:** `devi-identity/` folder with face, voice ID, avatar ID

**Cost:** $30-65 one-time

**⚠️ ONLY RUN THIS ONCE** - Weekly workflow reuses these assets

---

### Step 2: Add API Credentials
```bash
# In n8n: Settings → Credentials
- ElevenLabs API key
- HeyGen API key
- Instagram access token
- TikTok access token (optional)
- GitHub token (already configured)
- OpenAI API key (already configured)
- Google Sheets service account (already configured)
```

See: `docs/DEVI-API-INTEGRATIONS.md` for detailed setup

---

### Step 3: Test Weekly Workflow
```bash
# In n8n:
1. Open: "Fashion Insights - last version update 3"
2. Add new nodes from: docs/DEVI-WEEKLY-AUTOMATION-GUIDE.md
3. Click "Execute Workflow" (manual test)
4. Verify each branch:
   ✅ Content generates
   ✅ Voice generates
   ✅ Video generates
   ✅ Files save to GitHub
5. DO NOT enable auto-posting until tested!
```

---

### Step 4: Enable Automation
```bash
# In n8n workflow:
1. Verify: "📅 Every Monday 9 AM" trigger active
2. Set schedule: Cron expression `0 9 * * 1`
3. Save workflow
4. First automated run: Next Monday 9 AM
```

---

## 🔄 Weekly Operations

### Every Monday 9:00 AM (Automated)
**n8n workflow runs automatically:**

1. Get current week from File Tracker
2. Read Devi's past content (Week N-1)
3. Scrape fresh Instagram trends (50 posts)
4. Build master context (past + fresh)
5. Generate content via OpenAI:
   - Newsletter HTML
   - Blog post HTML
   - Instagram script
   - TikTok script
   - 23 Q&A pairs
6. Save all to GitHub `devi-content/week-X/`
7. Load identity assets (voice ID, avatar ID)
8. Generate voice (ElevenLabs)
9. Generate video (HeyGen, 2-10 min wait)
10. Save video to GitHub
11. Post to Instagram (if enabled)
12. Post to TikTok (if enabled)
13. Publish to WordPress (if enabled)
14. Log to File Tracker (Google Sheets)

**Duration:** 15-25 minutes (mostly video generation wait time)

---

### Every Monday 10:00 AM (Manual Check)

**Your tasks (10 minutes):**

1. **Verify workflow succeeded:**
   ```bash
   n8n → Executions → Check latest run
   Status: ✅ Success or ❌ Error?
   ```

2. **Check Instagram post:**
   ```bash
   Go to: instagram.com/devine.me
   Verify: New post visible
   Engagement: Check impressions/likes
   ```

3. **Check blog post:**
   ```bash
   Go to: devine.me/blog
   Verify: New post published
   ```

4. **Respond to comments (5 min):**
   - Instagram: Reply to top 3-5 comments
   - TikTok: Reply to top 3-5 comments
   - Keep Devi voice: "Hey loves!", warm, friendly

5. **Update tracking sheet:**
   ```bash
   Open: Google Sheet "Weekly Metrics"
   Log: Followers, impressions, costs
   ```

---

## 📊 Monitoring Dashboard

### Check These Metrics Weekly:

| Metric | Where to Check | Target |
|--------|----------------|--------|
| Newsletter subscribers | Lovable analytics | +10/week |
| Instagram followers | Instagram Insights | +50/week |
| Instagram engagement | Instagram Insights | >3% |
| TikTok views | TikTok Analytics | >1000/post |
| Blog views | WordPress analytics | +100/week |
| OpenAI cost | platform.openai.com/usage | <$5/week |
| ElevenLabs usage | elevenlabs.io/usage | <8k chars/week |
| HeyGen credits | app.heygen.com/credits | <3/week |
| **Total cost** | Sum of above | **<$20/week** |

---

## 🚨 Troubleshooting

### Workflow Failed (❌ Error in n8n)

**Step 1: Check execution log**
```bash
n8n → Executions → Click failed execution
Look for red error node
Read error message
```

**Common errors:**

| Error | Fix |
|-------|-----|
| "Node 'X' hasn't been executed" | Check connections, verify node names |
| "401 Unauthorized" | API key expired, refresh token |
| "Rate limit exceeded" | Wait 1 hour, reduce usage |
| "Video generation failed" | HeyGen credits depleted, buy more or skip video |
| "File not found" | GitHub path wrong, check devi-content/week-X/ exists |

**Step 2: Run workflow manually**
```bash
Click "Execute Workflow" button
Watch each node execute
Identify which node fails
Fix that node specifically
```

---

### Content Generation Fails

**Symptoms:**
- OpenAI node shows error
- Newsletter/blog HTML is empty
- Q&A pairs not generated

**Fixes:**
1. Check OpenAI API key valid:
   ```bash
   curl -H "Authorization: Bearer YOUR_KEY" https://api.openai.com/v1/models
   ```
   Expected: Returns list of models

2. Check OpenAI account has credits:
   ```bash
   platform.openai.com → Usage
   ```

3. Verify prompt not empty:
   ```bash
   Check "Build Master Context" node output
   Should have contextPrompt field with text
   ```

4. **Fallback:** Generate manually:
   ```bash
   Use ChatGPT to create content
   Save to GitHub manually
   Post manually
   ```

---

### Voice Generation Fails

**Symptoms:**
- ElevenLabs node shows error
- No audio file generated
- "Voice ID not found"

**Fixes:**
1. Check Voice ID correct:
   ```bash
   Go to: elevenlabs.io → Voices
   Click Devi voice → Copy Voice ID
   Update workflow node
   ```

2. Check ElevenLabs credits:
   ```bash
   elevenlabs.io → Usage
   Remaining: Should show >2000 chars
   ```

3. Check script length:
   ```bash
   Instagram script should be <1000 chars
   If too long, OpenAI might truncate
   ```

4. **Fallback:** Skip voice:
   ```bash
   Disable voice/video nodes
   Post image carousel instead
   ```

---

### Video Generation Fails

**Symptoms:**
- HeyGen node shows error
- Video timeout (>10 min)
- "Avatar ID not found"

**Fixes:**
1. Check Avatar ID correct:
   ```bash
   Go to: app.heygen.com → Avatars
   Click Devi avatar → Copy Avatar ID
   Update workflow node
   ```

2. Check HeyGen credits:
   ```bash
   app.heygen.com → Credits
   Remaining: Should show >2 credits
   ```

3. Check video processing status:
   ```bash
   HeyGen takes 2-10 min to process
   Add "Wait" node for 5 minutes
   Or use webhook callback
   ```

4. **Fallback:** Post without video:
   ```bash
   Use Devi face image + Instagram script text
   Post as carousel (3 slides)
   ```

---

### Instagram Posting Fails

**Symptoms:**
- Instagram node shows 401/403 error
- Post doesn't appear on @devine.me
- "Invalid access token"

**Fixes:**
1. Refresh Instagram access token:
   ```bash
   Instagram tokens expire every 60 days
   See: docs/DEVI-API-INTEGRATIONS.md → Instagram section
   Get new long-lived token
   Update n8n credentials
   ```

2. Check Instagram account not restricted:
   ```bash
   Log into Instagram manually
   Check for warnings/restrictions
   ```

3. Check video format:
   ```bash
   HeyGen output: MP4, 9:16 aspect ratio
   Instagram requires: MP4, H.264 codec
   If wrong format, re-generate or convert
   ```

4. **Fallback:** Post manually:
   ```bash
   Download video from GitHub devi-content/week-X/
   Post via Instagram app (2 min)
   ```

---

### TikTok Posting Fails

**Symptoms:**
- TikTok node shows error
- Video not on @devine.me TikTok
- "App not approved"

**Fixes:**
1. Check TikTok API status:
   ```bash
   developers.tiktok.com → My Apps
   Status should be: Approved
   If pending: Wait or post manually
   ```

2. Check access token:
   ```bash
   TikTok tokens expire every 30 days
   Refresh via OAuth flow
   ```

3. **Fallback:** Post manually (recommended for 90-day experiment):
   ```bash
   Download video from GitHub
   Post via TikTok app (2 min)
   Saves API approval hassle
   ```

---

## 💰 Cost Management

### Weekly Budget: $13.50

| Service | Budget | How to Check | Alert If |
|---------|--------|--------------|----------|
| OpenAI | $4.25 | platform.openai.com/usage | >$5 |
| ElevenLabs | $2.00 | elevenlabs.io/usage | >8k chars |
| HeyGen | $7.25 | app.heygen.com/credits | <2 credits left |

### If Over Budget:

**Option 1: Reduce content frequency**
- Post every 2 weeks instead of weekly
- Saves 50% costs

**Option 2: Skip video**
- Disable ElevenLabs + HeyGen nodes
- Post images only
- Saves $9.25/week

**Option 3: Use cheaper alternatives**
- D-ID instead of HeyGen ($5/mo vs $29/mo)
- GPT-3.5-turbo instead of GPT-4o-mini (50% cheaper)

**Option 4: Reduce scraping**
- Scrape 30 posts instead of 50
- Saves ~$0.75/week

---

## 🔒 Security Checklist

### Monthly (1st of month):
- [ ] Rotate GitHub token (90 days)
- [ ] Check OpenAI usage limits ($20/month max)
- [ ] Verify n8n backups exist
- [ ] Review File Tracker (no missing weeks)

### Quarterly (every 3 months):
- [ ] Audit all API keys (any compromised?)
- [ ] Review workflow permissions (least privilege)
- [ ] Update Devi persona docs if needed
- [ ] Backup all GitHub content locally

### Never Commit to GitHub:
- ❌ API keys
- ❌ Access tokens
- ❌ Passwords
- ❌ Service account JSON files

Use n8n credentials manager instead!

---

## 📞 Support Contacts

| Issue | Contact |
|-------|---------|
| n8n workflow bugs | n8n community forum |
| OpenAI API issues | platform.openai.com/support |
| ElevenLabs issues | support@elevenlabs.io |
| HeyGen issues | support@heygen.com |
| Instagram API | developers.facebook.com/support |
| TikTok API | developers.tiktok.com/support |

---

## 📁 File Locations

### Workflows:
- `workflows/DEVI-SETUP-AUTOMATION.json` (run once)
- `workflows/Fashion Insights - last version update 3` (weekly, extend this)

### Documentation:
- `docs/DEVI-AUTOMATION-RUNBOOK.md` (this file)
- `docs/DEVI-WEEKLY-AUTOMATION-GUIDE.md` (node-by-node setup)
- `docs/DEVI-API-INTEGRATIONS.md` (API credentials guide)
- `docs/DEVI-90DAY-EXPERIMENT.md` (testing plan)
- `DEVI-PERSONA.md` (Devi voice/tone)
- `DEVI-FULL-AUTOMATION-PLAN.md` (original plan)

### GitHub Structure:
```
ortall0201/n8n/
├── devi-identity/                    (created by setup workflow)
│   ├── face-primary.png
│   ├── face-variation-1.png
│   ├── voice-config.json
│   ├── heygen-avatar-id.json
│   └── identity-metadata.json
│
└── devi-content/                     (created by weekly workflow)
    ├── week-1/
    │   ├── chatbot-qa.json
    │   ├── blog-post.html
    │   ├── instagram-script.txt
    │   ├── instagram-video.mp4
    │   ├── tiktok-script.txt
    │   └── newsletter.html
    ├── week-2/ ...
    └── week-12/ ...
```

---

## 🎯 Success Checklist

### Week 1:
- [ ] Setup workflow run successfully
- [ ] Identity assets uploaded to GitHub
- [ ] First content generated
- [ ] First manual post live

### Week 4:
- [ ] Voice + video automation working
- [ ] Quality meets expectations
- [ ] Cost under $20/week

### Week 8:
- [ ] Instagram auto-posting working
- [ ] Self-awareness feature live
- [ ] 50+ newsletter subscribers

### Week 12:
- [ ] 100+ newsletter subscribers
- [ ] 500+ Instagram followers
- [ ] 90%+ automation success rate
- [ ] Decision: Continue or pivot?

---

## 🔄 Workflow Lifecycle

```
SETUP (Once)
  ↓
TEST (Weeks 1-2)
  ↓
ADD FEATURES (Weeks 3-10)
  ↓
OPTIMIZE (Weeks 11-12)
  ↓
DECISION
  ├─→ Continue (if successful)
  ├─→ Pivot (if partial success)
  └─→ Stop (if failed)
```

---

**Keep this runbook bookmarked for quick reference! 📚💜**
