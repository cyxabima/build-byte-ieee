You are an expert full-stack developer specializing in Next.js (App Router), TypeScript, Tailwind CSS, Shadcn UI, and MongoDB. Your task is to build a beautiful, high-performance, and responsive production-ready website for the **BuildByte** hackathon, organized by the **IEEE NED Student Branch**.

## 1. Core Technical Stack & Architectural Rules

* **Framework:** Next.js (App Router) with TypeScript.
* **UI Components:** Shadcn UI components using standard `lucide-react` icons. 
* **Styling Constraint:** **STRICTLY ZERO EMOJIS.** Use clean typography, professional iconography, and whitespace to achieve a premium aesthetic.
* **Theme Palette:** Blues, Black, and White (Clean dark mode or deep high-contrast premium theme).
* **Database:** MongoDB Atlas. Access must be configured via a single `MONGODB_URI` read from the `.env` file. Use a direct database client or a lightweight ODM (like Mongoose or a clean native driver utility) ensuring proper connection pooling for serverless environments.
* **Backend Architecture:** **100% Server Actions.** No traditional API routes (`/api/...`) are allowed. All form submissions, database queries, and utility executions must run via inline or external `'use server'` functions.
* **Email Notification:** Integrate **Resend** within Server Actions for reliable, serverless-friendly transactional emails (e.g., registration confirmation).
* **WhatsApp Notification:** Integrate `whatsapp-web.js` directly within the Server Action execution flow to trigger a confirmation message locally upon successful registration form submission.

---

## 2. Page Specifications & Routing

### Home Page (`/`)
A visually stunning, high-conversion landing page presenting all marketing communication in a structured hierarchy. It must include:
* **Hero Section:** Big bold typography highlighting **"BuildByte"**, the tagline **"Innovate, Build, Commit"**, and the organizer **"IEEE NED Student Branch"**. Clearly call out that it is a virtual, beginner-friendly 24-hour hackathon designed to turn beginners into confident first-time participants.
* **Details & Perks:** Show key dates, open eligibility across all departments, and incentives (formal recognition on IEEE handles, opportunity to work on an official IEEE NEDUET Project).
* **Journey Track:** Present the event progression clearly:
    * Day 1: Git & GitHub Fundamentals
    * Day 2: Choosing Tech Stack & Hackathon Toolkit
    * Day 3: Idea → MVP Execution
    * Day 4: The 24-Hour Hackathon & Live Reveal
* **Final Challenge Callout:** Display the core statement: *"Build a digital solution that empowers students, young professionals, or communities through technology."* Highlight expectations: Innovation, Practical Impact, and Technical Implementation.

### Registration Page (`/register`)
A dynamic registration interface built entirely using Shadcn Form primitives (`zod` + `react-hook-form`).
* **Team Configurations:** Allow solo registration up to a maximum team size of 4 members.
* **Dynamic Inputs:** The form must dynamically append fields based on the chosen team size.
* **Required Fields per Participant:** Full Name, Email Address, Department, Roll Number/ID, Contact Number (WhatsApp enabled).
* **Submission Action:** Calls a dedicated Server Action that validates inputs, commits the group record to MongoDB, invokes Resend for an automated confirmation email, and triggers the `whatsapp-web.js` client payload.

### Admin Dashboard (`/admin`)
A secure, clean administration view to monitor registrations, protected by a simple, manual environment-variable authentication flow.
* **Authentication Flow (Strictly No External Auth Libraries):**
    * Read a single password from the `.env` file (e.g., `ADMIN_PASSWORD`).
    * When an unauthenticated user visits `/admin`, render a simple Shadcn Form with a single "Password" input.
    * Upon form submission, trigger a Server Action that compares the input against `process.env.ADMIN_PASSWORD`.
    * If they match, use Next.js `cookies()` to set an HTTP-only session cookie (e.g., `admin_session=true`) and redirect to the dashboard view.
    * If they do not match, return a validation error to the client UI.
* **Route Protection:** Use layout-level Server Component checks or Next.js Middleware (`middleware.ts`) to verify the presence of this cookie. If the cookie is missing, render the login view instead of the data table.
* **Data Presentation (Protected View):** Render a detailed Shadcn Table showcasing all registered groups, individual participant details, submission timestamps, and contact info.
* **Search & Filter:** Include a client-side or server-side real-time filter to query teams by department, size, or member name.

---

## 3. Database Schema Blueprint (MongoDB)

Design a strict schema for the `registrations` collection:
```
{
  "teamName": "String (Required for teams, default/optional for solo)",
  "teamSize": "Number (Range: 1 to 4)",
  "participants": [
    {
      "name": "String (Required)",
      "email": "String (Required, validated format)",
      "department": "String (Required)",
      "rollNumber": "String (Required)",
      "phone": "String (Required)"
    }
  ],
  "registeredAt": "Date (Default: ISODate)"
}

```



## 4. Implementation Steps & Workflow Expectation
Environment Setup: Initialize the codebase, install Shadcn UI components (Button, Input, Form, Card, Table, Dialog, Toast, Select), and configure the Tailwind configuration to prioritize deep corporate blues, stark whites, and obsidian blacks.

Database Layer: Create a serverless-safe MongoDB connection utility file that ensures connections are cached and reused across Server Action invocations.

Component Architecture: Build clean, modular presentation components. Ensure that every layout adjustment is handled via Tailwind utility classes, keeping transitions crisp and loading states explicit using Shadcn skeleton loaders.

Action Flow: Code the registration handler sequentially: Validation → Database Mutation → Resend Email Dispatch → WhatsApp Notification Loop → Client UI State Update (Toast notification).
