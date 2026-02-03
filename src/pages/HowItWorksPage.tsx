import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Heart, Zap, Leaf, ArrowRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HowItWorksPage = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.step-card',
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    const steps = [
        {
            step: 1,
            icon: Flame,
            title: 'Dry Heat Activates',
            description: 'Air inside heats to 80–100°C with humidity below 20%. Your body receives pure, dry radiant heat that penetrates deep into tissues.',
            details: [
                'Electric heater warms the air, not your body directly',
                'Low humidity allows for higher temperatures safely',
                'Heat radiates evenly throughout the cabin',
            ],
            color: '#E63946',
        },
        {
            step: 2,
            icon: Heart,
            title: 'Your Body Responds',
            description: 'Heart rate climbs 30-50%. Blood vessels expand. Core temperature rises 1-2°C. Sweat begins flushing toxins through your skin.',
            details: [
                'Cardiovascular system activates like light cardio',
                'Blood flow increases to skin and muscles',
                'Sweat glands release up to 1 liter per session',
            ],
            color: '#E07A5F',
        },
        {
            step: 3,
            icon: Zap,
            title: 'Cells Repair & Rebuild',
            description: 'Heat shock proteins activate—your body\'s ancient reset mechanism. Oxygen-rich blood rushes to muscles and organs. Deep cellular recovery begins.',
            details: [
                'Heat shock proteins repair damaged cells',
                'Mitochondria boost energy production',
                'Inflammation markers decrease',
            ],
            color: '#F4A261',
        },
        {
            step: 4,
            icon: Leaf,
            title: 'Cool Down & Renew',
            description: 'Step out. Let your body cool naturally. This is when tissue repair and hormonal balance restore. The benefits continue for hours.',
            details: [
                'Gradual cooling triggers recovery hormones',
                'Immune system strengthens',
                'Mental clarity and relaxation peak',
            ],
            color: '#2A9D8F',
        },
    ];

    return (
        <>
            <Helmet>
                <title>How Dry Sauna Works | Science of Heat Therapy | SWEDANA</title>
                <meta name="description" content="Discover the science behind dry sauna therapy. Learn how 80-100°C dry heat activates your body's natural healing mechanisms for cardiovascular health, detox, and recovery." />
                <meta name="keywords" content="how sauna works, dry heat therapy, sauna science, heat shock proteins, cardiovascular benefits, detoxification" />
                <meta property="og:title" content="How Dry Sauna Works | Science of Heat Therapy | SWEDANA" />
                <meta property="og:description" content="Discover the science behind dry sauna therapy and how it activates your body's natural healing mechanisms." />
                <meta property="og:url" content="https://swedanaa.vercel.app/how-it-works" />
            </Helmet>

            <div ref={sectionRef} className="relative bg-zenith-black min-h-screen">
                {/* Noise overlay */}
                <div className="noise-overlay" />

                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="text-micro mb-4 block">THE SCIENCE</span>
                        <h1 className="font-display font-bold text-4xl lg:text-6xl text-zenith-white mb-6">
                            How Dry Heat Heals
                        </h1>
                        <p className="text-zenith-gray text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                            Dry sauna therapy isn't magic—it's biology. Here's exactly what happens to your body
                            when you step into 80–100°C of pure, dry heat.
                        </p>
                    </div>
                </section>

                {/* 4-Step Process */}
                <section className="relative py-16 px-6 lg:px-12">
                    <div className="max-w-5xl mx-auto">
                        <div className="space-y-12">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <div
                                        key={step.step}
                                        className="step-card relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 lg:p-10 hover:bg-white/[0.05] transition-all"
                                    >
                                        {/* Step Number Badge */}
                                        <div
                                            className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-xl text-zenith-black"
                                            style={{ background: step.color }}
                                        >
                                            {step.step}
                                        </div>

                                        <div className="flex flex-col lg:flex-row gap-6 items-start">
                                            {/* Icon */}
                                            <div
                                                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                                                style={{ background: `${step.color}20` }}
                                            >
                                                <Icon className="w-8 h-8" style={{ color: step.color }} />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <h3 className="font-display font-bold text-2xl lg:text-3xl text-zenith-white mb-3">
                                                    {step.title}
                                                </h3>
                                                <p className="text-zenith-gray text-base lg:text-lg leading-relaxed mb-6">
                                                    {step.description}
                                                </p>

                                                {/* Details List */}
                                                <ul className="space-y-2">
                                                    {step.details.map((detail, idx) => (
                                                        <li key={idx} className="flex items-start gap-3 text-sm text-zenith-gray/80">
                                                            <span
                                                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                                                style={{ background: step.color }}
                                                            />
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Connector Line (except last) */}
                                        {index < steps.length - 1 && (
                                            <div
                                                className="absolute -bottom-6 left-1/2 w-0.5 h-12 -translate-x-1/2"
                                                style={{ background: `linear-gradient(to bottom, ${step.color}, ${steps[index + 1].color})` }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Video Section */}
                <section className="relative py-16 px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-center">
                            <div className="w-20 h-20 rounded-full bg-zenith-gold/20 flex items-center justify-center mx-auto mb-6">
                                <Play className="w-10 h-10 text-zenith-gold" />
                            </div>
                            <h3 className="font-display font-semibold text-2xl text-zenith-white mb-3">
                                Watch the Full Mechanism
                            </h3>
                            <p className="text-zenith-gray mb-6">
                                60-second animated explainer of how dry heat therapy works at the cellular level
                            </p>
                            <p className="text-zenith-gray/60 text-sm">
                                Video coming soon • Contact us for detailed PDF guide
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-20 px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-display font-bold text-3xl lg:text-4xl text-zenith-white mb-4">
                            Ready to Experience the Benefits?
                        </h2>
                        <p className="text-zenith-gray text-lg mb-8">
                            See the full list of health benefits backed by 40+ years of Finnish research
                        </p>
                        <Link
                            to="/benefits"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-zenith-gold text-zenith-black font-semibold rounded-full hover:bg-zenith-gold/90 transition-all"
                        >
                            Explore Health Benefits
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
};

export default HowItWorksPage;
