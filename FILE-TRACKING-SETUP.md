# 📊 File Tracking Setup Guide

Your Devi workflow now has **complete file tracking** using GitHub + Google Sheets!

## ✅ What's Been Added

### New Nodes:
1. **📊 Log Files to Google Sheets** (Code node)
   - Collects all GitHub API responses
   - Extracts file URLs, commit SHAs, status

2. **📊 Google Sheets - Log File Tracker** (Google Sheets node)
   - Logs every file creation to a tracker sheet
   - Complete audit trail with timestamps

---

## 🔧 Setup Steps (5 minutes)

### 1. Create Google Sheet Columns

In your Google Sheets, create a new sheet called **"File Tracker"** with these columns:

| timestamp | week | file_type | file_name | github_url | commit_sha | status |
|-----------|------|-----------|-----------|------------|------------|--------|

### 2. Configure the Google Sheets Node

In n8n workflow:
1. Open the **"📊 Google Sheets - Log File Tracker"** node
2. Select your Google Sheets credential
3. Select your spreadsheet
4. Select "File Tracker" sheet
5. Save the workflow

### 3. Test It!

Run the workflow manually, then check your "File Tracker" sheet. You should see 3 rows:

```
2025-11-28T12:00:00Z | 1 | blog       | blog.html              | https://github.com/... | abc123def | success
2025-11-28T12:00:00Z | 1 | instagram  | instagram-script.txt   | https://github.com/... | abc123def | success
2025-11-28T12:00:00Z | 1 | tiktok     | tiktok-script.txt      | https://github.com/... | abc123def | success
```

---

## 📊 What You Get

### Complete Audit Trail:
✅ **Timestamp** - Exact time each file was created
✅ **Week Number** - Which week's content
✅ **File Type** - blog/instagram/tiktok
✅ **File Name** - Actual filename
✅ **GitHub URL** - Click to view file instantly
✅ **Commit SHA** - Unique version identifier
✅ **Status** - success/failed

### Three Levels of Tracking:

1. **GitHub Commits** (Source of Truth)
   - Full version history
   - Diff viewing
   - Commit messages: "💜 Devi Week 1 - blog.html"

2. **Google Sheets** (Quick Overview)
   - All files in one place
   - Sortable, filterable
   - Click GitHub URLs to view files

3. **n8n Executions** (Debug Info)
   - Full execution logs
   - Node outputs
   - Error messages

---

## 🎯 Real-World Usage

### Weekly Checklist:
After each Monday workflow run:

1. ✅ Check "File Tracker" sheet - confirm 3 new rows
2. ✅ Click GitHub URLs to verify files look correct
3. ✅ Check "Overview" sheet for newsletter stats

### Troubleshooting:
If a file fails:
- Status column will show "failed"
- Check n8n execution logs for error details
- Verify GitHub token has `repo` scope

---

## 📈 Example Use Cases

### Find a Specific Week:
```
Filter "File Tracker" by week = 3
→ See all files for week 3 with direct GitHub links
```

### Check Recent Uploads:
```
Sort "File Tracker" by timestamp descending
→ See most recent file uploads first
```

### Track Success Rate:
```
Count rows where status = "success"
→ Monitor workflow reliability
```

---

## 🔗 Related Guides

- **GITHUB-TOKEN-SETUP.md** - How to create GitHub token
- **DEVI-SYSTEM-README.md** - Full Devi workflow guide
- **EMAIL-DELIVERABILITY-GUIDE.md** - Newsletter best practices

---

## 💡 Pro Tips

1. **Bookmark the "File Tracker" sheet** for quick access
2. **Add conditional formatting** to highlight failed uploads in red
3. **Use GitHub URLs** to quickly review content each week
4. **Track commit SHAs** if you need to revert changes

---

✅ **You're all set!** Your workflow now has enterprise-level tracking for all output files.
