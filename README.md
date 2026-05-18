# FLARE — Creator Monetization Platform MVP

Mobile-first creator platform demo built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Authentication** — Sign in / role selection (Creator / Viewer)
- **Creator onboarding** — 3-step flow: profile → Stripe Connect → pending approval
- **Video feed** — Vertical scroll-snap TikTok-style feed with likes and tips
- **Upload flow** — Simulated video upload with caption and tags
- **Tip system** — Stripe Connect simulation with 10% platform fee
- **Creator profile** — Payout status, pending tips, Stripe status
- **Admin panel** — Creator approval queue, payout release flow, content moderation

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

## Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Framework preset: **Next.js** (auto-detected)
5. Click Deploy

No environment variables required for the demo.

## Project Structure

```
flare/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── globals.css         # Global styles + animations
│   ├── page.tsx            # Main app shell + screen routing
│   ├── feed/
│   │   ├── FeedScreen.tsx  # Scroll-snap video feed
│   │   └── ProfileScreen.tsx
│   ├── upload/
│   │   └── UploadScreen.tsx
│   ├── onboard/
│   │   └── OnboardScreen.tsx
│   └── admin/
│       └── AdminPanel.tsx
├── components/
│   ├── ui/index.tsx        # Button, Badge, Avatar, Input, Toast
│   ├── TipModal.tsx        # Stripe tip sheet
│   └── BottomNav.tsx       # Mobile navigation
├── lib/
│   └── context.tsx         # Global app state
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Context** for state management
- Stripe Connect simulated (no real API keys needed for demo)
