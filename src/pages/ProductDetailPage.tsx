import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Check, Package, Zap, Thermometer } from 'lucide-react';

const ProductDetailPage = () => {
    const { slug } = useParams();

    // Product data (in real app, this would come from a database or API)
    const products: Record<string, any> = {
        'solo-one': {
            name: 'Solo One',
            sku: 'SWED-SOLO-001',
            price: '₹2,95,000',
            capacity: '1 Person',
            dimensions: '3\' × 3\' × 6\' (L × W × H)',
            heater: '3kW Electric',
            maxTemp: '90°C',
            description: 'Perfect for apartments and small spaces. Our most compact sauna delivers the full dry heat experience without compromising on quality.',
            images: ['/product_sauna.jpg', '/sauna_completed.jpg', '/diy_step1.jpg'],
            features: [
                'Compact footprint ideal for apartments',
                '3kW heater reaches 90°C in 35 minutes',
                'Premium pine interior with neem wood frame',
                'Digital temperature control',
                'LED ambient lighting',
                '2-year comprehensive warranty',
            ],
            specs: {
                'External Dimensions': '3\' × 3\' × 6\' (L × W × H)',
                'Internal Dimensions': '2.5\' × 2.5\' × 5.7\'',
                'Capacity': '1 person',
                'Heater Power': '3kW electric',
                'Voltage': '220V AC',
                'Max Temperature': '90°C (194°F)',
                'Heat-up Time': '30-35 minutes',
                'Weight': '~250 kg',
                'Wood Type': 'Pine interior, Neem frame',
                'Insulation': 'Rockwool 50mm',
            },
        },
        'duo-ritual': {
            name: 'Duo Ritual',
            sku: 'SWED-DUO-002',
            price: '₹4,95,000',
            capacity: '2 Person',
            dimensions: '4\' × 4\' × 6\' (L × W × H)',
            heater: '4.5kW Electric',
            maxTemp: '100°C',
            description: 'Our most popular model. Perfect for couples or solo sessions with extra space. The ideal balance of size and performance.',
            images: ['/sauna_completed.jpg', '/product_sauna.jpg', '/diy_step2.jpg'],
            features: [
                'Spacious 2-person capacity',
                '4.5kW heater reaches 100°C in 40 minutes',
                'Premium pine interior with neem wood frame',
                'Digital temperature control with timer',
                'LED ambient lighting',
                '2-year comprehensive warranty',
                'Free pan-India delivery',
            ],
            specs: {
                'External Dimensions': '4\' × 4\' × 6\' (L × W × H)',
                'Internal Dimensions': '3.5\' × 3.5\' × 5.7\'',
                'Capacity': '2 persons',
                'Heater Power': '4.5kW electric',
                'Voltage': '220V AC',
                'Max Temperature': '100°C (212°F)',
                'Heat-up Time': '35-40 minutes',
                'Weight': '~350 kg',
                'Wood Type': 'Pine interior, Neem frame',
                'Insulation': 'Rockwool 75mm',
            },
        },
        // Add more products as needed
    };

    const product = slug ? products[slug] : null;

    if (!product) {
        return <Navigate to="/products" replace />;
    }

    // JSON-LD Schema
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        brand: { '@type': 'Brand', name: 'SWEDANA' },
        sku: product.sku,
        offers: {
            '@type': 'Offer',
            price: product.price.replace(/[₹,]/g, ''),
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
        },
        description: product.description,
    };

    return (
        <>
            <Helmet>
                <title>{product.name} | {product.capacity} Dry Sauna Kit | SWEDANA</title>
                <meta name="description" content={product.description} />
                <meta property="og:title" content={`${product.name} | ${product.capacity} Dry Sauna Kit | SWEDANA`} />
                <meta property="og:description" content={product.description} />
                <meta property="og:url" content={`https://swedanaa.vercel.app/products/${slug}`} />
                <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
            </Helmet>

            <div className="relative bg-zenith-black min-h-screen">
                <div className="noise-overlay" />

                {/* Back Button */}
                <div className="pt-24 pb-8 px-6 lg:px-12">
                    <div className="max-w-7xl mx-auto">
                        <Link to="/products" className="inline-flex items-center gap-2 text-zenith-gray hover:text-zenith-gold transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Back to all saunas
                        </Link>
                    </div>
                </div>

                {/* Product Detail */}
                <section className="pb-20 px-6 lg:px-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Image Gallery */}
                            <div className="space-y-4">
                                <div className="aspect-square rounded-2xl overflow-hidden bg-white/5">
                                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {product.images.slice(1).map((img: string, idx: number) => (
                                        <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-white/5">
                                            <img src={img} alt={`${product.name} view ${idx + 2}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div>
                                <h1 className="font-display font-bold text-4xl lg:text-5xl text-zenith-white mb-4">{product.name}</h1>
                                <p className="text-zenith-gray text-lg mb-6">{product.description}</p>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                                        <Package className="w-6 h-6 text-zenith-gold mx-auto mb-2" />
                                        <p className="text-xs text-zenith-gray mb-1">Capacity</p>
                                        <p className="font-semibold text-zenith-white">{product.capacity}</p>
                                    </div>
                                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                                        <Zap className="w-6 h-6 text-zenith-gold mx-auto mb-2" />
                                        <p className="text-xs text-zenith-gray mb-1">Heater</p>
                                        <p className="font-semibold text-zenith-white">{product.heater}</p>
                                    </div>
                                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                                        <Thermometer className="w-6 h-6 text-zenith-gold mx-auto mb-2" />
                                        <p className="text-xs text-zenith-gray mb-1">Max Temp</p>
                                        <p className="font-semibold text-zenith-white">{product.maxTemp}</p>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="mb-8">
                                    <h3 className="font-display font-semibold text-xl text-zenith-white mb-4">Key Features</h3>
                                    <ul className="space-y-3">
                                        {product.features.map((feature: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 text-zenith-gray">
                                                <Check className="w-5 h-5 text-zenith-gold flex-shrink-0 mt-0.5" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Price & CTA */}
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-zenith-gray">Price</span>
                                        <span className="font-display font-bold text-3xl text-zenith-gold">{product.price}</span>
                                    </div>
                                    <Link
                                        to="/#contact"
                                        className="block w-full py-4 bg-zenith-gold text-zenith-black text-center font-semibold rounded-full hover:bg-zenith-gold/90 transition-all"
                                    >
                                        Get a Quote
                                    </Link>
                                    <p className="text-xs text-zenith-gray text-center mt-3">Free shipping • 2-year warranty • Made in India</p>
                                </div>
                            </div>
                        </div>

                        {/* Full Specs Table */}
                        <div className="mt-16">
                            <h2 className="font-display font-bold text-2xl text-zenith-white mb-6">Full Specifications</h2>
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
                                <table className="w-full">
                                    <tbody>
                                        {Object.entries(product.specs).map(([key, value], idx) => (
                                            <tr key={idx} className="border-b border-white/10 last:border-0">
                                                <td className="px-6 py-4 text-zenith-gray">{key}</td>
                                                <td className="px-6 py-4 text-zenith-white font-medium text-right">{value as string}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ProductDetailPage;
