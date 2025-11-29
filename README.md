# SDLC Navigator

A smart Software Development Life Cycle tracking system that guides you through your project journey, powered by AI.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **AI**: Vercel AI SDK + OpenAI
- **Styling**: Tailwind CSS + Shadcn/ui

## Getting Started

### 1. Environment Setup

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Fill in your **Supabase** and **OpenAI** credentials in `.env.local`.

### 2. Database Setup

Initialize the database schema:

```bash
npx prisma db push
```

### 3. Run the App

```bash
npm run dev
# or
yarn dev
```

## Features

- **Project Tracking**: Manage multiple projects with detailed phase tracking.
- **AI Assistance**: Get intelligent suggestions and help for each phase of your SDLC.
- **Real-time Updates**: Changes are saved instantly.
- **Secure Auth**: Google Login integration.
