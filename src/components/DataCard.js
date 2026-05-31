"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  CheckCircle2,
  AlertTriangle,
  X,
  MapPin,
  Droplets,
  Hash,
} from "lucide-react";

export default function DataCard({ data, onClear, overlay }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 12,
        scale: 0.97,
        duration: 0.35,
        ease: "power3.out",
      });
    }, cardRef);
    return () => ctx.revert();
  }, [data]);

  const isWarning = data.status === "warning";
  const bg = overlay ? "bg-white/50 backdrop-blur-sm" : "bg-background";

  return (
    <div
      ref={cardRef}
      className={`rounded-xl border ${overlay ? "border-white/20" : "border-border"} ${overlay ? "bg-white/90 backdrop-blur-xl" : "bg-surface"} p-4 shadow-sm`}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${
              isWarning ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"
            }`}
          >
            {isWarning ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {isWarning ? "Fugas detectadas" : "Sin fugas detectadas"}
            </p>
            <p className="text-xs text-muted">{data.name}</p>
          </div>
        </div>
        <button
          onClick={onClear}
          className="rounded-lg p-1 text-muted hover:bg-border/50 hover:text-foreground transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      <div className="mb-3 grid grid-cols-3 gap-2">
        <div className={`rounded-lg ${bg} p-2 text-center`}>
          <MapPin size={14} className="mx-auto mb-0.5 text-primary" />
          <p className="text-base font-semibold text-foreground">{data.coordinates}</p>
          <p className="text-[10px] text-muted">Puntos</p>
        </div>
        <div className={`rounded-lg ${bg} p-2 text-center`}>
          <Droplets size={14} className={`mx-auto mb-0.5 ${isWarning ? "text-amber-500" : "text-green-500"}`} />
          <p className="text-base font-semibold text-foreground">{data.leaks}</p>
          <p className="text-[10px] text-muted">Fugas</p>
        </div>
        <div className={`rounded-lg ${bg} p-2 text-center`}>
          <Hash size={14} className="mx-auto mb-0.5 text-accent" />
          <p className="text-base font-semibold text-foreground">{data.sectors.length}</p>
          <p className="text-[10px] text-muted">Sectores</p>
        </div>
      </div>

      <div className="space-y-1.5">
        {data.details.map((d, i) => (
          <div key={i} className={`flex items-center justify-between rounded-lg ${bg} px-2.5 py-1.5`}>
            <span className="text-[11px] text-muted">{d.label}</span>
            <span className="text-[11px] font-medium text-foreground">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
