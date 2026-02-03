import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQPage = () => {
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

    const faqs = [
        {
            question: 'How much does a SWEDANA sauna cost?',
            answer: 'Our saunas range from ₹2,95,000 for the Solo One (1-person) to ₹7,95,000 for the Gym Pro (commercial-grade). Custom builds start at ₹6,50,000. All prices include free pan-India shipping and GST.',
        },
        {
            question: 'How much space do I need?',
            answer: 'The Solo One needs a minimum 2m × 2m room. The Duo Ritual (our most popular) needs 2.5m × 2.5m. All models need 2.1m ceiling height and 0.3m clearance on all sides for ventilation.',
        },
        {
            question: 'How much electricity does it use per session?',
            answer: 'A typical 20-minute session uses 1.5-3 kWh (units), costing ₹12-24 at standard Indian electricity rates. The heater draws 3-9kW depending on the model.',
        },
        {
            question: 'Can I install it myself?',
            answer: 'Yes! Our kits are designed for DIY assembly in 4-6 hours with 2 people. You will need basic tools (drill, screwdriver) and a licensed electrician for the 220V/25A wiring. We also offer professional installation services.',
        },
        {
            question: 'Is a sauna safe to use every day?',
            answer: 'Yes, for most people. We recommend 2-4 sessions per week, 15-20 minutes each. Daily use is safe if you are healthy, but consult your doctor if you have heart conditions, are pregnant, or on blood thinners.',
        },
        {
            question: 'What warranty do you offer?',
            answer: 'All SWEDANA saunas come with a 2-year comprehensive warranty covering heater, wood structure, and electrical components. To claim, email us at hello@swedana.in with your order number.',
        },
        {
            question: 'Can I use a sauna if I have a heart condition?',
            answer: 'Consult your doctor first. Sauna use is generally safe for stable heart conditions, but not recommended for uncontrolled hypertension, recent heart attack, or unstable angina.',
        },
        {
            question: 'Do you deliver across India?',
            answer: 'Yes! We offer free pan-India delivery for all orders. Delivery takes 5-7 business days for standard models. Custom builds take 6-8 weeks.',
        },
    ];

    // JSON-LD FAQ Schema
    const faqSchemaString = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(q => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: { '@type': 'Answer', text: q.answer },
        })),
    });

    return (
        <>
            <Helmet>
                <title>Frequently Asked Questions | SWEDANA Dry Sauna</title>
                <meta name="description" content="Common questions about SWEDANA dry saunas: cost, space requirements, electricity usage, installation, safety, and warranty." />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaString }} />
            </Helmet>

            <div className="relative bg-zenith-black min-h-screen">
                <div className="noise-overlay" />

                <section className="pt-32 pb-20 px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto">
                        <span className="text-micro mb-4 block text-center">FAQ</span>
                        <h1 className="font-display font-bold text-4xl lg:text-6xl text-zenith-white mb-6 text-center">
                            Common Questions
                        </h1>

                        {/* FAQ Accordion */}
                        <div className="mt-12 space-y-4">
                            {faqs.map((faq, idx) => {
                                const isExpanded = expandedFAQ === idx;
                                return (
                                    <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => setExpandedFAQ(isExpanded ? null : idx)}
                                            className="w-full p-6 flex items-center justify-between text-left hover:bg-white/[0.05] transition-all"
                                        >
                                            <h3 className="font-display font-semibold text-lg text-zenith-white pr-4">
                                                {faq.question}
                                            </h3>
                                            {isExpanded ? (
                                                <ChevronUp className="w-5 h-5 text-zenith-gold flex-shrink-0" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-zenith-gray flex-shrink-0" />
                                            )}
                                        </button>
                                        {isExpanded && (
                                            <div className="px-6 pb-6 border-t border-white/10 pt-4">
                                                <p className="text-zenith-gray leading-relaxed">{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default FAQPage;
