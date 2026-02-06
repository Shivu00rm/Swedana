// SWEDANA Website Configuration
// Edit this file to update content across the website

export const siteConfig = {
  // Brand Settings
  brand: {
    name: 'SWEDANA',
    tagline: 'Ayurvedic Heat Therapy',
    slogan: "India's First DIY Sauna Kit",
    description: 'SWEDANA brings authentic Ayurvedic heat therapy to your home. Our modular DIY sauna kit assembles in just 4 simple steps.',
  },

  // Contact Information - EDIT THESE
  contact: {
    email: 'hello@swedana.in',
    phone: '+91 8217724387',
    whatsapp: '+91 8217724387',
    address: 'Mumbai, India',
    hours: 'Mon–Sat, 10am–7pm IST',
    shippingInfo: 'Pan-India Delivery | 5-7 business days',
  },

  // Social Media Links - EDIT THESE
  social: {
    instagram: 'https://instagram.com/swedana',
    facebook: 'https://facebook.com/swedana',
    youtube: 'https://youtube.com/swedana',
    linkedin: 'https://linkedin.com/company/swedana',
  },

  // Product Pricing - EDIT THESE
  products: {
    standard: {
      name: 'SWEDANA Standard Kit',
      price: '₹4,95,000',
      priceNote: 'Free shipping & GST included',
      badge: 'Most Popular',
      stockStatus: 'Ships in 48h',
      dimensions: "4' × 4' × 6' (L × W × H)",
      capacity: '1-2 persons',
      assemblyTime: '4-6 hours',
      warranty: '2 years',
    },
    custom: {
      name: 'SWEDANA Custom Kit',
      price: 'Starting ₹6,50,000',
      priceNote: 'Price varies by configuration',
      badge: 'Bespoke',
      stockStatus: 'Made to Order',
      deliveryTime: '6-8 weeks',
      warranty: '3 years',
    },
  },

  // Assembly Video - ADD YOUR VIDEO URL HERE
  assemblyVideo: {
    // Replace with your actual video URL (YouTube embed, Vimeo, or self-hosted)
    url: '', // Example: 'https://www.youtube.com/embed/YOUR_VIDEO_ID'
    thumbnail: '/sauna_completed.jpg',
    duration: '12 min',
  },

  // Images - REPLACE THESE PATHS WITH YOUR OWN IMAGES
  images: {
    // Hero Section
    hero: {
      main: '/sauna_completed.jpg',
      logo: '/swedana_logo.png',
      favicon: '/favicon.png',
    },

    // Assembly Steps - Replace with your actual assembly photos
    assembly: [
      { step: 1, image: '/diy_step1.jpg', title: 'Unbox & Prepare' },
      { step: 2, image: '/diy_step2.jpg', title: 'Build the Base' },
      { step: 3, image: '/diy_step3.jpg', title: 'Install Wall Panels' },
      { step: 4, image: '/diy_step4.jpg', title: 'Add Ceiling & Bench' },
    ],

    // Benefits Section
    benefits: {
      heart: '/benefit_heart.jpg',
      brain: '/benefit_brain.jpg',
      recovery: '/benefit_recovery.jpg',
      skin: '/benefit_skin.jpg',
    },

    // Product Images
    products: {
      standard: '/diy_step1.jpg',
      custom: '/sauna_completed.jpg',
      specs: '/product_sauna.jpg',
    },
  },

  // Form Settings
  forms: {
    // Form submissions will be stored in localStorage
    // To view submissions, go to /admin/submissions
    storeSubmissions: true,

    // Email notification (configure backend separately)
    notificationEmail: 'hello@swedana.in',
  },

  // SEO Settings
  seo: {
    title: 'SWEDANA | India\'s DIY Modular Sauna Kit',
    description: 'Build your own wellness sanctuary with SWEDANA. Easy 4-step assembly, premium materials, authentic Ayurvedic heat therapy.',
    keywords: 'swedana, sauna, DIY sauna, home sauna, modular sauna, ayurveda, heat therapy, wellness, India',
  },
};

// Helper function to get config values
export const getConfig = (path: string) => {
  const keys = path.split('.');
  let value: any = siteConfig;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }

  return value;
};

export default siteConfig;
