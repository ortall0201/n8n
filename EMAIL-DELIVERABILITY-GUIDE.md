# 📧 Email Deliverability Guide - Avoid Spam Folder

## 🔐 1. Email Authentication (MOST IMPORTANT!)

### Set Up SPF, DKIM, and DMARC Records

**What are they?**
- **SPF** (Sender Policy Framework): Proves your email is sent from authorized servers
- **DKIM** (DomainKeys Identified Mail): Digital signature to verify email authenticity
- **DMARC** (Domain-based Message Authentication): Tells email providers what to do with unauthenticated emails

### How to Set Up (Using Mailjet):

1. **Get your Mailjet SPF/DKIM records**:
   - Login to Mailjet
   - Go to: Account Settings → Sender Domains & Addresses
   - Click "Manage" on your domain
   - Mailjet will show you DNS records to add

2. **Add DNS Records** (in your domain registrar):
   ```
   Type: TXT
   Name: @
   Value: v=spf1 include:spf.mailjet.com ~all

   Type: TXT
   Name: mailjet._domainkey
   Value: [Your DKIM key from Mailjet]

   Type: TXT
   Name: _dmarc
   Value: v=DMARC1; p=none; rua=mailto:your@email.com
   ```

3. **Verify in Mailjet** (can take 24-48 hours)

---

## 📧 2. Use a Custom Domain Email (Not Gmail!)

**Current setup**: ortalgr@gmail.com
**Problem**: Gmail addresses look unprofessional and hurt deliverability

**Solution**: Use your own domain
- Buy domain: `fashioninsights.com` (or similar)
- Set up email: `newsletter@fashioninsights.com`
- Update Mailjet with custom domain

**Where to buy domain**:
- Namecheap.com (~$10/year)
- GoDaddy
- Google Domains

---

## 🔥 3. Warm Up Your Email Address

**Problem**: Sending 1,000 emails immediately = spam flag

**Solution**: Gradual increase
- Week 1: Send to 10 subscribers
- Week 2: Send to 50 subscribers
- Week 3: Send to 150 subscribers
- Week 4: Send to 500 subscribers
- Week 5+: Full list (1,000+)

**How to implement in n8n**:
```javascript
// In "Filter Active Subscribers" node, add:
const subscribers = $input.all();
const activeSubscribers = subscribers.filter(item => {
  const status = item.json.status?.toLowerCase();
  return status === 'active' || status === 'subscribed';
});

// WARMUP: Limit emails during warmup period
const WARMUP_LIMIT = 50; // Increase weekly: 10 → 50 → 150 → 500 → 999999
return activeSubscribers.slice(0, WARMUP_LIMIT);
```

---

## ✍️ 4. Content Best Practices

### ✅ DO:
- **Balance text-to-image ratio**: 60% text, 40% images
- **Use your subscriber's name**: "Hi ${subscriberName}!" (✅ already doing this!)
- **Include plain text version** (Mailjet can auto-generate)
- **Add unsubscribe link**: ✅ You already have this!
- **Use proper formatting**: Headers, paragraphs, white space
- **Consistent sender name**: "Fashion Insights by Ortal"

### ❌ DON'T:
- ❌ Use ALL CAPS in subject lines
- ❌ Overuse exclamation marks!!!!!!
- ❌ Use spam trigger words: "FREE", "ACT NOW", "LIMITED TIME"
- ❌ Send too many emojis (your current usage is fine ✅)
- ❌ Use URL shorteners (bit.ly, tinyurl)
- ❌ Send attachments

---

## 🧹 5. List Hygiene

**Remove inactive subscribers**:
- If someone hasn't opened your email in 3 months → Remove them
- Why? Low engagement = spam folder

**Track in Google Sheets**:
```
Columns:
- Email
- Name
- Status (active/inactive)
- Signup Date
- Last Opened Date
- Open Count
```

**Clean your list monthly**:
- Mark subscribers who haven't opened in 90 days as "inactive"
- Stop sending to them

---

## 📊 6. Monitor Email Metrics

**Track in Mailjet**:
- **Open Rate**: Should be > 20% (healthy)
- **Click Rate**: Should be > 2%
- **Bounce Rate**: Should be < 2%
- **Spam Complaints**: Should be < 0.1%

**If spam complaints are high**:
- Review your content
- Make unsubscribe link more visible
- Only send to engaged subscribers

---

## 🎯 7. Subject Line Best Practices

**Current subject**: `📸 Fashion Insights: ${topTrend}... 🎨`

**✅ Good practices**:
- Keep under 50 characters (mobile friendly)
- Use 1-2 emojis max
- Be specific, not vague
- Avoid clickbait

**Examples**:
- ✅ "📸 This Week: Gender-Fluid Fashion Trends"
- ✅ "What's Trending: Burgundy & Pastels 🎨"
- ❌ "You Won't BELIEVE This Week's Trends!!!"
- ❌ "OPEN NOW - FREE Fashion Insights Inside"

---

## 🧪 8. Test Before Sending

**Tools to test deliverability**:
- Mail-tester.com (FREE - gives you a spam score)
- GlockApps (Paid - shows inbox placement)

**How to test**:
1. Send test email to: test-xxxxx@srv1.mail-tester.com
2. Visit mail-tester.com
3. Enter your test code
4. Get spam score (aim for 8/10 or higher)

---

## 🔧 9. Mailjet Configuration

**Enable these features in Mailjet**:
- ✅ Enable tracking (opens & clicks)
- ✅ Enable DKIM signature
- ✅ Set up custom tracking domain
- ✅ Enable bounce handling

**API Settings**:
```javascript
// In n8n SMTP node:
{
  "host": "in-v3.mailjet.com",
  "port": 587,
  "secure": false,
  "auth": {
    "user": "YOUR_MAILJET_API_KEY",
    "pass": "YOUR_MAILJET_SECRET_KEY"
  },
  "headers": {
    "List-Unsubscribe": "<http://localhost:5678/webhook/unsubscribe-confirm>"
  }
}
```

---

## 📋 Quick Checklist

Before sending your first newsletter:

- [ ] Set up SPF, DKIM, DMARC records
- [ ] Use custom domain email (not Gmail)
- [ ] Start with warmup (limit to 10-50 emails)
- [ ] Test with mail-tester.com (score > 8/10)
- [ ] Include clear unsubscribe link
- [ ] Use subscriber's name in greeting
- [ ] Balance text and images
- [ ] Avoid spam trigger words
- [ ] Monitor open rates weekly
- [ ] Clean inactive subscribers monthly

---

## 🚀 Priority Actions (Do These First!)

### 1. **Buy a domain** (TODAY)
   - Go to Namecheap.com
   - Buy: `fashioninsights.com` or `fashioninsights.io`
   - Cost: ~$10/year

### 2. **Set up email authentication** (TOMORROW)
   - Add SPF, DKIM, DMARC records
   - Verify in Mailjet

### 3. **Start with small batch** (FIRST SEND)
   - Send to 10 subscribers first
   - Check inbox placement
   - Gradually increase

---

## 💡 Expected Results

**After proper setup**:
- 📥 **Inbox rate**: 85-95%
- 📧 **Open rate**: 20-35%
- 🖱️ **Click rate**: 2-5%
- 🚫 **Spam rate**: < 0.1%

**Timeline**:
- Week 1: 50% inbox placement (warming up)
- Week 2-3: 70% inbox placement
- Week 4+: 85-95% inbox placement (fully warmed up)

---

## 🆘 If Emails Still Go to Spam

1. **Check spam folder**: Look at what triggered it
2. **Test with mail-tester.com**: Get specific feedback
3. **Ask subscribers to whitelist**: "Add newsletter@fashioninsights.com to contacts"
4. **Review bounce logs**: Check Mailjet for bounce reasons
5. **Reduce image-heavy content**: More text, fewer images
6. **Avoid URL-heavy emails**: Too many links = spam

---

## 📞 Need Help?

- Mailjet Support: https://www.mailjet.com/support/
- Mail Tester: https://www.mail-tester.com/
- SPF/DKIM Checker: https://mxtoolbox.com/

**Good luck! 🎉**
