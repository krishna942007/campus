# 🎨 DESIGN.md — Systematic Design Engineering & Architecture

> **Master Guide for Visual Hierarchy, Spatial Rhythm, Typography, Color Systems, and Layout Engineering.**

---

## 🏛️ 1. Spatial Rhythm & Grid Foundations

### The 4pt / 8pt Dimensional Grid
All spacing, padding, margins, dimensions, and line-heights MUST strictly adhere to 4px/8px multiples:
* **Micro Spacing**: `2px` (micro offset), `4px` (`gap-1`, `p-1`), `8px` (`gap-2`, `p-2`)
* **Standard Component Spacing**: `12px` (`p-3`), `16px` (`p-4`), `20px` (`p-5`), `24px` (`p-6`)
* **Section & Layout Spacing**: `32px` (`p-8`), `48px` (`p-12`), `64px` (`py-16`), `96px` (`py-24`)

### Container Geometry & Breakpoints
* **Max Content Width**: `max-w-7xl` (`1280px`) for dashboards; `max-w-5xl` (`1024px`) for editorial/article views; `max-w-md` (`448px`) for auth modals.
* **Gutters**: Mobile `px-4`, Tablet `px-6`, Desktop `px-8`.
* **Corner Radius Rhythm**:
  - Inner elements (buttons, badges, inputs): `rounded-lg` (`8px`) or `rounded-xl` (`12px`)
  - Intermediate cards: `rounded-2xl` (`16px`)
  - Parent containers/modals: `rounded-3xl` (`24px`)
  - *Rule*: Never let an inner child radius exceed the parent container's corner radius!

---

## ✍️ 2. Typographic Hierarchy & Pairing Systems

### Font Stack Hierarchy
1. **Primary UI Body & Interactive**: `Plus Jakarta Sans`, `Inter`, or `Geist Sans`
2. **Display & Hero Headings**: `Outfit`, `Cabinet Grotesk`, or `Clash Display`
3. **Editorial & High-End Accents**: `DM Serif Display`, `Playfair Display`, or `Instrument Serif`
4. **Code, Metrics & Badges**: `JetBrains Mono`, `Geist Mono`, or `Fira Code`

### Scale & Tracking Matrix
| Level | Font Size | Line Height | Tracking | Weight | Recommended Use |
|---|---|---|---|---|---|
| **Display Hero** | `3rem - 4.5rem` (`text-5xl` to `text-7xl`) | `1.05 - 1.1` (`leading-[1.1]`) | `tracking-tight` / `-0.03em` | `700 / 800` | Landing Page Hero |
| **Section Title** | `1.875rem - 2.25rem` (`text-3xl` to `text-4xl`) | `1.2` (`leading-tight`) | `tracking-tight` / `-0.02em` | `700` | Major Section Header |
| **Card / Modal Title** | `1.125rem - 1.25rem` (`text-lg` to `text-xl`) | `1.35` (`leading-snug`) | `tracking-normal` / `-0.01em` | `600` | Component Header |
| **Body Large** | `1rem` (`text-base`) | `1.6` (`leading-relaxed`) | `tracking-normal` | `400 / 500` | Introductory paragraphs |
| **Body Standard** | `0.875rem` (`text-sm`) | `1.5` (`leading-normal`) | `tracking-normal` | `400 / 500` | Dashboard cards, tables |
| **Caption & Badges** | `0.75rem` (`text-xs`) | `1.4` | `tracking-wide` / `uppercase` | `600 / 700` | Metadata, tags, metrics |

---

## 🎨 3. Color Harmony & Surface Token System

### Layered Surface Hierarchy (Light & Dark)
```
Level 0: Canvas Base       (Light: #F7F4EE / Dark: #080B10)
   └── Level 1: Glass/Card (Light: #FFFFFF/10 / Dark: #0F172A/60)
         └── Level 2: Sub-Card/Input (Light: #FFFCF7/60 / Dark: #1E293B/80)
               └── Level 3: Popover/Modal (Light: #FFFFFF / Dark: #0F172A)
```

### Contrast & Border Discipline
* **Subtle Rim Borders**: `1px solid rgba(0,0,0,0.06)` (Light) or `1px solid rgba(255,255,255,0.08)` (Dark).
* **Text Contrast**: Text over light backgrounds must have a minimum contrast ratio of `4.5:1` (WCAG AA) and `7:1` for body paragraphs.
* **Color Usage Rule**: 60% Dominant Neutral, 30% Secondary/Surface, 10% Accent/Action.

---

## 🧩 4. Component Anatomy & States

Every interactive element MUST implement all 6 interactive states:
1. **Default / Idle**: Balanced, legible, clear affordance.
2. **Hover**: Smooth elevation (`-translate-y-0.5`), surface brightening, or subtle glowing border.
3. **Active / Pressed**: Tactile compression (`scale-[0.98]` or `translate-y-px`).
4. **Focus-Visible**: Two-color accessible ring (`ring-2 ring-primary ring-offset-2`).
5. **Loading / Pending**: Skeleton pulse or spinner with preserved dimensions (no layout shift).
6. **Disabled**: Reduced opacity (`opacity-50 pointer-events-none cursor-not-allowed`).

---

## 📱 5. Responsive Engineering & Adaptive Layouts

* **Mobile-First Layouts**: Columns stack on mobile (`grid-cols-1`) and expand gracefully (`sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`).
* **Touch Target Sizing**: All clickable buttons, pills, and inputs must have a minimum target of `44px x 44px` on mobile.
* **Zero Horizontal Scroll**: Strictly verify `overflow-x-hidden` on full-width sections.
