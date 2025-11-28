// PREPARE EMAIL WITH INSIGHTS, INSTAGRAM POSTS & INFLUENCER PRODUCTS
const insights = $('Format Final Report').first().json;
const subscriber = $json;
const allPosts = $('Filter Posts & Extract Product Links').all();
const topPosts = allPosts.slice(0, 5);
const postsWithProducts = allPosts.filter(item => item.json.has_products).slice(0, 5);

const currentDate = new Date().toLocaleDateString('en-US', { 
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
});

const subscriberName = subscriber.name || subscriber.email.split('@')[0];

// Featured Instagram Posts
const featuredPostsHTML = topPosts.map(item => {
  const post = item.json;
  const shortCaption = post.caption.substring(0, 150) + (post.caption.length > 150 ? '...' : '');
  
  return `
    <div style="margin: 20px 0; padding: 20px; border-bottom: 1px solid #eee;">
      <img src="${post.image_url}" width="300" style="border-radius: 8px; display: block; margin-bottom: 10px;"><br>
      <strong>@${post.author}</strong><br>
      <p style="color: #333; line-height: 1.6;">${shortCaption}</p>
      <p style="color: #999; font-size: 14px;">❤️ ${post.likes.toLocaleString()} likes • 💬 ${post.comments} comments</p>
      <a href="${post.post_url}" style="color: #667eea; text-decoration: none;">View on Instagram →</a>
    </div>
  `;
}).join('');

// Influencer Products Section
const productsHTML = postsWithProducts.length > 0 ? `
  <tr>
    <td style="padding: 30px; background-color: #fff5f5;">
      <h3 style="margin: 0 0 10px; color: #333;">🛍️ Shop Influencer Picks</h3>
      <p style="margin: 0 0 20px; color: #666; font-size: 14px;">Products featured by top fashion influencers this week</p>
      
      ${postsWithProducts.map(item => {
        const post = item.json;
        const productUrl = post.shopping_url || post.product_links[0] || post.post_url;
        const shortCaption = post.caption.substring(0, 80) + (post.caption.length > 80 ? '...' : '');
        
        return `
        <div style="margin: 15px 0; padding: 15px; background-color: white; border-radius: 8px; border: 1px solid #ffd6d6;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" valign="top">
                <img src="${post.image_url}" width="90" style="border-radius: 6px; display: block;">
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
          
          <!-- Top Trends -->
          <tr>
            <td style="padding: 30px; background-color: #fafafa;">
              <h3 style="margin: 0 0 15px; color: #333;">✨ Top 5 Trends</h3>
              <ol style="margin: 0; padding-left: 20px; color: #666; line-height: 1.8;">
                ${insights.top_trends.map(trend => `<li>${trend}</li>`).join('')}
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
          
          <!-- Featured Posts -->
          <tr>
            <td style="padding: 30px; background-color: #fafafa;">
              <h3 style="margin: 0 0 20px; color: #333;">📌 Featured Posts</h3>
              ${featuredPostsHTML}
            </td>
          </tr>
          
          <!-- Recommendations -->
          <tr>
            <td style="padding: 30px;">
              <h3 style="margin: 0 0 15px; color: #333;">💡 Business Recommendations</h3>
              <ol style="margin: 0; padding-left: 20px; color: #666; line-height: 1.8;">
                ${insights.recommendations.map(rec => `<li>${rec}</li>`).join('')}
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
    subject: `📸 Fashion Insights: ${insights.top_trends[0]} + Influencer Picks! 🛍️`,
    html: emailHTML
  }
}];