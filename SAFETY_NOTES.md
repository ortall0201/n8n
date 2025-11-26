# Safety & Legal Guardrails - Quick Reference

> **⚠️ CRITICAL**: This document summarizes the key legal and ethical constraints hard-coded into this system.

---

## 🔒 Core Principles (Non-Negotiable)

### 1. Public Data Only ✅
```
✅ DO: Scrape publicly visible Instagram posts
❌ DON'T: Access private accounts, bypass logins, use unauthorized APIs
```

**Enforcement**: Code validates data source markers; rejects non-public data.

### 2. No Content Re-Hosting ✅
```
✅ DO: Link to original Instagram posts
✅ DO: Store influencer @handle (text only)
✅ DO: Extract product links and coupon codes
❌ DON'T: Store or serve influencer images
❌ DON'T: Copy-paste full captions
❌ DON'T: Re-upload influencer content
```

**Enforcement**:
- Newsletter template: No `<img>` tags with influencer images
- Lovable UI: Only neutral graphics + links to original posts
- Data model: No `image_url` field stored long-term

### 3. Data Minimization ✅
**What We Store:**
```json
{
  "influencer_handle": "@username",
  "post_url": "https://instagram.com/p/abc123",
  "product_links": ["https://shopmy.us/..."],
  "coupon_codes": ["FASHION20"],
  "ai_summary": "AI-generated 1-sentence description",
  "extraction_date": "2025-11-26"
}
```

**What We DON'T Store:**
- ❌ Raw captions (discarded after extraction)
- ❌ Image files or URLs
- ❌ Engagement metrics (likes, comments)
- ❌ Follower counts
- ❌ Any non-public data

**Enforcement**: Code nodes explicitly delete full caption data after extraction.

### 4. No Implied Endorsement ✅
**Approved Language:**
- ✅ "Analyzing public fashion trends"
- ✅ "Independent trend analysis tool"
- ✅ "All content rights remain with creators"

**Forbidden Language:**
- ❌ "In partnership with @influencer"
- ❌ "Endorsed by"
- ❌ "Recommended by"
- ❌ Any language implying official collaboration

**Enforcement**: All templates reviewed; no endorsement language allowed.

### 5. Attribution Always ✅
Every mention includes:
1. Influencer handle: `@username` (text only)
2. Link to original post: `[View on Instagram →]`
3. Disclaimer: "Independent analysis, not affiliated"

---

## 📋 Data Handling Rules

### Caption Processing Pipeline
```
1. Receive caption from scraper
   ↓
2. Extract:
   - Product links (regex: shopmy.us, ltk.app, amazon, etc.)
   - Coupon codes (regex: "code XXX", "קוד XXX")
   ↓
3. Generate AI summary (1 sentence, paraphrased)
   ↓
4. Store extracted data
   ↓
5. **DISCARD raw caption** ← CRITICAL STEP
```

### Image Handling
```
NEVER:
├── Download influencer images
├── Store image files
├── Re-serve images from our servers
└── Embed images in newsletters/UI

ALWAYS:
├── Use neutral stock/abstract images
├── Link to original Instagram post
└── Show only influencer handle (text)
```

### Subscriber Data (GDPR-Compliant)
```
Collected:
- Email (required)
- Name (optional)
- Signup date
- Status (active/inactive)

NOT Collected:
- Location
- IP address (unless legally required)
- Browsing history
- Social media profiles
```

---

## 🎯 Legal Disclaimers (Required Everywhere)

### In Newsletter Footer
```html
<p style="font-size: 12px; color: #999;">
  This is an independent trend analysis tool. We are not affiliated with
  Instagram or the influencers we analyze. All content rights remain with
  original creators. Product links may be affiliate links.
  <a href="https://yoursite.com/legal/disclaimer">Full Disclaimer</a>
</p>
```

### In Lovable UI (Every Page)
```
Footer text:
"Independent analysis tool | Not affiliated with Instagram or influencers |
All rights remain with creators | Privacy Policy | Terms | Contact"
```

### In API Responses
```json
{
  "data": { ... },
  "disclaimer": "This is an independent analysis. We are not affiliated with Instagram or the influencers mentioned. All content rights remain with original creators."
}
```

---

## ⚖️ Compliance Checklist

### Before Production Launch
- [ ] Legal review by qualified attorney
- [ ] Privacy policy published and accessible
- [ ] Terms of use published
- [ ] Disclaimer on every page/email
- [ ] Consent checkbox on signup form
- [ ] Unsubscribe link in every email
- [ ] Data deletion process documented
- [ ] GDPR data processing agreement (if EU subscribers)
- [ ] Affiliate disclosure (if monetizing)
- [ ] Instagram ToS reviewed and compliant

### Ongoing Compliance
- [ ] Weekly: Review scraped data for compliance
- [ ] Monthly: Audit stored data for minimization
- [ ] Quarterly: Legal document updates
- [ ] As needed: Handle data deletion requests (GDPR)

---

## 🚨 Red Flags to Avoid

### Immediate Legal Risk
1. ❌ Storing influencer images without permission
2. ❌ Copying full captions verbatim
3. ❌ Claiming influencer endorsement
4. ❌ Scraping private/protected content
5. ❌ Bypassing Instagram's technical protections
6. ❌ Using unauthorized Instagram APIs

### Medium Risk (Mitigate)
1. ⚠️ Storing any caption text → Only store AI summaries
2. ⚠️ Displaying engagement metrics → Avoid or anonymize
3. ⚠️ Not providing attribution → Always link to original
4. ⚠️ No privacy policy → Must have before collecting emails
5. ⚠️ No unsubscribe option → GDPR violation

### Low Risk (Best Practices)
1. ℹ️ Using influencer handles → OK if for attribution
2. ℹ️ Analyzing public trends → Generally permitted
3. ℹ️ Extracting product links → Fair use (consult lawyer)

---

## 📝 Data Deletion Procedure (GDPR Right to Erasure)

### User Requests Deletion
1. Verify user identity (email confirmation)
2. Remove from Google Sheets:
   - Subscribers tab: Delete row
3. Check all workflows:
   - Remove from any cached/temporary data
4. Respond within 30 days:
   - "Your data has been permanently deleted from our systems."
5. Log deletion request (for compliance audit)

### Code Implementation
```javascript
// In n8n "Handle Deletion Request" workflow
const emailToDelete = $json.email;

// 1. Delete from Google Sheets
// 2. Clear any cached data
// 3. Send confirmation email

return [{
  json: {
    deleted: true,
    email: emailToDelete,
    date: new Date().toISOString()
  }
}];
```

---

## 🌍 Multi-Jurisdiction Considerations

### EU (GDPR)
- ✅ Consent checkbox required
- ✅ Right to deletion
- ✅ Data processing agreement
- ✅ DPO appointed (if >250 employees)

### California (CCPA)
- ✅ Privacy policy with data disclosure
- ✅ "Do Not Sell My Info" link (if selling data)
- ✅ Deletion requests honored

### Israel
- ✅ Data Protection Law compliance
- ✅ Hebrew language privacy policy (if targeting Hebrew speakers)

---

## 🔧 Technical Safeguards

### Code-Level Enforcement
```javascript
// Example: Caption Sanitization Function
function sanitizePostData(post) {
  return {
    handle: post.username,
    post_url: post.url,
    product_links: extractProductLinks(post.caption),
    coupon_codes: extractCoupons(post.caption),
    ai_summary: generateAISummary(post.caption),
    // IMPORTANT: Do NOT include:
    // caption: post.caption,  ← NEVER STORE RAW
    // image_url: post.image,  ← NEVER STORE IMAGE
  };
}
```

### Validation Checks
```javascript
// Reject if contains non-public data markers
if (post.isPrivate || post.requiresLogin) {
  throw new Error("Non-public content detected. Skipping.");
}
```

### Monitoring
- Alert if stored data > 500 characters per influencer
- Alert if image URLs detected in database
- Weekly audit of Google Sheets data size

---

## 📞 Incident Response Plan

### If Influencer Complains
1. **Immediate**: Pause workflow, stop sending newsletters
2. **Within 24h**:
   - Remove all data related to that influencer
   - Respond professionally, offer explanation
3. **Within 7 days**:
   - Review and improve filtering
   - Update disclaimer if needed
4. **Document**: Keep record of complaint and resolution

### If Legal Threat Received
1. **Do not ignore**
2. **Consult lawyer immediately**
3. **Preserve all records**
4. **Pause system if advised**
5. **Respond formally through legal counsel**

---

## ✅ Quick Self-Audit Questions

Before each newsletter send, ask:

1. ❓ Are we using only public data? → YES
2. ❓ Are we storing influencer images? → NO
3. ❓ Are we storing raw captions? → NO
4. ❓ Do we link to original posts? → YES
5. ❓ Do we claim endorsement? → NO
6. ❓ Is disclaimer visible? → YES
7. ❓ Can users unsubscribe easily? → YES
8. ❓ Have we consulted a lawyer? → (Your answer)

---

## 🎓 Educational Resources

- **GDPR Official**: https://gdpr.eu
- **Instagram Platform Policy**: https://developers.facebook.com/docs/instagram/terms
- **EFF Copyright Guide**: https://www.eff.org/issues/intellectual-property
- **FTC Affiliate Disclosure**: https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers

---

## ⚠️ Final Warning

**THIS IS NOT LEGAL ADVICE**

This document reflects our best efforts at legal safety, but:

- Laws vary by jurisdiction
- Instagram's ToS can change
- Copyright law is complex
- We are not lawyers

**Before production use:**
1. Consult a qualified attorney
2. Get legal review of ALL materials
3. Obtain necessary licenses/permissions
4. Implement proper legal entity structure
5. Consider liability insurance

**Use this system at your own risk.**

---

*Last updated: November 26, 2025*
*Version: 2.0 - Legal Safety First*
*Consult a lawyer. Seriously.*
