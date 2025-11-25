# n8n Workflow Examples

Simple, easy-to-understand workflows for learning n8n.

---

## Hello World Workflow

**File**: `hello-world.json`

### What It Does

The simplest possible n8n workflow that:
1. ✅ Triggers manually when you click "Test workflow"
2. ✅ Generates a greeting message with timestamp
3. ✅ Formats the output into clean fields

### Visual Flow

```
┌─────────────────────────┐
│  Manual Trigger         │
│  (Click to test)        │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Code Node              │
│  Generate Message       │
│  - Create greeting      │
│  - Add timestamp        │
│  - Return JSON          │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Set Node               │
│  Format Output          │
│  - Extract fields       │
│  - Clean structure      │
└─────────────────────────┘
```

### How to Import

#### Method 1: Via n8n UI (Easiest)

1. Open your n8n instance (http://localhost:5678)
2. Click **"Add workflow"** or **"+"** button
3. Click the **"⋮"** (three dots) menu in top right
4. Select **"Import from file"**
5. Choose `hello-world.json`
6. Click **"Test workflow"** button
7. See the magic! ✨

#### Method 2: Copy-Paste

1. Open `hello-world.json` in a text editor
2. Copy the entire contents
3. In n8n, click **"⋮"** menu → **"Import from JSON"**
4. Paste the JSON
5. Click **"Import"**

#### Method 3: Via API (Advanced)

```bash
curl -X POST http://localhost:5678/api/v1/workflows \
  -H "Content-Type: application/json" \
  -H "X-N8N-API-KEY: your-api-key" \
  -d @hello-world.json
```

---

## Understanding the Workflow

### Node 1: Manual Trigger

```json
{
  "name": "When clicking 'Test workflow'",
  "type": "n8n-nodes-base.manualTrigger"
}
```

**Purpose**: Start the workflow when you click "Test workflow"

**No configuration needed** - just click and go!

---

### Node 2: Code Node (JavaScript)

```javascript
// Simple Hello World code
const currentTime = new Date().toLocaleString();
const message = `Hello from n8n! 👋`;

return [
  {
    json: {
      message: message,
      timestamp: currentTime,
      status: 'success',
      tip: 'You just ran your first n8n workflow!'
    }
  }
];
```

**Purpose**: Generate dynamic data

**What it does**:
- Gets current time
- Creates a greeting message
- Returns JSON object with multiple fields

**Output Example**:
```json
{
  "message": "Hello from n8n! 👋",
  "timestamp": "11/24/2025, 3:30:00 PM",
  "status": "success",
  "tip": "You just ran your first n8n workflow!"
}
```

---

### Node 3: Set Node (Format Output)

```json
{
  "name": "Format Output",
  "type": "n8n-nodes-base.set",
  "assignments": [
    { "name": "greeting", "value": "={{ $json.message }}" },
    { "name": "time", "value": "={{ $json.timestamp }}" },
    { "name": "result", "value": "={{ $json.status }}" }
  ]
}
```

**Purpose**: Clean up and restructure data

**What it does**:
- Extracts specific fields from previous node
- Renames them for clarity
- Creates clean output structure

**Output Example**:
```json
{
  "greeting": "Hello from n8n! 👋",
  "time": "11/24/2025, 3:30:00 PM",
  "result": "success"
}
```

---

## Key Concepts Demonstrated

### 1. Node Types

- **Trigger Node** (`manualTrigger`) - Starts the workflow
- **Action Node** (`code`) - Processes data
- **Transform Node** (`set`) - Modifies data structure

### 2. Data Flow

```
Trigger → Process → Transform
```

Data flows from left to right through connected nodes.

### 3. Expressions

```javascript
={{ $json.message }}
```

- `{{ }}` - Expression syntax
- `$json` - Current node's data
- `.message` - Access field

### 4. JSON Structure

Every node works with JSON data:
```json
{
  "json": {
    "field1": "value1",
    "field2": "value2"
  }
}
```

---

## Next Steps

### Easy Modifications

#### 1. Change the Message

Edit the Code node:
```javascript
const message = `Hello, [YOUR NAME]! 🎉`;
```

#### 2. Add More Fields

Add to the return object:
```javascript
return [{
  json: {
    message: message,
    timestamp: currentTime,
    status: 'success',
    userName: 'John Doe',      // NEW
    version: '1.0'             // NEW
  }
}];
```

#### 3. Use Current Date Math

```javascript
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

return [{
  json: {
    today: new Date().toLocaleDateString(),
    tomorrow: tomorrow.toLocaleDateString()
  }
}];
```

---

## Troubleshooting

### Workflow Won't Import

**Problem**: "Invalid JSON" error

**Solution**:
- Check file encoding (should be UTF-8)
- Ensure entire JSON is copied
- Try Method 1 (Import from file) instead

### Workflow Won't Execute

**Problem**: Nothing happens when clicking "Test workflow"

**Solution**:
- Ensure workflow is saved
- Check all nodes are connected (lines between them)
- Look for red error indicators on nodes

### Code Node Error

**Problem**: "Code node execution failed"

**Solution**:
- Check JavaScript syntax
- Ensure `return` statement exists
- Verify JSON structure

---

## What's Next?

### Level Up Your n8n Skills

1. **Add a webhook trigger** - Make it accessible via HTTP
2. **Connect to an API** - Fetch real data
3. **Add conditional logic** - Use IF node
4. **Store data** - Use Google Sheets or database
5. **Create notifications** - Send to Slack/Discord

### More Example Workflows

Coming soon:
- `api-endpoint.json` - Create REST API
- `slack-notification.json` - Send Slack messages
- `data-sync.json` - Sync data between services
- `ai-chatbot.json` - Build AI assistant

---

## Resources

### Official n8n Documentation
- **Workflows**: https://docs.n8n.io/workflows/
- **Nodes**: https://docs.n8n.io/integrations/builtin/
- **Expressions**: https://docs.n8n.io/code/expressions/

### From This Repository
- **brain/brain-unified.md** - Complete n8n knowledge
- **WORKFLOW-ANALYSIS.md** - Workflow field analysis
- **.skills/n8n-brain.md** - N8N-BRAIN assistant

### Community
- **Forum**: https://community.n8n.io
- **Templates**: https://n8n.io/workflows
- **Discord**: Active community support

---

## Contributing

Have a simple workflow example? Add it here!

1. Create workflow JSON
2. Add description in this README
3. Test thoroughly
4. Submit PR

---

**Created with ❤️ using N8N-BRAIN**
