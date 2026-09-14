---
name: minimalist-ui
description: Build sleek, ultra-clean, minimalist web interfaces with subtle animations inspired by Linear, Vercel, Apple, and Geist design systems. Features crisp typography, refined micro-borders, buttery hover states, and uncluttered layouts.
---

# Minimalist UI — Linear & Vercel Aesthetic Web Design Skill

Apply **Minimalist UI** design patterns inspired by **Linear**, **Vercel**, and **Apple** to create exceptionally clean, fast, and elegant interfaces with subtle, purpose-driven micro-animations.

---

## 📐 Core Minimalist Design Principles

1. **Radical Clarity & Whitespace**: Prioritize whitespace and hierarchical spacing over decorative clutter.
2. **Subtle Micro-Borders**: Use ultra-thin `1px` low-opacity borders (`border-black/[0.08]` in light mode, `border-white/[0.08]` in dark mode).
3. **Monochrome Palette with Deliberate Accent**: Dominated by slate/neutral grays (`#000000`, `#0A0A0A`, `#171717`, `#F5F5F5`, `#FFFFFF`) with an intentional accent color.
4. **Vercel / Linear Easing**: Smooth, non-distracting motion curves (`[0.16, 1, 0.3, 1]` or springs with `stiffness: 350, damping: 30`).
5. **Keybinding Indicators (`kbd`)**: Subtle keyboard shortcut pills (`⌘K`, `Esc`, `↵`).

---

## 🎨 Production Component Recipes (React + Tailwind + Framer Motion)

### 1. Minimalist Linear-Style Feature Card with Micro-Glow

```tsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export function MinimalFeatureCard({
  title,
  description,
  tag,
  icon,
  className = "",
}: {
  title: string;
  description: string;
  tag?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-neutral-950 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-300 hover:border-black/[0.15] dark:hover:border-white/[0.15] ${className}`}
    >
      {/* Subtle top edge shimmer */}
      <div
        className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-900/20 dark:via-white/30 to-transparent transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="flex items-center justify-between mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.06] dark:border-white/[0.06] bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
          {icon}
        </div>
        {tag && (
          <span className="font-mono text-[11px] font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded border border-black/[0.04] dark:border-white/[0.04]">
            {tag}
          </span>
        )}
      </div>
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">{title}</h3>
      <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
```

---

### 2. Vercel-Style Sliding Indicator Navigation Tabs

```tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export function MinimalNavTabs({
  items,
  defaultIndex = 0,
  onSelect,
}: {
  items: string[];
  defaultIndex?: number;
  onSelect?: (index: number) => void;
}) {
  const [activeIdx, setActiveIdx] = useState(defaultIndex);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-black/[0.06] dark:border-white/[0.06] bg-neutral-50 dark:bg-neutral-900/70 p-1">
      {items.map((item, idx) => {
        const isActive = activeIdx === idx;
        const isHovered = hoveredIdx === idx;

        return (
          <button
            key={item}
            onClick={() => {
              setActiveIdx(idx);
              onSelect?.(idx);
            }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors rounded-md ${
              isActive
                ? "text-neutral-900 dark:text-neutral-100"
                : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
            }`}
          >
            {/* Hover Background */}
            {isHovered && !isActive && (
              <motion.div
                layoutId="nav-hover"
                className="absolute inset-0 rounded-md bg-neutral-200/50 dark:bg-neutral-800/50"
                transition={{ duration: 0.15 }}
              />
            )}
            {/* Active Pill */}
            {isActive && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 rounded-md bg-white dark:bg-neutral-800 shadow-sm border border-black/[0.04] dark:border-white/[0.06]"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10">{item}</span>
          </button>
        );
      })}
    </div>
  );
}
```

---

### 3. Animated Copy-To-Clipboard Pill Button

```tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CopySnippetButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group inline-flex items-center gap-2 rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-neutral-50 dark:bg-neutral-900 px-3 py-1.5 font-mono text-xs text-neutral-700 dark:text-neutral-300 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800"
    >
      <span>{textToCopy}</span>
      <span className="flex h-4 w-4 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="text-emerald-500 font-bold"
            >
              ✓
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-200"
            >
              ⧉
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}
```

---

### 4. Pure Minimal Skeleton Shimmer Loader

```tsx
export function MinimalSkeleton({ className = "h-4 w-full" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-neutral-200/70 dark:bg-neutral-800/70 ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
    </div>
  );
}
```

---

## 💡 Best Practices
* **Avoid Visual Noise**: Never add shadows or borders purely for decoration; every border should define a logical boundary.
* **Typographic Restraint**: Restrict font weights to `regular (400)`, `medium (500)`, and `semibold (600)` with crisp negative tracking (`tracking-tight`).
