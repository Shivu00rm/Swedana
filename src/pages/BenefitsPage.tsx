import { useState, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Droplets, Dumbbell, Sparkles, Moon, Flame, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BenefitsPage = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [expandedBenefit, setExpandedBenefit] = useState<string | null>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.benefit-card',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
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

    const benefits = [
        {
            id: 'cardio',
            icon: Heart,
            title: 'Cardiovascular Health',
            summary: 'Regular dry sauna sessions train your heart the same way light cardio does—without the joint stress.',
            detail: 'Finnish studies spanning 20+ years show that 4 weekly sauna sessions cut fatal cardiac risk by up to 40%. Your heart rate increases to 100-150 BPM (similar to brisk walking), blood pressure normalizes over time, and arterial flexibility improves. The heat stress mimics moderate exercise, strengthening your cardiovascular system.',
            stat: '40% lower cardiac risk with 4× weekly use',
            color: '#E63946',
        },
        {
            id: 'detox',
            icon: Droplets,
            title: 'Deep Detoxification',
            summary: 'Sweat is your body\'s most direct exit route for heavy metals and environmental chemicals.',
            detail: 'At 80–100°C, sweat glands activate deeply. Research shows sauna sweat contains higher concentrations of lead, mercury, cadmium, and BPA than urine. While kidneys filter blood, sweat offers a direct pathway for fat-soluble toxins stored in tissues. One session can release 300-700ml of toxin-laden sweat.',
            stat: 'Up to 3× more toxins in sweat vs. urine',
            color: '#2A9D8F',
        },
        {
            id: 'recovery',
            icon: Dumbbell,
            title: 'Pain & Muscle Relief',
            summary: 'Heat penetrates deep into muscles, reducing inflammation and accelerating recovery after workouts or injury.',
            detail: 'Increased blood flow delivers oxygen and nutrients to damaged muscle fibers while flushing out lactic acid. Heat also triggers the release of endorphins (natural painkillers) and reduces muscle tension. Athletes report 30-50% faster recovery times when combining sauna with training.',
            stat: '30-50% faster muscle recovery',
            color: '#E07A5F',
        },
        {
            id: 'skin',
            icon: Sparkles,
            title: 'Skin Health & Glow',
            summary: 'Deep sweating cleanses pores from within, while increased circulation brings nutrients to skin cells.',
            detail: 'Heat opens pores and flushes out dead skin cells, bacteria, and sebum buildup. Enhanced blood flow delivers oxygen and collagen-building nutrients. Regular users report clearer complexion, reduced acne, and improved skin elasticity. The heat also activates heat shock proteins that protect skin cells from aging.',
            stat: 'Visible glow after just 2-3 sessions',
            color: '#F4A261',
        },
        {
            id: 'sleep',
            icon: Moon,
            title: 'Mental Wellness & Sleep',
            summary: 'The post-sauna cool-down triggers deep relaxation and prepares your body for restorative sleep.',
            detail: 'Heat stress followed by cooling activates your parasympathetic nervous system (rest mode). Core body temperature drops post-session, signaling sleep hormones. Studies show sauna users fall asleep 15-20 minutes faster and experience 20% more deep sleep. It also reduces cortisol (stress hormone) by up to 30%.',
            stat: '20% more deep sleep, 30% less cortisol',
            color: '#457B9D',
        },
        {
            id: 'metabolic',
            icon: Flame,
            title: 'Metabolic Health',
            summary: 'Regular heat exposure improves insulin sensitivity and supports healthy weight management.',
            detail: 'Heat stress activates metabolic pathways similar to exercise. One 30-minute session burns 300-600 calories (equivalent to a 30-minute jog). More importantly, it improves insulin sensitivity by 30-40%, helping regulate blood sugar. Heat shock proteins also boost mitochondrial function, increasing your baseline metabolism.',
            stat: '300-600 calories per session',
            color: '#E63946',
        },
        {
            id: 'longevity',
            icon: TrendingUp,
            title: 'Longevity & Aging',
            summary: 'Heat shock proteins activated during sauna sessions are your body\'s ancient reset mechanism.',
            detail: 'These proteins repair damaged DNA, clear out misfolded proteins (linked to Alzheimer\'s), and protect cells from oxidative stress. A landmark Finnish study of 2,300 men over 20 years found that those who used sauna 4-7 times per week had a 40% lower all-cause mortality rate. Sauna use is one of the few interventions shown to extend healthspan.',
            stat: '40% lower all-cause mortality (4-7× weekly)',
            color: '#2A9D8F',
        },
    ];

    return (
        <>
            <Helmet>
                <title>Dry Sauna Health Benefits | Science-Backed Wellness | SWEDANA</title>
                <meta name="description" content="Discover 7 science-backed health benefits of dry sauna therapy: cardiovascular health, detoxification, muscle recovery, skin glow, better sleep, metabolic boost, and longevity." />
                <meta name="keywords" content="sauna benefits, cardiovascular health, detoxification, muscle recovery, skin health, sleep improvement, longevity, heat therapy" />
                <meta property="og:title" content="Dry Sauna Health Benefits | Science-Backed Wellness | SWEDANA" />
                <meta property="og:description" content="Discover 7 science-backed health benefits of dry sauna therapy backed by 40+ years of Finnish research." />
                <meta property="og:url" content="https://swedanaa.vercel.app/benefits" />
            </Helmet>

            <div ref={sectionRef} className="relative bg-zenith-black min-h-screen">
                {/* Noise overlay */}
                <div className="noise-overlay" />

                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="text-micro mb-4 block">SCIENCE-BACKED WELLNESS</span>
                        <h1 className="font-display font-bold text-4xl lg:text-6xl text-zenith-white mb-6">
                            7 Proven Health Benefits
                        </h1>
                        <p className="text-zenith-gray text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                            Backed by 40+ years of Finnish research and thousands of peer-reviewed studies.
                            Dry sauna therapy is one of the most studied wellness interventions in the world.
                        </p>
                    </div>
                </section>

                {/* Benefits Grid */}
                <section className="relative py-16 px-6 lg:px-12">
                    <div className="max-w-5xl mx-auto">
                        <div className="space-y-6">
                            {benefits.map((benefit) => {
                                const Icon = benefit.icon;
                                const isExpanded = expandedBenefit === benefit.id;

                                return (
                                    <div
                                        key={benefit.id}
                                        className="benefit-card bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.05] transition-all"
                                    >
                                        {/* Card Header - Always Visible */}
                                        <button
                                            onClick={() => setExpandedBenefit(isExpanded ? null : benefit.id)}
                                            className="w-full p-6 lg:p-8 flex items-start gap-6 text-left"
                                        >
                                            {/* Icon */}
                                            <div
                                                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                                                style={{ background: `${benefit.color}20` }}
                                            >
                                                <Icon className="w-7 h-7" style={{ color: benefit.color }} />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <h3 className="font-display font-bold text-xl lg:text-2xl text-zenith-white mb-2">
                                                    {benefit.title}
                                                </h3>
                                                <p className="text-zenith-gray text-base leading-relaxed">
                                                    {benefit.summary}
                                                </p>
                                            </div>

                                            {/* Expand Icon */}
                                            <div className="flex-shrink-0">
                                                {isExpanded ? (
                                                    <ChevronUp className="w-6 h-6 text-zenith-gold" />
                                                ) : (
                                                    <ChevronDown className="w-6 h-6 text-zenith-gray" />
                                                )}
                                            </div>
                                        </button>

                                        {/* Expanded Content */}
                                        {isExpanded && (
                                            <div className="px-6 lg:px-8 pb-6 lg:pb-8 pl-20 lg:pl-24 border-t border-white/10 pt-6">
                                                <p className="text-zenith-gray/90 text-sm lg:text-base leading-relaxed mb-4">
                                                    {benefit.detail}
                                                </p>
                                                <div
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                                                    style={{ background: `${benefit.color}20`, color: benefit.color }}
                                                >
                                                    <span>📊</span>
                                                    {benefit.stat}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Disclaimer */}
                <section className="relative py-12 px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 text-center">
                            <p className="text-amber-200/90 text-sm leading-relaxed">
                                <strong>Medical Disclaimer:</strong> Benefits are based on published research and typical user experiences.
                                Consult your doctor before starting any heat therapy routine, especially if you have pre-existing health conditions.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-20 px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-display font-bold text-3xl lg:text-4xl text-zenith-white mb-4">
                            Ready to Start Your Wellness Journey?
                        </h2>
                        <p className="text-zenith-gray text-lg mb-8">
                            Explore our range of DIY sauna kits designed for Indian homes
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-zenith-gold text-zenith-black font-semibold rounded-full hover:bg-zenith-gold/90 transition-all"
                        >
                            View All Products
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
};

export default BenefitsPage;
