import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Brain, Zap, Moon, Sparkles, Activity, Shield, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BenefitsSectionProps {
  className?: string;
}

const BenefitsSection = ({ className = '' }: BenefitsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.benefit-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      icon: Heart,
      image: '/benefit_heart.jpg',
      title: 'Cardiovascular Health',
      subtitle: 'Heart Health',
      description: 'Frequent sauna use (4-7 times/week) is linked to dramatic heart health improvements. Studies show up to 60% reduction in stroke risk and improved blood pressure management through vasodilation.',
      stats: ['60% lower stroke risk', 'Improved BP management', 'Better endothelial function'],
    },
    {
      icon: Brain,
      image: '/benefit_brain.jpg',
      title: 'Brain Health & Cognition',
      subtitle: 'Mental Clarity',
      description: 'Heat exposure increases BDNF (Brain-Derived Neurotrophic Factor) - like "Miracle-Gro" for your brain. Finnish studies show 65-66% lower risk of dementia and Alzheimer\'s with regular use.',
      stats: ['65% lower dementia risk', 'Increased BDNF production', 'Enhanced neuron growth'],
    },
    {
      icon: Zap,
      image: '/benefit_recovery.jpg',
      title: 'Physical Recovery',
      subtitle: 'Muscle Repair',
      description: 'Increased blood flow delivers more oxygen and nutrients to tired muscles, speeding up recovery. Highly effective for reducing pain in rheumatoid arthritis, fibromyalgia, and chronic back pain.',
      stats: ['Faster muscle repair', 'Reduced inflammation', 'Lower CRP levels'],
    },
    {
      icon: Sparkles,
      image: '/benefit_skin.jpg',
      title: 'Skin Health & Detox',
      subtitle: 'Natural Glow',
      description: 'Heavy sweating clears pores and improves skin barrier function. Sweat is an effective pathway for excreting heavy metals like lead, cadmium, and arsenic from the body.',
      stats: ['Deep pore cleansing', 'Heavy metal excretion', 'Improved skin texture'],
    },
    {
      icon: Moon,
      image: '/wellness_bg.jpg',
      title: 'Sleep Quality',
      subtitle: 'Rest & Recovery',
      description: 'Sauna sessions raise core body temperature; the subsequent cooling phase helps initiate sleep mechanisms. Users report faster sleep onset and deeper, uninterrupted sleep.',
      stats: ['Faster sleep onset', 'Deeper sleep cycles', 'Improved consistency'],
    },
    {
      icon: Activity,
      image: '/ritual_bg.jpg',
      title: 'Metabolic Health',
      subtitle: 'Energy & Vitality',
      description: 'Heart rate climbs to 120-150 BPM in a sauna, mimicking moderate exercise. Sessions trigger growth hormone spikes and improve insulin sensitivity.',
      stats: ['HGH boost', 'Improved insulin sensitivity', 'Increased calorie burn'],
    },
    {
      icon: Shield,
      image: '/home_sanctuary_bg.jpg',
      title: 'Immune Support',
      subtitle: 'Cellular Defense',
      description: 'Heat shock proteins (HSPs) repair damaged cellular proteins. A single session increases white blood cell concentration, making your immune system more primed to fight infection.',
      stats: ['HSP activation', 'Increased WBC count', 'Enhanced cellular resilience'],
    },
    {
      icon: Flame,
      image: '/everyday_bg.jpg',
      title: 'Stress Reduction',
      subtitle: 'Mental Wellness',
      description: 'Saunas reduce cortisol (stress hormone) and stimulate endorphin release, creating a natural "sauna high" similar to runner\'s high. The ritual provides digital disconnection and mindfulness.',
      stats: ['Reduced cortisol', 'Endorphin release', 'Mental clarity'],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className={`relative bg-zenith-black py-24 lg:py-32 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20">
          <span className="text-micro mb-4 block">SCIENCE-BACKED WELLNESS</span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl xl:text-6xl text-zenith-white mb-6">
            The Power of Heat Therapy
          </h2>
          <p className="text-zenith-gray text-lg lg:text-xl max-w-3xl mx-auto">
            Regular dry sauna use acts as a "hormetic stressor" — a beneficial, low-level stress 
            that forces your body to adapt and become more resilient, much like exercise does.
          </p>
        </div>

        {/* Benefits Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card group bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden hover:border-zenith-gold/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zenith-black via-zenith-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-10 h-10 rounded-full bg-zenith-gold/20 flex items-center justify-center mb-2">
                    <benefit.icon className="w-5 h-5 text-zenith-gold" />
                  </div>
                  <span className="text-micro text-zenith-gold">{benefit.subtitle}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg text-zenith-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-zenith-gray text-sm leading-relaxed mb-4">
                  {benefit.description}
                </p>
                <ul className="space-y-1">
                  {benefit.stats.map((stat, statIndex) => (
                    <li key={statIndex} className="flex items-center gap-2 text-xs text-zenith-gold/80">
                      <span className="w-1 h-1 rounded-full bg-zenith-gold" />
                      {stat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Research Note */}
        <div className="mt-16 text-center">
          <p className="text-zenith-gray/60 text-sm max-w-2xl mx-auto">
            *All health claims are based on peer-reviewed clinical studies, primarily from Finnish research 
            institutions. Individual results may vary. Consult your physician before beginning sauna therapy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
