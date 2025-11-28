const fs = require('fs');

const wf = JSON.parse(fs.readFileSync('workflows/fashion-insights-INFLUENCER-PRODUCTS.json', 'utf8'));

const emailNode = wf.nodes.find(n => n.id === 'prepare-email');

if (emailNode && emailNode.parameters && emailNode.parameters.jsCode) {
  fs.writeFileSync('email-preparation-code.js', emailNode.parameters.jsCode, 'utf8');
  console.log('✅ Email preparation code saved to: email-preparation-code.js');

  // Check for image references
  const code = emailNode.parameters.jsCode;
  const hasImageTag = code.includes('<img');
  const hasImageUrl = code.includes('image_url');

  console.log(`\n=== IMAGE CHECK ===`);
  console.log(`Contains <img> tag: ${hasImageTag ? '✅ YES' : '❌ NO'}`);
  console.log(`References image_url: ${hasImageUrl ? '✅ YES' : '❌ NO'}`);

  // Check featured posts section
  if (code.includes('featuredPostsHTML')) {
    console.log(`Has featuredPostsHTML: ✅ YES`);
  } else {
    console.log(`Has featuredPostsHTML: ❌ NO`);
  }
} else {
  console.log('❌ Could not find prepare-email node or jsCode');
}
