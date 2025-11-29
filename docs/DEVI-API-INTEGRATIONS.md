# 🔌 Devi API Integrations - Setup Guide

## Overview

This guide shows how to get API credentials for all external services Devi uses, and how to add them to n8n.

---

## 📋 Quick Reference

| Service | Purpose | Cost | Difficulty |
|---------|---------|------|------------|
| ElevenLabs | Voice generation | $5/mo | Easy |
| HeyGen | Video avatars | $29/mo | Easy |
| Instagram Graph API | Auto-posting | FREE | Medium |
| TikTok Creator API | Auto-posting | FREE | Hard |
| Bright Data | Scraping | $25/mo | Easy |
| OpenAI | Content gen | $4/week | Easy |
| GitHub | File storage | FREE | Easy |
| Google Sheets | Tracking | FREE | Easy |
| WordPress | Blog | $0-10/mo | Easy |

---

## 1️⃣ ElevenLabs Voice API

### What It Does:
Converts Devi's Instagram scripts to natural-sounding audio

### Cost:
- **Creator Plan:** $5/month
- Includes: 30,000 characters/month (~7,500/week)
- Devi usage: ~2,000 chars/week (well under limit)

### Setup Steps:

1. **Go to:** https://elevenlabs.io
2. **Sign up** for Creator plan ($5/month)
3. **Create voice:**
   - Click "Voices" → "Add Voice" → "Instant Voice Clone"
   - Record 1-2 min of sample audio (warm, friendly, enthusiastic)
   - Name it: "Devi Fashion Influencer"
4. **Get API key:**
   - Click profile icon → "API Keys"
   - Click "Generate API Key"
   - Copy the key (looks like: `sk_abc123...`)
5. **Get Voice ID:**
   - Click on your Devi voice
   - Copy Voice ID (looks like: `21m00Tcm4TlvDq8ikWAM`)

### Add to n8n:

1. Open n8n → Settings → Credentials
2. Click "Add Credential" → "HTTP Header Auth"
3. Name: `ElevenLabs API`
4. Header Name: `xi-api-key`
5. Header Value: `YOUR_API_KEY_HERE`
6. Save

### Test:
```bash
curl -X POST https://api.elevenlabs.io/v1/text-to-speech/YOUR_VOICE_ID \
  -H "xi-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text":"Hey loves! Testing Devi voice.","model_id":"eleven_monolingual_v1"}'
```

Expected: Returns MP3 audio file

---

## 2️⃣ HeyGen Video API

### What It Does:
Creates AI talking head videos using Devi's face and voice

### Cost:
- **Creator Plan:** $29/month
- Includes: 15 video credits (~15 minutes of video)
- Devi usage: ~2 min/week = 8 min/month (well under limit)

### Setup Steps:

1. **Go to:** https://app.heygen.com
2. **Sign up** for Creator plan ($29/month)
3. **Create Photo Avatar:**
   - Click "Avatars" → "Create Avatar" → "Photo Avatar"
   - Upload `devi-face-primary.png` (from Midjourney)
   - Wait 5-10 min for processing
   - Copy Avatar ID (looks like: `avatar_abc123xyz`)
4. **Get API key:**
   - Click profile → "API Keys"
   - Click "Generate API Key"
   - Copy the key

### Add to n8n:

1. Open n8n → Settings → Credentials
2. Click "Add Credential" → "HTTP Header Auth"
3. Name: `HeyGen API`
4. Header Name: `X-Api-Key`
5. Header Value: `YOUR_HEYGEN_API_KEY`
6. Save

### Test:
```bash
curl -X POST https://api.heygen.com/v1/video.generate \
  -H "X-Api-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "video_inputs": [{
      "character": { "type": "avatar", "avatar_id": "YOUR_AVATAR_ID" },
      "voice": { "type": "text", "input_text": "Hey loves! Testing Devi video." }
    }]
  }'
```

Expected: Returns `video_id` (check status at `/v1/video_status/VIDEO_ID`)

---

## 3️⃣ Instagram Graph API

### What It Does:
Auto-posts videos and carousels to @devine.me Instagram

### Cost:
- **FREE** (Instagram Graph API is free)

### Difficulty:
⚠️ **Medium** - requires Facebook Developer app + Business account

### Prerequisites:
1. Instagram account converted to **Business Account**
2. Facebook Page linked to Instagram
3. Facebook Developer account

### Setup Steps:

#### Step 1: Convert Instagram to Business
1. Open Instagram → Settings → Account
2. Switch to Professional Account → Business
3. Connect to Facebook Page (create one if needed)

#### Step 2: Create Facebook App
1. Go to: https://developers.facebook.com
2. Click "My Apps" → "Create App"
3. Type: **Business**
4. App Name: `Devi Automation`
5. Add Product: **Instagram Basic Display**
6. Add Product: **Instagram Graph API**

#### Step 3: Get Access Token
1. In your app → Tools → Graph API Explorer
2. Select your app in dropdown
3. Add permissions:
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_show_list`
   - `pages_read_engagement`
4. Click "Generate Access Token" → Login → Allow
5. Copy **User Access Token** (short-lived)

#### Step 4: Get Long-Lived Token
```bash
curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=SHORT_LIVED_TOKEN"
```

Returns: Long-lived token (60 days)

#### Step 5: Get Instagram Account ID
```bash
curl -X GET "https://graph.facebook.com/v18.0/me/accounts?access_token=YOUR_LONG_TOKEN"
```

Find your Facebook Page ID, then:

```bash
curl -X GET "https://graph.facebook.com/v18.0/PAGE_ID?fields=instagram_business_account&access_token=YOUR_LONG_TOKEN"
```

Copy `instagram_business_account.id` (this is your IG account ID)

### Add to n8n:

1. Open n8n → Settings → Credentials
2. Click "Add Credential" → "OAuth2 API"
3. Name: `Instagram Graph API`
4. Grant Type: `Access Token URL`
5. Access Token URL: `https://graph.facebook.com/v18.0/oauth/access_token`
6. Client ID: `YOUR_APP_ID`
7. Client Secret: `YOUR_APP_SECRET`
8. Scope: `instagram_basic,instagram_content_publish`
9. Save

### Test:
```bash
curl -X POST "https://graph.facebook.com/v18.0/YOUR_IG_ACCOUNT_ID/media?video_url=VIDEO_URL&caption=Test%20post&access_token=YOUR_TOKEN"
```

Expected: Returns `creation_id`

---

## 4️⃣ TikTok Creator API

### What It Does:
Auto-posts videos to @devine.me TikTok

### Cost:
- **FREE** (TikTok Creator API is free)

### Difficulty:
⚠️⚠️ **HARD** - TikTok API requires app review + strict guidelines

### Prerequisites:
1. TikTok Business Account
2. Approved TikTok Developer App (can take 1-4 weeks)

### Setup Steps:

#### Step 1: Create TikTok Developer Account
1. Go to: https://developers.tiktok.com
2. Sign in with TikTok account
3. Click "Register" → Fill application
4. Wait for approval (1-7 days)

#### Step 2: Create App
1. Dashboard → "Manage apps" → "Create new app"
2. App Name: `Devi Automation`
3. Industry: `Lifestyle`
4. Use case: `Content publishing`
5. Select APIs:
   - `Video.Upload`
   - `Video.Publish`
   - `User.Info.Basic`
6. Submit for review (wait 1-4 weeks ⚠️)

#### Step 3: OAuth Flow (After Approval)
1. Get Client Key & Client Secret from app dashboard
2. Redirect user to:
```
https://www.tiktok.com/v2/auth/authorize?client_key=YOUR_KEY&scope=user.info.basic,video.upload,video.publish&response_type=code&redirect_uri=YOUR_CALLBACK_URL
```
3. User authorizes
4. Exchange code for access token:
```bash
curl -X POST "https://open.tiktok.com/oauth/access_token/" \
  -H "Content-Type: application/json" \
  -d '{
    "client_key": "YOUR_CLIENT_KEY",
    "client_secret": "YOUR_CLIENT_SECRET",
    "code": "AUTH_CODE",
    "grant_type": "authorization_code"
  }'
```

### Add to n8n:

1. Store access token in n8n credentials as Bearer Auth
2. Refresh token expires in 30 days (needs manual refresh)

### Alternative (If TikTok API Rejected):
- **Manual posting:** Workflow generates video, you post manually (30 sec/week)
- **TikTok Business Suite:** Schedule posts in TikTok's own tool
- **Buffer/Hootsuite:** Use third-party scheduler ($15-30/month)

**Recommendation:** Skip TikTok auto-posting for 90-day experiment. Post manually (saves $30-65 setup time).

---

## 5️⃣ Bright Data Scraper API

### What It Does:
Scrapes Instagram posts from fashion influencers

### Cost:
- **Pay-as-you-go:** $3/GB
- Devi usage: ~$1.50/week (50 posts)

### Setup Steps:

1. **Go to:** https://brightdata.com
2. **Sign up** for account
3. **Create dataset:**
   - Dashboard → "Datasets" → "Create Dataset"
   - Select: **Instagram Post Discover**
   - Name: `Fashion Influencer Posts`
4. **Get API credentials:**
   - Dataset settings → "API Access"
   - Copy API key and Dataset ID
5. **Test scrape:**
   ```bash
   curl -X POST https://api.brightdata.com/datasets/v3/trigger \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -d '{
       "dataset_id": "YOUR_DATASET_ID",
       "data": [{"url": "https://instagram.com/voguemagazine/", "num_of_posts": 10}]
     }'
   ```

### Add to n8n:

Already configured in your workflow! Just verify:
- Node: "📸 Bright Data - Get Instagram Posts"
- Credentials: "Bearer Auth account"

---

## 6️⃣ OpenAI API

### What It Does:
Generates newsletter, blog, scripts, Q&A

### Cost:
- **GPT-4o-mini:** $0.15/1M input tokens, $0.60/1M output tokens
- Devi usage: ~$4.25/week

### Setup Steps:

1. **Go to:** https://platform.openai.com
2. **Create account** and add payment method
3. **Generate API key:**
   - Dashboard → "API Keys" → "Create new secret key"
   - Copy key (looks like: `sk-proj-abc123...`)
4. **Set usage limits:**
   - Settings → "Usage limits"
   - Set monthly limit: $20 (safety cap)

### Add to n8n:

Already configured! Check:
- Node: "🤖 OpenAI - Generate Q&A"
- Credentials: Should have OpenAI API key

---

## 7️⃣ GitHub API

### What It Does:
Stores all generated content (Q&A, blog, scripts, videos)

### Cost:
- **FREE** (public repos have unlimited storage for text files)
- Video files: Consider LFS if over 100MB total

### Setup Steps:

1. **Generate Personal Access Token:**
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Name: `n8n Devi Automation`
   - Scopes: `repo` (full control of private repositories)
   - Expiration: 90 days (for experiment)
   - Copy token (looks like: `ghp_abc123...`)

### Add to n8n:

Already configured! Check:
- Node: "💾 Save Q&A to GitHub"
- Credentials: GitHub token

---

## 8️⃣ Google Sheets API

### What It Does:
Logs file tracker (week numbers, URLs, timestamps)

### Cost:
- **FREE**

### Setup Steps:

1. **Create service account:**
   - Go to: https://console.cloud.google.com
   - Create project: `Devi Automation`
   - Enable Google Sheets API
   - Create service account
   - Download JSON key file

2. **Share sheet with service account:**
   - Open your File Tracker Google Sheet
   - Click Share
   - Add service account email (from JSON file)
   - Give "Editor" access

### Add to n8n:

Already configured! Check:
- Node: "📊 Google Sheets - Log File Tracker"
- Credentials: Service account JSON

---

## 9️⃣ WordPress REST API

### What It Does:
Auto-publishes blog posts to devine.me

### Cost:
- **FREE** (if you have WordPress hosting)
- Hosting: $5-10/month (Namecheap, Bluehost, etc.)

### Setup Steps:

1. **Enable REST API:**
   - WordPress admin → Settings → Permalinks
   - Select "Post name" (required for REST API)
   - Save

2. **Create application password:**
   - Users → Your profile
   - Scroll to "Application Passwords"
   - Name: `n8n Devi Automation`
   - Click "Add New Application Password"
   - Copy password (looks like: `abcd 1234 efgh 5678`)

3. **Test API:**
   ```bash
   curl -X POST https://yoursite.com/wp-json/wp/v2/posts \
     -u "username:application_password" \
     -H "Content-Type: application/json" \
     -d '{"title":"Test","content":"Test post","status":"draft"}'
   ```

### Add to n8n:

1. Create HTTP Request node for WordPress
2. Authentication: Basic Auth
3. Username: `your_wordpress_username`
4. Password: `application_password`

---

## 📊 Complete Credentials Checklist

Before running full automation, verify you have:

- ✅ ElevenLabs API key + Voice ID
- ✅ HeyGen API key + Avatar ID
- ✅ Instagram access token + IG Account ID
- ⚠️ TikTok access token (or skip for now)
- ✅ Bright Data API key + Dataset ID
- ✅ OpenAI API key
- ✅ GitHub Personal Access Token
- ✅ Google Sheets service account JSON
- ✅ WordPress application password

---

## 🧪 Testing Commands

### Test All APIs:
```bash
# ElevenLabs
curl -H "xi-api-key: YOUR_KEY" https://api.elevenlabs.io/v1/voices

# HeyGen
curl -H "X-Api-Key: YOUR_KEY" https://api.heygen.com/v1/avatars

# Instagram
curl "https://graph.facebook.com/v18.0/me?access_token=YOUR_TOKEN"

# GitHub
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.github.com/user

# OpenAI
curl -H "Authorization: Bearer YOUR_KEY" https://api.openai.com/v1/models

# WordPress
curl -u "user:pass" https://yoursite.com/wp-json/wp/v2/posts
```

All should return 200 OK (not 401 Unauthorized).

---

## 🚨 Security Best Practices

1. **Never commit API keys to GitHub**
   - Use n8n credentials manager
   - Add `.env` files to `.gitignore`

2. **Set usage limits:**
   - OpenAI: $20/month max
   - ElevenLabs: 30k chars/month
   - HeyGen: 15 credits/month

3. **Rotate tokens regularly:**
   - GitHub: 90 days
   - Instagram: 60 days
   - TikTok: 30 days

4. **Monitor costs weekly:**
   - Check dashboards every Monday
   - Alert if over $20/week

---

**All APIs configured = Ready to automate! 🚀**
