import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0A2540] text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-[#D4AF37] rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Home className="w-10 h-10 text-[#0A2540]" />
        </div>
        <div className="text-[#D4AF37] text-xs tracking-[4px] mb-4">404 — PAGE NOT FOUND</div>
        <h1 className="text-7xl font-semibold tracking-tighter mb-6">Lost?</h1>
        <p className="text-white/60 text-lg max-w-sm mx-auto mb-10">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-10 py-4 bg-white text-[#0A2540] hover:bg-[#D4AF37] rounded-full font-medium transition-all"
          >
            Go Home
          </Link>
          <Link
            to="/properties"
            className="px-10 py-4 border border-white/30 hover:bg-white/5 rounded-full transition-all"
          >
            Browse Properties
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
