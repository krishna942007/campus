---
name: origin-ui
description: Build accessible, high-polish inputs, controls, micro-interactions, toggles, range sliders, and form components using Origin UI design patterns.
---

# Origin UI — High-Polish Form Controls & Micro-Interactions Skill

Apply **Origin UI** patterns to build accessible, ultra-refined input elements, range sliders, segmented switches, password meters, search bars, and interactive form feedback.

---

## 💎 Core Origin UI Design Strengths

1. **Stateful Floating Inputs**: Clean visual feedback for focused, valid, invalid, loading, and disabled input states.
2. **Animated Range Sliders & Toggles**: Custom styled sliders with value tooltips and smooth thumb drag physics.
3. **Password Strength Meter**: Real-time multi-criteria visual score bars (lowercase, uppercase, numbers, symbols, length).
4. **Search Bar with Hotkey Badges (`⌘K` / `Ctrl+K`)**: Clean search input with quick-clear and shortcut pill.
5. **Interactive Tag / Filter Pickers**: Removable pills with smooth entry/exit animations.

---

## 🎨 Production Component Recipes (React + Tailwind)

### 1. High-Polish Search Input with `⌘K` Shortcut Pill

```tsx
import React, { useState } from "react";

export function OriginSearchInput({
  placeholder = "Search anything...",
  onSearch,
}: {
  placeholder?: string;
  onSearch?: (value: string) => void;
}) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="relative flex items-center w-full max-w-md">
      {/* Search Icon */}
      <div className="pointer-events-none absolute left-3.5 flex items-center text-slate-400">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 pl-10 pr-20 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
      />
      {/* Right Shortcut Badge or Clear Button */}
      <div className="absolute right-2.5 flex items-center gap-1.5">
        {value ? (
          <button
            onClick={() => {
              setValue("");
              onSearch?.("");
            }}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            ×
          </button>
        ) : (
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
            <span>⌘</span>K
          </kbd>
        )}
      </div>
    </div>
  );
}
```

---

### 2. Animated Password Strength Meter

```tsx
import React, { useState } from "react";

export function PasswordInputWithStrength() {
  const [password, setPassword] = useState("");

  const getStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;
    return score; // 0 to 4
  };

  const strength = getStrength(password);
  const colors = ["bg-slate-200 dark:bg-slate-800", "bg-red-500", "bg-amber-500", "bg-blue-500", "bg-emerald-500"];
  const labels = ["Enter password", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="w-full max-w-sm space-y-2">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter secure password"
        className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
      />
      {/* 4 Segment Bars */}
      <div className="flex gap-1.5 pt-1">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              strength >= step ? colors[strength] : "bg-slate-200 dark:bg-slate-800"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Password strength: <span className="font-semibold text-slate-700 dark:text-slate-200">{labels[strength]}</span>
      </p>
    </div>
  );
}
```

---

### 3. Segmented Switch / Toggle

```tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export function SegmentedToggle({
  options,
  defaultOption,
  onChange,
}: {
  options: { value: string; label: string }[];
  defaultOption?: string;
  onChange?: (val: string) => void;
}) {
  const [selected, setSelected] = useState(defaultOption || options[0]?.value);

  const handleSelect = (val: string) => {
    setSelected(val);
    onChange?.(val);
  };

  return (
    <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200/60 dark:border-slate-700/60">
      {options.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            className={`relative px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              isSelected ? "text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="segmented-bg"
                className="absolute inset-0 rounded-lg bg-white dark:bg-slate-700 shadow-sm"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
```

---

## 💡 Best Practices
* Always provide clear error messages and focused ring indicators on forms for screen readers and keyboard navigation.
* Keep micro-interaction spring rates snappy (`stiffness: 450, damping: 35`).
