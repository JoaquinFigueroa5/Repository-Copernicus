import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MapSection from "@/components/MapSection";
import UploadPanel from "@/components/UploadPanel";
import ClientAnimations from "@/components/ClientAnimations";

export default function Home() {
  return (
    <>
      <Navbar />
      <ClientAnimations>
        <div data-animate="hero">
          <Hero />
        </div>
        <main className="mx-auto w-full max-w-7xl px-6 py-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            <div className="md:col-span-2 lg:col-span-3" data-animate="map">
              <MapSection />
            </div>
            <div className="md:col-span-1" data-animate="panel">
              <UploadPanel />
            </div>
          </div>
        </main>
      </ClientAnimations>
    </>
  );
}
