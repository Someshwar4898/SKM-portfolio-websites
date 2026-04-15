import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from 'lucide-react';
import { properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';

const propertyTypes = ['All', 'Villa', 'House', 'Penthouse'];

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [status, setStatus] = useState<'all' | 'buy' | 'rent'>(
    (searchParams.get('status') as 'all' | 'buy' | 'rent') ?? 'all'
  );
  const [type, setType] = useState('all');

  // Sync URL params → local state when params change
  useEffect(() => {
    const s = searchParams.get('search');
    const st = searchParams.get('status') as 'all' | 'buy' | 'rent' | null;
    if (s !== null) setSearch(s);
    if (st) setStatus(st);
  }, [searchParams]);

  const filtered = properties.filter((p) => {
    const matchesStatus = status === 'all' || p.status === status;
    const matchesType = type === 'all' || p.type.toLowerCase() === type.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const clearFilters = () => {
    setSearch('');
    setStatus('all');
    setType('all');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#08172B] text-white pt-20">
      {/* Page Header */}
      <div className="bg-[#0A2540] py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="uppercase tracking-[3px] text-xs text-[#D4AF37] mb-2">CURATED COLLECTION</div>
          <h1 className="text-6xl font-semibold tracking-tighter">All Properties</h1>
          <p className="mt-4 text-white/60 text-lg">{filtered.length} properties available</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#0A2540]/80 backdrop-blur sticky top-20 z-40 border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
          {/* Search */}
          <input
            type="text"
            placeholder="Search location or property..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border border-white/20 rounded-2xl px-6 py-3 text-sm focus:outline-none focus:border-[#D4AF37] w-full md:w-72 placeholder:text-white/40 transition-colors"
          />

          {/* Status Tabs */}
          <div className="flex gap-2">
            {(['all', 'buy', 'rent'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-5 py-2 rounded-full text-sm transition-all ${
                  status === s ? 'bg-white text-black' : 'border border-white/30 hover:bg-white/5'
                }`}
              >
                {s === 'all' ? 'All' : s === 'buy' ? 'For Sale' : 'For Rent'}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 flex-wrap">
            {propertyTypes.map((t) => (
              <button
                key={t}
                onClick={() => setType(t === 'All' ? 'all' : t)}
                className={`px-5 py-1.5 text-sm rounded-full border transition-all ${
                  type.toLowerCase() === t.toLowerCase()
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                    : 'border-white/30 hover:border-white/60'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {(search || status !== 'all' || type !== 'all') && (
            <button
              onClick={clearFilters}
              className="text-xs text-white/50 hover:text-white underline transition-colors ml-auto"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filtered.length > 0 ? (
                filtered.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6">
                    <Home className="w-8 h-8" />
                  </div>
                  <p className="text-xl">No properties match your filters</p>
                  <button onClick={clearFilters} className="mt-6 underline text-sm">
                    Clear all filters
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
