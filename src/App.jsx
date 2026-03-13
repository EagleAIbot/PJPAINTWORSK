import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useAppStore } from './store/useAppStore'
import {
  ArrowRight,
  Mail,
  Phone,
  CheckCircle2,
  ChevronRight,
  Clock,
  ShoppingBag,
  ExternalLink,
  Star,
  Brush,
  Building2,
  Frame,
  Layers,
  Palette,
  Sparkles,
  ImageIcon,
  Zap,
} from 'lucide-react'
import HeroScene from './HeroScene'
import './App.css'

const BASE = import.meta.env.BASE_URL
const img = (name) => `${BASE}images/${name}`

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', projectType: '', budget: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { sceneLoaded, setAnimationsReady, setFinished } = useAppStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!sceneLoaded) return
    const t1 = setTimeout(() => setAnimationsReady(), 150)
    const t2 = setTimeout(() => setFinished(), 1000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [sceneLoaded])

  const animationsReady = useAppStore((s) => s.animationsReady)
  useEffect(() => {
    if (!animationsReady) return
    const tl = gsap.timeline()
    tl.fromTo('.hero-title',          { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1,   ease: 'power3.out' })
      .fromTo('.hero-cta-wrap',       { opacity: 0, y:  20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo('.hero-right-headline', { opacity: 0, x:  40 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '-=0.9')
      .fromTo('.hero-right-sub',      { opacity: 0, x:  40 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
  }, [animationsReady])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    setFormError(false)
    try {
      const res = await fetch('https://formsubmit.co/ajax/pjpaintworks@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) setFormSubmitted(true)
      else setFormError(true)
    } catch {
      setFormError(true)
    } finally {
      setFormLoading(false)
    }
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const services = [
    {
      number: "01",
      title: "Murals & Large-Scale Walls",
      description: "Got a blank wall that needs a statement piece? From side-of-building scale to commercial interiors, PJ brings walls to life with bold, original murals built to last."
    },
    {
      number: "02",
      title: "Custom Street Signs",
      description: "The Batman STOP sign isn't a fluke — it's a craft. One-off painted street signs blending pop culture, street art, and aerosol mastery. Perfect gifts, perfect statement pieces."
    },
    {
      number: "03",
      title: "Canvas & Board Work",
      description: "Original paintings on canvas and board — gallery-ready pieces you can hang, own, and live with. Each one is a unique original. No prints. No reproductions. The real thing."
    },
    {
      number: "04",
      title: "Commissioned Pieces",
      description: "Got something specific in mind? A character, a portrait, a concept? Bring the brief and PJ will bring it to life. Full creative consultation, regular updates, your vision executed perfectly."
    },
    {
      number: "05",
      title: "Vehicle & Helmet Artwork",
      description: "Tanks, helmets, bodywork — custom airbrushed and hand-painted finishes on anything that moves. Each paint job is one-of-a-kind, built around the bike or the rider."
    },
    {
      number: "06",
      title: "Event & Live Painting",
      description: "Book PJ to paint live at your event. Whether it's a festival, brand activation, or private party — watching the work happen in real time is an experience in itself."
    },
  ]

  const workTypes = [
    { icon: Building2,  title: "Murals",            desc: "Large-scale wall art for commercial and residential spaces" },
    { icon: Frame,      title: "Canvas Work",       desc: "Original paintings — no prints, no reproductions" },
    { icon: Brush,      title: "Street Signs",      desc: "Custom painted signs blending pop culture and street style" },
    { icon: Layers,     title: "Commissions",       desc: "Your idea. Your brief. PJ's execution." },
    { icon: Palette,    title: "Airbrushing",        desc: "Helmets, tanks, panels — precision airbrushed finishes" },
    { icon: Zap,        title: "Live Events",       desc: "Live painting at festivals, brand events, and private parties" },
    { icon: Sparkles,   title: "Pop Art",           desc: "Bold, saturated, iconic — pop art with a street edge" },
    { icon: ImageIcon,  title: "Portraits",         desc: "Custom portrait pieces from photo reference or live sitting" },
  ]

  const tickerItems = [
    "Murals", "Aerosol Art", "Custom Commissions", "Street Signs", "Canvas Work",
    "Airbrushing", "Pop Art", "Graffiti", "Live Events", "One-of-a-kind", "Original Art",
    "Helmets", "Vehicle Art", "Portraits", "Bold. Raw. Real.",
  ]

  // Shopify product slots — replace href with real Shopify product URLs
  const shopItems = [
    {
      title: "Batman 'STOP — Bring Coffee' Sign",
      desc: "The original. Aerosol on metal road sign. Bold, funny, one of a kind.",
      price: "£POA",
      tag: "ORIGINAL",
      tagColor: "#FF2D55",
      img: img('artwork-batman.png'),
      href: "https://your-shopify-store.myshopify.com/products/batman-stop-sign",
      available: true,
    },
    {
      title: "GAS FTN STOP — Monster Sign",
      desc: "Painted metal stop sign with Rat Fink-style monster. Aged, raw, and seriously cool.",
      price: "£250",
      tag: "FOR SALE",
      tagColor: "#FF2D55",
      img: img('gas-stop-sign.png'),
      href: "https://your-shopify-store.myshopify.com/products/gas-stop-sign",
      available: true,
    },
    {
      title: "Fuck the Rules — Give Way Sign",
      desc: "Painted give way road sign. Eagle, smiley, spider webs, rusted vibes.",
      price: "£POA",
      tag: "FOR SALE",
      tagColor: "#FF2D55",
      img: img('giveway-sign.png'),
      href: "https://your-shopify-store.myshopify.com/products/give-way-sign",
      available: true,
    },
    {
      title: "Anarchy Portrait — Framed",
      desc: "Airbrushed b&w portrait with anarchy symbol. Framed and ready to hang.",
      price: "£50",
      tag: "FOR SALE",
      tagColor: "#FFD600",
      img: img('portrait-anarchy.png'),
      href: "https://your-shopify-store.myshopify.com/products/anarchy-portrait",
      available: true,
    },
    {
      title: "Man Cave — Painted Saw",
      desc: "Hand-painted saw blade with caveman scene. Statement piece for any wall.",
      price: "£POA",
      tag: "FOR SALE",
      tagColor: "#FFD600",
      img: img('mancave-saw.png'),
      href: "https://your-shopify-store.myshopify.com/products/mancave-saw",
      available: true,
    },
    {
      title: "Winged Eyeball — Skateboard Deck",
      desc: "Hand-painted penny board deck. Winged eyeball on teal. Wall art or ride it.",
      price: "£POA",
      tag: "FOR SALE",
      tagColor: "#00E5FF",
      img: img('skateboard-eyeball.png'),
      href: "https://your-shopify-store.myshopify.com/products/skateboard-deck",
      available: true,
    },
    {
      title: "Custom Street Sign Commission",
      desc: "Your character. Your words. Your sign. Bring the brief — PJ does the rest.",
      price: "From £150",
      tag: "COMMISSION",
      tagColor: "#FFD600",
      img: null,
      href: "#contact",
      available: true,
    },
    {
      title: "Painted Mirror Commission",
      desc: "Custom painted mirrors — pop art, portraits, vintage ads. Any size.",
      price: "Enquire",
      tag: "COMMISSION",
      tagColor: "#FFD600",
      img: img('coke-bettyboop-mirror.png'),
      href: "#contact",
      available: true,
    },
    {
      title: "Jason Voorhees — Skateboard Deck",
      desc: "Airbrushed Jason with screaming victims. Full board, wall-ready.",
      price: "£10",
      tag: "FOR SALE",
      tagColor: "#FF2D55",
      img: img('skateboard-jason.png'),
      href: "https://your-shopify-store.myshopify.com/products/jason-skateboard",
      available: true,
    },
    {
      title: "Dark Portrait — Red Drips Deck",
      desc: "Airbrushed dark portrait with blood-red drips. Full skateboard deck.",
      price: "£POA",
      tag: "FOR SALE",
      tagColor: "#FF2D55",
      img: img('skateboard-portrait-red.png'),
      href: "https://your-shopify-store.myshopify.com/products/portrait-red-deck",
      available: true,
    },
    {
      title: "Headache Tool — Painted Sledgehammer",
      desc: "\"One 5 Hit\" hand-painted sledgehammer. Fairground lettering, fully painted handle.",
      price: "£POA",
      tag: "FOR SALE",
      tagColor: "#FFD600",
      img: img('hammer-headache.png'),
      href: "https://your-shopify-store.myshopify.com/products/headache-hammer",
      available: true,
    },
    {
      title: "Live Event Booking",
      desc: "Book PJ to paint live at your event, venue, or brand activation.",
      price: "Enquire",
      tag: "BOOKING",
      tagColor: "#00E5FF",
      img: null,
      href: "#contact",
      available: true,
    },
  ]

  const process = [
    { n: "01", title: "The Brief",    desc: "Tell PJ what you want — size, concept, vibe. The more detail the better, but even a rough idea works." },
    { n: "02", title: "The Design",   desc: "PJ sketches up an initial concept for approval. You give feedback, it gets refined until it's exactly right." },
    { n: "03", title: "The Build",    desc: "Work begins. Progress shots shared throughout so you're never in the dark." },
    { n: "04", title: "The Handover", desc: "Finished, sealed, and ready to go. Shipping available for smaller pieces. Installation available locally." },
  ]

  return (
    <div className="app">

      {/* ── Navigation ── */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <img src={img('logo-blue.png')} alt="PJ Paintworks" className="nav-logo-icon" />
            <span className="nav-logo-text">PJ Paintworks</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="#shop" className="nav-link">Shop</a>
            <a href="#gallery" className="nav-link">Gallery</a>
            <a href="#contact" className="nav-cta">Commission a Piece <ArrowRight size={14} /></a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <HeroScene />
        <div className="hero-left">
          <h1 className="hero-title">
            Street<br />art<br /><span className="hero-accent">that hits.</span>
          </h1>
          <div className="hero-cta-wrap">
            <a href="#contact" className="hero-cta">Get a Commission <ArrowRight size={18} /></a>
            <a href="#shop" className="hero-cta-secondary">Browse the Shop</a>
          </div>
        </div>
        <div className="hero-right">
          <p className="hero-right-headline">Murals. Signs.<br />Canvas. Events.</p>
          <p className="hero-right-sub">One artist. One style.<br />No two pieces<br />ever the same.</p>
        </div>
      </section>

      {/* ── Ticker ── */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>

      {/* ── Services ── */}
      <section id="services" className="services">
        <div className="services-container">
          <motion.div className="services-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label">What PJ Does</p>
            <h2 className="services-title">The work</h2>
          </motion.div>
          <div className="services-list">
            {services.map((s, i) => (
              <motion.div key={i} className="service-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <div className="service-number">{s.number}</div>
                <div className="service-content">
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-description">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work Types Grid ── */}
      <section className="use-cases">
        <div className="use-cases-container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label">The Range</p>
            <h2 className="section-title">Walls. Canvas. Anything.</h2>
          </motion.div>
          <div className="use-cases-grid">
            {workTypes.map((u, i) => (
              <motion.div key={i} className="use-case-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}>
                <div className="use-case-icon"><u.icon size={22} strokeWidth={1.5} /></div>
                <h3 className="use-case-title">{u.title}</h3>
                <p className="use-case-desc">{u.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="cta-band">
        <div className="cta-band-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="cta-band-title">Got a wall that<br />needs a story?</h2>
            <p className="cta-band-sub">Murals, commissions, events — let's talk about what you've got in mind.</p>
            <a href="#contact" className="cta-band-btn">Start a Commission <ArrowRight size={18} /></a>
          </motion.div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="gallery">
        <div className="gallery-container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label">The Work</p>
            <h2 className="section-title">Recent pieces</h2>
          </motion.div>
          <div className="gallery-grid">
            {[
              { src: img('artwork-batman.png'),            alt: 'Batman STOP — Bring Coffee — custom painted street sign', large: true },
              { src: img('gas-stop-sign.png'),             alt: 'GAS FTN STOP — monster street sign' },
              { src: img('giveway-sign.png'),              alt: 'Fuck the Rules — painted give way road sign' },
              { src: img('skateboard-portrait-red.png'),   alt: 'Dark portrait with red drips — painted skateboard deck', large: true },
              { src: img('skateboard-jason.png'),          alt: 'Jason Voorhees — airbrushed skateboard deck' },
              { src: img('skateboard-eyeball.png'),        alt: 'Winged eyeball — hand-painted skateboard deck' },
              { src: img('hammer-headache.png'),           alt: 'One 5 Hit Headache Tool — painted sledgehammer' },
              { src: img('portrait-anarchy.png'),          alt: 'Airbrushed anarchy portrait — framed' },
              { src: img('mancave-saw.png'),               alt: 'Man Cave — hand-painted saw blade', large: true },
              { src: img('coke-bettyboop-mirror.png'),     alt: 'Coca-Cola x Betty Boop — painted mirror' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`gallery-item${item.large ? ' gallery-item--large' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
              </motion.div>
            ))}
          </div>
          <motion.p
            className="gallery-note"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            More work dropping regularly — follow <a href="https://instagram.com/pjpaintworks" target="_blank" rel="noopener noreferrer">@pjpaintworks</a> on Instagram
          </motion.p>
        </div>
      </section>

      {/* ── Shop ── */}
      <section id="shop" className="shop">
        <div className="shop-container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label">The Shop</p>
            <h2 className="section-title">Own a piece</h2>
            <p className="section-subtitle">Originals, commissions, and limited runs. Everything ships or can be collected.</p>
          </motion.div>
          <div className="shop-grid">
            {shopItems.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : '_self'}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`shop-card${!item.available ? ' shop-card--unavailable' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="shop-card-tag" style={{ '--tag-color': item.tagColor }}>
                  {item.tag}
                </div>
                {item.img ? (
                  <div className="shop-card-img">
                    <img src={item.img} alt={item.title} loading="lazy" />
                  </div>
                ) : (
                  <div className="shop-card-icon">
                    <ShoppingBag size={28} strokeWidth={1.5} />
                  </div>
                )}
                <h3 className="shop-card-title">{item.title}</h3>
                <p className="shop-card-desc">{item.desc}</p>
                <div className="shop-card-footer">
                  <span className="shop-card-price">{item.price}</span>
                  {item.available && item.href.startsWith('http') && (
                    <span className="shop-card-link">
                      View on Shopify <ExternalLink size={14} />
                    </span>
                  )}
                  {item.available && !item.href.startsWith('http') && (
                    <span className="shop-card-link">
                      Enquire <ArrowRight size={14} />
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
          <motion.div
            className="shop-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            <a href="https://your-shopify-store.myshopify.com" target="_blank" rel="noopener noreferrer" className="shop-all-btn">
              Browse Full Shop on Shopify <ExternalLink size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="process">
        <div className="process-container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label">How It Works</p>
            <h2 className="section-title">From idea to wall</h2>
          </motion.div>
          <div className="process-grid">
            {process.map((p, i) => (
              <motion.div key={i} className="process-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="process-number">{p.n}</div>
                <h3 className="process-title">{p.title}</h3>
                <p className="process-desc">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why PJ ── */}
      <section className="why-us">
        <div className="why-us-container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label">Why PJ Paintworks</p>
            <h2 className="section-title">Real art. Real artist.</h2>
          </motion.div>
          <div className="why-grid">
            {[
              { title: "Every piece is an original",    desc: "No prints. No reproductions. Every PJ Paintworks piece is a one-off original. That's what makes it worth owning." },
              { title: "The brief is just the start",   desc: "PJ takes your concept and elevates it. You'll get something better than what you described — that's the craft." },
              { title: "You see the progress",          desc: "Every commission gets regular updates. You're in the loop from sketch to sealer. No disappearing acts." },
              { title: "The style is instantly his",    desc: "There's a reason people commission PJ specifically. The style is recognisable. The quality is consistent. The results speak." },
            ].map((w, i) => (
              <motion.div key={i} className="why-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="why-dot" />
                <h3 className="why-title">{w.title}</h3>
                <p className="why-desc">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="scenarios">
        <div className="scenarios-container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label">What People Say</p>
            <h2 className="section-title">The reception</h2>
          </motion.div>
          <div className="scenarios-grid">
            {[
              {
                type: "Custom Street Sign",
                problem: "Wanted something completely unique for the garage — something that showed personality, not just décor you can buy anywhere.",
                built: "PJ took the Batman concept, ran with it, and came back with something that looks like it belongs in a gallery — or a villain's lair. Either works.",
                outcome: "Everyone asks where it's from.",
              },
              {
                type: "Mural Commission",
                problem: "We had a blank 8-metre wall in our venue and wanted it to feel like it belonged there. Not generic, not corporate — something with actual soul.",
                built: "PJ came in, took a brief of about 20 words, and delivered something that became the focal point of the entire space.",
                outcome: "Customers photograph it constantly.",
              },
              {
                type: "Helmet Artwork",
                problem: "Wanted a custom lid that matched the bike but also stood on its own as a piece. Not a transfer, not a vinyl wrap — actual paint.",
                built: "PJ spent time understanding the bike's colour story before touching the helmet. The result ties everything together perfectly.",
                outcome: "The best thing I own.",
              },
            ].map((s, i) => (
              <motion.div key={i} className="scenario-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="scenario-type">{s.type}</div>
                <div className="scenario-block">
                  <p className="scenario-label">The brief</p>
                  <p className="scenario-text">{s.problem}</p>
                </div>
                <div className="scenario-block">
                  <p className="scenario-label">What happened</p>
                  <p className="scenario-text">{s.built}</p>
                </div>
                <div className="scenario-outcome">{s.outcome}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="contact">
        <div className="contact-container">
          <motion.div className="contact-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label" style={{ color: '#666' }}>Get in Touch</p>
            <h2 className="contact-title">Start a commission</h2>
            <p className="contact-subtitle">Tell PJ what you're after. Every enquiry gets a personal reply — no autoresponders, no runaround.</p>
          </motion.div>
          <div className="contact-content">
            <motion.div className="contact-info" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="contact-item">
                <Phone size={20} />
                <a href="tel:+44000000000">Call directly</a>
              </div>
              <div className="contact-item">
                <Mail size={20} />
                <a href="mailto:pjpaintworks@gmail.com">pjpaintworks@gmail.com</a>
              </div>
              <div className="contact-turnaround">
                <Clock size={16} />
                Replies within 24 hours
              </div>
              <div className="contact-reassurance">
                <div className="reassurance-item"><ChevronRight size={14} /> Free initial consultation</div>
                <div className="reassurance-item"><ChevronRight size={14} /> Concept sketches before commitment</div>
                <div className="reassurance-item"><ChevronRight size={14} /> UK-wide — shipping on smaller pieces</div>
                <div className="reassurance-item"><ChevronRight size={14} /> Local installation available</div>
              </div>
              <div className="contact-social">
                <a href="https://instagram.com/pjpaintworks" target="_blank" rel="noopener noreferrer" className="social-link">
                  Instagram →
                </a>
              </div>
            </motion.div>
            <motion.div className="contact-form-container" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              {!formSubmitted ? (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" />
                    </div>
                    <div className="form-group">
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone (optional)" />
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email address" />
                  </div>
                  <div className="form-group">
                    <select name="projectType" value={formData.projectType} onChange={handleChange} required className={formData.projectType ? '' : 'select-placeholder'}>
                      <option value="" disabled>What are you after?</option>
                      <option value="Mural / large-scale wall">Mural / large-scale wall</option>
                      <option value="Custom street sign">Custom street sign</option>
                      <option value="Canvas commission">Canvas commission</option>
                      <option value="Helmet / vehicle artwork">Helmet / vehicle artwork</option>
                      <option value="Live event painting">Live event painting</option>
                      <option value="Portrait commission">Portrait commission</option>
                      <option value="Other / not sure yet">Other / not sure yet</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <select name="budget" value={formData.budget} onChange={handleChange} required className={formData.budget ? '' : 'select-placeholder'}>
                      <option value="" disabled>Budget range</option>
                      <option value="Under £150">Under £150</option>
                      <option value="£150 – £500">£150 – £500</option>
                      <option value="£500 – £1,500">£500 – £1,500</option>
                      <option value="£1,500 – £5,000">£1,500 – £5,000</option>
                      <option value="£5,000+">£5,000+</option>
                      <option value="Not sure yet">Not sure yet — happy to discuss</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="Tell PJ what you have in mind. The more detail the better — concept, size, colours, deadline, anything relevant." />
                  </div>
                  <button type="submit" className="form-submit" disabled={formLoading}>
                    {formLoading ? 'Sending…' : <><span>Send My Enquiry</span> <ArrowRight size={18} /></>}
                  </button>
                  {formError && (
                    <p className="form-error">Something went wrong. Email <a href="mailto:pjpaintworks@gmail.com">pjpaintworks@gmail.com</a> directly.</p>
                  )}
                </form>
              ) : (
                <motion.div className="form-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                  <CheckCircle2 size={48} />
                  <h3>Enquiry received</h3>
                  <p>PJ will get back to you personally within 24 hours. Let's make something sick.</p>
                  <button onClick={() => { setFormSubmitted(false); setFormData({ name: '', email: '', phone: '', projectType: '', budget: '', message: '' }) }} className="form-reset">
                    Send another message
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-container">
          <img src={img('logo-blue.png')} alt="PJ Paintworks" className="footer-logo-img" />
          <div className="footer-logo">PJ Paintworks</div>
          <p className="footer-text">© {new Date().getFullYear()} PJ Paintworks. Every piece an original.</p>
          <div className="footer-links">
            <a href="https://instagram.com/pjpaintworks" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://your-shopify-store.myshopify.com" target="_blank" rel="noopener noreferrer">Shop</a>
            <a href="#contact">Commission</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
