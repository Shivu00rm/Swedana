import { useRef, useLayoutEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import sections
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import BenefitsSection from './sections/BenefitsSection';
import AssemblySection from './sections/AssemblySection';
import SpecsSection from './sections/SpecsSection';
import ProductSection from './sections/ProductSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

// Lazy load admin dashboard
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));

gsap.registerPlugin(ScrollTrigger);

// Main Website Component
const MainWebsite = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;
            
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out",
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-zenith-black">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <main className="relative">
        <HeroSection className="z-10" />
        <BenefitsSection className="z-20" />
        <AssemblySection className="z-30" />
        <SpecsSection className="z-40" />
        <ProductSection className="z-50" />
        <ContactSection className="z-[60]" />
        <Footer className="z-[70]" />
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainWebsite />} />
        <Route 
          path="/admin" 
          element={
            <Suspense fallback={
              <div className="min-h-screen bg-zenith-black flex items-center justify-center">
                <div className="text-zenith-gold">Loading Admin...</div>
              </div>
            }>
              <AdminDashboard />
            </Suspense>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
