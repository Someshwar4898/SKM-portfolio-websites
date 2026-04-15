import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Users, Award, Clock,
  Phone, Mail, MapPin, Star, Menu, X, CheckCircle
} from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Dentist {
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

const services: Service[] = [
  { icon: <Users className="w-7 h-7 sm:w-8 sm:h-8" />, title: "Preventive Care", description: "Regular cleanings, exams, and fluoride treatments to keep your smile healthy." },
  { icon: <Award className="w-7 h-7 sm:w-8 sm:h-8" />, title: "Cosmetic Dentistry", description: "Teeth whitening, veneers, and bonding to enhance your natural smile." },
  { icon: <Clock className="w-7 h-7 sm:w-8 sm:h-8" />, title: "Orthodontics", description: "Braces and Invisalign to straighten teeth and correct bite issues." },
  { icon: <Award className="w-7 h-7 sm:w-8 sm:h-8" />, title: "Dental Implants", description: "Permanent tooth replacement solutions that look and feel natural." },
  { icon: <Users className="w-7 h-7 sm:w-8 sm:h-8" />, title: "Root Canal Therapy", description: "Pain-free treatment to save infected or damaged teeth." },
  { icon: <Award className="w-7 h-7 sm:w-8 sm:h-8" />, title: "Pediatric Dentistry", description: "Gentle, specialized care for children in a friendly environment." },
];

const dentists: Dentist[] = [
  { name: "Dr. Elena Rodriguez", role: "Lead Dentist", image: "/images/dentist1.jpg", bio: "With over 15 years of experience, Dr. Rodriguez specializes in cosmetic and restorative dentistry.", specialties: ["Cosmetics", "Implants"] },
  { name: "Dr. Marcus Chen", role: "Orthodontist", image: "/images/dentist2.jpg", bio: "Dr. Chen is passionate about creating beautiful smiles through modern orthodontic techniques.", specialties: ["Braces", "Invisalign"] },
  { name: "Dr. Sophia Patel", role: "Pediatric Specialist", image: "/images/patient-smile.jpg", bio: "Dr. Patel creates a warm, welcoming environment for our youngest patients.", specialties: ["Kids", "Preventive"] },
];

const testimonials: Testimonial[] = [
  { name: "Sarah Thompson", role: "Business Owner", text: "The team at Lumina transformed my smile completely. The entire process was comfortable and professional. I can't recommend them enough!", rating: 5, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
  { name: "David Kim", role: "Teacher", text: "Invisalign treatment was life-changing. The staff made every visit enjoyable. My new smile gives me so much confidence.", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { name: "Maria Gonzalez", role: "Nurse", text: "From the moment I walked in, I felt cared for. The advanced technology and caring staff made my implant procedure smooth.", rating: 5, image: "https://images.unsplash.com/photo-1580489944761-09be1ec59862?w=150&h=150&fit=crop&crop=face" },
];

const navLinks = [
  { href: 'services', label: 'Services' },
  { href: 'about', label: 'About' },
  { href: 'team', label: 'Our Team' },
  { href: 'testimonials', label: 'Reviews' },
  { href: 'contact', label: 'Contact' },
];

const emptyForm = { name: '', email: '', phone: '', date: '', service: '', message: '' };

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState(emptyForm);
  const [scrolled, setScrolled] = useState(false);

  // Navbar shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = (isModalOpen || isMenuOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen, isMenuOpen]);

  // Escape key closes overlays
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (isModalOpen) closeModal();
      else if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isModalOpen, isMenuOpen]);

  // Testimonial auto-advance (fixed stale-closure bug)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }, isMenuOpen ? 280 : 0);
  };

  const openBookingModal = () => {
    setIsModalOpen(true);
    setIsSubmitted(false);
    setIsLoading(false);
    setFormData(emptyForm);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => { setIsSubmitted(false); setIsLoading(false); }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 } as any,
    viewport: { once: true },
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  });

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">

      {/* ── NAVBAR ────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow duration-200 ${scrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-sky-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl sm:text-2xl font-bold leading-none">L</span>
            </div>
            <div>
              <div className="font-semibold text-lg sm:text-2xl tracking-tight text-slate-900 leading-none">Lumina Dental</div>
              <div className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5">EST 2008</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7 lg:gap-10">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors text-sm lg:text-base"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openBookingModal}
              className="hidden md:flex items-center gap-2 px-5 lg:px-6 py-2 lg:py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-full font-medium text-xs lg:text-sm transition-all active:scale-[0.985]"
            >
              <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              BOOK APPOINTMENT
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(o => !o)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMenuOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 top-16 bg-black/30 z-40 md:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl z-50 md:hidden"
              >
                <div className="px-4 py-5 flex flex-col gap-1">
                  {navLinks.map(link => (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left py-3 px-3 rounded-xl text-base font-medium text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                  <button
                    onClick={() => { setIsMenuOpen(false); openBookingModal(); }}
                    className="mt-3 flex items-center justify-center gap-2 py-3.5 bg-sky-600 text-white rounded-2xl font-medium hover:bg-sky-700 transition-colors"
                  >
                    <Calendar className="w-4 h-4" /> SCHEDULE CONSULTATION
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_0.8px,transparent_1px)] bg-[length:4px_4px]" />
        <img src="/images/hero-bg.jpg" alt="Modern dental clinic" loading="eager" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50" />

        <div className="relative z-10 max-w-5xl px-4 sm:px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs sm:text-sm mb-5 sm:mb-6 backdrop-blur">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              OPEN TODAY UNTIL 7PM
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[90px] font-semibold tracking-tighter leading-none mb-5 sm:mb-6">
              YOUR SMILE.<br />OUR PASSION.
            </h1>

            <p className="max-w-sm sm:max-w-md mx-auto text-base sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10">
              State-of-the-art dental care in a warm, welcoming environment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <button
              onClick={openBookingModal}
              className="group px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-slate-900 rounded-2xl font-semibold flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg hover:shadow-2xl transition-all"
            >
              Book Your Visit
              <Calendar className="group-hover:rotate-12 transition-transform w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="px-8 sm:px-10 py-3.5 sm:py-4 border border-white/70 hover:bg-white/10 text-white rounded-2xl font-medium text-base sm:text-lg transition-all"
            >
              Learn More
            </button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-white/70 text-xs tracking-[3px]"
        >
          SCROLL TO EXPLORE
          <div className="w-px h-7 sm:h-8 bg-white/40 mt-1" />
        </motion.div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────── */}
      <div className="bg-slate-950 py-4 sm:py-5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-12 gap-y-3 sm:gap-y-4 opacity-75">
          {['AAID CERTIFIED', 'INVISALIGN PROVIDER', 'ADA MEMBER', '5-STAR RATED'].map(label => (
            <div key={label} className="text-white/80 text-xs sm:text-sm font-medium tracking-widest">{label}</div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section id="services" className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <motion.div {...fadeUp()} className="inline-block px-4 py-1 bg-sky-100 text-sky-700 text-xs tracking-[2px] font-medium rounded mb-3 sm:mb-4">
              WHAT WE OFFER
            </motion.div>
            <motion.h2 {...fadeUp(0.08)} className="text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tighter text-slate-900">
              Exceptional Dental Services
            </motion.h2>
            <motion.p {...fadeUp(0.14)} className="mt-3 sm:mt-4 text-base sm:text-xl text-slate-600 max-w-md mx-auto">
              Comprehensive care for every stage of life.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="group bg-white border border-slate-100 hover:border-sky-200 p-7 sm:p-10 rounded-3xl transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 mb-6 sm:mb-8 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-3 sm:mb-4 text-slate-900">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{service.description}</p>
                <div className="mt-5 sm:mt-8 text-sky-600 flex items-center gap-2 text-xs sm:text-sm font-medium">
                  LEARN MORE
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section id="about" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
          <motion.div {...fadeUp()}>
            <img
              src="/images/patient-smile.jpg"
              alt="Happy patient at Lumina Dental"
              loading="lazy"
              className="rounded-3xl shadow-2xl w-full"
            />
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="space-y-6 sm:space-y-8">
            <div>
              <div className="text-sky-600 font-medium mb-2 sm:mb-3 text-sm sm:text-base">OUR STORY</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight leading-tight text-slate-900">
                Caring for smiles in the heart of the city since 2008
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-600 max-w-md leading-relaxed">
              At Lumina Dental Clinic, we believe every smile tells a story. Our team of highly skilled professionals is dedicated to providing the highest standard of personalized dental care using the latest technology in a comfortable environment.
            </p>

            <div className="flex gap-6 sm:gap-8 pt-2 sm:pt-4">
              {[['16', 'Years'], ['12k', 'Smiles'], ['4.9', 'Avg Rating']].map(([num, label]) => (
                <div key={label}>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900">{num}</div>
                  <div className="text-xs sm:text-sm uppercase tracking-widest text-slate-500 mt-1">{label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollToSection('team')}
              className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[1.5px] border-b border-slate-900 pb-1 font-medium hover:border-sky-600 hover:text-sky-600 transition-colors"
            >
              MEET OUR TEAM →
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────── */}
      <section id="team" className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10 sm:mb-16">
            <div>
              <motion.div {...fadeUp()} className="uppercase text-xs tracking-[3px] text-sky-600 font-medium mb-2">EXPERTS YOU CAN TRUST</motion.div>
              <motion.h2 {...fadeUp(0.08)} className="text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tight">
                Meet Our Dentists
              </motion.h2>
            </div>
            <motion.p {...fadeUp(0.1)} className="max-w-xs text-slate-600 text-sm sm:text-base">
              Passionate professionals who love helping patients achieve beautiful, healthy smiles.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {dentists.map((dentist, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * index, duration: 0.45 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 aspect-[4/3.1]">
                  <img
                    src={dentist.image}
                    alt={dentist.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 right-5 sm:right-8 text-white">
                    <div className="font-semibold text-xl sm:text-2xl lg:text-3xl tracking-tight">{dentist.name}</div>
                    <div className="opacity-80 text-xs sm:text-sm mt-0.5">{dentist.role}</div>
                  </div>
                </div>

                <div className="px-1">
                  <p className="text-slate-600 mb-4 sm:mb-6 text-sm leading-relaxed">{dentist.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {dentist.specialties.map((spec, i) => (
                      <span key={i} className="px-3 sm:px-4 py-1 text-xs rounded-full bg-slate-100 text-slate-700">{spec}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section id="testimonials" className="py-16 sm:py-24 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp()} className="uppercase tracking-[2px] text-xs text-white/40 mb-3 sm:mb-4">
            DON'T JUST TAKE OUR WORD FOR IT
          </motion.div>
          <motion.h2 {...fadeUp(0.08)} className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tighter mb-10 sm:mb-16">
            What Our Patients Say
          </motion.h2>

          {/* Testimonial slider */}
          <div className="relative min-h-[280px] sm:min-h-[340px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, idx) =>
                idx === currentTestimonial ? (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex flex-col justify-center max-w-3xl mx-auto px-2"
                  >
                    <div className="flex justify-center mb-6 sm:mb-10">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 sm:w-7 sm:h-7 text-amber-400 fill-amber-400" />
                      ))}
                    </div>

                    <blockquote className="text-xl sm:text-3xl md:text-[38px] font-light tracking-tight leading-snug mb-8 sm:mb-12">
                      "{testimonial.text}"
                    </blockquote>

                    <div className="flex items-center justify-center gap-3 sm:gap-5">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        loading="lazy"
                        className="w-11 h-11 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-white/30 flex-shrink-0"
                      />
                      <div className="text-left">
                        <div className="font-medium text-sm sm:text-base">{testimonial.name}</div>
                        <div className="text-xs sm:text-sm text-white/50">{testimonial.role}</div>
                      </div>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 sm:gap-3 mt-8 sm:mt-10">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`rounded-full transition-all ${currentTestimonial === idx ? 'bg-white w-5 h-2.5' : 'bg-white/30 w-2.5 h-2.5'}`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────── */}
      <section id="contact" className="pt-16 sm:pt-24 pb-12 sm:pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-5 gap-8 sm:gap-12">
          <motion.div {...fadeUp()} className="md:col-span-3">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tighter text-slate-900 mb-4 sm:mb-6">
              Visit Us
            </h2>

            <div className="flex flex-wrap gap-2 sm:gap-3 text-xs uppercase tracking-[1.5px] text-slate-400 mb-6 sm:mb-8">
              <div>123 LUMINA PLAZA</div>
              <div>·</div>
              <div>SAN FRANCISCO, CA</div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start gap-4 sm:gap-6">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-base sm:text-lg">123 Lumina Plaza</div>
                  <div className="text-slate-600 text-sm sm:text-base">San Francisco, CA 94107</div>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-base sm:text-lg">(415) 555-0189</div>
                  <a href="tel:+14155550189" className="text-sky-600 text-sm hover:underline">Call now</a>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-base sm:text-lg break-all">hello@lumina.dental</div>
                  <a href="mailto:hello@lumina.dental" className="text-sky-600 text-sm hover:underline">Send email</a>
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-16 pt-8 sm:pt-10 border-t text-xs uppercase tracking-widest text-slate-400 leading-relaxed">
              MONDAY — FRIDAY: 8AM — 7PM<br />
              SATURDAY: 9AM — 3PM<br />
              SUNDAY: CLOSED
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="md:col-span-2 rounded-3xl overflow-hidden h-64 sm:h-[380px] md:h-[460px] bg-slate-200 relative">
            <img
              src="https://picsum.photos/id/1015/800/800"
              alt="Clinic location"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 flex items-end p-6 sm:p-8">
              <div className="text-white">
                <div className="uppercase text-xs tracking-[2px]">FIND US</div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-medium mt-1">Downtown SF</div>
              </div>
            </div>
            <div className="absolute top-5 sm:top-8 right-5 sm:right-8 bg-white rounded-2xl shadow p-3 sm:p-4 text-xs leading-none">
              <div className="font-mono text-sky-600">37.7849° N</div>
              <div className="font-mono text-sky-600 mt-1">122.4090° W</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="bg-slate-950 text-white/80 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-y-16">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-slate-950 text-xl sm:text-2xl font-bold leading-none">L</span>
              </div>
              <div className="font-semibold text-xl sm:text-2xl lg:text-3xl">Lumina Dental</div>
            </div>
            <div className="text-xs sm:text-sm max-w-[190px]">Creating confident smiles in the Bay Area.</div>
          </div>

          <div>
            <div className="font-medium mb-4 sm:mb-5 text-white text-xs sm:text-sm">SERVICES</div>
            <div className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
              {services.slice(0, 4).map((s, i) => (
                <div key={i} className="text-white/70">{s.title}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-medium mb-4 sm:mb-5 text-white text-xs sm:text-sm">QUICK LINKS</div>
            <div className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
              {navLinks.map(link => (
                <button key={link.href} onClick={() => scrollToSection(link.href)} className="block hover:text-white transition-colors">
                  {link.label}
                </button>
              ))}
              <button onClick={openBookingModal} className="block hover:text-white transition-colors">
                Book Appointment
              </button>
            </div>
          </div>

          <div>
            <div className="font-medium mb-4 sm:mb-5 text-white text-xs sm:text-sm">GET IN TOUCH</div>
            <div className="text-xs sm:text-[13px] space-y-1.5 text-white/70">
              <div>(415) 555-0189</div>
              <div>hello@lumina.dental</div>
              <div>123 Lumina Plaza</div>
              <div>San Francisco, CA</div>
            </div>
            <button
              onClick={openBookingModal}
              className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-black rounded-full text-xs sm:text-sm font-medium hover:bg-white/90 transition-colors"
            >
              REQUEST APPOINTMENT
            </button>
          </div>
        </div>

        <div className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-white/10 text-center text-[10px] sm:text-xs text-white/40 tracking-widest">
          © {new Date().getFullYear()} LUMINA DENTAL CLINIC. ALL RIGHTS RESERVED.
        </div>
      </footer>

      {/* ── BOOKING MODAL ─────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 sm:p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.97 }}
              transition={{ type: 'spring', bounce: 0.02, duration: 0.4 }}
              className="bg-white w-full sm:max-w-[440px] sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl max-h-[94dvh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Drag handle */}
              <div className="sm:hidden flex justify-center pt-3 flex-shrink-0">
                <div className="w-10 h-1 rounded-full bg-slate-200" />
              </div>

              <div className="p-7 sm:p-10 overflow-y-auto flex-1">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-8 sm:py-12 text-center"
                    >
                      <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                        <CheckCircle className="w-9 h-9 text-emerald-600" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-medium text-slate-900">Appointment Requested!</div>
                      <div className="mt-3 text-slate-600 text-sm sm:text-base">We'll contact you within 24 hours to confirm.</div>
                      <button
                        onClick={closeModal}
                        className="mt-8 px-8 py-3 border border-slate-200 rounded-2xl text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        CLOSE
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <button onClick={closeModal} className="absolute top-6 sm:top-8 right-6 sm:right-8 text-slate-400 hover:text-slate-800 p-1 rounded-lg hover:bg-slate-100 transition-colors">
                        <X size={20} />
                      </button>

                      <div className="text-center mb-6 sm:mb-9">
                        <div className="mx-auto w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-sky-100 flex items-center justify-center mb-4 sm:mb-6">
                          <Calendar className="text-sky-600 w-7 h-7 sm:w-9 sm:h-9" />
                        </div>
                        <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">Book an Appointment</div>
                        <div className="text-slate-600 mt-2 text-xs sm:text-sm">We will reach out shortly after you submit</div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1.5 sm:mb-2">FULL NAME</label>
                          <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-sky-400 rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 outline-none text-sm transition-colors" placeholder="Alex Rivera" />
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-5">
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1.5 sm:mb-2">EMAIL</label>
                            <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-sky-400 rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 outline-none text-sm transition-colors" placeholder="you@email.com" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1.5 sm:mb-2">PHONE</label>
                            <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-sky-400 rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 outline-none text-sm transition-colors" placeholder="(415) 555-0123" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-5">
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1.5 sm:mb-2">PREFERRED DATE</label>
                            <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-sky-400 rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 outline-none text-sm transition-colors" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1.5 sm:mb-2">SERVICE</label>
                            <select name="service" required value={formData.service} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-sky-400 rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 outline-none text-sm bg-white transition-colors">
                              <option value="">Select</option>
                              {services.map((s, i) => <option key={i} value={s.title}>{s.title}</option>)}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1.5 sm:mb-2">ADDITIONAL NOTES</label>
                          <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3} className="w-full border border-slate-200 focus:border-sky-400 rounded-2xl sm:rounded-3xl px-4 sm:px-5 py-3 sm:py-4 outline-none text-sm resize-none transition-colors" placeholder="I would like to discuss teeth whitening..." />
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="mt-2 sm:mt-4 w-full py-3.5 sm:py-4 bg-sky-600 hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed active:bg-black transition-all text-white rounded-2xl font-medium text-sm sm:text-base tracking-wide flex items-center justify-center gap-3"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              CONFIRMING...
                            </>
                          ) : 'CONFIRM REQUEST'}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
