import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Package, Clock, Users, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Left image panel entrance
      loadTl.fromTo(
        imageRef.current,
        { opacity: 0, x: '-6vw', scale: 1.06 },
        { opacity: 1, x: 0, scale: 1, duration: 1.0 },
        0
      );

      // Logo mark entrance - BIGGER and more prominent
      loadTl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.7, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' },
        0.2
      );

      // Headline lines entrance
      const headlineLines = headlineRef.current?.querySelectorAll('.headline-line');
      if (headlineLines) {
        loadTl.fromTo(
          headlineLines,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          0.4
        );
      }

      // Subheadline + CTAs entrance
      loadTl.fromTo(
        [subheadlineRef.current, ctaRef.current],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.6
      );

      // Badges entrance
      loadTl.fromTo(
        badgesRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.8
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

  const diyBadges = [
    { icon: Package, label: 'Flat-Packed', desc: 'Easy delivery' },
    { icon: Clock, label: '4-6 Hours', desc: 'Assembly time' },
    { icon: Users, label: '2 People', desc: 'Recommended' },
    { icon: Wrench, label: 'Basic Tools', desc: 'All included' },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`section-pinned bg-zenith-black ${className}`}
    >
      {/* Left panel - Image */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-full lg:w-1/2 h-full"
      >
        <img
          src="/sauna_completed.jpg"
          alt="SWEDANA DIY Sauna Kit"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay to blend into right side */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-zenith-black/85 hidden lg:block" />
        {/* Mobile overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zenith-black via-zenith-black/50 to-transparent lg:hidden" />
      </div>

      {/* Warm haze blob */}
      <div
        className="absolute hidden lg:block"
        style={{
          left: '18vw',
          top: '40vh',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(227,176,97,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Right panel - Content */}
      <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full flex flex-col justify-center px-6 lg:px-12">
        {/* Logo mark - BIGGER AND MORE VISIBLE */}
        <div ref={logoRef} className="mb-6 flex flex-col items-center lg:items-start">
          <div className="relative">
            <img
              src="/swedana_logo.png"
              alt="SWEDANA"
              className="w-32 h-32 lg:w-40 lg:h-40 object-contain drop-shadow-2xl"
            />
            {/* Glow effect behind logo */}
            <div 
              className="absolute inset-0 -z-10 blur-3xl opacity-30"
              style={{
                background: 'radial-gradient(circle, #E3B061 0%, transparent 70%)',
              }}
            />
          </div>
          <div className="mt-4 text-center lg:text-left">
            <span className="font-display font-bold text-2xl lg:text-3xl text-zenith-white tracking-wide">
              SWEDANA
            </span>
            <span className="block text-zenith-gold text-xs tracking-[0.3em] uppercase mt-1">
              Ayurvedic Heat Therapy
            </span>
          </div>
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="mb-4">
          <span className="text-micro text-zenith-gold mb-2 block">INDIA&apos;S FIRST DIY SAUNA KIT</span>
          <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1]">
            <span className="headline-line block">Build Your Own</span>
            <span className="headline-line block text-gradient-gold">Wellness Sanctuary</span>
          </h1>
        </div>

        {/* Subheadline */}
        <div ref={subheadlineRef} className="mb-6 max-w-md">
          <p className="text-zenith-gray text-base lg:text-lg leading-relaxed mb-4">
            SWEDANA brings authentic Ayurvedic heat therapy to your home. 
            Our modular DIY sauna kit assembles in just 4 simple steps — 
            like IKEA, but for wellness.
          </p>
          <p className="text-zenith-gold text-sm font-medium">
            स्वेदन (Swedana): The ancient practice of therapeutic sweating
          </p>
        </div>

        {/* DIY Badges */}
        <div ref={badgesRef} className="grid grid-cols-2 gap-3 mb-8 max-w-sm">
          {diyBadges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
              <badge.icon className="w-4 h-4 text-zenith-gold" />
              <div>
                <p className="text-zenith-white text-xs font-semibold">{badge.label}</p>
                <p className="text-zenith-gray text-[10px]">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollToSection('product')}
            className="btn-gold"
          >
            Get Your Kit
          </button>
          <button
            onClick={() => scrollToSection('assembly')}
            className="btn-outline-gold"
          >
            See How It Works
          </button>
        </div>
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette pointer-events-none" />
    </section>
  );
};

export default HeroSection;
