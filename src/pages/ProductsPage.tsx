import { useState, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Filter, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProductsPage = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [filterCapacity, setFilterCapacity] = useState('All');
    const [filterUseCase, setFilterUseCase] = useState('All');

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.product-card',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
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

    const products = [
        {
            id: 'solo-one',
            slug: 'solo-one',
            name: 'Solo One',
            capacity: '1-Person',
            useCase: ['Home'],
            price: '₹2,95,000',
            image: '/product_sauna.jpg',
            features: ['Compact 3×3×6 ft', '3kW heater', 'Perfect for apartments'],
            badge: null,
        },
        {
            id: 'duo-ritual',
            slug: 'duo-ritual',
            name: 'Duo Ritual',
            capacity: '2-Person',
            useCase: ['Home'],
            price: '₹4,95,000',
            image: '/sauna_completed.jpg',
            features: ['Standard 4×4×6 ft', '4.5kW heater', 'Most popular'],
            badge: 'Most Popular',
        },
        {
            id: 'trio-retreat',
            slug: 'trio-retreat',
            name: 'Trio Retreat',
            capacity: '3+ Person',
            useCase: ['Home', 'Gym'],
            price: '₹6,50,000',
            image: '/product_sauna.jpg',
            features: ['Spacious 5×5×7 ft', '6kW heater', 'Family-sized'],
            badge: null,
        },
        {
            id: 'gym-pro',
            slug: 'gym-pro',
            name: 'Gym Pro',
            capacity: '3+ Person',
            useCase: ['Gym', 'Hotel'],
            price: '₹7,95,000',
            image: '/sauna_completed.jpg',
            features: ['Commercial-grade', '9kW heater', 'High-traffic rated'],
            badge: 'Commercial',
        },
        {
            id: 'custom',
            slug: 'custom',
            name: 'Custom Build',
            capacity: 'Custom',
            useCase: ['Hotel', 'Clinic'],
            price: 'Get Quote',
            image: '/product_sauna.jpg',
            features: ['Any size', 'Bespoke design', '6-8 week delivery'],
            badge: 'Bespoke',
        },
    ];

    const filteredProducts = products.filter((product) => {
        const capacityMatch = filterCapacity === 'All' || product.capacity === filterCapacity || product.capacity === 'Custom';
        const useCaseMatch = filterUseCase === 'All' || product.useCase.includes(filterUseCase);
        return capacityMatch && useCaseMatch;
    });

    const clearFilters = () => {
        setFilterCapacity('All');
        setFilterUseCase('All');
    };

    return (
        <>
            <Helmet>
                <title>Sauna Products | DIY Kits for Home & Commercial | SWEDANA</title>
                <meta name="description" content="Browse SWEDANA's range of modular dry sauna kits. From 1-person compact units to commercial-grade installations. Made in India, ships pan-India." />
                <meta name="keywords" content="sauna products, DIY sauna kit, home sauna, commercial sauna, modular sauna, India" />
                <meta property="og:title" content="Sauna Products | DIY Kits for Home & Commercial | SWEDANA" />
                <meta property="og:description" content="Browse SWEDANA's range of modular dry sauna kits for home and commercial use." />
                <meta property="og:url" content="https://swedanaa.vercel.app/products" />
            </Helmet>

            <div ref={sectionRef} className="relative bg-zenith-black min-h-screen">
                {/* Noise overlay */}
                <div className="noise-overlay" />

                {/* Hero Section */}
                <section className="relative pt-32 pb-16 px-6 lg:px-12">
                    <div className="max-w-6xl mx-auto text-center">
                        <span className="text-micro mb-4 block">OUR RANGE</span>
                        <h1 className="font-display font-bold text-4xl lg:text-6xl text-zenith-white mb-6">
                            Find Your Perfect Sauna
                        </h1>
                        <p className="text-zenith-gray text-lg max-w-2xl mx-auto">
                            From compact home units to commercial-grade installations. All kits ship flat-packed with everything you need.
                        </p>
                    </div>
                </section>

                {/* Filter Bar */}
                <section className="relative pb-12 px-6 lg:px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                            <div className="flex flex-wrap items-center gap-6">
                                {/* Capacity Filter */}
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-zenith-gold" />
                                    <span className="text-sm text-zenith-gray font-medium">Capacity:</span>
                                    <div className="flex gap-2">
                                        {['All', '1-Person', '2-Person', '3+ Person'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setFilterCapacity(option)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filterCapacity === option
                                                    ? 'bg-zenith-gold text-zenith-black'
                                                    : 'bg-white/5 text-zenith-gray hover:bg-white/10'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Use Case Filter */}
                                <div className="flex items-center gap-3">
                                    <Filter className="w-5 h-5 text-zenith-gold" />
                                    <span className="text-sm text-zenith-gray font-medium">Use Case:</span>
                                    <div className="flex gap-2">
                                        {['All', 'Home', 'Gym', 'Hotel', 'Clinic'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setFilterUseCase(option)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filterUseCase === option
                                                    ? 'bg-zenith-gold text-zenith-black'
                                                    : 'bg-white/5 text-zenith-gray hover:bg-white/10'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Clear Filters */}
                                {(filterCapacity !== 'All' || filterUseCase !== 'All') && (
                                    <button
                                        onClick={clearFilters}
                                        className="ml-auto flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm text-zenith-gray transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Products Grid */}
                <section className="relative pb-20 px-6 lg:px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    to={`/products/${product.slug}`}
                                    className="product-card group bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.05] hover:border-zenith-gold/30 transition-all"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {product.badge && (
                                            <div className="absolute top-4 right-4 px-3 py-1 bg-zenith-gold text-zenith-black text-xs font-bold rounded-full">
                                                {product.badge}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="font-display font-bold text-xl text-zenith-white mb-2 group-hover:text-zenith-gold transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-zenith-gray text-sm mb-4">{product.capacity}</p>

                                        {/* Features */}
                                        <ul className="space-y-1 mb-4">
                                            {product.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-xs text-zenith-gray/80">
                                                    <span className="w-1 h-1 rounded-full bg-zenith-gold" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Price */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                            <span className="font-display font-bold text-2xl text-zenith-gold">{product.price}</span>
                                            <span className="text-sm text-zenith-gray group-hover:text-zenith-gold transition-colors">
                                                View Details →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-zenith-gray text-lg">No products match your filters. Try adjusting your selection.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

export default ProductsPage;
