import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Clock, MapPin, Users, Star, Plus, ShoppingCart, X, Award, Menu } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  category: 'coffee' | 'tea' | 'bakery' | 'sandwiches';
  price: number;
  description: string;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

const menuItems: MenuItem[] = [
  { id: 1, name: "Espresso", category: "coffee", price: 3.50, description: "Bold and rich single shot", image: "/images/coffee.jpg" },
  { id: 2, name: "Cappuccino", category: "coffee", price: 4.50, description: "Espresso with steamed milk foam", image: "/images/coffee.jpg" },
  { id: 3, name: "Latte", category: "coffee", price: 4.75, description: "Smooth espresso with silky milk", image: "/images/coffee.jpg" },
  { id: 4, name: "Mocha", category: "coffee", price: 5.25, description: "Espresso, chocolate & steamed milk", image: "/images/coffee.jpg" },
  { id: 5, name: "Chai Latte", category: "tea", price: 4.50, description: "Spiced black tea with steamed milk", image: "/images/coffee.jpg" },
  { id: 6, name: "Matcha Latte", category: "tea", price: 5.00, description: "Premium Japanese green tea", image: "/images/coffee.jpg" },
  { id: 7, name: "Butter Croissant", category: "bakery", price: 3.25, description: "Flaky, golden butter pastry", image: "/images/pastry.jpg" },
  { id: 8, name: "Blueberry Muffin", category: "bakery", price: 3.75, description: "Fresh baked with wild blueberries", image: "/images/pastry.jpg" },
  { id: 9, name: "Chocolate Croissant", category: "bakery", price: 3.50, description: "Filled with rich dark chocolate", image: "/images/pastry.jpg" },
  { id: 10, name: "Avocado Toast", category: "sandwiches", price: 7.50, description: "Smashed avocado, chili flakes, poached egg", image: "/images/food.jpg" },
  { id: 11, name: "Turkey Club", category: "sandwiches", price: 8.75, description: "Turkey, bacon, lettuce, tomato on sourdough", image: "/images/food.jpg" },
  { id: 12, name: "Caprese Panini", category: "sandwiches", price: 7.25, description: "Mozzarella, tomato, basil, balsamic", image: "/images/food.jpg" },
];

const testimonials = [
  { name: "Sarah Chen", text: "The best latte I've had in years. The atmosphere makes you want to stay all day!", rating: 5, image: "/images/barista.jpg" },
  { name: "Marcus Rodriguez", text: "Their croissants are absolutely heavenly. Perfect spot to work or catch up with friends.", rating: 5, image: "/images/interior2.jpg" },
  { name: "Elena Patel", text: "Cozy vibes and incredible coffee. I've become a regular here for my morning ritual.", rating: 5, image: "/images/hero.jpg" },
];

const categories = [
  { label: 'All', value: 'all' as const },
  { label: 'Coffee', value: 'coffee' as const },
  { label: 'Tea', value: 'tea' as const },
  { label: 'Bakery', value: 'bakery' as const },
  { label: 'Sandwiches', value: 'sandwiches' as const },
];

const navLinks = [
  { label: 'OUR STORY', section: 'about' },
  { label: 'MENU', section: 'menu' },
  { label: 'GALLERY', section: 'gallery' },
  { label: 'VISIT', section: 'visit' },
];

function App() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'coffee' | 'tea' | 'bakery' | 'sandwiches'>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reservationForm, setReservationForm] = useState({ name: '', date: '', time: '', guests: '2' });
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const filteredMenu = activeFilter === 'all' ? menuItems : menuItems.filter(i => i.category === activeFilter);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Navbar shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Body scroll lock when any overlay is open
  useEffect(() => {
    const anyOpen = isCartOpen || isReservationOpen || isMobileMenuOpen;
    document.body.style.overflow = anyOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen, isReservationOpen, isMobileMenuOpen]);

  // Escape key closes overlays
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (isCartOpen) setIsCartOpen(false);
      else if (isReservationOpen) setIsReservationOpen(false);
      else if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCartOpen, isReservationOpen, isMobileMenuOpen]);

  const pushToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2800);
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { ...item, quantity: 1 }];
    });
    pushToast(`${item.name} added to cart`);
    setAddedItem(item.name);
    setTimeout(() => setAddedItem(null), 800);
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));

  const updateQuantity = (id: number, qty: number) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      pushToast("Reservation confirmed! We'll see you soon.");
      setReservationForm({ name: '', date: '', time: '', guests: '2' });
      setIsReservationOpen(false);
    }, 500);
  };

  const handleCheckout = () => {
    pushToast('Order placed! Thank you for your purchase.');
    setCart([]);
    setIsCartOpen(false);
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }, isMobileMenuOpen ? 300 : 0);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 } as any,
    viewport: { once: true },
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  });

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#3C2F2F] font-sans overflow-x-hidden">

      {/* ── NAVBAR ────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#EDE4D4] transition-shadow duration-200 ${scrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#6B4E31] rounded-full flex items-center justify-center flex-shrink-0">
              <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-[#FAF7F0]" />
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl tracking-tight leading-none">bean haven</div>
              <div className="text-[9px] sm:text-[10px] text-[#8B6F47] mt-0.5">EST 2018</div>
            </div>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 text-sm uppercase tracking-widest">
            {navLinks.map(link => (
              <button key={link.section} onClick={() => scrollToSection(link.section)} className="hover:text-[#6B4E31] transition-colors">
                {link.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsReservationOpen(true)}
              className="hidden md:flex items-center gap-2 px-5 lg:px-6 py-2 lg:py-2.5 bg-[#6B4E31] text-[#FAF7F0] rounded-full text-xs lg:text-sm tracking-widest hover:bg-[#5A3F28] transition-colors"
            >
              <Users className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              RESERVE
            </motion.button>

            {/* Cart button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:p-3 rounded-full hover:bg-[#EDE4D4] transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[#C17C4E] text-[#FAF7F0] text-[10px] font-mono w-5 h-5 flex items-center justify-center rounded-full"
                  >
                    {cartCount}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(o => !o)}
              className="md:hidden p-2 rounded-lg hover:bg-[#EDE4D4] transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMobileMenuOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 top-[56px] bg-black/30 z-40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 bg-[#FAF7F0] border-t border-[#EDE4D4] shadow-xl z-50 md:hidden"
              >
                <div className="px-4 py-5 flex flex-col gap-1">
                  {navLinks.map(link => (
                    <button
                      key={link.section}
                      onClick={() => scrollToSection(link.section)}
                      className="text-left py-3 px-3 rounded-xl text-sm tracking-widest uppercase hover:bg-[#EDE4D4] transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); setIsReservationOpen(true); }}
                    className="mt-3 flex items-center justify-center gap-2 py-3.5 bg-[#6B4E31] text-white rounded-2xl text-sm tracking-widest hover:bg-[#5A3F28] transition-colors"
                  >
                    <Users className="w-4 h-4" /> RESERVE A TABLE
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-14 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/58" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full mb-5 sm:mb-6 text-xs tracking-[3px] text-white">
              DOWNTOWN • SINCE 2018
            </div>

            <h1 className="text-[64px] sm:text-[88px] md:text-[110px] lg:text-[120px] leading-[0.9] font-serif text-white tracking-tighter mb-5 sm:mb-6">
              BEAN<br />HAVEN
            </h1>

            <p className="max-w-sm sm:max-w-md mx-auto text-base sm:text-xl text-white/90 mb-8 sm:mb-12">
              Handcrafted coffee. Fresh baked goods.<br className="hidden sm:block" />
              A place to slow down.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <button
              onClick={() => scrollToSection('menu')}
              className="group px-8 sm:px-10 py-3.5 sm:py-4 border border-white text-white hover:bg-white hover:text-[#3C2F2F] transition-all flex items-center justify-center gap-3 text-xs sm:text-sm tracking-widest"
            >
              EXPLORE MENU
              <Coffee className="group-hover:rotate-12 transition-transform" />
            </button>

            <button
              onClick={() => setIsReservationOpen(true)}
              className="px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-[#3C2F2F] hover:bg-[#EDE4D4] transition-all flex items-center justify-center gap-3 text-xs sm:text-sm tracking-widest"
            >
              BOOK A TABLE
            </button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 text-white/70 hidden sm:flex flex-col items-center"
        >
          <div className="text-xs tracking-[2px] mb-1">SCROLL TO BEGIN</div>
          <div className="w-px h-10 bg-white/40" />
        </motion.div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section id="about" className="py-16 sm:py-24 bg-[#FAF7F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
            <motion.div {...fadeUp()}>
              <div className="uppercase tracking-[3px] text-[#8B6F47] text-xs sm:text-sm mb-3 sm:mb-4">OUR ROOTS</div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-none tracking-tighter mb-6 sm:mb-8">
                COFFEE WITH<br />INTENTION
              </h2>

              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed text-[#5C4033]">
                <p>Bean Haven began as a small corner shop with one espresso machine and a dream. Today, we source the finest beans from sustainable farms around the world and roast them in-house with love and care.</p>
                <p>Every cup is brewed with purpose, every pastry baked fresh each morning, and every guest welcomed like family.</p>
              </div>

              <div className="flex gap-8 sm:gap-10 mt-10 sm:mt-12">
                {[['6', 'YEARS'], ['42', 'BEANS'], ['∞', 'CUPS']].map(([num, label]) => (
                  <div key={label}>
                    <div className="text-3xl sm:text-4xl font-serif">{num}</div>
                    <div className="uppercase text-xs tracking-widest mt-1 text-[#8B6F47]">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.12)} className="relative mt-6 md:mt-0">
              <img
                src="/images/interior2.jpg"
                alt="Cafe Interior"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover rounded-3xl shadow-xl"
              />
              <div className="absolute -bottom-4 sm:-bottom-6 left-3 sm:-left-6 bg-white p-5 sm:p-8 rounded-3xl shadow-xl max-w-[220px] sm:max-w-[260px]">
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-[#C17C4E] fill-current" />
                  ))}
                </div>
                <div className="italic text-xs sm:text-sm leading-snug">"The most beautiful cafe I've ever stepped into. The coffee is pure magic."</div>
                <div className="mt-4 sm:mt-6 text-[10px] sm:text-xs text-[#8B6F47]">— LUCIA M. / REGULAR SINCE 2021</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MENU ──────────────────────────────────────────────── */}
      <section id="menu" className="py-16 sm:py-20 bg-[#F2EDE4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center mb-10 sm:mb-16">
            <motion.div {...fadeUp()} className="text-[#8B6F47] text-xs sm:text-sm tracking-[4px] mb-3">CAREFULLY CURATED</motion.div>
            <motion.h2 {...fadeUp(0.08)} className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tighter">Our Menu</motion.h2>
            <motion.p {...fadeUp(0.14)} className="mt-3 sm:mt-4 max-w-md text-[#5C4033] text-sm sm:text-base">Seasonal selections, fresh daily. All made with love.</motion.p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`px-5 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm rounded-full transition-all tracking-widest ${
                  activeFilter === cat.value
                    ? 'bg-[#6B4E31] text-white shadow-md'
                    : 'bg-white hover:bg-[#EDE4D4] text-[#6B4E31]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredMenu.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.04, duration: 0.35 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-52 sm:h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-3 sm:px-4 py-1 bg-white/90 text-xs font-mono tracking-widest rounded-full">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <h3 className="font-serif text-2xl sm:text-3xl tracking-tight mb-2">{item.name}</h3>
                    <p className="text-[#6B4E31] text-sm leading-snug mb-6 sm:mb-8 line-clamp-2">{item.description}</p>

                    <motion.button
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => addToCart(item)}
                      className={`flex w-full items-center justify-center gap-2 sm:gap-3 py-3.5 sm:py-4 border border-[#6B4E31] text-[#6B4E31] hover:bg-[#6B4E31] hover:text-white transition-all text-xs sm:text-sm tracking-[1px] rounded-2xl ${addedItem === item.name ? 'bg-[#6B4E31] !text-white' : ''}`}
                    >
                      <Plus className="w-4 h-4" /> ADD TO CART
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────────── */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 sm:mb-12">
            <div>
              <motion.div {...fadeUp()} className="uppercase text-xs tracking-[3px] text-[#8B6F47]">MOMENTS</motion.div>
              <motion.h2 {...fadeUp(0.08)} className="text-3xl sm:text-4xl lg:text-6xl font-serif tracking-tight mt-1">
                Inside Bean Haven
              </motion.h2>
            </div>
            <a href="#" className="text-sm flex items-center gap-2 text-[#6B4E31] hover:underline self-start sm:self-auto">
              VIEW ALL ON INSTAGRAM <span>↗</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            <motion.div {...fadeUp()} className="md:col-span-7 rounded-2xl sm:rounded-3xl overflow-hidden">
              <img src="/images/hero.jpg" alt="Cafe Interior" loading="lazy" className="w-full h-48 sm:h-auto object-cover md:aspect-video" />
            </motion.div>
            <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4">
              <motion.div {...fadeUp(0.06)} className="rounded-2xl sm:rounded-3xl overflow-hidden">
                <img src="/images/barista.jpg" alt="Barista" loading="lazy" className="w-full aspect-[4/3] object-cover" />
              </motion.div>
              <motion.div {...fadeUp(0.1)} className="rounded-2xl sm:rounded-3xl overflow-hidden">
                <img src="/images/interior2.jpg" alt="Interior" loading="lazy" className="w-full aspect-[4/3] object-cover" />
              </motion.div>
            </div>
            <motion.div {...fadeUp(0.06)} className="md:col-span-5 rounded-2xl sm:rounded-3xl overflow-hidden">
              <img src="/images/food.jpg" alt="Food" loading="lazy" className="w-full h-48 md:h-full object-cover md:aspect-square" />
            </motion.div>
            <motion.div {...fadeUp(0.1)} className="md:col-span-7 rounded-2xl sm:rounded-3xl overflow-hidden">
              <img src="/images/pastry.jpg" alt="Pastries" loading="lazy" className="w-full h-48 md:h-full object-cover md:aspect-video" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#3C2F2F] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <motion.div {...fadeUp()} className="text-[#C17C4E] mb-3 sm:mb-4 text-lg">★★★★★</motion.div>
            <motion.h2 {...fadeUp(0.08)} className="font-serif text-3xl sm:text-4xl lg:text-6xl tracking-tighter">
              What Our Guests Say
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.45 }}
                className="bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/10"
              >
                <div className="flex mb-5 sm:mb-8">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#C17C4E] fill-[#C17C4E]" />
                  ))}
                </div>
                <div className="text-base sm:text-xl leading-snug mb-8 sm:mb-10">
                  "{testimonial.text}"
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden flex-shrink-0">
                    <img src={testimonial.image} alt={testimonial.name} loading="lazy" className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base">{testimonial.name}</div>
                    <div className="text-xs opacity-60">Regular Guest</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISIT US ──────────────────────────────────────────── */}
      <section id="visit" className="py-16 sm:py-24 bg-[#FAF7F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 sm:gap-16">
          <motion.div {...fadeUp()}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl tracking-tighter mb-6 sm:mb-8">Come Visit Us</h2>

            <div className="space-y-7 sm:space-y-10">
              <div className="flex gap-4 sm:gap-6">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#6B4E31] mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium">123 Maple Grove Lane</div>
                  <div className="text-[#6B4E31]">Portland, Oregon</div>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#6B4E31] mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium">OPEN DAILY</div>
                  <div className="text-[#6B4E31]">6:30am – 7:00pm</div>
                </div>
              </div>

              <div className="pt-6 sm:pt-8 border-t border-[#EDE4D4]">
                <div className="uppercase tracking-widest text-xs mb-3 sm:mb-4">PARKING &amp; ACCESSIBILITY</div>
                <div className="text-sm leading-relaxed text-[#5C4033]">
                  Free parking in the back lot. Wheelchair accessible entrance. We are dog friendly on our patio.
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="relative rounded-3xl overflow-hidden h-72 sm:h-[420px] lg:h-[520px] shadow-2xl">
            <img src="/images/interior2.jpg" alt="Cafe location" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/70" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white">
              <div className="text-xs uppercase tracking-widest mb-1 sm:mb-2">FIND US</div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight">Portland's<br />favorite corner</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="bg-[#3C2F2F] text-white/80 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 sm:gap-y-12 md:gap-y-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5 sm:mb-8">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                <Coffee className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3C2F2F]" />
              </div>
              <div className="font-serif text-3xl sm:text-4xl tracking-tighter">bean haven</div>
            </div>
            <div className="max-w-xs text-sm leading-relaxed">
              A neighborhood cafe dedicated to serving exceptional coffee, delicious pastries, and creating meaningful moments since 2018.
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs tracking-widest mb-4 sm:mb-6">QUICK LINKS</div>
            <div className="space-y-2.5 sm:space-y-3 text-sm">
              {navLinks.map(link => (
                <button key={link.section} onClick={() => scrollToSection(link.section)} className="block hover:text-white transition-colors">
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs tracking-widest mb-4 sm:mb-6">CONTACT</div>
            <div className="space-y-2.5 sm:space-y-3 text-sm">
              <div>(503) 555-0192</div>
              <div>hello@beanhaven.coffee</div>
              <div className="pt-4 sm:pt-6">© {new Date().getFullYear()} Bean Haven. All rights reserved.</div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-24 text-center text-xs opacity-40">Crafted with ❤️ in Portland, OR</div>
      </footer>

      {/* ── CART MODAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/70" onClick={() => setIsCartOpen(false)}>
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.02, duration: 0.45 }}
              className="bg-white w-full max-w-lg rounded-t-3xl md:rounded-3xl shadow-2xl max-h-[92dvh] md:max-h-[85vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Drag handle */}
              <div className="md:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 rounded-full bg-gray-300" />
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <ShoppingCart className="text-[#6B4E31] w-5 h-5" />
                    <div className="font-serif text-2xl sm:text-3xl">Your Cart</div>
                  </div>
                  <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                {cart.length > 0 ? (
                  <>
                    <div className="space-y-5 sm:space-y-6 mb-6 sm:mb-8">
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 sm:gap-5 border-b pb-5 sm:pb-6">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-2xl overflow-hidden">
                            <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm sm:text-base truncate">{item.name}</div>
                            <div className="text-xs text-[#8B6F47] mt-0.5">${item.price.toFixed(2)} each</div>

                            <div className="flex items-center gap-3 sm:gap-4 mt-3">
                              <div className="flex border rounded-lg">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-[#f4ede3] transition-colors text-sm">−</button>
                                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-sm tabular-nums">{item.quantity}</div>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-[#f4ede3] transition-colors text-sm">+</button>
                              </div>
                              <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:underline">REMOVE</button>
                            </div>
                          </div>

                          <div className="font-mono text-base sm:text-lg tabular-nums self-start pt-0.5 flex-shrink-0">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-baseline text-lg sm:text-xl border-t pt-6 sm:pt-8">
                      <div>TOTAL</div>
                      <div className="font-serif tracking-tight">${cartTotal.toFixed(2)}</div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="mt-6 sm:mt-8 w-full py-4 sm:py-5 bg-[#6B4E31] text-white text-xs sm:text-sm tracking-widest hover:bg-black transition-colors rounded-2xl"
                    >
                      CHECKOUT • ${cartTotal.toFixed(2)}
                    </button>
                    <div className="text-center text-xs mt-4 text-[#8B6F47]">We accept cash, cards, and good vibes</div>
                  </>
                ) : (
                  <div className="text-center py-16 sm:py-20">
                    <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F2EDE4] flex items-center justify-center mb-6 sm:mb-8">
                      <ShoppingCart className="w-7 h-7 sm:w-9 sm:h-9 text-[#8B6F47]" />
                    </div>
                    <div className="text-xl sm:text-2xl font-light mb-2">Cart is empty</div>
                    <div className="text-sm max-w-[200px] sm:max-w-[240px] mx-auto text-[#8B6F47]">Add some delicious items from the menu</div>
                    <button onClick={() => { setIsCartOpen(false); scrollToSection('menu'); }} className="mt-6 px-6 py-2.5 border border-[#6B4E31] text-[#6B4E31] rounded-full text-xs tracking-widest hover:bg-[#6B4E31] hover:text-white transition-colors">
                      BROWSE MENU
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── RESERVATION MODAL ─────────────────────────────────── */}
      <AnimatePresence>
        {isReservationOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 sm:p-6" onClick={() => setIsReservationOpen(false)}>
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 40 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-white w-full sm:rounded-3xl sm:max-w-md max-h-[92dvh] overflow-y-auto rounded-t-3xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Drag handle on mobile */}
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-gray-300" />
              </div>

              <div className="p-7 sm:p-10 relative">
                <button onClick={() => setIsReservationOpen(false)} className="absolute top-6 sm:top-8 right-6 sm:right-8 text-[#8B6F47] p-1 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-7 sm:mb-9 pr-8">
                  <div className="font-serif text-3xl sm:text-5xl tracking-tight">Reserve a table</div>
                  <div className="text-[#8B6F47] mt-1 text-sm sm:text-base">We look forward to hosting you</div>
                </div>

                <form onSubmit={handleReservationSubmit} className="space-y-5 sm:space-y-6">
                  <div>
                    <label className="block text-xs tracking-widest mb-2 text-gray-500">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      value={reservationForm.name}
                      onChange={e => setReservationForm({ ...reservationForm, name: e.target.value })}
                      className="w-full border-b border-gray-200 py-3 sm:py-4 focus:outline-none focus:border-[#6B4E31] text-lg sm:text-xl placeholder:text-[#c9b8a4] transition-colors bg-transparent"
                      placeholder="Taylor Kim"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs tracking-widest mb-2 text-gray-500">DATE</label>
                      <input
                        type="date"
                        required
                        value={reservationForm.date}
                        onChange={e => setReservationForm({ ...reservationForm, date: e.target.value })}
                        className="w-full border-b border-gray-200 py-3 sm:py-4 focus:outline-none focus:border-[#6B4E31] text-base sm:text-xl transition-colors bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest mb-2 text-gray-500">TIME</label>
                      <input
                        type="time"
                        required
                        value={reservationForm.time}
                        onChange={e => setReservationForm({ ...reservationForm, time: e.target.value })}
                        className="w-full border-b border-gray-200 py-3 sm:py-4 focus:outline-none focus:border-[#6B4E31] text-base sm:text-xl transition-colors bg-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest mb-2 text-gray-500">NUMBER OF GUESTS</label>
                    <select
                      value={reservationForm.guests}
                      onChange={e => setReservationForm({ ...reservationForm, guests: e.target.value })}
                      className="w-full border-b border-gray-200 py-3 sm:py-4 focus:outline-none focus:border-[#6B4E31] text-lg sm:text-xl bg-transparent transition-colors"
                    >
                      {['1', '2', '3', '4', '5'].map(n => (
                        <option key={n} value={n}>{n} {n === '1' ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 sm:mt-4 w-full py-4 sm:py-5 bg-[#6B4E31] hover:bg-black text-white transition-colors rounded-2xl tracking-[1px] text-xs sm:text-sm"
                  >
                    CONFIRM RESERVATION
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── TOAST CONTAINER ───────────────────────────────────── */}
      <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2 sm:gap-3 pointer-events-none w-max max-w-[calc(100vw-2rem)]">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`px-5 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 text-xs sm:text-sm bg-white border-l-4 whitespace-nowrap ${toast.type === 'success' ? 'border-[#6B4E31]' : 'border-red-500'}`}
            >
              {toast.type === 'success' && <span className="text-[#6B4E31]">✓</span>}
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
