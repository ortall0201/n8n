# n8n Local Setup - Quick Start (Official Method)

> Using the official n8n Docker commands from the repository
> Time: 5 minutes | Cost: $0

---

## Prerequisites

Make sure Docker Desktop is installed and running:
- Download from: https://www.docker.com/products/docker-desktop
- Open Docker Desktop and wait for it to start (green icon in system tray)

---

## Start n8n (2 Commands)

### Step 1: Create Docker Volume (One-time)

Open Command Prompt or PowerShell and run:

```bash
docker volume create n8n_data
```

**What this does:** Creates a persistent storage volume for your n8n data (workflows, credentials, executions)

---

### Step 2: Run n8n

```bash
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

**What this does:**
- Downloads official n8n image (first time only)
- Starts n8n on port 5678
- Connects to the persistent volume
- Shows logs in real-time

**First time:** Docker will download n8n (~500MB, takes 2-5 minutes)

**When you see:**
```
n8n ready on 0.0.0.0, port 5678
Editor is now accessible via:
http://localhost:5678/
```

✅ **n8n is running!**

---

## Access n8n

Open your browser and go to:
```
http://localhost:5678
```

Create your account (email, name, password) and start building workflows!

---

## Import Example Workflow

1. In n8n, click **"⋮" (three dots)** → **"Import from file"**
2. Select: `C:\Users\user\Desktop\n8n\workflows\hello-world.json`
3. Click **"Test workflow"** to run it
4. See the results!

---

## Stop n8n

In the Command Prompt where n8n is running:
- Press **`Ctrl + C`**

Your data is saved in the `n8n_data` volume and will persist!

---

## Start n8n Again

Just run the same command:

```bash
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

All your workflows and credentials will be there!

---

## Optional: Start with Tunnel (For Webhook Testing)

If you need to test inbound webhooks from external services:

```bash
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n start --tunnel
```

This creates a temporary public URL for testing webhooks.

**⚠️ Warning:** Only use tunnel for local development/testing, NOT for production!

---

## What Works Locally

✅ **Everything you need for development:**
- API integrations (GitHub, OpenAI, Slack, etc.)
- Data transformations
- AI/LLM workflows
- Database operations
- Email/notifications
- File processing
- Scheduled workflows (test manually)

❌ **Only needs a server:**
- Inbound webhooks (use `--tunnel` for testing)

---

## Complete Documentation

For detailed setup instructions with screenshots and troubleshooting:
- See: `local_setup/STEP-BY-STEP-SETUP.md`

For deployment to production:
- See: `LOCAL-DEVELOPMENT-GUIDE.md`
- See: `best_practice.md`

---

**That's it!** You're ready to build automation workflows with n8n. 🚀
