# n8n Ultimate Cheat Sheet - LinkedIn Design Prompt

## Instructions for Gemini 3

Create a **visually stunning, professional LinkedIn carousel post** (or single infographic) showcasing the n8n automation platform. The design should be:
- **Modern & Clean** - Professional tech aesthetic
- **Easy to scan** - Clear hierarchy and sections
- **Shareable** - Compelling enough to generate engagement
- **Brand-aligned** - Use n8n's color scheme (pinks/purples) or tech blues
- **Data-rich** - Show impressive statistics prominently

---

## Post Format Options

**Option 1: Single Infographic** (1200x1500px - LinkedIn optimal)
- All information on one scrollable image
- Perfect for maximum impact

**Option 2: Carousel (10 slides)** (1080x1080px each)
- Slide 1: Title + Key Stats
- Slides 2-9: Categories detailed below
- Slide 10: Call to action

**Recommended: Option 2 (Carousel)** - Higher engagement on LinkedIn

---

## Slide 1: Title & Hero Stats

### Main Title
```
🚀 n8n ULTIMATE CHEAT SHEET
The Complete Automation Platform Guide
```

### Hero Statistics (Large, Eye-catching)
```
📊 KEY STATS:

5,065+ Total Nodes Available
  └─ 400+ Official Built-in Nodes
  └─ 4,665+ Community Nodes

🔥 Ecosystem Growth:
  +3,590 nodes in 9 months (334% growth!)
  17.1 new nodes added DAILY

💎 Most Popular Community Node:
  Evolution API (WhatsApp)
  7.7 MILLION downloads
```

### Tagline
```
"Open-source workflow automation that connects everything"
Fair-code licensed | Self-hosted | Cloud options
```

---

## Slide 2: Core n8n Concepts

### Title: "📚 Core Concepts"

```
🔷 WORKFLOWS
Visual flowcharts that automate tasks
├─ Nodes = Actions
├─ Connections = Data flow
└─ Triggers = Start automation

🔷 NODES (5,065+ available)
├─ Trigger Nodes → Start workflows
├─ Regular Nodes → Process data
├─ AI Nodes → LangChain integration
└─ Core Nodes → Built-in utilities

🔷 EXECUTIONS
Individual workflow runs
├─ Store logs & data
├─ Debug & monitor
└─ View history

🔷 CREDENTIALS
Secure API key storage
├─ Reusable across workflows
├─ External secrets support
└─ Encrypted storage
```

**Visual Suggestion**: Use icons for each concept, flowing diagram style

---

## Slide 3: Top 10 Community Nodes

### Title: "🏆 Most Downloaded Community Nodes"

```
Rank | Node                    | Category      | Downloads
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 #1  | Evolution API           | WhatsApp      | 7.7M 🔥
 #2  | MCP (Model Context)     | AI Protocol   | 950K
 #3  | ElevenLabs              | Voice AI      | 827K
 #4  | Quepasa                 | WhatsApp      | 428K
 #5  | Kommo CRM              | CRM           | 413K
 #6  | PDFKit                  | PDF Gen       | 403K
 #7  | Chatwoot                | Support       | 394K
 #8  | Notificame Hub          | Multi-channel | 335K
 #9  | Tavily Core             | AI Search     | 241K
#10  | SerpAPI                 | Google Search | 208K
```

**Visual Suggestion**: Bar chart or medal podium style for top 3

---

## Slide 4: Node Categories Breakdown

### Title: "📂 Node Categories (5,065 Nodes)"

```
🗨️ COMMUNICATION & MESSAGING
   WhatsApp • Slack • Discord • Email • SMS
   Popular: Evolution API (7.7M downloads)

🤖 AI, LLM & VOICE
   OpenAI • Claude • ElevenLabs • DeepSeek
   Popular: MCP Protocol (950K downloads)

🌐 WEB SCRAPING & AUTOMATION
   Playwright • Puppeteer • SerpAPI • Firecrawl
   Popular: SerpAPI (208K downloads)

🔌 API & CLOUD INTEGRATIONS (Largest!)
   AWS • Google • Azure • 4,000+ services
   Popular: Kommo CRM (413K downloads)

📄 DOCUMENT GENERATION
   PDF • QR Codes • Digital Signatures
   Popular: PDFKit (403K downloads)

📊 DATA PROCESSING
   Validation • Transformation • OCR • Parsing
   Popular: Cronlytic (198K downloads)

💼 BUSINESS & CRM
   Salesforce • HubSpot • Notion • Airtable
   Popular: Power BI (132K downloads)

🔧 UTILITIES & TESTING
   Debug • Monitoring • Testing • Helpers
   Popular: Debug Helper (5K downloads)
```

**Visual Suggestion**: Icon grid or category cards with stats

---

## Slide 5: Quick Start Commands

### Title: "⚡ Quick Start Guide"

```
🐳 DOCKER (Recommended)
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

📦 NPM
npm install n8n -g
n8n start

☁️ CLOUD
https://n8n.io → Sign up → Start building

🔌 INSTALL COMMUNITY NODE
Settings → Community Nodes → Install
Example: n8n-nodes-evolution-api
```

```
🌐 ACCESS n8n
http://localhost:5678

🔑 DEFAULT SETUP
Username: admin@example.com
Password: (set on first run)
```

**Visual Suggestion**: Terminal/code block style with copy icons

---

## Slide 6: Essential Environment Variables

### Title: "⚙️ Essential Configuration"

```
🚀 DEPLOYMENT
N8N_HOST=localhost
N8N_PORT=5678
N8N_PROTOCOL=https
WEBHOOK_URL=https://your-domain.com/

🗄️ DATABASE (Production)
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=localhost
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=secure_password

⚡ SCALING (Queue Mode)
EXECUTIONS_MODE=queue
QUEUE_BULL_REDIS_HOST=redis
QUEUE_BULL_REDIS_PORT=6379

🔒 SECURITY
N8N_ENCRYPTION_KEY=your_encryption_key
N8N_USER_MANAGEMENT_JWT_SECRET=jwt_secret

⏱️ EXECUTIONS
EXECUTIONS_TIMEOUT=300
EXECUTIONS_DATA_SAVE_ON_ERROR=all
EXECUTIONS_DATA_PRUNE=true

🌍 TIMEZONE
GENERIC_TIMEZONE=America/New_York
```

**Visual Suggestion**: Code-style boxes with categories color-coded

---

## Slide 7: Popular Workflow Patterns

### Title: "🔥 Top 5 Workflow Patterns"

```
1️⃣ REST API ENDPOINT
   Webhook → Validate → Process → Database → Response
   Use Case: Custom APIs, integrations

2️⃣ AI AGENT CHAT
   Chat Trigger → AI Agent → OpenAI → Memory → Response
   Use Case: Customer support, chatbots

3️⃣ WEB SCRAPING + AI
   Schedule → HTTP Request → Extract → AI Summarize → Notify
   Use Case: Content monitoring, research

4️⃣ DATA SYNC AUTOMATION
   Trigger → Fetch (API 1) → Transform → Send (API 2)
   Use Case: CRM sync, data integration

5️⃣ SCHEDULED REPORTS
   Schedule → Query Data → Generate Charts → Email
   Use Case: Business intelligence, analytics
```

**Visual Suggestion**: Flow diagrams for each pattern

---

## Slide 8: Expression Cheat Sheet

### Title: "💻 Essential Expressions"

```
📊 ACCESS DATA
{{ $json.fieldName }}              Current item
{{ $json.body.city }}               Nested data
{{ $('NodeName').item.json.id }}    From other node
{{ $input.all() }}                  All input items

📅 DATE & TIME (Luxon)
{{ $now }}                          Current timestamp
{{ $today }}                        Today at midnight
{{ $today.minus({days: 7}) }}       7 days ago
{{ $now.toFormat('yyyy-MM-dd') }}   Format date

🔍 JMESPATH (Query JSON)
{{ $jmespath($json.users, "[*].email") }}
Get all user emails

✅ CONDITIONALS
{{ $json.status === "active" ? "Yes" : "No" }}
{{ $json.price || 0 }}              Default value
{{ $json.email ?? "no-email" }}     Null coalescing

🔢 PAGINATION
{{ $pageCount + 1 }}                Next page number
{{ $response.body['next-url'] }}    Next URL
```

**Visual Suggestion**: Code snippets in colored boxes

---

## Slide 9: Top Integrations by Category

### Title: "🌟 Popular Integrations"

```
💬 COMMUNICATION
✓ WhatsApp (Evolution API) - 7.7M downloads
✓ Slack - Built-in
✓ Discord - Built-in
✓ Telegram - Built-in
✓ Chatwoot - 394K downloads

🤖 AI & LLM
✓ OpenAI (GPT-4, GPT-3.5) - Built-in
✓ Anthropic (Claude) - Built-in
✓ ElevenLabs (Voice AI) - 827K downloads
✓ DeepSeek - 56K downloads
✓ MCP Protocol - 950K downloads

💼 CRM & BUSINESS
✓ Salesforce - Built-in
✓ HubSpot - Built-in
✓ Notion - Built-in
✓ Airtable - Built-in
✓ Power BI - 132K downloads

🗄️ DATABASES
✓ PostgreSQL - Built-in
✓ MySQL - Built-in
✓ MongoDB - Built-in
✓ Redis - Built-in
✓ Qdrant (Vector DB) - 32K downloads

☁️ CLOUD SERVICES
✓ AWS (S3, Lambda, etc.) - Built-in
✓ Google (Sheets, Drive, etc.) - Built-in
✓ Azure - Built-in
✓ MinIO - 50K downloads

🌐 WEB SCRAPING
✓ HTTP Request - Built-in
✓ SerpAPI - 208K downloads
✓ Playwright - 52K downloads
✓ Firecrawl - 197K downloads
```

**Visual Suggestion**: Logo grid or category cards

---

## Slide 10: Call to Action & Resources

### Title: "🚀 Start Building with n8n"

```
🌐 GET STARTED
├─ Official Site: https://n8n.io
├─ Documentation: https://docs.n8n.io
├─ Cloud (Free): https://app.n8n.cloud
└─ GitHub: https://github.com/n8n-io/n8n

📚 COMMUNITY
├─ Forum: https://community.n8n.io
├─ Discord: Active community support
├─ YouTube: Tutorials & examples
└─ Templates: 1,000+ workflow templates

💎 WHY n8n?
✓ Fair-code licensed (source available)
✓ Self-hosted (full control)
✓ 5,065+ integrations (400 built-in + 4,665 community)
✓ Visual workflow builder (no code required)
✓ Powerful expressions (JavaScript support)
✓ Active community (17 new nodes/day)
✓ Enterprise-ready (scaling, security)

📊 IMPRESSIVE STATS
• 400+ official nodes
• 4,665+ community nodes
• 7.7M downloads (top community node)
• 17.1 new nodes per day
• 334% ecosystem growth in 9 months
```

```
💡 START TODAY:
docker run -p 5678:5678 n8nio/n8n

Then open: http://localhost:5678
```

**Visual Suggestion**: Big CTA button, resource links, QR code

---

## Design Style Guide

### Color Palette
```
Primary:   #FF6D5A (n8n coral/pink)
Secondary: #7B5FFF (n8n purple)
Accent:    #00D1FF (cyan for highlights)
Dark:      #1A1A1A (backgrounds)
Light:     #F5F5F5(light backgrounds)
Text:      #333333 (primary text)
Success:   #00CC88 (for positive stats)
```

### Typography
```
Headings:  Bold, Sans-serif (Inter, Poppins, or Montserrat)
Body:      Regular, Sans-serif (Inter or Open Sans)
Code:      Monospace (Fira Code, JetBrains Mono)
Stats:     Extra Bold, Large size
```

### Visual Elements
```
✓ Use icons for each category (Font Awesome, Heroicons)
✓ Include flow diagrams for workflows
✓ Use gradients for backgrounds (subtle)
✓ Add shadows for depth
✓ Include data visualizations (charts, graphs)
✓ Use code blocks for technical content
✓ Add n8n logo prominently
✓ Include QR codes for links
```

### Layout Principles
```
✓ White space is your friend
✓ Clear hierarchy (title → stats → details)
✓ Left-to-right, top-to-bottom flow
✓ Consistent spacing (use 8px grid)
✓ Group related information
✓ Use dividers between sections
✓ Highlight key numbers (large, bold, colored)
✓ Keep text minimal (scannable)
```

---

## Additional Elements to Include

### Badges/Stickers
```
🔥 "HOT" - For trending nodes
⭐ "MOST POPULAR" - For top downloads
🆕 "NEW" - For recent additions
✅ "BUILT-IN" - For official nodes
💎 "PREMIUM" - For paid services
🚀 "GROWING FAST" - For trending categories
```

### Data Visualizations
```
📊 Bar chart: Top 10 nodes by downloads
📈 Line graph: Ecosystem growth over time
🥧 Pie chart: Node category distribution
📉 Trend indicators: Growth rates
```

### Icons to Use
```
🚀 Launch/Start
⚡ Fast/Performance
🔧 Tools/Utilities
💬 Communication
🤖 AI/Automation
📊 Data/Analytics
🌐 Web/Internet
📄 Documents
🔒 Security
⚙️ Settings
💎 Premium/Quality
🔥 Popular/Trending
```

---

## LinkedIn Post Caption (Companion Text)

```
🚀 The ULTIMATE n8n Cheat Sheet is here!

n8n is THE open-source automation platform that's taking over:
• 5,065+ total integrations (400 built-in + 4,665 community)
• 7.7M downloads for the top community node (Evolution API)
• 17 NEW nodes added EVERY DAY
• 334% ecosystem growth in just 9 months

Whether you're building:
✓ WhatsApp automation
✓ AI-powered workflows
✓ Web scraping pipelines
✓ Data sync processes
✓ Custom APIs
✓ Business process automation

n8n has you covered with a visual, no-code interface + powerful JavaScript support when you need it.

💡 BEST PART: It's fair-code licensed and self-hosted, so YOU control your data.

👉 Swipe through to see:
• Top community nodes
• Quick start commands
• Essential configurations
• Popular workflow patterns
• Expression cheat sheet
• And more!

📌 Save this for your next automation project!

🔗 Get started: https://n8n.io

#n8n #automation #nocode #workflow #opensource #developer #devtools #productivity #integration #api #tech #coding #automation #ai #llm

---

What's your favorite n8n use case? Drop it in the comments! 👇
```

---

## Export Specifications

### LinkedIn Carousel
```
Dimensions: 1080x1080px (square)
Format: PNG or JPG
File size: < 10MB total for all slides
Slides: 10 maximum
DPI: 72-96 (web optimized)
Color space: RGB
```

### Single Infographic
```
Dimensions: 1200x1500px (portrait)
Format: PNG (for quality) or JPG
File size: < 20MB
DPI: 96 (retina-ready)
Color space: RGB
```

---

## Pro Tips for Maximum Engagement

1. **Make it shareable** - Include impressive stats prominently
2. **Keep text minimal** - Use visuals and icons
3. **Use contrasting colors** - Ensure readability
4. **Add your branding** - If creating for a company
5. **Include CTAs** - Direct people where to go next
6. **Test on mobile** - Most LinkedIn users on mobile
7. **Use emojis sparingly** - Professional but friendly
8. **Fact-check everything** - All stats are current as of Nov 2025

---

## Final Checklist

Before finalizing design:
- [ ] All statistics are accurate (from brain-n8n-3.md)
- [ ] Text is readable at thumbnail size
- [ ] Color contrast meets accessibility standards (WCAG AA)
- [ ] n8n branding is visible
- [ ] Links/QR codes are functional
- [ ] Spelling and grammar checked
- [ ] File sizes optimized for LinkedIn
- [ ] Mobile preview looks good
- [ ] Call to action is clear
- [ ] Attribution included (if required)

---

## Source Files

All data in this cheat sheet comes from:
- `n8n-brain.md` - Source code knowledge
- `brain-n8n-2.md` - Official documentation (42,161 lines)
- `brain-n8n-3.md` - Community ecosystem analysis (4,665 nodes)

Data accurate as of: **November 2025**

---

**Ready to design? Let's make this the most shared n8n resource on LinkedIn! 🚀**
