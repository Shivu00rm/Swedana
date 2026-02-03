import { Helmet } from 'react-helmet-async';
import { Shield, Calendar } from 'lucide-react';

const MaintenancePage = () => {
    const schedule = [
        { freq: 'After Every Use', tasks: ['Wipe benches down with damp cloth', 'Leave door open 10 min to air out'] },
        { freq: 'Weekly', tasks: ['Vacuum or brush out any debris', 'Check heater surface is clear'] },
        { freq: 'Monthly', tasks: ['Apply wood treatment oil (neem/pine)', 'Inspect joints and door hinges'] },
        { freq: 'Quarterly', tasks: ['Full heater inspection', 'Deep clean interior', 'Check electrical connections'] },
    ];

    return (
        <>
            <Helmet>
                <title>Maintenance & Care Guide | Keep Your Sauna Like New | SWEDANA</title>
                <meta name="description" content="Complete maintenance guide for SWEDANA dry saunas. Cleaning schedules, wood treatment, heater care, and warranty information." />
            </Helmet>

            <div className="relative bg-zenith-black min-h-screen">
                <div className="noise-overlay" />

                <section className="pt-32 pb-20 px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto">
                        <span className="text-micro mb-4 block">MAINTENANCE GUIDE</span>
                        <h1 className="font-display font-bold text-4xl lg:text-6xl text-zenith-white mb-6">
                            Keep It Like New
                        </h1>

                        {/* Maintenance Schedule */}
                        <div className="mt-12 space-y-6">
                            {schedule.map((item, idx) => (
                                <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Calendar className="w-5 h-5 text-zenith-gold" />
                                        <h3 className="font-display font-semibold text-xl text-zenith-white">{item.freq}</h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {item.tasks.map((task, taskIdx) => (
                                            <li key={taskIdx} className="flex items-start gap-3 text-zenith-gray">
                                                <span className="w-1.5 h-1.5 rounded-full bg-zenith-gold mt-2" />
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Warranty */}
                        <div className="mt-12 bg-zenith-gold/10 border border-zenith-gold/30 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-6 h-6 text-zenith-gold" />
                                <h2 className="font-display font-semibold text-2xl text-zenith-white">2-Year Warranty</h2>
                            </div>
                            <p className="text-zenith-gray mb-4">
                                All SWEDANA saunas come with a comprehensive 2-year warranty covering heater, wood structure, and electrical components.
                            </p>
                            <p className="text-zenith-gray text-sm">
                                To claim warranty, contact us at hello@swedana.in with your order number and photos of the issue.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default MaintenancePage;
