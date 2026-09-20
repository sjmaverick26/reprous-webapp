import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 font-sans text-[13.5px] font-bold tracking-wide uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-berry/10 text-berry border border-berry/20",
        berry: "bg-berry text-white",
        outline: "bg-transparent text-berry border border-berry",
        gold: "bg-gold/25 text-plum border border-gold/50",
        sage: "bg-sage/25 text-plum border border-sage",
        lavender: "bg-lavender text-plum border border-[#D3C2D7]",
        rose: "bg-dusty-rose/25 text-plum border border-dusty-rose",
        blush: "bg-dusty-rose/25 text-plum",
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
