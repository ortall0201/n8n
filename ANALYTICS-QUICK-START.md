# 📊 Analytics Quick Start - 20 Minutes Setup

**Goal**: Track every click on affiliate links, voice chatbot button, and newsletter CTAs

**Time**: 20 minutes
**Cost**: $0 (all free tools)

---

## ⚡ Fast Track Setup

### Step 1: Sign Up for Bitly (3 min)

1. Go to: https://bitly.com/
2. Sign up (FREE account)
3. After signup, go to: **Settings** → **API** → **Generate Access Token**
4. Copy your token: `abc123xyz456def789...`
5. Save it somewhere (you'll need it in Step 3)

**What you get**:
- 50 shortened links per month (FREE)
- Click tracking on all links
- Location/referrer data

---

### Step 2: Create Google Sheets Dashboard (5 min)

1. Create new Google Sheet
2. Name it: `Fashion Newsletter Analytics`
3. Create 3 tabs:

#### Tab 1: "Overview"
**Row 1 (headers)**:
```
week_number | issue_date | emails_sent | open_rate | total_clicks | voice_chat_clicks | affiliate_clicks | top_product | timestamp
```

#### Tab 2: "Link Clicks"
**Row 1 (headers)**:
```
week_number | link_id | link_type | product_name | short_url | long_url | total_clicks | last_updated
```

#### Tab 3: "Raw Data"
**Row 1 (headers)**:
```
timestamp | week_number | event_type | link_id | details | user_email
```

**Done!** Keep this sheet open, you'll connect it in Step 4.

---

### Step 3: Import Analytics Nodes to n8n (10 min)

#### A. Open Your Main Workflow

1. Open n8n: http://localhost:5678
2. Open workflow: "Instagram Fashion Insights - Influencer Products + Voice AI"

#### B. Import Analytics Nodes

1. Download: `analytics-nodes-to-add.json`
2. Open in n8n: **Workflows** → **Import from File**
3. This opens as a NEW workflow
4. **Select all nodes** (Ctrl+A)
5. **Copy** (Ctrl+C)
6. Go back to your MAIN workflow
7. **Paste** (Ctrl+V)

**You now have 7 new nodes**:
1. Prepare Links for Bitly + UTM
2. Bitly - Shorten Links
3. Aggregate Shortened Links
4. Prepare Analytics for Google Sheets
5. Google Sheets - Log Overview
6. Split Link Tracking for Sheets
7. Google Sheets - Log Link Clicks

#### C. Connect Analytics Nodes

**Find the "Devi Affiliate Processor" node** (it already exists in your workflow)

**Connect**:
```
Devi Affiliate Processor
    ↓
Prepare Links for Bitly + UTM (NEW)
    ↓
Bitly - Shorten Links (NEW)
    ↓
Aggregate Shortened Links (NEW)
    ↓
[Goes to your existing "Prepare Email" node]
    ↓
[After email sends...]
    ↓
Prepare Analytics for Google Sheets (NEW)
    ↓
Split into two branches:
    1. Google Sheets - Log Overview (NEW)
    2. Split Link Tracking → Google Sheets - Log Link Clicks (NEW)
```

#### D. Update 4 Things

**1. Add Your Bitly Token**

Click: "Bitly - Shorten Links" node

Find: `Authorization: Bearer YOUR_BITLY_ACCESS_TOKEN_HERE`

Replace with: `Bearer [your actual Bitly token from Step 1]`

**2. Update Landing Page URL**

Click: "Prepare Links for Bitly + UTM" node

Find: `const LANDING_PAGE_URL = 'https://your-project.lovable.app';`

Replace with: Your actual Lovable URL (or keep localhost for testing)

**3. Add Google Sheets Credential**

Click: "Google Sheets - Log Overview" node

Click: **Credentials** dropdown → **+ Create New**

Click: **OAuth2 Connect** → Authorize your Google account

Select: Your "Fashion Newsletter Analytics" spreadsheet

Repeat for "Google Sheets - Log Link Clicks" node (use same credential)

**4. Update Spreadsheet ID in Both Nodes**

After adding credential, the spreadsheet should auto-select.

If not:
- Click node → **Document** dropdown → Select your spreadsheet
- **Sheet** dropdown → Select "Overview" (for first node) or "Link Clicks" (for second node)

---

### Step 4: Update Email Template to Use Short Links (2 min)

#### A. Find "Prepare Email with Products" Node

This is the big code node that creates your email HTML.

#### B. Update Product Links

**Find this line** (~line 400):
```javascript
<a href="${product.link}" style="...">Shop →</a>
```

**Replace with**:
```javascript
<a href="${product.short_link}" style="...">Shop →</a>
```

#### C. Update Voice Chatbot Button

**Find this line** (~line 450):
```javascript
<a href="http://localhost:8080" style="...">Try Voice Chat Now 🎤</a>
```

**Replace with**:
```javascript
<a href="${voiceChatLink}" style="...">Try Voice Chat Now 🎤</a>
```

#### D. Add Variables to Top of Code

**At the very top of the code** (line ~2), add:
```javascript
const content = $('Aggregate Shortened Links').first().json;
const voiceChatLink = content.voice_chat_link;
const newsletterSignupLink = content.newsletter_signup_link;
```

**Original line** (~line 3):
```javascript
const insights = $('Format Final Report').first().json;
```

**Change to**:
```javascript
const insights = content; // Now using content from Aggregate Shortened Links
```

---

## ✅ Test Your Analytics (3 min)

### A. Run Workflow

1. Click **"Manual Test Trigger"**
2. Click **"Execute workflow"**
3. Wait 2-3 minutes

### B. Check Bitly Dashboard

1. Go to: https://app.bitly.com/
2. Click: **Links**
3. You should see ~10 new shortened links:
   - `bit.ly/3abc123` - Oversized Blazer - Week 5
   - `bit.ly/3def456` - Voice Chat CTA Button - Week 5
   - `bit.ly/3ghi789` - Luxury Handbag - Week 5
   - etc.

### C. Check Google Sheets

1. Open: "Fashion Newsletter Analytics"
2. **Overview tab**: Should have 1 new row with week number, emails sent, etc.
3. **Link Clicks tab**: Should have ~10 rows (one per tracked link)

### D. Test Clicking

1. Check your email (add yourself to subscribers first!)
2. Click: "Try Voice Chat Now" button
3. Go to Bitly dashboard → Refresh
4. Your voice chat link should show: **1 click**

**Success!** Analytics are working! 🎉

---

## 📊 What You Can Now Track

### 1. Mailjet Dashboard (Automatic)
- Open your Mailjet account
- Go to: **Statistics**
- See:
  - Emails sent: 150
  - Opened: 87 (58%)
  - Clicked: 42 (28%)
  - Bounced: 3

### 2. Bitly Dashboard
- Go to: https://app.bitly.com/
- Click: **Links**
- For each link see:
  - Total clicks
  - Clicks over time (chart)
  - Click locations (countries)
  - Referrers (where clicks came from)

### 3. Google Sheets Dashboard
- **Overview tab**: Weekly summary
  ```
  Week 5 | 2025-01-27 | 150 emails | Pending | 0 | 0 | 0 | Oversized Blazer
  ```

- **Link Clicks tab**: Individual link performance
  ```
  Week 5 | product_0 | affiliate | Oversized Blazer | bit.ly/3abc | ... | 0 clicks
  Week 5 | voice_chatbot_button | voice_chat | Voice Chat CTA | bit.ly/3def | ... | 0 clicks
  ```

**Note**: Click counts show "0" initially. They update as people click! Check Bitly dashboard for real-time clicks.

---

## 🔄 Updating Click Counts (Optional Advanced)

To automatically update Google Sheets with click counts from Bitly:

### Create "Update Analytics" Workflow (15 min)

**Later when you're ready**, create a second workflow that:
1. Runs daily (Schedule Trigger: 10 AM)
2. Fetches click data from Bitly API
3. Updates Google Sheets with current click counts

**Guide**: See `ADD-ANALYTICS-TRACKING.md` Step 6 for detailed instructions.

**For now**: Just check Bitly dashboard manually each week! Takes 30 seconds.

---

## 📈 Weekly Analytics Review (5 min/week)

Every Monday after your newsletter sends:

### 1. Check Mailjet (2 min)
```
✅ Open rate: 58% (target: >40%)
✅ Click rate: 28% (target: >20%)
✅ Bounce rate: 2% (target: <5%)
```

### 2. Check Bitly (2 min)
```
Voice Chat Button: 23 clicks ← High engagement!
Product 1 (Blazer): 15 clicks
Product 2 (Handbag): 12 clicks
Product 3 (Shoes): 8 clicks
Newsletter Signup: 6 clicks
```

### 3. Update Google Sheets Manually (1 min)
Open your sheet, update "total_clicks" column with numbers from Bitly.

**That's it!** You now know what's working! 📊

---

## 🎯 What to Look For

### Week 1-2: Establish Baseline
- What's your average open rate?
- What's your average click rate?
- Which products get most clicks?
- Do people click voice chatbot?

### Week 3-4: Identify Patterns
- Which topics get best engagement?
- Which products sell best?
- What day/time gets best open rates?
- Are people forwarding newsletter (signup link clicks)?

### Month 2-3: Optimize
- Test different subject lines
- Try different product placements
- Experiment with CTA button text
- Focus on high-performing product types

---

## 💡 Pro Tips

### 1. UTM Parameters Are Your Friend
Every link now has tracking:
```
https://amazon.com/dp/B123?tag=yourID-20&utm_source=newsletter&utm_medium=email&utm_campaign=week_5&utm_content=oversized_blazer
```

This tells you:
- **utm_source**: Where link was (newsletter)
- **utm_medium**: How it was sent (email)
- **utm_campaign**: Which week (week_5)
- **utm_content**: Which specific product (oversized_blazer)

### 2. Compare Week Over Week
```
Week 4: 58% open, 28% click, Voice:19, Top: Blazer
Week 5: 61% open, 32% click, Voice:23, Top: Handbag
```
**Insight**: Open rate improving! People love handbags!

### 3. A/B Test Subject Lines
Try different styles:
- Week 5: "📸 Fashion Insights: Oversized Blazers Are EVERYWHERE"
- Week 6: "Your Weekly Fashion Fix: Slip Dresses Are Back"
- Week 7: "🔥 This Week's Hottest Trend (You'll Want This)"

See which gets best open rate!

### 4. Track Voice Chat Engagement
If voice chat clicks are high → People want interactivity!
If voice chat clicks are low → Maybe change button text or placement

---

## 🆘 Troubleshooting

### "Bitly node fails"
**Error**: `401 Unauthorized`
**Fix**: Check your Bitly token is correct in the node

### "Google Sheets node fails"
**Error**: `Insufficient permissions`
**Fix**:
1. Delete credential
2. Create new credential
3. Make sure you authorize with correct Google account
4. Make sure spreadsheet is owned by that account

### "Links aren't shortened"
**Check**:
- Bitly account has available links (50/month free)
- Node shows green checkmark after execution
- Check Bitly dashboard - do links appear there?

### "Click counts show 0"
**This is normal!** Counts show 0 until people actually click.
- Send test email to yourself
- Click a link
- Check Bitly dashboard → Should show 1 click
- Wait a few hours for subscribers to receive and click

---

## ✅ Final Checklist

- [ ] Signed up for Bitly (FREE)
- [ ] Got Bitly API token
- [ ] Created Google Sheets with 3 tabs
- [ ] Imported analytics nodes to n8n workflow
- [ ] Connected nodes after "Devi Affiliate Processor"
- [ ] Added Bitly token to "Bitly - Shorten Links" node
- [ ] Updated landing page URL in "Prepare Links" node
- [ ] Added Google Sheets credential (both nodes)
- [ ] Updated email template to use `short_link`
- [ ] Updated voice chatbot button to use `voiceChatLink`
- [ ] Tested workflow → All nodes green
- [ ] Checked Bitly dashboard → Links appear
- [ ] Checked Google Sheets → Data logged
- [ ] Sent test email → Clicked link → Bitly shows click

**All checked?** You're tracking everything! 🎉

---

## 🎉 You're Done!

**Before analytics**:
- ❌ No idea which products people click
- ❌ No idea if voice chat is useful
- ❌ No idea what's working

**After analytics**:
- ✅ Track every affiliate click
- ✅ Track voice chatbot engagement
- ✅ Track newsletter signups from forwards
- ✅ See trends week-over-week
- ✅ Optimize based on data

**Time investment**: 20 minutes setup
**Ongoing time**: 5 minutes/week review
**Cost**: $0 (all free tiers)

---

**Next**: Import your main workflow and add these analytics nodes!

See full guides:
- `COMPLETE-WORKFLOW-IMPORT-GUIDE.md` - Main workflow setup
- `ADD-ANALYTICS-TRACKING.md` - Detailed analytics info
