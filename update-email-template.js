const fs = require('fs');

// Read the workflow
const wf = JSON.parse(fs.readFileSync('workflows/fashion-insights-INFLUENCER-PRODUCTS.json', 'utf8'));

// Read the new email template code
const newEmailCode = fs.readFileSync('improved-email-template.js', 'utf8');

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

  console.log('✅ Updated workflow with improved email template');
  console.log('\nNew features added:');
  console.log('  1. ✨ Moodboard section with trending colors');
  console.log('  2. 🖼️  Improved image handling (checks for valid URLs)');
  console.log('  3. ⭐ Influencer spotlight section');
  console.log('  4. 📸 Better featured posts layout with images');
  console.log('  5. 🎨 More visual and modern design');

} else {
  console.log('❌ Could not find "Prepare Email with Products" node');
}
