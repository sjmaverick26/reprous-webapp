import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-sans font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-berry text-white hover:bg-berry/90 shadow-sm",
        secondary: "bg-transparent text-berry border-2 border-berry hover:bg-berry/10",
        ghost: "bg-transparent text-berry border-2 border-berry hover:bg-berry/10",
        outline: "bg-transparent text-berry border-2 border-berry hover:bg-berry/10",
        yellow: "bg-yellow text-plum hover:bg-yellow-deep shadow-sm",
        pill: "bg-transparent border-[1.5px] border-berry text-berry hover:bg-berry/10 text-[14px] px-3.5 py-1.5",
        pillActive: "bg-berry border-[1.5px] border-berry text-white text-[14px] px-3.5 py-1.5 shadow-sm",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-[15.5px]",
        sm: "h-9 rounded-full px-4 text-[14px]",
        lg: "h-13 rounded-full px-8 text-[16px]",
        icon: "h-10 w-10 p-0 rounded-full",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
