---
name: design-engineering
description: Systematic frontend design engineering covering 4pt/8pt spatial grids, typographic scales, WCAG contrast compliance, responsive breakpoint layouts, and complete component state machines.
---

# Design Engineering Skill — Systematic UI Systems

Apply **Design Engineering** discipline to build robust, mathematically sound, accessible, and responsive user interfaces.

---

## 📐 Foundations Checklist

1. **4pt / 8pt Spatial Grid**:
   - `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `48px`, `64px`.
   - Never use arbitrary values like `p-[17px]` or `gap-[13px]`.
2. **Typography System**:
   - Primary: `Plus Jakarta Sans` / `Inter` / `Geist Sans`
   - Display: `Outfit` / `DM Serif Display`
   - Monospace: `JetBrains Mono` / `Geist Mono`
3. **Corner Radius Hierarchy**:
   - Inner pills: `rounded-lg` (`8px`)
   - Standard cards: `rounded-2xl` (`16px`)
   - Containers/modals: `rounded-3xl` (`24px`)
4. **State Machine Completeness**:
   - Implement `default`, `hover`, `active`, `focus-visible`, `loading`, `disabled`.
5. **Accessibility (WCAG AA)**:
   - Text contrast >= `4.5:1` (normal) and `7:1` (large).
   - High-contrast keyboard focus rings on all interactive elements.
