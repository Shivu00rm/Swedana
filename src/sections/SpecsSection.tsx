import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ruler, Box, Zap, Thermometer, Layers, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SpecsSectionProps {
  className?: string;
}

const SpecsSection = ({ className = '' }: SpecsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'dimensions' | 'materials' | 'electrical'>('dimensions');

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
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
    }, section);

    return () => ctx.revert();
  }, []);

  const specs = {
    dimensions: {
      icon: Ruler,
      title: 'Dimensions',
      items: [
        { label: 'External Dimensions', value: '4\' × 4\' × 6\' (L × W × H)' },
        { label: 'Internal Dimensions', value: '3.5\' × 3.5\' × 5.7\'' },
        { label: 'Floor Area', value: '16 sq ft' },
        { label: 'Door Opening', value: '600mm × 1738mm' },
        { label: 'Bench Size', value: '960mm × 500mm' },
        { label: 'Bench Height', value: '400-450mm' },
        { label: 'Weight (assembled)', value: '~350-400 kg' },
      ],
    },
    materials: {
      icon: Layers,
      title: 'Materials',
      items: [
        { label: 'Wall Panels', value: 'Pine wood (15mm thickness)' },
        { label: 'Frame Structure', value: 'Neem wood (45×45mm)' },
        { label: 'Floor Panels', value: 'Pine wood (15mm thickness)' },
        { label: 'Bench Frame', value: 'Neem wood (60×45mm)' },
        { label: 'Bench Slats', value: 'Pine wood (20×30mm)' },
        { label: 'Insulation', value: 'Rockwool (50-75mm)' },
        { label: 'Vapor Barrier', value: 'Aluminum foil (heat-reflective)' },
        { label: 'Fasteners', value: 'Stainless steel (rust-proof)' },
      ],
    },
    electrical: {
      icon: Zap,
      title: 'Electrical',
      items: [
        { label: 'Heater Power', value: '4.5 kW electric' },
        { label: 'Voltage', value: '220V AC, Single phase' },
        { label: 'Circuit Required', value: '25A dedicated' },
        { label: 'Max Temperature', value: '90°C (194°F)' },
        { label: 'Control Type', value: 'Digital thermostat' },
        { label: 'Heat-up Time', value: '30-45 minutes' },
        { label: 'Lighting', value: 'LED ambient (IP65 rated)' },
        { label: 'Ventilation', value: 'Adjustable air vents' },
      ],
    },
  };

  const features = [
    'Double-wall construction with insulation',
    'Aluminum foil vapor barrier',
    'Precision-cut expansion gaps',
    'Stainless steel fasteners',
    'Digital temperature control',
    'LED ambient lighting',
    '2-year comprehensive warranty',
    'Professional installation included',
  ];

  return (
    <section
      ref={sectionRef}
      id="specs"
      className={`relative bg-zenith-black py-24 lg:py-32 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={contentRef}>
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-micro mb-4 block">TECHNICAL DETAILS</span>
            <h2 className="font-display font-bold text-3xl lg:text-5xl text-zenith-white mb-4">
              Specifications
            </h2>
            <p className="text-zenith-gray text-lg max-w-2xl mx-auto">
              Every detail engineered for performance, durability, and safety.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-10">
            {(Object.keys(specs) as Array<keyof typeof specs>).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-display font-medium text-sm transition-all ${
                  activeTab === tab
                    ? 'bg-zenith-gold text-zenith-black'
                    : 'bg-white/5 text-zenith-gray hover:bg-white/10 hover:text-zenith-white'
                }`}
              >
                {(() => {
                  const Icon = specs[tab].icon;
                  return <Icon className="w-4 h-4" />;
                })()}
                {specs[tab].title}
              </button>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Specs Table */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = specs[activeTab].icon;
                    return (
                      <div className="w-10 h-10 rounded-full bg-zenith-gold/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-zenith-gold" />
                      </div>
                    );
                  })()}
                  <h3 className="font-display font-semibold text-xl text-zenith-white">
                    {specs[activeTab].title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {specs[activeTab].items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-white/5 last:border-0"
                    >
                      <span className="text-zenith-gray">{item.label}</span>
                      <span className="text-zenith-white font-medium text-right">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features & Image */}
            <div>
              <div className="relative rounded-xl overflow-hidden mb-8">
                <img
                  src="/product_sauna.jpg"
                  alt="ZENITH Sauna Specifications"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zenith-black via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-zenith-gold" />
                      <span className="text-zenith-white text-sm">Up to 90°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Box className="w-4 h-4 text-zenith-gold" />
                      <span className="text-zenith-white text-sm">4×4×6 ft</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div>
                <h4 className="font-display font-semibold text-lg text-zenith-white mb-4">
                  Key Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-zenith-gold/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-zenith-gold" />
                      </div>
                      <span className="text-zenith-gray text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Construction Note */}
          <div className="mt-12 p-6 bg-zenith-gold/10 border border-zenith-gold/30 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-zenith-gold/20 flex items-center justify-center flex-shrink-0">
                <Layers className="w-5 h-5 text-zenith-gold" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-zenith-white mb-2">
                  Triple-Layer Wall Construction
                </h4>
                <p className="text-zenith-gray text-sm leading-relaxed">
                  Our saunas feature a unique sandwich construction: inner pine panels → rockwool 
                  insulation → aluminum foil vapor barrier → outer pine panels. This design provides 
                  superior heat retention, moisture protection, and structural integrity that lasts 
                  for decades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
