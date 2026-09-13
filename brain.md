# 🧠 Campus 1 / VIT Mumbai Platform — Comprehensive Project Brain (`brain.md`)

> **Master Technical Knowledge Base & Architectural Blueprint**
> 
> *Target Audience: Developers, Product Architects, and Antigravity AI Agents continuing development, debugging, or scaling the platform.*

---

## 📌 1. Project Overview & Vision

**Campus 1** is a unified, next-generation AI-powered institutional ecosystem built for **VIT Mumbai**. 

### 🎯 Core Problem & Purpose
Traditional college ERP systems are fragmented: attendance is disconnected from academic mentoring, career roadmaps lack real-time skill-gap analysis, and institutional knowledge (ordinances, syllabi, exam rules) is scattered across static PDFs. 

Campus 1 unifies:
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
| **Showcase & Portals** | 3D Interactive Leather Books (`bestsellers-book-showcase.html`) with embedded vintage botanical login card supporting dynamic role switching: Teacher Book (`codex` ➔ MENTOR / `/mentor`), Student Book (`claude` ➔ STUDENT / `/student`), and Admin Book (`cursor` ➔ ADMIN / `/admin`) with seamless postMessage auth bridge |
| **Icons & Visuals** | [Lucide React 0.469.0](https://lucide.dev/) |
| **Charts & Analytics** | [Recharts 2.15.0](https://recharts.org/) (ResponsiveContainer, LineChart, BarChart, etc.) |

### 🎨 Institutional Design System (VIT Mumbai Aesthetic)
All styles conform strictly to the bespoke VIT Mumbai brand palette defined in [`frontend/tailwind.config.js`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/frontend/tailwind.config.js) and [`frontend/src/index.css`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/frontend/src/index.css):

* **Canvas Background**: Warm Cream `#F7F4EE` & `#FAF7F0`
* **Card Surface**: Pure Ivory `#FFFCF7` & `#FFFFFF`
* **Deep Institutional Navy**: `#0C2238` & `#10253A` (Midnight: `#082B4C`, Dark Navy: `#061D33`)
* **Warm Gold Accent**: Primary `#C99632`, Light Gold `#E8C56B` / `#E2C06A`
* **Soft Blue & Cream Accents**: `#244F7D`, `#DCE8F4`, `#EFE7D8`
* **Typography**: Primary `Plus Jakarta Sans` / `Inter`, Display `Outfit`, Accent Serif `DM Serif Display`
* **Surfaces**: Ultra-transparent glass surfaces `.glass-panel`, `.glass-card` (`bg-[#FFFFFF]/10 backdrop-blur-[5px] border-[#0C2238]/08 shadow-xl shadow-[#0C2238]/05`).

### 💎 Glassmorphism Design System & Skill
All UI cards and interactive panels follow the **Glassmorphism Design System Skill** stored in [`.agents/skills/glassmorphism/SKILL.md`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/.agents/skills/glassmorphism/SKILL.md).
* **Core Philosophy**: Transparency first, blurred second, decorative last (`transparent → subtle 5px blur → clean 8% border → soft depth shadow → crisp typography`).
* **Production Spec**: `bg-[#FFFFFF]/10 backdrop-blur-[5px] border border-[#0C2238]/08 shadow-xl shadow-[#0C2238]/05`.
* **Rules**: Ultra-transparent 10% white fill, 5px backdrop blur, subtle 8% navy rim borders (`border-[#0C2238]/08`), and soft depth shadows.

---

## 🧭 3. Application Routing & Architecture Flow

The entire routing engine is managed in [`frontend/src/App.tsx`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/frontend/src/App.tsx) through HTML5 History API integration (`pushState`, `popstate`), ensuring bookmarkable URLs, browser back/forward button support, and instant zero-page-reload rendering.

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

### 5. 📚 Campus Portals & 3D Interactive Showcase (`BestsellersBookShowcaseSection.tsx`, `bestsellers-book-showcase.html`)
* **Pointer Parallax & 3D Perspective**: Interactive 3D books simulating physical depth, tilt, spine shadows, and realistic perspective shifts.
* **Three Dedicated Institutional Workflows**:
  1. **Faculty Portal** (`data-book="claude"`): Research mentorship, PhD candidate tracking, thesis advisory, grant management, and autonomous course approval.
  2. **Student Portal** (`data-book="codex"`): Academic credit tracking, 75% attendance radar, AI skill-gap analyzer, career roadmap, and Stanford/MIT online course assignments.
  3. **Admin Portal** (`data-book="cursor"`): Real-time system telemetry, ERP database bidirectional synchronization, AI LLM model orchestration, and security audit logs.
* **Real-Time Interactive Modal**: Clicking any book opens a detailed editorial dossier with direct single-click navigation links (`/mentor`, `/student`, `/admin`).
* **Standalone Responsive View**: Available in-app at `#bestsellers-showcase` and standalone at `/landing-pages/bestsellers-book-showcase.html`.

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
* **Unified Monorepo (Vercel)**: [`vercel.json`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/vercel.json) + [`api/index.js`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/api/index.js) (single-click fullstack deployment: serves Vite SPA on `/` and Express Serverless API on `/api/*` from the same domain with 0 CORS friction).
* **Netlify / Render / Cloudflare Pages**: [`frontend/public/_redirects`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/frontend/public/_redirects) configured for HTML5 `pushState` SPA fallback routing (`/* /index.html 200`).
* **Standalone Vercel Frontend**: [`frontend/vercel.json`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/frontend/vercel.json) rewrites enabled.
* **Standalone Vercel Backend**: [`backend/vercel.json`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/backend/vercel.json) serverless function builder configured.
* **Render.com Monorepo**: [`render.yaml`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/render.yaml) provided for 1-click stack provisioning (Web Service + Static Site).
* **Environment Templates**: [`.env.example`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/.env.example), [`backend/.env.example`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/backend/.env.example) & [`frontend/.env.example`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/frontend/.env.example).

---

## 🔮 10. Recent Architectural Milestones Completed

1. **MongoDB Atlas & Database Seeding**: Connected live MongoDB Atlas with complete seeded collections for Students, Faculty Mentors, Assignments, Courses, and Schedules. Added 5 simple accounts (`101`, `102`, `103`, `T101`, `T102`).
2. **Gemini 2.5 Flash RAG Engine**: Live integration in [`backend/src/services/aiService.js`](file:///c:/Users/HP/Desktop/project1/backend/src/services/aiService.js) with soft authentication fallback and natural ChatGPT-style formatting.
3. **Per-Account First-Login Onboarding**: Interactive multi-step setup modals for Students (career vision, specialization track, target milestones & AI roadmap) and Teachers (designation, semesters taught, research domains & office hours).
4. **Authentic Personalized Academic Metrics**: Dynamically calculated CGPA trajectory curves, subject attendance ratios, and avatar initials tailored per individual student account.
5. **Goal-Adaptive Course Recommendation Matrix**: Dynamic curriculum matching verified real university courses (Stanford, Harvard, MIT, Helsinki, Google, AWS) to each student's chosen technical specialization track.
6. **ThreeUI Bestsellers Book Showcase Integration & High-Fidelity Rendering**: Integrated `<BestsellersBookShowcase />` (`public/landing-pages/bestsellers-book-showcase.html`) right after the interactive sketchbook section on the landing page. Refined camera perspective (`fov: 28`), viewport-adaptive responsive sizing (`h-[88vh] min-h-[720px] max-h-[960px]`), crisp serif typography, unclipped book geometry (Codex, Claude Code, Cursor), and fully interactive 3D field notes inspection.
7. **Admin Student Data Management & CSV Bulk Import Engine**: Unified production student roster CRUD and multi-step CSV dry-run preview & bulk commit engine integrated with MongoDB `User` model (`role: "STUDENT"`), complete with duplicate PRN/email protection, password safety, and audit logging.
8. **Student Mentor Change Request Workflow**: Complete backend, database, store, and UI implementation ensuring a student's `assignedMentor` remains unchanged when a `CHANGE_PENDING` request is sent to a new mentor. Only upon explicit acceptance by the target mentor (`status: ACCEPTED`) is `User.assignedMentor` updated. Features interactive Faculty Teacher Selection Dropdowns, target teacher preview cards, request status alert badges, and a professional 8-test automated suite in [`backend/tests/test_mentor_change_workflow.js`](file:///c:/Users/HP/Desktop/project1/backend/tests/test_mentor_change_workflow.js).
9. **Hero Live Student Intelligence Preview & Interactive Career Goal Engine**: Added real-time interactive state engine to the landing page hero in [`frontend/src/components/CleanHero.tsx`](file:///c:/Users/HP/Desktop/project1/frontend/src/components/CleanHero.tsx). Displays a compact glassmorphism preview featuring dynamic career goal switching (AI Research Engineer, ML Engineer, Software Engineer, Data Scientist), animated number counters for Readiness and Alignment, animated progress bars, and Next Best Action recommendations. Integrates smooth-scroll button behaviors (`Start Your Journey` with section highlight & toast, `Explore Platform`) and reactive state synchronization with the floating AI orb in [`frontend/src/components/FloatingAIWidget.tsx`](file:///c:/Users/HP/Desktop/project1/frontend/src/components/FloatingAIWidget.tsx) showing thinking calculations and "Profile recalculated" tooltips.
10. **Live Student State Dashboard & Reactive Local Store**: Transformed the Student Dashboard in [`frontend/src/components/StudentDashboardStory.tsx`](file:///c:/Users/HP/Desktop/project1/frontend/src/components/StudentDashboardStory.tsx) into a live reactive dashboard powered by [`frontend/src/services/studentStateStore.ts`](file:///c:/Users/HP/Desktop/project1/frontend/src/services/studentStateStore.ts). Implemented live top metrics (interactive tasks count 12→11, smooth progress 75%→79%, opportunities apply/save), Today's Priority workflow (`Start Task` → `Complete Task` → `Why?` explanation modal), interactive stage switcher (`LEARN`, `PRACTICE`, `BUILD`, `GROW`), live AI recommendation card (`Add to Roadmap` with confirmation state), real-time activity stream, and live `● PROFILE SYNCED` / `● UPDATING PROFILE...` status badge. Fully connected with Update 1 career goal changes.
11. **WHAT IF? — Future Simulator Signature Feature**: Built an interactive trajectory simulation engine in [`frontend/src/components/FutureSimulatorModal.tsx`](file:///c:/Users/HP/Desktop/project1/frontend/src/components/FutureSimulatorModal.tsx). Features career-goal-adaptive action catalogs across Academic, Skills, Experience, and Mentoring categories. Implemented multi-action selection with diminishing-returns calculation formulas, dynamic "Why This Changes" AI explanations, weekly effort investment timeline planners (3h to 15+h/week), side-by-side 3-scenario comparison cards (`[ Choose this path ]`), and a direct `[ APPLY TO MY ROADMAP → ]` state trigger that updates live tasks, readiness progress, activity feed, and dashboard priority.
12. **Interactive & Stateful Learning Roadmap**: Converted the static roadmap infographic into an interactive learning engine in [`frontend/src/components/LearningRoadmapSection.tsx`](file:///c:/Users/HP/Desktop/project1/frontend/src/components/LearningRoadmapSection.tsx). Features clickable 5-step cards with an inline inspector for Current Skills, Skill Gaps, Recommended Learning (`Start Module`), Project Evidence (`Not Started` | `In Progress` | `Submitted` | `Verified`), and Target Goal benchmarks. Integrated top-level Roadmap Progress gauge (`state.progress`), Next Best Step banner (`Continue →`), AI Sequence Optimizer (`Apply Recommended Order`), and full reactivity with Future Simulator plan applications.
13. **Intelligent Skill Analysis System**: Upgraded the skill gap section in [`frontend/src/components/SkillGapSection.tsx`](file:///c:/Users/HP/Desktop/project1/frontend/src/components/SkillGapSection.tsx). Implemented 4 intelligence states (`MASTERED`, `MAINTAIN`, `IMPROVE`, `CRITICAL GAP`), interactive skill inspector with AI verdicts, Time Waste Detector alerts (`STOP SPENDING TIME HERE` with ~8 hrs reallocation recommendations), High Impact Skill Rankings (#1 PyTorch), Role Comparison Modal (`[ Compare with Target Role ]`), and `[ Find My Next Skill → ]` with direct roadmap trigger capabilities.
14. **Contextual Student Decision Assistant**: Upgraded the AI Assistant in [`frontend/src/components/AIAssistantSection.tsx`](file:///c:/Users/HP/Desktop/project1/frontend/src/components/AIAssistantSection.tsx). Connected live student profile context (`CGPA`, `attendance`, `skills`, `careerGoal`, `roadmap`), implemented decision comparison matrix cards (e.g. PyTorch vs TensorFlow), quick intent chips (`WHAT SHOULD I DO NEXT?`, `CHECK MY SKILL GAPS`, etc.), "Why This Recommendation?" data signal breakdowns, institutional source & confidence badges, and direct roadmap trigger buttons inside responses.
15. **Trustworthy Institutional RAG Knowledge Base**: Upgraded [`frontend/src/components/VITKnowledgeRAG.tsx`](file:///c:/Users/HP/Desktop/project1/frontend/src/components/VITKnowledgeRAG.tsx). Added interactive search input, 3-stage short retrieval animation, `Show Why` traceability modal (Question → Doc → Section → Evidence Snippet → AI Interpretation → Answer), Source Cards with official seals, Retrieval Confidence badges (99.4%), category filters, Open Source Document Modal, and strict distinction between Official Records and AI Interpretation.
16. **Intelligent Faculty Intervention Dashboard**: Transformed [`frontend/src/components/MentoringSection.tsx`](file:///c:/Users/HP/Desktop/project1/frontend/src/components/MentoringSection.tsx). Implemented 20-mentee Attention Radar Header (Immediate Attention, Monitor, On Track, High Potential), disengagement pattern detection, student risk inspector, intervention recommendation & creation engine (`Create Intervention` -> `INTERVENTION CREATED` toast & log), and High Potential research candidate identification.
17. **AI Time-Allocation & Weekly Plan Engine**: Created [`frontend/src/components/WeeklyPlanSection.tsx`](file:///c:/Users/HP/Desktop/project1/frontend/src/components/WeeklyPlanSection.tsx). Features "YOUR WEEK — Where should your limited study time go?", 3h-20+h/wk study time selector, AI time allocation breakdown per subject with "Why" explanations, tradeoff warnings ("Reducing DSA time may slow DSA maintenance"), day-by-day weekly schedule generation, and direct task export to the shared student dashboard state.
18. **Flagship Student Digital Twin Visualization**: Built the central platform visualization in [`frontend/src/components/StudentDigitalTwinSection.tsx`](file:///c:/Users/HP/Desktop/project1/frontend/src/components/StudentDigitalTwinSection.tsx). Features a central student state node (Krishna Singh, AI Research Engineer, 74% readiness), 7 surrounding connected dimension nodes (Academics, Skills, Attendance, Roadmap, Mentoring, Experience, Opportunities) with animated SVG lines, clickable dimension inspector, `[ SIMULATE FUTURE ]` ghost state integration (`CURRENT: 74%` vs `PROJECTED (SIMULATION): 86%`), `WHAT CHANGED?` timeline summary, `NEXT BEST ACTION` banner, and product architecture data pipeline diagram (`ERP DATA + STUDENT ACTIVITY + SKILLS + MENTOR FEEDBACK + AI ANALYSIS → STUDENT STATE → NEXT BEST ACTION`).
19. **Three-Book Gateway & Interactive Login UI**: Synchronized latest GitHub updates featuring ThreeUI Bestsellers Book Showcase adaptation for the authentication gateway ([`ThreeBookLoginGateway.tsx`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/frontend/src/components/ThreeBookLoginGateway.tsx)), role-based routing (Teacher / Faculty, Student, Admin), postMessage bridge, and dual login pathways (3D interactive book click + credential modal).
21. **Dedicated Role Book Login Flows & Direct Dashboard Access**: Upgraded the 3D book gateway and authentication subsystem ([`bestsellers-book-showcase.html`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/frontend/public/landing-pages/bestsellers-book-showcase.html), [`LoginPage.tsx`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/frontend/src/components/LoginPage.tsx), [`BestsellersBookShowcaseSection.tsx`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/frontend/src/components/BestsellersBookShowcaseSection.tsx), [`App.tsx`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/frontend/src/App.tsx)):
    - **Teacher & Faculty Book (`data-book="codex"`)**: Opening the Teacher book triggers the dedicated Teacher Login Page pre-configured with the `MENTOR` role, faculty identifier (`s.kulkarni@vit.edu.in` / `T101`), password input, unlocked dashboard feature preview, and direct sign-in routing straight to the **Teacher / Faculty Dashboard (`/mentor`)**.
    - **Student & Academic Book (`data-book="claude"`)**: Opening the Student book launches the dedicated Student Login Page pre-configured with the `STUDENT` role, roll number (`2023CSE001` / `101`), password input, unlocked feature highlights (75% attendance radar, AI career roadmap, future simulator), and single-click authentication to the **Student Dashboard (`/student`)**.
    - **Admin & Institutional Book (`data-book="cursor"`)**: Opening the Admin book opens the dedicated Admin Login Page pre-configured with the `ADMIN` role, institutional email (`admin@vit.edu.in`), and direct routing to the **Admin Dashboard & Institutional Suite (`/admin`)**.
    - Connected dynamic primary buttons (`Sign In as Teacher & Open Dashboard →`, `Sign In as Student & Open Dashboard →`, `Sign In as Admin & Open Dashboard →`), responsive postMessage bridges, quick-fill test account chips, and toast confirmation alerts upon login.
22. **Book Showcase Aesthetic Refinement & Palette Unification**: Polished [`bestsellers-book-showcase.html`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/frontend/public/landing-pages/bestsellers-book-showcase.html) to perfectly match the Campus 1 brand design system:
    - Set uniform warm parchment cream canvas (`#F5EFE6` / `#FAF7F0`) with refined subtle radial ambient glow.
    - Removed distracting background watermark text behind the books for a clean, ultra-premium editorial presentation.
    - Styled interactive controls, pill buttons, and close buttons in deep institutional navy (`#1E1B4B`) and warm gold (`#C9A674`) with smooth transitions.
    - Verified responsive 3D book physics, cover-opening animations, and embedded vintage portal login card across all viewports.
    - Removed automatic DOMContentLoaded book opening; books now strictly remain closed in the 3D gallery view until explicitly clicked by the user.
    - Removed overlay controls from the 3D book gateway view (Direct Access pill bar, redundant top back button, and floating AI widget on /login) for a clean, distraction-free visual experience.
23. **Master Presentation Deck (`ppt.md`) Generation**: Generated a comprehensive 20-slide presentation deck covering every feature, portal, function, architecture diagram, design specification, and presenter speaking script for Campus 1 / VIT Mumbai platform.
24. **Institutional Events & AI Event Recommendation Engine**: Fully implemented end-to-end event management and AI recommendation workflow:
    - **Backend Model & Storage**: Mongoose `Event` schema (`event.models.js`) storing event types (Workshop, Hackathon, Seminar, etc.), schedule, capacity, registration links, and rich `aiMetadata` (extracted skills, target domains, key topics, target audience level).
    - **Gemini AI Event Understanding**: Integrated `analyzeEventMetadata` in `aiService.js` to automatically extract normalized technical skills and concepts via Google Gemini with graceful fallback handling.
    - **Goal-Adaptive Recommendation Engine**: Multi-factor scoring in `event.controller.js` evaluating active student Goals, roadmap milestones, and specific roadmap tasks against event AI metadata to generate dynamic `relevanceScore` (0-98%) and specific `matchReason` explanations (e.g., "Matches your interest in PyTorch & Computer Vision from your AI Research Engineer roadmap").
    - **Mentor Event Management Portal**: Interactive faculty management suite (`EventManagement.tsx`) with modal creation/editing, live AI skill extraction feedback, search filters, and delete capabilities.
    - **Student Event Explorer & Dashboard Widget**: Dedicated student explorer (`StudentEventsPage.tsx`) with high-match filters, direct registration links, and dashboard top-match carousel (`RecommendedEventsSection.tsx`).


25. **Campus 1 Student Dashboard Goal Progress UI Restoration**:
    - Restored the earlier, rich multi-goal dashboard presentation in [`frontend/src/components/GoalProgressSection.tsx`](file:///c:/Users/HP/Desktop/project1/frontend/src/components/GoalProgressSection.tsx).
    - **Real Dynamic Data Source**: Directly binds to MongoDB Atlas through `studentGoalsApi.getGoals()`, `studentGoalsApi.toggleTask()`, `studentGoalsApi.setPrimaryGoal()`, and `studentGoalsApi.createGoal()`.
    - **Rich Visual Elements Restored**:
      - Dynamic Goal selector chips/tabs displaying real goals from MongoDB with automatic domain icons and `PRIMARY` badges.
      - Compact circular Overall Goal Progress gauge showing backend-calculated percentage and primary status.
      - Sequential vertical milestone timeline with connecting progress lines, step indicators, completion badges (`✓ Done`, `Active`), and percentage bars.
      - 2-Column Activity Connection panel: Completed Activities (`task.isCompleted === true`) vs Remaining Tasks (`task.isCompleted === false`) with interactive checkbox toggles that persist immediately to MongoDB.
      - Dashboard "+ Add Goal" modal to create new career goals and trigger AI roadmaps without navigating away.

26. **AI Student Profile Intelligence & Ranking System**:
    - **Architectural Separation**: Separated contextual AI evidence analysis (Google Gemini) from deterministic backend ranking calculation.
    - **Mongoose Model (`StudentProfileIntelligence`)**: Stores `overallScore`, `profileStrength` tier, `categoryScores` (Technical, Academic, Projects, Competitive, Engagement, Career Readiness), `strengths`, `improvementAreas`, `careerReadiness`, `evidence`, `confidence`, `profileCompleteness`, `profileDataHash`, `status`, and historical audit snapshots.
    - **Evidence Aggregator (`profileIntelligenceService.js`)**: Aggregates authentic evidence from `User` (skills, projects, competitions, certifications, CGPA), `Goal` (primary target role, roadmap milestones & tasks), `Attendance`, `Submission`, and `OnlineCourse`. Computes SHA-256 evidence hash for staleness detection.
    - **Contextual Gemini AI Evaluation**: Prompts Google Gemini with sanitized structured evidence to evaluate depth, difficulty, and relevance to target career roles, returning strict validated JSON.
    - **Deterministic Ranking Service (`rankingService.js`)**: Computes overall and category ranks, percentiles, and top percentage tiers (`Top 1%`, `Top 5%`, `Top 10%`, `Top 25%`) with deterministic secondary tie-breaking. Queries stored MongoDB scores with index-optimized projections, executing with 0 LLM latency.
    - **Frontend Experience (`StudentProfileIntelligencePage.tsx`, `ProfileIntelligenceSummaryWidget.tsx`)**: Full dashboard widget and full-page intelligence suite featuring score rings, multi-category progress meters, strengths/gaps breakdowns, "Why Your Rank Changed" explanations, interactive multi-category Leaderboards (Overall, Technical, Readiness, Projects, Academic) with search/filtering/pagination, and a Profile Evidence Editor.

---
*Document maintained automatically. Updated for Campus 1 release on GitHub.*

