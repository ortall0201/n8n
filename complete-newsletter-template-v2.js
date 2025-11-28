// COMPLETE EMAIL TEMPLATE WITH: AI PRODUCTS + ANIMATIONS + INLINE FORM + ABOUT
const insights = $('Format Final Report').first().json;
const subscriber = $json;
const allPosts = $('Filter Posts & Extract Product Links').all();

// Select diverse posts
const topPosts = allPosts.slice(0, 8);

// Get posts with products (or fallback to all posts if none have shopping links)
let postsWithProducts = allPosts.filter(item => item.json.has_products).slice(0, 6);
if (postsWithProducts.length === 0) {
  // No direct shopping links found - use top posts and extract brands from captions
  postsWithProducts = allPosts.slice(0, 6);
}

const currentDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

const subscriberName = subscriber.name || subscriber.email.split('@')[0];

// Extract influencer mentions from AI summary
const influencerMentions = [
  ...new Set(
    (insights.summary.match(/@[\w.]+|[A-Z][a-z]+ [A-Z][a-z]+/g) || [])
      .filter(name => name.length > 2 && name !== 'Fashion Insights')
      .slice(0, 5)
  )
];

// Moodboard section
const moodboardHTML = `
  <tr>
    <td style="padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <h3 style="margin: 0 0 15px; color: white; text-align: center;">🎨 This Week's Moodboard</h3>
      <p style="margin: 0 0 20px; color: rgba(255,255,255,0.9); text-align: center; font-size: 14px;">Trending colors, styles & aesthetics</p>

      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="33%" style="padding: 5px;">
            <div style="background: white; border-radius: 8px; padding: 15px; text-align: center;">
              <div style="width: 80px; height: 80px; margin: 0 auto 10px; background: linear-gradient(135deg, #000000 0%, #434343 100%); border-radius: 50%;"></div>
              <strong style="font-size: 12px; color: #333;">Black & Metallics</strong>
            </div>
          </td>
          <td width="33%" style="padding: 5px;">
            <div style="background: white; border-radius: 8px; padding: 15px; text-align: center;">
              <div style="width: 80px; height: 80px; margin: 0 auto 10px; background: linear-gradient(135deg, #C0C0C0 0%, #FFD700 100%); border-radius: 50%;"></div>
              <strong style="font-size: 12px; color: #333;">Glam & Sparkle</strong>
            </div>
          </td>
          <td width="33%" style="padding: 5px;">
            <div style="background: white; border-radius: 8px; padding: 15px; text-align: center;">
              <div style="width: 80px; height: 80px; margin: 0 auto 10px; background: linear-gradient(135deg, #FFB6C1 0%, #E6E6FA 100%); border-radius: 50%;"></div>
              <strong style="font-size: 12px; color: #333;">Pastel Vibes</strong>
            </div>
          </td>
        </tr>
      </table>

      <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.2); border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: white; font-size: 14px; line-height: 1.6;">
          <strong>Key Aesthetic:</strong> ${insights.popular_styles.slice(0, 3).join(' • ')}
        </p>
      </div>
    </td>
  </tr>
`;

// ANIMATED FEATURED POSTS - Images come alive on hover!
const featuredPostsHTML = topPosts.map(item => {
  const post = item.json;
  const shortCaption = post.caption.substring(0, 180) + (post.caption.length > 180 ? '...' : '');

  const imageUrl = post.image_url || '';
  const proxiedImageUrl = imageUrl && imageUrl.startsWith('http')
    ? `https://images.weserv.nl/?url=${encodeURIComponent(imageUrl)}&w=600&output=jpg&q=85`
    : '';
  const hasValidImage = !!proxiedImageUrl;

  return `
    <div style="margin: 20px 0; padding: 20px; border-bottom: 1px solid #eee; background-color: #fafafa; border-radius: 8px; transition: all 0.3s ease;">
      ${hasValidImage ? `
        <a href="${post.post_url}" style="display: block; margin-bottom: 15px; overflow: hidden; border-radius: 12px;">
          <img
            src="${proxiedImageUrl}"
            alt="Instagram post by @${post.author}"
            width="100%"
            style="max-width: 500px; height: auto; border-radius: 12px; display: block; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: transform 0.3s ease, box-shadow 0.3s ease;"
            onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 8px 24px rgba(102,126,234,0.4)';"
            onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)';"
          >
        </a>
      ` : ''}

      <div style="text-align: center; margin-top: 15px;">
        <strong style="font-size: 16px; color: #667eea;">@${post.author}</strong>
        <p style="color: #666; line-height: 1.7; margin: 12px 0; font-size: 14px;">${shortCaption}</p>
        <p style="color: #999; font-size: 13px; margin: 10px 0;">
          ❤️ ${post.likes.toLocaleString()} likes • 💬 ${post.comments} comments
        </p>
        <a href="${post.post_url}" style="display: inline-block; padding: 10px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600; margin-top: 10px; transition: all 0.3s ease;"
           onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 12px rgba(102,126,234,0.3)';"
           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
          View on Instagram →
        </a>
      </div>
    </div>
  `;
}).join('');

// Influencer spotlight
const influencerSpotlight = influencerMentions.length > 0 ? `
  <tr>
    <td style="padding: 30px; background-color: #fff9f0;">
      <h3 style="margin: 0 0 15px; color: #333; text-align: center;">⭐ Featured Influencers This Week</h3>
      <div style="text-align: center;">
        ${influencerMentions.map(name => `
          <span style="display: inline-block; margin: 8px; padding: 10px 20px; background: white; border: 2px solid #667eea; border-radius: 25px; color: #667eea; font-weight: 600; font-size: 14px; transition: all 0.3s ease;"
                onmouseover="this.style.background='#667eea'; this.style.color='white'; this.style.transform='scale(1.05)';"
                onmouseout="this.style.background='white'; this.style.color='#667eea'; this.style.transform='scale(1)';">
            ${name}
          </span>
        `).join('')}
      </div>
    </td>
  </tr>
` : '';

// PRODUCTS & BRANDS SECTION - Extract unique insights
const extractProductsAndBrands = () => {
  const fashionBrands = ['Dior', 'Chanel', 'Gucci', 'Prada', 'Versace', 'Balenciaga', 'Fendi', 'Hermès', 'Burberry', 'Valentino', 'Givenchy', 'YSL', 'Saint Laurent', 'Celine', 'Bottega Veneta', 'Miu Miu', 'Alexander McQueen', 'Tom Ford', 'Dolce & Gabbana', 'Armani', 'Ralph Lauren', 'Calvin Klein', 'Tommy Hilfiger', 'Michael Kors', 'Coach', 'Kate Spade', 'Tory Burch', 'Marc Jacobs', 'Stella McCartney', 'Acne Studios', 'Maison Margiela', 'Off-White', 'Vetements', 'Moncler', 'Stone Island', 'The Row', 'Jacquemus', 'Loewe', 'JW Anderson', 'Oscar de la Renta', 'Carolina Herrera', 'Balmain', 'Isabel Marant', 'Zimmermann', 'Reformation', 'Ganni', 'Staud', 'Khaite', 'Madewell', 'Zara', 'H&M'];

  const productKeywords = ['dress', 'bag', 'shoes', 'jeans', 'jacket', 'coat', 'boots', 'heels', 'sneakers', 'sunglasses', 'jewelry', 'necklace', 'earrings', 'bracelet', 'watch', 'belt', 'scarf', 'hat', 'sweater', 'blazer', 'skirt', 'pants', 'shorts', 'sandals', 'pumps', 'clutch', 'handbag', 'purse', 'wallet'];

  const allProducts = [];

  allPosts.forEach(item => {
    const post = item.json;
    const caption = post.caption.toLowerCase();

    // Find brands
    const detectedBrands = fashionBrands.filter(brand =>
      caption.includes(brand.toLowerCase())
    );

    // Find product types
    const detectedProducts = productKeywords.filter(product =>
      caption.includes(product)
    );

    // Find @mentions
    const mentions = (post.caption.match(/@[\w.]+/g) || []).slice(0, 2);

    if (detectedBrands.length > 0 || detectedProducts.length > 0 || mentions.length > 0) {
      allProducts.push({
        author: post.author,
        brands: detectedBrands,
        products: detectedProducts,
        mentions: mentions,
        link: post.shopping_url || post.post_url,
        hasShoppingLink: !!post.shopping_url
      });
    }
  });

  return allProducts.slice(0, 5); // Top 5 product mentions
};

const productInsights = extractProductsAndBrands();

const productsHTML = productInsights.length > 0 ? `
  <tr>
    <td style="padding: 30px; background-color: #fff5f5;">
      <h3 style="margin: 0 0 10px; color: #333;">🛍️ Products & Brands Mentioned This Week</h3>
      <p style="margin: 0 0 20px; color: #666; font-size: 14px;">Key products and brands spotted in influencer posts</p>

      ${productInsights.map((item, index) => {
        const brandList = item.brands.length > 0 ? item.brands.join(', ') : 'Fashion brands';
        const productList = item.products.length > 0 ? item.products.join(', ') : 'accessories';
        const mentionText = item.mentions.join(' ');

        return `
        <div style="margin: 15px 0; padding: 15px; background-color: white; border-radius: 8px; border-left: 4px solid #667eea;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right: 15px; width: 40px; vertical-align: top;">
                <div style="width: 35px; height: 35px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 16px;">
                  ${index + 1}
                </div>
              </td>
              <td valign="top">
                <p style="margin: 0 0 8px; color: #667eea; font-size: 13px; font-weight: 600;">Featured by @${item.author}</p>
                <p style="margin: 0 0 10px; color: #333; font-size: 15px; font-weight: 600; line-height: 1.4;">
                  ${brandList} - ${productList}
                </p>
                ${mentionText ? `<p style="margin: 0 0 10px; color: #764ba2; font-size: 13px;">${mentionText}</p>` : ''}
                <p style="margin: 0 0 10px; color: #666; font-size: 13px; line-height: 1.5;">
                  <strong>Fashion Insight:</strong> ${item.brands.length > 0
                    ? `${item.brands[0]} continues to dominate influencer wardrobes with their ${productList || 'signature pieces'}.`
                    : `${item.products[0] || 'This item'} is trending among fashion influencers this week.`}
                </p>
                <p style="margin: 0;">
                  <a href="${item.link}" style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600; transition: all 0.3s ease;"
                     onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(102,126,234,0.3)';"
                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                    ${item.hasShoppingLink ? '🛒 Shop Now' : '📸 View Post'} →
                  </a>
                </p>
              </td>
            </tr>
          </table>
        </div>
        `;
      }).join('')}

      <p style="margin: 20px 0 0; padding: 15px; background-color: #fff; border: 1px dashed #ddd; border-radius: 6px; text-align: center; color: #999; font-size: 13px;">
        <em>💡 Product insights powered by AI. Links lead to Instagram posts where you can find purchase info in bio or comments!</em>
      </p>
    </td>
  </tr>
` : '';

// INLINE SUBSCRIPTION FORM (no popup!)
const subscriptionFormHTML = `
  <tr>
    <td style="padding: 40px 30px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); text-align: center;">
      <h3 style="margin: 0 0 10px; color: #333; font-size: 24px;">💌 Love Fashion Insights?</h3>
      <p style="margin: 0 0 25px; color: #666; font-size: 15px;">Get weekly trends delivered to your inbox. No spam, ever.</p>

      <form action="http://localhost:5678/webhook/newsletter-signup" method="POST" style="max-width: 400px; margin: 0 auto;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <label style="display: block; margin-bottom: 8px; color: #333; font-weight: 600; font-size: 14px; text-align: left;">Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                style="width: 100%; padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 15px; box-sizing: border-box; font-family: Arial, sans-serif;"
              >
            </td>
          </tr>
          <tr>
            <td style="padding-top: 15px;">
              <label style="display: block; margin-bottom: 8px; color: #333; font-weight: 600; font-size: 14px; text-align: left;">Your Name (optional)</label>
              <input
                type="text"
                name="name"
                placeholder="Jane Doe"
                style="width: 100%; padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 15px; box-sizing: border-box; font-family: Arial, sans-serif;"
              >
            </td>
          </tr>
          <tr>
            <td style="padding-top: 10px;">
              <button
                type="submit"
                style="width: 100%; padding: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 0 0 8px 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-family: Arial, sans-serif;"
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(102,126,234,0.4)';"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                Subscribe Now ✨
              </button>
            </td>
          </tr>
        </table>
      </form>

      <p style="margin: 15px 0 0; color: #999; font-size: 12px;">Join 1,000+ fashion lovers getting weekly insights</p>
    </td>
  </tr>
`;

// ABOUT SECTION
const aboutSectionHTML = `
  <tr>
    <td style="padding: 30px; background-color: #fafafa; border-top: 1px solid #e0e0e0;">
      <h3 style="margin: 0 0 15px; color: #333; text-align: center;">📸 About Fashion Insights</h3>
      <p style="margin: 0 0 15px; color: #666; line-height: 1.7; text-align: center; max-width: 550px; margin-left: auto; margin-right: auto;">
        Fashion Insights is curated by <strong>Ortal</strong>, a data scientist and AI-driven product builder specializing in trend analysis, automation, and creative intelligence tools. I'm open to collaborations in fashion-tech, data, and AI innovation.
      </p>
      <p style="margin: 0 0 20px; text-align: center; color: #667eea; font-size: 14px;">
        <strong>Contact:</strong> <a href="mailto:ortal@onsight-analytics.com" style="color: #667eea; text-decoration: none; font-weight: 600;">ortal@onsight-analytics.com</a>
      </p>

      <!-- Disclaimer -->
      <div style="margin-top: 20px; padding: 15px; background-color: #fff; border-left: 4px solid #667eea; border-radius: 4px;">
        <p style="margin: 0; color: #666; font-size: 12px; line-height: 1.6;">
          <strong style="color: #333;">Disclaimer:</strong> This tool analyzes publicly available fashion trends on social media. No influencer content is stored, re-published, or used commercially. All rights to images and content remain with their respective creators.
        </p>
      </div>
    </td>
  </tr>
`;

// COMPLETE EMAIL HTML
const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 32px;">📸 Fashion Insights</h1>
              <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">${currentDate}</p>
              <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.8;">Hi ${subscriberName}!</p>
            </td>
          </tr>

          <!-- Image Display Helper -->
          <tr>
            <td style="padding: 15px; background-color: #fff3cd; text-align: center; border-bottom: 2px solid #ffc107;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                📸 <strong>To see fashion photos:</strong> Click "<strong>Display images</strong>" at the top of this email!
              </p>
            </td>
          </tr>

          <!-- Summary -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 15px; color: #333;">🔥 This Week's Trends</h2>
              <p style="margin: 0; color: #666; line-height: 1.8;">${insights.summary}</p>
              <p style="margin: 15px 0 0; padding: 15px; background-color: #f8f9fa; border-radius: 6px; color: #555;">
                <strong>Sentiment:</strong> ${insights.sentiment.toUpperCase()} • <strong>Posts Analyzed:</strong> ${insights.posts_analyzed}
              </p>
            </td>
          </tr>

          <!-- Moodboard Section -->
          ${moodboardHTML}

          <!-- Influencer Spotlight -->
          ${influencerSpotlight}

          <!-- Top Trends -->
          <tr>
            <td style="padding: 30px; background-color: #fafafa;">
              <h3 style="margin: 0 0 15px; color: #333;">✨ Top 5 Trends</h3>
              <ol style="margin: 0; padding-left: 20px; color: #666; line-height: 1.8;">
                ${insights.top_trends.map(trend => `<li style="margin-bottom: 10px;">${trend}</li>`).join('')}
              </ol>
            </td>
          </tr>

          <!-- Colors & Brands -->
          <tr>
            <td style="padding: 30px;">
              <h3 style="margin: 0 0 15px; color: #333;">🎨 Popular Colors</h3>
              <p style="margin: 0 0 25px; color: #666;">${insights.popular_colors.join(', ')}</p>

              <h3 style="margin: 0 0 15px; color: #333;">🏷️ Key Brands</h3>
              <p style="margin: 0 0 25px; color: #666;">${insights.key_brands.join(', ')}</p>

              <h3 style="margin: 0 0 15px; color: #333;">#️⃣ Rising Hashtags</h3>
              <p style="margin: 0; color: #667eea; font-family: monospace;">${insights.rising_hashtags.join(' • ')}</p>
            </td>
          </tr>

          <!-- PRODUCTS SECTION -->
          ${productsHTML}

          <!-- Featured Posts with ANIMATED IMAGES -->
          <tr>
            <td style="padding: 30px; background-color: #fafafa;">
              <h3 style="margin: 0 0 20px; color: #333; text-align: center;">📌 Featured Posts</h3>
              ${featuredPostsHTML}
            </td>
          </tr>

          <!-- Recommendations -->
          <tr>
            <td style="padding: 30px;">
              <h3 style="margin: 0 0 15px; color: #333;">💡 Business Recommendations</h3>
              <ol style="margin: 0; padding-left: 20px; color: #666; line-height: 1.8;">
                ${insights.recommendations.map(rec => `<li style="margin-bottom: 10px;">${rec}</li>`).join('')}
              </ol>
            </td>
          </tr>

          <!-- INLINE SUBSCRIPTION FORM -->
          ${subscriptionFormHTML}

          <!-- ABOUT SECTION -->
          ${aboutSectionHTML}

          <!-- Footer -->
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #f8f9fa; color: #999; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; font-size: 14px;">Fashion Insights Newsletter • Powered by AI</p>
              <p style="margin: 5px 0 0; font-size: 12px;">You're receiving this because you subscribed to Fashion Insights</p>
              <p style="margin: 10px 0 0; font-size: 12px;">
                <a href="http://localhost:5678/webhook/unsubscribe-confirm" style="color: #999; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

return [{
  json: {
    to: subscriber.email,
    name: subscriberName,
    subject: `📸 Fashion Insights: ${insights.top_trends[0].substring(0, 60)}... 🎨`,
    html: emailHTML
  }
}];
