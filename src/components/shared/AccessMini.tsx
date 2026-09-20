import React from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccessMiniProps {
  text: string;
  onDark?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export function AccessMini({ text, onDark = false, className = "", icon }: AccessMiniProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-[13.5px] font-bold font-sans transition-colors",
        onDark
          ? "bg-white/20 text-white backdrop-blur-sm"
          : "bg-light-teal text-deep-teal border border-deep-teal/15",
        className
      )}
    >
      {icon || <Globe className="w-4 h-4 flex-shrink-0 text-coral" aria-hidden="true" />}
      <span>{text}</span>
    </div>
  );
}
