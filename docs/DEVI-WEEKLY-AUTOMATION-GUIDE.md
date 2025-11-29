# 🔄 Devi Weekly Automation - Implementation Guide

## Overview

This guide shows how to **extend** your existing working workflow:
**"Fashion Insights - last version update 3"**

DO NOT create a new workflow from scratch. Instead, ADD new nodes to the existing workflow that already works (newsletter, Q&A, GitHub saving).

---

## 🎯 What We're Adding

Your current workflow already does:
- ✅ Scrape Instagram trends (Bright Data)
- ✅ Generate content (OpenAI - newsletter, blog, Instagram, TikTok, Q&A)
- ✅ Save to GitHub (`devi-content/week-X/`)
- ✅ Log to File Tracker (Google Sheets)

**NEW functionality to add:**
- 📖 **Read Devi's own past content** from GitHub (self-awareness)
- 📊 **Get current week from File Tracker** (smart week detection)
- 🧠 **Build master context** (past content + fresh trends)
- 🔑 **Load identity assets** (voice ID, avatar ID from setup workflow)
- 🎙️ **Generate voice** (ElevenLabs audio from Instagram script)
- 🎬 **Generate video** (HeyGen talking head from audio)
- 📱 **Post to Instagram** (Graph API with carousel)
- 📱 **Post to TikTok** (Creator API with video)
- 📝 **Publish to blog** (WordPress API)

---

## 📍 Where to Add New Nodes

### Current Flow (Simplified):
```
Monday 9 AM Trigger
  ↓
Workflow Controller
  ↓
Bright Data Scraper
  ↓
Devi Master Content Generator (OpenAI)
  ↓
[Split into 5 branches]
  ├─→ Save Q&A to GitHub → Parse Q&A
  ├─→ Save Blog to GitHub
  ├─→ Save Instagram to GitHub
  ├─→ Save TikTok to GitHub
  └─→ Log File Tracker (Google Sheets)
```

### NEW Flow (After Modifications):
```
Monday 9 AM Trigger
  ↓
Workflow Controller
  ↓
📊 NEW: Get Current Week from File Tracker  ← ADD THIS
  ↓
📖 NEW: Read Own Past Content from GitHub    ← ADD THIS
  ↓
Bright Data Scraper (EXISTING)
  ↓
🧠 NEW: Build Master Context (past + fresh)  ← ADD THIS
  ↓
Devi Master Content Generator (MODIFY THIS - add context)
  ↓
[Split into ENHANCED branches]
  ├─→ Save Q&A to GitHub → Parse Q&A (KEEP AS-IS)
  ├─→ Save Blog to GitHub → 📝 NEW: Publish to WordPress
  ├─→ Save Instagram to GitHub → 🎙️ Voice → 🎬 Video → 📱 Post Instagram
  ├─→ Save TikTok to GitHub → 📱 Post TikTok
  └─→ Log File Tracker (KEEP AS-IS)
```

---

## 🔨 NEW NODES TO ADD

### **Node 1: 📊 Get Current Week from File Tracker**

**Type:** Google Sheets
**Position:** Right after "Workflow Controller", before "Bright Data Scraper"
**Configuration:**
- Operation: Read Rows
- Document ID: (your File Tracker sheet ID)
- Sheet Name: `File Tracker`
- Range: `A:E` (all columns)
- Return All: Yes

**Code to add in next node to parse week:**
```javascript
// Get the last completed week from File Tracker
const fileTrackerRows = $('📊 Get Current Week from File Tracker').all();
const lastRow = fileTrackerRows[fileTrackerRows.length - 1].json;
const lastCompletedWeek = lastRow.week_number || 0;
const currentWeek = lastCompletedWeek + 1;

console.log(`📊 Last completed: Week ${lastCompletedWeek}, Current: Week ${currentWeek}`);

return { json: { currentWeek, lastCompletedWeek } };
```

**🤖 Automation:** Fully automated
**💰 Cost:** FREE

---

### **Node 2: 📖 Read Own Past Content from GitHub**

**Type:** Code (JavaScript)
**Position:** After "Get Current Week", before "Bright Data Scraper"
**Purpose:** Read Devi's own generated content from last week for context

**Code:**
```javascript
// 📖 READ DEVI'S OWN PAST CONTENT
// Self-awareness: Devi reads what she wrote last week

const currentWeek = $('📊 Get Current Week from File Tracker').first().json.currentWeek;
const lastWeek = currentWeek - 1;

if (lastWeek < 1) {
  console.log('📖 No past content (this is Week 1)');
  return {
    json: {
      hasPastContent: false,
      pastQA: [],
      pastBlog: '',
      pastInstagram: '',
      message: 'Week 1 - no past content to reference'
    }
  };
}

// Fetch last week's content from GitHub
const githubBaseUrl = 'https://raw.githubusercontent.com/ortall0201/n8n/master/devi-content';

async function fetchPastContent() {
  try {
    // Fetch Q&A
    const qaResponse = await fetch(`${githubBaseUrl}/week-${lastWeek}/chatbot-qa.json`);
    const qaData = qaResponse.ok ? await qaResponse.json() : null;

    // Fetch blog (first 500 chars for context)
    const blogResponse = await fetch(`${githubBaseUrl}/week-${lastWeek}/blog-post.html`);
    const blogHtml = blogResponse.ok ? await blogResponse.text() : '';
    const blogPreview = blogHtml.substring(0, 500);

    // Fetch Instagram script
    const instaResponse = await fetch(`${githubBaseUrl}/week-${lastWeek}/instagram-script.txt`);
    const instaScript = instaResponse.ok ? await instaResponse.text() : '';

    // Extract key topics and products from past content
    const topics = [];
    const products = [];

    if (qaData && qaData.qa_pairs) {
      qaData.qa_pairs.forEach(qa => {
        if (qa.category === 'trends') topics.push(qa.answer);
        if (qa.category === 'products') products.push(qa.answer);
      });
    }

    return {
      hasPastContent: true,
      lastWeek,
      pastQA: qaData ? qaData.qa_pairs : [],
      pastBlog: blogPreview,
      pastInstagram: instaScript,
      topics: topics.join(' '),
      products: products.join(' ')
    };

  } catch (error) {
    console.error('❌ Error fetching past content:', error);
    return { hasPastContent: false, error: error.message };
  }
}

const pastContent = await fetchPastContent();

console.log(`📖 Loaded ${pastContent.pastQA?.length || 0} past Q&A pairs from Week ${lastWeek}`);

return { json: pastContent };
```

**🤖 Automation:** Fully automated
**💰 Cost:** FREE (GitHub raw content is free)

---

### **Node 3: 🧠 Build Master Context**

**Type:** Code (JavaScript)
**Position:** After "Bright Data Scraper", before "Devi Master Content Generator"
**Purpose:** Merge past content + fresh trends into one context prompt

**Code:**
```javascript
// 🧠 BUILD MASTER CONTEXT
// Combines Devi's past content with fresh trends for continuity

const pastContent = $('📖 Read Own Past Content from GitHub').first().json;
const freshTrends = $('📸 Bright Data - Get Instagram Posts').all(); // All scraped posts
const currentWeek = pastContent.lastWeek ? pastContent.lastWeek + 1 : 1;

// Build context prompt for OpenAI
let contextPrompt = `DEVI WEEKLY CONTEXT - WEEK ${currentWeek}\n\n`;

// Add past content context if available
if (pastContent.hasPastContent) {
  contextPrompt += `📖 WHAT DEVI WROTE LAST WEEK (Week ${pastContent.lastWeek}):\n`;
  contextPrompt += `Topics covered: ${pastContent.topics}\n`;
  contextPrompt += `Products mentioned: ${pastContent.products}\n`;
  contextPrompt += `Instagram preview: "${pastContent.pastInstagram.substring(0, 200)}..."\n\n`;
  contextPrompt += `INSTRUCTION: Reference last week naturally. Examples:\n`;
  contextPrompt += `- "Last week I showed you..."\n`;
  contextPrompt += `- "Remember those metallic boots from last week? This week..."\n`;
  contextPrompt += `- "Building on last week's trend..."\n\n`;
} else {
  contextPrompt += `📖 This is WEEK 1 - no past content to reference.\n\n`;
}

// Add fresh trends
contextPrompt += `🆕 FRESH TRENDS THIS WEEK:\n`;
contextPrompt += `Scraped ${freshTrends.length} Instagram posts from top influencers.\n`;
contextPrompt += `Analyze these posts and identify what's trending NOW.\n\n`;

// Add Devi persona reminder
contextPrompt += `👤 REMEMBER DEVI'S VOICE:\n`;
contextPrompt += `- Warm, friendly, enthusiastic\n`;
contextPrompt += `- Catchphrases: "Hey loves!", "I'm OBSESSED with..."\n`;
contextPrompt += `- Always include newsletter CTA\n`;
contextPrompt += `- Family-friendly, no profanity\n`;
contextPrompt += `- Focus on wearable fashion, not just runway\n\n`;

return {
  json: {
    currentWeek,
    contextPrompt,
    hasPastContent: pastContent.hasPastContent,
    trendCount: freshTrends.length,
    ready: true
  }
};
```

**🤖 Automation:** Fully automated
**💰 Cost:** FREE

---

### **Node 4: MODIFY "Devi Master Content Generator"**

**Type:** OpenAI (existing node - modify prompt)
**What to change:** Add master context to the prompt

**Find this code in the existing node and ADD context:**
```javascript
// BEFORE (current prompt):
const prompt = `Generate fashion content based on these Instagram trends: ${trends}...`;

// AFTER (add context):
const masterContext = $('🧠 Build Master Context').first().json.contextPrompt;
const trends = $('📸 Bright Data - Get Instagram Posts').all();

const prompt = `${masterContext}\n\nINSTAGRAM TRENDS DATA:\n${JSON.stringify(trends)}\n\nNow generate content for Week ${currentWeek}...`;
```

**🤖 Automation:** Fully automated
**💰 Cost:** Same as before (~$4.25/week)

---

### **Node 5: 🔑 Load Identity Assets**

**Type:** Code (JavaScript)
**Position:** After "Save Instagram to GitHub", parallel to GitHub save nodes
**Purpose:** Load Devi's voice ID and avatar ID from setup workflow

**Code:**
```javascript
// 🔑 LOAD IDENTITY ASSETS
// Reads voice ID and avatar ID saved during setup

const githubBaseUrl = 'https://raw.githubusercontent.com/ortall0201/n8n/master/devi-identity';

async function loadIdentity() {
  try {
    // Load voice config
    const voiceResponse = await fetch(`${githubBaseUrl}/voice-config.json`);
    const voiceConfig = await voiceResponse.json();

    // Load avatar config
    const avatarResponse = await fetch(`${githubBaseUrl}/heygen-avatar-id.json`);
    const avatarConfig = await avatarResponse.json();

    return {
      voiceId: voiceConfig.voice_id,
      voiceSettings: voiceConfig.settings,
      avatarId: avatarConfig.avatar_id,
      avatarSettings: avatarConfig.settings,
      loaded: true
    };

  } catch (error) {
    console.error('❌ Failed to load identity assets:', error);
    throw new Error('Identity assets not found. Did you run DEVI-SETUP-AUTOMATION first?');
  }
}

const identity = await loadIdentity();

console.log(`🔑 Loaded Voice ID: ${identity.voiceId}, Avatar ID: ${identity.avatarId}`);

return { json: identity };
```

**🤖 Automation:** Fully automated
**💰 Cost:** FREE

---

### **Node 6: 🎙️ Generate Voice with ElevenLabs**

**Type:** HTTP Request
**Position:** After "Load Identity Assets"
**Purpose:** Convert Instagram script to audio

**Configuration:**
- Method: POST
- URL: `https://api.elevenlabs.io/v1/text-to-speech/{{$json.voiceId}}`
- Authentication: Bearer Token (add ElevenLabs API key)
- Headers:
  - `Content-Type`: `application/json`
- Body (JSON):
```json
{
  "text": "={{ $('💾 Save Instagram to GitHub1').first().json.instagram_script }}",
  "model_id": "eleven_monolingual_v1",
  "voice_settings": {
    "stability": 0.5,
    "similarity_boost": 0.75
  }
}
```
- Response Format: File
- Binary Property: `audio`

**🤖 Automation:** Fully automated
**💰 Cost:** ~$2.00/week (30k chars/month = 7.5k/week)

---

### **Node 7: 🎬 Generate Video with HeyGen**

**Type:** HTTP Request
**Position:** After "Generate Voice"
**Purpose:** Create talking head video

**Configuration:**
- Method: POST
- URL: `https://api.heygen.com/v1/video.generate`
- Authentication: Bearer Token (add HeyGen API key)
- Headers:
  - `Content-Type`: `application/json`
  - `X-Api-Key`: `YOUR_HEYGEN_API_KEY`
- Body (JSON):
```json
{
  "video_inputs": [{
    "character": {
      "type": "avatar",
      "avatar_id": "={{ $('🔑 Load Identity Assets').first().json.avatarId }}"
    },
    "voice": {
      "type": "audio",
      "audio_url": "={{ $('🎙️ Generate Voice with ElevenLabs').first().json.audioUrl }}"
    },
    "background": {
      "type": "color",
      "value": "#F5F5F5"
    }
  }],
  "dimension": {
    "width": 1080,
    "height": 1920
  },
  "aspect_ratio": "9:16"
}
```

**Note:** HeyGen video generation takes 2-10 minutes. Add a "Wait" node or webhook callback.

**🤖 Automation:** Fully automated (but slow)
**💰 Cost:** ~$7.25/week ($29/month ÷ 4 weeks)

---

### **Node 8: 💾 Save Video to GitHub**

**Type:** HTTP Request (GitHub API)
**Position:** After "Generate Video"
**Purpose:** Store video in GitHub for backup

**Configuration:**
- Method: PUT
- URL: `https://api.github.com/repos/ortall0201/n8n/contents/devi-content/week-{{$json.currentWeek}}/instagram-video.mp4`
- Authentication: Bearer Token (GitHub token)
- Body:
```json
{
  "message": "🎬 Week {{$json.currentWeek}} - Devi Instagram Video",
  "content": "={{$json.videoBase64}}"
}
```

**🤖 Automation:** Fully automated
**💰 Cost:** FREE

---

### **Node 9: 📱 Post to Instagram**

**Type:** HTTP Request (Instagram Graph API)
**Position:** After "Save Video to GitHub"
**Purpose:** Auto-post video to Instagram

**Prerequisites:**
1. Instagram Business Account
2. Facebook Developer App created
3. Access token with `instagram_content_publish` permission

**Configuration:**
- Method: POST
- URL: `https://graph.facebook.com/v18.0/{INSTAGRAM_ACCOUNT_ID}/media`
- Body:
```json
{
  "video_url": "={{$json.videoUrl}}",
  "caption": "={{$('💾 Save Instagram to GitHub1').first().json.instagram_caption}}",
  "access_token": "YOUR_INSTAGRAM_ACCESS_TOKEN"
}
```

Then add second node to publish:
- Method: POST
- URL: `https://graph.facebook.com/v18.0/{INSTAGRAM_ACCOUNT_ID}/media_publish`
- Body:
```json
{
  "creation_id": "={{$json.id}}",
  "access_token": "YOUR_INSTAGRAM_ACCESS_TOKEN"
}
```

**🤖 Automation:** Fully automated
**💰 Cost:** FREE (Instagram API is free)

---

### **Node 10: 📱 Post to TikTok**

**Type:** HTTP Request (TikTok Creator API)
**Position:** Parallel branch from "Save TikTok to GitHub"
**Purpose:** Auto-post video to TikTok

**Prerequisites:**
1. TikTok Business Account
2. TikTok Developer App
3. OAuth access token

**Configuration:**
- Method: POST
- URL: `https://open-api.tiktok.com/share/video/upload/`
- Headers:
  - `Authorization`: `Bearer YOUR_TIKTOK_ACCESS_TOKEN`
  - `Content-Type`: `multipart/form-data`
- Body:
```json
{
  "video": "={{$json.videoFile}}",
  "post_info": {
    "title": "={{$('💾 Save TikTok to GitHub1').first().json.tiktok_caption}}",
    "privacy_level": "PUBLIC",
    "disable_duet": false,
    "disable_comment": false,
    "disable_stitch": false
  }
}
```

**🤖 Automation:** Fully automated
**💰 Cost:** FREE (TikTok API is free)

---

### **Node 11: 📝 Publish to WordPress**

**Type:** HTTP Request (WordPress REST API)
**Position:** After "Save Blog to GitHub"
**Purpose:** Auto-publish blog post to WordPress

**Prerequisites:**
1. WordPress site with REST API enabled (default on modern WP)
2. Application Password or JWT token

**Configuration:**
- Method: POST
- URL: `https://yoursite.com/wp-json/wp/v2/posts`
- Authentication: Basic Auth (username + application password)
- Body:
```json
{
  "title": "Week {{$json.currentWeek}} Fashion Insights",
  "content": "={{$('💾 Save Blog to GitHub1').first().json.blog_html}}",
  "status": "publish",
  "categories": [1],
  "tags": ["fashion", "trends", "devi"]
}
```

**🤖 Automation:** Fully automated
**💰 Cost:** FREE (if you have WP hosting)

---

## 🔌 Connection Map

**Connect these nodes in sequence:**

1. **After "Workflow Controller":**
   - Add: `📊 Get Current Week from File Tracker`

2. **After "Get Current Week":**
   - Add: `📖 Read Own Past Content from GitHub`

3. **After "Read Own Past Content", BEFORE "Devi Master Content Generator":**
   - Add: `🧠 Build Master Context`

4. **After "Save Instagram to GitHub1" (parallel new branch):**
   ```
   Save Instagram to GitHub1
     ↓
   🔑 Load Identity Assets
     ↓
   🎙️ Generate Voice (ElevenLabs)
     ↓
   🎬 Generate Video (HeyGen)
     ↓
   💾 Save Video to GitHub
     ↓
   📱 Post to Instagram
   ```

5. **After "Save TikTok to GitHub1" (parallel branch):**
   ```
   Save TikTok to GitHub1
     ↓
   📱 Post to TikTok
   ```

6. **After "Save Blog to GitHub1" (parallel branch):**
   ```
   Save Blog to GitHub1
     ↓
   📝 Publish to WordPress
   ```

---

## 💰 Updated Weekly Cost

| Component | Weekly Cost |
|-----------|-------------|
| OpenAI GPT-4o-mini (content generation) | $4.25 |
| ElevenLabs Voice (2k chars) | $2.00 |
| HeyGen Video (2 min) | $7.25 |
| Instagram API | FREE |
| TikTok API | FREE |
| WordPress | FREE |
| **TOTAL** | **$13.50/week** |

**90-day experiment:** $13.50 × 12 weeks = **$162** (under $240 budget ✅)

---

## 🧪 Testing Plan

### Phase 1: Test Content Generation (DONE ✅)
- Run existing workflow manually
- Verify Q&A, blog, scripts generate
- Check GitHub saves work

### Phase 2: Test Self-Awareness (NEW)
1. Import nodes 1-4 (Get Week, Read Past, Build Context, Modify Generator)
2. Run workflow manually
3. Check execution log: Does it read Week 1 content?
4. Verify OpenAI prompt includes past content context
5. Check new content references last week

### Phase 3: Test Voice & Video (NEW)
1. Run setup workflow first (create voice/avatar)
2. Import nodes 5-7 (Load Identity, Voice, Video)
3. Test manually with hardcoded script
4. Verify: Does audio sound like Devi? Does video lip-sync?

### Phase 4: Test Social Posting (NEW - CAREFUL)
1. Use TEST Instagram/TikTok accounts first
2. Import nodes 8-11 (Save Video, Post Instagram, Post TikTok, WordPress)
3. Run manually, check posts appear
4. Only connect to REAL accounts after testing

### Phase 5: Full Automation
1. Connect all nodes
2. Run complete workflow end-to-end
3. Monitor execution time (expect 15-25 min due to video generation)
4. Schedule cron: Monday 9 AM

---

## 🚨 Important Notes

### Manual Steps Required:
1. **Run DEVI-SETUP-AUTOMATION.json first** to create identity assets
2. **Add API credentials** to n8n:
   - ElevenLabs API key
   - HeyGen API key
   - Instagram access token
   - TikTok access token
   - WordPress credentials
3. **Test on sandbox accounts** before posting to real @devine.me
4. **Monitor costs** weekly (check ElevenLabs/HeyGen usage)

### What's Fully Automated:
- ✅ Content generation (OpenAI)
- ✅ Reading past content (GitHub)
- ✅ Week detection (File Tracker)
- ✅ Voice generation (ElevenLabs)
- ✅ Video generation (HeyGen)
- ✅ Social posting (Instagram/TikTok APIs)
- ✅ Blog publishing (WordPress)

### What's NOT Automated:
- ❌ Creating Devi's face (Midjourney - manual once)
- ❌ Training voice (ElevenLabs - manual once)
- ❌ Creating avatar (HeyGen - manual once)
- ❌ Getting API credentials (manual setup)
- ❌ Responding to comments/DMs (future enhancement)

---

## 📁 Files Created

- ✅ `workflows/DEVI-SETUP-AUTOMATION.json` - One-time identity creation
- ✅ `docs/DEVI-WEEKLY-AUTOMATION-GUIDE.md` - This file (node-by-node guide)
- 🔜 `docs/DEVI-API-INTEGRATIONS.md` - API credential setup
- 🔜 `docs/DEVI-90DAY-EXPERIMENT.md` - Testing & metrics plan
- 🔜 `docs/DEVI-AUTOMATION-RUNBOOK.md` - Operations guide

---

## ✅ Next Steps

1. **Import DEVI-SETUP-AUTOMATION.json** into n8n
2. **Run setup workflow** to create Devi identity (face, voice, avatar)
3. **Open "Fashion Insights - last version update 3" workflow**
4. **Add NEW nodes** following this guide (start with nodes 1-4)
5. **Test incrementally** - don't add everything at once
6. **Verify each branch works** before connecting to real accounts
7. **Schedule weekly run** only after full testing complete

---

**Ready to build Devi's complete automation! 💜🤖**
