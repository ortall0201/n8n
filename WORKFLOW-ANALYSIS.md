# n8n Repository Workflow Analysis

> Comprehensive analysis of 317 workflows in the n8n repository
> Generated: 2025-11-24

## Executive Summary

The n8n repository contains **317 workflow files** (test workflows for built-in nodes), distributed across **12 distinct fields**. The workflows are heavily concentrated in **Cloud & Infrastructure** integrations (61.2%), followed by **Communication & Collaboration** (10.7%) and **Data Processing** (9.1%).

---

## Workflows by Field

### Distribution Overview

| Field | Count | Percentage | Bar Chart |
|-------|-------|------------|-----------|
| **Cloud & Infrastructure** | 194 | 61.2% | ████████████████████████████████████████████████████████████ |
| **Communication & Collaboration** | 34 | 10.7% | ███████████ |
| **Data Processing & Utilities** | 29 | 9.1% | █████████ |
| **Productivity & Project Management** | 15 | 4.7% | █████ |
| **Development & DevOps** | 11 | 3.5% | ████ |
| **Security & Identity** | 10 | 3.2% | ███ |
| **CRM & Sales** | 9 | 2.8% | ███ |
| **Marketing & Email** | 6 | 1.9% | ██ |
| **AI & Machine Learning** | 4 | 1.3% | █ |
| **Content & CMS** | 3 | 0.9% | █ |
| **Media & Entertainment** | 1 | 0.3% | |
| **Other** | 1 | 0.3% | |
| **TOTAL** | **317** | **100%** | |

---

## Detailed Field Analysis

### 1. Cloud & Infrastructure (194 workflows - 61.2%)

**Dominant Category** - More than half of all workflows focus on cloud services.

**Top Services**:
- **Microsoft** (89 workflows - 28.1%) - Azure, Office 365, Teams, SharePoint, Dynamics
- **Google** (69 workflows - 21.8%) - Google Cloud, Workspace, Sheets, Drive, Calendar
- **AWS** (36 workflows - 11.4%) - S3, Lambda, Cognito, IAM, ELB, DynamoDB

**Use Cases**:
- Cloud resource management
- File storage and sharing
- Serverless computing
- Identity and access management
- Load balancing and networking
- Database operations

**Insight**: The heavy focus on cloud infrastructure reflects n8n's enterprise-grade capabilities for automating cloud operations across major providers.

---

### 2. Communication & Collaboration (34 workflows - 10.7%)

**Second Largest Category** - Focus on team communication and messaging platforms.

**Services**:
- **Slack** (19 workflows - 6.0%) - Message sending, channel management, user operations
- **Discord** (14 workflows - 4.4%) - Server management, channel operations, webhooks
- **Telegram** (1 workflow - 0.3%) - Bot messaging

**Use Cases**:
- Team notifications and alerts
- Channel management
- Message automation
- Bot interactions
- Webhook integrations

**Insight**: Strong support for modern team collaboration tools, essential for DevOps and business automation workflows.

---

### 3. Data Processing & Utilities (29 workflows - 9.1%)

**Third Largest Category** - Internal workflow logic and data manipulation.

**Services**:
- **Switch** (7 workflows - 2.2%) - Conditional routing
- **Set** (3 workflows - 0.9%) - Data transformation
- **Files** (3 workflows - 0.9%) - File operations
- **ReadPdf** (2 workflows - 0.6%) - PDF processing
- **Code, Crypto, Jwt, Html, MySql, ExecutionData, DebugHelper** (1 each)

**Use Cases**:
- Conditional logic and branching
- Data transformation and manipulation
- File reading and writing
- PDF processing
- Cryptographic operations
- Database queries

**Insight**: These utility nodes are the building blocks for complex workflows, essential for data processing pipelines.

---

### 4. Productivity & Project Management (15 workflows - 4.7%)

**Tools for work management and organization.**

**Services**:
- **Notion** (14 workflows - 4.4%) - Database operations, page creation, content management
- **Linear** (1 workflow - 0.3%) - Issue tracking

**Use Cases**:
- Task management
- Documentation automation
- Project tracking
- Knowledge base updates
- Issue management

**Insight**: Notion's dominance shows its popularity as an all-in-one workspace tool.

---

### 5. Development & DevOps (11 workflows - 3.5%)

**Version control and CI/CD automation.**

**Services**:
- **Github** (11 workflows - 3.5%) - Repository management, issues, pull requests, actions

**Use Cases**:
- Git operations
- Issue tracking
- Pull request automation
- CI/CD pipeline integration
- Release management

**Insight**: GitHub integration is essential for developer workflows and automation.

---

### 6. Security & Identity (10 workflows - 3.2%)

**Security operations and threat management.**

**Services**:
- **TheHiveProject** (10 workflows - 3.2%) - Security incident response, case management

**Use Cases**:
- Incident response automation
- Threat intelligence
- Case management
- Alert handling
- Security orchestration (SOAR)

**Insight**: Strong focus on security automation for enterprise security teams.

---

### 7. CRM & Sales (9 workflows - 2.8%)

**Customer relationship management and sales automation.**

**Services**:
- **Salesforce** (5 workflows - 1.6%) - CRM operations, lead management
- **Hubspot** (4 workflows - 1.3%) - Marketing and sales automation

**Use Cases**:
- Lead management
- Contact synchronization
- Deal tracking
- Sales pipeline automation
- Marketing automation

**Insight**: Essential for sales and marketing teams automating customer interactions.

---

### 8. Marketing & Email (6 workflows - 1.9%)

**Email marketing and transactional email services.**

**Services**:
- **Mandrill** (3 workflows - 0.9%) - Transactional email (Mailchimp)
- **MailerLite** (2 workflows - 0.6%) - Email marketing
- **SendGrid** (1 workflow - 0.3%) - Email delivery

**Use Cases**:
- Email campaign automation
- Transactional emails
- Newsletter management
- Email analytics

**Insight**: Moderate focus on email automation, essential for marketing workflows.

---

### 9. AI & Machine Learning (4 workflows - 1.3%)

**Emerging category with AI integrations.**

**Services**:
- **JinaAI** (3 workflows - 0.9%) - Neural search, embeddings
- **Perplexity** (1 workflow - 0.3%) - AI search

**Use Cases**:
- Semantic search
- Embeddings generation
- AI-powered search
- Vector operations

**Insight**: Growing category - AI integrations are expanding rapidly (see brain-n8n-3.md: MCP #2 with 950K downloads, ElevenLabs #3 with 827K).

---

### 10. Content & CMS (3 workflows - 0.9%)

**Content management systems.**

**Services**:
- **Wordpress** (3 workflows - 0.9%) - Post management, site operations

**Use Cases**:
- Blog post automation
- Content publishing
- Site management

**Insight**: Limited but essential for content creators and publishers.

---

### 11. Media & Entertainment (1 workflow - 0.3%)

**Media streaming services.**

**Services**:
- **Spotify** (1 workflow - 0.3%) - Music streaming

**Use Cases**:
- Playlist management
- Music automation

**Insight**: Minimal representation, showing this is not a primary focus area.

---

## Key Insights

### 1. Enterprise-First Approach
- **61.2% Cloud & Infrastructure** shows n8n targets enterprise cloud automation
- Strong support for AWS, Google Cloud, and Azure operations
- Focus on scalable, production-ready integrations

### 2. Developer & DevOps Focused
- Communication tools (Slack, Discord) for team notifications
- GitHub integration for CI/CD
- Utilities for complex data processing
- Security automation with TheHive

### 3. Business Automation Enabled
- CRM integrations (Salesforce, HubSpot)
- Productivity tools (Notion)
- Marketing automation (email services)

### 4. AI Integration Growing
- Currently only 1.3% of workflows
- But community ecosystem shows rapid AI adoption:
  - MCP Protocol: #2 most downloaded (950K)
  - ElevenLabs: #3 most downloaded (827K)
  - DeepSeek, Perplexity gaining traction

### 5. Test-Driven Development
- All 317 workflows are **test workflows**
- Located in `packages/nodes-base/nodes/*/test/`
- Ensure node functionality and reliability
- Cover major operations for each integration

---

## Top 20 Services by Workflow Count

| Rank | Service | Workflows | % of Total | Field |
|------|---------|-----------|------------|-------|
| 1 | **Microsoft** | 89 | 28.1% | Cloud & Infrastructure |
| 2 | **Google** | 69 | 21.8% | Cloud & Infrastructure |
| 3 | **AWS** | 36 | 11.4% | Cloud & Infrastructure |
| 4 | **Slack** | 19 | 6.0% | Communication |
| 5 | **Discord** | 14 | 4.4% | Communication |
| 6 | **Notion** | 14 | 4.4% | Productivity |
| 7 | **GitHub** | 11 | 3.5% | Development |
| 8 | **TheHiveProject** | 10 | 3.2% | Security |
| 9 | **Switch** | 7 | 2.2% | Data Processing |
| 10 | **Salesforce** | 5 | 1.6% | CRM |
| 11 | **HubSpot** | 4 | 1.3% | CRM |
| 12 | **JinaAI** | 3 | 0.9% | AI & ML |
| 13 | **Mandrill** | 3 | 0.9% | Marketing |
| 14 | **Set** | 3 | 0.9% | Data Processing |
| 15 | **WordPress** | 3 | 0.9% | Content & CMS |
| 16 | **Files** | 3 | 0.9% | Data Processing |
| 17 | **MailerLite** | 2 | 0.6% | Marketing |
| 18 | **ReadPDF** | 2 | 0.6% | Data Processing |
| 19 | **Code** | 1 | 0.3% | Data Processing |
| 20 | **Spotify** | 1 | 0.3% | Media |

---

## Comparison with Community Ecosystem

**Built-in Node Test Workflows** (this analysis):
- 317 test workflows
- Focus: Enterprise cloud services (61.2%)
- Top 3: Microsoft, Google, AWS

**Community Node Ecosystem** (from brain-n8n-3.md):
- 4,665 community nodes
- Focus: WhatsApp automation, AI/LLM, web scraping
- Top 3: Evolution API (7.7M), MCP (950K), ElevenLabs (827K)

**Key Difference**:
- **Built-in nodes** = Enterprise & cloud-first
- **Community nodes** = Communication, AI, and niche integrations

---

## Recommendations

### For n8n Development Team

1. **Expand AI Test Coverage**
   - Currently only 1.3% AI workflows
   - Community shows massive AI adoption (MCP, ElevenLabs, DeepSeek)
   - Increase LangChain node test coverage

2. **Add WhatsApp Integration**
   - Evolution API has 7.7M downloads
   - No built-in WhatsApp support yet
   - Huge opportunity for official integration

3. **Web Scraping Tests**
   - SerpAPI (208K), Playwright (52K) popular in community
   - Limited web scraping test coverage
   - Add more browser automation tests

### For n8n Users

1. **Enterprise Cloud Automation** → Use built-in nodes (best supported)
2. **WhatsApp/Communication** → Use community nodes (Evolution API)
3. **AI/LLM Workflows** → Mix of built-in (LangChain) + community (MCP, ElevenLabs)
4. **Web Scraping** → Community nodes (SerpAPI, Playwright, Firecrawl)

---

## Visual Summary

```
WORKFLOW DISTRIBUTION BY FIELD (317 Total)

Cloud & Infrastructure     ████████████████████████████████ 61.2% (194)
Communication             ███████ 10.7% (34)
Data Processing           █████ 9.1% (29)
Productivity              ███ 4.7% (15)
Development               ██ 3.5% (11)
Security                  ██ 3.2% (10)
CRM & Sales               ██ 2.8% (9)
Marketing & Email         █ 1.9% (6)
AI & Machine Learning     █ 1.3% (4)
Content & CMS             █ 0.9% (3)
Other                     █ 0.6% (2)
```

---

## Methodology

**Data Collection**:
- Scanned entire n8n repository for `*.workflow.json` files
- Found 317 workflow files
- Located primarily in `packages/nodes-base/nodes/*/test/`

**Categorization**:
- Extracted service names from file paths
- Grouped services into 12 field categories
- Calculated counts and percentages

**Limitations**:
- Analysis covers test workflows only (not user workflows)
- Represents built-in node test coverage
- Does not include community node workflows

---

## Conclusion

The n8n repository's workflow distribution reveals a **strong enterprise and cloud-first approach**, with over 60% of test workflows dedicated to cloud infrastructure services. The top three services (Microsoft, Google, AWS) account for **61.3% of all workflows**, demonstrating n8n's focus on being the automation platform for cloud-native enterprises.

However, the community ecosystem data (brain-n8n-3.md) shows different adoption patterns, with WhatsApp automation, AI/LLM, and web scraping dominating community usage. This suggests an opportunity to expand built-in node coverage in these high-demand areas.

---

**Generated by**: N8N-BRAIN Analysis Tool
**Date**: 2025-11-24
**Total Workflows Analyzed**: 317
**Repository**: https://github.com/n8n-io/n8n
