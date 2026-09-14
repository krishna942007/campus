---
name: shadcn-ui
description: Master the shadcn/ui architecture, component patterns, accessible primitives (Radix UI / Base UI), and production recipes for dashboards, applications, and enterprise design systems.
---

# shadcn/ui — Production Design System & Component Architecture Skill

Apply **shadcn/ui** patterns (120k+ GitHub stars) — the gold standard for accessible, fully customizable, copy-paste component architecture built on **Radix UI Primitives** and **Tailwind CSS**.

---

## 🛠 Core Philosophy of shadcn/ui

1. **You Own the Code**: Components live in `src/components/ui/` with zero black-box dependencies.
2. **Accessible Primitives**: Built upon headless WAI-ARIA compliant foundations (Radix UI / Base UI / Floating UI).
3. **Class Variance Authority (`cva`) & `cn()` Utility**: Composable variant styling with `clsx` and `tailwind-merge`.
4. **Sub-component Composition**: Multi-part compound components (`Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`).

---

## 🎨 Foundational Utilities (`cn` and `cva`)

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 🧩 Production Component Recipes

### 1. Button with Variants (`cva`)

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

---

### 2. Accessible Modal / Dialog Component

```tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./utils";

export function Dialog({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative z-50 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
```

---

### 3. Metric Badge & Toast Notification Pattern

```tsx
export function Badge({
  variant = "default",
  children,
  className = "",
}: {
  variant?: "default" | "success" | "warning" | "destructive" | "outline";
  children: React.ReactNode;
  className?: string;
}) {
  const styles = {
    default: "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900",
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    destructive: "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20",
    outline: "border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300",
  }[variant];

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${styles} ${className}`}>
      {children}
    </span>
  );
}
```

---

## 💡 Best Practices
* Always keep sub-component modularity (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
* Use `aria-*` tags and proper keyboard accessibility (`Tab`, `Esc`, `Enter`, `Space`).
