"use client";

import { useState } from "react";
import { Satellite, Map, BookOpen } from "lucide-react";

export default function Navbar() {
  const [showToast, setShowToast] = useState(false);

  function handleDocsClick() {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
            <Satellite size={18} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Satélites y Tuberías
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#main"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
          >
            <Map size={16} />
            Mapa
          </a>
          <button
            onClick={handleDocsClick}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted hover:text-foreground hover:bg-border/50 transition-colors"
          >
            <BookOpen size={16} />
            Docs
          </button>
        </div>
      </div>

      {showToast && (
        <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2">
          <div className="rounded-xl bg-foreground px-5 py-3 text-sm text-white shadow-lg">
            📄 Documentación en desarrollo — Pronto disponible
          </div>
        </div>
      )}
    </nav>
  );
}
