# Project Lumina: Handoff Documentation
**Previous Name:** SDLC Navigator
**New Identity:** Lumina
## 1. Project Vision
**Lumina** is an intelligent Software Development Life Cycle (SDLC) tracking system. It guides users through their project journey with AI assistance, wrapped in a high-end, premium aesthetic inspired by **Kinetic Singapore** and **Apple**.
**Core Philosophy:**
- **Invisible Interface:** Content is king. The UI recedes.
- **Emotional Intelligence:** The AI is a partner, not just a tool.
- **Kinetic Motion:** Smooth, physics-based transitions.
## 2. Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (via **Supabase**)
- **Authentication:** Supabase Auth (Google OAuth)
- **ORM:** Prisma
- **AI Integration:** Vercel AI SDK (`ai`, `@ai-sdk/openai`, `@ai-sdk/react`)
- **Styling:** Tailwind CSS + Lucide React icons
## 3. Branding Strategy
- **Colors:**
    - **Void Black** (`#050505`): Backgrounds.
    - **Starlight White** (`#FAFAFA`): Text/Content.
    - **Nebula Blue** (`#3B82F6` -> `#60A5FA`): AI Accents/Gradients.
- **Typography:** Inter or Geist Sans. Light weights for headings.
- **Vibe:** "Control Center", Glassmorphism, Dark Mode default.
## 4. Implementation Details
### A. Dependencies
Run this in the new project:
```bash
npm install @supabase/supabase-js @supabase/ssr @prisma/client ai @ai-sdk/openai @ai-sdk/react zod lucide-react
npm install -D prisma
```
### B. Database Schema (`prisma/schema.prisma`)
```prisma
generator client {
  provider = "prisma-client-js"
}
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  projects  Project[]
}
model Project {
  id          String   @id @default(uuid())
  name        String
  description String?
  status      String   @default("active")
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  phases      Phase[]
  updatedAt   DateTime @updatedAt
}
model Phase {
  id        String    @id @default(uuid())
  name      String
  status    String    @default("pending")
  projectId String
  project   Project   @relation(fields: [projectId], references: [id])
  findings  Finding[]
}
model Finding {
  id      String @id @default(uuid())
  content String
  phaseId String
  phase   Phase  @relation(fields: [phaseId], references: [id])
}
```
### C. Supabase Setup
**`src/lib/supabase/client.ts`**
```typescript
import { createBrowserClient } from '@supabase/ssr'
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```
**`src/lib/supabase/server.ts`**
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          try { cookieStore.set({ name, value, ...options }) } catch (error) {}
        },
        remove(name: string, options: CookieOptions) {
          try { cookieStore.set({ name, value: '', ...options }) } catch (error) {}
        },
      },
    }
  )
}
```
### D. AI Integration
**`src/app/api/chat/route.ts`**
```typescript
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
export const maxDuration = 30;
export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: openai('gpt-4o'),
    messages,
    system: 'You are Lumina, an intelligent SDLC assistant. Be concise, helpful, and professional.',
  });
  return result.toDataStreamResponse();
}
```
**`src/components/ai/Assistant.tsx`**
```typescript
'use client';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { MessageCircleIcon, XIcon, SendIcon } from 'lucide-react';
export default function Assistant() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all">
          <MessageCircleIcon />
        </button>
      )}
      {isOpen && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl w-80 sm:w-96 flex flex-col h-[500px] text-zinc-100">
          <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50 rounded-t-lg backdrop-blur-md">
            <h3 className="font-semibold text-blue-400">Lumina AI</h3>
            <button onClick={() => setIsOpen(false)}><XIcon className="w-5 h-5 text-zinc-400" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-200'}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-800 flex gap-2 bg-zinc-900/50 backdrop-blur-md rounded-b-lg">
            <input
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask Lumina..."
            />
            <button type="submit" disabled={isLoading} className="text-blue-500 hover:text-blue-400 p-2">
              <SendIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
```
## 5. Environment Variables (`.env.local`)
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_postgres_connection_string
DIRECT_URL=your_direct_postgres_connection_string
OPENAI_API_KEY=your_openai_api_key
```
