# SWEDANA - India's DIY Modular Sauna Kit

![SWEDANA Logo](./public/swedana_logo.png)

A premium, customer-centric website for SWEDANA - India's first DIY modular sauna kit. Built with React, TypeScript, Tailwind CSS, and GSAP animations.

## 🌐 Live Website

**Website URL:** [https://r4o27iiazw27e.ok.kimi.link](https://r4o27iiazw27e.ok.kimi.link)

**Admin Dashboard:** [https://r4o27iiazw27e.ok.kimi.link/admin](https://r4o27iiazw27e.ok.kimi.link/admin)

---

## 📁 Project Structure

```
swedana-website/
├── public/                 # Static assets (images, logos)
│   ├── favicon.png
│   ├── swedana_logo.png
│   └── *.jpg              # All website images
├── src/
│   ├── admin/             # Admin dashboard
│   │   └── AdminDashboard.tsx
│   ├── components/        # Reusable UI components
│   │   └── ui/           # shadcn/ui components
│   ├── config/           # Site configuration
│   │   └── siteConfig.ts # ⭐ EDIT THIS for content changes
│   ├── sections/         # Website sections
│   │   ├── HeroSection.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── AssemblySection.tsx
│   │   ├── SpecsSection.tsx
│   │   ├── ProductSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── utils/            # Utility functions
│   │   └── formStorage.ts # Form submission handling
│   ├── App.tsx           # Main app component
│   ├── App.css           # App styles
│   ├── index.css         # Global styles
│   └── main.tsx          # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd swedana-website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🎨 Content Management

### ⭐ Edit `src/config/siteConfig.ts`

This is your **main control panel** for the website. Change:

#### 1. Contact Information
```typescript
contact: {
  email: 'hello@swedana.in',      // Change your email
  phone: '+91 98765 43210',       // Change your phone
  whatsapp: '+91 98765 43210',    // Change WhatsApp
  address: 'Mumbai, India',       // Change address
  hours: 'Mon–Sat, 10am–7pm IST', // Change business hours
}
```

#### 2. Social Media Links
```typescript
social: {
  instagram: 'https://instagram.com/swedana',
  facebook: 'https://facebook.com/swedana',
  youtube: 'https://youtube.com/swedana',
  linkedin: 'https://linkedin.com/company/swedana',
}
```

#### 3. Product Pricing
```typescript
products: {
  standard: {
    price: '₹4,95,000',           // Change price
    priceNote: 'Free shipping & GST included',
  },
  custom: {
    price: 'Starting ₹6,50,000',  // Change custom price
  }
}
```

#### 4. Assembly Video
```typescript
assemblyVideo: {
  url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID', // Add your video
  thumbnail: '/sauna_completed.jpg',
  duration: '12 min',
}
```

#### 5. Images - Replace in `/public/` folder
- `hero` - Main hero image
- `assembly[]` - 4 assembly step images
- `benefits` - Benefit section images
- `products` - Product images

---

## 🎥 Adding Assembly Video

1. Upload your video to YouTube (recommended)
2. Get the embed URL: `https://www.youtube.com/embed/VIDEO_ID`
3. Update in `siteConfig.ts`:
```typescript
assemblyVideo: {
  url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
  thumbnail: '/sauna_completed.jpg',
  duration: '12 min',
}
```

---

## 📊 Admin Dashboard

Access all form submissions at `/admin`

### Features:
- View all customer inquiries
- Filter by type (Orders, Contacts, Consultations)
- Track submission status (New, Viewed, Responded)
- Export to CSV
- Quick reply via email/phone
- Real-time statistics

### Data Storage:
- Form submissions are stored in browser's localStorage
- Data persists across sessions
- Export regularly to keep backups

---

## 🖼️ Changing Images

### Option 1: Replace files in `/public/`
1. Delete old image: `rm public/old-image.jpg`
2. Add new image: `cp new-image.jpg public/`
3. Update reference in `siteConfig.ts` if needed

### Option 2: Update config only
```typescript
images: {
  hero: {
    main: '/your-new-image.jpg',  // Just change the path
  }
}
```

---

## 💰 Changing Prices

Edit `src/config/siteConfig.ts`:

```typescript
products: {
  standard: {
    name: 'SWEDANA Standard Kit',
    price: '₹4,95,000',              // ← Change this
    priceNote: 'Free shipping & GST included',
  },
  custom: {
    name: 'SWEDANA Custom Kit',
    price: 'Starting ₹6,50,000',     // ← Change this
    priceNote: 'Price varies by configuration',
  }
}
```

---

## 📱 Contact Info Updates

Edit `src/config/siteConfig.ts`:

```typescript
contact: {
  email: 'your-new-email@domain.com',     // ← Change
  phone: '+91 98765 43210',               // ← Change
  whatsapp: '+91 98765 43210',            // ← Change
  address: 'Your City, India',            // ← Change
  hours: 'Mon–Sat, 10am–7pm IST',         // ← Change
  shippingInfo: 'Pan-India Delivery | 5-7 business days',
}
```

---

## 🔗 Social Media Links

Edit `src/config/siteConfig.ts`:

```typescript
social: {
  instagram: 'https://instagram.com/yourhandle',
  facebook: 'https://facebook.com/yourpage',
  youtube: 'https://youtube.com/yourchannel',
  linkedin: 'https://linkedin.com/company/yourcompany',
}
```

---

## 🚀 Deploying to Vercel

### Option 1: GitHub + Vercel (Recommended)

1. **Create GitHub Repository**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/swedana-website.git
git push -u origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Sign up/login with GitHub
- Click "New Project"
- Import your GitHub repository
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

---

## 📦 Building for Production

```bash
# Build the project
npm run build

# Output will be in `/dist` folder
# This is what gets deployed
```

---

## 🛠️ Technologies Used

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **GSAP** - Animations
- **shadcn/ui** - UI Components
- **Lucide React** - Icons
- **React Router** - Navigation

---

## 📄 License

This project is proprietary and owned by SWEDANA.

---

## 📞 Support

For technical support or questions:
- Email: hello@swedana.in
- Phone: +91 98765 43210

---

## 🎯 SEO Configuration

Edit SEO settings in `src/config/siteConfig.ts`:

```typescript
seo: {
  title: 'SWEDANA | India\'s DIY Modular Sauna Kit',
  description: 'Build your own wellness sanctuary...',
  keywords: 'swedana, sauna, DIY sauna, home sauna...',
}
```

---

Made with ❤️ for SWEDANA
