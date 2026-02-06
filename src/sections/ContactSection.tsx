import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Clock, MapPin, Send, Package } from 'lucide-react';
import siteConfig from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);


  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone}`,
    },
    {
      icon: Clock,
      label: 'Hours',
      value: siteConfig.contact.hours,
    },
    {
      icon: MapPin,
      label: 'Shipping',
      value: siteConfig.contact.shippingInfo,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative bg-zenith-charcoal min-h-screen py-20 lg:py-32 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Content */}
          <div ref={leftRef} className="lg:max-w-md">
            <span className="text-micro mb-4 block">GET IN TOUCH</span>
            <h2 className="font-display font-bold text-3xl lg:text-4xl xl:text-5xl text-zenith-white mb-6">
              Ready to Build Your Sanctuary?
            </h2>
            <p className="text-zenith-gray text-base lg:text-lg leading-relaxed mb-8">
              Have questions about assembly, shipping, or which kit is right for you?
              Our team is here to help. We typically respond within 24 hours.
            </p>

            {/* Contact Info */}
            <div className="space-y-5 mb-10">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-zenith-gold/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-zenith-gold" />
                  </div>
                  <div>
                    <p className="text-micro mb-1">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-zenith-white hover:text-zenith-gold transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-zenith-white">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Note */}
            <div className="p-5 bg-zenith-gold/10 border border-zenith-gold/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-zenith-gold mt-0.5" />
                <div>
                  <p className="text-zenith-white font-semibold text-sm mb-1">
                    Free Pan-India Shipping
                  </p>
                  <p className="text-zenith-gray text-xs">
                    Your SWEDANA kit arrives flat-packed via our trusted logistics partners.
                    Standard delivery: 5-7 business days. Express available.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          {/* Right Column - WhatsApp CTA */}
          <div className="flex flex-col justify-center">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 lg:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-zenith-gold/20 flex items-center justify-center mx-auto mb-6">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-zenith-gold fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-2xl text-zenith-white mb-4">
                Let&apos;s Chat
              </h3>
              <p className="text-zenith-gray text-lg mb-8">
                The fastest way to reach us. Connect directly with our team on WhatsApp for instant answers and orders.
              </p>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center w-full justify-center py-4"
              >
                <span className="mr-2 font-bold">Open WhatsApp</span>
                <Send className="w-5 h-5 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
