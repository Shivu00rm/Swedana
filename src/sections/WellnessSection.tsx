import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WellnessSectionProps {
  className?: string;
}

const WellnessSection = ({ className = '' }: WellnessSectionProps) => {
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

      // Background image animation
      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.18, x: '8vw', opacity: 0.6 },
        { scale: 1, x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Headline entrance
      scrollTl.fromTo(
        headlineRef.current,
        { opacity: 0, y: '18vh', scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, ease: 'none' },
        0
      );

      // Subheadline + CTA entrance
      scrollTl.fromTo(
        [subheadlineRef.current, ctaRef.current],
        { opacity: 0, y: '10vh' },
        { opacity: 1, y: 0, ease: 'none' },
        0.05
      );

      // SETTLE (30-70%): Hold - no animation needed

      // EXIT (70-100%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, x: 0, opacity: 1 },
        { scale: 1.10, x: '-6vw', opacity: 0.3, ease: 'power2.in' },
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
      id="wellness"
      className={`section-pinned ${className}`}
    >
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/wellness_bg.jpg"
          alt="Wellness practice"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 overlay-dark" />

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
          WELLNESS IS A PRACTICE
        </h2>
        
        <p
          ref={subheadlineRef}
          className="text-zenith-gray text-base sm:text-lg lg:text-xl text-center max-w-2xl mb-8 lg:mb-10 px-4"
        >
          Small rituals, repeated daily, become transformation.
        </p>
        
        <button
          ref={ctaRef}
          onClick={() => scrollToSection('ritual')}
          className="btn-outline-gold"
        >
          See the benefits
        </button>
      </div>
    </section>
  );
};

export default WellnessSection;
