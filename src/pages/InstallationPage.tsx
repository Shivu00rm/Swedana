import { Helmet } from 'react-helmet-async';
import { Ruler, Zap, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const InstallationPage = () => {
    const spaceReqs = [
        { model: 'Solo One', minRoom: '2m × 2m', ceiling: '2.1m', clearance: '0.3m all sides' },
        { model: 'Duo Ritual', minRoom: '2.5m × 2.5m', ceiling: '2.1m', clearance: '0.3m all sides' },
        { model: 'Trio Retreat', minRoom: '3m × 3m', ceiling: '2.4m', clearance: '0.5m all sides' },
    ];

    return (
        <>
            <Helmet>
                <title>Installation Guide | Space & Electrical Requirements | SWEDANA</title>
                <meta name="description" content="Complete installation guide for SWEDANA dry saunas. Space requirements, 220V/25A electrical specs, ventilation details, and professional installation options." />
            </Helmet>

            <div className="relative bg-zenith-black min-h-screen">
                <div className="noise-overlay" />

                <section className="pt-32 pb-20 px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto">
                        <span className="text-micro mb-4 block">INSTALLATION GUIDE</span>
                        <h1 className="font-display font-bold text-4xl lg:text-6xl text-zenith-white mb-6">
                            Setup Made Simple
                        </h1>

                        {/* Space Requirements */}
                        <div className="mt-12 bg-white/[0.03] border border-white/10 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Ruler className="w-6 h-6 text-zenith-gold" />
                                <h2 className="font-display font-semibold text-2xl text-zenith-white">Space Requirements</h2>
                            </div>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left py-3 text-zenith-gray font-medium">Model</th>
                                        <th className="text-left py-3 text-zenith-gray font-medium">Min Room Size</th>
                                        <th className="text-left py-3 text-zenith-gray font-medium">Ceiling Height</th>
                                        <th className="text-left py-3 text-zenith-gray font-medium">Clearance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {spaceReqs.map((req, idx) => (
                                        <tr key={idx} className="border-b border-white/10 last:border-0">
                                            <td className="py-4 text-zenith-white font-medium">{req.model}</td>
                                            <td className="py-4 text-zenith-gray">{req.minRoom}</td>
                                            <td className="py-4 text-zenith-gray">{req.ceiling}</td>
                                            <td className="py-4 text-zenith-gray">{req.clearance}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Electrical */}
                        <div className="mt-8 bg-white/[0.03] border border-white/10 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Zap className="w-6 h-6 text-zenith-gold" />
                                <h2 className="font-display font-semibold text-2xl text-zenith-white">Electrical Requirements</h2>
                            </div>
                            <ul className="space-y-3 text-zenith-gray">
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-zenith-gold mt-2" />
                                    220V AC, Single phase (standard Indian residential)
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-zenith-gold mt-2" />
                                    25A dedicated circuit breaker required
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-zenith-gold mt-2" />
                                    Licensed electrician recommended for wiring
                                </li>
                            </ul>
                        </div>

                        {/* Professional Install CTA */}
                        <div className="mt-8 bg-zenith-gold/10 border border-zenith-gold/30 rounded-2xl p-8 text-center">
                            <Phone className="w-12 h-12 text-zenith-gold mx-auto mb-4" />
                            <h3 className="font-display font-semibold text-2xl text-zenith-white mb-3">
                                Don't Want DIY?
                            </h3>
                            <p className="text-zenith-gray mb-6">
                                We offer professional installation services across India
                            </p>
                            <Link to="/#contact" className="inline-block px-8 py-3 bg-zenith-gold text-zenith-black font-semibold rounded-full hover:bg-zenith-gold/90 transition-all">
                                Request Installation Service
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default InstallationPage;
