const fs = require('fs');
const path = require('path');

console.log('🌸 Installing DEVI AI Fashion Influencer System...\n');
console.log('━'.repeat(60));
console.log('');

// Read workflow and node files
const workflowPath = path.join(__dirname, 'workflows', 'fashion-insights-INFLUENCER-PRODUCTS.json');
const contentNodesPath = path.join(__dirname, 'devi-content-nodes.json');
const lovableNodesPath = path.join(__dirname, 'devi-lovable-update-nodes.json');

console.log('📂 Loading files...');
const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
const contentNodes = JSON.parse(fs.readFileSync(contentNodesPath, 'utf8'));
const lovableNodes = JSON.parse(fs.readFileSync(lovableNodesPath, 'utf8'));

// Remove old MAYA.AI nodes if they exist
const oldNodeIds = [
  'generate-blog-post',
  'write-blog-post',
  'write-blog-page',
  'write-blog-json',
  'generate-voice-context',
  'write-voice-context'
];

const oldNodeNames = [
  'Generate AI Influencer Blog Post',
  'Write Blog Post Files',
  'Write Blog Page File',
  'Write Blog JSON File',
  'Generate Voice Chat Context',
  'Write Voice Context File'
];

console.log('🗑️  Removing old MAYA.AI nodes...');
workflow.nodes = workflow.nodes.filter(n => !oldNodeIds.includes(n.id));
oldNodeNames.forEach(name => delete workflow.connections[name]);
console.log('   ✅ Cleaned up old system');

// Add new Devi content nodes
console.log('\n📦 Installing Devi Content Generator nodes...');
contentNodes.nodes.forEach(node => {
  workflow.nodes.push(node);
  console.log(`   ✅ ${node.name}`);
});

// Add new Devi Lovable update nodes
console.log('\n📦 Installing Lovable Auto-Update nodes...');
lovableNodes.nodes.forEach(node => {
  workflow.nodes.push(node);
  console.log(`   ✅ ${node.name}`);
});

// Connect Format Final Report → Devi Master Generator
console.log('\n🔗 Connecting workflow...');

if (!workflow.connections["Format Final Report"]) {
  workflow.connections["Format Final Report"] = { main: [[]] };
}

// Remove old blog connection
workflow.connections["Format Final Report"].main[0] = workflow.connections["Format Final Report"].main[0].filter(
  conn => !['Generate AI Influencer Blog Post', 'Generate Blog Post'].includes(conn.node)
);

// Add new Devi Master Generator connection
workflow.connections["Format Final Report"].main[0].push({
  "node": "Devi Master Content Generator",
  "type": "main",
  "index": 0
});
console.log('   ✅ Format Final Report → Devi Master Content Generator');

// Add all internal connections from content nodes
Object.keys(contentNodes.connections).forEach(fromNode => {
  workflow.connections[fromNode] = contentNodes.connections[fromNode];
  contentNodes.connections[fromNode].main[0].forEach(conn => {
    console.log(`   ✅ ${fromNode} → ${conn.node}`);
  });
});

// Add Lovable update connections
// Connect Voice Context Generator → Lovable updates
if (!workflow.connections["Devi Voice Context Generator"]) {
  workflow.connections["Devi Voice Context Generator"] = { main: [[]] };
}

workflow.connections["Devi Voice Context Generator"].main[0].push(
  { "node": "Prepare Blog Page for Lovable", "type": "main", "index": 0 },
  { "node": "Prepare IG Content for Lovable", "type": "main", "index": 0 },
  { "node": "Prepare TikTok Content for Lovable", "type": "main", "index": 0 },
  { "node": "Write Voice Context to Lovable", "type": "main", "index": 0 }
);
console.log('   ✅ Devi Voice Context Generator → Lovable Update Nodes');

// Add Lovable internal connections
Object.keys(lovableNodes.connections).forEach(fromNode => {
  if (!workflow.connections[fromNode]) {
    workflow.connections[fromNode] = { main: [[]] };
  }
  lovableNodes.connections[fromNode].main[0].forEach(conn => {
    workflow.connections[fromNode].main[0].push(conn);
    console.log(`   ✅ ${fromNode} → ${conn.node}`);
  });
});

// Save updated workflow
fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2), 'utf8');

console.log('\n━'.repeat(60));
console.log('\n🎉 SUCCESS! Devi AI Fashion Influencer System Installed!\n');

console.log('📋 COMPLETE WORKFLOW STRUCTURE:\n');
console.log('   Monday 9 AM Schedule Trigger');
console.log('        ↓');
console.log('   Scrape Instagram → AI Analysis → Format Report');
console.log('        ↓');
console.log('   ├─→ Email Newsletter (existing)');
console.log('   │');
console.log('   └─→ 🌸 DEVI CONTENT SYSTEM (NEW)');
console.log('        │');
console.log('        ├─→ Devi Master Content Generator');
console.log('        │     ├─→ Blog Post Generator');
console.log('        │     ├─→ Instagram Script Generator');
console.log('        │     └─→ TikTok Script Generator');
console.log('        │           ↓');
console.log('        ├─→ Affiliate Link Processor');
console.log('        │           ↓');
console.log('        ├─→ Voice Context Generator');
console.log('        │           ↓');
console.log('        └─→ LOVABLE AUTO-UPDATE');
console.log('              ├─→ Blog Page');
console.log('              ├─→ IG Content JSON');
console.log('              ├─→ TikTok Content JSON');
console.log('              └─→ Voice Context JSON');
console.log('');

console.log('✨ WHAT DEVI CREATES EVERY WEEK:\n');
console.log('   📝 Blog Post - Full trend breakdown with products');
console.log('   📸 Instagram Carousel - 7-slide script with captions');
console.log('   🎬 TikTok/Reels - 30-60s voiceover script');
console.log('   💰 Affiliate Links - Auto-tagged product URLs');
console.log('   🎤 Voice Chat Context - Updated talk points');
console.log('   🌐 Lovable Website - Auto-updated pages');
console.log('');

console.log('🌸 MEET DEVI (Devine):\n');
console.log('   Name: Devine (@devine.me)');
console.log('   Style: Seoul-meets-Paris soft editorial');
console.log('   Voice: Warm, stylish, friendly, authentic');
console.log('   Content: Non-sexual, elegant, fashion-forward');
console.log('');

console.log('📚 DOCUMENTATION CREATED:\n');
console.log('   ✅ DEVI-PERSONA.md - Complete personality guide');
console.log('   ✅ DEVI-IMAGE-PROMPTS.md - Photo generation prompts');
console.log('   ✅ devi-content-nodes.json - Content generators');
console.log('   ✅ devi-lovable-update-nodes.json - Website updater');
console.log('');

console.log('🚀 NEXT STEPS:\n');
console.log('   1. Import workflow to n8n:');
console.log('      → http://localhost:5678');
console.log('      → Workflows → Import from File');
console.log('      → Select: fashion-insights-INFLUENCER-PRODUCTS.json');
console.log('');
console.log('   2. Generate Devi portrait images:');
console.log('      → Use prompts from DEVI-IMAGE-PROMPTS.md');
console.log('      → Recommended: DALL-E 3 or Midjourney v6');
console.log('      → Create: Profile pic, café shot, rooftop, boutique');
console.log('');
console.log('   3. Add Lovable API credentials:');
console.log('      → n8n → Credentials → HTTP Header Auth');
console.log('      → Add your Lovable project token');
console.log('');
console.log('   4. Test the workflow:');
console.log('      → Click "Test workflow" in n8n');
console.log('      → Verify all content generated');
console.log('      → Check Lovable site updated');
console.log('');

console.log('💜 Devi is ready to launch!\n');
console.log('━'.repeat(60));
