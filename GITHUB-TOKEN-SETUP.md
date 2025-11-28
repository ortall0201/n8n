# 🔑 GitHub Setup for Devi Workflow

## Why You Need This
The workflow now pushes files **directly to GitHub** using n8n's built-in GitHub node - no local files needed! This works from anywhere (Docker, npm, cloud).

---

## Step 1: Create GitHub Personal Access Token (2 minutes)

1. Go to: https://github.com/settings/tokens

2. Click: **"Generate new token"** → **"Generate new token (classic)"**

3. Fill in:
   - **Note**: `n8n Devi Workflow`
   - **Expiration**: `No expiration` (or `90 days` if you prefer)
   - **Select scopes**:
     - ✅ **repo** (all repo permissions)

4. Click: **"Generate token"**

5. **COPY THE TOKEN NOW** - you won't see it again!
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## Step 2: Add GitHub Credential to n8n (3 minutes)

1. **Open n8n**: http://localhost:5678

2. **Go to Credentials**:
   - Click on your profile (top right)
   - Select **"Credentials"**

3. **Create New Credential**:
   - Click **"Add credential"**
   - Search for **"GitHub"**
   - Select **"GitHub API"**

4. **Fill in the details**:
   - **Name**: `GitHub Account` (or any name you prefer)
   - **Access Token**: Paste the token from Step 1
   - Click **"Save"**

---

## Step 3: Connect Nodes to GitHub Credential (1 minute)

1. **Open the workflow**: `workflows/FASHION-INSIGHTS-COMPLETE-MERGED-GOOGLE-ANALYTICS.json`

2. **Find these 3 GitHub nodes** (they use `n8n-nodes-base.github`):
   - 💾 Save Blog to GitHub
   - 💾 Save Instagram to GitHub
   - 💾 Save TikTok to GitHub

3. **For EACH node**, connect the credential:
   - Click the node
   - Under **"Credential"**, select the **"GitHub Account"** credential you just created
   - No need to manually enter tokens!

4. **Save the workflow**

---

## Step 3: Test It! (2 minutes)

1. Click: **"Manual Test Trigger"**
2. Click: **"Execute workflow"**
3. Wait 2-3 minutes
4. Check your GitHub repo: https://github.com/ortall0201/n8n/tree/master/devi-content

You should see a new folder: `devi-content/week-1/` with 3 files! ✅

---

## How It Works

Each save node uses n8n's **built-in GitHub node** with these parameters:

```
Resource: File
Operation: Create
Owner: ortall0201
Repository: n8n
File Path: devi-content/week-1/blog.html
File Content: <html content>
Commit Message: 💜 Devi Week 1 - blog.html
Branch: master
```

**Best Practices Used**:
- ✅ Uses `n8n-nodes-base.github` (not HTTP Request)
- ✅ No manual base64 encoding needed
- ✅ Cleaner, more maintainable code
- ✅ Better error handling
- ✅ Proper credential management

GitHub automatically:
- Creates the file (handles base64 encoding)
- Creates a commit
- Pushes to master branch

No local file system needed! Works from Docker, npm, cloud, anywhere! 🚀

---

## Security Notes

✅ **Safe**: GitHub tokens are scoped - this token can only access your `n8n` repo

⚠️ **Important**: Don't commit the token to git! It's only stored in your n8n workflow (which is stored in n8n's database, not in git)

🔒 **Best Practice**: Use 90-day expiration and regenerate tokens regularly

---

## Troubleshooting

### "Bad credentials" error
→ Token expired or invalid. Generate a new token and update the workflow.

### "Not Found" error
→ Check the repo name in the URL is correct: `ortall0201/n8n`

### "Resource not accessible by personal access token"
→ Token doesn't have `repo` scope. Generate a new token with full `repo` permissions.

---

## Done! 🎉

Your workflow now pushes directly to GitHub - no local files, no path issues, no Docker mounting needed!
