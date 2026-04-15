import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dumbbell, Users, Award, Clock,
  Menu, X, Calendar, Trophy, Heart, CheckCircle
} from 'lucide-react';

interface ClassType {
  id: number;
  name: string;
  description: string;
  duration: string;
  level: string;
  image: string;
  icon: React.ReactNode;
}

interface Trainer {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
}

const classes: ClassType[] = [
  { id: 1, name: "HIIT BLAST", description: "High-intensity interval training to torch calories and build endurance.", duration: "45 min", level: "Intermediate", image: "./images/hiit.jpg", icon: <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { id: 2, name: "POWER YOGA", description: "Strength-building flows that improve flexibility and mental focus.", duration: "60 min", level: "All Levels", image: "./images/yoga.jpg", icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { id: 3, name: "STRENGTH LAB", description: "Heavy lifting focused on compound movements and progressive overload.", duration: "60 min", level: "Advanced", image: "./images/weightlifting.jpg", icon: <Trophy className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { id: 4, name: "CARDIO BURN", description: "High-energy cardio sessions designed to maximize fat burn.", duration: "50 min", level: "Beginner", image: "./images/cardio.jpg", icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" /> },
];

const trainers: Trainer[] = [
  { id: 1, name: "Marcus Rivera", role: "Head Strength Coach", bio: "Former powerlifter with 12 years transforming athletes and everyday warriors.", image: "./images/trainer1.jpg", specialties: ["Powerlifting", "Olympic Lifting", "Nutrition"] },
  { id: 2, name: "Elena Vargas", role: "Yoga & Mobility Specialist", bio: "Certified yoga instructor and movement therapist helping members find balance.", image: "./images/trainer2.jpg", specialties: ["Yoga", "Mobility", "Recovery"] },
  { id: 3, name: "Jamal Thompson", role: "HIIT & Conditioning Coach", bio: "Ex-Marine turned fitness coach specializing in metabolic conditioning.", image: "./images/trainer.jpg", specialties: ["HIIT", "Bootcamp", "Endurance"] },
];

const testimonials: Testimonial[] = [
  { id: 1, name: "Sarah Chen", role: "Member since 2022", quote: "Apex completely transformed my approach to fitness. The community and coaches are incredible.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", rating: 5 },
  { id: 2, name: "David Park", role: "Member since 2023", quote: "Lost 35lbs and gained confidence I never knew I had. Best decision I've ever made.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", rating: 5 },
  { id: 3, name: "Priya Patel", role: "Member since 2021", quote: "The trainers push you but in the best way possible. I've never felt stronger.", image: "https://images.unsplash.com/photo-1580489944761-09be1ec59862?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", rating: 5 },
];

const navLinks = [
  { label: 'CLASSES', section: 'classes' },
  { label: 'TRAINERS', section: 'trainers' },
  { label: 'PRICING', section: 'pricing' },
  { label: 'TESTIMONIALS', section: 'testimonials' },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const plans = [
    {
      name: "STARTER",
      price: selectedPlan === 'monthly' ? 49 : 470,
      period: selectedPlan === 'monthly' ? '/mo' : '/yr',
      features: ["Access to all equipment", "Group classes (3x/week)", "Basic app tracking", "Locker access"],
      popular: false,
    },
    {
      name: "ELITE",
      price: selectedPlan === 'monthly' ? 89 : 850,
      period: selectedPlan === 'monthly' ? '/mo' : '/yr',
      features: ["Unlimited classes", "Personal training (2/mo)", "Premium equipment access", "Nutrition coaching", "Recovery lounge"],
      popular: true,
    },
    {
      name: "PRO",
      price: selectedPlan === 'monthly' ? 129 : 1230,
      period: selectedPlan === 'monthly' ? '/mo' : '/yr',
      features: ["Unlimited everything", "Personal training (8/mo)", "Private locker + shower", "Meal prep guidance", "Priority booking"],
      popular: false,
    },
  ];

  // Navbar scroll shadow
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

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }, isMenuOpen ? 280 : 0);
  };

  const openModal = (cls?: ClassType) => {
    setSelectedClass(cls ?? null);
    setModalSubmitted(false);
    setForm({ name: '', email: '', phone: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => { setModalSubmitted(false); setSelectedClass(null); }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalSubmitted(true);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 } as any,
    viewport: { once: true },
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">

      {/* ── NAVBAR ────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-lg border-b border-white/10 transition-shadow duration-200 ${scrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.6)]' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex-shrink-0">
              <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-950" />
            </div>
            <div>
              <div className="font-bold text-xl sm:text-2xl tracking-tighter leading-none">APEX</div>
              <div className="text-[9px] sm:text-[10px] text-zinc-400 mt-0.5">FITNESS</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 text-sm uppercase tracking-widest">
            {navLinks.map(link => (
              <button key={link.section} onClick={() => scrollToSection(link.section)} className="text-white/70 hover:text-white transition-colors">
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal()}
              className="hidden md:block px-6 lg:px-8 py-2.5 lg:py-3 bg-white text-black font-semibold rounded-full text-xs lg:text-sm tracking-widest hover:bg-white/90 transition-all"
            >
              JOIN NOW
            </motion.button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(o => !o)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
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
                  {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
                className="fixed inset-0 top-16 bg-black/60 z-40 md:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 bg-zinc-950 border-t border-white/10 shadow-2xl z-50 md:hidden"
              >
                <div className="px-4 py-5 flex flex-col gap-1">
                  {navLinks.map(link => (
                    <button
                      key={link.section}
                      onClick={() => scrollToSection(link.section)}
                      className="text-left py-3 px-3 rounded-xl text-sm tracking-widest uppercase text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                  <button
                    onClick={() => { setIsMenuOpen(false); openModal(); }}
                    className="mt-3 py-4 bg-white text-black font-semibold rounded-2xl text-sm tracking-widest hover:bg-white/90 transition-colors"
                  >
                    JOIN NOW
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 bg-black overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url('./images/hero-gym.jpg')` }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 bg-white/10 backdrop-blur rounded-full text-xs sm:text-sm mb-5 sm:mb-6 tracking-[3px]">
              EST. 2018 • DOWNTOWN
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-[88px] lg:text-[96px] font-bold tracking-tighter leading-none mb-5 sm:mb-6">
              FORGE YOUR<br />LEGACY
            </h1>

            <p className="max-w-sm sm:max-w-md mx-auto text-base sm:text-xl text-white/70 mb-10 sm:mb-12">
              Premium fitness facility. World-class coaching.<br className="hidden sm:block" />
              A community that pushes you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('classes')}
                className="px-8 sm:px-12 py-3.5 sm:py-4 border border-white/80 text-base sm:text-lg font-medium rounded-full hover:bg-white hover:text-black transition-all"
              >
                EXPLORE CLASSES
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openModal()}
                className="px-8 sm:px-12 py-3.5 sm:py-4 bg-white text-black text-base sm:text-lg font-medium rounded-full flex items-center justify-center gap-2 sm:gap-3 hover:bg-white/90 transition-all"
              >
                START YOUR JOURNEY
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center"
        >
          <div className="text-xs tracking-[4px] mb-3 text-white/60">SCROLL TO BEGIN</div>
          <div className="w-px h-12 sm:h-14 bg-gradient-to-b from-transparent via-white/60 to-transparent" />
        </motion.div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <div className="bg-zinc-900 py-8 sm:py-10 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {[
            { number: "12k", label: "ACTIVE MEMBERS" },
            { number: "87", label: "WEEKLY CLASSES" },
            { number: "34", label: "CERTIFIED COACHES" },
            { number: "9", label: "AWARDS WON" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="flex flex-col items-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter text-white mb-1">{stat.number}</div>
              <div className="text-xs sm:text-sm text-white/50 tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CLASSES ───────────────────────────────────────────── */}
      <section id="classes" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <motion.div {...fadeUp()} className="uppercase tracking-[4px] text-xs sm:text-sm mb-3 sm:mb-4 text-white/60">DISCOVER</motion.div>
          <motion.h2 {...fadeUp(0.08)} className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">Signature Classes</motion.h2>
          <motion.p {...fadeUp(0.14)} className="max-w-md mt-3 sm:mt-4 text-sm sm:text-base text-white/60">Four pillars of fitness. Choose your path to greatness.</motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {classes.map((cls, index) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              whileHover={{ y: -8 }}
              onClick={() => openModal(cls)}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer bg-zinc-900 h-64 sm:aspect-[16/10] sm:h-auto"
            >
              <img
                src={cls.image}
                alt={cls.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 sm:p-10">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-white/10 backdrop-blur rounded-xl sm:rounded-2xl text-white group-hover:bg-white group-hover:text-black transition-all">
                    {cls.icon}
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs tracking-[2px] text-white/50">CLASS</div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tighter">{cls.name}</div>
                  </div>
                </div>

                <p className="max-w-[260px] sm:max-w-[280px] text-white/70 mb-4 sm:mb-8 text-xs sm:text-sm line-clamp-2">{cls.description}</p>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-3 sm:gap-6">
                    <div>{cls.duration}</div>
                    <div className="px-3 sm:px-4 py-1 rounded-full border border-white/30 text-[10px] sm:text-xs">{cls.level}</div>
                  </div>
                  <div className="text-white/50 group-hover:text-white transition-colors hidden sm:block">→ JOIN CLASS</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHY APEX ──────────────────────────────────────────── */}
      <section className="bg-zinc-900 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-12 gap-10 sm:gap-8 items-start md:items-center">
            <motion.div {...fadeUp()} className="md:col-span-5 md:sticky md:top-24">
              <div className="uppercase text-xs sm:text-sm tracking-widest text-white/50 mb-4 sm:mb-6">THE APEX DIFFERENCE</div>
              <h3 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tighter leading-none">
                Fitness that actually feels good
              </h3>
              <p className="mt-5 sm:mt-8 text-base sm:text-xl text-white/70 max-w-sm">
                We don't just have equipment. We have an entire system designed to get you results.
              </p>
            </motion.div>

            <div className="md:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { icon: <Dumbbell className="w-7 h-7 sm:w-9 sm:h-9" />, title: "Premium Equipment", desc: "Technogym, Rogue, Life Fitness. Only the best." },
                  { icon: <Users className="w-7 h-7 sm:w-9 sm:h-9" />, title: "World-Class Coaching", desc: "Coaches who genuinely care about your progress." },
                  { icon: <Award className="w-7 h-7 sm:w-9 sm:h-9" />, title: "Performance Tracking", desc: "In-depth metrics and progress dashboards." },
                  { icon: <Clock className="w-7 h-7 sm:w-9 sm:h-9" />, title: "24/7 Access", desc: "Train when you want. We never close." },
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                    className="bg-zinc-950 p-7 sm:p-9 rounded-2xl sm:rounded-3xl flex flex-col"
                  >
                    <div className="text-white/70 mb-5 sm:mb-8">{benefit.icon}</div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-2 sm:mb-4">{benefit.title}</div>
                    <p className="text-white/60 leading-relaxed text-sm sm:text-base">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRAINERS ──────────────────────────────────────────── */}
      <section id="trainers" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div {...fadeUp()} className="text-xs sm:text-sm tracking-[4px] text-white/60 mb-3 sm:mb-4">MEET THE TEAM</motion.div>
          <motion.h2 {...fadeUp(0.08)} className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">
            The best in the business
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              className="group"
            >
              <div className="overflow-hidden rounded-2xl sm:rounded-3xl mb-5 sm:mb-8 aspect-square relative">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black to-transparent" />
              </div>

              <div className="px-1">
                <div className="font-semibold text-2xl sm:text-3xl tracking-tight mb-1">{trainer.name}</div>
                <div className="text-white/60 text-sm sm:text-base mb-4 sm:mb-5">{trainer.role}</div>
                <p className="text-white/70 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base line-clamp-3">{trainer.bio}</p>

                <div>
                  <div className="text-xs tracking-widest text-white/40 mb-2 sm:mb-3">SPECIALTIES</div>
                  <div className="flex flex-wrap gap-2">
                    {trainer.specialties.map((spec, i) => (
                      <div key={i} className="px-4 sm:px-5 py-1 text-xs border border-white/20 rounded-full">{spec}</div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section id="testimonials" className="bg-zinc-900 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <motion.div {...fadeUp()} className="uppercase tracking-[3px] text-xs mb-3">DON'T JUST TAKE OUR WORD FOR IT</motion.div>
            <motion.h2 {...fadeUp(0.08)} className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">
              Real results. Real stories.
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.45 }}
                className="bg-zinc-950 p-7 sm:p-10 rounded-2xl sm:rounded-3xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-0.5 sm:gap-1 mb-5 sm:mb-8">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm sm:text-base">★</span>
                    ))}
                  </div>
                  <blockquote className="text-lg sm:text-xl lg:text-2xl tracking-tight leading-tight mb-8 sm:mb-12">
                    "{testimonial.quote}"
                  </blockquote>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    loading="lazy"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <div className="text-sm sm:text-base">{testimonial.name}</div>
                    <div className="text-white/60 text-xs sm:text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────── */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div {...fadeUp()} className="text-xs tracking-widest text-white/50 mb-3 sm:mb-4">MEMBERSHIPS</motion.div>
          <motion.h2 {...fadeUp(0.08)} className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">
            Choose your level
          </motion.h2>
          <motion.p {...fadeUp(0.14)} className="mt-3 sm:mt-4 max-w-xs mx-auto text-sm sm:text-base text-white/60">
            Everything you need to reach your goals. Cancel anytime.
          </motion.p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="inline-flex rounded-full p-1 bg-zinc-900 border border-white/10">
            {(['monthly', 'yearly'] as const).map(plan => (
              <button
                key={plan}
                onClick={() => setSelectedPlan(plan)}
                className={`px-6 sm:px-8 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all ${selectedPlan === plan ? 'bg-white text-black' : 'hover:bg-white/10'}`}
              >
                {plan === 'monthly' ? 'MONTHLY' : <>YEARLY <span className="text-[9px] sm:text-[10px] align-super ml-0.5">SAVE 20%</span></>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className={`rounded-2xl sm:rounded-3xl p-8 sm:p-10 flex flex-col border relative ${plan.popular ? 'border-white sm:scale-[1.02]' : 'border-white/10'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] sm:text-xs py-1 px-5 sm:px-6 rounded-full font-medium tracking-widest whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8 sm:mb-12">
                <div className="font-medium tracking-[2px] text-xs sm:text-sm mb-3 sm:mb-4">{plan.name}</div>
                <div className="flex items-baseline">
                  <span className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter">${plan.price}</span>
                  <span className="text-lg sm:text-xl text-white/40 ml-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 sm:space-y-6 mb-auto text-white/80">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 sm:gap-4 text-sm sm:text-[15px]">
                    <div className="mt-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => openModal()}
                className="mt-8 sm:mt-12 w-full py-3.5 sm:py-4 border border-white rounded-2xl text-xs sm:text-sm tracking-widest hover:bg-white hover:text-zinc-950 transition-all"
              >
                SELECT PLAN
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6">
          <motion.div {...fadeUp()} className="mx-auto mb-5 sm:mb-6 inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-white/20">
            <Dumbbell className="w-7 h-7 sm:w-9 sm:h-9" />
          </motion.div>

          <motion.h2 {...fadeUp(0.08)} className="text-3xl sm:text-5xl lg:text-6xl tracking-tight font-bold mb-6 sm:mb-8">
            Ready to become unstoppable?
          </motion.h2>
          <motion.p {...fadeUp(0.14)} className="text-base sm:text-xl text-white/60 max-w-xs mx-auto mb-10 sm:mb-12">
            First week free for new members. No commitment. Just results.
          </motion.p>

          <motion.button
            {...fadeUp(0.18)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal()}
            className="px-10 sm:px-16 py-4 sm:py-6 bg-white text-black rounded-full text-base sm:text-xl font-medium tracking-widest hover:bg-white/90 transition-colors"
          >
            CLAIM YOUR FREE WEEK
          </motion.button>

          <motion.div {...fadeUp(0.22)} className="text-xs text-white/40 tracking-widest mt-12 sm:mt-16">
            14 DAY MONEY BACK GUARANTEE
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="bg-zinc-950 border-t border-white/10 pt-14 sm:pt-20 pb-10 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 sm:gap-y-14">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8">
              <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex-shrink-0">
                <Dumbbell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
              </div>
              <div className="font-bold text-3xl sm:text-4xl tracking-[-2px]">APEX</div>
            </div>
            <p className="max-w-xs text-white/60 text-sm sm:text-base">
              1847 Industrial Way<br />San Francisco, CA 94107
            </p>
            <div className="mt-6 sm:mt-8 text-xs text-white/50">© {new Date().getFullYear()} Apex Fitness. All rights reserved.</div>
          </div>

          <div className="md:col-span-3 text-sm">
            <div className="font-medium mb-4 sm:mb-5 tracking-widest text-xs text-white/40">EXPLORE</div>
            <div className="space-y-2.5 sm:space-y-3 text-white/70">
              {navLinks.map(link => (
                <button key={link.section} onClick={() => scrollToSection(link.section)} className="block hover:text-white transition-colors">
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="font-medium mb-4 sm:mb-5 tracking-widest text-xs text-white/40">CONTACT</div>
            <a href="mailto:hello@apexfit.co" className="block mb-2 text-xl sm:text-2xl hover:underline">hello@apexfit.co</a>
            <div className="text-white/60 text-sm sm:text-base">(415) 555-0189</div>

            <div className="flex gap-5 sm:gap-6 mt-10 sm:mt-16 text-xs uppercase tracking-widest text-white/60">
              <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
              <a href="#" className="hover:text-white transition-colors">TIKTOK</a>
              <a href="#" className="hover:text-white transition-colors">YOUTUBE</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── JOIN MODAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/90 sm:p-6"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.97 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="bg-zinc-900 w-full sm:rounded-3xl sm:max-w-lg max-h-[92dvh] overflow-y-auto rounded-t-3xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Drag handle */}
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              <div className="p-8 sm:p-12">
                <AnimatePresence mode="wait">
                  {modalSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8"
                    >
                      <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                        <CheckCircle className="w-9 h-9 text-white" />
                      </div>
                      <div className="text-3xl sm:text-4xl font-semibold tracking-tighter mb-3">Welcome to Apex!</div>
                      <p className="text-white/60 mb-8 text-sm sm:text-base">We'll contact you within 24 hours to get you started.</p>
                      <button onClick={closeModal} className="px-8 py-3.5 border border-white/30 rounded-2xl text-sm tracking-widest hover:bg-white hover:text-black transition-all">
                        CLOSE
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="flex justify-between items-start mb-8 sm:mb-10">
                        <div>
                          <div className="uppercase tracking-[2px] text-xs mb-1 text-white/50">BECOME A MEMBER</div>
                          <div className="text-3xl sm:text-4xl font-semibold tracking-tighter">Start today.</div>
                        </div>
                        <button onClick={closeModal} className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
                          <X size={22} />
                        </button>
                      </div>

                      {selectedClass && (
                        <div className="mb-7 sm:mb-9 bg-black/60 p-5 sm:p-6 rounded-2xl">
                          <div className="uppercase text-xs mb-1 text-white/40">SELECTED CLASS</div>
                          <div className="font-semibold">{selectedClass.name}</div>
                          <div className="text-sm text-white/60 mt-1">{selectedClass.duration} • {selectedClass.level}</div>
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs tracking-widest mb-2 sm:mb-3 text-white/50">FIRST NAME</label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            className="w-full bg-black border border-white/10 rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 outline-none text-base sm:text-lg placeholder:text-white/30 focus:border-white/30 transition-colors"
                            placeholder="Alex"
                          />
                        </div>
                        <div>
                          <label className="block text-xs tracking-widest mb-2 sm:mb-3 text-white/50">EMAIL ADDRESS</label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            className="w-full bg-black border border-white/10 rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 outline-none text-base sm:text-lg placeholder:text-white/30 focus:border-white/30 transition-colors"
                            placeholder="you@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-xs tracking-widest mb-2 sm:mb-3 text-white/50">PHONE NUMBER</label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                            className="w-full bg-black border border-white/10 rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 outline-none text-base sm:text-lg placeholder:text-white/30 focus:border-white/30 transition-colors"
                            placeholder="(555) 123-4567"
                          />
                        </div>

                        <button
                          type="submit"
                          className="mt-4 sm:mt-6 w-full py-4 sm:py-5 bg-white text-black font-semibold tracking-widest text-xs sm:text-sm rounded-2xl hover:bg-white/90 transition-colors"
                        >
                          COMPLETE SIGN UP
                        </button>
                      </form>

                      <div className="text-center mt-5 sm:mt-8 text-xs text-white/40">30 day free cancellation • No commitment</div>
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
