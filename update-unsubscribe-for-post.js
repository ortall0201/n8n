const fs = require('fs');

// Read the unsubscribe workflow
const wf = JSON.parse(fs.readFileSync('workflows/newsletter-unsubscribe-webhook.json', 'utf8'));

// Update webhook node to accept POST
const webhookNode = wf.nodes.find(n => n.id === 'webhook-unsubscribe');
if (webhookNode) {
  webhookNode.parameters.httpMethod = 'POST';
  console.log('✅ Updated webhook to accept POST method');
}

// Update email extraction to read from POST body instead of query
const extractNode = wf.nodes.find(n => n.id === 'extract-email');
if (extractNode) {
  extractNode.parameters.jsCode = `// EXTRACT EMAIL FROM POST BODY
const body = $input.item.json.body;
const email = body.email?.trim().toLowerCase();

// Validate email exists
if (!email) {
  return [{
    json: {
      error: true,
      message: 'No email provided',
      email: null
    }
  }];
}

// Validate email format
const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
if (!emailRegex.test(email)) {
  return [{
    json: {
      error: true,
      message: 'Invalid email format',
      email: email
    }
  }];
}

return [{
  json: {
    error: false,
    email: email,
    unsubscribe_date: new Date().toISOString().split('T')[0],
    unsubscribe_timestamp: new Date().toISOString()
  }
}];`;
  console.log('✅ Updated email extraction for POST body');
}

// Save updated workflow
fs.writeFileSync(
  'workflows/newsletter-unsubscribe-webhook.json',
  JSON.stringify(wf, null, 2),
  'utf8'
);

console.log('✅ Unsubscribe workflow updated to support POST method');
console.log('\n📋 Next steps:');
console.log('1. Import workflows/unsubscribe-confirmation-page.json');
console.log('2. Re-import workflows/newsletter-unsubscribe-webhook.json');
console.log('3. Activate both workflows');
console.log('4. Test unsubscribe link in newsletter');
