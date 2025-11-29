# 🔄 Lovable Q&A Auto-Update Integration

## What Was Added

Your n8n workflow now **automatically pushes weekly Q&A to Lovable** after generating it with OpenAI!

### New Flow:

```
🤖 Generate Q&A Prompt
  ↓
🤖 OpenAI - Generate Q&A (25 Q&A pairs, ~$0.04/week)
  ↓
📝 Parse Q&A Response
  ↓
💾 Save Q&A to GitHub (backup)
  ↓
🔄 Format Q&A for Lovable (prepare payload)
  ↓
💜 Push Q&A to Lovable App (HTTP POST)
```

---

## 🆕 New Nodes

### 1. **🔄 Format Q&A for Lovable** (Code node)

**What it does:**
- Takes parsed Q&A data
- Creates JavaScript code that Lovable can inject
- Builds API payload with metadata
- Generates `findDeviAnswer()` function for matching

**Output:**
```json
{
  "week_number": 1,
  "qa_pairs": [...],
  "lovable_payload": {
    "project_id": "YOUR_LOVABLE_PROJECT_ID",
    "action": "update_chatbot_data",
    "data": {
      "week_number": 1,
      "qa_pairs": [...],
      "code": "const deviQAData = [...];\nfunction findDeviAnswer(input) {...}"
    }
  },
  "chatbot_code": "// Ready-to-use JavaScript code"
}
```

---

### 2. **💜 Push Q&A to Lovable App** (HTTP Request)

**What it does:**
- Sends POST request to Lovable API
- Updates your chatbot with new Q&A
- Includes authentication token
- Payload contains ready-to-inject code

---

## 🔧 Configuration Required

### Option A: If Lovable Has a Public API

You need to find:

1. **Lovable API Endpoint**
   - Check Lovable docs: https://docs.lovable.dev (or similar)
   - Look for: "API", "Webhooks", "Integrations"
   - Update node URL: `https://api.lovable.dev/v1/projects/YOUR_PROJECT_ID/update`

2. **Lovable API Token**
   - Go to Lovable settings
   - Generate API token
   - Update node: `Bearer YOUR_LOVABLE_API_TOKEN`

3. **Project ID**
   - Find in Lovable project settings
   - Update in "Format Q&A for Lovable" node: `YOUR_LOVABLE_PROJECT_ID`

---

### Option B: If Lovable Uses GitHub Integration

If Lovable deploys from a GitHub repo, we can update the repo directly:

**Replace "💜 Push Q&A to Lovable App" with GitHub node:**

```json
{
  "name": "💜 Update Lovable GitHub Repo",
  "type": "n8n-nodes-base.github",
  "parameters": {
    "resource": "file",
    "owner": "YOUR_GITHUB_USERNAME",
    "repository": "YOUR_LOVABLE_PROJECT_REPO",
    "filePath": "src/data/chatbot-qa.js",
    "fileContent": "={{ $json.chatbot_code }}",
    "commitMessage": "🤖 Update chatbot Q&A - Week {{ $json.week_number }}"
  }
}
```

Then Lovable will auto-deploy when it detects the commit.

---

### Option C: If Lovable Has No API (Webhook Approach)

**Setup:**

1. In Lovable, add a webhook listener:
   ```javascript
   // In your Lovable chatbot component
   useEffect(() => {
     // Listen for webhook updates
     fetch('/api/chatbot-qa-webhook').then(r => r.json()).then(data => {
       setQAData(data.qa_pairs);
     });
   }, []);
   ```

2. Create an API endpoint in Lovable that receives the webhook
3. Update the n8n node URL to point to your Lovable webhook

---

### Option D: Manual Lovable Update (Simplest)

**If Lovable has NO API/webhook**, you can:

1. Keep the GitHub save node (already working)
2. Remove the "Push to Lovable" node
3. In Lovable, add this code to fetch from GitHub:

```typescript
// In your Lovable chatbot component
import { useEffect, useState } from 'react';

export function DeviChatbot() {
  const [qaData, setQAData] = useState([]);

  useEffect(() => {
    async function loadWeeklyQA() {
      const currentWeek = Math.ceil((new Date() - new Date('2025-11-28')) / 604800000) + 1;
      const url = `https://raw.githubusercontent.com/ortall0201/n8n/master/devi-content/week-${currentWeek}/chatbot-qa.json`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setQAData(data.qa_pairs);
      } catch (error) {
        console.error('Failed to load Q&A:', error);
      }
    }

    loadWeeklyQA();
  }, []);

  function findAnswer(userInput) {
    const words = userInput.toLowerCase().split(' ');

    for (const qa of qaData) {
      const matchedKeyword = qa.keywords.find(keyword =>
        words.includes(keyword.toLowerCase())
      );

      if (matchedKeyword) {
        return qa.answer;
      }
    }

    return "Sorry loves, I don't know that one yet! 💜 Try asking about trends, products, or styling tips!";
  }

  // Your chatbot UI code here
  // Use findAnswer(userMessage) to get Devi's response
}
```

---

## 🧪 Testing

### Test the Q&A Generation:

1. Import updated workflow: `workflows/FASHION-INSIGHTS-WITH-QA-GENERATION.json`
2. Run manually with "🧪 Manual Test Trigger"
3. Check execution:
   - ✅ "🤖 Generate Q&A Prompt" should create prompt
   - ✅ "🤖 OpenAI - Generate Q&A" should return 25 Q&A pairs
   - ✅ "📝 Parse Q&A Response" should add metadata
   - ✅ "💾 Save Q&A to GitHub" should create `devi-content/week-1/chatbot-qa.json`
   - ✅ "🔄 Format Q&A for Lovable" should create payload
   - ⚠️ "💜 Push Q&A to Lovable App" will fail until you configure Lovable API

---

## 📊 Q&A Data Structure

Each week's Q&A contains:

```json
{
  "week_number": 1,
  "generated_at": "2025-11-29T10:00:00Z",
  "qa_count": 25,
  "version": "v1",
  "chatbot": "Devi",
  "qa_pairs": [
    {
      "keywords": ["trending", "trends", "hot", "popular", "whats new"],
      "question": "What's trending this week?",
      "answer": "Hey loves! This week everyone's wearing oversized blazers and metallic boots. I've seen these on EVERY top influencer 💜",
      "category": "trends"
    },
    {
      "keywords": ["buy", "shop", "product", "where", "link"],
      "question": "Where can I buy these products?",
      "answer": "All the links are in this week's newsletter, loves! You can find oversized blazers from Zara ($89) and metallic boots from Mango ($129) 💜",
      "category": "products"
    }
    // ... 23 more pairs
  ]
}
```

---

## 🎯 Next Steps

1. **Determine which option works for your Lovable setup:**
   - Option A: Lovable has public API → configure API endpoint + token
   - Option B: Lovable deploys from GitHub → add GitHub commit node
   - Option C: Lovable accepts webhooks → set up webhook endpoint
   - Option D: No API → use fetch() in Lovable to pull from GitHub

2. **Update the workflow node:**
   - Replace `YOUR_LOVABLE_API_TOKEN`
   - Replace `YOUR_LOVABLE_PROJECT_ID`
   - Or switch to Option B/C/D if needed

3. **Test the integration:**
   - Run workflow manually
   - Check if Lovable chatbot updates
   - Verify Q&A responses work

4. **Verify weekly automation:**
   - Every Monday 9 AM, new Q&A generated
   - Lovable automatically updated
   - No manual intervention needed!

---

## 💰 Cost Summary

- **OpenAI Q&A generation**: ~$0.04/week = ~$2/year
- **Lovable updates**: FREE (using their API or GitHub)
- **User interactions**: FREE (no OpenAI calls during chat)
- **Total**: **$2/year** for unlimited users! 🎉

---

## 🆘 Troubleshooting

### "💜 Push Q&A to Lovable App" fails with 404

- ✅ Check Lovable API endpoint URL
- ✅ Verify project ID is correct
- ✅ Ensure API token is valid

### Chatbot still shows old Q&A

- ✅ Check if Lovable caches data (clear cache)
- ✅ Verify Q&A was pushed successfully (check n8n execution log)
- ✅ Redeploy Lovable app if needed

### Q&A not matching user questions

- ✅ Check keyword list in Q&A pairs
- ✅ Add more keywords for common variations
- ✅ Test with different phrasings

---

## 📚 Files

- **Workflow**: `workflows/FASHION-INSIGHTS-WITH-QA-GENERATION.json`
- **Q&A Backup**: `devi-content/week-X/chatbot-qa.json` (GitHub)
- **This Guide**: `LOVABLE-QA-INTEGRATION.md`

---

**Your Devi chatbot now updates automatically every Monday! 💜🤖**
