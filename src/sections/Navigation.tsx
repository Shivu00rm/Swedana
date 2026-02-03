import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Benefits', path: '/benefits' },
    { label: 'Products', path: '/products' },
    { label: 'Support', path: '/installation' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
            ? 'bg-zenith-black/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
          }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <img
              src="/swedana_logo.png"
              alt="SWEDANA"
              className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight text-zenith-white">
                SWEDANA
              </span>
              <span className="text-[10px] text-zenith-gold tracking-[0.2em] uppercase">
                Ayurvedic Heat Therapy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-mono text-xs tracking-[0.14em] uppercase transition-colors duration-300 ${location.pathname === link.path
                    ? 'text-zenith-white'
                    : 'text-zenith-gray hover:text-zenith-white'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/#contact"
            className="hidden lg:inline-flex btn-outline-gold text-xs py-3 px-6"
          >
            Get Your Kit
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-zenith-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] bg-zenith-black transition-all duration-500 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display font-bold text-2xl uppercase tracking-tight text-zenith-white hover:text-zenith-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-gold mt-8"
          >
            Get Your Kit
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navigation;
