# 💰 Complete Affiliate Setup + n8n Integration Guide

**Goal**: Get affiliate accounts AND integrate them into your n8n workflow

**Total Time**: 1-2 hours setup + 3-7 days for approvals

---

## 📋 What You'll Accomplish

By the end of this guide:
- ✅ Amazon Associates account (approved and working)
- ✅ Affiliate links created for 5-10 products
- ✅ Links automatically added to your newsletter
- ✅ Links in Devi's blog posts
- ✅ Tracking system set up
- ✅ (Optional) LTK and ShopStyle accounts

---

## 🎯 PHASE 1: Get Amazon Associates Account (TODAY - 20 min)

### Step 1: Sign Up for Amazon Associates (10 min)

1. **Go to**: https://affiliate-program.amazon.com/
2. **Click**: "Sign up" (orange button, top right)
3. **Sign in** with your existing Amazon account (or create new one)

4. **Fill in Account Information**:
   - **Payee Name**: Your name or business name
   - **Address**: Your address (for tax purposes)
   - **Phone**: Your phone number

5. **Fill in Website/App Information**:
   - **Website URL**:
     - If you have landing page: `https://yourdomain.com`
     - If no website yet: Use your LinkedIn profile or create free site at `yourname.wordpress.com`
   - **Mobile App**: Leave blank (unless you have app)

6. **Select Store ID**:
   - Enter a name for your store (e.g., `fashioninsights-20`)
   - This becomes part of your affiliate links

7. **Describe Your Website**:
   - **Topics**: Fashion, Women's Fashion, Style, Lifestyle
   - **Type of website**: Blog, Newsletter
   - **Choose up to 3 topics**: Fashion, Apparel, Accessories

8. **Describe Website Content**:
   ```
   Weekly fashion insights newsletter analyzing Instagram trends.
   We help subscribers discover what's trending in fashion and
   recommend products to achieve popular looks.
   ```

9. **How do you drive traffic?**:
   - ✅ Email newsletter
   - ✅ Social Media
   - ✅ SEO

10. **How do you build links?**:
    - Select: "On my website or blog"

11. **Monthly visitors**:
    - If starting: "Under 500"
    - Be honest - you can grow!

12. **How did you hear about us?**: (any answer)

13. **Click**: "Finish"

14. **Complete CAPTCHA** and verify phone number

15. **✅ You should see**: "Congratulations! You're approved!" (or "Under review - check email in 24-48 hours")

**IMPORTANT NOTE**: Amazon gives conditional approval. You need **3 qualifying sales within 180 days** or account closes. Don't worry - we'll help you get there!

---

### Step 2: Understand Your Amazon Dashboard (5 min)

1. **Go to**: https://affiliate-program.amazon.com/home
2. **Note your Tracking ID**: Should be something like `fashioninsights-20`
   - This appears in top-right corner
   - You'll need this for creating links

3. **Explore**:
   - **Product Linking** → Create links for specific products
   - **Reports** → Track clicks, sales, earnings
   - **Tools** → Browser extensions and widgets

---

### Step 3: Install Amazon SiteStripe (5 min - OPTIONAL but helpful)

**What it does**: Creates affiliate links directly from Amazon product pages

1. **Go to**: https://affiliate-program.amazon.com/home/tools/siteestripe
2. **Follow instructions** to enable SiteStripe
3. **Now when you visit Amazon.com** while logged into Associates, you'll see a toolbar at top of product pages

**Alternative**: Use "Product Links" in Associates dashboard

---

## 🔗 PHASE 2: Create Your First Affiliate Links (30 min)

### Step 1: Find Trending Fashion Products (10 min)

Based on your newsletter trends, search for products:

**Example trends to products**:
- "Oversized blazers" → Search Amazon for "women oversized blazer"
- "Metallic boots" → Search "women metallic ankle boots"
- "Beige tones" → Search "beige trench coat women"
- "Chunky knits" → Search "chunky cardigan women"

---

### Step 2: Create Affiliate Links (15 min)

**Method A: Using SiteStripe (if installed)**:
1. Go to Amazon.com
2. Search for "women oversized blazer"
3. Click on a product you like
4. At top of page, see SiteStripe toolbar
5. Click "Get Link" → "Full Link"
6. Copy the link (should include your tracking ID)

**Method B: Using Associates Dashboard**:
1. Go to: https://affiliate-program.amazon.com/home
2. Click **"Product Linking"** → **"Product Links"**
3. Enter product search term: "women oversized blazer"
4. Click product from results
5. Click **"Get Link"**
6. Copy the **"Full Link"**

**Your link should look like**:
```
https://www.amazon.com/dp/B08XYZ1234/?tag=fashioninsights-20
```

**The important part**: `tag=fashioninsights-20` (your tracking ID)

---

### Step 3: Organize Your Affiliate Links (5 min)

Create a file: `C:\Users\user\Desktop\n8n\affiliate-products.json`

Copy this template:

```json
{
  "products": [
    {
      "id": "product-1",
      "name": "Oversized Blazer - Black",
      "brand": "The Drop",
      "category": "blazer",
      "trending_keywords": ["oversized", "blazer", "tailored"],
      "price": "$89.99",
      "amazon_link": "https://www.amazon.com/dp/B08XYZ1234/?tag=fashioninsights-20",
      "image_url": "https://m.media-amazon.com/images/...",
      "description": "Classic oversized blazer perfect for the trending tailored-yet-relaxed look"
    },
    {
      "id": "product-2",
      "name": "Metallic Ankle Boots",
      "brand": "Steve Madden",
      "category": "boots",
      "trending_keywords": ["metallic", "boots", "statement"],
      "price": "$129.99",
      "amazon_link": "https://www.amazon.com/dp/B09ABC5678/?tag=fashioninsights-20",
      "description": "Statement metallic boots adding edge to any outfit"
    },
    {
      "id": "product-3",
      "name": "Beige Trench Coat",
      "brand": "GRACE KARIN",
      "category": "coat",
      "trending_keywords": ["beige", "trench", "neutral", "classic"],
      "price": "$65.99",
      "amazon_link": "https://www.amazon.com/dp/B0CDEF9012/?tag=fashioninsights-20",
      "description": "Timeless double-breasted trench in trending neutral tone"
    }
  ]
}
```

**Add 5-10 products** to start. You can add more later!

**Save the file** in: `C:\Users\user\Desktop\n8n\`

---

## 🔧 PHASE 3: Integrate into n8n Workflow (40 min)

Now let's add these affiliate links to your automated newsletter!

---

### Step 1: Open Your Main Workflow in n8n (2 min)

1. **Make sure n8n is running**:
   ```bash
   cd C:\Users\user\Desktop\n8n
   pnpm start
   ```

2. **Go to**: http://localhost:5678

3. **Open workflow**:
   - Click **"Workflows"** (left sidebar)
   - Find: **"Instagram Fashion Insights - Influencer Products + Voice AI"**
   - Click to open

---

### Step 2: Add "Load Affiliate Products" Node (10 min)

**Where to add**: After **"Format Final Report"** node, before email sending

1. **Click** the **+** button between nodes (or drag from Format Final Report)

2. **Search for**: "Code"

3. **Click**: "Code" node (Execute JavaScript Code)

4. **Name the node**: "Load Affiliate Products"

5. **Paste this code**:

```javascript
// LOAD AND MATCH AFFILIATE PRODUCTS TO TRENDS

// Get AI analysis results
const trends = $json.top_trends || [];
const colors = $json.popular_colors || [];
const summary = $json.summary || '';

// Load affiliate products
const products = [
  {
    id: "product-1",
    name: "Oversized Blazer - Black",
    brand: "The Drop",
    category: "blazer",
    trending_keywords: ["oversized", "blazer", "tailored"],
    price: "$89.99",
    amazon_link: "https://www.amazon.com/dp/B08XYZ1234/?tag=fashioninsights-20",
    description: "Classic oversized blazer perfect for the trending tailored-yet-relaxed look"
  },
  {
    id: "product-2",
    name: "Metallic Ankle Boots",
    brand: "Steve Madden",
    category: "boots",
    trending_keywords: ["metallic", "boots", "statement"],
    price: "$129.99",
    amazon_link: "https://www.amazon.com/dp/B09ABC5678/?tag=fashioninsights-20",
    description: "Statement metallic boots adding edge to any outfit"
  },
  {
    id: "product-3",
    name: "Beige Trench Coat",
    brand: "GRACE KARIN",
    category: "coat",
    trending_keywords: ["beige", "trench", "neutral", "classic"],
    price: "$65.99",
    amazon_link: "https://www.amazon.com/dp/B0CDEF9012/?tag=fashioninsights-20",
    description: "Timeless double-breasted trench in trending neutral tone"
  },
  {
    id: "product-4",
    name: "Chunky Cardigan - Cream",
    brand: "Amazon Essentials",
    category: "sweater",
    trending_keywords: ["chunky", "cardigan", "cozy", "knit"],
    price: "$45.99",
    amazon_link: "https://www.amazon.com/dp/B0GHIJ3456/?tag=fashioninsights-20",
    description: "Cozy oversized cardigan in trending chunky knit"
  },
  {
    id: "product-5",
    name: "Wide Leg Jeans - Dark Wash",
    brand: "Levi's",
    category: "jeans",
    trending_keywords: ["wide leg", "jeans", "denim", "90s"],
    price: "$79.99",
    amazon_link: "https://www.amazon.com/dp/B0KLMN7890/?tag=fashioninsights-20",
    description: "High-waisted wide leg jeans for that trending 90s silhouette"
  }
];

// IMPORTANT: Replace the products array above with YOUR actual products from affiliate-products.json!
// For now, manually copy your products here. Later we'll show you how to load from file.

// Smart matching: Find products relevant to this week's trends
const matchedProducts = [];

products.forEach(product => {
  let relevanceScore = 0;

  // Check if product keywords match trends
  const allTrends = trends.join(' ').toLowerCase();
  product.trending_keywords.forEach(keyword => {
    if (allTrends.includes(keyword.toLowerCase())) {
      relevanceScore += 3;
    }
  });

  // Check if product category mentioned in summary
  if (summary.toLowerCase().includes(product.category.toLowerCase())) {
    relevanceScore += 2;
  }

  // Check color matches
  colors.forEach(color => {
    if (product.description.toLowerCase().includes(color.toLowerCase()) ||
        product.name.toLowerCase().includes(color.toLowerCase())) {
      relevanceScore += 2;
    }
  });

  // Always include some products even if not perfectly matched
  if (relevanceScore > 0) {
    matchedProducts.push({
      ...product,
      relevance_score: relevanceScore
    });
  }
});

// Sort by relevance
matchedProducts.sort((a, b) => b.relevance_score - a.relevance_score);

// Take top 5 most relevant products
const topProducts = matchedProducts.slice(0, 5);

// If we have less than 3 matched, add some random ones to reach 3-5 products
while (topProducts.length < 3 && topProducts.length < products.length) {
  const remaining = products.filter(p => !topProducts.find(tp => tp.id === p.id));
  if (remaining.length > 0) {
    topProducts.push({
      ...remaining[0],
      relevance_score: 0
    });
  } else {
    break;
  }
}

// Return all data + matched products
return [{
  json: {
    ...($json),
    affiliate_products: topProducts,
    total_products_available: products.length,
    products_matched: topProducts.length
  }
}];
```

6. **Click**: "Save" (bottom right)

**What this does**:
- Loads your affiliate products
- Matches them to this week's trends
- Picks the 5 most relevant products
- Adds them to the data flow

---

### Step 3: Update Newsletter Email Template (15 min)

**Find your email formatting node** (might be called "Format Newsletter Email" or "Send Newsletter Email")

**If you don't have a dedicated email formatting node yet**, add one after "Load Affiliate Products":

1. **Click** the **+** button after "Load Affiliate Products"
2. **Search for**: "Code"
3. **Name it**: "Format Newsletter with Affiliates"
4. **Paste this code**:

```javascript
// FORMAT NEWSLETTER EMAIL WITH AFFILIATE PRODUCTS

const report = $json;
const products = $json.affiliate_products || [];

// Build products section
let productHTML = '';
if (products.length > 0) {
  productHTML = `
    <div style="margin: 40px 0; padding: 30px; background: linear-gradient(135deg, #fdfbfb 0%, #f7f7f7 100%); border-radius: 12px;">
      <h2 style="color: #333; margin: 0 0 10px 0; font-size: 24px;">
        🛍️ Shop This Week's Trends
      </h2>
      <p style="color: #666; margin: 0 0 25px 0; line-height: 1.6; font-size: 15px;">
        Based on this week's fashion insights, we've curated the perfect pieces to help you nail these looks:
      </p>
  `;

  products.forEach((product, index) => {
    productHTML += `
      <div style="margin: 20px 0; padding: 20px; background: white; border-radius: 8px; border-left: 4px solid #000;">
        <div style="display: flex; align-items: start; gap: 15px;">
          <div style="flex: 1;">
            <h3 style="color: #333; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">
              ${index + 1}. ${product.name}
            </h3>
            <p style="color: #999; margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">
              ${product.brand}
            </p>
            <p style="color: #666; margin: 0 0 12px 0; line-height: 1.5; font-size: 14px;">
              ${product.description}
            </p>
            <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
              <span style="color: #000; font-size: 20px; font-weight: 700;">
                ${product.price}
              </span>
              <a href="${product.amazon_link}"
                 style="display: inline-block; padding: 12px 24px; background: #000; color: #fff;
                        text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;
                        transition: background 0.3s;">
                Shop on Amazon →
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  productHTML += `
    </div>
  `;
}

// Build complete email
const emailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>This Week's Fashion Insights</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">

  <div style="max-width: 600px; margin: 0 auto; background: white;">

    <!-- Header -->
    <div style="padding: 40px 30px; background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%); text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
        ✨ Fashion Insights
      </h1>
      <p style="margin: 10px 0 0 0; color: #ccc; font-size: 14px;">
        ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">

      <!-- Intro -->
      <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
        Hey loves! ✨ Here's what's trending in fashion this week based on analysis of
        <strong>${report.posts_analyzed || 'hundreds of'}</strong> Instagram posts from top fashion influencers.
      </p>

      <!-- Top Trends -->
      <div style="margin: 30px 0;">
        <h2 style="color: #333; margin: 0 0 15px 0; font-size: 24px; font-weight: 700;">
          🔥 Top Trends This Week
        </h2>
        <ul style="color: #666; line-height: 2; margin: 0; padding-left: 20px; font-size: 15px;">
          ${(report.top_trends || []).map(trend => `<li style="margin: 8px 0;">${trend}</li>`).join('')}
        </ul>
      </div>

      <!-- Trending Colors -->
      <div style="margin: 30px 0;">
        <h2 style="color: #333; margin: 0 0 15px 0; font-size: 24px; font-weight: 700;">
          🎨 Trending Colors
        </h2>
        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin: 15px 0;">
          ${(report.popular_colors || []).map(color => `
            <span style="padding: 8px 16px; background: #f0f0f0; color: #333;
                         border-radius: 20px; font-size: 14px; font-weight: 600;">
              ${color}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Summary -->
      <div style="margin: 30px 0;">
        <h2 style="color: #333; margin: 0 0 15px 0; font-size: 24px; font-weight: 700;">
          💭 The Vibe This Week
        </h2>
        <p style="color: #666; line-height: 1.8; margin: 0; font-size: 15px;">
          ${report.summary || 'Fashion is evolving beautifully this week!'}
        </p>
      </div>

      <!-- AFFILIATE PRODUCTS SECTION -->
      ${productHTML}

      <!-- Recommendations -->
      ${(report.recommendations && report.recommendations.length > 0) ? `
      <div style="margin: 40px 0; padding: 25px; background: #f9f9f9; border-radius: 8px; border-left: 4px solid #333;">
        <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px; font-weight: 700;">
          💡 Pro Tips
        </h2>
        <ul style="color: #666; line-height: 1.8; margin: 0; padding-left: 20px; font-size: 14px;">
          ${report.recommendations.map(rec => `<li style="margin: 8px 0;">${rec}</li>`).join('')}
        </ul>
      </div>
      ` : ''}

    </div>

    <!-- Footer -->
    <div style="padding: 30px; background: #f5f5f5; text-align: center; border-top: 1px solid #e0e0e0;">
      <p style="color: #666; margin: 0 0 15px 0; font-size: 14px; line-height: 1.6;">
        💖 Thanks for being part of our fashion community!
      </p>
      <p style="color: #999; margin: 15px 0; font-size: 12px;">
        <a href="#" style="color: #999; text-decoration: underline;">Unsubscribe</a>
      </p>
      <div style="margin: 20px 0; padding: 15px; background: white; border-radius: 6px;">
        <p style="color: #999; margin: 0; font-size: 11px; line-height: 1.5;">
          <strong>Affiliate Disclosure:</strong> This email contains affiliate links.
          We may earn a small commission if you purchase through our links at no extra cost to you.
          We only recommend products that match this week's trends!
        </p>
      </div>
      <p style="color: #ccc; margin: 15px 0 0 0; font-size: 11px;">
        © ${new Date().getFullYear()} Fashion Insights. All rights reserved.
      </p>
    </div>

  </div>

</body>
</html>
`;

return [{
  json: {
    emailHTML: emailHTML,
    emailSubject: `✨ ${report.report_title || "This Week's Fashion Insights"}`,
    hasAffiliateProducts: products.length > 0,
    productCount: products.length
  }
}];
```

5. **Click**: "Save"

**What this does**: Creates a beautiful email with your affiliate products integrated naturally

---

### Step 4: Update Send Email Node (5 min)

**Find your "Send Newsletter Email" node** (or similar SMTP/Email node)

1. **Click on the node**

2. **Update the "HTML" field** to use your new formatted email:
   ```
   {{ $json.emailHTML }}
   ```

3. **Update the "Subject" field**:
   ```
   {{ $json.emailSubject }}
   ```

4. **Make sure "From Email" is set** to your verified Mailjet email

5. **Click**: "Save"

---

### Step 5: Test Your Affiliate Integration (5 min)

1. **Click**: "Test workflow" (top right)

2. **Watch nodes execute**:
   - Should see "Load Affiliate Products" turn green
   - Should see "Format Newsletter with Affiliates" turn green
   - Email should send

3. **Click on "Load Affiliate Products" node** after execution:
   - Check "Output" tab
   - You should see: `affiliate_products` array with your products
   - Should show: `products_matched: 5` (or however many matched)

4. **Click on "Format Newsletter with Affiliates" node**:
   - Check "Output" tab
   - You should see: `emailHTML` with full formatted email
   - Should contain your product links

5. **Check your email inbox**:
   - Newsletter should arrive
   - Should have "Shop This Week's Trends" section
   - Should show 3-5 products with "Shop on Amazon" buttons
   - Links should work when clicked

**✅ If email looks good and links work**: Success! Affiliates are integrated!

---

### Step 6: Add Affiliate Links to Devi Blog Posts (8 min)

**Find the "Devi Blog Post Generator" node** in your workflow

1. **Click on the node**

2. **Find the system prompt** (should be in the messages array, role: "system")

3. **Update the system prompt** to include affiliate instructions:

Add this section after the main Devi persona:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AFFILIATE PRODUCT INTEGRATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When writing blog posts, you have access to curated affiliate products that match this week's trends.

PRODUCTS AVAILABLE THIS WEEK:
{{ $('Load Affiliate Products').item.json.affiliate_products }}

HOW TO INTEGRATE:
1. Naturally mention 2-3 products in your blog post
2. Use Devi's authentic voice - "I'm obsessed with..." / "This [product] is everything..."
3. Format: [product name](affiliate link)
4. Be genuine - only recommend if it truly fits the content
5. Don't be pushy - weave in naturally

EXAMPLES:
✅ "I've been living in oversized blazers lately! This black one from The Drop (link) is literally perfect for that tailored-yet-relaxed vibe everyone's loving."

✅ "If you want to try the metallic boot trend, these Steve Madden ankle boots (link) are THE perfect entry point - statement-making but still wearable!"

❌ "Buy this now! Click here to shop!" (too pushy)
❌ Listing 10 products in a row (overwhelming)

Remember: You're Devi, not a shopping catalog. Recommend authentically!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

4. **Click**: "Save"

5. **Test the node**:
   - Run workflow
   - Check Devi's blog post output
   - Should naturally mention 2-3 products with links

---

## 📊 PHASE 4: Track Your Affiliate Performance (15 min)

### Step 1: Set Up Amazon Associates Tracking

1. **Go to**: https://affiliate-program.amazon.com/home

2. **Click**: "Reports" → "Earnings Report"

3. **Bookmark this page** - you'll check it weekly

4. **What to track**:
   - **Clicks**: How many people clicked your links
   - **Ordered Items**: What they actually bought (might be different products!)
   - **Conversion Rate**: Clicks → Sales %
   - **Earnings**: Your commission

**Check this**: Every Monday morning after newsletter sends

---

### Step 2: Create Performance Tracking Sheet (10 min)

1. **Create a Google Sheet**: https://sheets.google.com/

2. **Name it**: "Fashion Insights - Affiliate Tracking"

3. **Create columns**:
   | Date | Newsletter Sent | Subscribers | Products Linked | Amazon Clicks | Amazon Sales | Amazon $ | Notes |
   |------|----------------|-------------|-----------------|---------------|--------------|----------|-------|

4. **Add first row**:
   | 2025-11-27 | Yes | 100 | 5 | 12 | 0 | $0 | First newsletter with affiliates |

5. **Update weekly** after each newsletter

**Goal**: See what products and placements work best!

---

### Step 3: Set Up Click Tracking (5 min - OPTIONAL)

**For more detailed tracking, use Bitly**:

1. **Go to**: https://bitly.com/ (sign up free)

2. **Create short links** for your Amazon URLs:
   - Original: `https://www.amazon.com/dp/B08XYZ1234/?tag=fashioninsights-20`
   - Bitly: `https://bit.ly/blazer-nov27`

3. **Replace Amazon links** with Bitly links in your `affiliate-products.json`

4. **Check Bitly dashboard** to see:
   - Clicks per link
   - Click timing (what time people click)
   - Geographic data

**Note**: Amazon still tracks the sale, Bitly just adds extra analytics

---

## 💡 PHASE 5: Optimize for Better Results (WEEK 2+)

### Week 1: Baseline
- Send first newsletter with 5 products
- Track: Clicks, sales, earnings
- Note: Which products got clicked most?

### Week 2: Test Placement
- Try products at TOP of email vs BOTTOM
- Test: 3 products vs 5 products
- Compare: Which got more clicks?

### Week 3: Test Product Selection
- Only link products DIRECTLY mentioned in trends
- Remove generic products
- Compare: Better conversion?

### Week 4: Test Copy
- Try: "Shop this look" vs "Get the look" vs "Shop these picks"
- Test different product descriptions
- Compare: What drives more clicks?

---

## 🚀 BONUS: Advanced Affiliate Strategies

### Strategy 1: LTK Integration (After 500+ subscribers)

1. **Apply to LTK**: https://www.shopltk.com/
2. **Wait for approval** (1-2 weeks)
3. **Add LTK links** to your product database:
   ```json
   {
     "amazon_link": "...",
     "ltk_link": "https://liketoknow.it/yourhandle/oversized-blazer"
   }
   ```
4. **A/B test**: Amazon vs LTK (LTK often has 10-20% commission vs Amazon's 3-4%)

---

### Strategy 2: Seasonal Product Swaps

**Create separate product files**:
- `affiliate-products-spring.json`
- `affiliate-products-summer.json`
- `affiliate-products-fall.json`
- `affiliate-products-winter.json`

**Update workflow** to load based on current season

---

### Strategy 3: Devi's Weekly Favorites

**Create special section** in newsletter:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💖 DEVI'S PICKS THIS WEEK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hey loves! These are the 3 pieces I'm personally
obsessed with this week:

1. [Product with personal note from Devi]
2. [Product with styling tip]
3. [Product with trend connection]
```

**Why it works**: Personal touch increases trust → higher conversions

---

## ✅ Complete Setup Checklist

### Amazon Associates
- [ ] Signed up at affiliate-program.amazon.com
- [ ] Account approved (or pending - check email)
- [ ] Noted my Tracking ID (e.g., fashioninsights-20)
- [ ] Created 5 affiliate links for fashion products
- [ ] Saved links in `affiliate-products.json`

### n8n Integration
- [ ] Added "Load Affiliate Products" node after "Format Final Report"
- [ ] Updated products array with MY actual Amazon links
- [ ] Added "Format Newsletter with Affiliates" node
- [ ] Updated "Send Email" node to use new HTML
- [ ] Test run completed successfully
- [ ] Received test email with affiliate products
- [ ] Clicked test link - works and has my tracking ID

### Devi Integration
- [ ] Updated "Devi Blog Post Generator" system prompt
- [ ] Added affiliate product integration instructions
- [ ] Test run shows Devi mentions 2-3 products naturally
- [ ] Links are properly formatted

### Tracking
- [ ] Bookmarked Amazon Associates dashboard
- [ ] Created Google Sheet for tracking
- [ ] First row entered with baseline data
- [ ] Know how to check Amazon reports

### Legal
- [ ] Affiliate disclosure added to email footer
- [ ] Disclosure clearly visible
- [ ] Wording complies with FTC guidelines

---

## 🎯 Expected Timeline

### TODAY (1-2 hours):
- ✅ Amazon Associates signup
- ✅ Create first 5 affiliate links
- ✅ Add "Load Affiliate Products" node
- ✅ Update email template
- ✅ Test integration

### MONDAY (Automatic):
- ✅ First newsletter sends with affiliate links
- ✅ Track clicks in Amazon dashboard

### WEEK 1:
- Check Amazon dashboard daily
- Note first sale (hopefully!)
- Track clicks vs conversions

### WEEK 2-4:
- Optimize product selection
- Test different placements
- Add more products to database
- Apply to LTK (if eligible)

### MONTH 2:
- Analyze what's working
- Scale successful products
- Experiment with seasonal items

---

## 💰 Expected Earnings

### Month 1 (100-500 subscribers):
- Newsletter sent: 4 times
- Products: 5 per email
- Clicks: 20-50 per newsletter
- Sales: 1-3 per newsletter
- **Earnings**: $5-25/month

### Month 3 (500-1,000 subscribers):
- Newsletter sent: 4 times
- Products: 5 per email (optimized)
- Clicks: 50-100 per newsletter
- Sales: 3-7 per newsletter
- **Earnings**: $25-75/month

### Month 6 (1,000-2,000 subscribers):
- Newsletter sent: 4 times
- Products: 5 per email (proven winners)
- Clicks: 100-200 per newsletter
- Sales: 7-15 per newsletter
- **Earnings**: $75-200/month

**Goal**: Offset your operating costs ($55-110/month) by Month 3-4!

---

## 🆘 Troubleshooting

### Issue: Affiliate links not showing in email
**Check**:
1. Is "Load Affiliate Products" node executing? (should be green)
2. Does it have output? (click node → Output tab → see products array)
3. Is "Format Newsletter with Affiliates" using `$json.affiliate_products`?
4. Did you test the workflow end-to-end?

---

### Issue: Links don't have my tracking ID
**Check**:
1. Your Amazon Associate link should include `?tag=yourtrackingid-20`
2. Copy links from Amazon Associates dashboard, not regular Amazon.com
3. Test: Click link → Look at URL in browser → Should see `tag=...`

---

### Issue: No products matching trends
**Solution**:
- Either: Add more products to your database (20-30 products recommended)
- Or: Make `trending_keywords` more flexible (add more keywords per product)
- Or: Lower the relevance score threshold in the matching code

---

### Issue: Amazon says "Not approved yet"
**Why**: You need 3 sales within 180 days of signup

**Solution**:
- Keep sending newsletters
- Share with friends and family
- Ask them to make a purchase through your link
- Even a $10 purchase counts!

---

### Issue: Email looks messy
**Check**:
1. Did you paste the FULL HTML code in "Format Newsletter with Affiliates"?
2. Is the node properly connected?
3. Send test email to yourself and check rendering
4. Some email clients (Outlook) might strip styles - that's normal

---

## 📚 Resources

### Amazon Associates
- **Dashboard**: https://affiliate-program.amazon.com/home
- **Help Center**: https://affiliate-program.amazon.com/help
- **Program Policies**: https://affiliate-program.amazon.com/help/operating/policies

### Legal Requirements
- **FTC Endorsement Guidelines**: https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking
- **Required disclosure**: Must be clear and conspicuous

### Learning
- **Amazon Associates Blog**: Tips and best practices
- **Reddit r/Affiliatemarketing**: Community support

---

## 🎉 You're Ready!

**You now have**:
- ✅ Amazon Associates account
- ✅ 5 affiliate product links
- ✅ Automated integration in n8n
- ✅ Beautiful email template with products
- ✅ Devi mentioning products naturally
- ✅ Tracking system set up
- ✅ Legal disclosure in place

**Next**: Send your first newsletter and track results!

**Then**: Apply to LTK when you hit 500-1,000 subscribers for higher commissions (10-20% vs 3-4%)

---

*Last Updated: 2025-11-27*
*Status: Ready to Monetize! 💰*
*Start earning from your fashion insights! 🚀*
