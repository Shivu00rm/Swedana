import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const ComparePage = () => {
    const comparison = [
        { row: 'Temperature', dry: '80–100°C', infrared: '45–65°C', steam: '40–55°C' },
        { row: 'Humidity', dry: 'Below 20%', infrared: 'Below 20%', steam: '100% (steam)' },
        { row: 'Heat Source', dry: 'Electric heater heats air', infrared: 'Infrared rays heat body directly', steam: 'Steam generator' },
        { row: 'Session Length', dry: '15–20 min', infrared: '20–30 min', steam: '15–20 min' },
        { row: 'Best For', dry: 'Detox & cardiovascular', infrared: 'Muscle recovery & joint pain', steam: 'Respiratory & skin' },
        { row: 'Maintenance', dry: 'Low', infrared: 'Medium', steam: 'High (mold risk)' },
        { row: 'Power Draw', dry: '3-9kW', infrared: '1.5-3kW', steam: '6-12kW' },
        { row: 'Installation', dry: 'DIY-friendly', infrared: 'DIY-friendly', steam: 'Professional required' },
    ];

    return (
        <>
            <Helmet>
                <title>Dry Sauna vs Infrared vs Steam | Comparison Guide | SWEDANA</title>
                <meta name="description" content="Honest comparison of dry sauna, infrared sauna, and steam room. Temperature, humidity, health benefits, and maintenance requirements explained." />
            </Helmet>

            <div className="relative bg-zenith-black min-h-screen">
                <div className="noise-overlay" />

                <section className="pt-32 pb-20 px-6 lg:px-12">
                    <div className="max-w-5xl mx-auto">
                        <span className="text-micro mb-4 block text-center">COMPARISON GUIDE</span>
                        <h1 className="font-display font-bold text-4xl lg:text-6xl text-zenith-white mb-6 text-center">
                            Dry vs Infrared vs Steam
                        </h1>
                        <p className="text-zenith-gray text-lg text-center max-w-2xl mx-auto mb-12">
                            Not sure which sauna is right for you? Here's an honest comparison to help you decide.
                        </p>

                        {/* Comparison Table */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left py-4 px-6 text-zenith-gray font-medium">Feature</th>
                                        <th className="text-left py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <span className="text-zenith-white font-semibold">Dry Sauna</span>
                                                <span className="px-2 py-0.5 bg-zenith-gold text-zenith-black text-xs font-bold rounded">SWEDANA</span>
                                            </div>
                                        </th>
                                        <th className="text-left py-4 px-6 text-zenith-white font-semibold">Infrared</th>
                                        <th className="text-left py-4 px-6 text-zenith-white font-semibold">Steam</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparison.map((row, idx) => (
                                        <tr key={idx} className="border-b border-white/10 last:border-0">
                                            <td className="py-4 px-6 text-zenith-gray font-medium">{row.row}</td>
                                            <td className="py-4 px-6 text-zenith-white bg-zenith-gold/5">{row.dry}</td>
                                            <td className="py-4 px-6 text-zenith-gray">{row.infrared}</td>
                                            <td className="py-4 px-6 text-zenith-gray">{row.steam}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* CTA */}
                        <div className="mt-12 text-center">
                            <h2 className="font-display font-semibold text-2xl text-zenith-white mb-4">
                                Ready to start your dry sauna journey?
                            </h2>
                            <Link
                                to="/products"
                                className="inline-block px-8 py-4 bg-zenith-gold text-zenith-black font-semibold rounded-full hover:bg-zenith-gold/90 transition-all"
                            >
                                See Our Products
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ComparePage;
