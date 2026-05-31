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

export default function DataCard({ data, onClear }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 16,
        scale: 0.97,
        duration: 0.4,
        ease: "power3.out",
      });
    }, cardRef);
    return () => ctx.revert();
  }, [data]);

  const isWarning = data.status === "warning";

  return (
    <div
      ref={cardRef}
      className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              isWarning ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"
            }`}
          >
            {isWarning ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
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
          className="rounded-lg p-1.5 text-muted hover:bg-border/50 hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-background p-3 text-center">
          <MapPin size={16} className="mx-auto mb-1 text-primary" />
          <p className="text-lg font-semibold text-foreground">
            {data.coordinates}
          </p>
          <p className="text-xs text-muted">Puntos</p>
        </div>
        <div className="rounded-xl bg-background p-3 text-center">
          <Droplets
            size={16}
            className={`mx-auto mb-1 ${isWarning ? "text-amber-500" : "text-green-500"}`}
          />
          <p className="text-lg font-semibold text-foreground">{data.leaks}</p>
          <p className="text-xs text-muted">Fugas</p>
        </div>
        <div className="rounded-xl bg-background p-3 text-center">
          <Hash size={16} className="mx-auto mb-1 text-accent" />
          <p className="text-lg font-semibold text-foreground">
            {data.sectors.length}
          </p>
          <p className="text-xs text-muted">Sectores</p>
        </div>
      </div>

      <div className="space-y-2">
        {data.details.map((d, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg bg-background px-3 py-2"
          >
            <span className="text-xs text-muted">{d.label}</span>
            <span className="text-xs font-medium text-foreground">
              {d.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
