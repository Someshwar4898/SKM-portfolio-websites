import { motion } from 'framer-motion';
import { Trophy, Users } from 'lucide-react';
import { testimonials } from '../lib/data';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

export default function Results() {
  return (
    <div className="pt-12 sm:pt-16 pb-20 sm:pb-24 bg-[#f8fafc]">

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter"
        >
          Our Results Speak Louder
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-4 sm:mt-6 text-lg sm:text-2xl text-gray-600"
        >
          Year after year, Apex students dominate national examinations
        </motion.p>
      </div>

      {/* Stats Cards */}
      <div className="max-w-5xl mx-auto mt-14 sm:mt-20 px-4 sm:px-6">
        <div className="grid md:grid-cols-12 gap-5 sm:gap-6">

          {/* Toppers card */}
          <motion.div
            {...fadeUp(0.1)}
            className="md:col-span-7 rounded-3xl bg-white p-8 sm:p-14 flex flex-col justify-center"
          >
            <div className="flex items-start gap-4">
              <Trophy className="text-amber-400 flex-shrink-0 mt-1 w-5 h-5 sm:w-6 sm:h-6" />
              <div>
                <div className="text-xs sm:text-sm text-amber-500 mb-1">2024 TOPPERS</div>
                <div className="text-xl sm:text-2xl lg:text-4xl font-semibold leading-snug">
                  AIR 3 • AIR 19 • AIR 47 • AIR 91
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-16 text-base sm:text-xl leading-relaxed">
              187 students cracked JEE Advanced.<br />
              143 students cleared NEET.<br />
              71 students selected in UPSC CSE.
            </div>
          </motion.div>

          {/* Number cards */}
          <div className="md:col-span-5 flex flex-row md:flex-col gap-4 sm:gap-6">
            <motion.div {...fadeUp(0.15)} className="flex-1 bg-white rounded-3xl p-6 sm:p-10">
              <div className="text-4xl sm:text-5xl lg:text-7xl font-semibold tabular-nums text-[#14b8a6]">1240</div>
              <div className="mt-1 text-xs sm:text-sm text-gray-500 leading-snug">STUDENTS SELECTED IN LAST 3 YEARS</div>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="flex-1 bg-white rounded-3xl p-6 sm:p-10">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-4xl sm:text-5xl font-semibold tabular-nums text-[#14b8a6]">98</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">PERCENTILE AVG</div>
                </div>
                <Users className="opacity-20 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28">
        <div className="text-center mb-10 sm:mb-12">
          <motion.div {...fadeUp()} className="text-[#14b8a6] text-xs sm:text-sm">SUCCESS STORIES</motion.div>
          <motion.div {...fadeUp(0.1)} className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-2">
            From our students
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              {...fadeUp(index * 0.08)}
              className="p-7 sm:p-10 bg-white rounded-3xl shadow-sm"
            >
              <div className="text-5xl sm:text-7xl text-[#14b8a6]/20 font-serif leading-none">"</div>
              <div className="-mt-4 sm:-mt-8 text-base sm:text-xl font-light text-balance leading-snug">
                {testimonial.quote}
              </div>

              <div className="mt-10 sm:mt-14 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <div className="text-right">
                  <div className="text-sm font-medium">{testimonial.name}</div>
                  <div className="text-xs text-[#14b8a6]">{testimonial.rank}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200 my-16 sm:my-20 max-w-6xl mx-auto" />

      {/* Next batch */}
      <motion.div {...fadeUp()} className="max-w-md mx-auto text-center px-4 sm:px-6">
        <div className="uppercase text-xs mb-3 sm:mb-4 text-gray-400 tracking-widest">NEXT BATCH STARTS</div>
        <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold">15th June 2025</div>
        <div className="mt-3 sm:mt-5 text-sm text-gray-500">Limited seats available. Register today</div>
      </motion.div>
    </div>
  );
}
