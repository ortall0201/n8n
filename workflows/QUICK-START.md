# Fashion Newsletter - Quick Start Guide

> Get your Shopify-integrated fashion newsletter running in 30-45 minutes!

---

## ⚡ What You'll Accomplish

By the end of this guide, you'll have:
- ✅ AI-powered fashion trend analysis from Instagram
- ✅ Automated Shopify product recommendations
- ✅ Google Sheets subscriber management
- ✅ Beautiful newsletter emails sent automatically

**Time needed:** 30-45 minutes
**Cost:** ~$0.01-0.05 per newsletter

---

## 🎯 Prerequisites (5 minutes)

Before starting, make sure you have:

1. **n8n running**
   - Local: http://localhost:5678
   - Or n8n Cloud account

2. **Shopify Store** with products
   - Any plan works
   - At least 10 products with images

3. **Google Account** (free)
   - For Google Sheets

4. **Email Account**
   - Gmail, Mailjet, or any SMTP

5. **OpenAI API Key**
   - Get at: https://platform.openai.com/api-keys
   - Add $5-10 credit

---

## 📥 Step 1: Import Workflow (2 minutes)

1. **Open n8n**: http://localhost:5678

2. **Click the menu icon** (☰ top left) → **Import from file**

3. **Select file**:
   ```
   C:\Users\user\Desktop\n8n\workflows\fashion-insights-SHOPIFY-INTEGRATION.json
   ```

4. **Click Import**

✅ You should see the workflow with ~17 nodes!

---

## 🔐 Step 2: Configure Credentials (20 minutes)

### 2.1 OpenAI API (5 min)

1. Click on **"AI Fashion Analysis (OpenAI)"** node
2. Click **"Credential to connect with"** dropdown
3. Click **"+ Create New Credential"**
4. Enter your **OpenAI API key** (starts with `sk-proj-...`)
5. Click **"Save"**

**Test it:**
- Click **"Test step"** on the node
- If error: check API key and credit balance

---

### 2.2 Shopify API (10 min)

#### Create Shopify App

1. Go to: **https://YOUR_STORE.myshopify.com/admin**
2. **Settings** → **Apps and sales channels** → **Develop apps**
3. Click **"Create an app"**
   - Name: `n8n Fashion Newsletter`
   - Developer: Your email
4. Click **"Configure Admin API scopes"**
5. Select these permissions:
   - ✅ `read_products`
   - ✅ `read_product_listings`
6. Click **"Save"** → **"Install app"**

#### Get API Credentials

1. Click **"API credentials"** tab
2. **Copy these:**
   - Admin API access token (starts with `shpat_...`)
   - API secret key
3. **Your shop subdomain**: `YOUR_STORE` (without .myshopify.com)

#### Add to n8n

1. In workflow, click **"Search Shopify Products"** node
2. Click **"Credential to connect with"** dropdown
3. Click **"+ Create New Credential"**
4. Fill in:
   - **Shop Subdomain**: YOUR_STORE
   - **Access Token**: shpat_...
   - **App Secret Key**: (from Shopify)
5. Click **"Save"**

**Test it:**
- Click **"Test step"** on the Shopify node
- You should see your products!

---

### 2.3 Google Sheets (3 min)

#### Create Subscriber Sheet

1. Go to: https://sheets.google.com
2. Click **"+ Blank"**
3. Name it: **"Fashion Newsletter Subscribers"**
4. Add headers in row 1:
   - A1: `email`
   - B1: `name`
   - C1: `status`
   - D1: `signup_date`
5. Add yourself in row 2:
   - A2: your-email@gmail.com
   - B2: Your Name
   - C2: active
   - D2: 2025-11-26

#### Connect to n8n

1. In workflow, click **"Get Subscribers from Google Sheets"** node
2. Click **"Credential to connect with"** dropdown
3. Click **"+ Create New Credential"**
4. Click **"Sign in with Google"**
5. Select your Google account → **Allow**
6. Click **"Save"**
7. In the node, select:
   - **Document**: Fashion Newsletter Subscribers
   - **Sheet Name**: Sheet1

**Test it:**
- Click **"Test step"**
- You should see your subscriber data!

---

### 2.4 Email SMTP (2 min)

**Option A: Gmail** (Easiest for testing)

1. Enable "App Passwords" in Gmail:
   - Go to: https://myaccount.google.com/apppasswords
   - Generate password for "Mail"
2. In workflow, click **"Send Fashion Newsletter"** node
3. Add SMTP credentials:
   - **Host**: smtp.gmail.com
   - **Port**: 587
   - **User**: your-email@gmail.com
   - **Password**: (App Password from step 1)

**Option B: Mailjet** (Better for production)

1. Sign up: https://www.mailjet.com (free: 200 emails/day)
2. Get SMTP credentials from account settings
3. Add to n8n (same as above)

---

## 🏷️ Step 3: Tag Your Shopify Products (5 min)

For best product matching, add tags to your Shopify products:

1. **Go to Shopify Admin** → **Products**
2. **Click on each product**
3. **Add relevant tags:**
   - Style tags: `oversized`, `minimalist`, `vintage`, `streetwear`
   - Color tags: `beige`, `black`, `burgundy`, `neutral`
   - Category: `blazer`, `dress`, `pants`, `shoes`
   - Trends: `sustainable`, `retro`, `modern`
4. **Click "Save"**

**Example:**
- Product: "Oversized Beige Blazer"
- Tags: `oversized, blazer, beige, neutral, minimalist`

**Tip:** More tags = better matching!

---

## ⚙️ Step 4: Update Workflow Settings (2 min)

### Update Store URL

1. Click on **"Format Product Recommendations"** node
2. Find line 17 (approximately):
   ```javascript
   url: `https://YOUR_SHOPIFY_STORE.myshopify.com/products/${product.handle}`,
   ```
3. Replace `YOUR_SHOPIFY_STORE` with your actual store name

### Update Email "From" Address

1. Click **"Send Fashion Newsletter"** node
2. Update **"From Email"** field to your verified email

---

## 🧪 Step 5: Test the Workflow (5 min)

### Test Individual Sections

**Test AI Analysis:**
1. Click on **"AI Fashion Analysis (OpenAI)"** node
2. Click **"Test step"**
3. Should see AI-generated fashion insights

**Test Shopify Products:**
1. Click on **"Search Shopify Products"** node
2. Click **"Test step"**
3. Should see products from your store

**Test Google Sheets:**
1. Click on **"Get Subscribers from Google Sheets"** node
2. Click **"Test step"**
3. Should see your subscriber list

### Run Full Workflow

1. Click **"Execute Workflow"** button (top right, play icon ▶)
2. Watch each node execute:
   - ✅ Instagram posts (mock or real)
   - ✅ AI analysis
   - ✅ Shopify products found
   - ✅ Subscribers loaded
   - ✅ Email sent!
3. **Check your inbox!** 📧

---

## ✅ Success Checklist

After running the workflow, verify:

- [ ] Workflow executed without errors
- [ ] AI insights look accurate
- [ ] Shopify products appear in email
- [ ] Product images display correctly
- [ ] Product links work (click "Shop Now")
- [ ] Email received in inbox (check spam if not)
- [ ] Email looks good on mobile (forward to phone)
- [ ] Subscriber name is personalized correctly

---

## 🐛 Quick Troubleshooting

### "OpenAI node failed"
- **Check:** API key is correct
- **Check:** OpenAI account has credit ($5+)
- **Fix:** Add credit at https://platform.openai.com/account/billing

### "No Shopify products found"
- **Check:** Shopify credentials are correct
- **Check:** Products are "Active" (not draft)
- **Check:** Products have tags matching trends
- **Fix:** Add more descriptive tags to products

### "Email not received"
- **Check:** SMTP credentials correct
- **Check:** "From" email is verified
- **Check:** Spam/Promotions folder
- **Check:** Subscriber email is correct in Google Sheet

### "Google Sheets not found"
- **Check:** Sheet name exactly matches
- **Check:** Google account has access to sheet
- **Fix:** Re-authenticate Google OAuth

---

## 🚀 Next Steps

### Immediate (Today)
1. ✅ Add 5-10 real subscribers to Google Sheet
2. ✅ Customize email subject line
3. ✅ Test with friends/family
4. ✅ Adjust product selection logic if needed

### This Week
1. 📊 Add 50-100 subscribers
2. 🎨 Customize email colors/fonts
3. 📈 Monitor open rates
4. 🔄 Run workflow 2-3 times to test consistency

### This Month
1. 🌐 Deploy to Hostinger (optional)
2. 📱 Create signup landing page
3. ⏰ Set up automation (weekly schedule)
4. 📊 Build analytics tracking

---

## 📋 Workflow Automation (Bonus)

### Schedule Automatic Sending

**Option 1: Replace Manual Trigger with Schedule**

1. **Delete** the "Start Scraper" node
2. **Add** a new **"Schedule Trigger"** node:
   - Type: `Interval`
   - Interval: `Weekly`
   - Day: `Monday`
   - Time: `09:00`
3. **Connect** to "Bright Data" node

**Option 2: Use Cron Expression**

1. Same as above, but:
   - Type: `Cron`
   - Expression: `0 9 * * 1` (Every Monday at 9 AM)

**Test automation:**
- Save workflow
- Wait for scheduled time
- Or use "Execute Workflow" to test manually

---

## 💡 Customization Ideas

### Change Number of Products
**Show 3 products instead of 5:**

1. Click **"Format Product Recommendations"** node
2. Change line 24:
   ```javascript
   for (let i = 0; i < 3 && selectedProducts.length < 3; i++) {
   ```

### Add Your Logo
**Add logo to email header:**

1. Click **"Prepare Email with Products"** node
2. Find header section (~line 85)
3. Add before `<h1>`:
   ```html
   <img src="https://your-logo-url.com/logo.png" width="120" style="margin-bottom: 10px;">
   ```

### Change Email Colors
**Customize gradient colors:**

1. Click **"Prepare Email with Products"** node
2. Find:
   ```css
   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
   ```
3. Replace with your brand colors:
   ```css
   background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
   ```

---

## 📊 Cost Calculator

### Per Newsletter Execution

| Service | Cost | Notes |
|---------|------|-------|
| OpenAI API | $0.01 | GPT-4o-mini analysis |
| Shopify API | $0.00 | Free with all plans |
| Google Sheets | $0.00 | Free API |
| Email (Mailjet) | $0.00 | Up to 200/day free |
| Bright Data | $0.10 | Optional (use mock for free) |
| **Total** | **$0.01-0.11** | **Per newsletter** |

### Monthly Cost Examples

**50 subscribers, weekly newsletter:**
- 4 newsletters/month × $0.11 = **$0.44/month**
- Cost per subscriber: **$0.009/month**

**500 subscribers, weekly newsletter:**
- 4 newsletters/month × $0.11 = **$0.44/month**
- Cost per subscriber: **$0.0009/month**

*Email cost scales with subscribers, but other costs stay the same!*

---

## 🎓 Learning Resources

### Video Tutorials (Search on YouTube)
- "n8n Workflows for Beginners"
- "Shopify API Integration Tutorial"
- "Email Marketing Automation with n8n"

### Documentation
- n8n Docs: https://docs.n8n.io
- Shopify API: https://shopify.dev/docs/api
- OpenAI API: https://platform.openai.com/docs

### Community
- n8n Forum: https://community.n8n.io
- n8n Discord: https://discord.gg/n8n

---

## 🎉 You're All Set!

Your fashion newsletter is now ready to:
- ✅ Analyze Instagram trends with AI
- ✅ Match trending styles to Shopify products
- ✅ Send personalized emails to subscribers
- ✅ Drive product sales automatically

### What You've Built

```
📸 Instagram → 🤖 AI → 🛍️ Shopify → 📧 Subscribers
   Fashion       Analysis   Products    Newsletter
   Posts         (OpenAI)   (Matched)   (Automated)
```

**Cost:** ~$0.01 per newsletter
**Time saved:** ~2-3 hours per newsletter
**ROI:** Priceless! 🚀

---

## 📞 Need Help?

### Quick Reference Files
- **This file:** Quick start guide
- **Full setup:** `SHOPIFY-INTEGRATION-SETUP.md`
- **Visual guide:** `WORKFLOW-DIAGRAM.md`
- **Overview:** `README-FASHION-NEWSLETTER.md`

### Support Channels
- n8n Community: https://community.n8n.io
- Shopify Forums: https://community.shopify.com
- OpenAI Support: https://help.openai.com

---

**🎊 Congratulations! Your fashion newsletter is live!**

**Next:** Send your first newsletter and share the results! 📧✨

---

*Last updated: November 26, 2025*
*Estimated completion time: 30-45 minutes*
*Difficulty: Beginner-Intermediate*
