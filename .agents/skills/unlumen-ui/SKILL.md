---
name: unlumen-ui
description: Build luminous, radiant, and ambient-glow web interfaces using Unlumen UI design patterns. Includes spotlight mouse-tracking, glowing borders, conic light gradients, aurora backdrops, and radiant cards.
---

# Unlumen UI — Luminous & Radiant Web Design Skill

Apply **Unlumen UI** design patterns to create modern, radiant, high-engagement web interfaces featuring ambient glow, spotlight tracking, illuminated borders, and vivid aurora effects.

---

## 🌟 Core Aesthetics & Visual Tokens

Unlumen UI specializes in **luminescence, lighting depth, and radiant micro-effects**:
* **Spotlight Mouse-Tracking**: Dynamic radial flashlight follows the cursor across cards or hero sections.
* **Glowing Animated Borders**: Continuous rotating conic gradient or laser pulse along edges.
* **Aurora & Neon Gradients**: Diffused multi-color blur backdrops (`rgba(99,102,241,0.15)`, `rgba(236,72,153,0.15)`).
* **Radiant Glass**: Semi-transparent dark or light cards that catch rim light highlights.
* **Luminous Typography**: Soft text glows and animated shimmer gradients.

---

## 🎨 Production Component Recipes (React + Tailwind + Framer Motion)

### 1. Spotlight Cursor-Tracking Card
Mouse coordinates dynamically light up the card's surface and border.

```tsx
import React, { useRef, useState } from "react";

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(120, 119, 198, 0.18)",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md transition-all duration-300 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
```

---

### 2. Glowing Conic Border Container
A glowing gradient continuously rotates around the container edge.

```tsx
import React from "react";

export function GlowingBorderContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative p-[1px] overflow-hidden rounded-2xl group ${className}`}>
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#3b82f6_0%,#8b5cf6_50%,#ec4899_100%,#3b82f6_100%)] animate-[spin_4s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />
      <div className="relative z-10 rounded-2xl bg-slate-950/90 p-6 backdrop-blur-xl border border-white/10">
        {children}
      </div>
    </div>
  );
}
```

---

### 3. Aurora Background Section
Subtle flowing radiant gradients behind hero or key landing sections.

```tsx
export function AuroraBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[500px] w-full overflow-hidden bg-slate-950 text-slate-100 py-16 px-6">
      {/* Top Aurora Orb */}
      <div className="pointer-events-none absolute top-[-10%] left-[20%] h-[350px] w-[500px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-fuchsia-500/20 blur-[100px] animate-pulse" />
      {/* Bottom Aurora Orb */}
      <div className="pointer-events-none absolute bottom-[-10%] right-[10%] h-[400px] w-[600px] rounded-full bg-gradient-to-br from-purple-600/15 via-pink-500/15 to-amber-500/15 blur-[120px]" />
      <div className="relative z-10 max-w-5xl mx-auto">{children}</div>
    </div>
  );
}
```

---

### 4. Shimmering Glow Button
High-gloss moving shine with ambient colored shadow.

```tsx
import React from "react";

export function RadiantButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
```

---

## 💡 Best Practices & Rules
1. **Balance Luminosity**: Use ambient glow as accents on borders, highlights, and cards rather than saturating the entire canvas.
2. **Accessible Contrast**: Ensure text over glowing backgrounds maintains at least `4.5:1` contrast ratio.
3. **Hardware Acceleration**: Use `transform` and `opacity` for animations (`will-change-transform` or `translate-z-0`) for 60fps performance.
