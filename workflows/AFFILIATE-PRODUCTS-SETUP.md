# Fashion Newsletter with Affiliate/Curated Products - Setup Guide

> Promote products from ANY store without needing your own Shopify! Perfect for affiliate marketing, content creators, and curators.

---

## 🎯 What This Workflow Does

Instead of searching Shopify, you'll:
- ✅ **Manually curate products** from any online store (Zara, H&M, Amazon, etc.)
- ✅ **Add them to Google Sheets** with images, prices, and links
- ✅ **AI matches products to trends** automatically
- ✅ **Products appear in newsletter** with affiliate/direct links

**Perfect for:**
- Affiliate marketers
- Fashion bloggers/influencers
- Content creators
- Newsletter publishers
- Curators without their own store

---

## 📊 Setup Your Product Sheet (5 minutes)

### Step 1: Open Your Google Sheet

1. Go to the Google Sheet you created for subscribers
2. **Add a new sheet tab** called **"Products"**
   - Click the **+** button at the bottom
   - Name it: `Products`

### Step 2: Add Column Headers

In the **Products** sheet, add these headers in row 1:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| title | brand | store | price | original_price | description | image_url | url | tags | featured |

### Step 3: Add Your First Products

Here's an example of how to fill it out:

**Row 2 (Example Product 1):**
- **A2 (title):** Oversized Beige Blazer
- **B2 (brand):** Zara
- **C2 (store):** Zara.com
- **D2 (price):** $89.99
- **E2 (original_price):** Leave empty (or $120 if on sale)
- **F2 (description):** Classic oversized blazer in neutral beige. Perfect for minimalist wardrobe.
- **G2 (image_url):** https://static.zara.net/photos/...jpg (copy from product page)
- **H2 (url):** https://www.zara.com/us/en/oversized-blazer-p12345.html
- **I2 (tags):** oversized, blazer, beige, minimalist, neutral
- **J2 (featured):** yes

**Row 3 (Example Product 2):**
- **A3:** High-Waist Cargo Pants
- **B3:** H&M
- **C3:** HM.com
- **D3:** $49.99
- **E3:** (empty)
- **F3:** Modern cargo pants with utility pockets. Streetwear essential.
- **G3:** https://lp2.hm.com/hmgoepprod/...jpg
- **H3:** https://www2.hm.com/en_us/productpage.12345.html
- **I3:** cargo pants, streetwear, utility, pants
- **J3:** no

---

## 🔍 Where to Find Products

### Fashion Retailers (Direct Links)
- **Zara:** https://www.zara.com
- **H&M:** https://www2.hm.com
- **ASOS:** https://www.asos.com
- **Nordstrom:** https://www.nordstrom.com
- **Mango:** https://www.mango.com

### Affiliate Networks (Earn Commission)
- **Amazon Associates:** https://affiliate-program.amazon.com
- **rewardStyle/LTK:** https://www.shopltk.com
- **ShareASale:** https://www.shareasale.com
- **Awin:** https://www.awin.com
- **CJ Affiliate:** https://www.cj.com

### How to Get Affiliate Links:
1. Sign up for affiliate program
2. Find product on retailer site
3. Generate affiliate link
4. Paste affiliate link in `url` column

---

## 📸 How to Get Product Images

### Method 1: Right-Click (Easiest)
1. Go to product page
2. Right-click on product image
3. Select "Copy Image Address" or "Copy Image Link"
4. Paste in `image_url` column

### Method 2: Inspect Element
1. Right-click image → "Inspect"
2. Find `<img src="https://...">` tag
3. Copy the URL
4. Paste in `image_url` column

### Example URLs:
```
Zara: https://static.zara.net/photos/2025/I/0/1/p/1234/567/800/2/w/1920/1234567_1_1_1.jpg
H&M: https://lp2.hm.com/hmgoepprod/1234567001001/1_style/1234567.jpg
Amazon: https://m.media-amazon.com/images/I/71abc123def.jpg
```

---

## 🏷️ Product Tags (Important!)

Tags help match products to AI-identified trends.

### Good Tag Examples:

**For an oversized blazer:**
```
oversized, blazer, beige, neutral, minimalist, outerwear, jacket
```

**For cargo pants:**
```
cargo pants, streetwear, utility, casual, pants, bottoms, trendy
```

**For sneakers:**
```
chunky sneakers, shoes, white, streetwear, sneakers, footwear
```

### Tag Categories:
- **Style:** oversized, minimalist, vintage, streetwear, elegant
- **Color:** beige, black, white, burgundy, neutral, colorful
- **Category:** blazer, pants, dress, shoes, jacket, accessory
- **Trend:** sustainable, retro, modern, sporty, casual, formal

**Tip:** More tags = better chance of matching AI trends!

---

## 🎯 Product Selection Strategy

### Featured Products (Always Show)
Set `featured` column to `yes` for products you always want to include:
- Your best affiliate offers
- Seasonal promotions
- High-commission items
- Products on sale

### Trend-Matched Products
Products with tags matching AI trends will be prioritized:
- AI detects "oversized blazers" → Products with "oversized" + "blazer" tags get shown
- AI finds "cargo pants" → Products tagged "cargo pants" appear
- AI identifies "beige" → Products with "beige" tag are featured

### Selection Logic:
1. Products with `featured = yes` get priority
2. Products matching trend keywords get high scores
3. Top 5 highest-scoring products appear in newsletter
4. If fewer than 3 match, featured products fill the gaps

---

## 📋 Complete Google Sheets Structure

Your sheet should have 2 tabs:

### Tab 1: Subscribers
| email | name | status | signup_date |
|-------|------|--------|-------------|
| ortal@gmail.com | Ortal | active | 2025-11-26 |
| friend@gmail.com | Friend | active | 2025-11-26 |

### Tab 2: Products
| title | brand | store | price | original_price | description | image_url | url | tags | featured |
|-------|-------|-------|-------|----------------|-------------|-----------|-----|------|----------|
| Oversized Beige Blazer | Zara | Zara.com | $89.99 | | Classic oversized... | https://... | https://... | oversized, blazer, beige | yes |
| Cargo Pants | H&M | HM.com | $49.99 | | Modern cargo... | https://... | https://... | cargo pants, streetwear | no |
| Chunky Sneakers | Nike | Nike.com | $120.00 | $150.00 | White chunky... | https://... | https://... | sneakers, chunky, white | yes |

---

## ⚙️ Configure n8n Workflow

### Step 1: Import Workflow

1. Open n8n: http://localhost:5678
2. Import file: `C:\Users\user\Desktop\n8n\workflows\fashion-insights-AFFILIATE-LINKS.json`

### Step 2: Connect Google Sheets

1. Click **"Get Curated Products"** node
2. Select your Google Sheet
3. **Sheet Name:** `Products`
4. Click **"Test step"** to verify products appear

### Step 3: Update Subscriber Sheet Connection

1. Click **"Get Subscribers from Google Sheets"** node
2. **Sheet Name:** `Subscribers` (or whatever you named it)

### Step 4: Test Product Matching

1. Run the workflow
2. Check **"Match Products to Trends"** node output
3. Should see products with `match_score` values
4. Top 5 products selected for email

---

## 🧪 Testing Your Setup

### Test 1: Verify Products Load
1. Click **"Get Curated Products"** node
2. Click **"Test step"**
3. ✅ Should see all products from your sheet

### Test 2: Check Product Matching
1. Run workflow until **"Match Products to Trends"** node
2. Check output for `match_score` values
3. ✅ Products matching trends should have higher scores

### Test 3: Preview Email
1. Run full workflow
2. Check your inbox
3. ✅ Products should appear with:
   - Product image
   - Title and brand
   - Price
   - Description
   - "Shop Now" button linking to product

---

## 🎨 Email Preview

Your newsletter will show products like this:

```
🛍️ Shop These Trending Styles
Handpicked products matching this week's top trends

┌──────────────────────────────────────────┐
│ [Product Image]                          │
│                                          │
│ Oversized Beige Blazer                   │
│ by Zara                                  │
│ Available at Zara.com                    │
│                                          │
│ Classic oversized blazer in neutral      │
│ beige. Perfect for minimalist...         │
│                                          │
│ $89.99                                   │
│ [Shop Now →]                             │
└──────────────────────────────────────────┘

[4 more products...]
```

---

## 💰 Affiliate Marketing Tips

### Track Your Links
Add UTM parameters to track performance:

**Original URL:**
```
https://www.zara.com/us/en/blazer-p12345.html
```

**With Tracking:**
```
https://www.zara.com/us/en/blazer-p12345.html?utm_source=newsletter&utm_medium=email&utm_campaign=fashion_insights
```

**Then update Google Sheet:**
- **url column:** Add the full URL with UTM parameters

### Monitor Performance
Track in Google Analytics or affiliate dashboard:
- Which products get the most clicks
- Which newsletters drive the most sales
- Best-performing product categories

### Optimize Selection
Based on performance:
- Feature high-converting products (`featured = yes`)
- Remove products that never get clicked
- Update products seasonally
- Add new trending items weekly

---

## 🔄 Product Curation Workflow

### Weekly Routine (30 minutes)

**Monday:**
1. Browse trending fashion on Instagram
2. Find 5-10 products matching trends
3. Get product details (title, price, image, link)
4. Add to Google Sheet "Products" tab
5. Tag appropriately

**Tuesday:**
1. Run n8n workflow
2. Check which products were selected
3. Review email preview
4. Send to subscribers

**Friday:**
1. Check affiliate dashboard for clicks/sales
2. Note which products performed best
3. Mark top performers as `featured = yes`
4. Plan next week's product curation

---

## 🚀 Advanced Options

### Option 2: Scrape Products from Websites

Instead of manual curation, automatically scrape products:

**Tools:**
- **Apify:** https://apify.com (e-commerce scrapers)
- **Scrapy:** Python scraping framework
- **n8n HTTP Request:** Direct scraping

**Example: Scrape Zara**
1. Add HTTP Request node
2. URL: `https://www.zara.com/api/catalog/...`
3. Parse JSON response
4. Extract: title, price, image, link
5. Store in Google Sheets

### Option 3: Use Amazon Product API

If promoting Amazon products:

**Amazon Product Advertising API:**
1. Sign up: https://affiliate-program.amazon.com/assoc_credentials
2. Get API keys
3. Add Amazon node to n8n (community node)
4. Search products by keywords
5. Auto-populate Google Sheet

### Option 4: Use Fashion APIs

**Fashion-specific APIs:**
- **ASOS API:** Product catalog access
- **ShopStyle API:** Multi-retailer aggregator
- **Nordstrom API:** Product search

---

## 📊 Example Product Categories

### Curate 5 Products per Category:

**Outerwear:**
- Oversized blazers
- Trench coats
- Leather jackets
- Puffer coats

**Bottoms:**
- Cargo pants
- Wide-leg jeans
- Midi skirts
- Tailored trousers

**Footwear:**
- Chunky sneakers
- Ankle boots
- Loafers
- Platform heels

**Accessories:**
- Mini bags
- Bucket hats
- Sunglasses
- Statement jewelry

**Rotate categories weekly** to keep content fresh!

---

## 🎯 Success Metrics

Track these KPIs:

### Engagement
- Email open rate: Target 25-35%
- Click-through rate: Target 3-5%
- Product click rate: Target 10-15%

### Revenue (Affiliate)
- Clicks to affiliate links
- Conversions (purchases)
- Commission earned
- Revenue per email sent

### Content Performance
- Which product categories perform best
- Best-performing price ranges
- Most clicked brands
- Top converting stores

---

## 📝 Product Sheet Template

Copy this into your Google Sheet:

### Example Products to Get Started:

| title | brand | store | price | original_price | description | image_url | url | tags | featured |
|-------|-------|-------|-------|----------------|-------------|-----------|-----|------|----------|
| Oversized Wool Blazer | Zara | Zara.com | $129.00 | | Structured oversized blazer in neutral tone | [Find on product page] | https://www.zara.com/... | oversized, blazer, wool, neutral, minimalist | yes |
| High-Rise Wide Leg Jeans | Levi's | Levis.com | $98.00 | | Classic wide-leg fit in vintage wash | [Find on product page] | https://www.levi.com/... | jeans, wide leg, denim, vintage, pants | no |
| Chunky Platform Sneakers | Nike | Nike.com | $110.00 | $140.00 | Retro-inspired platform sneakers | [Find on product page] | https://www.nike.com/... | sneakers, chunky, platform, white, shoes | yes |
| Mini Crossbody Bag | Mango | Mango.com | $49.99 | | Structured mini bag with chain strap | [Find on product page] | https://shop.mango.com/... | bag, mini bag, crossbody, accessory | no |
| Oversized Sunglasses | Ray-Ban | Sunglass Hut | $180.00 | | Classic oversized frame in tortoise | [Find on product page] | https://www.sunglasshut.com/... | sunglasses, oversized, accessory, retro | no |

Replace `[Find on product page]` with actual image URLs!

---

## 🔧 Customization Options

### Show Only Featured Products
Edit **"Match Products to Trends"** node:
```javascript
// Only show featured products
const selectedProducts = allProducts
  .filter(item => item.json.featured === 'yes' || item.json.featured === true)
  .slice(0, 5);
```

### Change Number of Products
Show 3 instead of 5:
```javascript
.slice(0, 3)  // Change 5 to 3
```

### Prioritize Sale Items
Add scoring for products on sale:
```javascript
if (product.original_price && product.original_price > product.price) {
  score += 15;  // Boost score for sale items
}
```

---

## ✅ Quick Checklist

Before sending your first newsletter:

- [ ] Created "Products" sheet in Google Sheets
- [ ] Added 5-10 products with all fields filled
- [ ] Added product images (URLs work)
- [ ] Added tags to each product
- [ ] Marked at least 2 products as featured
- [ ] Imported workflow to n8n
- [ ] Connected Google Sheets (Products tab)
- [ ] Tested "Get Curated Products" node
- [ ] Ran full workflow successfully
- [ ] Checked email preview
- [ ] Products appear correctly in email
- [ ] "Shop Now" links work

---

## 💡 Pro Tips

### 1. Seasonal Updates
Update products every season:
- Spring: Light colors, dresses, sandals
- Summer: Swimwear, shorts, sunglasses
- Fall: Jackets, boots, layering pieces
- Winter: Coats, sweaters, winter accessories

### 2. Price Range Variety
Include different price points:
- Budget: $20-50
- Mid-range: $50-100
- Premium: $100-200
- Luxury: $200+

### 3. Brand Mix
Mix well-known and emerging brands:
- Fast fashion: Zara, H&M, ASOS
- Contemporary: COS, & Other Stories, Mango
- Designer: Designer brands at retailers
- Indie: Smaller boutique brands

### 4. Update Frequency
- Add 5-10 new products weekly
- Remove sold-out items
- Update prices if changed
- Refresh images if needed

---

## 🎉 You're Ready!

Your affiliate/curated product newsletter is ready to:
- ✅ Show products from ANY store
- ✅ Match products to AI-identified trends
- ✅ Earn affiliate commissions
- ✅ Scale to any number of subscribers

**No Shopify needed! No inventory needed! Just curate and earn! 🚀**

---

## 📞 Need Help?

**Common Questions:**

**Q: Can I use Amazon affiliate links?**
A: Yes! Just paste your Amazon affiliate link in the `url` column.

**Q: How do I track which products get clicked?**
A: Add UTM parameters to URLs, then track in Google Analytics.

**Q: Can I promote products from multiple stores in one email?**
A: Yes! That's the beauty of this approach. Mix Zara, H&M, Amazon, etc.

**Q: What if a product goes out of stock?**
A: Just remove that row from your Google Sheet or change `featured` to `no`.

**Q: Can I automate product discovery?**
A: Yes, use web scraping or fashion APIs (see Advanced Options above).

---

**Start curating your first 10 products and send your first newsletter! 📧✨**

*Last updated: November 26, 2025*
*Perfect for affiliate marketers, bloggers, and content creators*
