import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Properties', to: '/properties' },
  { label: 'Why Us', href: '/#why' },
  { label: 'Destinations', href: '/#destinations' },
  { label: 'Stories', href: '/#testimonials' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleHashNav = (href: string) => {
    const hash = href.replace('/#', '');
    if (location.pathname === '/') {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#0A2540] shadow-lg'
          : 'bg-[#0A2540]/95 backdrop-blur-lg'
      } border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center">
            <Home className="w-6 h-6 text-[#0A2540]" />
          </div>
          <div>
            <div className="text-2xl font-semibold tracking-tighter">HORIZON</div>
            <div className="text-[10px] text-white/60 -mt-1">HOMES</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-[1px]">
          {navLinks.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className={`text-white hover:text-[#D4AF37] transition-colors ${
                  location.pathname === link.to ? 'text-[#D4AF37]' : ''
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() => handleHashNav(link.href!)}
                className="text-white hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </button>
            )
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/sell"
            className="px-8 py-2.5 border border-white/30 hover:bg-white/5 rounded-full text-sm tracking-widest transition-all text-white"
          >
            SELL YOUR HOME
          </Link>
          <Link
            to="/properties"
            className="px-8 py-2.5 bg-white text-[#0A2540] hover:bg-[#D4AF37] hover:text-[#0A2540] rounded-full text-sm font-medium transition-all"
          >
            GET STARTED
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A2540] border-t border-white/10 px-6 py-6 space-y-4">
          {navLinks.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className="block text-sm uppercase tracking-[1px] hover:text-[#D4AF37] py-2 transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() => handleHashNav(link.href!)}
                className="block w-full text-left text-sm uppercase tracking-[1px] hover:text-[#D4AF37] py-2 transition-colors"
              >
                {link.label}
              </button>
            )
          )}
          <div className="pt-4 flex flex-col gap-3">
            <Link
              to="/sell"
              className="w-full text-center px-8 py-3 border border-white/30 hover:bg-[#D4AF37] rounded-full text-sm tracking-widest transition-all"
            >
              SELL YOUR HOME
            </Link>
            <Link
              to="/properties"
              className="w-full text-center px-8 py-3 bg-white text-[#0A2540] hover:bg-[#D4AF37] rounded-full text-sm font-medium transition-all"
            >
              GET STARTED
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
