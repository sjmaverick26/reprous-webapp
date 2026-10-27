"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUp } from "lucide-react";

interface ScrollProgressIndicatorProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  pageId?: string;
  className?: string;
}

export function ScrollProgressIndicator({
  containerRef,
  pageId,
  className = "",
}: ScrollProgressIndicatorProps) {
  const [progress, setProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const getScrollMetrics = useCallback(() => {
    if (containerRef?.current) {
      const el = containerRef.current;
      const scrollTop = el.scrollTop;
      const scrollHeight = Math.max(el.scrollHeight - el.clientHeight, 0);
      return { scrollTop, scrollHeight };
    }
    if (typeof window === "undefined" || typeof document === "undefined") {
      return { scrollTop: 0, scrollHeight: 0 };
    }
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight - document.documentElement.clientHeight,
      0
    );
    return { scrollTop, scrollHeight };
  }, [containerRef]);

  const updateProgress = useCallback(() => {
    const { scrollTop, scrollHeight } = getScrollMetrics();
    if (scrollHeight > 100) {
      const pct = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
      setProgress(pct);
      setIsVisible(true);
    } else {
      setProgress(0);
      setIsVisible(false);
    }

    // Trigger brief scrolling indicator state
    setIsScrolling(true);
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    scrollTimerRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1200);
  }, [getScrollMetrics]);

  useEffect(() => {
    updateProgress();
    const timer = setTimeout(updateProgress, 120);

    if (containerRef?.current) {
      const el = containerRef.current;
      el.addEventListener("scroll", updateProgress, { passive: true });
      return () => {
        el.removeEventListener("scroll", updateProgress);
        clearTimeout(timer);
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      };
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      clearTimeout(timer);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [containerRef, pageId, updateProgress]);

  const scrollToPercentage = (targetPct: number, smooth: boolean = true) => {
    const { scrollHeight } = getScrollMetrics();
    const targetY = (targetPct / 100) * scrollHeight;
    const behavior: ScrollBehavior = smooth ? "smooth" : "auto";

    if (containerRef?.current) {
      containerRef.current.scrollTo({ top: targetY, behavior });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: targetY, behavior });
    }
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const pct = Math.min(Math.max((clickY / rect.height) * 100, 0), 100);
    scrollToPercentage(pct, true);
  };

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const pct = Math.min(Math.max((clickY / rect.height) * 100, 0), 100);
      scrollToPercentage(pct, false);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, containerRef, getScrollMetrics]);

  const scrollToTop = () => {
    scrollToPercentage(0, true);
  };

  if (!isVisible) return null;

  const showTooltip = isHovered || isDragging || isScrolling;
  const remainingPct = Math.max(100 - Math.round(progress), 0);

  return (
    <aside
      aria-label="Page reading and scroll progress"
      className={`fixed right-2 sm:right-3.5 top-28 bottom-28 z-40 flex flex-col items-center select-none pointer-events-auto transition-opacity duration-300 ${
        isHovered || isDragging ? "opacity-100" : "opacity-85 hover:opacity-100"
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Vertical Progress Bar Track */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        role="slider"
        aria-label="Scroll progress indicator bar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        className="relative w-2 sm:w-2.5 h-full rounded-full bg-deep-teal/15 hover:bg-deep-teal/25 border border-deep-teal/15 shadow-inner cursor-pointer transition-all duration-150 flex flex-col justify-start"
        title={`Page progress: ${Math.round(progress)}% (${remainingPct}% scrolling remaining). Click or drag to navigate.`}
      >
        {/* Active Fill Bar Sliding Down from Top */}
        <div
          className="w-full rounded-full bg-gradient-to-b from-coral via-raspberry to-deep-teal transition-[height] duration-75 ease-out shadow-xs"
          style={{ height: `${progress}%` }}
        />

        {/* Sliding Indicator Knob / Thumb */}
        <div
          onMouseDown={handleThumbMouseDown}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-white border-2 border-coral shadow-md hover:scale-125 active:scale-110 transition-transform flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ top: `${progress}%` }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-coral" />
        </div>

        {/* Floating Percentage Tooltip */}
        {showTooltip && (
          <div
            className="absolute right-6 sm:right-7 -translate-y-1/2 px-2.5 py-1 rounded-full bg-deep-teal text-white text-[11px] font-bold shadow-lg border border-white/20 whitespace-nowrap animate-in fade-in zoom-in-95 duration-150 flex items-center gap-1.5 font-sans pointer-events-none"
            style={{ top: `${progress}%` }}
          >
            {progress >= 98 ? (
              <span className="text-light-teal">Bottom reached ✓</span>
            ) : (
              <>
                <span className="text-white">{Math.round(progress)}%</span>
                <span className="text-coral">•</span>
                <span className="text-light-teal/90 text-[10px] font-medium font-sans">
                  {remainingPct}% left
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Quick Scroll To Top Button (Appears when scrolled past 15%) */}
      {progress > 15 && (
        <button
          onClick={scrollToTop}
          className="mt-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 hover:bg-light-teal text-deep-teal shadow-md border border-deep-teal/20 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all text-xs font-bold shrink-0 animate-in fade-in duration-200"
          title="Scroll back to top"
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="w-3.5 h-3.5 text-deep-teal" />
        </button>
      )}
    </aside>
  );
}
