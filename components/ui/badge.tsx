import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-600 text-white hover:bg-primary-700",
        secondary: "border-transparent bg-secondary-800 text-secondary-100 hover:bg-secondary-700",
        destructive: "border-transparent bg-danger-600 text-white hover:bg-danger-700",
        outline: "text-secondary-100 border-secondary-700",
        success: "border-transparent bg-success-600 text-white hover:bg-success-700",
        warning: "border-transparent bg-warning-600 text-secondary-950 hover:bg-warning-700",
        gradient: "border-transparent bg-gradient-to-r from-primary-600 to-accent-600 text-white",
      },
      size: {
        default: "text-xs px-2.5 py-0.5",
        sm: "text-[10px] px-2 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, className }))} {...props} />
  );
}

export { Badge, badgeVariants }; 