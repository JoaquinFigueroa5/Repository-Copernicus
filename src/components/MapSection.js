"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const leaks = [
  { cx: 180, cy: 160 },
  { cx: 340, cy: 220 },
  { cx: 280, cy: 320 },
];

export default function MapSection() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(svgRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="main"
      ref={sectionRef}
      className="relative flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm"
    >
      <div className="mb-4 flex items-center gap-2">
        <MapPin size={18} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">
          Mapa de Tuberías
        </h2>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-xl bg-gradient-to-b from-[#e8f5e9] to-[#c8e6c9]">
        <svg
          ref={svgRef}
          viewBox="0 0 500 400"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#2d6a4f" />
            </marker>
          </defs>

          <rect width="500" height="400" fill="transparent" />

          <text x="250" y="50" textAnchor="middle" fill="#2d6a4f" fontSize="13" fontFamily="Geist, sans-serif" opacity="0.5">
            ⊿ Vista aérea — sector norte
          </text>

          <g stroke="#2d6a4f" strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M50,200 Q150,100 250,180 T450,150" strokeDasharray="8 4" />
            <path d="M80,300 Q200,250 300,320 T480,280" strokeDasharray="8 4" />
            <path d="M150,100 L150,320" strokeWidth="2" opacity="0.4" strokeDasharray="4 4" />
            <path d="M350,80 L350,350" strokeWidth="2" opacity="0.4" strokeDasharray="4 4" />
          </g>

          <g fill="#2d6a4f">
            <circle cx="50" cy="200" r="5" />
            <circle cx="150" cy="100" r="5" />
            <circle cx="250" cy="180" r="5" />
            <circle cx="450" cy="150" r="5" />
            <circle cx="80" cy="300" r="5" />
            <circle cx="200" cy="250" r="5" />
            <circle cx="300" cy="320" r="5" />
          </g>

          <g stroke="#d4a373" strokeWidth="2.5" fill="none" strokeDasharray="6 3" markerEnd="url(#arrow)">
            <path d="M250,30 L250,90" />
          </g>

          {leaks.map((l, i) => (
            <g key={i}>
              <circle cx={l.cx} cy={l.cy} r="4" fill="#d97706" />
              <circle
                cx={l.cx}
                cy={l.cy}
                r="4"
                fill="none"
                stroke="#d97706"
                strokeWidth="2"
                style={{ animation: "pulse-ring 2s ease-out infinite", animationDelay: `${i * 0.5}s` }}
              />
              <text
                x={l.cx + 10}
                y={l.cy + 4}
                fill="#d97706"
                fontSize="11"
                fontFamily="Geist, sans-serif"
                fontWeight="600"
              >
                ⚠ Fuga
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
