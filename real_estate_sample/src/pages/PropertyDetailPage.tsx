import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowLeft, Bed, Bath, Maximize2 } from 'lucide-react';
import { properties, formatPrice } from '../data/properties';
import Footer from '../components/Footer';

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === Number(id));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!property) return <Navigate to="/properties" replace />;

  const related = properties.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#08172B] text-white pt-20">
      {/* Back Nav */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Properties
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative h-[60vh] max-w-7xl mx-auto px-6">
        <div className="w-full h-full rounded-3xl overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-6 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent rounded-b-3xl" />
        </div>

        <div className="absolute bottom-10 left-12">
          <div className="inline-block px-5 py-1 text-xs bg-white/90 text-black rounded-full font-medium mb-4 tracking-wider">
            {property.type}
          </div>
          <h1 className="text-white text-5xl md:text-6xl font-semibold tracking-tighter leading-none">
            {property.title}
          </h1>
          <div className="flex items-center gap-2 mt-4 text-white/80">
            <MapPin className="w-5 h-5" />
            <span>{property.location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        {/* Left: Details */}
        <div className="md:col-span-2 space-y-10">
          {/* Price + Stats */}
          <div className="flex flex-wrap gap-8 items-end">
            <div>
              <div className="text-6xl font-semibold tracking-tight">
                {formatPrice(property.price, property.status)}
              </div>
              <div className="uppercase text-xs text-white/50 mt-1">ASKING PRICE</div>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <Bed className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
                <div className="text-2xl font-semibold">{property.bedrooms}</div>
                <div className="text-xs text-white/50">BEDROOMS</div>
              </div>
              <div className="text-center">
                <Bath className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
                <div className="text-2xl font-semibold">{property.bathrooms}</div>
                <div className="text-xs text-white/50">BATHROOMS</div>
              </div>
              <div className="text-center">
                <Maximize2 className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
                <div className="text-2xl font-semibold">{property.area.toLocaleString()}</div>
                <div className="text-xs text-white/50">SQ FT</div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-10">
            <div className="uppercase text-xs tracking-widest mb-4 text-white/60">DESCRIPTION</div>
            <p className="text-white/80 leading-relaxed text-lg">{property.description}</p>
          </div>

          <div>
            <div className="uppercase text-xs tracking-widest mb-6 text-white/60">KEY FEATURES</div>
            <div className="grid grid-cols-2 gap-4">
              {property.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-2xl px-6 py-4 border border-white/10">
                  <div className="w-px h-4 bg-[#D4AF37] flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="md:col-span-1">
          <div className="bg-[#0A2540] rounded-3xl p-8 border border-white/10 sticky top-28">
            <h3 className="text-2xl font-semibold tracking-tight mb-6">Request a Private Viewing</h3>

            <AnimatePresence mode="wait">
              {showSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 text-2xl">
                    ✓
                  </div>
                  <div className="text-emerald-400 tracking-widest text-sm">INQUIRY RECEIVED</div>
                  <p className="text-white/60 text-sm mt-2">We'll contact you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleContactSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="First name"
                      required
                      className="bg-white/5 border border-white/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      required
                      className="bg-white/5 border border-white/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#D4AF37] hover:bg-white active:bg-amber-400 disabled:bg-white/30 py-4 text-lg font-medium text-black rounded-2xl mt-2 transition-all flex items-center justify-center"
                  >
                    {isSubmitting ? 'SENDING...' : 'REQUEST VIEWING'}
                  </button>
                  <p className="text-center text-[10px] text-white/40 tracking-widest">
                    A MEMBER OF OUR TEAM WILL CONTACT YOU WITHIN 24 HOURS
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Related Properties */}
      {related.length > 0 && (
        <section className="py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="uppercase tracking-[3px] text-xs text-[#D4AF37] mb-2">SIMILAR PROPERTIES</div>
            <h2 className="text-4xl font-semibold tracking-tighter mb-10">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <div key={p.id} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <Link to={`/properties/${p.id}`} className="group block bg-[#0F253E] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500">
                    <div className="relative h-56">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-xs rounded-full backdrop-blur">{p.type}</div>
                    </div>
                    <div className="p-6">
                      <div className="text-2xl font-semibold tracking-tight">{formatPrice(p.price, p.status)}</div>
                      <div className="text-sm text-white/60 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5" /> {p.location}
                      </div>
                      <div className="mt-3 text-lg font-light">{p.title}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
