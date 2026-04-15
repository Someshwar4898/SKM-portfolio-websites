import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const feeStructures = [
  {
    category: "Engineering",
    programs: [
      { name: "IIT-JEE Advanced", fee: "₹1,25,000", duration: "2 Years" },
      { name: "JEE Main Crash Course", fee: "₹48,000", duration: "4 Months" }
    ]
  },
  {
    category: "Medical",
    programs: [
      { name: "NEET-UG 2025", fee: "₹1,35,000", duration: "2 Years" },
      { name: "NEET Repeaters Batch", fee: "₹82,000", duration: "1 Year" }
    ]
  },
  {
    category: "Civil Services",
    programs: [
      { name: "UPSC Foundation", fee: "₹95,000", duration: "18 Months" },
      { name: "GS + CSAT", fee: "₹57,000", duration: "10 Months" }
    ]
  },
  {
    category: "Other Competitive",
    programs: [
      { name: "Bank PO & Clerical", fee: "₹65,000", duration: "1 Year" },
      { name: "SSC CGL", fee: "₹71,000", duration: "14 Months" }
    ]
  }
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: 'easeOut' },
});

export default function Fees() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-14 pb-20 sm:pb-28">

      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[#14b8a6] text-xs font-medium tracking-widest"
        >
          TRANSPARENT PRICING
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight"
        >
          Fee Structure
        </motion.h1>
      </div>

      {/* Fee Cards */}
      <div className="mt-12 sm:mt-16 grid gap-5 sm:gap-8">
        {feeStructures.map((group, index) => (
          <motion.div
            key={index}
            {...fadeUp(index * 0.08)}
            className="border rounded-3xl p-7 sm:p-12 bg-white"
          >
            <div className="uppercase tracking-widest text-xs text-[#14b8a6] mb-4 sm:mb-5">{group.category}</div>

            <div className="space-y-6 sm:space-y-8">
              {group.programs.map((program, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6 border-b pb-6 sm:pb-8 last:border-none last:pb-0"
                >
                  <div className="flex-1">
                    <div className="font-medium text-lg sm:text-2xl tracking-tight">{program.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{program.duration}</div>
                  </div>

                  <div className="sm:text-right flex-shrink-0">
                    <div className="font-mono text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#14b8a6]">
                      {program.fee}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">incl. GST • Material</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scholarship Banner */}
      <motion.div
        {...fadeUp(0.1)}
        className="mt-16 sm:mt-24 rounded-3xl bg-[#0f172a] text-white p-10 sm:p-16 text-center"
      >
        <div className="max-w-sm mx-auto">
          <div className="inline-block bg-white/10 text-xs px-5 sm:px-6 py-2 rounded-full tracking-widest">
            SPECIAL OFFER
          </div>
          <div className="mt-5 sm:mt-7 text-2xl sm:text-3xl lg:text-4xl font-medium">Early Bird Scholarship</div>
          <p className="mt-4 sm:mt-6 text-balance leading-snug text-base sm:text-lg text-gray-300">
            Enroll before 30th June 2025 to avail 15% off on all 2-year programs
          </p>

          <Link
            to="/contact"
            className="mt-8 sm:mt-10 inline-block px-10 sm:px-14 py-3.5 sm:py-4 rounded-2xl border border-white/70 hover:bg-white hover:text-[#0f172a] transition-colors text-sm font-medium"
          >
            APPLY NOW
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
