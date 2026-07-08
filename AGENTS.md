<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# BuildByte Hackathon — Agent Guide

## Stack & constraints

- **Next.js 16.2.10** (App Router, TypeScript) — read `node_modules/next/dist/docs/` before coding
- **Tailwind CSS v4** — uses `@import "tailwindcss"` and `@theme inline` (NOT `@tailwind base/...`)
- **Shadcn UI** — not yet installed. Run `npx shadcn@latest init`, then `npx shadcn@latest add button input form card table dialog toast select`
- **ESLint** — flat config (`eslint.config.mjs`), run via `npm run lint`
- **Path alias** — `@/*` maps to project root
- **Zero emojis** — use lucide-react icons and typography
- **Theme palette** — blues, black, white

## Architecture (no `/api/` routes)

- 100% Server Actions (`'use server'`) — no API route files
- Registration flow: validate → MongoDB → Resend email → client toast
- Admin auth: HTTP-only cookie (`admin_session`), password from `ADMIN_PASSWORD` env var, no auth libraries

## Environment

Create `.env.local` (`.env*` is gitignored):
```
MONGODB_URI=
ADMIN_PASSWORD=
RESEND_API_KEY=
```

## Commands

| Action | Command |
|--------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Type check | `npx tsc --noEmit` |
| Add Shadcn component | `npx shadcn@latest add <name>` |

## Key conventions

- Admin login rendered server-side when cookie missing; dashboard shown only with valid `admin_session` cookie
- MongoDB connection must be cached/reused across serverless invocations
- Team registration: solo to 4 members, dynamic fields, zod + react-hook-form
- No `/api/*` directory anywhere — all backend logic in Server Actions
