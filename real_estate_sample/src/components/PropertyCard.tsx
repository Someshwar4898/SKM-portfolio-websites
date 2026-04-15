import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Heart } from 'lucide-react';
import { type Property, formatPrice } from '../data/properties';

interface PropertyCardProps {
  property: Property;
  index: number;
}

export default function PropertyCard({ property, index }: PropertyCardProps) {
  return (
    <motion.div
      key={property.id}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ delay: Math.min(index * 0.04, 0.6) }}
      className="group bg-[#0F253E] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500"
    >
      <Link to={`/properties/${property.id}`} className="block">
        <div className="relative h-80">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-all group-hover:scale-105 duration-700"
            loading="lazy"
          />
          <div className="absolute top-5 right-5 px-4 py-1 bg-black/70 text-xs rounded-full backdrop-blur">
            {property.type}
          </div>
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute bottom-5 left-5 flex items-center gap-1.5 bg-black/80 px-4 py-1 rounded-full text-xs hover:bg-white/20 transition-colors"
            aria-label="Save property"
          >
            <Heart className="w-3.5 h-3.5" /> SAVE
          </button>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold text-3xl tracking-tight">
                {formatPrice(property.price, property.status)}
              </div>
              <div className="text-sm text-white/60 flex items-center gap-1 mt-1">
                <MapPin className="inline w-4 h-4" /> {property.location}
              </div>
            </div>
            <div className="text-right text-xs pt-1">
              {property.bedrooms}BD • {property.bathrooms}BA<br />
              <span className="font-mono text-[10px]">{property.area} ft²</span>
            </div>
          </div>

          <div className="mt-6 text-xl font-light tracking-tight leading-none">
            {property.title}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
