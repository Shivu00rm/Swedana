import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import siteConfig from '../config/siteConfig';

interface FooterProps {
  className?: string;
}

const Footer = ({ className = '' }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    product: [
      { label: 'Standard Kit', id: 'product' },
      { label: 'Custom Kit', id: 'product' },
      { label: 'Specifications', id: 'specs' },
      { label: 'Assembly Guide', id: 'assembly' },
    ],
    company: [
      { label: 'Benefits', id: 'benefits' },
      { label: 'How It Works', id: 'assembly' },
      { label: 'Contact', id: 'contact' },
    ],
    support: [
      { label: 'Shipping Info', id: 'contact' },
      { label: 'Warranty', id: 'product' },
      { label: 'FAQ', id: 'contact' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
    { icon: Facebook, href: siteConfig.social.facebook, label: 'Facebook' },
    { icon: Youtube, href: siteConfig.social.youtube, label: 'YouTube' },
    { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  ];

  return (
    <footer className={`bg-zenith-black border-t border-white/10 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/swedana_logo.png"
                alt="SWEDANA"
                className="w-14 h-14 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl text-zenith-white">
                  SWEDANA
                </span>
                <span className="text-[10px] text-zenith-gold tracking-[0.2em] uppercase">
                  Ayurvedic Heat Therapy
                </span>
              </div>
            </div>
            <p className="text-zenith-gray text-sm leading-relaxed mb-6 max-w-sm">
              India&apos;s first DIY modular sauna kit. Bring the ancient practice of 
              therapeutic sweating to your home with our easy-to-assemble sauna kits.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                social.href && (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zenith-gray hover:bg-zenith-gold/20 hover:text-zenith-gold transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wide text-zenith-white mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-zenith-gray hover:text-zenith-gold text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wide text-zenith-white mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-zenith-gray hover:text-zenith-gold text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wide text-zenith-white mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-zenith-gray hover:text-zenith-gold text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zenith-gray text-xs">
            © {currentYear} SWEDANA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className="text-zenith-gray hover:text-zenith-white text-xs transition-colors">
              Privacy Policy
            </button>
            <button className="text-zenith-gray hover:text-zenith-white text-xs transition-colors">
              Terms of Service
            </button>
            <button className="text-zenith-gray hover:text-zenith-white text-xs transition-colors">
              Shipping Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
