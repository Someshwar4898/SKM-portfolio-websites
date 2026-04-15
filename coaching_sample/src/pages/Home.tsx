import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Award, TrendingUp } from 'lucide-react';
import { courses, stats, testimonials } from '../lib/data';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

export default function Home() {
  return (
    <>
      {/* HERO */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f172a]">
        <div className="absolute inset-0 bg-[url('./images/hero.jpg')] bg-cover bg-center opacity-40" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white pt-16 sm:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 mb-6 text-xs sm:text-sm"
          >
            ESTD 2008 • NOIDA
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter mb-6 leading-tight"
          >
            SHAPE YOUR<br />FUTURE WITH<br />EXCELLENCE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto text-base sm:text-xl text-white/90 mb-10"
          >
            Premier coaching for JEE, NEET, UPSC &amp; more.<br className="hidden sm:block" />
            Learn from the best. Achieve the extraordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <Link
              to="/courses"
              className="group flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-[#0f172a] rounded-full font-semibold text-base sm:text-lg hover:bg-[#14b8a6] hover:text-white transition-all w-full sm:w-auto justify-center"
            >
              EXPLORE PROGRAMS
              <ArrowRight className="group-hover:-rotate-45 transition-transform" />
            </Link>

            <Link
              to="/contact"
              className="px-8 sm:px-10 py-3.5 sm:py-4 border border-white/60 rounded-full text-base sm:text-lg hover:bg-white hover:text-[#0f172a] transition-all w-full sm:w-auto text-center"
            >
              BOOK A COUNSELLING
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center hidden sm:flex">
          <div className="text-xs tracking-[3px] mb-2 text-white/70">SCROLL TO EXPLORE</div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-10 bg-white/50"
          />
        </div>
      </div>

      {/* TRUST BAR */}
      <div className="py-5 border-b bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-16 gap-y-4 opacity-70">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-medium">
            <div>PARTNERED WITH</div>
            <div className="h-px w-6 sm:w-8 bg-gray-300" />
          </div>
          {['ALLEN', 'FIITJEE', 'NARAYANA', 'Aakash'].map(name => (
            <div key={name} className="font-serif text-2xl sm:text-3xl tracking-tight">{name}</div>
          ))}
        </div>
      </div>

      {/* WHY APEX */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div {...fadeUp()} className="text-[#14b8a6] font-medium tracking-widest text-xs sm:text-sm mb-3">
            WHY STUDENTS CHOOSE US
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0f172a]">
            Education that delivers results
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            { icon: Users, label: "Small Batch Sizes", desc: "Maximum 35 students per batch for personalized attention" },
            { icon: Award, label: "Proven Track Record", desc: "Consistent top rankers in JEE, NEET & UPSC" },
            { icon: TrendingUp, label: "Modern Infrastructure", desc: "Smart classrooms, digital libraries & labs" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              {...fadeUp(index * 0.1)}
              whileHover={{ y: -6 }}
              className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 group cursor-default"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#14b8a6]/10 flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-[#14b8a6] transition-colors">
                <feature.icon className="w-7 h-7 sm:w-9 sm:h-9 text-[#14b8a6] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{feature.label}</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FEATURED COURSES */}
      <div className="bg-[#f8fafc] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10 sm:mb-12">
            <div>
              <motion.div {...fadeUp()} className="uppercase tracking-[2px] text-xs text-[#14b8a6] mb-2">
                WORLD CLASS PROGRAMS
              </motion.div>
              <motion.h2 {...fadeUp(0.1)} className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter">
                Featured Courses
              </motion.h2>
            </div>
            <Link to="/courses" className="flex items-center gap-2 text-sm hover:text-[#14b8a6] transition-colors self-start sm:self-auto">
              VIEW ALL PROGRAMS <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {courses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course.id}
                {...fadeUp(index * 0.08)}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl transition-shadow group"
              >
                <div className="h-48 sm:h-52 overflow-hidden relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 sm:bottom-5 left-5 sm:left-6 text-white">
                    <div className="text-xs tracking-widest opacity-80">{course.category}</div>
                    <div className="text-xl sm:text-2xl font-semibold tracking-tight">{course.title.split(" ")[0]}</div>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="flex justify-between text-sm mb-5 sm:mb-6 text-gray-500">
                    <div>{course.duration}</div>
                    <div className="font-medium text-[#14b8a6]">{course.fees}</div>
                  </div>

                  <Link
                    to="/courses"
                    className="block w-full py-3 sm:py-3.5 text-center rounded-2xl border border-gray-200 text-sm font-medium hover:bg-[#0f172a] hover:text-white transition-all"
                  >
                    LEARN MORE
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 border-b">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div key={index} {...fadeUp(index * 0.08)}>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#14b8a6] tabular-nums">{stat.number}</div>
              <div className="mt-2 sm:mt-3 text-xs sm:text-sm tracking-wider text-gray-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-md mx-auto text-center mb-10 sm:mb-14">
          <motion.div {...fadeUp()} className="text-[#14b8a6] text-sm">STUDENT VOICES</motion.div>
          <motion.h2 {...fadeUp(0.1)} className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter mt-2">
            Real success stories
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              {...fadeUp(index * 0.1)}
              className="bg-white p-7 sm:p-9 rounded-3xl border"
            >
              <div className="italic text-lg sm:text-xl leading-snug text-gray-700 mb-7 sm:mb-9">"{t.quote}"</div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                  {t.image && (
                    <img src={t.image} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-sm sm:text-base">{t.name}</div>
                  <div className="text-[#14b8a6] text-xs sm:text-sm">{t.rank}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA BANNER */}
      <motion.div
        {...fadeUp()}
        className="bg-[#0f172a] text-white py-16 sm:py-20"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">Ready to start your journey?</div>
          <p className="text-gray-400 mb-8 text-base sm:text-lg">Join 8500+ students who chose Apex to crack their dream exam.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-[#14b8a6] text-white rounded-full font-semibold text-sm sm:text-base hover:bg-[#0f7665] transition-colors"
          >
            GET FREE COUNSELLING <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </>
  );
}
