import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md text-center"
        >
          <div className="mx-auto w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 sm:w-11 h-9 sm:h-11 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="mt-6 sm:mt-8 text-2xl sm:text-4xl font-medium">Thank you!</div>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">Our team will reach out to you within 24 hours.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-10 sm:mt-12 border px-8 py-3.5 sm:py-4 rounded-2xl text-sm hover:bg-black hover:text-white transition-colors"
          >
            BACK TO HOME
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-10 sm:pt-12 pb-20 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-5 gap-y-12 md:gap-x-16">

        {/* Form side */}
        <div className="md:col-span-3">
          <div className="max-w-lg">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-tighter"
            >
              Let's get you started
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-5 sm:mt-8 text-base sm:text-xl text-gray-600"
            >
              Fill out the form and one of our counsellors will get in touch with you shortly.
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="mt-10 sm:mt-16 space-y-7 sm:space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-6">
              <div>
                <label className="block text-xs mb-2 sm:mb-3 text-gray-400 tracking-wider">FULL NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-200 pb-3 sm:pb-4 text-lg sm:text-xl placeholder:text-gray-300 focus:outline-none focus:border-[#14b8a6] transition-colors bg-transparent"
                  placeholder="Anika Sharma"
                />
              </div>
              <div>
                <label className="block text-xs mb-2 sm:mb-3 text-gray-400 tracking-wider">PHONE NUMBER</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-200 pb-3 sm:pb-4 text-lg sm:text-xl placeholder:text-gray-300 focus:outline-none focus:border-[#14b8a6] transition-colors bg-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs mb-2 sm:mb-3 text-gray-400 tracking-wider">EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-200 pb-3 sm:pb-4 text-lg sm:text-xl placeholder:text-gray-300 focus:outline-none focus:border-[#14b8a6] transition-colors bg-transparent"
                placeholder="anika@protonmail.com"
              />
            </div>

            <div>
              <label className="block text-xs mb-2 sm:mb-3 text-gray-400 tracking-wider">INTERESTED IN</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full border-b border-gray-200 pb-3 sm:pb-4 text-lg sm:text-xl focus:outline-none focus:border-[#14b8a6] transition-colors bg-transparent"
              >
                <option value="">Select a program</option>
                <option value="IIT-JEE">IIT-JEE Advanced</option>
                <option value="NEET">NEET-UG</option>
                <option value="UPSC">UPSC Civil Services</option>
                <option value="Banking">Banking Exams</option>
              </select>
            </div>

            <div>
              <label className="block text-xs mb-2 sm:mb-3 text-gray-400 tracking-wider">MESSAGE (OPTIONAL)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full resize-none border-b border-gray-200 pb-3 sm:pb-4 text-base sm:text-lg placeholder:text-gray-300 focus:outline-none focus:border-[#14b8a6] transition-colors bg-transparent"
                placeholder="Tell us more about your goals..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 sm:mt-6 w-full py-4 sm:py-6 bg-[#0f172a] text-white rounded-2xl text-sm tracking-widest hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
            </button>
          </motion.form>
        </div>

        {/* Contact info side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2 md:pt-8"
        >
          <div className="md:sticky md:top-24 space-y-10 sm:space-y-12">
            <div>
              <div className="uppercase text-xs tracking-widest text-gray-400 mb-3 sm:mb-5">HEAD OFFICE</div>
              <div className="flex gap-3 sm:gap-4">
                <MapPin className="text-[#14b8a6] mt-1 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                <div>
                  <div className="text-lg sm:text-2xl">42 Knowledge Park<br />Sector 18, Noida</div>
                  <div className="mt-1.5 sm:mt-2 text-sm text-gray-500">Uttar Pradesh 201301, India</div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <Phone className="text-[#14b8a6] mt-1 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
              <div>
                <div className="font-medium text-base sm:text-lg">+91 98765 43210</div>
                <div className="text-xs mt-1 text-gray-400">MON–SAT 8am – 7pm</div>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <Mail className="text-[#14b8a6] mt-1 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
              <div>
                <div className="text-base sm:text-lg break-all">admissions@apexcoaching.in</div>
                <div className="text-xs mt-1 text-gray-400">General enquiries</div>
              </div>
            </div>

            <div className="mt-12 sm:mt-24 text-xs text-gray-400 border-t pt-5 sm:pt-6">
              We respect your privacy. Your information will only be used to respond to your query.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
