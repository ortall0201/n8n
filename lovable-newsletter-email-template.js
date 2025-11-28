// LOVABLE DESIGN - EMAIL NEWSLETTER TEMPLATE
// Converted from React landing page to email-compatible HTML
// This matches your Lovable landing page design!

const topTrend = $json.topTrend || "Gender-Fluid Fashion";
const trendDescription = $json.trendDescription || "Fashion influencers are embracing gender-neutral pieces and fluid silhouettes this week";

// Trending colors
const colors = $json.colors || [
  { hex: "#FF6B9D", name: "Vibrant Pink" },
  { hex: "#C44569", name: "Burgundy" },
  { hex: "#FFA07A", name: "Coral" }
];

// Moodboard images
const moodboardImages = $json.moodboardImages || [
  "https://images.unsplash.com/photo-1569444743503-f11ed614445b?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1635650805015-2fa50682873a?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1613909671501-f9678ffc1d33?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1569388330292-79cc1ec67270?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1762430815620-fcca603c240c?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1525968681927-9cd76a0590a9?w=600&h=600&fit=crop"
];

// Products
const products = $json.products || [
  {
    brand: "Dior",
    name: "Evening Gown",
    badge: "Limited Time",
    featured: "3 influencers",
    image: "https://images.unsplash.com/photo-1682183948920-16d882bd786d?w=400&h=300&fit=crop"
  },
  {
    brand: "Chanel",
    name: "Luxury Handbag",
    badge: "Hot Deal",
    featured: "5 influencers",
    image: "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?w=400&h=300&fit=crop"
  },
  {
    brand: "Balenciaga",
    name: "Designer Shoes",
    badge: "Exclusive",
    featured: "4 influencers",
    image: "https://images.unsplash.com/photo-1686783695684-7b8351fdebbd?w=400&h=300&fit=crop"
  }
];

// Influencer posts
const influencerPosts = $json.influencerPosts || [
  {
    username: "@chiaraferragni",
    text: "Stunning Dior gown at Paris Fashion Week. The gender-fluid silhouette is everything...",
    image: "https://images.unsplash.com/photo-1682183948920-16d882bd786d?w=400&h=400&fit=crop"
  },
  {
    username: "@aimesong",
    text: "Obsessed with this coral-toned ensemble from Milan. Breaking all the fashion rules in the best way...",
    image: "https://images.unsplash.com/photo-1563418754681-55ab8367b1c0?w=400&h=400&fit=crop"
  },
  {
    username: "@alexa_chung",
    text: "The burgundy color palette is having such a moment right now. Loving this vintage-inspired look...",
    image: "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?w=400&h=400&fit=crop"
  },
  {
    username: "@wisdomkaye",
    text: "Redefining gender norms one outfit at a time. These Balenciaga pieces are pure art and self-expression...",
    image: "https://images.unsplash.com/photo-1686783695684-7b8351fdebbd?w=400&h=400&fit=crop"
  }
];

// Proxy images for email compatibility
const proxyImage = (url) => `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=600&output=webp`;

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

          <!-- Header Section -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px 20px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 48px; font-weight: 700; margin: 0 0 10px 0; line-height: 1.2;">
                📸 Fashion Insights
              </h1>
              <p style="color: #ffffff; font-size: 18px; margin: 0 0 5px 0;">Week of January 27, 2025</p>
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
              <p style="color: #666; font-size: 18px; line-height: 1.6; margin: 0;">${trendDescription}</p>
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
                            <p style="font-family: monospace; font-size: 13px; font-weight: 600; color: #333; margin: 0;">${color.hex}</p>
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

          <!-- Products Section -->
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
                            <div style="position: absolute; top: 12px; left: 12px; background-color: #ff6600; color: #ffffff; padding: 4px 12px; border-radius: 4px; font-size: 11px; font-weight: 600;">${product.badge}</div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 20px; text-align: center;">
                            <p style="font-weight: 700; font-size: 18px; color: #333; margin: 0 0 4px 0;">${product.brand}</p>
                            <p style="color: #666; font-size: 14px; margin: 0 0 12px 0;">${product.name}</p>
                            <p style="color: #666; font-size: 13px; margin: 0 0 16px 0;">Featured by ${product.featured}</p>
                            <a href="#" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Shop →</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  `).join('')}
                </tr>
              </table>
            </td>
          </tr>

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
                            <a href="#" style="color: #667eea; font-weight: 600; font-size: 14px; text-decoration: none;">View Post →</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  ${index % 2 === 1 || index === influencerPosts.length - 1 ? '</tr>' : ''}
                `).join('')}
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

return [{ json: { html } }];
