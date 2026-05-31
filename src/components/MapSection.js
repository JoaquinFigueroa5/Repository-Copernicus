"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UploadPanel from "./UploadPanel";

gsap.registerPlugin(ScrollTrigger);

const MapView = dynamic(() => import("./MapView"), { ssr: false });

export default function MapSection() {
  const panelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(panelRef.current, {
        scrollTrigger: { trigger: "#map-section", start: "top 75%" },
        opacity: 0,
        x: 40,
        duration: 0.7,
        ease: "power3.out",
      });
    }, panelRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      <MapView />
      <div
        ref={panelRef}
        className="pointer-events-none absolute right-6 top-1/2 z-[5] w-80 -translate-y-1/2 lg:w-88"
      >
        <div className="pointer-events-auto">
          <UploadPanel variant="overlay" />
        </div>
      </div>
    </div>
  );
}
