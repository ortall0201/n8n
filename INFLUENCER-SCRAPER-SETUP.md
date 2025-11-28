# Fashion Influencer Scraper Configuration

**Last Updated:** November 26, 2025
**Status:** Ready for Production

---

## 📋 Curated Influencer List

These 8 influencers have been carefully selected based on:
- ✅ No pro-Palestine activism or controversial political statements
- ✅ High-quality fashion content
- ✅ Active posting schedule
- ✅ Diverse style perspectives (luxury, street, casual, editorial)
- ✅ Geographic diversity

---

## 🎯 Instagram URLs for Bright Data Scraper

**UPDATED: Pure Fashion Content Only** (No beauty/lifestyle mixed content)

Copy and paste these URLs into your Bright Data Instagram scraper:

```
https://www.instagram.com/chiaraferragni/
https://www.instagram.com/aimesong/
https://www.instagram.com/alexachung/
https://www.instagram.com/wisdomkaye/
https://www.instagram.com/camilacoelho/
https://www.instagram.com/notjessfashion/
https://www.instagram.com/oliviapalermo/
https://www.instagram.com/sincerelyjules/
```

**Sources:**
- [Top 10 Fashion Influencers to Follow in 2025](https://stackinfluence.com/top-10-fashion-influencers-to-follow-in-2025/)
- [The Runway Goes Digital: Instagram Fashion Influencers S/S 2025](https://influencity.com/blog/en/the-runway-goes-digital-10-instagram-fashion-influencers-defining-spring/summer-2025)
- [Top 100 Fashion Influencers on Instagram 2025](https://influencers.feedspot.com/fashion_instagram_influencers/)

---

## 👤 Influencer Profiles

### 1. **Chiara Ferragni** (@chiaraferragni)
- **Followers:** 29M
- **Style:** Italian luxury fashion, haute couture
- **Content:** Designer brands, fashion weeks, runway outfits, street style
- **Why:** Original fashion influencer, entrepreneur, pure fashion focus

### 2. **Aimee Song** (@aimesong)
- **Followers:** 6M+
- **Style:** Sustainable fashion, street style, minimalist aesthetic
- **Content:** Outfit posts, fashion styling, interior design aesthetics
- **Why:** Pioneer influencer, "Song of Style" brand, fashion + design blend

### 3. **Alexa Chung** (@alexachung)
- **Followers:** 5.5M
- **Style:** British vintage, bohemian, eclectic
- **Content:** Fashion editorials, styling inspiration, vintage pieces
- **Why:** Iconic British style, sophisticated fashion authority

### 4. **Wisdom Kaye** (@wisdomkaye)
- **Followers:** 2M+
- **Style:** Creative editorial, gender-fluid fashion, experimental
- **Content:** Avant-garde outfit posts, quick-change videos, styling hacks
- **Why:** Gen Z fashion innovation, TikTok crossover success

### 5. **Camila Coelho** (@camilacoelho)
- **Followers:** 10.5M
- **Style:** Brazilian luxury, red carpet glamour, coastal chic
- **Content:** High fashion outfits, Oscar de la Renta collabs, Mediterranean aesthetic
- **Why:** Luxury lifestyle focus, strong outfit content

### 6. **Jessica Wang** (@notjessfashion)
- **Followers:** 2M
- **Style:** NYC high-fashion glamour, editorial-worthy outfits
- **Content:** Outfit transitions, dramatic styling, fashion week looks
- **Why:** Quick-change videos, fashion hacks, pure outfit content

### 7. **Olivia Palermo** (@oliviapalermo)
- **Followers:** 7.3M
- **Style:** Classic timeless fashion, polished elegance
- **Content:** Designer collaborations (Banana Republic, Aquazzura), street style
- **Why:** Fashion icon status, consistent outfit inspiration

### 8. **Julie Sariñana** (@sincerelyjules)
- **Followers:** 7.6M
- **Style:** Casual chic, accessible fashion, vintage-inspired
- **Content:** Everyday outfit posts, shopping finds, travel style
- **Why:** Relatable fashion, consistent posting, authentic style

---

## ⚙️ Bright Data Scraper Settings

### Recommended Configuration:

**Input Settings:**
- **URLs:** All 8 URLs above
- **Posts per account:** 5-8 posts
- **Total posts target:** 40-64 posts

**Filters:**
- **Time range:** Last 7 days only
- **Post types:** Feed posts (exclude Reels/Stories for simplicity)
- **Minimum likes:** 1,000+ (optional quality filter)

**Fields to Capture:**
```json
{
  "post_id": "string",
  "username": "string",
  "caption": "string",
  "likes": "number",
  "comments": "number",
  "posted_date": "datetime",
  "image_url": "string",
  "post_url": "string",
  "hashtags": "array",
  "tagged_products": "array (if available)",
  "shopping_url": "string (if available)"
}
```

---

## 🔄 Weekly Workflow Process

### Option A: Manual (Current Setup)

**Every Monday (or preferred day):**

1. **Go to Bright Data Dashboard**
   - Navigate to your Instagram scraper
   - Verify the 8 URLs are configured

2. **Run Scraper Manually**
   - Click "Run" or "Trigger"
   - Wait 5-10 minutes for completion

3. **Get Snapshot ID**
   - Copy the new snapshot ID from results
   - Example: `gd_xxxxxxxxxxxxxxxxx`

4. **Update N8N Workflow**
   - Open n8n: http://localhost:5678
   - Open "Instagram Fashion Insights" workflow
   - Click "Bright Data - Get Instagram Posts" node
   - Update URL with new snapshot ID
   - Save workflow

5. **Run Newsletter Workflow**
   - Click "Execute Workflow"
   - Check emails in ~2-3 minutes

---

### Option B: Automated (Future Setup)

**For full automation:**

1. Set up Bright Data Collector (instead of one-time scrapes)
2. Schedule Collector to run weekly (e.g., Monday 8 AM)
3. Update n8n workflow to use Collector endpoint
4. Schedule n8n workflow to run Monday 9 AM
5. **Result:** Fully automated, zero manual work

---

## 🚫 Influencers to AVOID

**Do NOT add these accounts** (pro-Palestine activism):

- ❌ @bellahadid (Bella Hadid)
- ❌ @gigihadid (Gigi Hadid)
- ❌ @kendalljenner (Kendall Jenner - posted then deleted pro-Palestine content)

---

## 📊 Expected Data Volume

**Per Week:**
- **8 influencers** × **5-8 posts each** = **40-64 posts**
- **AI will analyze** all posts for trends
- **Newsletter will feature** top 8 posts + products
- **Typical engagement** per post: 50K - 2M likes

---

## 🔧 Troubleshooting

### Issue: Not enough posts returned
**Solution:** Increase "posts per account" to 10, or expand time range to 14 days

### Issue: Too many posts (overwhelming AI)
**Solution:** Reduce to 5 posts per account, or add minimum likes filter (100K+)

### Issue: Missing product links
**Solution:** Normal - only ~30-40% of fashion posts have tagged products

### Issue: Image URLs not working
**Solution:** Instagram blocks hotlinking - images need to be loaded by user clicking "Display images" in Gmail

---

## 📝 Notes

- **Diversity achieved:** Mix of mega-influencers (Kylie: 392M) and niche creators (Wisdom: 2M)
- **Geographic spread:** US, Italy, Brazil, UK
- **Style variety:** Luxury, street, casual, editorial, glam
- **All politically neutral:** No Israel/Palestine controversies
- **Active accounts:** All post 3-7x per week

---

## 🔗 Related Documentation

- Main workflow: `workflows/fashion-insights-INFLUENCER-PRODUCTS.json`
- Testing guide: `WORKFLOW-TESTING-GUIDE.md`
- Overall project: `fashion_documentation.md`

---

**Ready to scrape!** 🚀
