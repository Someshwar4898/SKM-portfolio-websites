import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-20 sm:pb-24">

      {/* Hero text */}
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="uppercase text-xs tracking-[3px] text-[#14b8a6]"
        >
          OUR STORY
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-bold tracking-[-1.5px] sm:tracking-[-2.5px] leading-tight mt-4 sm:mt-6"
        >
          Founded with a mission to transform lives through education
        </motion.h1>
      </div>

      {/* Story paragraphs */}
      <motion.div
        {...fadeUp(0.1)}
        className="mt-12 sm:mt-16 space-y-4 sm:space-y-6 text-gray-600"
      >
        <p className="text-lg sm:text-2xl leading-relaxed">
          Apex Coaching Institute was established in 2008 with a vision to provide quality education and mentorship to students aspiring for top ranks in competitive examinations.
        </p>
        <p className="text-base sm:text-lg leading-relaxed">
          Over the years, we have helped thousands of students realize their dreams. Our unique teaching methodology combines conceptual clarity, rigorous practice, and personalized mentoring.
        </p>
      </motion.div>

      {/* Mission / Vision */}
      <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
        {[
          {
            label: "OUR MISSION",
            text: "To equip every student with the right skills, knowledge and confidence to succeed in their chosen career path."
          },
          {
            label: "OUR VISION",
            text: "To be recognized as the most trusted and result-oriented coaching institute in North India."
          }
        ].map(({ label, text }, i) => (
          <motion.div key={i} {...fadeUp(i * 0.1)} className="bg-gray-50 p-8 sm:p-12 rounded-3xl">
            <div className="font-medium text-sm tracking-widest">{label}</div>
            <div className="mt-5 sm:mt-8 text-xl sm:text-2xl lg:text-3xl leading-snug">{text}</div>
          </motion.div>
        ))}
      </div>

      {/* Values */}
      <motion.div {...fadeUp()} className="mt-16 sm:mt-24">
        <div className="text-xs font-medium tracking-widest">OUR VALUES</div>
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
          {[
            ["EXCELLENCE", "We strive for the highest standards in everything we do."],
            ["INTEGRITY", "Honesty, transparency, and ethical conduct are at our core."],
            ["INNOVATION", "We continuously evolve our teaching methods and curriculum."]
          ].map(([title, desc], index) => (
            <motion.div
              key={index}
              {...fadeUp(index * 0.08)}
              className="p-7 sm:p-10 border rounded-2xl hover:border-[#14b8a6] transition-colors"
            >
              <div className="font-semibold text-lg sm:text-2xl text-[#14b8a6]">{title}</div>
              <p className="mt-3 sm:mt-5 text-gray-600 text-sm sm:text-base leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Milestone timeline */}
      <motion.div {...fadeUp()} className="mt-16 sm:mt-24">
        <div className="text-xs font-medium tracking-widest mb-6 sm:mb-8">OUR JOURNEY</div>
        <div className="space-y-6 sm:space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-gray-200">
          {[
            ["2008", "Founded in Noida with a batch of 40 students"],
            ["2012", "Expanded to 3 branches across Delhi-NCR"],
            ["2016", "Launched digital learning platform with 1,000+ students"],
            ["2020", "Crossed 5,000 successful selections in competitive exams"],
            ["2024", "8,500+ students trained • 45 expert faculty • 98% selection rate"]
          ].map(([year, event], i) => (
            <div key={i} className="flex gap-5 sm:gap-8 items-start pl-8 sm:pl-10 relative">
              <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#14b8a6] flex-shrink-0" />
              <div className="text-[#14b8a6] font-semibold text-sm w-12 flex-shrink-0">{year}</div>
              <div className="text-gray-600 text-sm sm:text-base">{event}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
