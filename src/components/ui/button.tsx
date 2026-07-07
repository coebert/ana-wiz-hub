import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Phase 4 button system.
 *
 * Sizes are locked to an 8 pt rhythm: sm 32, default 40, lg 48, icon 40.
 * Radius is `rounded-lg` (matches the retuned --radius token, 10 px).
 * Focus ring is a 2 px `--ring` at 2 px offset for keyboard visibility on
 * every variant. `cta` is the warm-amber marketing action; `primary` is
 * the clinical-navy default; `outline`/`ghost` are quiet chrome; `danger`
 * replaces the old `destructive` alias while keeping backwards-compat.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium tracking-tight ring-offset-background transition-[background-color,color,box-shadow,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-elev-1 hover:bg-primary-hover hover:shadow-elev-2 active:translate-y-px",
        primary:
          "bg-primary text-primary-foreground shadow-elev-1 hover:bg-primary-hover hover:shadow-elev-2 active:translate-y-px",
        cta: "bg-cta text-cta-foreground shadow-elev-1 hover:bg-cta-hover hover:shadow-elev-2 active:translate-y-px",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-border bg-surface text-foreground hover:bg-muted hover:border-foreground/20",
        ghost:
          "text-foreground hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground shadow-elev-1 hover:bg-destructive/90",
        danger:
          "bg-destructive text-destructive-foreground shadow-elev-1 hover:bg-destructive/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
