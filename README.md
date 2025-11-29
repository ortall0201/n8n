![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n - Secure Workflow Automation for Technical Teams

n8n is a workflow automation platform that gives technical teams the flexibility of code with the speed of no-code. With 400+ integrations, native AI capabilities, and a fair-code license, n8n lets you build powerful automations while maintaining full control over your data and deployments.

![n8n.io - Screenshot](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-screenshot-readme.png)

## Key Capabilities

- **Code When You Need It**: Write JavaScript/Python, add npm packages, or use the visual interface
- **AI-Native Platform**: Build AI agent workflows based on LangChain with your own data and models
- **Full Control**: Self-host with our fair-code license or use our [cloud offering](https://app.n8n.cloud/login)
- **Enterprise-Ready**: Advanced permissions, SSO, and air-gapped deployments
- **Active Community**: 400+ integrations and 900+ ready-to-use [templates](https://n8n.io/workflows)

## Quick Start

Try n8n instantly with [npx](https://docs.n8n.io/hosting/installation/npm/) (requires [Node.js](https://nodejs.org/en/)):

```
npx n8n
```

Or deploy with [Docker](https://docs.n8n.io/hosting/installation/docker/):

```
docker volume create n8n_data
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

Access the editor at http://localhost:5678

## Resources

- 📚 [Documentation](https://docs.n8n.io)
- 🔧 [400+ Integrations](https://n8n.io/integrations)
- 💡 [Example Workflows](https://n8n.io/workflows)
- 🤖 [AI & LangChain Guide](https://docs.n8n.io/advanced-ai/)
- 👥 [Community Forum](https://community.n8n.io)
- 📖 [Community Tutorials](https://community.n8n.io/c/tutorials/28)

## Support

Need help? Our community forum is the place to get support and connect with other users:
[community.n8n.io](https://community.n8n.io)

## License

n8n is [fair-code](https://faircode.io) distributed under the [Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md) and [n8n Enterprise License](https://github.com/n8n-io/n8n/blob/master/LICENSE_EE.md).

---

## 💜 Devi AI Fashion Influencer Project

This repository contains a complete AI influencer automation system called **Devi** (@devine.me), built entirely on n8n.

### What is Devi?

Devi is an AI fashion influencer that automatically:
- Scrapes Instagram trends from top fashion influencers
- Generates weekly fashion content (newsletter, blog, social posts, Q&A)
- Creates AI voice and video using her consistent identity
- Posts to Instagram, TikTok, and WordPress automatically
- Maintains continuity by reading her own past content each week

**Cost:** ~$13.50/week (~$54/month) for full automation
**Platforms:** Instagram, TikTok, Blog, Newsletter
**Tech Stack:** n8n + OpenAI + ElevenLabs + HeyGen + Bright Data + GitHub

### Project Structure

```
├── workflows/
│   ├── DEVI-SETUP-AUTOMATION.json           # One-time identity creation
│   └── Fashion Insights - last version update 3  # Weekly automation (extend this)
│
├── devi-identity/                            # Devi's face, voice, avatar assets
│   ├── face-primary.png
│   ├── voice-config.json
│   └── heygen-avatar-id.json
│
├── devi-content/                             # Weekly generated content
│   └── week-X/
│       ├── chatbot-qa.json
│       ├── blog-post.html
│       ├── instagram-video.mp4
│       └── newsletter.html
│
└── docs/                                     # Complete documentation
    ├── DEVI-AUTOMATION-RUNBOOK.md           # Operations guide (START HERE)
    ├── DEVI-WEEKLY-AUTOMATION-GUIDE.md      # Node-by-node setup
    ├── DEVI-API-INTEGRATIONS.md             # API credentials guide
    ├── DEVI-90DAY-EXPERIMENT.md             # Testing plan
    ├── DEVI-PERSONA.md                      # Devi's voice & personality
    └── DEVI_SECURE_SYSTEM_PROMPT.md         # Security guidelines
```

### Quick Start

#### 1. Run Setup Workflow (One Time)
```bash
# Import workflow
n8n → Import → workflows/DEVI-SETUP-AUTOMATION.json

# Execute workflow
Follow instructions to create:
- Devi face (Midjourney)
- Voice clone (ElevenLabs)
- Video avatar (HeyGen)
```

#### 2. Configure API Credentials
See: `docs/DEVI-API-INTEGRATIONS.md`

Required APIs:
- OpenAI (content generation) - $4.25/week
- ElevenLabs (voice) - $2/week
- HeyGen (video) - $7.25/week
- Bright Data (scraping) - $1.50/week
- Instagram Graph API (auto-posting) - FREE
- GitHub (storage) - FREE

#### 3. Extend Weekly Workflow
```bash
# Open existing workflow
n8n → "Fashion Insights - last version update 3"

# Add new nodes following guide
docs/DEVI-WEEKLY-AUTOMATION-GUIDE.md

# Test manually first
Click "Execute Workflow"

# Enable automation
Set schedule: Every Monday 9 AM
```

### Key Features

**Self-Awareness:**
Devi reads her own past content from GitHub each week, creating natural continuity:
> "Last week I showed you oversized blazers, this week let's talk about how to style them..."

**Multi-Format Content:**
One workflow generates 7 content types:
- Weekly newsletter (HTML)
- Blog post (HTML)
- Instagram script → Voice → Video
- TikTok script
- 23 Q&A pairs for chatbot
- File tracker log (Google Sheets)

**Visual Identity Consistency:**
Devi's face, voice, and avatar created once, reused every week via identity assets in GitHub.

**Cost-Effective:**
- ~$13.50/week = ~$702/year
- Scales to unlimited viewers
- No per-interaction costs (vs ChatGPT plugins)

### Documentation

| Document | Purpose |
|----------|---------|
| [DEVI-AUTOMATION-RUNBOOK.md](docs/DEVI-AUTOMATION-RUNBOOK.md) | **Start here** - Quick reference & troubleshooting |
| [DEVI-WEEKLY-AUTOMATION-GUIDE.md](docs/DEVI-WEEKLY-AUTOMATION-GUIDE.md) | Node-by-node setup instructions |
| [DEVI-API-INTEGRATIONS.md](docs/DEVI-API-INTEGRATIONS.md) | How to get all API credentials |
| [DEVI-90DAY-EXPERIMENT.md](docs/DEVI-90DAY-EXPERIMENT.md) | 12-week testing plan & metrics |
| [DEVI-PERSONA.md](DEVI-PERSONA.md) | Devi's voice, tone, personality |
| [DEVI-FULL-AUTOMATION-PLAN.md](DEVI-FULL-AUTOMATION-PLAN.md) | Original complete plan |

### Current Status

- ✅ Content generation working (OpenAI)
- ✅ GitHub storage working
- ✅ Q&A generation working (23 pairs)
- ✅ Lovable chatbot fetching Q&A
- ✅ File Tracker logging working
- ✅ Identity assets created
- 🔨 Voice/video automation (in progress)
- 🔨 Social auto-posting (in progress)
- 📅 90-day experiment starts Week 1

### Example Output

**Week 1 Q&A Sample:**
```json
{
  "question": "What's trending this week?",
  "answer": "Hey loves! This week everyone's wearing oversized blazers and metallic boots. I've seen these on EVERY top influencer 💜",
  "keywords": ["trending", "trends", "hot", "popular"]
}
```

**Instagram Script Sample:**
> "Hey loves! Week 1 fashion insights are here! This week's vibe? Oversized blazers paired with metallic boots - I'm OBSESSED. Swipe for where to get them! Link in bio for the full breakdown 💜"

### Workflow Architecture

```
Monday 9 AM Trigger
  ↓
Get Current Week (File Tracker)
  ↓
Read Own Past Content (GitHub self-awareness)
  ↓
Scrape Fresh Trends (Bright Data)
  ↓
Build Master Context (past + fresh)
  ↓
Generate Content (OpenAI GPT-4o-mini)
  ↓
[5 parallel branches]
  ├─→ Save Q&A → Lovable chatbot fetches
  ├─→ Save Blog → Publish WordPress
  ├─→ Save Instagram → Voice → Video → Post Instagram
  ├─→ Save TikTok → Post TikTok
  └─→ Log File Tracker → Google Sheets
```

### Support

For Devi-specific questions:
- See: `docs/DEVI-AUTOMATION-RUNBOOK.md` (troubleshooting)
- Check: Workflow execution logs in n8n
- Review: API service dashboards (OpenAI, ElevenLabs, HeyGen)

For n8n platform questions:
- [n8n Community Forum](https://community.n8n.io)
- [n8n Documentation](https://docs.n8n.io)

---

**Built with n8n + AI | @devine.me | 90-day experiment starting 2025 💜**

- **Source Available**: Always visible source code
- **Self-Hostable**: Deploy anywhere
- **Extensible**: Add your own nodes and functionality

[Enterprise licenses](mailto:license@n8n.io) available for additional features and support.

Additional information about the license model can be found in the [docs](https://docs.n8n.io/sustainable-use-license/).

## Contributing

Found a bug 🐛 or have a feature idea ✨? Check our [Contributing Guide](https://github.com/n8n-io/n8n/blob/master/CONTRIBUTING.md) to get started.

## Join the Team

Want to shape the future of automation? Check out our [job posts](https://n8n.io/careers) and join our team!

## What does n8n mean?

**Short answer:** It means "nodemation" and is pronounced as n-eight-n.

**Long answer:** "I get that question quite often (more often than I expected) so I decided it is probably best to answer it here. While looking for a good name for the project with a free domain I realized very quickly that all the good ones I could think of were already taken. So, in the end, I chose nodemation. 'node-' in the sense that it uses a Node-View and that it uses Node.js and '-mation' for 'automation' which is what the project is supposed to help with. However, I did not like how long the name was and I could not imagine writing something that long every time in the CLI. That is when I then ended up on 'n8n'." - **Jan Oberhauser, Founder and CEO, n8n.io**
