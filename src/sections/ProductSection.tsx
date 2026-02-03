import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Download, ArrowRight, Star, Shield, Clock, Package, Wrench, Zap } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface ProductSectionProps {
  className?: string;
}

const ProductSection = ({ className = '' }: ProductSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [showSpecsDialog, setShowSpecsDialog] = useState(false);
  const [activeProduct, setActiveProduct] = useState<'standard' | 'custom'>('standard');

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

  const standardKitContents = [
    '4 Neem wood base beams + joists',
    '4 Pre-insulated wall panels',
    'Ceiling panels with insulation',
    'Pine wood bench (pre-assembled)',
    '4.5kW electric heater',
    'Digital control panel',
    'LED lighting kit',
    'All hardware & tools included',
    'Step-by-step assembly guide',
  ];

  const customKitContents = [
    'Custom-sized base & frame',
    'Choice of wood (pine/hemlock/cedar)',
    'Custom wall panel configuration',
    'Built-in audio system option',
    'Chromotherapy lighting',
    'Higher capacity heater options',
    'Personalized design consultation',
    'White-glove installation service',
    '3-year extended warranty',
  ];

  return (
    <section
      ref={sectionRef}
      id="product"
      className={`relative bg-zenith-black py-24 lg:py-32 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={contentRef}>
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-micro mb-4 block">CHOOSE YOUR KIT</span>
            <h2 className="font-display font-bold text-3xl lg:text-5xl text-zenith-white mb-4">
              Get Your SWEDANA Kit
            </h2>
            <p className="text-zenith-gray text-lg max-w-2xl mx-auto">
              Two options, both delivered flat-packed to your door. 
              Assembly takes just 4-6 hours with basic tools.
            </p>
          </div>

          {/* Product Tabs */}
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setActiveProduct('standard')}
              className={`px-8 py-4 rounded-full font-display font-semibold text-sm transition-all ${
                activeProduct === 'standard'
                  ? 'bg-zenith-gold text-zenith-black'
                  : 'bg-white/5 text-zenith-gray hover:bg-white/10 hover:text-zenith-white'
              }`}
            >
              Standard Kit
            </button>
            <button
              onClick={() => setActiveProduct('custom')}
              className={`px-8 py-4 rounded-full font-display font-semibold text-sm transition-all ${
                activeProduct === 'custom'
                  ? 'bg-zenith-gold text-zenith-black'
                  : 'bg-white/5 text-zenith-gray hover:bg-white/10 hover:text-zenith-white'
              }`}
            >
              Custom Kit
            </button>
          </div>

          {/* Product Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={activeProduct === 'standard' ? '/diy_step1.jpg' : '/sauna_completed.jpg'}
                alt={activeProduct === 'standard' ? 'SWEDANA Standard Kit' : 'SWEDANA Custom Kit'}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zenith-black via-transparent to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {activeProduct === 'standard' ? (
                  <>
                    <span className="px-3 py-1 bg-zenith-gold text-zenith-black text-xs font-semibold rounded-full">
                      Most Popular
                    </span>
                    <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                      Ships in 48h
                    </span>
                  </>
                ) : (
                  <>
                    <span className="px-3 py-1 bg-zenith-gold text-zenith-black text-xs font-semibold rounded-full">
                      Bespoke
                    </span>
                    <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                      Made to Order
                    </span>
                  </>
                )}
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-zenith-gold" />
                    <span className="text-zenith-white text-sm">Flat-packed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-zenith-gold" />
                    <span className="text-zenith-white text-sm">DIY Assembly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-zenith-gold" />
                    <span className="text-zenith-white text-sm">220V Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <span className="text-micro text-zenith-gold mb-2 block">
                  {activeProduct === 'standard' ? 'DIY SAUNA KIT' : 'BESPOKE SAUNA KIT'}
                </span>
                <h3 className="font-display font-bold text-2xl lg:text-3xl text-zenith-white mb-3">
                  {activeProduct === 'standard' ? 'SWEDANA Standard Kit' : 'SWEDANA Custom Kit'}
                </h3>
                <p className="text-zenith-gray leading-relaxed">
                  {activeProduct === 'standard'
                    ? 'Everything you need to build your own 4×4×6 ft sauna. All components pre-cut, pre-insulated, and ready to assemble. Just follow our step-by-step guide.'
                    : 'A fully customized sauna designed to your exact specifications. Our team works with you on dimensions, wood choice, and features — then delivers your bespoke kit.'}
                </p>
              </div>

              {/* Kit Contents */}
              <div className="mb-6">
                <p className="text-zenith-white font-semibold text-sm mb-3">
                  {activeProduct === 'standard' ? 'What\'s in the box:' : 'What you get:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(activeProduct === 'standard' ? standardKitContents : customKitContents).map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-zenith-gold/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-zenith-gold" />
                      </div>
                      <span className="text-zenith-gray text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div>
                  <p className="text-zenith-gold font-display font-bold text-2xl lg:text-3xl">
                    {activeProduct === 'standard' ? '₹4,95,000' : 'Starting ₹6,50,000'}
                  </p>
                  <p className="text-zenith-gray text-xs">
                    {activeProduct === 'standard' ? 'Free shipping & GST included' : 'Price varies by configuration'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => activeProduct === 'standard' ? setShowQuoteDialog(true) : setShowCustomDialog(true)}
                  className="btn-gold"
                >
                  {activeProduct === 'standard' ? 'Order Your Kit' : 'Request Consultation'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button 
                  onClick={() => setShowSpecsDialog(true)}
                  className="btn-outline-gold"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Full Specs
                </button>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: '2-3 Year Warranty', desc: 'Full coverage' },
              { icon: Clock, label: '4-6 Hour Assembly', desc: 'DIY friendly' },
              { icon: Package, label: 'Pan-India Shipping', desc: 'Free delivery' },
              { icon: Star, label: 'Premium Materials', desc: 'Finnish design' },
            ].map((badge, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/10 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-zenith-gold/10 flex items-center justify-center flex-shrink-0">
                  <badge.icon className="w-5 h-5 text-zenith-gold" />
                </div>
                <div>
                  <p className="text-zenith-white font-semibold text-sm">{badge.label}</p>
                  <p className="text-zenith-gray text-xs">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Dialog */}
      <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
        <DialogContent className="bg-zenith-charcoal border-white/10 text-zenith-white max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-xl">Order Your SWEDANA Kit</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <p className="text-zenith-gray text-sm">
              Ready to build your wellness sanctuary? Fill in your details and we&apos;ll get your kit shipped within 48 hours.
            </p>
            <input type="text" placeholder="Your name" className="w-full" />
            <input type="email" placeholder="Email address" className="w-full" />
            <input type="tel" placeholder="Phone number" className="w-full" />
            <input type="text" placeholder="Delivery city" className="w-full" />
            <button 
              onClick={() => setShowQuoteDialog(false)}
              className="btn-gold w-full"
            >
              Place Order
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Custom Kit Dialog */}
      <Dialog open={showCustomDialog} onOpenChange={setShowCustomDialog}>
        <DialogContent className="bg-zenith-charcoal border-white/10 text-zenith-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-xl">Custom SWEDANA Consultation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <p className="text-zenith-gray text-sm">
              Tell us about your vision. Our design team will create a bespoke sauna kit tailored to your space and preferences.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {customKitContents.slice(0, 6).map((item, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-zenith-gold mt-0.5 flex-shrink-0" />
                  <span className="text-zenith-gray">{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-white/10">
              <input type="text" placeholder="Your name" className="w-full mb-3" />
              <input type="email" placeholder="Email address" className="w-full mb-3" />
              <textarea placeholder="Tell us about your space, dimensions, and requirements..." className="w-full h-24 resize-none" />
              <button 
                onClick={() => setShowCustomDialog(false)}
                className="btn-gold w-full mt-4"
              >
                Request Design Call
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Specs Dialog */}
      <Dialog open={showSpecsDialog} onOpenChange={setShowSpecsDialog}>
        <DialogContent className="bg-zenith-charcoal border-white/10 text-zenith-white max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-xl">Kit Specifications</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-zenith-gray text-sm">Dimensions</span>
                <span className="text-zenith-white text-sm">4×4×6 ft (L×W×H)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-zenith-gray text-sm">Capacity</span>
                <span className="text-zenith-white text-sm">1-2 persons</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-zenith-gray text-sm">Heater</span>
                <span className="text-zenith-white text-sm">4.5kW electric</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-zenith-gray text-sm">Voltage</span>
                <span className="text-zenith-white text-sm">220V AC, 25A</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-zenith-gray text-sm">Max Temp</span>
                <span className="text-zenith-white text-sm">90°C (194°F)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-zenith-gray text-sm">Assembly Time</span>
                <span className="text-zenith-white text-sm">4-6 hours</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-zenith-gray text-sm">Weight</span>
                <span className="text-zenith-white text-sm">~350-400 kg</span>
              </div>
            </div>
            <button 
              onClick={() => setShowSpecsDialog(false)}
              className="btn-outline-gold w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Full Specs PDF
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductSection;
