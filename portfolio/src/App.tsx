import { useState, type ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  Code2,
  ExternalLink,
  Globe,
  Mail,
  Menu,
  MessageSquare,
  Megaphone,
  Phone,
  Sparkles,
  User,
  Users,
  X,
  Zap,
} from 'lucide-react'
import yuvrajPhoto from './assets/Yuvraj_singh.png'
import lokendraPhoto from './assets/Lokendra.jpeg'
import logoImg from './assets/logo.png'

// ─── Data ────────────────────────────────────────────────────────────────────

const navLinks = [
  { href: '#about',    label: 'About'    },
  { href: '#team',     label: 'Team'     },
  { href: '#services', label: 'Services' },
  { href: '#work',     label: 'Our Work' },
  { href: '#contact',  label: 'Contact'  },
]

const teamMembers = [
  {
    name: 'Yuvraj Singh Kaviya',
    role: 'Developer',
    photo: yuvrajPhoto,
    intro:
      'Builds websites that are fast, structured, and reliable. Focused on clean code and performance that represents your business properly.',
    skills: ['Web Development', 'App Development', 'Responsive Design', 'Performance Optimization', 'UI Implementation', 'Git & Version Control'],
    icon: Code2,
    accent: 'from-cyan-400/20 to-blue-500/10',
    iconColor: 'text-cyan-300',
  },
  {
    name: 'Lokendra Singh Rathore',
    role: 'Digital Marketer',
    photo: lokendraPhoto,
    intro:
      'Ensures websites reach the right audience and generate results. Focused on bringing the right audience — not just more traffic.',
    skills: ['Search Engine Optimization (SEO)', 'Social Media Marketing', 'Lead Generation', 'Content Planning'],
    icon: Megaphone,
    accent: 'from-fuchsia-500/20 to-purple-500/10',
    iconColor: 'text-fuchsia-300',
  },
]

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    desc: 'Clean and responsive websites designed to represent your business clearly and professionally.',
    accent: 'text-cyan-300',
  },
  {
    icon: Zap,
    title: 'Landing Pages',
    desc: 'Focused pages built to generate leads and improve conversions.',
    accent: 'text-fuchsia-300',
  },
  {
    icon: BarChart3,
    title: 'Website Optimization',
    desc: 'Improving speed, performance, and usability for better user experience.',
    accent: 'text-amber-300',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    desc: 'SEO and social media strategies to help your business reach more people.',
    accent: 'text-green-300',
  },
  {
    icon: CheckCircle2,
    title: 'Maintenance & Support',
    desc: 'Ongoing updates and fixes to keep your website running smoothly.',
    accent: 'text-sky-300',
  },
]

const extraServices = [
  'Backend Integrated Website',
  'Simple Mobile App',
  'Backend Integrated App',
  'Google Ads Management',
  'Meta Ads Management',
  'Microsite Creation',
  'Custom Portal',
  'E-commerce Integration',
  'Branding Package',
  'Website Audit',
  'Lead Generation Strategy',
]

// Relative paths from the portfolio's built dist/ to each sample's dist/
// Structure: ../../<sample_folder>/dist/
const sampleSites = [
  {
    title: 'Coaching Institute Website',
    desc: 'A professional multi-page website for an educational coaching institute, built to attract and convert students.',
    tags: ['Education', 'Lead Capture', 'Multi-Page'],
    href: '../../coaching_sample/dist/',
    accent: 'from-cyan-500 via-blue-500 to-indigo-500',
  },
  {
    title: 'Gym & Fitness Website',
    desc: 'An energetic fitness brand site with membership plans, class schedules, and strong conversion design.',
    tags: ['Fitness', 'Membership', 'CTA-Focused'],
    href: '../../gym_sample/dist/',
    accent: 'from-amber-400 via-orange-500 to-rose-500',
  },
  {
    title: 'Real Estate Website',
    desc: 'A clean property listing site designed for trust, easy browsing, and lead generation for agents.',
    tags: ['Real Estate', 'Listings', 'Lead Gen'],
    href: '../../real_estate_sample/dist/',
    accent: 'from-emerald-400 via-teal-500 to-cyan-500',
  },
  {
    title: 'Café Website',
    desc: 'A warm and inviting site for a café — showcasing the menu, ambiance, and location with a personal touch.',
    tags: ['Food & Beverage', 'Menu', 'Local Business'],
    href: '../../cafe_sample/dist/',
    accent: 'from-yellow-400 via-amber-500 to-orange-500',
  },
  {
    title: 'Dental Clinic Website',
    desc: 'A clean, trustworthy clinic site with service pages, team info, and an easy appointment booking flow.',
    tags: ['Healthcare', 'Appointments', 'Trust-Focused'],
    href: '../../dental_sample/dist/',
    accent: 'from-fuchsia-500 via-violet-500 to-purple-500',
  },
]

const whyUs = [
  'Direct communication with both of us',
  'No unnecessary complexity',
  'Affordable solutions',
  'Combined development and marketing approach',
  'Focus on real results',
  'Work delivered on time',
]

const approach = [
  'Clear communication',
  'Simple and effective solutions',
  'Focus on performance and usability',
  'Work delivered on time',
  'Long-term support when needed',
]

// ─── App ─────────────────────────────────────────────────────────────────────

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleNavClick = () => setMobileMenuOpen(false)

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault()
    const { name, email, phone, message } = form
    const body = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0A%0A${message}`
    window.location.href = `mailto:contact@skmdigital.in?subject=Project Inquiry from ${name}&body=${body}`
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(217,70,239,0.18),_transparent_30%),radial-gradient(circle_at_85%_15%,_rgba(34,211,238,0.18),_transparent_28%),linear-gradient(180deg,_#0b1426_0%,_#07111f_100%)]" />
        <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:80px_80px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">

          {/* Header */}
          <header className="mb-10 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md md:mb-14">
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="SKM logo" className="h-8 w-8 rounded-full object-cover" />
              <p className="text-sm font-bold tracking-[0.2em] uppercase text-white">SKM</p>
            </div>

            {/* Desktop nav */}
            <nav className="hidden gap-6 text-sm text-white/70 md:flex">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen((p) => !p)}
              className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </header>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-x-4 top-[76px] z-50 rounded-2xl border border-white/10 bg-[#0b1426]/95 p-6 backdrop-blur-xl md:hidden"
              >
                <nav className="flex flex-col gap-2 text-base text-white/80">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={handleNavClick}
                      className="rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero content */}
          <div className="flex flex-col items-start gap-8 py-16 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                <Sparkles size={15} /> Development + Digital Marketing
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                Practical Websites.{' '}
                <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  Real Growth.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-xl">
                We are <span className="font-medium text-white">Yuvraj Singh Kaviya</span> and{' '}
                <span className="font-medium text-white">Lokendra Singh Rathore</span> — a developer and a
                digital marketer working together to help businesses build a strong and effective online presence.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]"
                >
                  View Our Work <ArrowRight size={18} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
                >
                  <Mail size={18} /> Get Started
                </a>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="grid w-full max-w-xl grid-cols-3 gap-4"
            >
              {[
                { value: '2',    label: 'Core Specialists' },
                { value: '5+',   label: 'Sample Projects'  },
                { value: '100%', label: 'Client Focused'   },
              ].map((s) => (
                <div key={s.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="text-2xl font-bold sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs text-white/55 sm:text-sm">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ─────────────────────────────────────────────────── */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.3em] uppercase text-cyan-300">
              <Users size={15} /> About Us
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              We keep things simple and make them work.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              We are a small team focused on delivering simple, effective digital solutions for growing businesses.
              We work directly with clients, understand their needs, and provide solutions that are practical — not complicated.
            </p>
            <p className="mt-4 text-white/60">
              Our approach is straightforward: build what is needed, and make it work properly.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <p className="mb-4 text-sm font-semibold tracking-[0.3em] uppercase text-fuchsia-300">Our Approach</p>
            <ul className="space-y-3">
              {approach.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/75">
                  <BadgeCheck size={18} className="mt-0.5 shrink-0 text-cyan-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── TEAM SECTION ──────────────────────────────────────────────────── */}
      <section id="team" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10">
        <div className="mb-12">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.3em] uppercase text-cyan-300">
            <Users size={15} /> Meet the Team
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">Different strengths. Shared outcomes.</h2>
          <p className="mt-4 max-w-2xl text-lg text-white/65">
            One of us builds the experience. The other makes sure people find it.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {teamMembers.map((person, index) => {
            const Icon = person.icon
            return (
              <motion.article
                key={person.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className={`rounded-[2rem] border border-white/10 bg-gradient-to-br ${person.accent} p-8 backdrop-blur-sm`}
              >
                {/* Photo + name row */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/15">
                    <img
                      src={person.photo}
                      alt={person.name}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className={`mb-2 inline-flex rounded-xl border border-white/10 bg-white/5 p-2 ${person.iconColor}`}>
                      <Icon size={20} />
                    </div>
                    <h3 className="text-xl font-bold leading-tight">{person.name}</h3>
                    <p className="mt-0.5 text-sm uppercase tracking-[0.2em] text-white/50">{person.role}</p>
                  </div>
                </div>

                <p className="text-white/70">{person.intro}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {person.skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>

      {/* ── SERVICES SECTION ──────────────────────────────────────────────── */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10">
        <div className="mb-12">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.3em] uppercase text-cyan-300">
            <Zap size={15} /> Services
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">What we offer</h2>
          <p className="mt-4 max-w-2xl text-lg text-white/65">
            We don't overpromise. We deliver what actually helps your business.
          </p>
        </div>

        {/* Main 5 services */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, index) => {
            const Icon = svc.icon
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm"
              >
                <div className={`mb-4 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 ${svc.accent}`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold">{svc.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{svc.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Extended services list */}
        <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <p className="mb-5 text-sm font-semibold tracking-[0.2em] uppercase text-white/50">Also available</p>
          <div className="flex flex-wrap gap-3">
            {extraServices.map((svc) => (
              <span key={svc} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                {svc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR WORK / PORTFOLIO SECTION ──────────────────────────────────── */}
      <section id="work" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10">
        <div className="mb-12">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.3em] uppercase text-cyan-300">
            <Globe size={15} /> Sample Work
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">Some of the websites we have built</h2>
          <p className="mt-4 max-w-2xl text-lg text-white/65">
            Each project is built to match the specific needs of that business type.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleSites.map((site, index) => (
            <motion.article
              key={site.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group flex flex-col rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              {/* Gradient bar */}
              <div className={`mb-6 h-1.5 w-full rounded-full bg-gradient-to-r ${site.accent}`} />

              <h3 className="text-xl font-bold">{site.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-white/65">{site.desc}</p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {site.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                    {tag}
                  </span>
                ))}
              </div>

              {/* View Site link */}
              <a
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${site.accent} px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 hover:scale-[1.02] self-start`}
              >
                View Site <ExternalLink size={14} />
              </a>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── WHY US SECTION ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/8 p-8 backdrop-blur-sm">
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] uppercase text-cyan-200">Why Work With Us</p>
            <h2 className="text-3xl font-bold">We keep things simple and practical.</h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              We work directly with clients, understand their needs, and provide solutions that are practical — not complicated.
            </p>
            <ul className="mt-8 space-y-4">
              {whyUs.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 size={18} className="shrink-0 text-cyan-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
              <div className="mb-3 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-cyan-300">
                <Code2 size={22} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-widest text-white/50">Development</p>
              <p className="mt-2 font-medium">Websites built with attention to structure, speed, and usability.</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
              <div className="mb-3 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-fuchsia-300">
                <Megaphone size={22} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-widest text-white/50">Marketing</p>
              <p className="mt-2 font-medium">A website is only useful if people can find it and trust it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ───────────────────────────────────────────────── */}
      <section id="contact" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-10">
        <div className="mb-12">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.3em] uppercase text-cyan-300">
            <MessageSquare size={15} /> Contact
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">Let's Work Together</h2>
          <p className="mt-4 max-w-xl text-lg text-white/65">
            If you need a website or want to improve your online presence, feel free to reach out. We'll respond with clear next steps.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white/60">Name</label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <User size={16} className="shrink-0 text-white/40" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleFormChange}
                    required
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-white/60">Email</label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <Mail size={16} className="shrink-0 text-white/40" />
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleFormChange}
                    required
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-sm text-white/60">Phone</label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <Phone size={16} className="shrink-0 text-white/40" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={handleFormChange}
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-sm text-white/60">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={handleFormChange}
                  required
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              Send Message <ArrowRight size={17} />
            </button>
          </form>

          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-white/50">Get in Touch</p>
              <div className="mt-5 space-y-4 text-sm text-white/70">
                <a href="mailto:omshivshakti2468@gmail.com" className="flex items-center gap-3 hover:text-white transition">
                  <Mail size={16} className="text-cyan-300" /> skmdigital@gmail.com
                </a>
                <a href="tel:+918233156509" className="flex items-center gap-3 hover:text-white transition">
                  <Phone size={16} className="text-cyan-300" /> +91 8233156509
                </a>
                <a href="tel:+919928777896" className="flex items-center gap-3 hover:text-white transition">
                  <Phone size={16} className="text-cyan-300" /> +91 9928777896
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-fuchsia-400/20 bg-fuchsia-400/8 p-7">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-fuchsia-200">Our Promise</p>
              <p className="mt-4 text-white/70 leading-7">
                We don't overpromise. We deliver what actually helps your business — clear communication, simple solutions, and real results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-white/3 px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <img src={logoImg} alt="SKM logo" className="h-7 w-7 rounded-full object-cover" />
                <p className="font-bold tracking-[0.2em] uppercase text-white">SKM</p>
              </div>
              <p className="mt-2 text-sm text-white/45">Simple work. Reliable results.</p>
            </div>

            <div className="text-sm text-white/45">
              <p>Built and managed by</p>
              <p className="mt-1 text-white/65">
                <span className="font-medium text-white/80">Yuvraj Singh Kaviya</span> (Development) &amp;{' '}
                <span className="font-medium text-white/80">Lokendra Singh Rathore</span> (Marketing)
              </p>
            </div>
          </div>
        </div>
      </footer>

    </main>
  )
}

export default App
