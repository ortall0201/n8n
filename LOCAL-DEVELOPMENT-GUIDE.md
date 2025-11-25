# n8n Local Development Guide

> Complete guide to developing and testing n8n workflows on your local PC
> Cost: $0 | Perfect for: 90%+ of workflow development
> Generated: 2025-11-24

## Table of Contents

- [Why Develop Locally?](#why-develop-locally)
- [Quick Start](#quick-start)
- [Setup Options](#setup-options)
- [Testing Strategies](#testing-strategies)
- [Mock Data Patterns](#mock-data-patterns)
- [Workflow Examples](#workflow-examples)
- [Webhook Testing](#webhook-testing)
- [Common Workflows by Type](#common-workflows-by-type)
- [Troubleshooting](#troubleshooting)
- [Deployment Path](#deployment-path)

---

## Why Develop Locally?

### ✅ Advantages

```
💰 COST: $0/month (vs $20-200/mo for n8n Cloud)
⚡ SPEED: Instant iteration, no deploy delays
🔒 PRIVACY: Data never leaves your machine
🧪 TESTING: Unlimited executions, no quota
🎓 LEARNING: Risk-free experimentation
🔧 DEBUGGING: Full access to logs and data
```

### 📊 What Works Locally

**90%+ of workflows can be fully developed and tested locally:**

| Feature | Works Locally | Notes |
|---------|--------------|-------|
| Manual triggers | ✅ Yes | Click and test instantly |
| Scheduled triggers | ✅ Yes | Test manually, validate logic |
| API calls (outbound) | ✅ Yes | Your PC calls external APIs |
| Database operations | ✅ Yes | Local or cloud databases |
| AI/LLM nodes | ✅ Yes | OpenAI, Anthropic, etc. |
| Data transformations | ✅ Yes | Code, Set, Switch nodes |
| Email sending | ✅ Yes | SMTP, Gmail, SendGrid |
| Notifications | ✅ Yes | Slack, Discord, etc. |
| File operations | ✅ Yes | Read, write, process files |
| HTTP Request | ✅ Yes | Call any API |
| **Inbound webhooks** | ⚠️ Limited | Need ngrok or public URL |

**Only 10% needs production server**: Webhooks from external services (Stripe, GitHub, etc.)

---

## Quick Start

### Option 1: Docker (Recommended)

**Windows, Mac, Linux - All supported**

#### Install Docker

**Windows/Mac**:
- Download Docker Desktop: https://www.docker.com/products/docker-desktop

**Linux**:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

#### Run n8n

**Simple Start (SQLite)**:
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

**Access**: http://localhost:5678

**Pros**:
- ✅ Clean, isolated environment
- ✅ Easy to restart
- ✅ Matches production setup
- ✅ No system pollution

**Cons**:
- ⚠️ Requires Docker installed
- ⚠️ 2-3GB disk space

### Option 2: npm (Direct Install)

**Requirements**: Node.js 18+ installed

```bash
# Install n8n globally
npm install n8n -g

# Run n8n
n8n start
```

**Access**: http://localhost:5678

**Pros**:
- ✅ Faster startup
- ✅ Direct access to files

**Cons**:
- ⚠️ May conflict with other Node.js apps
- ⚠️ Harder to clean up

---

## Setup Options

### Basic Setup (Development)

**Docker Compose** - Recommended for serious development

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=false  # Disable for local dev
      - N8N_LOG_LEVEL=debug          # See all logs
      - GENERIC_TIMEZONE=America/New_York
      - N8N_EDITOR_BASE_URL=http://localhost:5678
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```

Run:
```bash
docker-compose up -d
```

Stop:
```bash
docker-compose down
```

View logs:
```bash
docker-compose logs -f n8n
```

### Advanced Setup (PostgreSQL)

**For testing production-like setup**

`docker-compose-advanced.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    restart: unless-stopped
    environment:
      POSTGRES_USER: n8n
      POSTGRES_PASSWORD: n8n_password
      POSTGRES_DB: n8n
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"  # Expose for debugging

  n8n:
    image: n8nio/n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=n8n_password
      - N8N_LOG_LEVEL=debug
      - GENERIC_TIMEZONE=America/New_York
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      - postgres

volumes:
  n8n_data:
  postgres_data:
```

Run:
```bash
docker-compose -f docker-compose-advanced.yml up -d
```

---

## Testing Strategies

### The Mock-First Approach

**Pattern**: Build entire workflow with mock data, then switch to real triggers.

```
┌─────────────────────────────────────────┐
│ DEVELOPMENT WORKFLOW                    │
└─────────────────────────────────────────┘

Phase 1: Build with Manual Trigger
    ↓
Manual Trigger
    ↓
Code Node (Generate mock data)
    ↓
[Your workflow logic]
    ↓
Test & iterate rapidly
    ↓
✅ Perfect the logic

Phase 2: Switch to Real Trigger
    ↓
Replace Manual with Webhook/Schedule
    ↓
✅ Deploy to production
```

### Example: API Integration Workflow

#### Step 1: Start with Manual Trigger

```javascript
// Workflow structure:
Manual Trigger
    ↓
HTTP Request (Fetch from API)
    ↓
Code (Transform)
    ↓
Google Sheets (Store)
    ↓
Slack (Notify)
```

**Test locally**:
1. Click "Test workflow"
2. See data flow through each node
3. Check transformations
4. Verify Sheets update
5. Confirm Slack notification

**All works locally!** ✅

#### Step 2: Add Error Handling

```javascript
Manual Trigger
    ↓
HTTP Request (Fetch from API)
    ↓
IF (Check status code)
    ├─ Success → Transform → Store → Notify
    └─ Error → Log Error → Alert Team
```

**Test locally**:
1. Mock API failures
2. Verify error handling
3. Check error notifications

#### Step 3: Deploy

When perfect:
1. Save workflow
2. Export JSON
3. Import to production VPS
4. Change to Schedule trigger
5. Activate

---

## Mock Data Patterns

### Pattern 1: Mock External Webhooks

**Scenario**: Testing Stripe payment webhook

Instead of real Stripe webhook, use:

```javascript
// Node: Generate Mock Stripe Payment

const mockStripePayment = {
  id: "ch_test_12345",
  object: "charge",
  amount: 2999,
  currency: "usd",
  customer: "cus_test_12345",
  description: "Test Payment",
  metadata: {
    order_id: "order_123",
    customer_email: "test@example.com"
  },
  status: "succeeded",
  created: Math.floor(Date.now() / 1000)
};

return [{ json: mockStripePayment }];
```

**Full workflow**:

```
Manual Trigger
    ↓
Code (Generate mock Stripe data)
    ↓
[Process exactly as real webhook would]
    ↓
Code (Extract payment info)
    ↓
Email (Send receipt)
    ↓
Database (Update order)
```

**Benefits**:
- ✅ Test unlimited times
- ✅ Test edge cases (failed payments, refunds)
- ✅ No real charges
- ✅ No Stripe test mode needed

### Pattern 2: Mock API Responses

**Scenario**: Testing weather API integration

```javascript
// Node: Mock OpenWeather API Response

const mockWeatherData = {
  coord: { lon: -122.08, lat: 37.39 },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d"
    }
  ],
  main: {
    temp: 282.55,
    feels_like: 281.86,
    temp_min: 280.37,
    temp_max: 284.26,
    pressure: 1023,
    humidity: 100
  },
  name: "Mountain View"
};

return [{ json: mockWeatherData }];
```

Use this instead of HTTP Request during development!

### Pattern 3: Mock Database Records

**Scenario**: Testing order processing workflow

```javascript
// Node: Mock Database Order

const mockOrders = [
  {
    order_id: "ORD-001",
    customer_name: "John Doe",
    email: "john@example.com",
    items: [
      { product: "Widget A", quantity: 2, price: 29.99 },
      { product: "Widget B", quantity: 1, price: 49.99 }
    ],
    total: 109.97,
    status: "pending",
    created_at: new Date().toISOString()
  },
  {
    order_id: "ORD-002",
    customer_name: "Jane Smith",
    email: "jane@example.com",
    items: [
      { product: "Gadget X", quantity: 1, price: 199.99 }
    ],
    total: 199.99,
    status: "pending",
    created_at: new Date().toISOString()
  }
];

return mockOrders.map(order => ({ json: order }));
```

### Pattern 4: Mock Time-Based Data

**Scenario**: Testing scheduled reports

```javascript
// Node: Generate Mock Time Series Data

const generateMockData = (days) => {
  const data = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 10000) + 5000,
      orders: Math.floor(Math.random() * 100) + 20,
      customers: Math.floor(Math.random() * 50) + 10
    });
  }

  return data;
};

const mockReportData = generateMockData(30);
return mockReportData.map(item => ({ json: item }));
```

---

## Workflow Examples

### Example 1: API Data Sync (100% Local Testable)

**Goal**: Fetch users from API, sync to Google Sheets

```
Manual Trigger
    ↓
HTTP Request
    URL: https://jsonplaceholder.typicode.com/users
    Method: GET
    ↓
Code (Transform data)
    // Extract only needed fields
    const users = $input.all();
    const formatted = users.map(user => ({
      json: {
        id: user.json.id,
        name: user.json.name,
        email: user.json.email,
        company: user.json.company.name
      }
    }));
    return formatted;
    ↓
Google Sheets
    Operation: Append
    Sheet: Users
    Range: A:D
    ↓
Slack
    Message: "✅ Synced {{$json.length}} users to spreadsheet"
```

**Local Testing**:
1. Click "Test workflow"
2. See API call succeed
3. Verify data transformation
4. Check Google Sheets update
5. Confirm Slack notification

**All works on local PC!** No production server needed.

### Example 2: AI Content Generator (100% Local Testable)

**Goal**: Generate blog post ideas with OpenAI

```
Manual Trigger
    ↓
Edit Fields (Set)
    topic: "artificial intelligence"
    count: 5
    tone: "professional"
    ↓
OpenAI
    Operation: Chat
    Model: gpt-4o-mini
    Prompt: Generate {{$json.count}} blog post ideas about {{$json.topic}} in a {{$json.tone}} tone
    ↓
Code (Parse and structure)
    const response = $input.first().json.message.content;
    const ideas = response.split('\n').filter(line => line.trim());

    return ideas.map((idea, index) => ({
      json: {
        id: index + 1,
        idea: idea,
        topic: $('Edit Fields').item.json.topic,
        generated_at: new Date().toISOString()
      }
    }));
    ↓
Notion (or Google Sheets)
    Create page for each idea
```

**Local Testing**:
1. Set up OpenAI credentials (one-time)
2. Click "Test workflow"
3. See AI generate ideas
4. Verify parsing
5. Check Notion/Sheets update

**Works 100% locally with real OpenAI API!**

### Example 3: Data Processing Pipeline (100% Local Testable)

**Goal**: Process CSV file, clean data, generate report

```
Manual Trigger
    ↓
Read Binary File
    File Path: /home/node/.n8n/data/sales.csv
    ↓
Convert to JSON
    (Built-in CSV parser)
    ↓
Code (Clean and validate)
    const sales = $input.all();
    const cleaned = sales
      .filter(sale => sale.json.amount > 0)  // Remove invalid
      .map(sale => ({
        json: {
          date: sale.json.date,
          amount: parseFloat(sale.json.amount),
          product: sale.json.product.trim(),
          category: sale.json.category.toLowerCase()
        }
      }));
    return cleaned;
    ↓
Code (Calculate metrics)
    const items = $input.all();
    const total = items.reduce((sum, item) => sum + item.json.amount, 0);
    const count = items.length;
    const average = total / count;

    const byCategory = items.reduce((acc, item) => {
      const cat = item.json.category;
      acc[cat] = (acc[cat] || 0) + item.json.amount;
      return acc;
    }, {});

    return [{
      json: {
        total_sales: total,
        order_count: count,
        average_order: average,
        by_category: byCategory,
        generated_at: new Date().toISOString()
      }
    }];
    ↓
QuickChart (Generate chart)
    ↓
Email (Send report)
```

**Local Testing**:
1. Place CSV file in n8n directory
2. Click "Test workflow"
3. Verify data cleaning
4. Check calculations
5. See chart generation
6. Receive email with report

**Completely testable locally!**

### Example 4: Multi-API Integration (100% Local Testable)

**Goal**: Fetch GitHub issues, categorize with AI, create Notion tasks

```
Manual Trigger
    ↓
HTTP Request (GitHub API)
    URL: https://api.github.com/repos/owner/repo/issues
    Authentication: Bearer Token
    ↓
Code (Filter and prepare)
    const issues = $input.all();
    const openIssues = issues.filter(issue =>
      issue.json.state === 'open' && !issue.json.pull_request
    );
    return openIssues.map(issue => ({
      json: {
        title: issue.json.title,
        body: issue.json.body,
        url: issue.json.html_url,
        created: issue.json.created_at
      }
    }));
    ↓
OpenAI (Categorize)
    For each issue:
    Prompt: "Categorize this GitHub issue into one of: bug, feature, documentation, question. Issue: {{$json.title}} - {{$json.body}}"
    ↓
Code (Structure for Notion)
    const items = $input.all();
    return items.map(item => ({
      json: {
        title: item.json.title,
        category: item.json.message.content.trim().toLowerCase(),
        url: item.json.url,
        status: "To Do"
      }
    }));
    ↓
Notion (Create database items)
    Database: GitHub Issues
    Properties:
      - Title: {{$json.title}}
      - Category: {{$json.category}}
      - URL: {{$json.url}}
      - Status: {{$json.status}}
```

**Local Testing**:
1. Set up GitHub + OpenAI + Notion credentials
2. Click "Test workflow"
3. See GitHub API fetch
4. Watch AI categorization
5. Verify Notion creation

**All APIs work from local PC!**

---

## Webhook Testing

### When You Need It

Only when testing **inbound webhooks** from external services:
- Payment notifications (Stripe, PayPal)
- Repository events (GitHub, GitLab)
- Form submissions
- Chat messages (Slack bot events)

### Option 1: ngrok (Free, Easy)

**Install ngrok**:
```bash
# Download from: https://ngrok.com/download
# Or use package managers:

# Mac
brew install ngrok

# Windows (Chocolatey)
choco install ngrok

# Linux
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | \
  sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && \
  echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | \
  sudo tee /etc/apt/sources.list.d/ngrok.list && \
  sudo apt update && sudo apt install ngrok
```

**Use ngrok**:

```bash
# Terminal 1: Run n8n
docker run -p 5678:5678 n8nio/n8n

# Terminal 2: Expose to internet
ngrok http 5678
```

**Output**:
```
ngrok

Session Status                online
Account                       user@example.com (Plan: Free)
Version                       3.0.0
Region                        United States (us)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok.io -> http://localhost:5678

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

**Use URL**: `https://abc123.ngrok.io`

**In n8n webhook node**:
```
Webhook URL: https://abc123.ngrok.io/webhook/your-path
```

**Configure in external service**:
```
Stripe webhook: https://abc123.ngrok.io/webhook/stripe-payment
GitHub webhook: https://abc123.ngrok.io/webhook/github-push
```

**Pros**:
- ✅ Free tier available
- ✅ Instant public URL
- ✅ HTTPS included
- ✅ Request inspector (http://127.0.0.1:4040)

**Cons**:
- ⚠️ URL changes on restart (free tier)
- ⚠️ 60-minute timeout (free tier)
- ⚠️ Limited bandwidth

### Option 2: LocalTunnel (Free, No Signup)

**Install**:
```bash
npm install -g localtunnel
```

**Use**:
```bash
# Run n8n
docker run -p 5678:5678 n8nio/n8n

# Expose
lt --port 5678
```

**Output**:
```
your url is: https://smart-moose-12.loca.lt
```

**Pros**:
- ✅ Completely free
- ✅ No signup required
- ✅ Simple

**Cons**:
- ⚠️ Less reliable
- ⚠️ Slower
- ⚠️ URL changes

### Option 3: Cloudflare Tunnel (Free, Best for Long-term)

**Install**:
```bash
# Download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
```

**Setup**:
```bash
cloudflared tunnel --url http://localhost:5678
```

**Pros**:
- ✅ Free
- ✅ Fast (Cloudflare CDN)
- ✅ Reliable
- ✅ Custom domains possible

**Cons**:
- ⚠️ More setup required
- ⚠️ Need Cloudflare account

### Webhook Testing Workflow

```
1. Build workflow with Manual Trigger + Mock Data
    ↓
2. Perfect all logic locally
    ↓
3. When ready, switch to Webhook Trigger
    ↓
4. Start ngrok
    ↓
5. Configure webhook in external service
    ↓
6. Test 1-2 real webhooks
    ↓
7. Verify payload matches mock
    ↓
8. Deploy to production VPS
```

---

## Common Workflows by Type

### API Integration Workflows (100% Local)

**Pattern**:
```
Trigger (Manual/Schedule)
    ↓
HTTP Request (Call external API)
    ↓
Process data
    ↓
Store/Notify
```

**Examples that work locally**:
- ✅ Weather data fetching
- ✅ Stock price tracking
- ✅ Social media posting
- ✅ CRM data sync
- ✅ Analytics retrieval

### AI/LLM Workflows (100% Local)

**Pattern**:
```
Trigger
    ↓
Prepare prompt
    ↓
AI Node (OpenAI/Claude/etc.)
    ↓
Process response
    ↓
Store/Send
```

**Examples**:
- ✅ Content generation
- ✅ Text summarization
- ✅ Sentiment analysis
- ✅ Translation
- ✅ Classification

### Data Processing Workflows (100% Local)

**Pattern**:
```
Trigger
    ↓
Read data source
    ↓
Transform/Clean
    ↓
Calculate/Aggregate
    ↓
Output
```

**Examples**:
- ✅ CSV processing
- ✅ Report generation
- ✅ Data validation
- ✅ File conversions
- ✅ Batch operations

### Notification Workflows (100% Local)

**Pattern**:
```
Trigger
    ↓
Check conditions
    ↓
Format message
    ↓
Send notification
```

**Examples**:
- ✅ Slack alerts
- ✅ Email notifications
- ✅ Discord messages
- ✅ SMS via Twilio
- ✅ Push notifications

### Webhook Workflows (Need ngrok/VPS)

**Pattern**:
```
Webhook Trigger (from external service)
    ↓
Process payload
    ↓
Take action
```

**Examples**:
- ⚠️ Stripe payments
- ⚠️ GitHub events
- ⚠️ Form submissions
- ⚠️ Chat bot messages

**Testing**: Use mock data locally, then ngrok for final test

---

## Troubleshooting

### Docker Issues

**Problem**: "Cannot connect to Docker daemon"

**Solution**:
```bash
# Windows/Mac: Start Docker Desktop
# Linux: Start Docker service
sudo systemctl start docker
```

**Problem**: Port 5678 already in use

**Solution**:
```bash
# Use different port
docker run -p 5679:5678 n8nio/n8n

# Or kill process using 5678
# Windows
netstat -ano | findstr :5678
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5678 | xargs kill -9
```

### Access Issues

**Problem**: Can't access http://localhost:5678

**Solution**:
```bash
# Check if container is running
docker ps

# Check logs
docker logs n8n

# Try 127.0.0.1 instead
http://127.0.0.1:5678
```

### Workflow Execution Issues

**Problem**: "Can't get data for expression"

**Solution**:
- Execute workflow up to that node first
- Check node connections
- Verify previous node executed successfully

**Problem**: API credentials not working

**Solution**:
```bash
# Check credential setup
# Test with curl first:
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.example.com/test

# Verify in n8n:
# Settings → Credentials → Test connection
```

### Performance Issues

**Problem**: Slow execution

**Solution**:
```bash
# Allocate more memory to Docker
# Docker Desktop → Settings → Resources → Memory: 4GB+

# Or use docker-compose with resource limits:
services:
  n8n:
    deploy:
      resources:
        limits:
          memory: 2G
```

---

## Deployment Path

### From Local to Production

```
┌─────────────────────────────────────────────────────┐
│ STAGE 1: Local Development                         │
├─────────────────────────────────────────────────────┤
│ Environment: Your PC (Docker)                       │
│ Duration: 1-4 weeks                                 │
│ Cost: $0                                            │
│                                                     │
│ Activities:                                         │
│ ✅ Learn n8n interface                              │
│ ✅ Build workflows                                  │
│ ✅ Test with mock data                              │
│ ✅ Connect to APIs                                  │
│ ✅ Set up integrations                              │
│ ✅ Debug and iterate                                │
│ ✅ Perfect all logic                                │
└─────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│ STAGE 2: Webhook Testing (Optional)                │
├─────────────────────────────────────────────────────┤
│ Environment: Local + ngrok                          │
│ Duration: 1-3 days                                  │
│ Cost: $0                                            │
│                                                     │
│ Activities:                                         │
│ ✅ Start ngrok                                      │
│ ✅ Configure webhooks in external services          │
│ ✅ Test real webhook payloads                       │
│ ✅ Verify integration                               │
│ ✅ Document payload structure                       │
└─────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│ STAGE 3: Production Deployment                     │
├─────────────────────────────────────────────────────┤
│ Environment: Hostinger VPS                          │
│ Duration: Forever (24/7)                            │
│ Cost: $10-15/mo                                     │
│                                                     │
│ Setup:                                              │
│ 1. Order Hostinger VPS                              │
│ 2. Install Docker + Docker Compose                  │
│ 3. Set up PostgreSQL database                       │
│ 4. Configure domain and SSL                         │
│ 5. Deploy n8n stack                                 │
│                                                     │
│ Migration:                                          │
│ 1. Export workflows from local                      │
│ 2. Import to production                             │
│ 3. Update credentials                               │
│ 4. Activate workflows                               │
│ 5. Monitor executions                               │
└─────────────────────────────────────────────────────┘
```

### Export/Import Process

**Export from local**:
```
n8n UI → Workflows → Select All → Download
    ↓
Saves workflows-export.json
```

**Import to production**:
```
Production n8n → Workflows → Import from file
    ↓
Upload workflows-export.json
    ↓
Update any environment-specific settings
    ↓
Activate workflows
```

### Pre-Deployment Checklist

```
Local Development Complete:
□ All workflows tested
□ All integrations working
□ Credentials documented
□ Error handling verified
□ Mock data matches real data structure

Ready for Production:
□ VPS provisioned
□ Domain configured
□ SSL certificate obtained
□ PostgreSQL database set up
□ Backup strategy defined
□ Monitoring plan ready

Post-Deployment:
□ Workflows imported
□ Credentials configured
□ Test executions run
□ Webhooks configured
□ Monitoring active
□ Team notified
```

---

## Best Practices

### 1. Use Version Control for Workflows

```bash
# Export regularly
mkdir -p ~/n8n-workflows
cd ~/n8n-workflows
git init

# Export from n8n and save
# Commit changes
git add .
git commit -m "Update: Add customer notification workflow"
git push
```

### 2. Document Your Workflows

Add notes to workflow descriptions:
```
Workflow Name: Daily Sales Report
Description:
- Fetches sales data from PostgreSQL
- Calculates daily metrics
- Generates chart with QuickChart
- Emails report to team@example.com
- Runs: Daily at 9:00 AM EST
- Dependencies: PostgreSQL, SendGrid, QuickChart
```

### 3. Use Environment-Specific Variables

Create workflow variables:
```javascript
// Code node: Set environment
const ENV = 'local'; // Change to 'production' when deployed

const config = {
  local: {
    apiUrl: 'http://localhost:3000/api',
    webhookUrl: 'https://abc123.ngrok.io'
  },
  production: {
    apiUrl: 'https://api.example.com',
    webhookUrl: 'https://n8n.example.com'
  }
};

return [{ json: config[ENV] }];
```

### 4. Test Edge Cases

Mock different scenarios:
```javascript
// Test successful case
// Test with missing data
// Test with invalid data
// Test with empty response
// Test with API errors
// Test with timeout

const scenarios = [
  { type: 'success', data: {...} },
  { type: 'missing_field', data: {...} },
  { type: 'invalid_format', data: {...} },
  { type: 'empty', data: [] },
  { type: 'error', status: 500 }
];

// Test each scenario
```

### 5. Keep Workflows Modular

Break complex workflows into smaller, reusable pieces:
```
Main Workflow
    ↓
Execute Workflow: Data Fetcher
Execute Workflow: Data Processor
Execute Workflow: Notifier
```

---

## Summary

### Local Development Advantages

| Aspect | Local | Production |
|--------|-------|------------|
| **Cost** | $0 | $10-200/mo |
| **Setup Time** | 5 minutes | 1-2 hours |
| **Iteration Speed** | Instant | Deploy delay |
| **Learning Curve** | Risk-free | Higher stakes |
| **Debugging** | Full access | Limited |
| **Data Privacy** | Complete | Depends |

### What You Can Do Locally

✅ **90%+ of workflow development**:
- API integrations
- Data transformations
- AI/LLM processing
- Database operations
- Email/notifications
- Scheduled tasks (test manually)
- File operations
- Most integrations

❌ **Only 10% needs production**:
- Inbound webhooks from external services

### Quick Reference

**Start n8n**:
```bash
docker run -p 5678:5678 n8nio/n8n
```

**Access**: http://localhost:5678

**Test webhooks**:
```bash
ngrok http 5678
```

**Deploy when ready**:
1. Export workflows
2. Set up production VPS
3. Import workflows
4. Activate

---

**Next Steps**:
1. Start Docker
2. Run n8n locally
3. Import hello-world.json from `workflows/` folder
4. Start building!

**Resources**:
- `workflows/` - Example workflows
- `brain/brain-unified.md` - Complete n8n knowledge
- `WORKFLOW-ANALYSIS.md` - Field analysis

**Cost to start**: $0
**Time to start**: 5 minutes
**Workflows you can build locally**: 90%+

🚀 **Start developing locally today!**
