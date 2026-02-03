import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Star, Home, Dumbbell, Building2 } from 'lucide-react';

const TestimonialsPage = () => {
    const [filterTag, setFilterTag] = useState('All');

    const testimonials = [
        {
            name: 'Priya M.',
            city: 'Bangalore',
            tag: 'Home',
            rating: 5,
            quote: 'I use it every morning before work. My chronic back pain from 8 hours of desk work has reduced by half. Best investment for my health.',
        },
        {
            name: 'Ravi K.',
            city: 'Mumbai',
            tag: 'Gym',
            rating: 5,
            quote: 'My gym members love it. Booked solid every day. Recovery times have improved noticeably. Best equipment investment we made this year.',
        },
        {
            name: 'Anjali S.',
            city: 'Delhi',
            tag: 'Home',
            rating: 5,
            quote: 'Sleep quality has improved dramatically. I fall asleep faster and wake up feeling refreshed. My skin also looks clearer.',
        },
        {
            name: 'Vikram T.',
            city: 'Pune',
            tag: 'Hotel',
            rating: 5,
            quote: 'Installed in our wellness center. Guests specifically request rooms near the sauna. It has become our signature amenity.',
        },
        {
            name: 'Meera D.',
            city: 'Chennai',
            tag: 'Home',
            rating: 5,
            quote: 'Assembly was surprisingly easy. Took us 5 hours with my husband. The instructions were clear and all parts fit perfectly.',
        },
        {
            name: 'Arjun P.',
            city: 'Hyderabad',
            tag: 'Gym',
            rating: 5,
            quote: 'Athletes at our training center use it post-workout. Muscle soreness recovery is 30-40% faster. Game changer for performance.',
        },
    ];

    const filteredTestimonials = filterTag === 'All'
        ? testimonials
        : testimonials.filter(t => t.tag === filterTag);

    const tagIcons: Record<string, any> = {
        Home: Home,
        Gym: Dumbbell,
        Hotel: Building2,
    };

    return (
        <>
            <Helmet>
                <title>Customer Testimonials | Real SWEDANA Sauna Reviews</title>
                <meta name="description" content="Read real customer stories from SWEDANA sauna owners. Home users, gym owners, and hotel managers share their experiences." />
            </Helmet>

            <div className="relative bg-zenith-black min-h-screen">
                <div className="noise-overlay" />

                <section className="pt-32 pb-20 px-6 lg:px-12">
                    <div className="max-w-6xl mx-auto">
                        <span className="text-micro mb-4 block text-center">TESTIMONIALS</span>
                        <h1 className="font-display font-bold text-4xl lg:text-6xl text-zenith-white mb-6 text-center">
                            Real Stories, Real Results
                        </h1>

                        {/* Filter Tabs */}
                        <div className="flex justify-center gap-3 mb-12">
                            {['All', 'Home', 'Gym', 'Hotel'].map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setFilterTag(tag)}
                                    className={`px-6 py-2 rounded-full font-medium transition-all ${filterTag === tag
                                        ? 'bg-zenith-gold text-zenith-black'
                                        : 'bg-white/5 text-zenith-gray hover:bg-white/10'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        {/* Testimonials Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTestimonials.map((testimonial, idx) => {
                                const TagIcon = tagIcons[testimonial.tag];
                                return (
                                    <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] transition-all">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="font-display font-semibold text-lg text-zenith-white">{testimonial.name}</h3>
                                                <p className="text-sm text-zenith-gray">{testimonial.city}</p>
                                            </div>
                                            <div className="flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full">
                                                <TagIcon className="w-3 h-3 text-zenith-gold" />
                                                <span className="text-xs text-zenith-gray">{testimonial.tag}</span>
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex gap-1 mb-4">
                                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                <Star key={i} className="w-4 h-4 text-zenith-gold fill-zenith-gold" />
                                            ))}
                                        </div>

                                        {/* Quote */}
                                        <p className="text-zenith-gray text-sm leading-relaxed italic">
                                            "{testimonial.quote}"
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Placeholder CTA */}
                        <div className="mt-16 bg-zenith-gold/10 border border-zenith-gold/30 rounded-2xl p-8 text-center">
                            <h2 className="font-display font-semibold text-2xl text-zenith-white mb-3">
                                Be Our Next Success Story
                            </h2>
                            <p className="text-zenith-gray mb-6">
                                Share your SWEDANA experience and get 10% off your next purchase
                            </p>
                            <a
                                href="mailto:hello@swedana.in?subject=My%20SWEDANA%20Story"
                                className="inline-block px-8 py-3 bg-zenith-gold text-zenith-black font-semibold rounded-full hover:bg-zenith-gold/90 transition-all"
                            >
                                Share Your Story
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default TestimonialsPage;
