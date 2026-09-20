import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 font-sans text-[13.5px] font-bold tracking-wide uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-light-teal text-deep-teal border border-deep-teal/20",
        berry: "bg-raspberry text-white",
        raspberry: "bg-raspberry text-white",
        outline: "bg-transparent text-deep-teal border border-deep-teal/40",
        gold: "bg-coral/20 text-deep-teal border border-coral/40",
        coral: "bg-coral/20 text-deep-teal border border-coral/40",
        sage: "bg-light-teal text-deep-teal border border-deep-teal/25",
        teal: "bg-light-teal text-deep-teal border border-deep-teal/25",
        lavender: "bg-soft-pink text-deep-teal border border-raspberry/20",
        rose: "bg-soft-pink text-deep-teal border border-raspberry/20",
        pink: "bg-soft-pink text-deep-teal border border-raspberry/20",
        blush: "bg-soft-pink text-deep-teal",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
