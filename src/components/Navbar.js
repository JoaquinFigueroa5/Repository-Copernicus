"use client";

import { useState, useEffect } from "react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import gsap from "gsap";
import { Satellite, Map, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleDocsClick() {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  function scrollToMap(e) {
    e.preventDefault();
    gsap.to(window, { duration: 1.2, scrollTo: { y: "#map-section", offsetY: 0 }, ease: "power3.inOut" });
  }

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-xs border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
              scrolled ? "bg-primary text-white" : "bg-white/20 text-white backdrop-blur-sm"
            }`}
          >
            <Satellite size={18} aria-hidden="true" />
          </div>
          <span
            className={`text-lg font-semibold tracking-tight transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            Satélites y Tuberías
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={scrollToMap}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              scrolled
                ? "text-primary hover:bg-primary/5"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Map size={16} aria-hidden="true" />
            Mapa
          </button>
          <button
            onClick={handleDocsClick}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              scrolled
                ? "text-muted hover:text-foreground hover:bg-border/50"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            <BookOpen size={16} aria-hidden="true" />
            Docs
          </button>
        </div>
      </div>

      {showToast && (
        <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2" role="status" aria-live="polite">
          <div className="rounded-xl bg-foreground px-5 py-3 text-sm text-white shadow-lg">
            Documentación en desarrollo — Pronto disponible
          </div>
        </div>
      )}
    </nav>
  );
}
