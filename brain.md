# 🧠 VITARA / VIT Mumbai 2.0 — Comprehensive Project Brain (`brain.md`)

> **Master Technical Knowledge Base & Architectural Blueprint**
> 
> *Target Audience: Developers, Product Architects, and Antigravity AI Agents continuing development, debugging, or scaling the platform.*

---

## 📌 1. Project Overview & Vision

**VITARA** (Vidyalankar Institute of Technology Academic & Career Acceleration Platform) is a unified, next-generation AI-powered institutional ecosystem built for **VIT Mumbai**. 

### 🎯 Core Problem & Purpose
Traditional college ERP systems are fragmented: attendance is disconnected from academic mentoring, career roadmaps lack real-time skill-gap analysis, and institutional knowledge (ordinances, syllabi, exam rules) is scattered across static PDFs. 

VITARA unifies:
1. **Academic ERP & Attendance Monitoring**: Live tracking with 75% statutory compliance warnings and makeup schedule calculators.
2. **AI-Powered Faculty Mentorship Engine**: Automated student-mentor compatibility matching (40% goals, 25% domain, 10% course, 10% dept), meeting scheduling, and structured feedback loops.
3. **Institutional RAG Knowledge Base**: Grounded Gemini 2.0 / RAG search over autonomous college ordinances, credit regulations, and placement policies.
4. **Skill-Gap Analysis & Dynamic Roadmaps**: Milestone-based career tracking comparing student repositories/skills with current industry profiles (AI/ML Engineer, Fullstack, Cloud Architect).
5. **Role-Tailored Portals**: Dedicated, fully featured operational suites for **Students**, **Faculty Mentors**, and **College Administrators / HODs**.

---

## 🛠 2. Technology Stack & Design System

### 💻 Frontend Core
| Layer | Technologies Used |
|---|---|
| **Framework & Runtime** | [React 18.3.1](https://react.dev/), [TypeScript 5.7.2](https://www.typescriptlang.org/), [Vite 6.0.5](https://vitejs.dev/) |
| **Styling & Design** | [Tailwind CSS 3.4.17](https://tailwindcss.com/), Custom CSS tokens, Glassmorphism, PostCSS |
| **Animations & Transitions** | [Framer Motion 11.15.0](https://www.framer.com/motion/), [Lenis 1.3.26](https://lenis.darkroom.engineering/) (Smooth Scroll), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Icons & Visuals** | [Lucide React 0.469.0](https://lucide.dev/) |
| **Charts & Analytics** | [Recharts 2.15.0](https://recharts.org/) (ResponsiveContainer, LineChart, BarChart, etc.) |

### 🎨 Institutional Design System (VIT Mumbai Aesthetic)
All styles conform strictly to the bespoke VIT Mumbai brand palette defined in [`tailwind.config.js`](file:///c:/Users/HP/Desktop/project1/tailwind.config.js) and [`src/index.css`](file:///c:/Users/HP/Desktop/project1/src/index.css):

* **Canvas Background**: Warm Cream `#F7F4EE` & `#FAF7F0`
* **Card Surface**: Pure Ivory `#FFFCF7` & `#FFFFFF`
* **Deep Institutional Navy**: `#0C2238` & `#10253A` (Midnight: `#082B4C`, Dark Navy: `#061D33`)
* **Warm Gold Accent**: Primary `#C99632`, Light Gold `#E8C56B` / `#E2C06A`
* **Soft Blue & Cream Accents**: `#244F7D`, `#DCE8F4`, `#EFE7D8`
* **Typography**: Primary `Plus Jakarta Sans` / `Inter`, Display `Outfit`, Accent Serif `DM Serif Display`
* **Surfaces**: `.glass-panel` (backdrop-blur 20px), `.glass-card` (interactive hover elevations, subtle borders `rgba(12, 34, 56, 0.08)`)

---

## 🧭 3. Application Routing & Architecture Flow

The entire routing engine is managed in [`frontend/src/App.tsx`](file:///c:/Users/HP/Desktop/project1/frontend/src/App.tsx) through HTML5 History API integration (`pushState`, `popstate`), ensuring bookmarkable URLs, browser back/forward button support, and instant zero-page-reload rendering.

```
                                  ┌──────────────────┐
                                  │   Browser URL    │
                                  └────────┬─────────┘
                                           │
                       ┌───────────────────┴───────────────────┐
                       ▼                                       ▼
                 [ Path: / ]                           [ Path: /login ]
             ┌───────────────────────┐             ┌───────────────────────┐
             │   LANDING VIEW        │             │   LOGIN GATEWAY       │
             │  (CleanNavbar, Hero,  │──(Sign In)─►│  (Role Tab Selector:  │
             │   12 Live Sections,   │             │   Student / Mentor /  │
             │   Footer)             │             │   Admin)              │
             └───────────────────────┘             └───────────┬───────────┘
                                                               │
                                         ┌─────────────────────┼─────────────────────┐
                                         ▼                     ▼                     ▼
                                  [ Path: /student ]    [ Path: /mentor ]     [ Path: /admin ]
                              ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
                              │  STUDENT PORTAL   │ │   MENTOR PORTAL   │ │   ADMIN PORTAL    │
                              │ 14 Feature Tabs,  │ │ 12 Feature Tabs,  │ │ 17 Feature Tabs,  │
                              │ Roadmap, Courses, │ │ Requests, Reviews,│ │ System Telemetry, │
                              │ Attendance, Chat  │ │ Course Allocator  │ │ RAG, ERP Sync     │
                              └───────────────────┘ └───────────────────┘ └───────────────────┘
```

---

## ⚡ 4. State Management & Real-Time Sync Store

The application uses an event-driven local database store defined in [`frontend/src/services/mentoringStore.ts`](file:///c:/Users/HP/Desktop/project1/frontend/src/services/mentoringStore.ts).

### Key Features of the Store:
1. **LocalStorage Persistence**: Cached under key `'vit_mumbai_mentoring_store_v2'`.
2. **Cross-Tab & Cross-Component Reactivity**: When changes occur (e.g. Mentor approves student request or assigns an online course), `saveMentoringStore(newState)` triggers a native browser `window.dispatchEvent(new Event('storage'))`.
3. **Zero-Latency Two-Way Data Binding**:
   - Students see status change from `PENDING` ➔ `ACCEPTED` in real time.
   - Mentors assigning courses from Stanford/Coursera immediately updates the Student's *"AI Recommended Courses"* tab.
   - Student coursework submissions update the Mentor's grading queue.

### Core Data Models:
* **`MentorRequest`**: Student ID, Name, CGPA, Attendance, Match Score (e.g. 96%), Goals, Match Reason, Status (`PENDING | ACCEPTED | DECLINED | CHANGE_PENDING`).
* **`ChangeMentorRequest`**: Formal reason, current mentor, target mentor, approval workflow.
* **`CourseworkAssignment`**: Code (e.g., CS503), Title, Deadline, Late Policy, Submissions array (`studentId`, `fileName`, `submittedAt`, `status`).
* **`MentoringMeeting`**: 1-on-1 scheduled sessions, video link, agenda, status (`REQUESTED | SCHEDULED | COMPLETED | CANCELLED`).
* **`SessionFeedbackLog`**: Private mentor notes, student-visible action items, follow-up checkboxes.
* **`AssignedOnlineCourse`**: Course Title, Platform (Stanford, Coursera, MIT OCW), URL, Category, Difficulty, Guidance Notes from Mentor.

---

## 📂 5. Directory Structure & Component Breakdown

```
c:\Users\HP\Desktop\project1
├── BRAIN.md                   # Master technical knowledge base
├── package.json               # Root monorepo workspace scripts
├── .agents/                   # Workspace customization & AI agent rules
├── frontend/                  # React 18 + Vite + TypeScript Frontend Application
│   ├── package.json           # Frontend dependencies and scripts
│   ├── tailwind.config.js     # Color tokens, fonts, shadow utilities
│   ├── vite.config.ts         # Vite configuration
│   ├── index.html             # Main HTML root
│   └── src/
│       ├── main.tsx           # React DOM entry point
│       ├── App.tsx            # Master router & state machine
│       ├── index.css          # Custom CSS rules & glassmorphism
│       ├── services/
│       │   └── mentoringStore.ts # Reactive store & localStorage persistence
│       └── components/        # Frontend components & portals
└── backend/                   # Node.js + Express + ESM + Mongoose Backend API Server
    ├── package.json           # Backend dependencies (mongoose, express, bcryptjs, jsonwebtoken, cors, cookie-parser)
    ├── tsconfig.json          # TypeScript config
    ├── .prettierrc            # Prettier configuration
    ├── .env                   # Live environment configuration (MongoDB Atlas, Gemini API & HF Keys)
    ├── .env.example           # Environment template
    └── src/
        ├── index.js           # Server startup (dynamic env loading & MongoDB initialization)
        ├── app.js             # Express app setup & route mounting (/api/v1/*)
        ├── db/
        │   └── index.js       # Mongoose MongoDB connection handler (with DNS SRV fallback for Atlas)
        ├── models/
        │   ├── user.models.js          # User schema (Student, Mentor, Admin) & JWT methods
        │   ├── mentorRequest.models.js # Student-mentor matching requests
        │   ├── onlineCourse.models.js  # Mentor-assigned external courses
        │   ├── meeting.models.js       # 1-on-1 scheduled sessions
        │   ├── attendance.models.js    # Lecture compliance & ERP records
        │   ├── assignment.models.js    # Coursework lab tasks
        │   ├── submission.models.js    # Student coursework file submissions
        │   └── chatSession.models.js   # AI workspace chat history
        ├── services/
        │   └── aiService.js           # Live Google Gemini API (gemini-3.6-flash), RAG vector indexer, & HF fallback
        ├── controllers/
        │   ├── auth.controller.js      # Register, login, logout, refresh-token
        │   ├── mentor.controller.js    # Match requests, course allocation, meeting scheduler
        │   ├── student.controller.js   # Attendance analytics, safe-miss calculation, assignment submission
        │   ├── admin.controller.js     # Telemetry health metrics, user CRUD, ERP sync
        │   └── ai.controller.js        # AI chat response generation & institutional RAG search
        ├── middlewares/
        │   └── auth.middleware.js      # JWT token verification (verifyJWT)
        ├── routes/
        │   ├── auth.routes.js          # /api/v1/auth
        │   ├── mentor.routes.js        # /api/v1/mentor
        │   ├── student.routes.js       # /api/v1/student
        │   ├── admin.routes.js        # /api/v1/admin
        │   └── ai.routes.js           # /api/v1/ai
        └── utils/
            ├── ApiError.js             # Custom ApiError class
            ├── ApiResponse.js           # Standardized ApiResponse wrapper
            └── asyncHandler.js         # Async error wrapper middleware
```

---

## 🔍 6. Detailed Feature Deep-Dive

### 1. 🎓 Student Portal (`src/components/StudentPortal.tsx`)
* **Overview Dashboard**: High-level glance of CGPA (8.92), Attendance (91.4%), Active Assignments, Upcoming 1-on-1 Mentorships, Quick Actions.
* **Academics & Semester Transcript**: Course codes (CS501, CS502, CS503), credits, internal assessment marks, faculty in charge.
* **Attendance & ERP Monitor**: Live percentage vs 75% cutoff threshold, safe-to-miss lecture calculators, makeup request submission.
* **Assignments & Coursework**: Real-time upload modal, file drag-and-drop, timestamp verification, late deduction warnings.
* **AI Recommended Courses**: Live feed of elite external courses (Stanford CS229, DeepLearning.AI) assigned directly by the student's faculty mentor.
* **Skills & Development**: Skill radar (DSA, Machine Learning, Systems, Cloud, Web3), verification badges.
* **Projects & Portfolio**: Live GitHub links, capstone project tracking, IEEE paper drafts.
* **Certifications**: Uploaded credential proofs, credential ID verifiers.
* **Goals & Career Roadmap**: Target role selector (e.g. *AI Research Engineer at Top Tech*), milestone checklist.
* **Mentoring Workspace**: Assigned mentor status, one-click meeting scheduling, mentor advice logs, formal *"Request Mentor Change"* workflow.
* **Integrated AI Assistant**: Direct access to `ChatGPTAIWorkspace` with student context pre-loaded.

---

### 2. 👨‍🏫 Mentor Portal (`src/components/MentorPortal.tsx`)
* **Overview Dashboard**: Pending requests badge, mentee roster health, high-risk flags, upcoming appointments.
* **Mentor Requests & AI Matching**: View incoming student requests with AI compatibility percentage breakdown (e.g. 96% match), one-click Accept / Decline with custom feedback notes.
* **My Mentees Directory**: Searchable list with quick profile inspector, CGPA trends, and academic warning tags.
* **Assignments Hub**: View all course lab tasks, inspect student submissions, review submitted `.zip` / `.pdf` files.
* **Online Course Explorer & Allocator**: Browse catalog of Stanford, MIT OCW, Coursera, and edX courses and push assignments directly to specific mentees with personalized guidance notes.
* **Attention & Risk Alerts**: Automatic identification of students below 75% attendance or CGPA drops below threshold.
* **Meeting Scheduler**: Schedule 1-on-1 offline or Google Meet sessions.
* **Feedback & Follow-up Logs**: Structured logging of private observations vs student-visible action items.
* **AI Mentor Assistant**: Specialized AI workspace for drafting recommendation letters, reviewing research abstracts, and synthesizing student progress.

---

### 3. 🛡️ Admin Portal (`src/components/AdminPortal.tsx`)
* **Telemetry & System Health**: Active users, daily API requests, RAG query latency (142ms), ERP sync health.
* **User Management**: Students, Faculty, and Admin CRUD operations, activation/deactivation locks.
* **Department & Academic Structure**: B.Tech CSE, AI & Data Science, EXTC, IT program hierarchies.
* **Mentor Allocation Engine**: Bulk automated matching algorithm triggers and manual overrides.
* **AI Configuration & Token Usage**: LLM model routing (Gemini 2.0 Pro vs Claude 3.5 Sonnet vs GPT-4o), temperature sliders, prompt guarding, token rate limits.
* **Knowledge Base & RAG Documents**: Upload college ordinance PDFs, exam schemes, and syllabi; trigger vector embeddings and chunk re-indexing.
* **ERP Data Sources & Live Sync**: Trigger instant sync with college ERP database, view sync logs and payload status.
* **Audit & Security Logs**: Comprehensive timestamped audit trail of all role actions, logins, and permission modifications.

---

### 4. 🤖 AI Intelligence & RAG Workspace (`ChatGPTAIWorkspace.tsx`, `aiService.js`)
* **Live Gemini 3.6 Flash Engine**: Powered by Google Gemini API (`gemini-3.6-flash` / `gemini-2.5-flash`) with Hugging Face API key fallback capabilities.
* **Token Budget & Quota Protection**: Enforces strict `maxOutputTokens: 750`, `AbortSignal.timeout(12000)` (12s HTTP timeout), and 1500-char user input truncation to prevent infinite response loops or runaway token usage.
* **Prompt Injection Defense**: User queries are sanitized and wrapped in `<user_query>` XML tags with system instructions to ignore prompt override attempts.
* **Institutional RAG Grounding**: Grounded directly against VIT Mumbai Academic Regulations, Autonomous Ordinance 2026, Placement Handbooks 2026, and Coursework Policies via `/api/v1/ai/rag-search`.
* **AI Mentor Compatibility Calculator**: `/api/v1/ai/mentor-match` evaluates student career goals vs mentor specializations using a 4-factor algorithm (40% goals, 25% domain, 10% course, 10% dept).
* **AI Skill-Gap & Career Roadmap Generator**: `/api/v1/ai/skill-gap` compares student technical projects against target industry roles (*AI Research Engineer, Autonomous Systems Specialist*) to produce a match score and 2-phase milestone plan.
* **Admin Knowledge Base Indexing**: `/api/v1/ai/upload-knowledge` allows Admins to add new document policies directly into the RAG vector index.
* **Deep Thinking Mode**: Visual step-by-step reasoning dropdowns displaying vector queries and analytical chains.
* **Vite Rollup Code Splitting**: Configured `manualChunks` in `vite.config.ts` (`vendor-react`, `vendor-motion`, `vendor-icons`, `vendor-charts`), reducing main JS bundle size from 1.1MB to 463KB (>60% reduction).

---

## 🔗 7. Interconnectivity Matrix ("What connects to what & how")

| Action Origin | Destination Component | Connection Mechanism | Result / Effect |
|---|---|---|---|
| **Landing Page Role CTA** | `LoginPage.tsx` | URL route push (`/login`) & `loginRole` state | Opens Login pre-selected for Student/Mentor/Admin |
| **Login Submission** | `StudentPortal` / `MentorPortal` / `AdminPortal` | `handlePerformLogin(role)` in `App.tsx` | Mounts chosen portal with smooth AnimatePresence transition |
| **Student Requests Mentor** | `MentorPortal.tsx` | `saveMentoringStore()` ➔ `mentorRequests[]` | Displays in Mentor's "Mentor Requests" tab with Match Score |
| **Mentor Accepts Request** | `StudentPortal.tsx` | Store update: `status: 'ACCEPTED'` | Student's Mentoring tab immediately unlocks mentor details |
| **Mentor Assigns Online Course** | `StudentPortal.tsx` | Store update: `assignedOnlineCourses[]` | Course appears instantly in Student's "AI Recommended Courses" |
| **Student Submits Assignment** | `MentorPortal.tsx` | Store update: `assignments[].submissions[]` | Mentor sees new submission timestamp and file link |
| **Admin Syncs ERP** | All Portals | Simulated API ping + timestamp refresh | Global synchronization badge turns green |
| **Global Floating Orb Click** | `FloatingAIWidget.tsx` | Draggable floating modal with quick prompt triggers | Instant AI chat opens over any page/portal without leaving context |

---

## 🚀 8. Developer Quickstart & Common Tasks

### 💻 Running Locally
```bash
# Run frontend dev server
npm run dev:frontend

# Run backend dev server
npm run dev:backend

# Build frontend & backend
npm run build:frontend
npm run build:backend
```

### 🔑 Test Credentials (Pre-filled on Login Page)
* **Student**: Roll No: `2023CSE001` | Password: `password123`
* **Mentor**: Email: `s.kulkarni@vit.edu.in` | Password: `password123`
* **Admin**: Email: `admin@vit.edu.in` | Password: `password123`

---

## 🚀 9. Production & Deployment Readiness

The project is fully build-ready and pre-configured for one-click deployment across major cloud hosting providers:

### ⚙️ Monorepo Unified Build System
* **Unified Build Command**: `npm run build` (runs `build:frontend` & `build:backend` sequentially).
* **Production Start Command**: `npm start` (launches Node backend web service).
* **TypeScript Integrity**: Fully typed with zero compilation warnings (`tsc` passes for both frontend and backend).

### ☁️ Cloud Deployment Configuration Setup
* **Netlify / Render / Cloudflare Pages**: [`frontend/public/_redirects`](file:///c:/Users/HP/Desktop/project1/frontend/public/_redirects) configured for HTML5 `pushState` SPA fallback routing (`/* /index.html 200`).
* **Vercel Frontend**: [`frontend/vercel.json`](file:///c:/Users/HP/Desktop/project1/frontend/vercel.json) rewrites enabled.
* **Vercel Backend**: [`backend/vercel.json`](file:///c:/Users/HP/Desktop/project1/backend/vercel.json) serverless function builder configured.
* **Render.com Monorepo**: [`render.yaml`](file:///c:/Users/HP/Desktop/project1/render.yaml) provided for 1-click stack provisioning (Web Service + Static Site).
* **Environment Templates**: [`backend/.env.example`](file:///c:/Users/HP/Desktop/project1/backend/.env.example) & [`frontend/.env.example`](file:///c:/Users/HP/Desktop/project1/frontend/.env.example).

---
*Document maintained automatically. For changes or queries, update [`frontend/src/services/mentoringStore.ts`](file:///c:/Users/HP/Desktop/project1/frontend/src/services/mentoringStore.ts) and [`frontend/src/App.tsx`](file:///c:/Users/HP/Desktop/project1/frontend/src/App.tsx).*
