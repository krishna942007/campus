---
name: smooth-ui
description: Build ultra-smooth, physics-based, fluid micro-interactions and tactile UI components using Smooth UI design patterns. Includes magnetic cursor elements, spring morphing tabs, fluid accordions, elastic drag drawers, and kinetic scroll controls.
---

# Smooth UI — Fluid Micro-Interactions & Spring Physics Skill

Apply **Smooth UI** principles to give web applications an organic, tactile, and responsive feel using physics-driven springs, magnetic cursor attraction, layoutId morphing, and elastic transitions.

---

## 🌊 Core Smooth UI Principles

1. **Spring Physics Over Easing Curves**: Use mass, stiffness, and damping (`stiffness: 400, damping: 30`) instead of mechanical bezier curves (`cubic-bezier` / `ease-in-out`).
2. **Magnetic Interaction**: Interactive elements subtly pull toward the cursor when hovering nearby.
3. **Shared Layout Morphing (`layoutId`)**: Moving pills and indicators glide smoothly between tab switches and card expansions without jarring jumps.
4. **Fluid Drag & Elastic Resistance**: Drawers, bottom sheets, and cards rebound realistically with inertia.
5. **Gooey & Liquid Transitions**: Fluid merged borders and SVG blob filter blending.

---

## 🎨 Production Component Recipes (React + Tailwind + Framer Motion)

### 1. Magnetic Attraction Button

```tsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export function MagneticButton({
  children,
  className = "",
  onClick,
  distance = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  distance?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * distance, y: middleY * distance });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.5 }}
      className={`relative inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-colors ${className}`}
    >
      {children}
    </motion.button>
  );
}
```

---

### 2. Spring-Morphing Pill Tabs (`layoutId`)

```tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export function MorphingTabs({
  tabs,
  defaultTab,
  onTabChange,
}: {
  tabs: { id: string; label: string }[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleSelect = (id: string) => {
    setActiveTab(id);
    onTabChange?.(id);
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-slate-900/40 p-1.5 backdrop-blur-md border border-white/10">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleSelect(tab.id)}
            className={`relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full ${
              isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-indigo-600 shadow-md shadow-indigo-500/30"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
```

---

### 3. Elastic Spring Accordion

```tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ElasticAccordionItem({
  title,
  children,
  isOpenDefault = false,
}: {
  title: string;
  children: React.ReactNode;
  isOpenDefault?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-5 text-left font-semibold text-slate-900 dark:text-slate-100"
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-slate-400 text-sm"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          >
            <div className="px-5 pb-5 pt-1 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## 💡 Best Practices
* **Spring Tuning**: Damping between `20-30` gives snappy responsiveness without distracting oscillations.
* **Layout Shifts**: Always use `layoutId` on adjacent siblings rather than manual DOM absolute coordinate measurements.
* **Reduced Motion**: Wrap springs with `useReducedMotion()` checks for accessibility compliance.
