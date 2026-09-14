---
name: motion-primitives
description: Build motion-first interactive components, spring animations, gesture-driven cards, fluid drag interactions, and liquid morphing using Motion Primitives and Animata design patterns.
---

# Motion Primitives & Animata — Motion-First UI Components Skill

Apply **Motion Primitives** and **Animata** patterns (8k+ GitHub stars) to build fluid, interactive, motion-first components powered by Framer Motion / Motion One.

---

## 🌪 Core Motion Patterns

1. **Spring-Physics Floating Dialog**: Modals that expand smoothly from the trigger button's exact bounding box.
2. **Gesture-Driven Swipe & Rebound Cards**: Cards with directional drag gestures and realistic inertia.
3. **Cursor Trail & Magnetic Follower**: Interactive particle or ambient glow trail that tracks cursor speed.
4. **Liquid Text Stagger / Blur Fade Reveal**: Cascading character or word animations with progressive blur decay.
5. **Interactive Tilt Hover**: Dynamic specular highlights reacting to mouse angle.

---

## 🎨 Production Component Recipes (React + Tailwind + Framer Motion)

### 1. Blur Fade Text & Card Reveal

```tsx
import { motion } from "framer-motion";

export function BlurFade({
  children,
  delay = 0,
  duration = 0.4,
  yOffset = 12,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ delay, duration, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

### 2. Spring Morphing Expandable Card

```tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ExpandableMotionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        layoutId={`card-${title}`}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-md hover:shadow-lg transition-shadow"
      >
        <motion.h4 layoutId={`title-${title}`} className="font-bold text-slate-900 dark:text-white">
          {title}
        </motion.h4>
        <motion.p layoutId={`sub-${title}`} className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {subtitle}
        </motion.p>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              layoutId={`card-${title}`}
              className="relative z-50 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 shadow-2xl"
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <motion.h3 layoutId={`title-${title}`} className="text-xl font-bold text-slate-900 dark:text-white">
                    {title}
                  </motion.h3>
                  <motion.p layoutId={`sub-${title}`} className="text-sm text-slate-500 dark:text-slate-400">
                    {subtitle}
                  </motion.p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-slate-100 dark:bg-slate-800 p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-slate-600 dark:text-slate-300">
                {children}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## 💡 Best Practices
* Use `layoutId` for matching elements between closed and expanded states.
* Keep spring damping around `25-30` to avoid artificial sluggishness.
