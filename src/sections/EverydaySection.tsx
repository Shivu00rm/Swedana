import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EverydaySectionProps {
  className?: string;
}

const EverydaySection = ({ className = '' }: EverydaySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.18, opacity: 0.6 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { opacity: 0, y: '18vh', scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        [subheadlineRef.current, ctaRef.current],
        { opacity: 0, y: '10vh' },
        { opacity: 1, y: 0, ease: 'none' },
        0.05
      );

      // EXIT (70-100%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.10, opacity: 0.3, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1, scale: 1 },
        { y: '-10vh', opacity: 0, scale: 1.02, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [subheadlineRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="everyday"
      className={`section-pinned ${className}`}
    >
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/everyday_bg.jpg"
          alt="Everyday wellness"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 overlay-dark-strong" />

      {/* Warm vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(11,11,12,0.5) 100%)',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <h2
          ref={headlineRef}
          className="heading-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center mb-6 lg:mb-8"
        >
          WELLNESS, EVERY DAY
        </h2>
        
        <p
          ref={subheadlineRef}
          className="text-zenith-gray text-base sm:text-lg lg:text-xl text-center max-w-2xl mb-8 lg:mb-10 px-4"
        >
          Designed for real homes. Built for real life.
        </p>
        
        <button
          ref={ctaRef}
          onClick={() => scrollToSection('contact')}
          className="btn-gold"
        >
          Book your consultation
        </button>
      </div>
    </section>
  );
};

export default EverydaySection;
