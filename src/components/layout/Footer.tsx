import React from "react";
import { ReproUsMark } from "@/components/shared/ReproUsMark";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-berry/10 bg-cream-card/60 py-10 transition-colors">
      <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center gap-3">
          <ReproUsMark size={28} />
          <div>
            <span className="font-serif font-bold text-berry text-lg block">ReproUs</span>
            <p className="text-xs text-ink/70 m-0">Free, honest reproductive health education for everyone.</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-bold text-berry/80 flex-wrap justify-center">
          <span>Always Free</span>
          <span>•</span>
          <span>100% Anonymous</span>
          <span>•</span>
          <span>Medical Review Board</span>
          <span>•</span>
          <span>Multilingual Access</span>
        </div>

        <p className="text-xs text-ink/60 m-0">
          © {new Date().getFullYear()} ReproUs. All education is provided for informational empowerment.
        </p>
      </div>
    </footer>
  );
}
