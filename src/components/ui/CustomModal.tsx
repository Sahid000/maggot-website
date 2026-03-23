"use client";
import React, { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  width?: number;
  children: React.ReactNode;
}

const CustomModal = ({ open, onClose, width = 860, children }: CustomModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleWheel = (e: WheelEvent) => {
      // Always block the browser's own scroll — page never scrolls
      e.preventDefault();

      // Walk up from the hovered element, find the first thing that can scroll
      let el = e.target as HTMLElement | null;
      while (el && el !== overlayRef.current) {
        const { overflowY } = window.getComputedStyle(el);
        const canScroll =
          (overflowY === "auto" || overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight;
        if (canScroll) {
          el.scrollTop += e.deltaY;
          return;
        }
        el = el.parentElement;
      }

      // Fallback — scroll the overlay itself
      overlayRef.current && (overlayRef.current.scrollTop += e.deltaY);
    };

    // capture:true  → fires before the browser decides to scroll anything
    // passive:false → allows preventDefault()
    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", handleWheel, { capture: true });
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );
  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999999]! overflow-y-auto"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative w-full rounded-2xl shadow-2xl my-4"
          style={{ maxWidth: width }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
            aria-label="বন্ধ করুন"
          >
            <FiX size={18} />
          </button>

          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CustomModal;
