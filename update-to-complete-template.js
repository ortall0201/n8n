const fs = require('fs');

// Read the workflow
const wf = JSON.parse(fs.readFileSync('workflows/fashion-insights-INFLUENCER-PRODUCTS.json', 'utf8'));

// Read the new complete template
const newEmailCode = fs.readFileSync('complete-newsletter-template-v2.js', 'utf8');

// Find and update the "Prepare Email with Products" node
const emailNode = wf.nodes.find(n => n.id === 'prepare-email');

if (emailNode) {
  console.log('✅ Found "Prepare Email with Products" node');

  // Update the jsCode
  emailNode.parameters.jsCode = newEmailCode;

  // Save the updated workflow
  fs.writeFileSync(
    'workflows/fashion-insights-INFLUENCER-PRODUCTS.json',
    JSON.stringify(wf, null, 2),
    'utf8'
  );

  console.log('✅ Updated workflow with complete template v2');
  console.log('\nNew features added:');
  console.log('  1. ✨ Animated images with hover effects (photos come alive!)');
  console.log('  2. 🛍️  Enhanced products section with brand extraction');
  console.log('  3. 📧 Inline subscription form (no popup window)');
  console.log('  4. 👤 About section with Ortal Lasry bio');
  console.log('  5. ⚖️  Legal disclaimer about content usage');
  console.log('  6. 💌 Professional contact: ortal@onsight-analytics.com');
  console.log('\n📥 Next step: Re-import the workflow in n8n!');

} else {
  console.log('❌ Could not find "Prepare Email with Products" node');
}
