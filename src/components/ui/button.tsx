import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-sans font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-berry text-white hover:bg-berry/90 hover:text-white active:bg-berry-dark active:text-white focus-visible:text-white shadow-sm border border-transparent",
        primary: "bg-berry text-white hover:bg-berry/90 hover:text-white active:bg-berry-dark active:text-white focus-visible:text-white shadow-sm border border-transparent",
        berry: "bg-berry text-white hover:bg-berry/90 hover:text-white active:bg-berry-dark active:text-white focus-visible:text-white shadow-sm border border-transparent",
        secondary: "bg-transparent text-plum border-[1.5px] border-berry hover:bg-berry/10 hover:text-berry active:bg-berry/15 active:text-berry focus-visible:text-plum",
        outline: "bg-transparent text-plum border-[1.5px] border-plum/30 hover:bg-plum/5 hover:text-plum active:bg-plum/10 active:text-plum focus-visible:text-plum",
        plum: "bg-transparent text-plum border-[1.5px] border-plum hover:bg-plum/10 hover:text-plum active:bg-plum/15 active:text-plum focus-visible:text-plum",
        ghost: "bg-transparent text-plum hover:bg-plum/10 hover:text-plum active:bg-plum/15 active:text-plum focus-visible:text-plum",
        gold: "bg-coral text-white font-bold hover:bg-coral-dark hover:text-white active:bg-coral-dark active:text-white focus-visible:text-white shadow-sm",
        yellow: "bg-coral text-white font-bold hover:bg-coral-dark hover:text-white active:bg-coral-dark active:text-white focus-visible:text-white shadow-sm",
        coral: "bg-coral text-white font-bold hover:bg-coral-dark hover:text-white active:bg-coral-dark active:text-white focus-visible:text-white shadow-sm",
        raspberry: "bg-berry text-white hover:bg-berry/90 hover:text-white active:bg-berry-dark active:text-white focus-visible:text-white shadow-sm border border-transparent",
        pill: "bg-transparent border-[1.5px] border-berry text-berry hover:bg-berry/10 hover:text-berry active:text-berry text-[14px] px-3.5 py-1.5",
        pillActive: "bg-berry border-[1.5px] border-berry text-white hover:bg-berry hover:text-white active:text-white text-[14px] px-3.5 py-1.5 shadow-sm",
      },
      size: {
        default: "px-[22px] py-[13px] text-[15px] md:text-[16px]",
        sm: "px-4 py-2 text-[13.5px] md:text-[14px]",
        lg: "px-7 py-3.5 text-[16px] md:text-[17px]",
        icon: "h-10 w-10 p-0",
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
