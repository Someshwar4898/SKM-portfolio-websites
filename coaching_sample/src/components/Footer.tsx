import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#0f172a] text-2xl font-bold">A</span>
            </div>
            <div className="text-white">
              <div className="font-semibold text-2xl tracking-tight">APEX</div>
              <div className="text-xs text-gray-500">COACHING INSTITUTE</div>
            </div>
          </div>
          <p className="text-sm max-w-xs">
            Transforming aspirations into achievements since 2008. 
            Excellence through education.
          </p>
          <div className="flex gap-4 mt-8">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="hover:text-white transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="text-white font-medium mb-6 text-lg">Quick Links</div>
          <div className="space-y-3 text-sm">
            <Link to="/courses" className="block hover:text-white transition-colors">Courses</Link>
            <Link to="/faculty" className="block hover:text-white transition-colors">Our Faculty</Link>
            <Link to="/results" className="block hover:text-white transition-colors">Success Stories</Link>
            <Link to="/fees" className="block hover:text-white transition-colors">Fee Structure</Link>
          </div>
        </div>

        {/* Programs */}
        <div>
          <div className="text-white font-medium mb-6 text-lg">Programs</div>
          <div className="space-y-3 text-sm">
            <div>IIT-JEE / NEET</div>
            <div>UPSC CSE</div>
            <div>Banking & SSC</div>
            <div>Foundation Courses</div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <div className="text-white font-medium mb-6 text-lg">Get In Touch</div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1">
                <MapPin size={19} />
              </div>
              <div>
                42 Knowledge Park,<br />
                Sector 18, Noida, UP 201301
              </div>
            </div>
            <div className="flex gap-4">
              <Phone size={19} />
              <div>+91 98765 43210</div>
            </div>
            <div className="flex gap-4">
              <Mail size={19} />
              <div>admissions@apexcoaching.in</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-gray-800 pt-8 text-xs text-center text-gray-500">
        © {new Date().getFullYear()} Apex Coaching Institute. All rights reserved.
      </div>
    </footer>
  );
}
