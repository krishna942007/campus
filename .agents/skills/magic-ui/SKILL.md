---
name: magic-ui
description: Build high-impact, animated modern UI components using Magic UI design patterns. Includes Marquee, Border Beam, Animated Beam, Meteors, Particles, Shimmer Buttons, Number Ticker, and Bento Grids.
---

# Magic UI — High-Impact Animated Web Components Skill

Apply **Magic UI** patterns to build animated, eye-catching, production-grade landing pages and dashboard components with React, Tailwind CSS, and Framer Motion.

---

## 🚀 Signature Magic UI Patterns

Magic UI components turn static interfaces into dynamic, living applications:
1. **Marquee**: Smooth, GPU-accelerated horizontal or vertical infinite ticker for logos, testimonials, and feature badges.
2. **Border Beam**: A bright laser beam traveling smoothly along the perimeter of cards or modals.
3. **Animated Beam**: Curved animated SVG paths with pulses connecting two or more interactive nodes.
4. **Meteors & Particle Stars**: Falling streaks of light and interactive background particle constellations.
5. **Shimmer Button**: Sleek collocated metallic shine with subtle 3D depth.
6. **Animated Number Ticker**: Smooth slot-machine rolling numbers for KPIs and metrics.

---

## 🎨 Production Component Recipes (React + Tailwind + Framer Motion)

### 1. Border Beam (Traveling Perimeter Glow)

```tsx
import React from "react";

export function BorderBeam({
  className = "",
  size = 150,
  duration = 8,
  borderWidth = 1.5,
  colorFrom = "#6366f1",
  colorTo = "#ec4899",
  delay = 0,
}: {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}) {
  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--border-width": `${borderWidth}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width))_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-[calc(var(--size))] after:animate-[border-beam_var(--duration)_infinite_linear] after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--size)/2)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)))] ${className}`}
    />
  );
}
```

Add the custom animation to `tailwind.config.js` or `index.css`:
```css
@keyframes border-beam {
  100% {
    offset-distance: 100%;
  }
}
```

---

### 2. Smooth Infinite Marquee

```tsx
import React from "react";

export function Marquee({
  className = "",
  reverse = false,
  pauseOnHover = true,
  children,
  vertical = false,
  repeat = 4,
}: {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}) {
  return (
    <div
      className={`group flex overflow-hidden p-2 [--duration:30s] [--gap:1rem] [gap:var(--gap)] ${
        vertical ? "flex-col" : "flex-row"
      } ${className}`}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={`flex shrink-0 justify-around [gap:var(--gap)] ${
            vertical
              ? "animate-[marquee-vertical_var(--duration)_linear_infinite] flex-col"
              : "animate-[marquee_var(--duration)_linear_infinite] flex-row"
          } ${reverse ? "[animation-direction:reverse]" : ""} ${
            pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
          }`}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
```

CSS keyframes:
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% - var(--gap))); }
}
@keyframes marquee-vertical {
  from { transform: translateY(0); }
  to { transform: translateY(calc(-100% - var(--gap))); }
}
```

---

### 3. Animated Meteors Effect

```tsx
import React, { useEffect, useState } from "react";

export function Meteors({ number = 20 }: { number?: number }) {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      top: -5,
      left: Math.floor(Math.random() * window.innerWidth) + "px",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={style}
          className="pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-[meteor_5s_linear_infinite] rounded-[9999px] bg-slate-400 shadow-[0_0_0_1px_#ffffff10] before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']"
        />
      ))}
    </>
  );
}
```

---

### 4. Animated Number Ticker

```tsx
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className = "",
  decimalPlaces = 0,
}: {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
  decimalPlaces?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(Number(latest.toFixed(decimalPlaces)));
      }
    });
  }, [springValue, decimalPlaces]);

  return <span ref={ref} className={`inline-block tabular-nums ${className}`} />;
}
```

---

## 💡 Best Practices
* **Performance First**: Always use CSS transforms or lightweight Framer Motion spring curves rather than animating layout properties like `width`, `height`, or `margin`.
* **Hover States**: Support `pauseOnHover` on marquee and animated beams for accessible reading and interaction.
