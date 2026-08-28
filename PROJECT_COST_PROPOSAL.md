# PROJECT COST PROPOSAL & INSTITUTIONAL QUOTATION

---

## 1. COVER PAGE

```
========================================================================================
                        INSTITUTIONAL TECHNOLOGY PROPOSAL
                  CAMPUS MANAGEMENT & AI-POWERED STUDENT SUCCESS PLATFORM
========================================================================================

PROJECT NAME:            [PROJECT NAME] (e.g., VITARA — Campus Intelligence Platform)
TARGET INSTITUTION:      [COLLEGE NAME] (e.g., Vidyalankar Institute of Technology, Mumbai)
DEPARTMENT:              [DEPARTMENT / FACULTY NAME] (e.g., Department of Computer Engineering / IT)
PREPARED BY:             [STUDENT DEVELOPMENT TEAM / TEAM LEAD NAME(S)]
STUDENT ROLL / ENROLL:   [STUDENT ROLL NO(S) / IDENTIFIER]
DOCUMENT VERSION:        Version [2.0.0]
DATE OF SUBMISSION:      [DATE] (e.g., August 23, 2026)
VALIDITY OF PROPOSAL:    [VALIDITY PERIOD] (e.g., 60 Days from Date of Submission)
SUBMITTED TO:            Head of Department / Principal / College Management Committee

========================================================================================
```

---

## 2. DOCUMENT INFORMATION

| Attribute | Specification |
| :--- | :--- |
| **Document Title** | Institutional Project Cost Proposal & Technical Roadmap |
| **Project Code** | `[PROJECT-CODE, e.g., VIT-CAMPUS-2026]` |
| **Author(s)** | `[STUDENT TEAM MEMBERS / LEAD DEVELOPERS]` |
| **Contact Email** | `[PRIMARY CONTACT EMAIL, e.g., student.team@vit.edu.in]` |
| **Contact Phone** | `[PRIMARY CONTACT PHONE, e.g., +91-XXXXXXXXXX]` |
| **Faculty Mentor / Guide** | `[FACULTY GUIDE NAME / DESIGNATION, e.g., Prof. Dr. S. Kulkarni]` |
| **Institutional Affiliation**| `[COLLEGE / UNIVERSITY NAME]` |
| **Document Classification** | Institutional Budgetary Proposal / Confidential Internal Document |

---

## 3. EXECUTIVE SUMMARY

This proposal outlines the deployment, custom feature development, and long-term maintenance of the **[PROJECT NAME]** — an institutional-grade, full-stack campus intelligence and mentorship ecosystem designed specifically for **[COLLEGE NAME]**.

The platform is designed and engineered directly by students of the institution. Consequently, the commercial pricing structure reflects a **subsidized student development rate** rather than a commercial software agency rate. No corporate overheads, agency profit margins, office rent, or corporate project management markups are charged to the institution.

### Key Financial Highlights:
* **Student Development Fee**: Fixed at **₹[5,000] per month** during the active implementation tenure.
* **Third-Party Infrastructure**: Separated entirely from development charges and billed strictly at actual provider costs or operated under verified free educational tiers.
* **Return on Investment for College**: Comprehensive digitization of student tracking, AI-powered academic advisory, verified ERP synchronization, and automated mentoring workflows at a fraction of commercial vendor licensing costs.

---

## 4. PROJECT OVERVIEW

The **[PROJECT NAME]** is a modern, unified web platform engineered to connect students, faculty mentors, and academic administrators in real time. It replaces fragmented paper-based reviews, spreadsheets, and disconnected notice boards with an integrated digital workflow.

### Core Portals Included:
1. **Student Portal**: Academic transcript monitoring, safe-to-miss lecture calculators, coursework submissions, faculty-curated external course feeds, dynamic skill radar, and an integrated AI career assistant.
2. **Mentor Portal**: Student mentee roster management, one-click request review with AI match scoring, lab assignment evaluation, and direct online course allocation (Stanford, MIT OCW, Coursera).
3. **Admin Portal**: Institutional telemetry, student/faculty account governance, department structure configuration, RAG document knowledge indexing, and simulated live ERP synchronization.
4. **Institutional AI Advisory Layer**: Document-grounded retrieval-augmented generation (RAG) providing accurate query answers based strictly on official college academic ordinances and examination schemes.

---

## 5. OBJECTIVES

1. **Centralize Mentoring Operations**: Automate student-faculty allocation, 1-on-1 meeting scheduling, and private mentoring audit logs.
2. **Mitigate Academic Defaulter Risks**: Provide dynamic safe-to-miss lecture calculators and automatic threshold alerts (<75% attendance) to prevent student detentions.
3. **Bridge Industry Skill Gaps**: Utilize an AI career roadmap engine to map student coursework and GitHub repositories against targeted technical job roles.
4. **Ensure Regulatory Compliance**: Align academic advisory strictly with college-approved autonomous syllabus ordinances and examination circulars.
5. **Cost-Effective Institutional Modernization**: Deliver an enterprise-grade digital solution without incurring commercial software recurring license fees.

---

## 6. EXISTING & PLANNED FEATURES

| Feature / Module | Description | Implementation Status |
| :--- | :--- | :--- |
| **Institutional Landing Hub** | Responsive landing page with interactive feature simulations, Bento grids, and announcement sections. | **Implemented** |
| **Secure Authentication** | Role-based JWT authentication with Bcrypt password hashing for Student, Mentor, and Admin roles. | **Implemented** |
| **Student Academic Dashboard** | Live CGPA trajectory curves, subject-wise attendance monitors, and dynamic metric visualizations. | **Implemented** |
| **Attendance & ERP Monitor** | Lecture percentage compliance trackers with calculated safe-miss thresholds and makeup request forms. | **Implemented** |
| **Coursework & Assignment Hub** | Multi-format lab submission pipeline with timestamp verification and late penalty warnings. | **Implemented** |
| **Mentor Allocation Engine** | 4-factor AI matching algorithm (Goals, Domain, Coursework, Department) with custom feedback notes. | **Implemented** |
| **External Course Allocator** | Faculty assignment of verified university online courses (Stanford, Harvard, MIT, Coursera) to mentees. | **Implemented** |
| **Institutional RAG Engine** | Vector document search grounded in college ordinances, placement handbooks, and academic bylaws. | **Implemented** |
| **Global AI Float Widget** | Draggable assistive chatbox with deep-thinking reasoning and token quota protections. | **Implemented** |
| **First-Login Onboarding** | Multi-step interactive configuration modals for customized student roadmaps and faculty research profiles. | **Implemented** |
| **Direct ERP Live API Sync** | Real-time bidirectional database connectors with existing college ERP database tables. | *Planned / In Progress* |
| **Automated Email / SMS Alerts**| Transactional email notifications for meeting approvals and low-attendance warnings. | *Planned* |
| **Mobile Application Wrapper**| Progressive Web App (PWA) / Hybrid mobile client for instant mobile access. | *Planned (Phase 7)* |

---

## 7. TECHNOLOGY & ARCHITECTURE OVERVIEW

```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|  React 18 | TypeScript 5.7 | Vite 6.0 | Tailwind CSS 3.4 | Framer Motion | Recharts  |
+-----------------------------------------------------------------------------------+
                                         │  (HTTPS / REST APIs / JWT)
                                         ▼
+-----------------------------------------------------------------------------------+
|                               APPLICATION BACKEND                                 |
|  Node.js (ESM) | Express 4.21 | Mongoose 9.9 | Token Budget Protections & Rate Limits|
+-----------------------------------------------------------------------------------+
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
+------------------------------------+   +------------------------------------------+
|          DATABASE LAYER            |   |           AI INTELLIGENCE LAYER          |
|  MongoDB Atlas Cluster / Cloud DB  |   |  Google Gemini API / Hugging Face RAG    |
|  (User Models, Submissions, ERP)   |   |  (Institutional Ordinance Vector Index)  |
+------------------------------------+   +------------------------------------------+
```

### Architecture Specifications:
* **Frontend Client**: Single Page Application built with React 18 and Vite, code-split into distinct vendor chunks (`vendor-react`, `vendor-motion`, `vendor-charts`, `vendor-icons`) for sub-second load times.
* **Serverless / Node Backend**: Express.js REST API structured with standard Controller-Service-Repository architecture and custom error middleware.
* **Database Engine**: Mongoose ODM on MongoDB Atlas with schema validation, indexes, and automated timestamping.

---

## 8. DEVELOPMENT SCOPE

The scope of work delivered by the student development team includes:

1. **System Analysis & Customization**: Tailoring all forms, grading schemes, and department structures to match `[COLLEGE NAME]` guidelines.
2. **Frontend UI/UX Implementation**: Building intuitive, accessible, and responsive user interfaces adhering to the college color palette and branding standards.
3. **Backend API Engineering**: Constructing endpoints for user authentication, mentee allocations, coursework submission tracking, and metrics calculation.
4. **Database Design & Schema Migration**: Structuring collections for students, mentors, assignments, attendance logs, and system audit logs.
5. **AI RAG Indexing**: Parsing institutional PDFs (ordinances, syllabi, exam schemes) into vector chunks for context-grounded AI responses.
6. **Deployment & DevOps Configuration**: Setting up cloud hosting, build automation scripts, environment variable security, and SSL certificates.
7. **Technical Documentation**: Providing comprehensive API references, administration manuals, and database backup guides.

---

## 9. DEVELOPMENT PHASES & TIMELINE

All student engineering effort across the project phases is consolidated under the flat monthly student development fee.

| Phase | Milestone & Deliverables | Estimated Duration | Development Fee |
| :--- | :--- | :--- | :--- |
| **Phase 1: Planning & System Specification** | Requirement gathering with HOD/Faculty, database schema design, architecture finalization. | `[2 Weeks]` | *Covered in Monthly Charge* |
| **Phase 2: UI/UX & Client-Side Portals** | Student, Mentor, and Admin portal interfaces, responsive design, data visualization charts. | `[4 Weeks]` | *Covered in Monthly Charge* |
| **Phase 3: Backend APIs & Database Setup** | Express server development, MongoDB collection seeding, attendance/CGPA calculation engines. | `[3 Weeks]` | *Covered in Monthly Charge* |
| **Phase 4: AI RAG & Mentoring Store** | Institutional ordinance vector indexing, Gemini AI integration, real-time sync store. | `[3 Weeks]` | *Covered in Monthly Charge* |
| **Phase 5: Quality Assurance & Security** | Security audit, role permission verification, load testing, input sanitization testing. | `[2 Weeks]` | *Covered in Monthly Charge* |
| **Phase 6: Production Staging & Deployment** | Custom domain configuration, HTTPS provisioning, database backup configuration, user onboarding. | `[2 Weeks]` | *Covered in Monthly Charge* |
| **Phase 7: Active Maintenance & Improvements** | Bug resolution, minor feature iterations, operational faculty/student technical support. | `[Ongoing / Tenure]` | *Covered in Monthly Charge* |

*Note: Phase durations are indicative and can be tailored to align with academic semester schedules.*

---

## 10. STUDENT DEVELOPMENT COST

This project is undertaken directly by enrolled students of the institution. The pricing reflects a **subsidized institutional development rate** created exclusively for **[COLLEGE NAME]**.

```
========================================================================================
                              STUDENT DEVELOPMENT FEE
========================================================================================

  Monthly Student Development & Service Rate:         ₹[5,000] / month
  Proposed Active Development Duration:               [X Months, e.g., 6 Months]
  --------------------------------------------------------------------------------------
  TOTAL ESTIMATED STUDENT DEVELOPMENT CHARGE:         ₹[X × 5,000, e.g., ₹30,000]

========================================================================================
```

> **Pricing Clarification**:  
> This charge exclusively compensates the student developers for active development, maintenance, and technical support. It does not include agency profit margins, sales commissions, or administrative overheads.

---

## 11. THIRD-PARTY INFRASTRUCTURE & OPERATIONAL EXPENSES

Third-party infrastructure expenses represent genuine operational costs paid directly to cloud and service vendors. **These costs are entirely separate from student development charges and contain zero markup.**

| Category | Recommended Service Provider | Purpose | Billing Cycle | Estimated Cost (INR) |
| :--- | :--- | :--- | :--- | :--- |
| **Domain Registration** | College Subdomain (`campus.vit.edu.in`) or `.in` / `.edu.in` | Official website URL | Annual | **₹0** (Existing Subdomain) / `₹[800–1,200]` |
| **Frontend & Web Hosting** | Vercel Pro / Render / Cloudflare Pages | Web application hosting, global CDN, automated deployments | Monthly / Annual | **₹0** (Free Tier) / `₹[1,500/mo]` for Enterprise |
| **Production Database** | MongoDB Atlas (Shared / Dedicated M10) | Cloud database storage for user records, submissions, metrics | Monthly / Annual | **₹0** (M0 Free Tier) / `₹[1,800/mo]` (M10 Prod) |
| **Document / Cloud Storage**| AWS S3 / Cloudinary / Supabase Storage | Student assignment submissions, lab records, profile photos | Usage-based | **₹0** (Free Tier up to 5GB) / `₹[500/mo]` |
| **Transactional Email** | Resend / SendGrid / Amazon SES | Password resets, meeting alerts, low-attendance notices | Usage-based | **₹0** (Free Tier: 3,000 emails/mo) / `₹[800/mo]` |
| **SMS / OTP Gateway** | Fast2SMS / Twilio (Optional) | Multi-factor authentication & critical SMS broadcasts | Usage-based | *Optional* — `₹[0.25/SMS]` (Usage-based) |
| **AI LLM API Tokens** | Google Cloud / Gemini 2.5 Flash / HuggingFace | Institutional RAG queries & AI career advisory | Usage-based | **₹0** (Free Tier RPM) / `₹[500–1,000/mo]` |
| **Database Backups** | Automated Daily Snapshot System | Offsite disaster recovery and database snapshots | Monthly | **₹0** (Included with Cloud DB) |
| **SSL / HTTPS Certificate** | Let's Encrypt / Cloudflare SSL | 256-bit encryption for all student and faculty data | Annual | **₹0** (Provided Free via Hosting/CDN) |
| **Uptime Monitoring** | BetterStack / UptimeRobot | 24/7 server health and latency telemetry | Monthly | **₹0** (Free Tier: 50 monitors) |

> **Cost Optimization Note**:  
> In the initial rollout and pilot phase, the platform can be hosted completely under verified **Free / Academic Tiers (₹0 Third-Party Cost)**. Upgrades to paid infrastructure can be undertaken gradually as user traffic scales.

---

## 12. FIRST-YEAR COST SUMMARY

Below is an editable consolidated financial summary separating development fees from estimated infrastructure expenses:

| Budget Category | Description | Billing Basis | Estimated First-Year Cost |
| :--- | :--- | :--- | :--- |
| **A. Student Development** | Full-stack engineering, customization, testing, and support | ₹[5,000] / month × `[12 Months]` | `₹[60,000]` *(Editable: [X × ₹5,000])* |
| **B. Domain Name** | College Subdomain or Dedicated Institutional Domain | Annual | `₹[0]` *(Subdomain) / `₹[1,000]`* |
| **C. Cloud Hosting Server** | Web application hosting and high-speed CDN | Annual | `₹[0]` *(Free Tier) / `₹[12,000]`* |
| **D. Cloud Database Engine** | MongoDB Atlas Cloud Cluster | Annual | `₹[0]` *(Shared) / `₹[15,000]`* |
| **E. Cloud Asset Storage** | Assignment files and document repository | Usage-based | `₹[0]` *(Up to 5GB) / `₹[3,000]`* |
| **F. Email / SMS Services** | Transactional email & notification pipeline | Usage-based | `₹[0]` *(Free Tier) / `₹[2,500]`* |
| **G. AI Query Tokens** | Google Gemini API institutional vector queries | Usage-based | `₹[0]` *(Free Tier) / `₹[4,000]`* |
| **H. SSL & Security** | Automated HTTPS certificate and threat filtering | Annual | **₹0** *(Free via Let's Encrypt)* |
| **ESTIMATED FIRST-YEAR TOTAL** | **Consolidated Development & Operational Budget** | **Annual** | **₹[60,000] – ₹[97,500]** |

### Clear Fund Allocation Breakdown:
* **Money Allocated to Student Development Team**: `₹[Total Development Charge, e.g., ₹60,000]`
* **Money Paid Directly to Third-Party Service Providers**: `₹[Actual Infrastructure Bills, e.g., ₹0–₹37,500]`

---

## 13. SECURITY & DATA PROTECTION

The platform adheres to industry-standard security best practices appropriate for higher-education digital platforms:

1. **Role-Based Access Control (RBAC)**: Strict permission boundaries ensuring Students cannot access mentor grading consoles, and Mentors cannot modify administrative system configurations.
2. **Encrypted Credentials**: Passwords hashed using standard `Bcrypt` cryptographic algorithms with salted rounds. Sensitive authentication tokens signed using `JSON Web Tokens (JWT)`.
3. **Environment Variable Isolation**: Zero hardcoded API keys, database credentials, or secret keys in source code; managed strictly via `.env` injection on the hosting provider.
4. **Input Sanitization & Injection Defense**: Comprehensive API input validation and automated XML sanitization tags around user prompts to defend against prompt-injection attacks on the AI engine.
5. **Transport Layer Security (HTTPS)**: Enforced SSL/TLS encryption across all client-server communications to prevent man-in-the-middle data interception.
6. **Automated Backup Strategy**: Scheduled daily database dumps to ensure recovery in the event of unexpected hardware or service failure.

> *Note: The platform follows reasonable, industry-standard security safeguards. No digital system can guarantee absolute invulnerability, but standard academic compliance and data protection practices are strictly implemented.*

---

## 14. HOSTING & DEPLOYMENT STRATEGY

The application is pre-configured with a unified monorepo deployment architecture:

* **Production Environment**: Serverless edge infrastructure on Vercel / Render / Cloudflare Pages.
* **Custom Domain Mapping**: Pre-configured routing files (`vercel.json`, `_redirects`) supporting custom subdomains such as `https://[SUBDOMAIN].[COLLEGE].edu.in`.
* **Zero Downtime Updates**: Git-integrated continuous integration / continuous deployment (CI/CD) enabling seamless updates with zero service disruption to students or faculty.

---

## 15. MAINTENANCE & STUDENT SUPPORT

### A. During Student College Tenure
The student development team will provide continuous, hands-on operational assistance, including:
* Rapid bug fixes and interface adjustments.
* Assistance with semester-wise student roster uploads and faculty mentor allocations.
* Continuous updates to syllabus RAG indexes as new academic circulars are released.
* Routine database health checks, log monitoring, and optimization.
* Hands-on orientation workshops for faculty mentors and department coordinators.

### B. Post-Graduation / Long-Term Maintenance Arrangement
Prior to graduation of the core development team, the following options are available for long-term platform continuity:
1. **Junior Student Handover**: Structured codebase handover and training provided to a designated junior student tech committee.
2. **College IT Department Handover**: Full documentation, deployment keys, and codebase handover to the college internal IT staff.
3. **External Maintenance Agreement**: Optional ongoing maintenance arrangement to be discussed and mutually agreed upon with college management.

---

## 16. SCALABILITY & FUTURE EXPANSION

The platform is designed with modularity to accommodate future institutional growth:

1. **Increased User Records**: Schema indexing capable of scaling smoothly to support thousands of active student and alumni records.
2. **Multi-Department Expansion**: Easily configurable hierarchies for Engineering, Management, Polytechnic, and Postgraduate programs.
3. **Mobile Client Integration**: Modular REST APIs capable of powering future native iOS and Android mobile applications.
4. **External Exam Body Integration**: Architecture prepared for integration with University exam portals and external accreditation compliance software (e.g., NAAC / NBA criteria metrics).

---

## 17. SOFTWARE OWNERSHIP & FUTURE INSTITUTIONAL LICENSING

To ensure clear legal and intellectual clarity for both the institution and the student developers, the following ownership framework is proposed:

1. **College Data Ownership**: All institutional data, student academic records, faculty notes, attendance logs, and college-specific documents remain the **exclusive, confidential property of [COLLEGE NAME]**.
2. **Institutional Deployment Rights**: **[COLLEGE NAME]** receives full, perpetual rights to use, customize, and operate its deployed platform instance.
3. **Reusable Framework & Intellectual Property**: The underlying generic platform architecture, custom reusable UI components, and software algorithms developed by the student team remain the intellectual property of the student developers.
4. **Multi-College Deployments**: The student development team reserves the right to adapt and license generic, non-confidential platform frameworks to other educational institutions, provided **no proprietary content, branding, or private student data of [COLLEGE NAME] is ever shared or repurposed**.
5. **Formal Agreement**: Final licensing and data terms shall be formalized in a memorandum of understanding (MoU) or agreement signed by both authorized parties.

---

## 18. PAYMENT STRUCTURE

The institution may choose between two straightforward payment options:

### Option 1: Monthly Development Retainer (Recommended)
* **Monthly Fee**: **₹[5,000]** billed at the end of each active development/support month.
* **Duration**: `[X Months, e.g., 6 Months]` as required by the college.

### Option 2: Milestone-Based Payment Structure
* **Milestone 1 — Project Initiation & Environment Setup (20%)**: `₹[Amount, e.g., ₹6,000]`
* **Milestone 2 — Portal Customization & ERP Data Integration (30%)**: `₹[Amount, e.g., ₹9,000]`
* **Milestone 3 — Beta Deployment & Faculty Review (30%)**: `₹[Amount, e.g., ₹9,000]`
* **Milestone 4 — Final Production Launch & Handover (20%)**: `₹[Amount, e.g., ₹6,000]`

*Direct third-party infrastructure fees (hosting, cloud database) shall be reimbursed or paid directly by the college accounting department upon invoice generation.*

---

## 19. ASSUMPTIONS & EXCLUSIONS

### Project Assumptions:
1. The college will provide necessary academic ordinances, syllabi, and sample student/mentor rosters in standard spreadsheet or PDF formats.
2. If integration with the college ERP database is required, appropriate read-access API endpoints or sanitized database views will be facilitated by the college IT department.
3. The college administration will designate a single point of contact (SPOC) or faculty coordinator for timely feedback and approvals.

### Exclusions:
1. Procurement of college hardware (laptops, on-premise physical servers, barcode scanners).
2. Third-party vendor subscription fees (which remain direct institutional obligations).
3. Legal compliance fees or external proprietary software licenses not specified in this document.

---

## 20. PROPOSED TERMS

1. **Commencement Date**: Work shall commence within `[7 Days]` of formal administrative approval.
2. **Review Cycles**: Fortnightly demonstration and progress reviews with the department coordinator.
3. **Modifications**: Any major features outside the documented scope will be mutually evaluated for timeline impact.
4. **Confidentiality**: Both parties agree to maintain the confidentiality of student records and proprietary methodologies.

---

## 21. APPROVAL & SIGNATURES

By signing below, the authorized representatives acknowledge acceptance of this project proposal, development scope, and associated cost structure.

### For the Student Development Team:

| Signature | Name | Designation / Roll No | Date |
| :--- | :--- | :--- | :--- |
| ____________________ | `[STUDENT LEAD 1 NAME]` | Lead Developer (`[ROLL NO]`) | `[DATE]` |
| ____________________ | `[STUDENT LEAD 2 NAME]` | Full-Stack Developer (`[ROLL NO]`) | `[DATE]` |

### For the Institution ([COLLEGE NAME]):

| Signature | Name | Designation | Date |
| :--- | :--- | :--- | :--- |
| ____________________ | `[FACULTY COORDINATOR / GUIDE]` | Project Guide / Faculty Coordinator | `[DATE]` |
| ____________________ | `[HEAD OF DEPARTMENT]` | Head of Department (`[DEPARTMENT]`) | `[DATE]` |
| ____________________ | `[PRINCIPAL / MANAGEMENT]` | Principal / College Authority | `[DATE]` |

---
*Document prepared with institutional integrity. Configured for print export and administrative submission.*
