# 🧪 Devi 90-Day Experiment Plan

## Experiment Overview

**Goal:** Validate AI influencer automation viability with $240 budget over 12 weeks

**Hypothesis:** An AI fashion influencer can generate consistent engagement and newsletter signups at <$20/week operating cost

**Success Criteria:**
- Newsletter: 100+ subscribers by Week 12
- Instagram: 500+ followers by Week 12
- Cost: Stay under $20/week average
- Automation: 90%+ runs succeed without manual intervention
- Content quality: Maintain Devi voice/persona consistency

---

## 📅 12-Week Rollout Plan

### **Weeks 1-2: Foundation (Setup Phase)**

**Goals:**
- ✅ Setup workflow infrastructure
- ✅ Create Devi identity (face, voice, avatar)
- ✅ Generate first content batch
- ✅ Verify GitHub storage works

**Tasks:**
1. Run `DEVI-SETUP-AUTOMATION.json` (one-time)
   - Generate Midjourney face (5 variations)
   - Clone ElevenLabs voice
   - Create HeyGen avatar
   - Save to `devi-identity/` on GitHub

2. Test content generation
   - Run "Fashion Insights - last version update 3" manually
   - Verify: Newsletter, blog, Instagram script, TikTok script, Q&A all generate
   - Check: GitHub saves working

3. Manual social posts (Week 1-2 only)
   - Post Instagram manually to test audience response
   - Post TikTok manually if comfortable
   - Publish blog manually

**Deliverables:**
- ✅ Devi face images (5 files)
- ✅ Voice ID saved
- ✅ Avatar ID saved
- ✅ Week 1 & 2 content generated
- ✅ First manual posts live

**Budget:**
- One-time: $30 (Midjourney)
- Recurring: $4.25/week × 2 = $8.50 (OpenAI only)
- **Total: $38.50**

**Success Metrics:**
- [ ] All identity files in GitHub
- [ ] 2 weeks of content generated
- [ ] First Instagram post gets >50 impressions
- [ ] First blog post published

---

### **Weeks 3-4: Voice & Video Automation**

**Goals:**
- 🎙️ Add ElevenLabs voice generation
- 🎬 Add HeyGen video generation
- 📱 Test video posting (manual)

**Tasks:**
1. Add new nodes to workflow:
   - `🔑 Load Identity Assets`
   - `🎙️ Generate Voice with ElevenLabs`
   - `🎬 Generate Video with HeyGen`
   - `💾 Save Video to GitHub`

2. Test voice quality
   - Generate 3-5 test audio clips
   - Verify: Voice sounds warm, friendly, natural
   - Adjust: stability/similarity settings if needed

3. Test video quality
   - Generate 3-5 test videos
   - Verify: Lip sync matches audio
   - Check: Video aspect ratio 9:16 (vertical)

4. Manual posting with AI content
   - Post AI-generated videos to Instagram Stories
   - Post to TikTok
   - Monitor engagement vs Week 1-2 manual posts

**Deliverables:**
- ✅ Voice generation node working
- ✅ Video generation node working
- ✅ Week 3 & 4 videos posted manually

**Budget:**
- ElevenLabs: $5/month (subscribe)
- HeyGen: $29/month (subscribe)
- OpenAI: $4.25/week × 2 = $8.50
- **Total: $42.50** (includes monthly subscriptions)

**Success Metrics:**
- [ ] Voice sounds natural (user feedback)
- [ ] Video lip sync works
- [ ] Videos get >100 impressions each
- [ ] 0 failed generations (reliability check)

---

### **Weeks 5-6: Self-Awareness Feature**

**Goals:**
- 📖 Add "read own past content" functionality
- 🧠 Verify content continuity across weeks
- 📊 Test File Tracker integration

**Tasks:**
1. Add new nodes:
   - `📊 Get Current Week from File Tracker`
   - `📖 Read Own Past Content from GitHub`
   - `🧠 Build Master Context`

2. Modify `Devi Master Content Generator`:
   - Add past content context to prompt
   - Test: Does Week 6 content reference Week 5?

3. Verify self-awareness works:
   - Read execution logs
   - Check: Does Devi say "Last week I showed you..."?
   - Verify: Product/trend continuity across weeks

**Deliverables:**
- ✅ Self-awareness nodes working
- ✅ Week 5 & 6 content references past weeks
- ✅ File Tracker auto-updates

**Budget:**
- OpenAI: $4.25/week × 2 = $8.50
- ElevenLabs: $0 (already subscribed)
- HeyGen: $0 (already subscribed)
- **Total: $8.50**

**Success Metrics:**
- [ ] Week 6 content explicitly references Week 5 (check logs)
- [ ] File Tracker has 6 rows (Weeks 1-6)
- [ ] No broken GitHub fetches
- [ ] Continuity feels natural (qualitative check)

---

### **Weeks 7-8: Instagram Auto-Posting**

**Goals:**
- 📱 Automate Instagram posting
- 🧪 Test Instagram Graph API
- 📈 Monitor engagement without manual intervention

**Tasks:**
1. Setup Instagram Graph API:
   - Convert @devine.me to Business Account
   - Create Facebook Developer App
   - Get long-lived access token
   - Get Instagram Account ID

2. Add Instagram posting node:
   - `📱 Post to Instagram`
   - Test with draft posts first
   - Verify: Caption + video upload works

3. Run fully automated Monday 9 AM workflow:
   - Content generates automatically
   - Video creates automatically
   - Posts to Instagram automatically
   - No manual intervention

4. Monitor engagement:
   - Check Instagram Insights daily
   - Track: Impressions, reach, engagement rate
   - Compare: Automated vs manual post performance (Weeks 1-6)

**Deliverables:**
- ✅ Instagram API configured
- ✅ Auto-posting working
- ✅ Week 7 & 8 posts automated

**Budget:**
- OpenAI: $4.25/week × 2 = $8.50
- ElevenLabs: $2/week × 2 = $4.00
- HeyGen: $7.25/week × 2 = $14.50
- Instagram API: $0 (free)
- **Total: $27.00**

**Success Metrics:**
- [ ] 2 automated Instagram posts (Weeks 7 & 8)
- [ ] 100% success rate (no failed posts)
- [ ] Engagement rate >3% (Instagram average)
- [ ] 0 manual interventions needed

---

### **Weeks 9-10: TikTok & Blog Publishing**

**Goals:**
- 📱 Add TikTok auto-posting (if API approved)
- 📝 Add WordPress auto-publishing
- 📊 Compare multi-platform engagement

**Tasks:**
1. TikTok setup (if approved):
   - Add `📱 Post to TikTok` node
   - Test video upload
   - OR: Continue manual posting if API not approved

2. WordPress setup:
   - Install WordPress (if not already)
   - Get application password
   - Add `📝 Publish to WordPress` node
   - Test: Blog posts appear correctly

3. Run full automation:
   - Monday 9 AM: Generate content
   - Auto-post to Instagram
   - Auto-post to TikTok (or manual)
   - Auto-publish blog

4. Monitor cross-platform performance:
   - Which platform drives most newsletter signups?
   - Which platform has best engagement?
   - Where does Devi's voice work best?

**Deliverables:**
- ✅ WordPress auto-publishing
- ✅ TikTok posting (auto or manual)
- ✅ Week 9 & 10 content on 3+ platforms

**Budget:**
- OpenAI: $4.25/week × 2 = $8.50
- ElevenLabs: $2/week × 2 = $4.00
- HeyGen: $7.25/week × 2 = $14.50
- WordPress hosting: $5/month = $2.50 (if needed)
- **Total: $29.50**

**Success Metrics:**
- [ ] Blog posts published automatically
- [ ] Content appears on 3+ platforms weekly
- [ ] Newsletter CTR >1% (from Instagram bio link)
- [ ] 50+ total newsletter subscribers

---

### **Weeks 11-12: Optimization & Scale Test**

**Goals:**
- 🚀 Test scaling to 2x content per week
- 🔧 Optimize costs if over budget
- 📊 Finalize 90-day results

**Tasks:**
1. Try posting 2x per week (Monday + Thursday):
   - Clone workflow
   - Schedule second run: Thursday 9 AM
   - Monitor: Does quality degrade?

2. Cost optimization:
   - If over $20/week average, reduce:
     - Use D-ID ($5/mo) instead of HeyGen ($29/mo)
     - Skip video, post images only
     - Reduce influencer scraping to 30 posts (vs 50)

3. Experiment conclusion:
   - Analyze 12 weeks of data
   - Calculate: Cost per newsletter signup
   - Decide: Continue, pivot, or stop?

**Deliverables:**
- ✅ 2x posting cadence tested (Week 11-12)
- ✅ Final cost analysis
- ✅ 90-day experiment report

**Budget:**
- OpenAI: $4.25/week × 2 × 2 = $17.00 (2x posting)
- ElevenLabs: $2/week × 2 × 2 = $8.00
- HeyGen: $7.25/week × 2 × 2 = $29.00
- **Total: $54.00** (⚠️ Double spend for testing)

**Success Metrics:**
- [ ] 100+ newsletter subscribers
- [ ] 500+ Instagram followers
- [ ] Cost per signup: <$2
- [ ] Automation success rate: >90%
- [ ] Decision: Scale up or pivot?

---

## 📊 Weekly Tracking Dashboard

Track these metrics EVERY MONDAY:

### Content Metrics:
- [ ] Newsletter generated?
- [ ] Blog generated?
- [ ] Instagram script generated?
- [ ] TikTok script generated?
- [ ] Q&A generated?
- [ ] Voice generated?
- [ ] Video generated?

### Platform Metrics:
- **Instagram:**
  - Followers: _____
  - Impressions (this week): _____
  - Engagement rate: _____
  - Profile visits: _____

- **TikTok:**
  - Followers: _____
  - Views (this week): _____
  - Engagement rate: _____

- **Blog:**
  - Page views (this week): _____
  - Time on page: _____

- **Newsletter:**
  - Total subscribers: _____
  - New signups (this week): _____
  - Open rate: _____
  - Click rate: _____

### Cost Metrics:
- OpenAI spend: $_____
- ElevenLabs spend: $_____
- HeyGen spend: $_____
- Other: $_____
- **Total this week:** $_____
- **Running total:** $_____

### Automation Metrics:
- Workflow executions: _____
- Successful runs: _____
- Failed runs: _____
- Manual interventions: _____
- Success rate: _____%

---

## 🎯 Success Criteria (12-Week Goals)

### Must-Have (Experiment Success):
- ✅ Newsletter: 100+ subscribers
- ✅ Instagram: 500+ followers
- ✅ Average cost: <$20/week
- ✅ Automation: >90% success rate
- ✅ Content quality: Maintains Devi voice

### Nice-to-Have (Bonus):
- 🎁 TikTok: 1,000+ followers
- 🎁 Blog: 1,000+ monthly views
- 🎁 Instagram engagement: >5%
- 🎁 Newsletter open rate: >25%
- 🎁 Cost per signup: <$1

### Red Flags (Stop Experiment):
- ❌ Cost exceeds $25/week for 3+ weeks
- ❌ Automation fails >50% of time
- ❌ Engagement drops <1% consistently
- ❌ Content quality degrades (generic/spammy)
- ❌ Zero newsletter signups for 4+ weeks

---

## 💰 Budget Breakdown (12 Weeks)

| Expense | One-Time | Weekly | 12-Week Total |
|---------|----------|--------|---------------|
| **Setup** |  |  |  |
| Midjourney (face) | $30 | - | $30 |
| Voice actor (optional) | $0-50 | - | $0-50 |
| **Recurring** |  |  |  |
| OpenAI (content) | - | $4.25 | $51 |
| ElevenLabs (voice) | - | $2.00 | $24 |
| HeyGen (video) | - | $7.25 | $87 |
| Bright Data (scraping) | - | $1.50 | $18 |
| WordPress (hosting) | - | $0-2.50 | $0-30 |
| **TOTAL** | **$30-80** | **$15.00** | **$210-240** |

**Target:** Stay under $240 (on track ✅)

---

## 🧪 Experiment Decision Tree

### After Week 12, If:

**✅ Success (100+ subscribers, <$20/week):**
- **Action:** Continue automation for 6 more months
- **Next steps:**
  - Scale to 2-3x posting frequency
  - Add Instagram Reels + Stories
  - Test affiliate link monetization
  - Launch voice chat feature (Lovable)

**⚠️ Partial Success (50-99 subscribers, $20-25/week):**
- **Action:** Optimize and continue for 3 more months
- **Next steps:**
  - Reduce costs (switch to D-ID, skip video)
  - Focus on best-performing platform only
  - Improve content quality (A/B test prompts)
  - Manually respond to comments (engagement boost)

**❌ Failure (<50 subscribers, >$25/week):**
- **Action:** Pivot or stop
- **Options:**
  1. Pivot to different niche (tech, beauty, food)
  2. Pivot to different format (text-only, no video)
  3. Stop automation, archive project
- **Lessons learned:** Document what didn't work

---

## 📈 Engagement Benchmarks

Compare Devi's performance against these industry averages:

| Platform | Avg Engagement Rate | Devi Target |
|----------|---------------------|-------------|
| Instagram | 1-3% | >3% |
| TikTok | 5-8% | >5% |
| Blog | 2-5 min time on page | >3 min |
| Newsletter | 20-25% open rate | >20% |
| Newsletter | 2-5% click rate | >3% |

If Devi beats these benchmarks, experiment is successful regardless of follower count.

---

## 🔄 Weekly Automation Checklist

### Every Monday 9 AM (Automated):
- ✅ Workflow triggers automatically
- ✅ Content generates
- ✅ Voice + video created
- ✅ Posted to Instagram, TikTok, blog
- ✅ Logged to File Tracker

### Every Monday 10 AM (Manual Check):
- [ ] Verify workflow succeeded (check n8n execution log)
- [ ] Check Instagram post went live
- [ ] Check TikTok post went live (if automated)
- [ ] Check blog post published
- [ ] Respond to any comments (5-10 min)
- [ ] Update weekly tracking dashboard

### Every Monday End-of-Day (Review):
- [ ] Log metrics in tracking dashboard
- [ ] Check costs (OpenAI + ElevenLabs + HeyGen dashboards)
- [ ] Review content quality (does it sound like Devi?)
- [ ] Note any issues for next week

---

## 🚨 Troubleshooting Plan

### If Content Generation Fails:
1. Check OpenAI API key still valid
2. Check OpenAI account has funds
3. Run workflow manually to debug
4. Generate content manually as backup (30 min)

### If Voice/Video Generation Fails:
1. Check ElevenLabs/HeyGen credits remaining
2. Verify identity assets still in GitHub
3. Post images instead of video (fallback)
4. Check API rate limits

### If Social Posting Fails:
1. Check Instagram/TikTok access tokens valid
2. Verify account not suspended/restricted
3. Post manually (10 min)
4. Contact platform support if needed

### If Cost Exceeds $25/Week:
1. Reduce scraping to 30 posts (save $0.75)
2. Skip video, post images only (save $9.25)
3. Use GPT-3.5-turbo instead of GPT-4o-mini (save $2)
4. Post bi-weekly instead of weekly (save 50%)

---

## 📝 Final Experiment Report Template

After Week 12, fill this out:

### Summary:
- **Total cost:** $_____
- **Cost per week:** $_____
- **Newsletter subscribers:** _____
- **Instagram followers:** _____
- **TikTok followers:** _____
- **Blog views:** _____
- **Automation success rate:** _____%

### What Worked:
- (e.g., "Voice generation was consistently natural")
- (e.g., "Instagram engagement beat industry average")

### What Didn't Work:
- (e.g., "TikTok API never approved, had to post manually")
- (e.g., "Video generation too slow, delayed posting")

### Lessons Learned:
- (e.g., "Self-awareness feature made content feel more authentic")
- (e.g., "Users preferred shorter videos <60 sec")

### Recommendation:
- [ ] **Continue:** Scale automation to 2-3x frequency
- [ ] **Optimize:** Reduce costs and try 3 more months
- [ ] **Pivot:** Try different niche/format
- [ ] **Stop:** Experiment failed, archive project

### Next Steps:
- (What to do based on recommendation)

---

**Ready to run 12-week experiment! 🧪💜**
