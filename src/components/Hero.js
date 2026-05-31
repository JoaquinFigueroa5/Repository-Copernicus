"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TreePine, Droplets, Satellite, ChevronDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current.querySelectorAll("[data-gsap]"), {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1b4332] via-[#2d6a4f] to-[#40916c]"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div data-gsap className="mx-auto mb-8 flex items-center justify-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
            <Satellite size={28} />
          </span>
          <span className="h-px w-16 bg-white/20" />
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
            <Droplets size={28} />
          </span>
          <span className="h-px w-16 bg-white/20" />
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
            <TreePine size={28} />
          </span>
        </div>

        <h1
          data-gsap
          className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Satélites y Tuberías
        </h1>

        <p
          data-gsap
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
        >
          Tecnología satelital para la detección temprana de fugas en tuberías
          subterráneas. Ayudamos a agricultores a proteger sus cultivos y
          optimizar el uso del agua.
        </p>

        <div
          data-gsap
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/60"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Monitoreo satelital
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            Detección de fugas
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Ahorro de agua
          </span>
        </div>

        <a
          href="#map-section"
          data-gsap
          className="mt-12 inline-flex h-12 w-12 animate-bounce items-center justify-center rounded-full border border-white/20 text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          <ChevronDown size={22} />
        </a>
      </div>
    </section>
  );
}
