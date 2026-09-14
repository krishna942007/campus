---
name: retro-ui
description: Build 90s/80s brutalist retro interfaces, classic OS window frames, CRT scanlines, chunky tactile 3D buttons, hard black offset shadows, and pixel monospace layouts using Retro UI design patterns.
---

# Retro UI — 90s Brutalist & Classic Web Design Skill

Apply **Retro UI** design patterns to create nostalgic, high-personality interfaces reminiscent of early web aesthetics, Classic OS (Win95/Mac System 7), cyber-terminals, and Neo-Brutalist design.

---

## 💾 Core Visual Elements of Retro UI

1. **Hard 0-Blur Offset Shadows**: `box-shadow: 4px 4px 0px #000000` or `5px 5px 0px #000`.
2. **Heavy Black Outlines**: 2px to 3px solid black borders (`border-2 border-black` / `border-[2.5px] border-black`).
3. **Tactile 3D Press Effect**: On `:active` or click, element translates `+2px, +2px` and removes shadow to mimic a physical button click.
4. **Classic OS Window Chrome**: Title bar with draggable stripes, bold system title, and `[_] [X]` window control buttons.
5. **CRT Scanlines & Pixel Patterns**: Grid canvas backdrops, dotted backgrounds, and faint horizontal cathode-ray scanline overlays.
6. **Vibrant 80s/90s Palette**: Electric Yellow `#FFE600`, Vivid Tangerine `#FF5C00`, Cyan `#00F0FF`, Lime `#00FF66`, Classic Gray `#C0C0C0`, and Pitch Black `#000000`.

---

## 🎨 Production Component Recipes (React + Tailwind)

### 1. Neo-Brutalist Retro Card with Hard Shadow

```tsx
import React from "react";

export function RetroCard({
  children,
  title,
  badge,
  bgColor = "bg-[#FFE600]",
  className = "",
}: {
  children: React.ReactNode;
  title?: string;
  badge?: string;
  bgColor?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-none border-2 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] ${className}`}
    >
      {(title || badge) && (
        <div className="mb-4 flex items-center justify-between border-b-2 border-black pb-3">
          {title && <h3 className="font-mono text-lg font-black uppercase tracking-wider text-black">{title}</h3>}
          {badge && (
            <span className={`border-2 border-black ${bgColor} px-2.5 py-0.5 font-mono text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black`}>
              {badge}
            </span>
          )}
        </div>
      )}
      <div className="text-black font-sans">{children}</div>
    </div>
  );
}
```

---

### 2. Classic OS 95 Window Frame

```tsx
import React from "react";

export function ClassicOSWindow({
  title = "SYSTEM_TERMINAL.EXE",
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-2 border-black bg-[#C0C0C0] p-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-mono ${className}`}>
      {/* OS Title Bar */}
      <div className="flex items-center justify-between bg-[#000080] px-3 py-1.5 text-white select-none">
        <div className="flex items-center gap-2">
          <span className="text-xs">💾</span>
          <span className="text-xs font-bold tracking-wider uppercase">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="h-5 w-5 border border-white/80 bg-[#C0C0C0] text-black text-xs font-bold leading-none shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#000] active:shadow-[inset_1px_1px_#000]">
            _
          </button>
          <button className="h-5 w-5 border border-white/80 bg-[#C0C0C0] text-black text-xs font-bold leading-none shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#000] active:shadow-[inset_1px_1px_#000]">
            □
          </button>
          <button className="h-5 w-5 border border-white/80 bg-[#C0C0C0] text-black text-xs font-bold leading-none shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#000] active:shadow-[inset_1px_1px_#000]">
            ×
          </button>
        </div>
      </div>
      {/* Content Area */}
      <div className="border-2 border-[#808080] bg-white p-5 m-1 text-black font-mono shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]">
        {children}
      </div>
    </div>
  );
}
```

---

### 3. Tactile 3D Retro Button

```tsx
import React from "react";

export function RetroButton({
  children,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
}) {
  const bgStyles = {
    primary: "bg-[#00F0FF] hover:bg-[#38f4ff]",
    secondary: "bg-[#FFE600] hover:bg-[#fff04d]",
    accent: "bg-[#FF5C00] text-white hover:bg-[#ff7324]",
  }[variant];

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center border-2 border-black px-6 py-2.5 font-mono text-sm font-black uppercase tracking-wider text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${bgStyles} ${className}`}
    >
      {children}
    </button>
  );
}
```

---

### 4. CRT Scanlines & Screen Flicker Overlay (CSS)

```css
/* Scanline Texture Overlay */
.crt-overlay {
  position: relative;
}
.crt-overlay::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
  background-size: 100% 4px;
  z-index: 20;
  pointer-events: none;
  opacity: 0.6;
}
```

---

## 💡 Best Practices
* **Keep High Contrast**: Always use pure `#000000` borders with bright saturated fills (`#FFE600`, `#00F0FF`, `#FF5C00`, `#FFFFFF`).
* **Monospace Typography**: Combine fonts like `Courier New`, `JetBrains Mono`, `Space Mono`, or `VT323` for authentic terminal and OS vibes.
* **Instant Tactile Clicks**: Ensure `active:translate-x-[3px] active:translate-y-[3px] active:shadow-none` is applied to buttons for satisfying micro-interaction.
