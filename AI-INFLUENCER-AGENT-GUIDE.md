# 🤖 AI Influencer Content Agent - Complete Guide

## 📋 Overview

Your n8n workflow now automatically generates AI-powered fashion blog content every week! The **AI Influencer Content Agent** creates:

1. **Weekly blog posts** on your Lovable site
2. **Voice chat context** for synchronized AI assistance
3. **JSON data** for API access

---

## 🔄 How It Works

### Workflow Structure:

```
[Weekly Schedule Trigger]
         ↓
[Scrape Instagram Posts]
         ↓
[AI Fashion Analysis]
         ↓
[Format Final Report]
         ├─→ [Send Newsletter Email] (existing flow)
         └─→ [Generate AI Influencer Blog Post] ← NEW!
                 ↓
            [Write Blog Post Files]
                 ↓
            [Generate Voice Chat Context]
                 ↓
            [Write Voice Context File]
```

### What Happens Every Monday at 9 AM:

1. **n8n scrapes Instagram** for fashion trends
2. **OpenAI analyzes** the posts
3. **Newsletter** is generated and sent via email
4. **SIMULTANEOUSLY**:
   - AI Influencer blog post is generated
   - Files are written to your Lovable site
   - Voice chat context is updated

---

## 📁 Files Created Each Week

### 1. Blog Post Page
**Location**: `figma-connect-landing/pages/blog/[YYYY-MM-DD].tsx`

**Example**: `figma-connect-landing/pages/blog/2025-11-27.tsx`

**Content**:
- Title based on weekly trends
- Intro in MAYA.AI's voice
- Trend analysis
- Shoppable products with affiliate links
- CTA to subscribe

### 2. Blog JSON Data
**Location**: `figma-connect-landing/public/blog/[YYYY-MM-DD].json`

**Example**: `figma-connect-landing/public/blog/2025-11-27.json`

**Structure**:
```json
{
  "issue_date": "2025-11-27",
  "week_label": "Oversized Blazers & Metallic Boots",
  "title": "Week 48: Oversized Blazers & Metallic Boots",
  "intro": "I've been scanning what your favorite influencers wear...",
  "summary": "Gender-fluid fashion dominates this week...",
  "trends": ["Oversized blazers", "Metallic boots", "Burgundy palette"],
  "products": [...]
}
```

### 3. Voice Chat Context
**Location**: `figma-connect-landing/public/ai_influencer_context.json`

**Updated every week** - Always contains the latest issue

**Structure**:
```json
{
  "updated_at": "2025-11-27T09:00:00Z",
  "week_label": "Oversized Blazers & Metallic Boots",
  "issue_date": "2025-11-27",
  "key_talk_points": [
    "Oversized blazers are back...",
    "Metallic boots dominate nighttime streetwear..."
  ],
  "top_trends": [...],
  "popular_colors": [...],
  "highlight_products": [...],
  "blog_url": "/blog/2025-11-27"
}
```

---

## 🤖 MAYA.AI Persona

### Voice & Style:

- **Confident & Mysterious**: "I know what's coming before it hits your feed"
- **Fashion Insider**: Uses industry terminology naturally
- **AI-Native**: Doesn't pretend to be human - embraces being an AI
- **Short Sentences**: Punchy, direct, memorable

### Example Voice:

❌ **NOT this**: "Hey friends! Today I want to talk about..."

✅ **YES this**: "I've been scanning what your favorite influencers wear, and trust me—this week is 🔥."

### TODO: Customize Persona

To change the influencer name from MAYA.AI:

1. Open: `workflows/fashion-insights-INFLUENCER-PRODUCTS.json`
2. Search for: `MAYA.AI`
3. Replace with your chosen name
4. Update voice script accordingly

---

## 🎨 Setting Up Your Lovable Site

### Required Directory Structure:

```
figma-connect-landing/
├── pages/
│   ├── blog/
│   │   ├── index.tsx          ← Blog index page (CREATE THIS)
│   │   ├── [date].tsx          ← Auto-generated weekly posts
│   │   └── 2025-11-27.tsx     ← Example post
│   ├── ai-influencer.tsx      ← AI Influencer hub (CREATE THIS)
│   └── voice-chat.tsx          ← Existing voice chat page
├── public/
│   ├── blog/
│   │   ├── index.json          ← List of all posts
│   │   └── 2025-11-27.json    ← Post data
│   └── ai_influencer_context.json  ← Voice chat context
└── components/
    ├── BlogLayout.tsx          ← Layout for blog posts (CREATE THIS)
    ├── ProductCard.tsx         ← Product display (CREATE THIS)
    └── InfluencerCard.tsx      ← Influencer display (CREATE THIS)
```

---

## 🛠️ Components to Create

### 1. BlogLayout Component

**File**: `figma-connect-landing/components/BlogLayout.tsx`

```tsx
import React from 'react';

interface BlogLayoutProps {
  title: string;
  date: string;
  author: string;
  children: React.ReactNode;
}

export function BlogLayout({ title, date, author, children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          <div className="flex items-center gap-4 text-sm">
            <span>By {author}</span>
            <span>•</span>
            <span>{new Date(date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p>© 2025 Fashion Insights by MAYA.AI</p>
        </div>
      </footer>
    </div>
  );
}
```

### 2. ProductCard Component

**File**: `figma-connect-landing/components/ProductCard.tsx`

```tsx
import React from 'react';

interface ProductCardProps {
  name: string;
  brand: string;
  price: string;
  image: string;
  affiliateUrl: string;
}

export function ProductCard({ name, brand, price, image, affiliateUrl }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
      <img
        src={image}
        alt={`${brand} ${name}`}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{brand}</h3>
        <p className="text-gray-600 mb-2">{name}</p>
        <p className="text-purple-600 font-bold text-xl mb-4">{price}</p>
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Shop Now →
        </a>
      </div>
    </div>
  );
}
```

### 3. InfluencerCard Component

**File**: `figma-connect-landing/components/InfluencerCard.tsx`

```tsx
import React from 'react';

interface InfluencerCardProps {
  handle: string;
  platform: string;
  vibe: string;
}

export function InfluencerCard({ handle, platform, vibe }: InfluencerCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-3"></div>
      <p className="font-bold text-gray-900">{handle}</p>
      <p className="text-sm text-gray-500">{vibe}</p>
    </div>
  );
}
```

### 4. Blog Index Page

**File**: `figma-connect-landing/pages/blog/index.tsx`

```tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BlogIndex() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/blog/index.json')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Failed to load blog index:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6">📸 MAYA.AI</h1>
          <p className="text-2xl mb-4">Your AI Fashion Insider</p>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            I scan what your favorite influencers wear, so you don't have to.
            Get weekly AI-powered trend reports before they hit your feed.
          </p>
        </div>
      </header>

      {/* Blog Posts Grid */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Weekly Fashion Reports</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link key={post.issue_date} href={post.url}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400"></div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(post.issue_date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <h3 className="text-xl font-bold mb-2">{post.week_label}</h3>
                  <p className="text-purple-600 font-semibold">Read more →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Get Weekly Insights</h2>
          <p className="text-lg mb-8 opacity-90">
            Join 1,000+ fashion lovers getting AI-powered trends every Monday
          </p>
          <Link href="/">
            <a className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition">
              Subscribe Now
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
```

### 5. AI Influencer Hub Page

**File**: `figma-connect-landing/pages/ai-influencer.tsx`

```tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AIInfluencerHub() {
  const [latestPost, setLatestPost] = useState<any>(null);

  useEffect(() => {
    fetch('/blog/index.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setLatestPost(data[0]);
        }
      })
      .catch(err => console.error('Failed to load latest post:', err));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-7xl font-bold mb-6">MAYA.AI</h1>
          <p className="text-2xl mb-8">Your AI Fashion Insider</p>
          <p className="text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
            I know what's trending before it hits your feed. I scan thousands of
            influencer posts weekly, analyze what matters, and deliver insights
            you can actually use.
          </p>
        </div>
      </section>

      {/* Latest Issue Highlight */}
      {latestPost && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">This Week's Issue</h2>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12">
              <p className="text-sm text-purple-600 font-semibold mb-2">
                {new Date(latestPost.issue_date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <h3 className="text-3xl font-bold mb-6">{latestPost.week_label}</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <Link href={latestPost.url}>
                  <a className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-4 px-8 rounded-lg font-bold hover:opacity-90 transition">
                    Read Full Blog Post →
                  </a>
                </Link>
                <Link href="/voice-chat">
                  <a className="flex-1 bg-white border-2 border-purple-600 text-purple-600 text-center py-4 px-8 rounded-lg font-bold hover:bg-purple-50 transition">
                    🎤 Start Voice Chat
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">What I Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-xl font-bold mb-3">Scan Influencers</h3>
              <p className="text-gray-600">
                I analyze thousands of posts from top fashion influencers weekly
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-3">Identify Trends</h3>
              <p className="text-gray-600">
                I spot what's rising before it becomes mainstream
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-3">Deliver Insights</h3>
              <p className="text-gray-600">
                I give you actionable fashion intelligence every Monday
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Get Weekly Fashion Insights</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join 1,000+ fashion lovers getting AI-powered trend reports every Monday at 9 AM
          </p>
          <Link href="/">
            <a className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-5 rounded-lg font-bold text-lg hover:opacity-90 transition">
              Subscribe Now
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
```

---

## 🎤 Syncing Voice Chat with Blog Content

Your voice chat can now access the latest content via:

**File**: `figma-connect-landing/public/ai_influencer_context.json`

### In Your Voice Chat Component:

```tsx
// Load latest context
useEffect(() => {
  fetch('/ai_influencer_context.json')
    .then(res => res.json())
    .then(context => {
      // Use context.key_talk_points for AI responses
      // Use context.top_trends for suggestions
      // Use context.blog_url to link to full post
    });
}, []);
```

---

## 🚀 Testing the Agent

### 1. Import Updated Workflow to n8n

1. Open n8n: http://localhost:5678
2. Go to Workflows
3. Import: `workflows/fashion-insights-INFLUENCER-PRODUCTS.json`
4. Activate workflow

### 2. Run Manual Test

1. Click "Test workflow" (manual trigger)
2. Check n8n execution logs
3. Verify files created:
   - `figma-connect-landing/pages/blog/[date].tsx`
   - `figma-connect-landing/public/blog/[date].json`
   - `figma-connect-landing/public/ai_influencer_context.json`

### 3. View in Browser

1. Start Lovable dev server: `cd figma-connect-landing && npm run dev`
2. Visit: `http://localhost:5173/blog/[date]`
3. Visit: `http://localhost:5173/blog`
4. Visit: `http://localhost:5173/ai-influencer`

---

## 📊 Workflow Diagram

```
┌─────────────────────────────────────────────────────┐
│         Monday 9 AM - Workflow Starts               │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
         ┌──────────────────────────┐
         │  Scrape Instagram Posts  │
         │  (Bright Data API)       │
         └──────────┬───────────────┘
                    │
                    ▼
         ┌──────────────────────────┐
         │  AI Fashion Analysis     │
         │  (OpenAI GPT-4)          │
         └──────────┬───────────────┘
                    │
                    ▼
         ┌──────────────────────────┐
         │  Format Final Report     │
         └──────────┬───────────────┘
                    │
          ┌─────────┴──────────┐
          ▼                    ▼
┌──────────────────┐  ┌──────────────────────────┐
│ Send Newsletter  │  │ Generate AI Blog Post    │ ← NEW!
│ (Email Flow)     │  │ (MAYA.AI Content)        │
└──────────────────┘  └──────────┬───────────────┘
                                 │
                                 ▼
                      ┌──────────────────────────┐
                      │ Write Blog Post Files    │
                      │ (.tsx + .json)           │
                      └──────────┬───────────────┘
                                 │
                                 ▼
                      ┌──────────────────────────┐
                      │ Generate Voice Context   │
                      │ (key_talk_points)        │
                      └──────────┬───────────────┘
                                 │
                                 ▼
                      ┌──────────────────────────┐
                      │ Write Voice Context JSON │
                      │ (ai_influencer_context)  │
                      └──────────────────────────┘
```

---

## ✅ Success Checklist

- [ ] Workflow imported to n8n
- [ ] All 4 new nodes visible in workflow
- [ ] Connections properly wired
- [ ] BlogLayout component created
- [ ] ProductCard component created
- [ ] InfluencerCard component created
- [ ] Blog index page created
- [ ] AI Influencer hub page created
- [ ] Test run successful
- [ ] Blog post generated
- [ ] Voice context updated
- [ ] Pages accessible in browser

---

## 🎉 You're Done!

Your AI Influencer Content Agent is now fully integrated! Every Monday at 9 AM, MAYA.AI will:

1. ✅ Analyze fashion trends
2. ✅ Generate blog post
3. ✅ Update voice chat context
4. ✅ Create shoppable content
5. ✅ Send newsletter email

**Welcome to automated fashion intelligence! 💜🤖**
