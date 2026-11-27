import { cn } from "@/lib/utils";

/** Her three pillar colours (Learn teal, Recognize coral, Advocate raspberry) as a small decorative rule. */
export function CoreThreeRule({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex gap-1.5", className)}>
      <span className="h-1.5 w-10 rounded-full bg-deep-teal" />
      <span className="h-1.5 w-10 rounded-full bg-coral" />
      <span className="h-1.5 w-10 rounded-full bg-raspberry" />
    </div>
  );
}
