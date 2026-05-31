"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ClientAnimations({ children }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = wrapperRef.current.querySelector("[data-animate='hero']");
      const map = wrapperRef.current.querySelector("[data-animate='map']");
      const panel = wrapperRef.current.querySelector("[data-animate='panel']");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (hero) {
        tl.from(hero, { opacity: 0, y: 40, duration: 0.8 });
      }

      if (map && panel) {
        tl.from(
          map,
          { opacity: 0, x: -30, duration: 0.7 },
          "-=0.4"
        );
        tl.from(
          panel,
          { opacity: 0, x: 30, duration: 0.7 },
          "-=0.5"
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
