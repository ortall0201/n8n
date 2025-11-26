# Shopify Product Integration - Setup Guide

> Add trending Shopify products to your Fashion Insights newsletter!

---

## What's New in This Workflow

This enhanced workflow adds **Shopify product recommendations** based on AI-identified trends:

✅ **Automatic Product Matching** - Searches Shopify for products matching trending styles
✅ **Smart Product Selection** - Shows top 5 products with variety across trends
✅ **Beautiful Product Display** - Product cards with images, prices, and "Shop Now" buttons
✅ **Seamless Integration** - Works with your existing Google Sheets subscriber list

---

## Workflow Architecture

```
Instagram Scraping → AI Analysis → Format Report
    ↓
Extract Product Search Keywords (NEW)
    ↓
Search Shopify Products (NEW)
    ↓
Format Product Recommendations (NEW)
    ↓
Get Google Sheets Subscribers
    ↓
Loop & Send Emails with Products
```

**New Nodes Added:**
1. **Extract Product Search Keywords** - Takes top trends and creates search queries
2. **Search Shopify Products** - Searches your Shopify store for matching products
3. **Format Product Recommendations** - Selects and formats top 5 products
4. **Prepare Email with Products** - Updated to include product cards in email

---

## Prerequisites

Before starting, you need:

1. ✅ **Shopify Store** (any plan works)
2. ✅ **Shopify Admin Access** (to create API credentials)
3. ✅ **Products in Your Store** (with proper titles, descriptions, tags)
4. ✅ **OpenAI API Key** (for fashion analysis)
5. ✅ **Google Sheets** (for subscriber management)
6. ✅ **Email Provider** (Mailjet SMTP or similar)

---

## Step 1: Get Shopify API Credentials

### 1.1 Create a Custom App

1. **Log in to Shopify Admin**: https://YOUR_STORE.myshopify.com/admin
2. **Go to Settings** → **Apps and sales channels**
3. **Click "Develop apps"**
4. **Click "Allow custom app development"** (if prompted)
5. **Click "Create an app"**
6. **App name**: `n8n Fashion Newsletter Integration`
7. **App developer**: Your email
8. **Click "Create app"**

### 1.2 Configure API Scopes

1. **Click "Configure Admin API scopes"**
2. **Select these permissions:**
   - ✅ `read_products` - Read products, variants, and collections
   - ✅ `read_product_listings` - Read product listings
   - ✅ `read_inventory` - Read inventory (optional, for stock status)
3. **Click "Save"**

### 1.3 Install the App

1. **Click "Install app"** button (top right)
2. **Click "Install"** to confirm

### 1.4 Get Your API Credentials

1. **Click "API credentials" tab**
2. **Copy these values** (you'll need them for n8n):
   - **Admin API access token** (starts with `shpat_...`)
   - **API key**
   - **API secret key**
3. **Your shop URL**: `YOUR_STORE.myshopify.com`

**Important:** Keep these credentials secure! Never share them publicly.

---

## Step 2: Import the New Workflow

1. **Open n8n**: http://localhost:5678
2. **Click "⋮" menu** (top right) → **"Import from file"**
3. **Select file**: `C:\Users\user\Desktop\n8n\workflows\fashion-insights-SHOPIFY-INTEGRATION.json`
4. **Click "Import"**

✅ Workflow imported!

---

## Step 3: Connect Shopify to n8n

### 3.1 Add Shopify Credentials

1. **In the workflow, click on "Search Shopify Products" node**
2. **Click "Credential to connect with"** dropdown
3. **Click "+ Create New Credential"**
4. **Select "Shopify API"**
5. **Fill in:**
   - **Shop Subdomain**: `YOUR_STORE` (without .myshopify.com)
   - **Access Token**: Your Admin API access token from Step 1.4
   - **App Secret Key**: Your API secret key from Step 1.4
6. **Click "Save"**

### 3.2 Update Shopify Store URL

1. **Click on "Format Product Recommendations" node**
2. **Find line with**: `https://YOUR_SHOPIFY_STORE.myshopify.com`
3. **Replace with your actual store URL**: `https://your-store-name.myshopify.com`

---

## Step 4: Optimize Your Shopify Products

For best results, ensure your Shopify products have:

### 4.1 Good Product Data

**Required:**
- ✅ **Title** - Clear, descriptive product names
- ✅ **Price** - Proper pricing
- ✅ **Images** - High-quality product photos
- ✅ **Handle** - URL-friendly product identifier (auto-generated)

**Recommended:**
- ✅ **Description** - Detailed product descriptions
- ✅ **Product Type** - Category (e.g., "Dress", "Shoes", "Jacket")
- ✅ **Vendor** - Brand name
- ✅ **Tags** - Keywords for better matching (e.g., "oversized", "minimalist", "vintage")

### 4.2 Add Relevant Tags

To improve trend matching, add tags like:
- Style tags: `oversized`, `minimalist`, `vintage`, `streetwear`
- Color tags: `beige`, `black`, `burgundy`, `neutral`
- Category tags: `blazer`, `cargo-pants`, `sneakers`, `dress`
- Trend tags: `sustainable`, `retro`, `modern`

**How to add tags:**
1. Go to Shopify Admin → Products
2. Click on a product
3. Scroll to "Tags" field
4. Add comma-separated tags
5. Click "Save"

---

## Step 5: Configure Other Credentials

Make sure you have these credentials set up:

### 5.1 OpenAI API (Required)

1. **Click "AI Fashion Analysis (OpenAI)" node**
2. **Add OpenAI credentials** (if not already set)
3. Get API key from: https://platform.openai.com/api-keys

### 5.2 Google Sheets (Required)

1. **Click "Get Subscribers from Google Sheets" node**
2. **Add Google Sheets OAuth2 credentials**
3. **Select your subscriber sheet**

### 5.3 Email Provider (Required)

1. **Click "Send Fashion Newsletter" node**
2. **Update "From Email"** to your verified email
3. **Configure SMTP credentials** (Mailjet, Gmail, etc.)

---

## Step 6: Test the Workflow

### 6.1 Quick Test of Shopify Connection

1. **Click on "Search Shopify Products" node**
2. **Click "Test step"** (or just run the whole workflow)
3. **You should see:**
   - Products from your Shopify store
   - Product titles, prices, images
   - Product URLs

**If no products found:**
- Check your Shopify API credentials
- Make sure you have products in your store
- Verify products are published (not draft)

### 6.2 Full Workflow Test

1. **Make sure you have:**
   - At least 1 active subscriber in Google Sheets
   - OpenAI API key configured
   - Email SMTP configured
2. **Click "Execute Workflow"** button
3. **Watch the execution:**
   - ✅ Instagram posts scraped/parsed
   - ✅ AI analyzes trends
   - ✅ Shopify products searched and formatted
   - ✅ Email sent to subscribers

4. **Check your inbox!** You should see:
   - Fashion trend insights
   - Instagram post highlights
   - **NEW: Shopify product recommendations** 🎉

---

## Understanding the Product Matching Logic

### How Products Are Selected

1. **AI identifies trends**: e.g., "oversized blazers", "cargo pants", "minimalist style"
2. **Extract keywords**: Takes top 3 trends + 2 styles + 2 colors
3. **Search Shopify**: Runs search for each keyword
4. **Select best matches**: Picks top 5 products with variety
5. **Include in email**: Displays as product cards with "Shop Now" buttons

### Example Flow

**AI Identifies:**
- Top trends: "Oversized blazers", "Cargo pants revival", "Sustainable fashion"
- Popular colors: "Beige", "Cream"

**Shopify Searches:**
1. Search: "oversized blazers" → Finds 5 products
2. Search: "cargo pants revival" → Finds 5 products
3. Search: "sustainable fashion" → Finds 5 products
4. Search: "beige" → Finds 5 products
5. Search: "cream" → Finds 5 products

**Selection Logic:**
- Takes 1 product from each search (variety)
- Total: 5 products shown in newsletter
- Products displayed with image, price, description, and purchase link

---

## Email Template Preview

Your newsletter now includes this new section:

```html
🛍️ Shop These Trending Styles
Get these products inspired by this week's top trends

[Product Image]
Oversized Beige Blazer
by Acme Fashion

A timeless oversized blazer in neutral beige tones,
perfect for the modern minimalist wardrobe...

$89.99
[Shop Now →]

[Product Image]
High-Waist Cargo Pants
by Urban Threads

Reviving the cargo pants trend with a modern twist...

$65.00
[Shop Now →]

... (3 more products)
```

---

## Customization Options

### Adjust Number of Products

**Show more/fewer products in email:**

Edit `Format Product Recommendations` node (line 24):
```javascript
for (let i = 0; i < 5 && selectedProducts.length < 5; i++) {
```
Change `5` to desired number (3-10 recommended)

### Filter by Price Range

**Only show products in specific price range:**

Edit `Format Product Recommendations` node, add after line 11:
```javascript
if (item.json.id) {
  const price = parseFloat(item.json.variants?.[0]?.price || 0);
  if (price < 50 || price > 200) return; // Skip products outside $50-$200

  productsByTrend[searchQuery].push({
    ...
```

### Prioritize Specific Product Types

**Prioritize certain categories:**

Edit `Extract Product Search Keywords` node:
```javascript
// Prioritize specific categories
const searchTerms = [
  'blazer',  // Add specific product type
  'dress',   // Add specific product type
  ...insights.top_trends.slice(0, 2),
  ...insights.popular_colors.slice(0, 1)
];
```

### Add Discount/Sale Badge

**Show sale items:**

Edit `Prepare Email with Products` node, in product card HTML:
```javascript
${product.compare_at_price && product.compare_at_price > product.price ?
  `<span style="background: #ff4444; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">SALE</span>`
  : ''}
```

---

## Troubleshooting

### Issue: "No products found in Shopify search"

**Causes:**
- No products match the trend keywords
- Products are in draft status
- API credentials incorrect
- Products don't have proper titles/tags

**Solutions:**
1. **Check product status**: Make sure products are "Active" in Shopify
2. **Test Shopify node directly**: Click on "Search Shopify Products" → "Test step"
3. **Check API permissions**: Verify `read_products` scope is enabled
4. **Add product tags**: Tag products with trend keywords (see Step 4.2)
5. **Broaden search**: Edit `Extract Product Search Keywords` to use more general terms

### Issue: "Products show but images missing"

**Cause:** Products don't have images uploaded

**Solution:**
1. Go to Shopify Admin → Products
2. Click on products missing images
3. Upload product images
4. Click "Save"

### Issue: "Product links don't work"

**Cause:** Wrong store URL in workflow

**Solution:**
1. Click on "Format Product Recommendations" node
2. Find line with `https://YOUR_SHOPIFY_STORE.myshopify.com`
3. Replace with your actual store URL
4. Or use: `${product.admin_graphql_api_id}` for dynamic URLs

### Issue: "Too many/few products shown"

**Cause:** Default limit is 5 products per search term

**Solution:**
1. Click "Search Shopify Products" node
2. Change "Limit" field to desired number
3. Update `Format Product Recommendations` selection logic (see Customization)

---

## Performance & Costs

### Shopify API Limits

**Free Plan:**
- 2 requests/second
- Sufficient for small subscriber lists (100-1000)

**Paid Plans:**
- 4-10 requests/second
- Scales to larger lists

**This workflow uses:**
- ~5-7 Shopify API calls per execution (one per search term)
- Well within rate limits

### Cost Estimate

**Per newsletter execution:**
- Shopify API: Free (included in all plans)
- OpenAI API: ~$0.01 (GPT-4o-mini)
- Email sending: Depends on provider (Mailjet: 200 free/day)

**Total cost: ~$0.01-0.05 per newsletter** (for 50-100 subscribers)

---

## Next Steps: Deploy to Hostinger

Once you've tested locally and everything works:

### Option 1: Self-Hosted n8n on Hostinger VPS

1. **Get Hostinger VPS** (start at ~$5/month)
2. **Install n8n on VPS**:
   ```bash
   npm install n8n -g
   n8n start
   ```
3. **Export workflow** from local n8n
4. **Import workflow** to VPS n8n
5. **Set up scheduler** (run daily/weekly)
6. **Configure domain** (optional, for webhook triggers)

### Option 2: n8n Cloud + Hostinger Landing Page

1. **Sign up for n8n Cloud** (free tier available)
2. **Import workflow** to n8n Cloud
3. **Create signup form on Hostinger**
4. **Connect form to Google Sheets** (via webhook/Zapier/n8n)
5. **Schedule workflow** in n8n Cloud

**Recommended:** Option 2 is easier for beginners, no server management needed.

---

## Advanced Features (Coming Next)

Once Shopify integration is working, consider adding:

### 1. Product Analytics
- Track which products get the most clicks
- Store analytics in Google Sheets
- Optimize product selection based on performance

### 2. Personalized Product Recommendations
- Different products for different subscriber segments
- Based on subscriber preferences/tags
- A/B testing different product sets

### 3. Inventory Sync
- Only show in-stock products
- Add "Low Stock" badges
- Filter out sold-out items

### 4. Dynamic Pricing
- Show member discounts
- Include promo codes
- Display sale/clearance items

---

## FAQ

**Q: Can I use products from multiple Shopify stores?**
A: Yes! Add multiple "Search Shopify Products" nodes with different credentials.

**Q: Can I use products from other platforms (WooCommerce, Etsy)?**
A: Yes! n8n has nodes for WooCommerce, Etsy, Amazon, and others. Replace the Shopify node.

**Q: How do I track which products subscribers click?**
A: Add UTM parameters to product URLs (e.g., `?utm_source=newsletter&utm_medium=email`), then track in Google Analytics.

**Q: Can I manually select which products to feature?**
A: Yes! Create a "Featured Products" sheet in Google Sheets, read from there instead of searching Shopify.

**Q: What if my Shopify store is in a different currency?**
A: Update the `$` symbol in the email template to your currency (€, £, etc.). Shopify returns prices in your store's currency.

---

## Testing Checklist

Before sending to real subscribers:

- [ ] Shopify API connected and working
- [ ] Products appear in "Search Shopify Products" output
- [ ] Product images display correctly
- [ ] Product links work and open correct products
- [ ] Prices display correctly
- [ ] Email HTML renders properly (test in Gmail, Outlook)
- [ ] "Shop Now" buttons work
- [ ] Mobile view looks good (forward test email to phone)
- [ ] Only active subscribers receive emails
- [ ] Unsubscribe link works (add if needed)

---

## Success! 🎉

Your fashion newsletter now includes:
- ✅ Instagram trend analysis
- ✅ AI-powered insights
- ✅ **Shopify product recommendations**
- ✅ Google Sheets subscriber management
- ✅ Automated email delivery

**Subscribers can now:**
1. Read about trending fashion styles
2. See real Instagram posts showcasing trends
3. **Shop relevant products directly from your store**

**Time to execution:** 30-45 minutes
**Workflow runs:** Manually or scheduled (daily/weekly)
**Scalability:** 100-10,000 subscribers

---

## Support & Resources

**Shopify API Documentation:**
https://shopify.dev/docs/api/admin-rest

**n8n Shopify Node Documentation:**
https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.shopify/

**Need Help?**
- n8n Community: https://community.n8n.io
- Shopify Forums: https://community.shopify.com

---

Ready to send your first newsletter with product recommendations? 🚀

**Run the workflow and check your inbox!**
