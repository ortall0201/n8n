const fs = require('fs');
const path = require('path');

// Read the workflow JSON
const workflowPath = path.join(__dirname, 'workflows', 'fashion-insights-INFLUENCER-PRODUCTS.json');
const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

// Read the new Lovable template
const templatePath = path.join(__dirname, 'lovable-workflow-integration.js');
const newJsCode = fs.readFileSync(templatePath, 'utf8');

// Find the "Prepare Email with Products" node and update its jsCode
const emailNode = workflow.nodes.find(node => node.id === 'prepare-email');

if (!emailNode) {
  console.error('❌ Error: Could not find "prepare-email" node in workflow');
  process.exit(1);
}

console.log(`✅ Found node: "${emailNode.name}" (id: ${emailNode.id})`);
console.log(`📝 Current jsCode length: ${emailNode.parameters.jsCode.length} characters`);

// Update the jsCode with the new Lovable template
emailNode.parameters.jsCode = newJsCode;

console.log(`✨ Updated jsCode length: ${emailNode.parameters.jsCode.length} characters`);

// Save the updated workflow
fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2), 'utf8');

console.log('');
console.log('🎉 SUCCESS! Workflow updated with Lovable design!');
console.log('');
console.log('📋 Summary of changes:');
console.log('   - File: workflows/fashion-insights-INFLUENCER-PRODUCTS.json');
console.log('   - Node: "Prepare Email with Products"');
console.log('   - Updated email template to use Lovable design');
console.log('');
console.log('✅ Your newsletter emails will now have:');
console.log('   🎨 Purple gradient header matching Lovable landing page');
console.log('   💎 Beautiful color circles for trending colors');
console.log('   📸 Moodboard grid with fashion images');
console.log('   🛍️ Product cards with brand names');
console.log('   ⭐ Influencer posts in 2-column layout');
console.log('   💌 Inline subscription form');
console.log('   🌟 Professional footer with contact info');
console.log('');
console.log('🚀 Next steps:');
console.log('   1. Import the updated workflow to n8n');
console.log('   2. Test by running the workflow manually');
console.log('   3. Send a test email to yourself');
console.log('   4. Enjoy your beautiful Lovable-designed newsletter!');
console.log('');
