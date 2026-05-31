import { TreePine, Droplets, Satellite } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background to-white">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <div className="mx-auto mb-6 flex items-center justify-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Satellite size={24} />
          </span>
          <span className="hidden h-px w-12 bg-border sm:block" />
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <Droplets size={24} />
          </span>
          <span className="hidden h-px w-12 bg-border sm:block" />
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <TreePine size={24} />
          </span>
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Satélites y Tuberías
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          Tecnología satelital para la detección temprana de fugas en tuberías
          subterráneas. Ayudamos a agricultores a proteger sus cultivos y
          optimizar el uso del agua.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Monitoreo satelital
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Detección de fugas
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Ahorro de agua
          </span>
        </div>
      </div>
    </section>
  );
}
