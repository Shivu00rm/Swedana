import { Helmet } from 'react-helmet-async';
import { AlertTriangle, Clock, Thermometer } from 'lucide-react';

const SafetyPage = () => {
    const warnings = [
        {
            type: 'danger',
            icon: '⛔',
            title: 'Do Not Use If',
            items: ['Pregnant or trying to conceive', 'Uncontrolled heart condition', 'On blood-thinning medication', 'Under influence of alcohol'],
        },
        {
            type: 'caution',
            icon: '⚠️',
            title: 'Session Limits',
            items: ['Max 20 min per session for beginners', 'Max 30 min absolute limit', 'Rest 10 min between sessions', 'Never exceed 100°C'],
        },
        {
            type: 'info',
            icon: '💧',
            title: 'Hydration',
            items: ['Drink 2–4 glasses of water before', 'Rehydrate immediately after', 'Never enter dehydrated', 'Avoid alcohol 4 hours before'],
        },
    ];

    return (
        <>
            <Helmet>
                <title>Safety & Usage Guide | Safe Sauna Practices | SWEDANA</title>
                <meta name="description" content="Essential safety guidelines for dry sauna use. Temperature limits, session durations, contraindications, and emergency procedures." />
            </Helmet>

            <div className="relative bg-zenith-black min-h-screen">
                <div className="noise-overlay" />

                {/* Disclaimer Bar */}
                <div className="bg-amber-500/20 border-b border-amber-500/30 py-3 px-6 text-center sticky top-0 z-50">
                    <p className="text-amber-200 text-sm font-medium">
                        ⚠️ This is general guidance. Consult your doctor before starting heat therapy.
                    </p>
                </div>

                <section className="pt-24 pb-20 px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto">
                        <span className="text-micro mb-4 block">SAFETY GUIDE</span>
                        <h1 className="font-display font-bold text-4xl lg:text-6xl text-zenith-white mb-6">
                            Use Safely, Benefit Fully
                        </h1>

                        {/* Recommended Usage */}
                        <div className="mt-12 bg-white/[0.03] border border-white/10 rounded-2xl p-8">
                            <h2 className="font-display font-semibold text-2xl text-zenith-white mb-6">Recommended Usage</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <Clock className="w-5 h-5 text-zenith-gold" />
                                        <h3 className="font-semibold text-zenith-white">Session Duration</h3>
                                    </div>
                                    <p className="text-zenith-gray text-sm">15–20 minutes per session, 2–4 times per week. Never exceed 30 minutes.</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <Thermometer className="w-5 h-5 text-zenith-gold" />
                                        <h3 className="font-semibold text-zenith-white">Temperature Guide</h3>
                                    </div>
                                    <p className="text-zenith-gray text-sm">60°C for beginners, 80–100°C for experienced users. Never exceed 100°C.</p>
                                </div>
                            </div>
                        </div>

                        {/* Safety Warnings */}
                        <div className="mt-8 space-y-6">
                            {warnings.map((warning, idx) => (
                                <div
                                    key={idx}
                                    className={`border rounded-2xl p-6 ${warning.type === 'danger'
                                        ? 'bg-red-500/10 border-red-500/30'
                                        : warning.type === 'caution'
                                            ? 'bg-amber-500/10 border-amber-500/30'
                                            : 'bg-blue-500/10 border-blue-500/30'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-2xl">{warning.icon}</span>
                                        <h3 className="font-display font-semibold text-xl text-zenith-white">{warning.title}</h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {warning.items.map((item, itemIdx) => (
                                            <li key={itemIdx} className="flex items-start gap-3 text-zenith-gray">
                                                <span className="w-1.5 h-1.5 rounded-full bg-zenith-gold mt-2" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Emergency */}
                        <div className="mt-8 bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="w-6 h-6 text-red-400" />
                                <h2 className="font-display font-semibold text-2xl text-zenith-white">If You Feel Unwell</h2>
                            </div>
                            <p className="text-zenith-gray">
                                If you experience dizziness, nausea, chest pain, or lightheadedness — <strong className="text-zenith-white">leave immediately</strong>.
                                Cool down with cold water and rest. If symptoms persist, seek medical attention.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default SafetyPage;
