import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet-async';

// Import sections
import HeroSection from '../sections/HeroSection';
import BenefitsSection from '../sections/BenefitsSection';
import AssemblySection from '../sections/AssemblySection';
import SpecsSection from '../sections/SpecsSection';
import ProductSection from '../sections/ProductSection';
import ContactSection from '../sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
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
    <>
      <Helmet>
        <title>SWEDANA | India's DIY Modular Sauna Kit</title>
        <meta name="description" content="Build your own wellness sanctuary with SWEDANA. Easy 4-step assembly, premium materials, authentic Ayurvedic heat therapy. Made in India." />
        <meta name="keywords" content="swedana, sauna, DIY sauna, home sauna, modular sauna, ayurveda, heat therapy, wellness, India" />
        <meta property="og:title" content="SWEDANA | India's DIY Modular Sauna Kit" />
        <meta property="og:description" content="Build your own wellness sanctuary with SWEDANA. Easy 4-step assembly, premium materials, authentic Ayurvedic heat therapy." />
        <meta property="og:url" content="https://swedanaa.vercel.app/" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div ref={mainRef} className="relative bg-zenith-black">
        {/* Noise overlay */}
        <div className="noise-overlay" />
        
        {/* Sections */}
        <main className="relative">
          <HeroSection className="z-10" />
          <BenefitsSection className="z-20" />
          <AssemblySection className="z-30" />
          <SpecsSection className="z-40" />
          <ProductSection className="z-50" />
          <ContactSection className="z-[60]" />
        </main>
      </div>
    </>
  );
};

export default HomePage;
