# n8n Local Setup - Step by Step Guide for Windows

> Follow this guide to set up n8n on your Windows PC locally
> Time needed: 15-20 minutes
> Cost: $0

---

## What You'll Have After This Guide

- ✅ n8n running locally on your PC
- ✅ Accessible at http://localhost:5678
- ✅ Ability to build and test workflows
- ✅ All for $0, no server needed

---

## Step 1: Check if Docker is Already Installed

Before installing anything, let's check if you already have Docker.

### Open Command Prompt or PowerShell

**Method 1: Using Search**
1. Press `Windows Key`
2. Type `cmd` or `powershell`
3. Press `Enter`

**Method 2: Using Run**
1. Press `Windows Key + R`
2. Type `cmd`
3. Press `Enter`

### Check Docker Version

In the command prompt, type:

```cmd
docker --version
```

**If you see something like:**
```
Docker version 24.0.6, build ed223bc
```
✅ **Docker is installed!** Skip to [Step 3](#step-3-run-n8n-locally)

**If you see an error like:**
```
'docker' is not recognized as an internal or external command
```
❌ **Docker is not installed.** Continue to Step 2.

---

## Step 2: Install Docker Desktop (If Not Installed)

### Download Docker Desktop

1. **Go to Docker website:**
   - Open your browser
   - Visit: https://www.docker.com/products/docker-desktop

2. **Click "Download for Windows"**
   - The installer will download (about 500MB)
   - File name: `Docker Desktop Installer.exe`

3. **Wait for download to complete**

### Install Docker Desktop

1. **Run the installer**
   - Double-click `Docker Desktop Installer.exe`
   - Click "Yes" if Windows asks for permission

2. **Installation options**
   - ✅ Check "Use WSL 2 instead of Hyper-V" (recommended)
   - ✅ Check "Add shortcut to desktop"
   - Click **"OK"**

3. **Wait for installation**
   - Takes 5-10 minutes
   - Let it complete

4. **Restart your computer**
   - Docker will prompt you to restart
   - Save your work and restart

### Start Docker Desktop

After restart:

1. **Open Docker Desktop**
   - Double-click Docker Desktop icon on desktop
   - OR search for "Docker Desktop" in Windows search

2. **Wait for Docker to start**
   - You'll see "Docker Desktop is starting..."
   - Wait until you see "Docker Desktop is running"
   - System tray icon will turn green

3. **Accept Terms (first time only)**
   - Docker may ask you to accept terms
   - Click "Accept"

### Verify Docker is Working

Open Command Prompt again:

```cmd
docker --version
```

You should see:
```
Docker version 24.0.6, build ed223bc
```

✅ **Docker is ready!**

---

## Step 3: Run n8n Locally

Now let's start n8n! We'll use the simple one-command method first.

### Open Command Prompt

1. Press `Windows Key`
2. Type `cmd`
3. Press `Enter`

### Run n8n

Copy and paste this command (right-click in cmd to paste):

```cmd
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n
```

**What this command does:**
- `docker run` = Start a Docker container
- `-it` = Interactive mode (you'll see logs)
- `--rm` = Remove container when stopped (keeps things clean)
- `--name n8n` = Name the container "n8n"
- `-p 5678:5678` = Make n8n accessible at port 5678
- `-v n8n_data:/home/node/.n8n` = Store n8n data permanently
- `n8nio/n8n` = Use official n8n image

### First Time: Docker Will Download n8n

**You'll see:**
```
Unable to find image 'n8nio/n8n:latest' locally
latest: Pulling from n8nio/n8n
5f7d8e4d481e: Downloading [====>                                      ]  10.3MB/127.4MB
```

**Wait for download to complete** (about 500MB, takes 2-5 minutes depending on internet speed)

### When n8n Starts Successfully

You'll see logs like:
```
n8n ready on 0.0.0.0, port 5678
Version: 1.xx.x

Editor is now accessible via:
http://localhost:5678/
```

✅ **n8n is running!**

**Important:** Keep this Command Prompt window open! Closing it will stop n8n.

---

## Step 4: Access n8n in Your Browser

### Open n8n

1. **Open your web browser** (Chrome, Edge, Firefox)

2. **Go to:**
   ```
   http://localhost:5678
   ```

3. **First-time setup screen appears**

### Create Your Account

**n8n will ask for:**

1. **Email:** `your-email@example.com` (can be fake for local use)
2. **First Name:** `Your Name`
3. **Last Name:** `Your Last Name`
4. **Password:** Choose a password (remember it!)

Click **"Get started"**

✅ **You're in!** Welcome to n8n!

---

## Step 5: Import Your First Workflow

Let's import the "Hello World" workflow from the workflows/ folder.

### Find the Workflow File

1. **Open File Explorer**
2. **Navigate to:**
   ```
   C:\Users\user\Desktop\n8n\workflows\hello-world.json
   ```

### Import to n8n

1. **In n8n, click the menu icon** (three horizontal lines, top left)

2. **Click "Workflows"**

3. **Click the "⋮" (three dots)** in the top right

4. **Select "Import from file"**

5. **Browse to:**
   ```
   C:\Users\user\Desktop\n8n\workflows\hello-world.json
   ```

6. **Click "Open"**

### View the Workflow

You'll see:
```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Manual    │  →   │    Code     │  →   │     Set     │
│   Trigger   │      │    Node     │      │    Node     │
└─────────────┘      └─────────────┘      └─────────────┘
```

---

## Step 6: Test Your First Workflow

### Execute the Workflow

1. **Click the "Test workflow" button** (top right, looks like a play button)

2. **Watch the execution:**
   - Manual Trigger node turns green ✅
   - Code Node executes and turns green ✅
   - Set Node formats output and turns green ✅

3. **Click on the "Set Node" (Format Output)**

4. **See the output:**
   ```json
   {
     "greeting": "Hello from n8n! 👋",
     "time": "11/25/2025, 12:58:00 PM",
     "result": "success"
   }
   ```

✅ **Congratulations! You just ran your first n8n workflow!**

---

## Step 7: Understanding What Just Happened

### The Workflow Flow

1. **Manual Trigger:** You clicked "Test workflow" → Workflow started

2. **Code Node:** Ran JavaScript code that:
   - Got current time
   - Created a greeting message
   - Returned JSON data

3. **Set Node:** Transformed the data:
   - Renamed fields for clarity
   - Created clean output structure

### What This Proves

✅ n8n is running locally on your PC
✅ Workflows execute instantly
✅ You can see all data at each step
✅ All completely free, no limits

---

## Step 8: Create Your Own Workflow

Now let's create a simple workflow from scratch.

### Create New Workflow

1. **Click "New Workflow"** (top left)

2. **Click the "+" button** in the center

3. **Search for "Manual Trigger"**

4. **Click on it to add**

### Add an HTTP Request Node

1. **Click the "+" on the right of Manual Trigger**

2. **Search for "HTTP Request"**

3. **Click on it**

4. **Configure it:**
   - Method: `GET`
   - URL: `https://api.github.com/users/github`
   - Click "Execute node" to test

5. **You'll see GitHub's data!**
   ```json
   {
     "login": "github",
     "id": 9919,
     "name": "GitHub",
     "company": "@github",
     "blog": "https://github.com/about",
     "location": "San Francisco, CA",
     "bio": "How people build software."
   }
   ```

### Add a Set Node to Format

1. **Click "+" after HTTP Request**

2. **Search for "Edit Fields"** (this is the Set node)

3. **Click on it**

4. **Add assignments:**
   - Click "Add Field"
   - Name: `username`, Value: `{{ $json.login }}`
   - Click "Add Field"
   - Name: `name`, Value: `{{ $json.name }}`
   - Click "Add Field"
   - Name: `location`, Value: `{{ $json.location }}`

5. **Execute the node**

6. **See clean output:**
   ```json
   {
     "username": "github",
     "name": "GitHub",
     "location": "San Francisco, CA"
   }
   ```

### Save Your Workflow

1. **Click "Save"** (top right)

2. **Name it:** `My First API Call`

3. **Click "Save"**

✅ **You just created and tested your first workflow!**

---

## What You Can Do Now

### 100% Local, No Server Needed:

✅ **Call any API:**
- Weather APIs
- GitHub API
- OpenAI API
- Any REST API

✅ **Process data:**
- Transform JSON
- Filter arrays
- Calculate values
- Validate data

✅ **Send notifications:**
- Slack messages
- Discord messages
- Emails
- SMS

✅ **Integrate services:**
- Google Sheets
- Notion
- Airtable
- Databases

✅ **Use AI:**
- OpenAI (ChatGPT)
- Anthropic (Claude)
- Local AI models

**All of this works on your local PC!** No n8n Cloud subscription needed.

---

## Important Commands

### Stop n8n

**In the Command Prompt where n8n is running:**
- Press `Ctrl + C`
- Wait for graceful shutdown

### Start n8n Again (After Stopping)

Open Command Prompt and run:
```cmd
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n
```

**Your data is saved!** All workflows and credentials are stored in the `n8n_data` volume.

### Check if n8n is Running

Open Command Prompt:
```cmd
docker ps
```

If n8n is running, you'll see:
```
CONTAINER ID   IMAGE         COMMAND         PORTS                    NAMES
abc123...      n8nio/n8n     "tini -- /do..."   0.0.0.0:5678->5678/tcp   n8n
```

---

## Next Steps

### 1. Explore More Workflow Examples

Check the `workflows/` folder in this repository:
- `workflows/README.md` - Detailed workflow guide
- `workflows/VISUAL-GUIDE.md` - Visual walkthrough

### 2. Learn n8n Concepts

Read the unified brain:
- `brain/brain-unified.md` - Complete n8n knowledge
- `best_practice.md` - Hosting and deployment best practices

### 3. Try Real Integrations

**Set up credentials for:**
- Slack (create a Slack app)
- Google Sheets (OAuth)
- OpenAI (API key)
- GitHub (Personal Access Token)

**Then build real workflows:**
- Daily report automation
- API data sync
- AI content generation
- Notification systems

### 4. When You're Ready for Production

Follow the deployment guide:
- `LOCAL-DEVELOPMENT-GUIDE.md` - Complete local to production path
- `best_practice.md` - VPS deployment guide

---

## Troubleshooting

### Problem: "Port 5678 is already in use"

**Solution:**

Option 1: Stop the existing n8n
```cmd
docker stop n8n
```

Option 2: Use a different port
```cmd
docker run -it --rm --name n8n -p 5679:5678 -v n8n_data:/home/node/.n8n n8nio/n8n
```
Then access at: http://localhost:5679

---

### Problem: "Docker daemon is not running"

**Solution:**
1. Open Docker Desktop
2. Wait for it to start (icon turns green in system tray)
3. Try again

---

### Problem: "Cannot access http://localhost:5678"

**Solutions:**

1. **Check if n8n is actually running:**
   ```cmd
   docker ps
   ```

2. **Check the logs:**
   ```cmd
   docker logs n8n
   ```

3. **Try 127.0.0.1 instead:**
   ```
   http://127.0.0.1:5678
   ```

4. **Make sure Command Prompt window with n8n is still open**

---

### Problem: "Very slow download or execution"

**Solution:**

Give Docker more resources:
1. Open Docker Desktop
2. Click Settings (gear icon)
3. Go to "Resources"
4. Increase:
   - Memory: 4GB or more
   - CPUs: 2 or more
5. Click "Apply & Restart"

---

## Using Docker Compose (Advanced Setup)

If you want a more permanent setup that starts automatically, use Docker Compose.

### Create docker-compose.yml

1. **Navigate to local_setup folder:**
   ```cmd
   cd C:\Users\user\Desktop\n8n\local_setup
   ```

2. **Create docker-compose.yml** (file already provided in this folder)

3. **Start n8n:**
   ```cmd
   docker-compose up -d
   ```

4. **Access n8n:**
   ```
   http://localhost:5678
   ```

5. **Stop n8n:**
   ```cmd
   docker-compose down
   ```

**Benefits:**
- Starts in background (detached mode)
- Easier to start/stop
- Can configure more settings
- Production-like setup

---

## Quick Reference Card

### Start n8n (Simple)
```cmd
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n
```

### Stop n8n
Press `Ctrl + C` in the running Command Prompt

### Access n8n
```
http://localhost:5678
```

### Check if running
```cmd
docker ps
```

### View logs
```cmd
docker logs n8n
```

---

## Summary

✅ **What you accomplished:**
1. Installed Docker Desktop
2. Started n8n locally
3. Accessed n8n in browser
4. Imported and tested example workflow
5. Created your own workflow
6. Called a real API (GitHub)
7. Processed and formatted data

✅ **What you learned:**
- n8n runs completely locally
- No server or cloud subscription needed
- 90%+ of workflows work on local PC
- You can test real API integrations
- All completely free

✅ **What's next:**
- Build real workflows for your use cases
- Test integrations (Slack, OpenAI, Google Sheets)
- Develop everything locally
- Deploy to production VPS when ready

---

**Cost to run n8n locally: $0**
**Time to set up: 15-20 minutes**
**Workflows you can build: Unlimited**

🚀 **You're now ready to build automation workflows with n8n!**
