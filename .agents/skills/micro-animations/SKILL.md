---
name: micro-animations
description: Build delightful, high-precision micro-interactions and animations. Includes magnetic hover pull, staggered list entrances, scroll-driven progress bars, live status pulse badges, and tactile spring switches.
---

# Micro-Animations & Precision Interactions Skill

Apply **Micro-Animations** to elevate interfaces from static templates to responsive, living software with subtle feedback loops, organic physics, and smooth entry/exit transitions.

---

## ⚡ Core Micro-Interaction Rules

1. **Subtle Over Flashy**: Micro-animations should guide the eye and confirm user intent without causing distraction.
2. **Speed & Duration**: Keep durations between `120ms` and `250ms` for interactive feedback, and `300ms-400ms` for modal/expansion states.
3. **Organic Spring Tuning**: Standard spring configuration `transition={{ type: "spring", stiffness: 400, damping: 28 }}`.
4. **Cascading Stagger**: Animate multi-item lists with `staggerChildren: 0.05` to create an effortless waterfall entrance.

---

## 🎨 Production Component Recipes (React + Tailwind + Framer Motion)

### 1. Staggered List Entrance Container

```tsx
import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export function StaggerList({ items }: { items: { id: string; title: string; subtitle: string }[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-2.5 w-full"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          variants={itemVariants}
          className="flex items-center justify-between rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-neutral-900 p-4 shadow-sm hover:border-black/[0.12] dark:hover:border-white/[0.12] transition-colors"
        >
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{item.subtitle}</p>
          </div>
          <span className="text-xs font-mono text-neutral-400">→</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
```

---

### 2. Scroll-Driven Reading Progress Line

```tsx
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50"
    />
  );
}
```

---

### 3. Live Glowing Pulse Badge

```tsx
export function LiveStatusBadge({ text = "SYSTEM ONLINE" }: { text?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      {text}
    </span>
  );
}
```

---

### 4. Tactile Spring Toggle Switch

```tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export function TactileToggle({
  checked = false,
  onChange,
}: {
  checked?: boolean;
  onChange?: (val: boolean) => void;
}) {
  const [isOn, setIsOn] = useState(checked);

  const toggle = () => {
    setIsOn(!isOn);
    onChange?.(!isOn);
  };

  return (
    <button
      onClick={toggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
        isOn ? "bg-indigo-600" : "bg-neutral-200 dark:bg-neutral-800"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md ${
          isOn ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
```

---

## 💡 Best Practices
* Always honor `prefers-reduced-motion` using Framer Motion's `useReducedMotion()`.
* Combine spring layouts with `layout` and `layoutId` props for zero-jank animated transitions.
