# 🎨 VITARA 2.0 — Poster Design Specification (`DESIGN_SPEC.md`)

> **Master Canva Import & Design Specification for Academic Capstone Poster**
> 
> *Target Size: A1 Landscape (841 mm × 594 mm) | Print Resolution: 300 DPI (3508 × 2480 px)*

---

## 📐 1. Poster Dimensions & Safe Margins

| Property | Value (Metric / Print) | Value (Digital Canvas / SVG) |
|---|---|---|
| **Format** | ISO 216 Standard A1 Landscape | Aspect Ratio 1.414:1 (Landscape) |
| **Width** | 841 mm | 3,508 px (at 300 DPI) |
| **Height** | 594 mm | 2,480 px (at 300 DPI) |
| **Safe Outer Margin** | 14.4 mm | 60 px |
| **Inner Working Area** | 812.2 mm × 565.2 mm | 3,388 px × 2,360 px |
| **Column Grid** | 3-Column Bento Layout | Left: 1020px \| Center: 1288px \| Right: 1020px |
| **Column Gutters** | 7.2 mm | 30 px – 70 px |

---

## 🎨 2. Institutional Color Palette & Hex Tokens

All color tokens adhere strictly to the **Vidyalankar Institute of Technology (VIT Mumbai)** institutional branding palette:

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Midnight Navy   │  │Institutional Gold│  │    Warm Cream    │  │   Accent Blue    │
│     #0C2238      │  │     #C99632      │  │     #FAF7F0      │  │     #244F7D      │
└──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘
```

### Complete Hex Reference Table

| Role / Element | Color Name | HEX Code | RGB / Alpha | Usage in Canva |
|---|---|---|---|---|
| **Primary Header & Accents** | Deep Midnight Navy | `#0C2238` | `rgb(12, 34, 56)` | Header banner, card title banners, primary headings |
| **Header Gradient Start** | Institutional Dark Navy | `#081A2C` | `rgb(8, 26, 44)` | Dark gradient foundation |
| **Header Gradient End** | Deep Slate Navy | `#143656` | `rgb(20, 54, 86)` | Header right gradient flourish |
| **Institutional Accent Gold** | Primary Gold | `#C99632` | `rgb(201, 150, 50)` | Borders, highlights, badges, formula boxes |
| **Radiant Gold Accent** | Light Gold | `#E5C06E` | `rgb(229, 192, 110)` | Subheadings, high-contrast text on navy |
| **Poster Canvas Surface** | Warm Cream Background | `#FAF8F5` | `rgb(250, 248, 245)` | Global poster backdrop |
| **Card Surface** | Pure Ivory Card | `#FFFFFF` / `#FCFAF6` | `rgb(255, 255, 255)` | Content card containers (95% opacity) |
| **Secondary Accent** | Soft Blue | `#244F7D` | `rgb(36, 79, 125)` | Secondary tags, tech highlights |
| **Success Indicator** | Emerald Green | `#10B981` / `#059669` | `rgb(16, 185, 129)` | 96.4% match badges, verified icons |
| **Warning / Attention** | Amber / Gold | `#F59E0B` / `#D97706` | `rgb(245, 158, 11)` | Mentorship and workload highlights |
| **Alert / Statutory** | Coral Crimson | `#EF4444` / `#DC2626` | `rgb(239, 68, 68)` | Problem bottleneck badges, prompt guards |
| **Primary Body Text** | Slate Charcoal | `#0F172A` / `#334155` | `rgb(15, 23, 42)` | High-readability body copy |
| **Muted Meta Text** | Cool Slate | `#64748B` / `#94A3B8` | `rgb(100, 116, 139)` | Captions, secondary timestamps, tags |

---

## 🔤 3. Typography & Canva Font Mapping

The poster is constructed using standard web fonts available natively in **Canva**, **Google Fonts**, and Adobe Fonts.

| Role in Poster | Recommended Font in Canva | Direct Alternative in Canva | Fallback System Font | Font Size in Poster (px) | Font Weight |
|---|---|---|---|---|---|
| **Poster Title ("VITARA 2.0")** | **Outfit** | Montserrat / Poppins | Arial Black | `64 px` | 900 (Black) |
| **Institutional College Header** | **Outfit** | Montserrat | Segoe UI Bold | `24 px` | 700 (Bold) |
| **Section Card Headers** | **Outfit** | Poppins / Montserrat | Trebuchet MS | `20 px` | 800 (ExtraBold) |
| **Subheadings & Feature Titles** | **Outfit** | Inter / Montserrat | Helvetica Neue | `16 px – 18 px` | 700 (Bold) |
| **Hero Metric Numbers (96.4%, etc.)**| **Outfit** | Montserrat Classic | Arial | `52 px` | 900 (Black) |
| **Body Text & Explanations** | **Inter** | Plus Jakarta Sans / Roboto | Segoe UI / Arial | `14 px – 16 px` | 400 (Regular) |
| **Formula & Math Expressions** | **Outfit** / Consolas | Montserrat / Courier | Courier New | `20 px` | 700 (Bold) |
| **Code / URLs / Tech Tags** | **Consolas** | Space Mono / Anonymous Pro | Courier | `13 px` | 600 (SemiBold) |
| **Footer & Disclaimers** | **Inter** | Outfit / Roboto | Segoe UI | `15 px – 16 px` | 500 (Medium) |

---

## 🏗️ 4. Layout & Bento Grid Structure

The poster utilizes a structured **3-Column Bento Architecture** optimized for academic project evaluation:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             HEADER: VIT MUMBAI • VITARA 2.0 • AUTHORS & GUIDE                   │
├───────────────────────────────┬──────────────────────────────────┬───────────────────────────────┤
│ COLUMN 1 (Width: 1020px)      │ COLUMN 2 (Width: 1288px)         │ COLUMN 3 (Width: 1020px)      │
│                               │                                  │                               │
│ 1. Institutional Challenge    │ 4. 4-Factor AI Mentorship Engine │ 7. Design System & UI/UX      │
│    • Fragmented ERP           │    • Formula & Optimization      │    • Navy/Gold Palettes       │
│    • Manual Mismatch          │    • 4 Criteria Breakdown        │    • 4-Tier Glassmorphism     │
│    • Static Knowledge Base    │    • Live Match Simulation       │                               │
│                               │                                  │ 8. Performance Metrics        │
│ 2. Technology Stack           │ 5. Grounded RAG Knowledge Base   │    • 96.4% Match Accuracy     │
│    • React 18 + Vite + TS     │    • Vector Pipeline             │    • <142ms RAG Latency       │
│    • Node + MongoDB Atlas     │    • Prompt Security Guards      │    • 60% Bundle Reduction     │
│    • Gemini Flash + HF        │    • Interactive Chat Demo       │    • 100% Attendance Track    │
│                               │                                  │                               │
│ 3. System Architecture Flow   │ 6. Triple Enterprise Portals     │ 9. Live QR Access & Demo      │
│    • Presentation ➔ Gateway   │    • Student Suite (14 tabs)     │    • Vector QR Code           │
│    • Core Service ➔ Atlas/AI  │    • Mentor Suite (12 tabs)      │    • GitHub & Vercel URL      │
│                               │    • Admin Suite (17 tabs)       │    • Acknowledgements         │
├───────────────────────────────┴──────────────────────────────────┴───────────────────────────────┤
│                             FOOTER: ACCREDITATION • ADDRESS • COPYRIGHT                         │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📥 5. How to Import and Edit in Canva

Follow these 4 simple steps to open, customize, and edit the poster in Canva:

### Step 1: Upload the SVG
1. Open your browser and go to [Canva.com](https://www.canva.com/).
2. Click **Create a design** (top right) ➔ Select **Import file** (or drag and drop [`poster.svg`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/poster.svg) directly onto the Canva dashboard).
3. Canva will automatically parse the SVG into native, individual vector components and editable text elements.

### Step 2: Selecting and Modifying Text
* Every text label (such as Student Roll Numbers, Guide Names, Problem Statements, and Technology Badges) is an independent `<text>` element.
* **Double-click any text box** to change names, add team member names, or update project URLs.
* If a font appears slightly different, select the text and choose **Outfit**, **Inter**, or **Montserrat** from Canva's font dropdown.

### Step 3: Moving and Resizing Shapes
* Every card container, metric bubble, and diagram box is a discrete vector shape with rounded corners (`rx="16"`).
* You can ungroup (`Ctrl + Shift + G` / `Cmd + Shift + G`), re-color with Canva's color picker, or rearrange sections.

### Step 4: Exporting for Printing
* For final poster submission or physical printing at a flex/print shop:
  - Click **Share** (top right) ➔ **Download**.
  - File type: **PDF Print** (highest quality).
  - Check **Crop marks and bleeds** if requested by your print vendor.
  - Color profile: **RGB** (digital presentation) or **CMYK** (professional offset print).

---

## 📦 6. Deliverable Asset Index

| File Name | Format | Purpose | Editability |
|---|---|---|---|
| [`poster.svg`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/poster.svg) | Scalable Vector Graphics (A1) | **Primary Canva Import Deliverable** | 100% Vector & Native Text Editable |
| [`poster.pdf`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/poster.pdf) | Vector PDF Document (A1) | Secondary Print & High-Res Submission | Print-Ready & Vector Preserved |
| [`poster_preview.png`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/poster_preview.png) | High-Resolution Raster Image | Quick Visual Verification & Web Preview | Flattened Reference Image |
| [`DESIGN_SPEC.md`](file:///c:/Users/Krishna%20Singh/Desktop/VIT/project%202..0/DESIGN_SPEC.md) | Markdown Specification | Complete Design System Blueprint | Technical Documentation |
