const fs = require('fs');
const path = require('path');

console.log('🤖 Adding AI Influencer Content Agent to n8n workflow...\n');

// Read files
const workflowPath = path.join(__dirname, 'workflows', 'fashion-insights-INFLUENCER-PRODUCTS.json');
const nodesPath = path.join(__dirname, 'ai-influencer-nodes.json');

const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
const newNodesData = JSON.parse(fs.readFileSync(nodesPath, 'utf8'));

// Check if nodes already exist
const existingIds = workflow.nodes.map(n => n.id);
const nodesToAdd = newNodesData.nodes.filter(node => !existingIds.includes(node.id));

if (nodesToAdd.length === 0) {
  console.log('⚠️  AI Influencer nodes already exist. Updating...');
  // Remove old versions
  workflow.nodes = workflow.nodes.filter(n => !['generate-blog-post', 'write-blog-post', 'generate-voice-context', 'write-voice-context'].includes(n.id));
  workflow.nodes.push(...newNodesData.nodes);
} else {
  workflow.nodes.push(...nodesToAdd);
  console.log(`✅ Added ${nodesToAdd.length} new nodes`);
}

// Add connections from Format Final Report to Generate Blog Post
if (!workflow.connections["Format Final Report"]) {
  workflow.connections["Format Final Report"] = { main: [[]] };
}

const blogConnection = workflow.connections["Format Final Report"].main[0].find(
  conn => conn.node === "Generate AI Influencer Blog Post"
);

if (!blogConnection) {
  workflow.connections["Format Final Report"].main[0].push({
    "node": "Generate AI Influencer Blog Post",
    "type": "main",
    "index": 0
  });
  console.log('✅ Connected: Format Final Report → Generate AI Influencer Blog Post');
}

// Merge internal connections
Object.keys(newNodesData.connections).forEach(fromNode => {
  if (!workflow.connections[fromNode]) {
    workflow.connections[fromNode] = { main: [[]] };
  }

  newNodesData.connections[fromNode].main[0].forEach(conn => {
    const exists = workflow.connections[fromNode].main[0].find(c => c.node === conn.node);
    if (!exists) {
      workflow.connections[fromNode].main[0].push(conn);
      console.log(`✅ Connected: ${fromNode} → ${conn.node}`);
    }
  });
});

// Save workflow
fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2), 'utf8');

console.log('');
console.log('🎉 SUCCESS! AI Influencer Content Agent added!');
console.log('');
console.log('📋 New Workflow Structure:');
console.log('');
console.log('   [Format Final Report]');
console.log('        ├─→ [Get Subscribers] (existing email flow)');
console.log('        └─→ [Generate AI Influencer Blog Post] ← NEW!');
console.log('                 ↓');
console.log('            [Write Blog Post Files]');
console.log('                 ↓');
console.log('            [Generate Voice Chat Context]');
console.log('                 ↓');
console.log('            [Write Voice Context File]');
console.log('');
console.log('✨ What Gets Created Each Week:');
console.log('   📝 Blog post: figma-connect-landing/pages/blog/[date].tsx');
console.log('   📊 Blog JSON: figma-connect-landing/public/blog/[date].json');
console.log('   🎤 Voice context: figma-connect-landing/public/ai_influencer_context.json');
console.log('');
console.log('🤖 AI Influencer Persona: MAYA.AI');
console.log('   Style: mysterious, confident, fashion insider');
console.log('   Voice: "I scan what your favorite influencers wear, so you don\'t have to"');
console.log('');
console.log('🚀 Ready to import to n8n and test!');
console.log('');
