import { Link } from 'react-router-dom';
import { Home, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-y-16">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#D4AF37] rounded-2xl flex items-center justify-center">
              <Home className="w-5 h-5 text-black" />
            </div>
            <div className="font-semibold tracking-tighter text-2xl">HORIZON</div>
          </Link>
          <div className="mt-8 text-xs leading-loose text-white/60">
            1001 WILSHIRE BLVD<br />
            LOS ANGELES, CA 90017<br />
            UNITED STATES
          </div>
        </div>

        {/* Explore */}
        <div>
          <div className="uppercase text-xs tracking-[1px] text-white/40 mb-5">EXPLORE</div>
          <div className="space-y-4 text-sm">
            <Link to="/properties" className="block hover:text-[#D4AF37] transition-colors">Current Listings</Link>
            <Link to="/properties?status=buy" className="block hover:text-[#D4AF37] transition-colors">For Sale</Link>
            <Link to="/properties?status=rent" className="block hover:text-[#D4AF37] transition-colors">For Rent</Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <div className="uppercase text-xs tracking-[1px] text-white/40 mb-5">COMPANY</div>
          <div className="space-y-4 text-sm">
            <Link to="/#why" className="block hover:text-[#D4AF37] transition-colors">About Us</Link>
            <Link to="/#why" className="block hover:text-[#D4AF37] transition-colors">Our Advisors</Link>
            <Link to="/#testimonials" className="block hover:text-[#D4AF37] transition-colors">Client Stories</Link>
            <Link to="/sell" className="block hover:text-[#D4AF37] transition-colors">Sell With Us</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="uppercase text-xs tracking-[1px] text-white/40 mb-5">CONTACT</div>
          <div className="space-y-4 text-sm">
            <a
              href="tel:310-555-0142"
              className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-4 h-4" /> (310) 555-0142
            </a>
            <a
              href="mailto:hello@horizonhomes.co"
              className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
            >
              <Mail className="w-4 h-4" /> hello@horizonhomes.co
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="col-span-2 md:col-span-1 flex flex-col md:items-end">
          <div className="text-xs text-white/50 max-w-[240px] md:text-right">
            Horizon Homes is a registered trademark.
            All rights reserved. © {new Date().getFullYear()}
          </div>
          <div className="mt-auto pt-12 text-xs text-white/40 md:text-right space-x-3">
            <Link to="/privacy" className="hover:text-[#D4AF37] transition-colors">PRIVACY</Link>
            <span>•</span>
            <Link to="/legal" className="hover:text-[#D4AF37] transition-colors">LEGAL</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
