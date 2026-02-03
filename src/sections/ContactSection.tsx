import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle, Package } from 'lucide-react';
import { saveSubmission } from '../utils/formStorage';
import siteConfig from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    interest: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 60, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine submission type based on interest
    let type: 'order' | 'contact' | 'consultation' = 'contact';
    if (formData.interest === 'standard') type = 'order';
    else if (formData.interest === 'custom') type = 'consultation';
    
    // Save submission
    saveSubmission(type, formData);
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        interest: '',
        message: '',
      });
    }, 3000);
  };

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
          <div ref={formRef}>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 lg:p-10">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-zenith-gold/20 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-zenith-gold" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-zenith-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-zenith-gray">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-micro mb-2 block">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-micro mb-2 block">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-micro mb-2 block">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-micro mb-2 block">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Your city"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-micro mb-2 block">Interested In</label>
                    <select 
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-zenith-white focus:outline-none focus:border-zenith-gold/50"
                    >
                      <option value="" className="bg-zenith-charcoal text-zenith-gray">Select an option</option>
                      <option value="standard" className="bg-zenith-charcoal text-zenith-white">Standard Kit (₹4,95,000)</option>
                      <option value="custom" className="bg-zenith-charcoal text-zenith-white">Custom Kit</option>
                      <option value="questions" className="bg-zenith-charcoal text-zenith-white">Just have questions</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-micro mb-2 block">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your space, requirements, or questions..."
                      rows={4}
                      className="w-full resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="btn-gold w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </button>
                  </div>

                  <p className="text-zenith-gray text-xs text-center pt-2">
                    By submitting, you agree to our privacy policy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
