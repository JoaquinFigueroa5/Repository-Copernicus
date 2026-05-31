import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MapSection from "@/components/MapSection";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:shadow-lg">
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <MapSection />
      </main>
    </>
  );
}
