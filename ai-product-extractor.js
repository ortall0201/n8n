// AI-POWERED PRODUCT EXTRACTION FROM INSTAGRAM CAPTIONS
// This node uses OpenAI to identify products, brands, and clothing items from influencer posts

const posts = $input.all();

// Build the extraction prompt for GPT-4o-mini
const extractionPrompt = `You are a fashion product analyst. Extract product, brand, and clothing item information from these Instagram posts.

For each post, identify:
- **Brands mentioned** (Dior, Chanel, Zara, H&M, etc.)
- **Clothing items** (dress, jeans, bag, shoes, coat, etc.)
- **Product types** (if specific, like "leather jacket", "mini bag")
- **Key features** (color, style, material if mentioned)

Posts:
${posts.map((item, idx) => {
  const post = item.json;
  return `
Post ${idx + 1} by @${post.author}:
Caption: ${post.caption}
---`;
}).join('\n')}

Return a JSON array with this structure:
[
  {
    "post_index": 0,
    "author": "@username",
    "brands": ["Brand1", "Brand2"],
    "products": ["dress", "bag"],
    "product_description": "Brief description of the outfit/products (1-2 sentences)",
    "has_products": true/false
  }
]

ONLY include posts that mention specific brands, clothing items, or products. Skip posts that are purely lifestyle or personal updates.`;

return [{
  json: {
    prompt: extractionPrompt,
    posts_to_analyze: posts.length
  }
}];
