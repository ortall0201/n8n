# MCP Usage Examples

Complete examples for using Figma MCP and Make.com MCP in the Fashion Insights system.

---

## Table of Contents

1. [Figma MCP Examples](#figma-mcp-examples)
2. [Make.com MCP Examples](#makecom-mcp-examples)
3. [Integration Examples](#integration-examples)
4. [Troubleshooting](#troubleshooting)

---

## Figma MCP Examples

### Example 1: Sync All Components

```bash
# Sync all Figma components to lovable-ui/pages/
node mcp/figma-sync.js

# Output:
# 🎨 Figma → UI Sync Starting...
# 📥 Fetching Figma file data...
# ✅ Loaded Figma file: "Fashion Insights UI"
# 🔍 Extracting components...
#    📄 Page: "Landing"
#    📄 Page: "About"
#    📄 Page: "Newsletter"
# ✅ Found 12 components/frames
# ⚙️  Generating React components...
#    ✅ Generated: landing-page.tsx
#    ✅ Generated: about-page.tsx
#    ✅ Generated: newsletter-preview.tsx
# ✨ Sync complete! Generated 12 components.
```

### Example 2: Sync Specific Page

```bash
# Sync only components from "Landing" page
node mcp/figma-sync.js --page "Landing"
```

### Example 3: Dry Run (Preview Changes)

```bash
# See what would be synced without writing files
node mcp/figma-sync.js --dry-run
```

---

## Make.com MCP Examples

### Example 1: Trigger Scenario from Code

```javascript
// Trigger newsletter sent event
const MakeClient = require('../mcp/make-client');
const client = new MakeClient();

await client.trigger(
  process.env.MAKE_NEWSLETTER_WEBHOOK,
  {
    event: 'newsletter_sent',
    timestamp: new Date().toISOString(),
    subscribers_count: 150,
    top_trends: ['Oversized blazers', 'Neon colors', 'Vintage denim']
  }
);
```

### Example 2: Check Scenario Status

```javascript
const client = new MakeClient();
const executions = await client.getScenarioStatus('scenario-id', 5);

executions.forEach((exec, i) => {
  console.log(`${i + 1}. ${exec.status} - ${exec.startedAt}`);
});
```

### Example 3: List All Scenarios

```javascript
const client = new MakeClient();
const scenarios = await client.listScenarios();

scenarios.forEach(scenario => {
  console.log(`${scenario.name} - ${scenario.scheduling.type}`);
});
```

---

## Integration Examples

### Example 1: Full UI Update Workflow

```bash
#!/bin/bash
# scripts/update-ui-from-figma.sh

echo "🎨 Starting UI update from Figma..."

# 1. Sync Figma designs
node mcp/figma-sync.js

# 2. Run tests
npm test

# 3. Build project
npm run build

# 4. Notify via Make.com
node examples/notify-ui-update.js

echo "✅ UI update complete!"
```

### Example 2: Trigger Make.com from n8n Workflow

```json
// n8n Function node: "Trigger Make Scenario"

const axios = require('axios');
const newsletterData = $json;

const payload = {
  event: 'newsletter_sent',
  timestamp: new Date().toISOString(),
  subscribers_count: newsletterData.subscribers.length,
  top_trends: newsletterData.insights.top_trends
};

const response = await axios.post(
  process.env.MAKE_NEWSLETTER_WEBHOOK,
  payload
);

return { json: { success: true, response: response.data } };
```

---

## Troubleshooting

### Figma MCP Issues

**Issue: "Missing FIGMA_PERSONAL_ACCESS_TOKEN"**

Solution:
```bash
# Get token from: https://www.figma.com/settings
# Add to .env:
echo "FIGMA_PERSONAL_ACCESS_TOKEN=your-token" >> .env
```

**Issue: "No components found to sync"**

Solution:
- Ensure Figma file has frames or components at page level
- Try: `node mcp/figma-sync.js --page "PageName"`

### Make.com MCP Issues

**Issue: "Missing MAKE_API_TOKEN"**

Solution:
```bash
# Get token from: https://www.make.com/en/api-documentation
# Add to .env:
echo "MAKE_API_TOKEN=your-token" >> .env
```

**Issue: "Failed to trigger scenario"**

Solution:
- Verify webhook URL is correct
- Check scenario is active in Make.com
- Test webhook with curl:
  ```bash
  curl -X POST https://hook.us1.make.com/your-webhook \
    -H "Content-Type: application/json" \
    -d '{"test": "data"}'
  ```

---

## Quick Commands Reference

```bash
# Figma MCP
node mcp/figma-sync.js                     # Sync all
node mcp/figma-sync.js --page "Landing"   # Sync specific page
node mcp/figma-sync.js --dry-run          # Preview changes
node mcp/figma-sync.js --help             # Show help

# Make.com MCP (via code examples)
node examples/trigger-make-scenario.js     # Trigger scenario
node examples/list-make-scenarios.js       # List scenarios
```

---

*Last updated: November 26, 2025*
