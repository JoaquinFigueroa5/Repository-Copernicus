"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, FileUp, Beaker } from "lucide-react";
import DataCard from "./DataCard";

const SAMPLE_DATA = {
  name: "ejemplo_finca_el_rosal.geojson",
  type: "GeoJSON",
  coordinates: 12,
  leaks: 2,
  sectors: ["Norte", "Este"],
  status: "warning",
  details: [
    { label: "Coordenadas", value: "14.650°N, 91.300°W" },
    { label: "Extensión", value: "3.2 km de tubería" },
    { label: "Fugas detectadas", value: "2 — Sectores Norte y Este" },
    { label: "Presión promedio", value: "1.8 bar (bajo)" },
  ],
};

export default function UploadPanel({ variant = "default" }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const overlay = variant === "overlay";

  function parseFile(file) {
    setLoading(true);
    setData(null);

    setTimeout(() => {
      const ext = file.name.split(".").pop().toLowerCase();
      const mock = {
        name: file.name,
        type: ext === "geojson" || ext === "json" ? "GeoJSON" : "CSV",
        coordinates: Math.floor(Math.random() * 20) + 5,
        leaks: Math.floor(Math.random() * 4),
        sectors: ["Norte", "Centro"],
        status: Math.random() > 0.4 ? "warning" : "safe",
        details: [
          { label: "Coordenadas", value: `~14.65°N, 91.30°W` },
          { label: "Extensión", value: `${(Math.random() * 5 + 1).toFixed(1)} km de tubería` },
          { label: "Fugas detectadas", value: `${Math.floor(Math.random() * 4)} — Sectores censados` },
          { label: "Archivo", value: file.name },
        ],
      };
      setData(mock);
      setLoading(false);
    }, 1200);
  }

  function loadSample() {
    setLoading(true);
    setData(null);
    setTimeout(() => {
      setData(SAMPLE_DATA);
      setLoading(false);
    }, 800);
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) parseFile(file);
  }, []);

  function handleFileInput(e) {
    const file = e.target.files[0];
    if (file) parseFile(file);
  }

  const panelBg = overlay
    ? "bg-white/90 backdrop-blur-xl shadow-lg border border-white/20"
    : "bg-surface border border-border shadow-sm";

  const dropBg = overlay
    ? "bg-white/50 border-white/30 hover:border-primary/60"
    : "bg-surface border-border hover:border-primary/40";

  return (
    <section className={`flex flex-col gap-3 rounded-2xl ${panelBg} p-5 transition-all`}>
      <button
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
        type="button"
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-5 text-center transition-all duration-200 ${
          dragOver ? "border-primary bg-primary/10" : dropBg
        }`}
        onClick={() => inputRef.current?.click()}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Upload size={20} aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            Arrastra tu archivo aquí
          </p>
          <p className="mt-0.5 text-xs text-muted">
            GeoJSON, JSON o CSV
          </p>
        </div>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".geojson,.json,.csv"
        className="sr-only"
        onChange={handleFileInput}
        aria-label="Seleccionar archivo GeoJSON, JSON o CSV"
        tabIndex={-1}
      />

      <div className="flex gap-2">
        <button
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary-dark disabled:opacity-50"
        >
          <FileUp size={15} aria-hidden="true" />
          Subir archivo
        </button>
        <button
          onClick={loadSample}
          disabled={loading}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-accent bg-accent/10 px-3 py-2.5 text-sm font-medium text-accent transition-all hover:bg-accent/20 disabled:opacity-50"
        >
          <Beaker size={15} aria-hidden="true" />
          Ejemplo
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-border/50 bg-white/50 p-4" role="status" aria-live="polite">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-xs text-muted">Analizando datos&hellip;</span>
        </div>
      )}

      {data && !loading && (
        <DataCard data={data} onClear={() => setData(null)} overlay />
      )}
    </section>
  );
}
