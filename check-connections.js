const fs = require('fs');

const wf = JSON.parse(fs.readFileSync('workflows/fashion-insights-INFLUENCER-PRODUCTS.json', 'utf8'));

const nodeNames = wf.nodes.map(n => n.name);
const connNames = Object.keys(wf.connections);

console.log('=== NODE NAMES ===');
nodeNames.forEach((n, i) => console.log(`${i + 1}. ${n}`));

console.log('\n=== CONNECTION NAMES ===');
connNames.forEach((n, i) => console.log(`${i + 1}. ${n}`));

console.log('\n=== VERIFICATION ===');

// Check if all non-trigger nodes that output have connections
const nodesWithOutputs = wf.nodes.filter(node => {
  // Manual triggers and some special nodes don't need to be in connections as source
  return !node.type.includes('trigger');
});

const missingConnections = nodesWithOutputs.filter(node => {
  return !connNames.includes(node.name);
});

if (missingConnections.length > 0) {
  console.log('\n❌ MISSING CONNECTIONS (nodes not in connections object):');
  missingConnections.forEach(n => console.log(`   - ${n.name}`));
} else {
  console.log('✅ All nodes are properly connected');
}

// Check OpenAI node specifically
const openaiNode = wf.nodes.find(n => n.id === 'openai-fashion-analysis');
const openaiInConnections = connNames.includes(openaiNode.name);

console.log(`\n=== OPENAI NODE CHECK ===`);
console.log(`Node name: "${openaiNode.name}"`);
console.log(`In connections: ${openaiInConnections ? '✅ YES' : '❌ NO'}`);

// Check what connects TO openai
const connectsToOpenAI = Object.entries(wf.connections).find(([nodeName, conn]) => {
  return conn.main && conn.main[0] && conn.main[0].some(c => c.node === openaiNode.name);
});

console.log(`\nWhat connects TO OpenAI:`);
if (connectsToOpenAI) {
  console.log(`  ✅ "${connectsToOpenAI[0]}" → "${openaiNode.name}"`);
} else {
  console.log(`  ❌ Nothing connects to OpenAI node!`);
}

// Check what OpenAI connects to
const openaiConnections = wf.connections[openaiNode.name];
console.log(`\nWhat OpenAI connects TO:`);
if (openaiConnections && openaiConnections.main) {
  openaiConnections.main[0].forEach(conn => {
    console.log(`  ✅ "${openaiNode.name}" → "${conn.node}"`);
  });
} else {
  console.log(`  ❌ OpenAI doesn't connect to anything!`);
}
