import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Users, Award, Calendar, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';

export default function HomePage() {
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'buy' | 'rent'>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const propertiesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const featuredProperties = properties.slice(0, 6);

  const filteredProperties = featuredProperties.filter((p) => {
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      p.location.toLowerCase().includes(searchInput.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchInput)}&status=${statusFilter}`);
    } else {
      propertiesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubmitted(true);
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-[#0A2540] text-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-xs tracking-[3px] mb-6">
              EST. 2008 • CALIFORNIA
            </div>
            <h1 className="text-7xl md:text-[92px] font-semibold tracking-tighter leading-none mb-6">
              FIND YOUR<br />NEXT CHAPTER
            </h1>
            <p className="max-w-lg mx-auto text-xl text-white/80 mb-12">
              Exclusive properties. Extraordinary experiences.
              The finest homes in the world's most desirable locations.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <form
              onSubmit={handleSearch}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-2 shadow-2xl"
            >
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50">
                    <MapPin size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Location, neighborhood or zip"
                    className="w-full bg-transparent border-0 pl-14 py-6 text-lg placeholder:text-white/50 focus:outline-none"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 px-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'buy' | 'rent')}
                    className="bg-[#0A2540] border border-white/20 rounded-2xl px-5 py-3 text-sm cursor-pointer focus:outline-none"
                  >
                    <option value="all">Buy &amp; Rent</option>
                    <option value="buy">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                  <button
                    type="submit"
                    className="px-12 py-6 bg-[#D4AF37] hover:bg-[#E8C670] active:bg-[#C9A030] text-[#0A2540] font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all"
                  >
                    SEARCH
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="text-xs tracking-[3px] mb-2 opacity-60">SCROLL TO EXPLORE</div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="w-px h-12 bg-white/40"
          />
        </div>
      </section>

      {/* STATS BAR */}
      <div className="bg-black/40 py-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
          {[
            { number: "482", label: "Properties Sold" },
            { number: "97", label: "% Client Retention" },
            { number: "14", label: "Countries" },
            { number: "28", label: "Years Experience" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="border-r border-white/10 last:border-0"
            >
              <div className="text-4xl font-semibold text-[#D4AF37]">{stat.number}</div>
              <div className="text-xs tracking-widest text-white/60 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FEATURED PROPERTIES */}
      <section id="properties" ref={propertiesRef} className="py-24 bg-[#08172B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <div className="uppercase tracking-[3px] text-xs text-[#D4AF37] mb-2">CURATED COLLECTION</div>
              <h2 className="text-6xl font-semibold tracking-tighter">Featured Homes</h2>
            </div>
            <div className="flex flex-wrap gap-3 mt-8 md:mt-0">
              {(['all', 'buy', 'rent'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-7 py-2 rounded-full text-sm transition-all ${
                    statusFilter === s ? 'bg-white text-black' : 'border border-white/30 hover:bg-white/5'
                  }`}
                >
                  {s === 'all' ? 'All' : s === 'buy' ? 'For Sale' : 'For Rent'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-xl">No properties match your filters</p>
                  <button
                    onClick={() => setStatusFilter('all')}
                    className="mt-6 underline text-sm"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="text-center mt-14">
            <Link
              to="/properties"
              className="inline-block px-12 py-4 border border-white/30 hover:bg-white/5 rounded-full text-sm tracking-widest transition-all"
            >
              VIEW ALL PROPERTIES
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why" className="py-24 bg-[#0A2540]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5">
              <div className="sticky top-24">
                <div className="uppercase tracking-widest text-xs mb-3 text-[#D4AF37]">OUR APPROACH</div>
                <h3 className="text-6xl font-semibold tracking-tighter leading-none">
                  The Horizon<br />Difference
                </h3>
                <p className="mt-8 text-lg text-white/70 max-w-md">
                  For over two decades, we have redefined luxury real estate by combining
                  unparalleled market knowledge with a truly personal approach.
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="text-xs tracking-[1px] border border-white/30 rounded py-2 px-5">4.98/5</div>
                  <div>from 312 clients</div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Users className="w-7 h-7" />,
                  title: "Personalized Concierge",
                  desc: "Every client is assigned a dedicated team including a senior advisor and an operations manager.",
                },
                {
                  icon: <Award className="w-7 h-7" />,
                  title: "Exclusive Access",
                  desc: "Our private network of off-market opportunities is unmatched in the industry.",
                },
                {
                  icon: <DollarSign className="w-7 h-7" />,
                  title: "Market Intelligence",
                  desc: "Real-time data analysis, predictive modeling and 24-hour market alerts.",
                },
                {
                  icon: <Calendar className="w-7 h-7" />,
                  title: "Seamless Process",
                  desc: "We handle everything from legal to interior styling to relocation services.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className="bg-[#11253D] p-9 rounded-3xl border border-white/10 group"
                >
                  <div className="w-14 h-14 flex items-center justify-center bg-white/5 rounded-2xl mb-8 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                    {item.icon}
                  </div>
                  <h4 className="text-3xl font-medium mb-4 tracking-tight">{item.title}</h4>
                  <p className="text-white/70 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section id="destinations" className="py-24 bg-[#08172B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#D4AF37] text-xs tracking-[3px]">WORLD CLASS LOCATIONS</div>
            <h2 className="text-6xl tracking-tighter font-semibold mt-3">Signature Destinations</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Malibu", count: "42", image: "/images/property1.jpg", desc: "California Coast", status: "buy" },
              { name: "Aspen", count: "18", image: "/images/bedroom.jpg", desc: "Colorado Mountains", status: "buy" },
              { name: "Hamptons", count: "31", image: "/images/property2.jpg", desc: "New York", status: "buy" },
              { name: "Miami", count: "64", image: "/images/property3.jpg", desc: "Florida", status: "rent" },
            ].map((dest, idx) => (
              <Link key={idx} to={`/properties?search=${dest.name}`}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.65] group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                    <div className="uppercase text-xs tracking-widest text-white/70">{dest.desc}</div>
                    <div className="text-[52px] font-semibold tracking-tighter leading-none mt-1 mb-4">{dest.name}</div>
                    <div className="inline-flex items-center gap-3 text-xs">
                      <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur">{dest.count} HOMES</div>
                      <div className="text-white/50">→</div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-[#0A2540]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="mx-auto mb-6 inline-flex h-px w-12 bg-[#D4AF37]" />
            <h2 className="text-6xl font-semibold tracking-tighter">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "The team at Horizon found us the perfect home in record time. Their market knowledge is second to none.",
                name: "Isabella Moreau",
                title: "CEO, LVMH North America",
                location: "Beverly Hills",
              },
              {
                quote: "From start to finish, Horizon treated us like family. They even helped us find the right school for our children.",
                name: "Dr. Michael Chen",
                title: "Neurosurgeon",
                location: "Santa Monica",
              },
              {
                quote: "I sold two homes with Horizon and purchased a third. I wouldn't work with anyone else.",
                name: "Lydia Beaumont",
                title: "Fashion Designer",
                location: "Aspen",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#11253D] p-10 rounded-3xl border border-white/10"
              >
                <div className="text-7xl text-[#D4AF37] opacity-20 font-serif">"</div>
                <p className="text-xl leading-tight mt-2 tracking-tight">{testimonial.quote}</p>
                <div className="mt-14 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10" />
                  <div>
                    <div>{testimonial.name}</div>
                    <div className="text-xs text-white/60">{testimonial.title} • {testimonial.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 border-t border-white/10 bg-black">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="text-[#D4AF37] text-xs tracking-[4px] mb-4">STAY INFORMED</div>
          <h2 className="text-6xl font-medium tracking-tight mb-6">Receive our Private Listings</h2>
          <p className="text-lg text-white/70">
            Exclusive opportunities and market insights delivered monthly to your inbox.
          </p>

          {newsletterSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 py-5 px-8 bg-emerald-600/20 border border-emerald-500/40 rounded-2xl text-emerald-400 tracking-widest text-sm"
            >
              ✓ YOU'RE ON THE LIST — WE'LL BE IN TOUCH
            </motion.div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="mt-10 flex">
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 bg-white/5 border border-white/20 px-8 py-5 text-sm tracking-widest placeholder:text-white/50 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="bg-white text-black px-12 font-medium hover:bg-[#D4AF37] active:bg-amber-400 transition-colors"
              >
                JOIN
              </button>
            </form>
          )}
          <div className="text-[10px] tracking-widest mt-4 text-white/50">WE RESPECT YOUR INBOX</div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
