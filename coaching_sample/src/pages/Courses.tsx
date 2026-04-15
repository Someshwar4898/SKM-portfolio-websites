import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Award } from 'lucide-react';
import { courses } from '../lib/data';
import Modal from '../components/Modal';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: 'easeOut' },
});

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  const handleEnroll = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedCourse(null);
    setShowEnrollModal(true);
  };

  return (
    <div className="pt-8 pb-20 sm:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div {...fadeUp()} className="inline-block text-xs tracking-[3px] px-4 py-1.5 bg-[#14b8a6] text-white rounded-full">
            OUR PROGRAMS
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mt-5 sm:mt-6">
            Courses &amp; Programs
          </motion.h1>
          <motion.p {...fadeUp(0.15)} className="mt-3 sm:mt-4 max-w-lg mx-auto text-base sm:text-xl text-gray-600">
            Choose from our industry-leading entrance exam preparation programs
          </motion.p>
        </div>

        {/* Course Cards */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.45, ease: 'easeOut' }}
              onClick={() => setSelectedCourse(course)}
              className="group cursor-pointer bg-white rounded-3xl border overflow-hidden hover:shadow-2xl transition-all flex flex-col"
            >
              <div className="relative h-48 sm:h-[280px] lg:h-[310px]">
                <img
                  src={course.image}
                  alt={course.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />

                <div className="absolute top-6 sm:top-8 left-6 sm:left-8 right-8">
                  <div className="uppercase text-xs text-white/80 tracking-widest mb-1 sm:mb-2">{course.category}</div>
                  <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-none">{course.title}</h3>
                </div>

                <div className="absolute bottom-5 sm:bottom-8 left-6 sm:left-8 flex items-center gap-4 sm:gap-6 text-white text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {course.students}+ students
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-9 flex-1 flex flex-col">
                <p className="text-gray-600 flex-1 text-sm sm:text-base">{course.description}</p>

                <div className="pt-6 sm:pt-8 mt-auto border-t flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                  <div>
                    <div className="text-xs text-gray-400">STARTING AT</div>
                    <div className="text-3xl sm:text-4xl font-semibold text-[#14b8a6] tracking-tighter">{course.fees}</div>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleEnroll(); }}
                    className="px-7 sm:px-8 py-3 sm:py-3.5 rounded-2xl border border-[#14b8a6] text-[#14b8a6] text-sm font-medium hover:bg-[#14b8a6] hover:text-white transition-colors self-start sm:self-auto"
                  >
                    ENROLL
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 sm:mt-24 max-w-3xl mx-auto text-center"
        >
          <h3 className="font-medium text-[#14b8a6] tracking-[1px] text-sm">EVERY COURSE INCLUDES</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-14">
            {[
              ["Daily live classes", "Recorded lectures"],
              ["Comprehensive study material", "Test series"],
              ["Performance analytics", "Doubt resolution"]
            ].map((items, i) => (
              <div key={i} className="space-y-3 sm:space-y-4 text-left sm:text-left">
                {items.map((item, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm font-light">
                    <div className="text-[#14b8a6] flex-shrink-0">•</div>
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* COURSE DETAIL MODAL */}
      <Modal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        title={selectedCourse?.title}
      >
        {selectedCourse && (
          <div className="space-y-6">
            <img
              src={selectedCourse.image}
              alt=""
              loading="lazy"
              className="w-full h-48 sm:h-64 object-cover rounded-2xl"
            />

            <p className="text-base sm:text-lg leading-relaxed text-gray-700">{selectedCourse.description}</p>

            <div>
              <div className="font-medium mb-3 text-sm tracking-wide">KEY HIGHLIGHTS</div>
              <ul className="grid gap-2.5">
                {selectedCourse.highlights.map((highlight: string, index: number) => (
                  <li key={index} className="flex gap-3 text-gray-600 text-sm sm:text-base">
                    <Award className="mt-0.5 text-[#14b8a6] flex-shrink-0 w-5 h-5" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
              <div className="text-3xl sm:text-4xl font-semibold text-[#14b8a6]">{selectedCourse.fees}</div>
              <button
                onClick={() => handleEnroll()}
                className="w-full sm:w-auto px-10 sm:px-12 py-3.5 sm:py-4 bg-[#0f172a] text-white rounded-2xl font-medium hover:bg-black transition-colors"
              >
                PROCEED TO ENROLL
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ENROLL MODAL */}
      <Modal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        title="Enrollment Inquiry"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-lg mb-3 font-medium">Thank you for your interest!</p>
          <p className="mb-8 text-gray-600 text-sm sm:text-base">Our admissions team will contact you within 24 hours.</p>

          <button
            onClick={() => setShowEnrollModal(false)}
            className="w-full py-4 bg-[#14b8a6] text-white rounded-2xl text-base font-medium hover:bg-[#0f7665] transition-colors"
          >
            RETURN TO PROGRAMS
          </button>
        </div>
      </Modal>
    </div>
  );
}
