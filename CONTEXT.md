# BuildByte Hackathon — Context

## Stack
- **Next.js 16.2.10** (App Router, TypeScript)
- **Tailwind CSS v4** (`@import "tailwindcss"`, `@theme inline`)
- **Shadcn UI** (button, input, form, card, table, dialog, toast, select, label)
- **MongoDB** via Mongoose (cached connection in `lib/db.ts`)
- **Resend** for confirmation emails
- **Lucide React** for icons (zero emojis)
- **Zod** + **react-hook-form** for form validation

## Environment Variables (`.env.local`)
```
MONGODB_URI=
ADMIN_PASSWORD=
RESEND_API_KEY=
```

## Design Theme
- Dark retro/cyberpunk: `--void` (bg), `--elec` (accent), `--cyan` (primary), `--magenta` (secondary)
- Fonts: Space Grotesk (headings), Press Start 2P (badges), JetBrains Mono (code/terminal), Geist (body)
- Custom components: `GlitchText`, `TerminalBadge`, `PixelDivider`, `PolaroidCard`, `StatStrip`, `JudgingBar`, `NoiseOverlay`
- Homepage: 9 section components under `components/sections/`

## Changes Made

### Schema (`lib/schemas.ts`)
- `repoUrl: { type: String, default: "" }` — repository link for submissions
- `submittedAt: { type: Date, default: null }` — timestamp of last repo submission
- `timestamps: true` — auto-managed `createdAt`/`updatedAt` for auditing
- Model always recreated: `delete mongoose.models.Registration` before `mongoose.model(...)`

### Server Actions (`lib/actions.ts`)
- **`getRegistrations`** — returns all registrations including `repoUrl` and `submittedAt`
- **`registerTeam`** — creates registration, sends Resend confirmation email
- **`checkExistingEmails(emails)`** — returns array of already-registered emails
- **`lookupTeamByEmail(email)`** — finds team by any member's email, returns team info + repoUrl
- **`submitRepo(email, repoUrl)`** — saves/overwrites repo URL + sets `submittedAt`, calls `revalidatePath("/admin")`
- **`loginAdmin` / `logoutAdmin`** — session cookie-based admin auth

### Register Page (`app/register/page.tsx`)
- Team size 1–3 (dynamic member fields)
- Duplicate email check: calls `checkExistingEmails` before `registerTeam`, sets field-level errors

### Submit Page (`app/submit/page.tsx`, `app/submit/layout.tsx`)
- Two-step flow: (1) email lookup, (2) team info + repo URL input
- Noindex metadata
- NOT linked from anywhere — shared via direct URL

### Admin Dashboard (`app/admin/dashboard.tsx`)
- Two tabs: **Registrations** (searchable table with team details + date) and **Submissions** (table with team, members, clickable repo link, submitted date)
- Uses `revalidatePath` to stay fresh after submissions

### Close Pages
- **`/register/close`** — "Registration Closed" (static, retro theme)
- **`/submit/close`** — "Submissions Closed" (static, retro theme)
- Ready to swap routes when needed

### Key Fixes
- Mongoose model caching: `delete` + recreate ensures schema changes take effect without server restart
- `submittedAt` bypassed Mongoose strict mode by explicit field in schema
- Type assertions use `as unknown as T` pattern for Mongoose document → plain object casting

## Commands
| Action | Command |
|--------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Type check | `npx tsc --noEmit` |
