import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ChevronLeft, ChevronRight, Clock, Users, Package, CheckCircle2, X } from 'lucide-react';
import siteConfig from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

interface AssemblySectionProps {
  className?: string;
}

const AssemblySection = ({ className = '' }: AssemblySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

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

      gsap.fromTo(
        galleryRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const assemblySteps = [
    {
      image: siteConfig.images.assembly[0]?.image || '/diy_step1.jpg',
      title: 'Unbox & Prepare',
      description: 'Your SWEDANA kit arrives flat-packed with everything you need: 4 neem wood base beams, joists, 4 pre-made sandwiched wall panels, ceiling panels, bench components, and all hardware.',
      time: '15 min',
      details: ['4 Base beams (neem wood)', 'Joists for floor support', 'Wall panels (pre-insulated)', 'All hardware included'],
    },
    {
      image: siteConfig.images.assembly[1]?.image || '/diy_step2.jpg',
      title: 'Build the Base',
      description: 'Connect the 4 neem wood base beams in a square formation. Install the joists in between for floor support. Simple screw-together connections — no special skills needed.',
      time: '45-60 min',
      details: ['Lay out 4 base beams', 'Connect corners with screws', 'Install joists at intervals', 'Check for level'],
    },
    {
      image: siteConfig.images.assembly[2]?.image || '/diy_step3.jpg',
      title: 'Install Wall Panels',
      description: 'Lift and slot the 4 pre-made sandwiched wall panels onto the base. Each panel is pre-insulated with rockwool and vapor barrier — just align and secure.',
      time: '60-90 min',
      details: ['Back wall panel first', 'Side wall panels next', 'Front panel with door last', 'Secure with provided brackets'],
    },
    {
      image: siteConfig.images.assembly[3]?.image || '/diy_step4.jpg',
      title: 'Add Ceiling & Bench',
      description: 'Place the ceiling panels on top, install the bench inside, connect the heater and controls. Your SWEDANA sauna is ready for its first session!',
      time: '60-75 min',
      details: ['Install ceiling panels', 'Assemble and place bench', 'Connect heater (220V)', 'Test and enjoy!'],
    },
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % assemblySteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + assemblySteps.length) % assemblySteps.length);
  };

  const hasVideo = siteConfig.assemblyVideo.url && siteConfig.assemblyVideo.url.length > 0;

  return (
    <section
      ref={sectionRef}
      id="assembly"
      className={`relative bg-zenith-charcoal py-24 lg:py-32 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="text-micro mb-4 block">EASY 4-STEP ASSEMBLY</span>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-zenith-white mb-4">
            Build It Yourself
          </h2>
          <p className="text-zenith-gray text-lg max-w-2xl mx-auto">
            No carpentry skills needed. Our modular design makes assembly as simple as 
            putting together IKEA furniture — but you end up with a premium sauna!
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-zenith-gold" />
              <span className="text-zenith-white">4-6 hours total</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-zenith-gold" />
              <span className="text-zenith-white">2 people recommended</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-zenith-gold" />
              <span className="text-zenith-white">Everything included</span>
            </div>
          </div>
        </div>

        {/* Assembly Gallery */}
        <div ref={galleryRef}>
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-semibold text-xl text-zenith-white">
              Assembly Steps
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-zenith-gold font-display font-bold text-2xl">
                {currentStep + 1}
              </span>
              <span className="text-zenith-gray">/</span>
              <span className="text-zenith-gray">{assemblySteps.length}</span>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex gap-2 mb-6">
            {assemblySteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-1 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-12 bg-zenith-gold'
                    : 'w-6 bg-white/20 hover:bg-white/30'
                }`}
              />
            ))}
          </div>

          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden bg-white/5">
              <img
                src={assemblySteps[currentStep].image}
                alt={assemblySteps[currentStep].title}
                className="w-full aspect-[16/9] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zenith-black via-transparent to-transparent" />
              
              {/* Step Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-zenith-gold text-zenith-black text-xs font-semibold rounded-full">
                    Step {currentStep + 1}
                  </span>
                  <span className="flex items-center gap-1 text-zenith-gray text-xs">
                    <Clock className="w-3 h-3" />
                    {assemblySteps[currentStep].time}
                  </span>
                </div>
                <h4 className="font-display font-bold text-2xl lg:text-3xl text-zenith-white mb-2">
                  {assemblySteps[currentStep].title}
                </h4>
                <p className="text-zenith-gray text-sm lg:text-base max-w-2xl mb-4">
                  {assemblySteps[currentStep].description}
                </p>
                
                {/* Details List */}
                <div className="flex flex-wrap gap-2">
                  {assemblySteps[currentStep].details.map((detail, idx) => (
                    <span key={idx} className="flex items-center gap-1 text-xs text-zenith-gold/80 bg-zenith-gold/10 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <button
              onClick={prevStep}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zenith-black/80 border border-white/20 flex items-center justify-center text-zenith-white hover:bg-zenith-gold hover:text-zenith-black hover:border-zenith-gold transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextStep}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zenith-black/80 border border-white/20 flex items-center justify-center text-zenith-white hover:bg-zenith-gold hover:text-zenith-black hover:border-zenith-gold transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
            {assemblySteps.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentStep
                    ? 'border-zenith-gold'
                    : 'border-transparent opacity-50 hover:opacity-75'
                }`}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Video CTA */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowVideo(true)}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-zenith-gold flex items-center justify-center">
                <Play className="w-4 h-4 text-zenith-black ml-0.5" fill="currentColor" />
              </div>
              <div className="text-left">
                <p className="text-zenith-white font-medium text-sm">
                  {hasVideo ? 'Watch Assembly Video' : 'Assembly Video Coming Soon'}
                </p>
                <p className="text-zenith-gray text-xs">
                  {hasVideo ? `Complete walkthrough (${siteConfig.assemblyVideo.duration})` : 'Contact us for PDF guide'}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Video Modal */}
        {showVideo && (
          <div 
            className="fixed inset-0 z-50 bg-zenith-black/95 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <div className="relative w-full max-w-4xl">
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-12 right-0 text-zenith-white hover:text-zenith-gold transition-colors flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                Close
              </button>
              
              {hasVideo ? (
                <div className="aspect-video bg-zenith-charcoal rounded-xl overflow-hidden">
                  <iframe
                    src={siteConfig.assemblyVideo.url}
                    title="SWEDANA Assembly Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video bg-zenith-charcoal rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-zenith-gold mx-auto mb-4" />
                    <p className="text-zenith-gray text-lg">Assembly video coming soon</p>
                    <p className="text-zenith-gray/60 text-sm mt-2">
                      Download our detailed PDF guide in the meantime
                    </p>
                    <button className="btn-outline-gold mt-6">
                      Download PDF Guide
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AssemblySection;
