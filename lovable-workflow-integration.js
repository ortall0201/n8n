// LOVABLE-DESIGNED EMAIL TEMPLATE - INTEGRATED WITH N8N WORKFLOW
// This version adapts the Lovable design to work with the existing workflow data structure

const insights = $('Format Final Report').first().json;
const subscriber = $json;
const allPosts = $('Filter Posts & Extract Product Links').all();

const currentDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

const subscriberName = subscriber.name || subscriber.email.split('@')[0];

// Get top trend from AI analysis
const topTrend = insights.top_trends && insights.top_trends[0]
  ? insights.top_trends[0]
  : "Gender-Fluid Fashion";

// Get trending colors from AI insights
const colors = insights.popular_colors && insights.popular_colors.length > 0
  ? insights.popular_colors.slice(0, 3).map((color, index) => ({
      hex: ['#FF6B9D', '#C44569', '#FFA07A'][index] || '#667eea',
      name: color
    }))
  : [
      { hex: "#FF6B9D", name: "Vibrant Pink" },
      { hex: "#C44569", name: "Burgundy" },
      { hex: "#FFA07A", name: "Coral" }
    ];

// Select top posts for moodboard (first 6 posts)
const moodboardImages = allPosts.slice(0, 6).map(item => {
  const imageUrl = item.json.image_url || '';
  return imageUrl;
}).filter(url => url);

// Proxy images for email compatibility
const proxyImage = (url) => {
  if (!url || !url.startsWith('http')) return '';
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=600&output=jpg&q=85`;
};

// Extract products from posts (same logic as original)
const extractProductsFromPosts = () => {
  const fashionBrands = ['Dior', 'Chanel', 'Gucci', 'Prada', 'Versace', 'Balenciaga', 'Fendi', 'Hermès', 'Burberry', 'Valentino', 'Givenchy', 'YSL', 'Saint Laurent', 'Celine', 'Bottega Veneta', 'Miu Miu'];

  const products = [];

  allPosts.slice(0, 3).forEach((item, index) => {
    const post = item.json;
    const caption = post.caption.toLowerCase();

    // Find brands mentioned
    const detectedBrands = fashionBrands.filter(brand =>
      caption.includes(brand.toLowerCase())
    );

    const brand = detectedBrands[0] || 'Designer Brand';
    const productName = ['Evening Gown', 'Luxury Handbag', 'Designer Shoes'][index];
    const badge = ['Limited Time', 'Hot Deal', 'Exclusive'][index];
    const featured = `${post.likes > 5000 ? '5' : '3'} influencers`;

    products.push({
      brand,
      name: productName,
      badge,
      featured,
      image: post.image_url,
      link: post.shopping_url || post.post_url
    });
  });

  return products;
};

const products = extractProductsFromPosts();

// Select influencer posts (first 4 posts)
const influencerPosts = allPosts.slice(0, 4).map(item => {
  const post = item.json;
  const shortCaption = post.caption.substring(0, 150) + (post.caption.length > 150 ? '...' : '');

  return {
    username: `@${post.author}`,
    text: shortCaption,
    image: post.image_url,
    link: post.post_url
  };
});

// BUILD LOVABLE-DESIGNED EMAIL HTML
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fashion Insights Newsletter</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb;">
    <tr>
      <td align="center" style="padding: 0;">

        <!-- Main Container -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff;">

          <!-- Header Section with Lovable Purple Gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px 20px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 48px; font-weight: 700; margin: 0 0 10px 0; line-height: 1.2;">
                📸 Fashion Insights
              </h1>
              <p style="color: #ffffff; font-size: 18px; margin: 0 0 5px 0;">${currentDate}</p>
              <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0;">Your weekly AI-powered fashion trends</p>
            </td>
          </tr>

          <!-- Top Trend Section -->
          <tr>
            <td style="padding: 60px 30px; text-align: center; background-color: #ffffff;">
              <div style="font-size: 48px; margin-bottom: 16px;">🔥</div>
              <p style="color: #667eea; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 12px 0;">
                This Week's Top Trend
              </p>
              <h2 style="color: #333; font-size: 36px; font-weight: 700; margin: 0 0 16px 0;">${topTrend}</h2>
              <p style="color: #666; font-size: 18px; line-height: 1.6; margin: 0;">${insights.summary}</p>
            </td>
          </tr>

          <!-- Trending Colors Section -->
          <tr>
            <td style="padding: 60px 30px; background-color: #f9fafb;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <h2 style="color: #333; font-size: 32px; font-weight: 700; margin: 0 0 32px 0;">
                      🎨 Trending Colors
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        ${colors.map(color => `
                          <td align="center" width="33.33%" style="padding: 10px;">
                            <div style="width: 120px; height: 120px; background-color: ${color.hex}; border-radius: 50%; margin: 0 auto 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"></div>
                            <p style="font-family: monospace; font-size: 13px; font-weight: 600; color: #333; margin: 0 0 4px;">${color.hex}</p>
                            <p style="font-size: 12px; color: #666; margin: 0;">${color.name}</p>
                          </td>
                        `).join('')}
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 24px;">
                    <p style="color: #666; font-size: 14px; margin: 0;">Colors dominating influencer feeds this week</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Moodboard Section -->
          ${moodboardImages.length >= 6 ? `
          <tr>
            <td style="padding: 60px 30px; background-color: #ffffff;">
              <p style="color: #667eea; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; text-align: center; margin: 0 0 12px 0;">
                Inspiration
              </p>
              <h2 style="color: #333; font-size: 32px; font-weight: 700; text-align: center; margin: 0 0 12px 0;">This Week's Moodboard</h2>
              <p style="text-align: center; color: #666; font-size: 16px; margin: 0 0 32px 0;">Curated visual inspiration from the latest fashion trends</p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  ${moodboardImages.slice(0, 3).map(img => `
                    <td width="33.33%" style="padding: 6px;">
                      <img src="${proxyImage(img)}" alt="Fashion moodboard" style="width: 100%; height: auto; display: block; border-radius: 8px;" />
                    </td>
                  `).join('')}
                </tr>
                <tr>
                  ${moodboardImages.slice(3, 6).map(img => `
                    <td width="33.33%" style="padding: 6px;">
                      <img src="${proxyImage(img)}" alt="Fashion moodboard" style="width: 100%; height: auto; display: block; border-radius: 8px;" />
                    </td>
                  `).join('')}
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Products Section -->
          ${products.length > 0 ? `
          <tr>
            <td style="padding: 60px 30px; background-color: #f9fafb;">
              <h2 style="color: #333; font-size: 32px; font-weight: 700; text-align: center; margin: 0 0 32px 0;">
                🛍️ Products & Brands Mentioned
              </h2>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  ${products.map(product => `
                    <td width="33.33%" align="center" style="padding: 10px; vertical-align: top;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                        <tr>
                          <td style="position: relative;">
                            <img src="${proxyImage(product.image)}" alt="${product.brand} ${product.name}" style="width: 100%; height: auto; display: block;" />
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 20px; text-align: center;">
                            <p style="font-weight: 700; font-size: 18px; color: #333; margin: 0 0 4px 0;">${product.brand}</p>
                            <p style="color: #666; font-size: 14px; margin: 0 0 12px 0;">${product.name}</p>
                            <p style="color: #666; font-size: 13px; margin: 0 0 16px 0;">Featured by ${product.featured}</p>
                            <a href="${product.link}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Shop →</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  `).join('')}
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Influencer Posts Section -->
          <tr>
            <td style="padding: 60px 30px; background-color: #ffffff;">
              <h2 style="color: #333; font-size: 32px; font-weight: 700; text-align: center; margin: 0 0 32px 0;">
                📸 Featured This Week
              </h2>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${influencerPosts.map((post, index) => `
                  ${index % 2 === 0 ? '<tr>' : ''}
                    <td width="50%" style="padding: 10px; vertical-align: top;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 12px; overflow: hidden;">
                        <tr>
                          <td>
                            <img src="${proxyImage(post.image)}" alt="${post.username}" style="width: 100%; height: auto; display: block;" />
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 24px;">
                            <p style="font-weight: 700; font-size: 16px; color: #333; margin: 0 0 8px 0;">${post.username}</p>
                            <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">${post.text}</p>
                            <a href="${post.link}" style="color: #667eea; font-weight: 600; font-size: 14px; text-decoration: none;">View Post →</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  ${index % 2 === 1 || index === influencerPosts.length - 1 ? '</tr>' : ''}
                `).join('')}
              </table>
            </td>
          </tr>

          <!-- Voice Chat AI Section -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <div style="font-size: 64px; margin-bottom: 20px;">🎤</div>
                    <h2 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0 0 16px 0;">Chat with Fashion AI</h2>
                    <p style="color: rgba(255,255,255,0.95); font-size: 18px; line-height: 1.6; margin: 0 0 32px 0; max-width: 500px; margin-left: auto; margin-right: auto;">
                      Click the purple microphone on our website to chat with our AI fashion assistant using voice or text!
                    </p>

                    <!-- Sample Questions -->
                    <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 16px; padding: 30px; margin-bottom: 32px; text-align: left; max-width: 500px; margin-left: auto; margin-right: auto; border: 1px solid rgba(255,255,255,0.2);">
                      <h3 style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; text-align: center;">💬 Try Asking:</h3>
                      <ul style="margin: 0; padding-left: 20px; color: rgba(255,255,255,0.9); line-height: 2;">
                        <li>"What's trending in fashion this week?"</li>
                        <li>"Show me outfit ideas for summer"</li>
                        <li>"What colors are popular right now?"</li>
                        <li>"Suggest sustainable fashion brands"</li>
                        <li>"How do I style oversized blazers?"</li>
                      </ul>
                    </div>

                    <!-- CTA Button -->
                    <a href="http://localhost:8080" style="display: inline-block; padding: 18px 36px; background-color: #ffffff; color: #667eea; text-decoration: none; border-radius: 8px; font-size: 18px; font-weight: 700; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                      Try Voice Chat Now 🎤
                    </a>

                    <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 20px 0 0 0;">
                      Available 24/7 • Voice & Text • Powered by AI
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Newsletter Subscription Section -->
          <tr>
            <td style="background: linear-gradient(135deg, #764ba2 0%, #667eea 100%); padding: 60px 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 16px; border: 1px solid rgba(255,255,255,0.2); padding: 40px;">
                <tr>
                  <td align="center">
                    <h2 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0 0 12px 0;">💌 Never Miss a Trend</h2>
                    <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0 0 32px 0;">Join 1,000+ fashion lovers getting weekly insights</p>

                    <form action="http://localhost:5678/webhook/newsletter-signup" method="POST" style="text-align: center;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-bottom: 16px;">
                            <label style="display: block; color: #ffffff; font-size: 14px; font-weight: 600; text-align: left; margin-bottom: 8px;">Email Address *</label>
                            <input type="email" name="email" placeholder="your@email.com" required style="width: 100%; padding: 15px; border: none; border-radius: 8px; font-size: 15px; box-sizing: border-box; background-color: rgba(255,255,255,0.9);" />
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 16px;">
                            <label style="display: block; color: #ffffff; font-size: 14px; font-weight: 600; text-align: left; margin-bottom: 8px;">Your Name (optional)</label>
                            <input type="text" name="name" placeholder="Jane Doe" style="width: 100%; padding: 15px; border: none; border-radius: 8px; font-size: 15px; box-sizing: border-box; background-color: rgba(255,255,255,0.9);" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <button type="submit" style="width: 100%; padding: 18px; background-color: #ffffff; color: #667eea; border: none; border-radius: 8px; font-size: 18px; font-weight: 700; cursor: pointer;">
                              Get Weekly Fashion Insights ✨
                            </button>
                          </td>
                        </tr>
                      </table>
                      <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin: 16px 0 0 0;">No spam, ever • Unsubscribe anytime</p>
                    </form>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 60px 30px; background-color: #1f2937; text-align: center;">
              <h3 style="color: #ffffff; font-size: 18px; font-weight: 700; margin: 0 0 8px 0;">Fashion Insights</h3>
              <p style="color: #9ca3af; font-size: 14px; margin: 0 0 4px 0;">
                Curated by Ortal - Data Scientist & AI Builder
              </p>
              <p style="color: #9ca3af; font-size: 13px; margin: 0 0 16px 0;">
                Specializing in trend analysis, automation, and creative intelligence tools
              </p>
              <p style="margin: 0 0 24px 0;">
                <a href="mailto:ortal@onsight-analytics.com" style="color: #667eea; text-decoration: none; font-size: 14px;">
                  ortal@onsight-analytics.com
                </a>
              </p>

              <div style="border-top: 1px solid #4b5563; padding-top: 24px; margin-top: 24px;">
                <p style="color: #9ca3af; font-size: 13px; margin: 0 0 16px 0;">
                  <a href="http://localhost:5678/webhook/unsubscribe-confirm" style="color: #9ca3af; text-decoration: none;">Unsubscribe</a>
                  <span style="margin: 0 8px;">•</span>
                  <a href="#" style="color: #9ca3af; text-decoration: none;">View in Browser</a>
                  <span style="margin: 0 8px;">•</span>
                  <a href="#" style="color: #9ca3af; text-decoration: none;">Privacy Policy</a>
                </p>
                <p style="color: #6b7280; font-size: 11px; margin: 0;">
                  © 2025 Fashion Insights. All rights reserved.
                </p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Return with same structure as original (to, name, subject, html)
return [{
  json: {
    to: subscriber.email,
    name: subscriberName,
    subject: `📸 Fashion Insights: ${topTrend.substring(0, 50)}... 🎨`,
    html: html
  }
}];
