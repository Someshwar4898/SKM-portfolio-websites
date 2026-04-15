import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

export default function SellPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#0A2540] text-white pt-20">
      {/* Header */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <div className="uppercase tracking-[3px] text-xs text-[#D4AF37] mb-4">SELL WITH CONFIDENCE</div>
          <h1 className="text-7xl font-semibold tracking-tighter leading-none mb-6">
            List Your<br />Property
          </h1>
          <p className="text-xl text-white/70 max-w-lg mx-auto">
            Our expert advisors will guide you through every step to achieve the highest possible price for your home.
          </p>
        </div>
      </section>

      {/* Why Sell With Us */}
      <section className="py-16 bg-[#08172B]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stat: "98%", label: "List-to-Sale Ratio", desc: "Nearly every home we list, we sell." },
              { stat: "18", label: "Avg. Days on Market", desc: "Our properties sell faster than the market average." },
              { stat: "$2.4B", label: "Total Sales Volume", desc: "Proven track record of luxury transactions." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0A2540] rounded-3xl p-8 border border-white/10 text-center"
              >
                <div className="text-5xl font-semibold text-[#D4AF37] tracking-tight">{item.stat}</div>
                <div className="mt-2 font-medium text-lg">{item.label}</div>
                <div className="mt-2 text-sm text-white/60">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="w-12 h-12 bg-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Home className="w-6 h-6 text-black" />
            </div>
            <h2 className="text-4xl font-semibold tracking-tighter">Get a Free Valuation</h2>
            <p className="mt-3 text-white/60">Tell us about your property and we'll be in touch.</p>
          </div>

          <div className="bg-[#0F253E] rounded-3xl p-10 border border-white/10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <div className="text-xl font-semibold mb-2">Request Received</div>
                  <p className="text-white/60">One of our senior advisors will contact you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First name" required className="bg-white/5 border border-white/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors" />
                    <input type="text" placeholder="Last name" required className="bg-white/5 border border-white/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors" />
                  </div>
                  <input type="email" placeholder="Email address" required className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors" />
                  <input type="tel" placeholder="Phone number" required className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors" />
                  <input type="text" placeholder="Property address" required className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors" />
                  <select required className="w-full bg-[#0A2540] border border-white/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors cursor-pointer">
                    <option value="">Property type</option>
                    <option>Villa</option>
                    <option>House</option>
                    <option>Penthouse</option>
                    <option>Condo</option>
                    <option>Other</option>
                  </select>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#D4AF37] hover:bg-white active:bg-amber-400 disabled:bg-white/30 py-4 text-lg font-medium text-black rounded-2xl transition-all"
                  >
                    {submitting ? 'SUBMITTING...' : 'REQUEST FREE VALUATION'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
