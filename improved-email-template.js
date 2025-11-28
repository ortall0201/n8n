// IMPROVED EMAIL WITH IMAGES, MOODBOARDS & BETTER INFLUENCER SHOWCASE
const insights = $('Format Final Report').first().json;
const subscriber = $json;
const allPosts = $('Filter Posts & Extract Product Links').all();

// Select diverse posts (try to get variety, not just first 5)
const topPosts = allPosts.slice(0, 8); // Get more posts for variety
const postsWithProducts = allPosts.filter(item => item.json.has_products).slice(0, 5);

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

// Create moodboard section with trend visuals
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

// Featured Instagram Posts with IMAGE PROXY for email compatibility
const featuredPostsHTML = topPosts.map(item => {
  const post = item.json;
  const shortCaption = post.caption.substring(0, 180) + (post.caption.length > 180 ? '...' : '');

  // Use image proxy to make Instagram images work in emails
  const imageUrl = post.image_url || '';
  const proxiedImageUrl = imageUrl && imageUrl.startsWith('http')
    ? `https://images.weserv.nl/?url=${encodeURIComponent(imageUrl)}&w=600`
    : '';
  const hasValidImage = !!proxiedImageUrl;

  return `
    <div style="margin: 20px 0; padding: 20px; border-bottom: 1px solid #eee; background-color: #fafafa; border-radius: 8px;">
      ${hasValidImage ? `
        <a href="${post.post_url}" style="display: block; margin-bottom: 15px;">
          <img
            src="${proxiedImageUrl}"
            alt="Instagram post by @${post.author}"
            width="100%"
            style="max-width: 500px; height: auto; border-radius: 12px; display: block; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
          >
        </a>
      ` : ''}

      <div style="text-align: center; margin-top: 15px;">
        <strong style="font-size: 16px; color: #667eea;">@${post.author}</strong>
        <p style="color: #666; line-height: 1.7; margin: 12px 0; font-size: 14px;">${shortCaption}</p>
        <p style="color: #999; font-size: 13px; margin: 10px 0;">
          ❤️ ${post.likes.toLocaleString()} likes • 💬 ${post.comments} comments
        </p>
        <a href="${post.post_url}" style="display: inline-block; padding: 10px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600; margin-top: 10px;">
          View on Instagram →
        </a>
      </div>
    </div>
  `;
}).join('');

// Influencer spotlight section
const influencerSpotlight = influencerMentions.length > 0 ? `
  <tr>
    <td style="padding: 30px; background-color: #fff9f0;">
      <h3 style="margin: 0 0 15px; color: #333; text-align: center;">⭐ Featured Influencers This Week</h3>
      <div style="text-align: center;">
        ${influencerMentions.map(name => `
          <span style="display: inline-block; margin: 8px; padding: 10px 20px; background: white; border: 2px solid #667eea; border-radius: 25px; color: #667eea; font-weight: 600; font-size: 14px;">
            ${name}
          </span>
        `).join('')}
      </div>
    </td>
  </tr>
` : '';

// Influencer Products Section (unchanged, already working)
const productsHTML = postsWithProducts.length > 0 ? `
  <tr>
    <td style="padding: 30px; background-color: #fff5f5;">
      <h3 style="margin: 0 0 10px; color: #333;">🛍️ Shop Influencer Picks</h3>
      <p style="margin: 0 0 20px; color: #666; font-size: 14px;">Products featured by top fashion influencers this week</p>

      ${postsWithProducts.map(item => {
        const post = item.json;
        const productUrl = post.shopping_url || post.product_links[0] || post.post_url;
        const shortCaption = post.caption.substring(0, 80) + (post.caption.length > 80 ? '...' : '');
        const imageUrl = post.image_url || '';
        const proxiedImageUrl = imageUrl && imageUrl.startsWith('http')
          ? `https://images.weserv.nl/?url=${encodeURIComponent(imageUrl)}&w=100`
          : '';
        const hasValidImage = !!proxiedImageUrl;

        return `
        <div style="margin: 15px 0; padding: 15px; background-color: white; border-radius: 8px; border: 1px solid #ffd6d6;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" valign="top">
                ${hasValidImage ? `
                  <img src="${proxiedImageUrl}" alt="Product" width="90" style="border-radius: 6px; display: block;">
                ` : ''}
              </td>
              <td valign="top" style="padding-left: 15px;">
                <p style="margin: 0 0 5px; color: #667eea; font-size: 13px; font-weight: 600;">@${post.author}</p>
                <p style="margin: 0 0 10px; color: #666; font-size: 14px; line-height: 1.4;">${shortCaption}</p>
                ${post.has_coupons ? `<p style="margin: 0 0 10px; padding: 8px; background-color: #fff9e6; border-radius: 4px; font-family: monospace; font-size: 13px; color: #d97706;">🎟️ Code: <strong>${post.coupon_codes.join(', ')}</strong></p>` : ''}
                <p style="margin: 0;">
                  <a href="${productUrl}" style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600;">Shop This Look →</a>
                </p>
              </td>
            </tr>
          </table>
        </div>
        `;
      }).join('')}

      <p style="margin: 20px 0 0; padding: 15px; background-color: #fff; border: 1px dashed #ddd; border-radius: 6px; text-align: center; color: #999; font-size: 13px;">
        <em>Note: Some links may be affiliate links. Shopping through them supports our newsletter at no extra cost to you! 💜</em>
      </p>
    </td>
  </tr>
` : '';

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
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">

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
            <td style="padding: 12px; background-color: #fff3cd; text-align: center; border-bottom: 2px solid #ffc107;">
              <p style="margin: 0; color: #856404; font-size: 13px;">
                📸 <strong>Can't see fashion photos?</strong> Click "<strong>Display images</strong>" or "<strong>Show images</strong>" at the top of this email to view outfit inspiration!
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

          <!-- INFLUENCER PRODUCTS SECTION -->
          ${productsHTML}

          <!-- Featured Posts with IMAGES -->
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

          <!-- Newsletter Signup CTA -->
          <tr>
            <td style="padding: 30px; background-color: #f0f9ff; text-align: center;">
              <h3 style="margin: 0 0 10px; color: #333;">💌 Love This Newsletter?</h3>
              <p style="margin: 0 0 20px; color: #666;">Share it with fashion-loving friends!</p>
              <a href="http://localhost:5678/webhook/newsletter-signup" style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600;">Subscribe to Fashion Insights</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #f8f9fa; color: #999;">
              <p style="margin: 0; font-size: 14px;">Fashion Insights Newsletter • Powered by AI</p>
              <p style="margin: 5px 0 0; font-size: 12px;">You're receiving this because you subscribed to Fashion Insights</p>
              <p style="margin: 10px 0 0; font-size: 12px;">
                <a href="http://localhost:5678/webhook/unsubscribe?email=${subscriber.email}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
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
