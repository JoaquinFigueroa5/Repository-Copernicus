"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker, Marker, Polygon, Tooltip } from "react-leaflet";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import L from "leaflet";

gsap.registerPlugin(ScrollTrigger);

const reservoir = { pos: [14.652, -91.305], label: "Tanque principal — 50,000 L" };

const pipes = [
  { color: "#15803d", weight: 5, opacity: 0.85, label: "Principal",
    positions: [[14.652, -91.305], [14.653, -91.295], [14.655, -91.285], [14.656, -91.275], [14.658, -91.265]] },
  { color: "#16a34a", weight: 3.5, opacity: 0.8, label: "Secundaria",
    positions: [[14.653, -91.295], [14.660, -91.297], [14.666, -91.295]] },
  { color: "#16a34a", weight: 3.5, opacity: 0.8,
    positions: [[14.655, -91.285], [14.648, -91.284], [14.642, -91.286]] },
  { color: "#16a34a", weight: 3.5, opacity: 0.8,
    positions: [[14.656, -91.275], [14.662, -91.272], [14.668, -91.268]] },
  { color: "#22c55e", weight: 2.5, opacity: 0.7,
    positions: [[14.660, -91.297], [14.662, -91.302], [14.665, -91.308]] },
  { color: "#22c55e", weight: 2.5, opacity: 0.7,
    positions: [[14.658, -91.300], [14.655, -91.298], [14.652, -91.296]] },
  { color: "#22c55e", weight: 2.5, opacity: 0.7,
    positions: [[14.648, -91.284], [14.647, -91.279], [14.649, -91.274]] },
  { color: "#22c55e", weight: 2.5, opacity: 0.7,
    positions: [[14.642, -91.286], [14.639, -91.290], [14.636, -91.293]] },
  { color: "#22c55e", weight: 2.5, opacity: 0.7,
    positions: [[14.662, -91.272], [14.660, -91.267], [14.663, -91.262]] },
  { color: "#22c55e", weight: 2.5, opacity: 0.7,
    positions: [[14.670, -91.294], [14.668, -91.290], [14.666, -91.286]] },
];

const junctions = [
  [14.653, -91.295], [14.655, -91.285], [14.656, -91.275],
  [14.660, -91.297], [14.648, -91.284], [14.662, -91.272],
  [14.666, -91.295], [14.642, -91.286], [14.668, -91.268],
  [14.658, -91.265], [14.652, -91.296],
];

const leaks = [
  { pos: [14.662, -91.300], label: "Fuga — Ramal Norte" },
  { pos: [14.647, -91.281], label: "Fuga — Ramal Sur" },
  { pos: [14.661, -91.266], label: "Fuga — Ramal Este" },
];

const sectors = [
  { label: "Sector Norte", color: "#22c55e", center: [14.667, -91.283],
    positions: [[14.678, -91.312], [14.678, -91.255], [14.656, -91.255], [14.656, -91.312]] },
  { label: "Sector Centro", color: "#eab308", center: [14.650, -91.283],
    positions: [[14.656, -91.312], [14.656, -91.255], [14.645, -91.255], [14.645, -91.312]] },
  { label: "Sector Sur", color: "#f97316", center: [14.637, -91.283],
    positions: [[14.645, -91.312], [14.645, -91.255], [14.630, -91.255], [14.630, -91.312]] },
];

function createLeakIcon() {
  return L.divIcon({
    className: "",
    html: `<div style="position:relative;width:44px;height:44px">
      <div style="position:absolute;inset:0;border-radius:50%;border:2px solid #f97316;animation:ripple 2.5s ease-out infinite"></div>
      <div style="position:absolute;inset:0;border-radius:50%;border:2px solid #f97316;animation:ripple 2.5s ease-out 0.8s infinite"></div>
      <div style="position:absolute;inset:0;border-radius:50%;border:2px solid #f97316;animation:ripple 2.5s ease-out 1.6s infinite"></div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:14px;height:14px;border-radius:50%;background:#dc2626;box-shadow:0 0 12px rgba(220,38,38,0.7)"></div>
    </div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

function createReservoirIcon() {
  return L.divIcon({
    className: "",
    html: `<div style="position:relative;width:48px;height:48px">
      <div style="position:absolute;inset:0;border-radius:50%;background:rgba(37,99,235,0.25);animation:reservoir-pulse 2.5s ease-in-out infinite"></div>
      <svg viewBox="0 0 24 24" width="32" height="32" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);filter:drop-shadow(0 0 6px rgba(59,130,246,0.6))">
        <path d="M12 2C8 2 4 6 4 10c0 4 8 12 8 12s8-8 8-12c0-4-4-8-8-8z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1"/>
        <path d="M10 10c0-1.1.9-2 2-2s2 .9 2 2" fill="none" stroke="#93c5fd" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </div>`,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
}

const leakIcon = createLeakIcon();
const reservoirIcon = createReservoirIcon();

export default function MapView() {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="map-section" ref={sectionRef} className="relative h-screen w-full overflow-hidden scroll-mt-16" style={{ touchAction: "manipulation" }}>
      <MapContainer
        center={[14.654, -91.285]}
        zoom={14}
        className="absolute inset-0 z-0 h-full w-full"
        zoomControl={true}
        attributionControl={false}
        ref={mapRef}
      >
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />

        {sectors.map((s, i) => (
          <Polygon
            key={`sector-${i}`}
            positions={s.positions}
            pathOptions={{
              color: s.color,
              weight: 1.5,
              opacity: 0.4,
              fillColor: s.color,
              fillOpacity: 0.05,
              className: "",
              interactive: false,
            }}
          />
        ))}

        {sectors.map((s, i) => (
          <Marker
            key={`sector-label-${i}`}
            position={s.center}
            icon={L.divIcon({
              className: "",
              html: `<span style="font-size:11px;font-weight:500;color:rgba(255,255,255,0.35);letter-spacing:0.1em;text-shadow:0 2px 8px rgba(0,0,0,0.8)">${s.label}</span>`,
              iconSize: [0, 0],
              iconAnchor: [0, 0],
            })}
          />
        ))}

        {pipes.map((pipe, i) => (
          <g key={`pipe-group-${i}`}>
            <Polyline
              positions={pipe.positions}
              pathOptions={{
                color: "rgba(255,255,255,0.08)",
                weight: pipe.weight + 8,
                opacity: 1,
                className: "pipe-glow",
              }}
            />
            <Polyline
              positions={pipe.positions}
              pathOptions={{
                color: pipe.color,
                weight: pipe.weight,
                opacity: pipe.opacity,
                className: "",
              }}
            />
            {pipe.label === "Principal" && (
              <Polyline
                positions={pipe.positions}
                pathOptions={{
                  color: "rgba(255,255,255,0.5)",
                  weight: pipe.weight - 1,
                  opacity: 0.6,
                  className: "pipe-flow",
                }}
              />
            )}
          </g>
        ))}

        {junctions.map((pos, i) => (
          <CircleMarker
            key={`jct-${i}`}
            center={pos}
            radius={4.5}
            pathOptions={{
              color: "#166534",
              fillColor: "#4ade80",
              fillOpacity: 1,
              weight: 2.5,
            }}
          />
        ))}

        {leaks.map((l, i) => (
          <Marker key={`leak-${i}`} position={l.pos} icon={leakIcon}>
            <Tooltip permanent direction="top" offset={[0, -24]}>
              <span className="text-xs font-bold text-red-600">{l.label}</span>
            </Tooltip>
          </Marker>
        ))}

        <Marker position={reservoir.pos} icon={reservoirIcon}>
          <Tooltip permanent direction="right" offset={[10, 0]}>
            <span className="text-xs font-bold text-blue-700">{reservoir.label}</span>
          </Tooltip>
        </Marker>
      </MapContainer>

      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.5)_100%)]" />

      <div className="pointer-events-none absolute inset-0 z-[3]">
        <div className="pointer-events-auto absolute left-5 top-5 flex items-center gap-3 rounded-xl bg-black/50 px-4 py-3 text-white backdrop-blur-md">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden="true"><path d="M12 2a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8z"/></svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Mapa de Tuberías</h2>
            <p className="text-xs text-white/60">Sector Agrícola — Guatemala</p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-5 z-[3]">
        <div className="pointer-events-auto rounded-xl bg-black/60 px-4 py-3 text-xs text-white/90 backdrop-blur-md">
          <div className="mb-2 font-semibold text-white">Leyenda</div>
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full bg-blue-500 border border-white/30" /> Tanque principal</span>
            <span className="flex items-center gap-2"><span className="inline-block h-1 w-5 rounded-full bg-emerald-600" /> Tubería principal</span>
            <span className="flex items-center gap-2"><span className="inline-block h-0.5 w-5 border-t-2 border-dashed border-white/60" style={{animation: "flow 1s linear infinite"}} /> Flujo de agua</span>
            <span className="flex items-center gap-2"><span className="inline-block h-1 w-5 rounded-full bg-green-500" /> Tubería secundaria</span>
            <span className="flex items-center gap-2"><span className="inline-block h-1 w-5 rounded-full bg-green-300" /> Tubería terciaria</span>
            <span className="flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(220,38,38,0.6)]" /> Fuga detectada</span>
          </div>
        </div>
      </div>
    </section>
  );
}
