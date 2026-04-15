import { useState } from 'react';
import { motion } from 'framer-motion';
import { faculty } from '../lib/data';
import Modal from '../components/Modal';

export default function Faculty() {
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 pb-20 sm:pb-24">

      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[#14b8a6] font-medium text-xs tracking-[3px]"
        >
          OUR TEAM
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-balance"
        >
          Meet our mentors
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-4 sm:mt-5 text-base sm:text-xl text-gray-600"
        >
          Industry veterans and subject matter experts committed to your success
        </motion.p>
      </div>

      {/* Faculty Grid */}
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-12 sm:gap-y-16">
        {faculty.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            whileHover={{ scale: 1.015 }}
            onClick={() => setSelectedFaculty(member)}
            className="group flex flex-col sm:flex-row gap-5 sm:gap-8 cursor-pointer"
          >
            <div className="w-full sm:w-5/12 flex-shrink-0">
              <div className="aspect-[4/3] sm:aspect-[4/3.2] overflow-hidden rounded-2xl sm:rounded-3xl border shadow-sm">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            <div className="flex-1 pt-0 sm:pt-2">
              <div className="uppercase tracking-[1.5px] text-xs text-[#14b8a6] mb-1">SENIOR FACULTY</div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-none">{member.name}</div>
              <div className="text-[#14b8a6] mt-1 text-sm sm:text-base">{member.title}</div>

              <div className="mt-5 sm:mt-8 text-sm space-y-2.5 sm:space-y-4">
                <div><span className="text-gray-400">SUBJECT:</span> {member.subject}</div>
                <div><span className="text-gray-400">EXPERIENCE:</span> {member.experience}</div>
                <div><span className="text-gray-400">EDUCATION:</span> {member.qualification}</div>
              </div>

              <button className="mt-6 sm:mt-9 text-xs border px-6 sm:px-7 py-3 sm:py-3.5 rounded-full hover:bg-black hover:text-white transition-all">
                READ FULL PROFILE →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Faculty Detail Modal */}
      <Modal
        isOpen={!!selectedFaculty}
        onClose={() => setSelectedFaculty(null)}
        title={selectedFaculty?.name}
      >
        {selectedFaculty && (
          <div className="space-y-6">
            <img
              src={selectedFaculty.image}
              alt={selectedFaculty.name}
              loading="lazy"
              className="w-full h-52 sm:h-72 object-cover rounded-2xl"
            />

            <div>
              <div className="uppercase text-xs tracking-widest text-[#14b8a6]">{selectedFaculty.title}</div>
              <h3 className="text-2xl sm:text-3xl font-semibold mt-1">{selectedFaculty.subject}</h3>
            </div>

            <p className="leading-relaxed text-base sm:text-lg text-gray-700">{selectedFaculty.bio}</p>

            <div className="border-l-2 border-[#14b8a6] pl-5 text-sm space-y-1.5">
              <div><span className="text-gray-400">EXPERIENCE:</span> {selectedFaculty.experience}</div>
              <div><span className="text-gray-400">QUALIFICATION:</span> {selectedFaculty.qualification}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
