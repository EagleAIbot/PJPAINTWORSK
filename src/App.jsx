import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useAppStore } from './store/useAppStore'
import {
  ArrowRight, Mail, Phone, CheckCircle2, ChevronRight, Clock,
  ShoppingBag, ExternalLink, Brush, Building2, Frame, Layers,
  Palette, Sparkles, ImageIcon, Zap, Paperclip, Star,
} from 'lucide-react'
import HeroScene from './HeroScene'
import './App.css'

const BASE = import.meta.env.BASE_URL
const img  = (name) => `${BASE}images/${name}`

function App() {
  const [scrolled, setScrolled] = useState(false)

  // Commission form
  const [commData, setCommData]       = useState({ name: '', email: '', phone: '', message: '' })
  const [commFile, setCommFile]       = useState(null)
  const [commSubmitted, setCommSubmitted] = useState(false)
  const [commLoading, setCommLoading] = useState(false)
  const [commError, setCommError]     = useState(false)
  const fileRef = useRef(null)

  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

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

  // Commission form — uses FormData so files go through
  const handleCommSubmit = async (e) => {
    e.preventDefault()
    setCommLoading(true)
    setCommError(false)
    try {
      const fd = new FormData()
      fd.append('name',    commData.name)
      fd.append('email',   commData.email)
      fd.append('phone',   commData.phone)
      fd.append('message', commData.message)
      fd.append('_subject', `New Commission Enquiry from ${commData.name}`)
      if (commFile) fd.append('attachment', commFile)
      const res = await fetch('https://formsubmit.co/ajax/hello@pjpaintworks.co.uk', {
        method: 'POST',
        body: fd,
      })
      if (res.ok) setCommSubmitted(true)
      else setCommError(true)
    } catch {
      setCommError(true)
    } finally {
      setCommLoading(false)
    }
  }

  const handleCommChange = (e) => setCommData({ ...commData, [e.target.name]: e.target.value })

  const services = [
    { number: "01", title: "Murals & Large-Scale Walls",   description: "Got a blank wall that needs a statement piece? From side-of-building scale to commercial interiors, PJ brings walls to life with bold, original murals built to last." },
    { number: "02", title: "Custom Street Signs",          description: "One-off painted street signs blending pop culture, street art, and aerosol mastery. Every sign is different. Every sign is a one-off. Perfect gifts, perfect statement pieces." },
    { number: "03", title: "Canvas & Board Work",          description: "Original paintings on canvas and board — gallery-ready pieces you can hang, own, and live with. No prints. No reproductions. The real thing." },
    { number: "04", title: "Commissioned Pieces",          description: "Got something specific in mind? A character, a portrait, a concept? Bring the brief and PJ will bring it to life. Full consultation, regular updates, your vision executed." },
    { number: "05", title: "Vehicle & Helmet Artwork",     description: "Tanks, helmets, bodywork — custom airbrushed and hand-painted finishes on anything that moves. Each paint job is one-of-a-kind, built around the bike or the rider." },
    { number: "06", title: "Event & Live Painting",        description: "Book PJ to paint live at your event. Whether it's a festival, brand activation, or private party — watching the work happen in real time is an experience in itself." },
  ]

  const workTypes = [
    { icon: Building2, title: "Murals",       desc: "Large-scale wall art for commercial and residential spaces" },
    { icon: Frame,     title: "Canvas Work",  desc: "Original paintings — no prints, no reproductions" },
    { icon: Brush,     title: "Street Signs", desc: "Custom painted signs blending pop culture and street style" },
    { icon: Layers,    title: "Commissions",  desc: "Your idea. Your brief. PJ's execution." },
    { icon: Palette,   title: "Airbrushing",  desc: "Helmets, tanks, panels — precision airbrushed finishes" },
    { icon: Zap,       title: "Live Events",  desc: "Live painting at festivals, brand events, and private parties" },
    { icon: Sparkles,  title: "Pop Art",      desc: "Bold, saturated, iconic — pop art with a street edge" },
    { icon: ImageIcon, title: "Portraits",    desc: "Custom portrait pieces from photo reference or live sitting" },
  ]

  const tickerItems = [
    "Murals", "Aerosol Art", "Custom Commissions", "Street Signs", "Canvas Work",
    "Airbrushing", "Pop Art", "Graffiti", "Live Events", "One-of-a-kind", "Original Art",
    "Helmets", "Vehicle Art", "Portraits", "Bold. Raw. Real.",
  ]

  const shopItems = [
    {
      title: "Batman 'STOP — Bring Coffee' Sign",
      desc: "The original. Aerosol on metal road sign. Bold, funny, one of a kind.",
      price: "£295", tag: "SOLD", tagColor: "#888", sold: true,
      img: img('artwork-batman.png'), href: "#contact",
    },
    {
      title: "Pokémon Custom Sign",
      desc: "Custom-painted Pokémon street sign. One off original, aerosol on metal.",
      price: "£295", tag: "SOLD", tagColor: "#888", sold: true,
      img: null, href: "#contact",
    },
    {
      title: "Fuck the Rules — Give Way Sign",
      desc: "Painted give way road sign. Eagle, smiley, spider webs, rusted vibes.",
      price: "£600", tag: "SOLD", tagColor: "#888", sold: true,
      img: img('giveway-sign.png'), href: "#contact",
    },
    {
      title: "GAS FTN STOP — Monster Sign",
      desc: "Painted metal stop sign with Rat Fink-style monster. Aged, raw, seriously cool.",
      price: "£250", tag: "FOR SALE", tagColor: "#FF2D55", sold: false,
      img: img('gas-stop-sign.png'), href: "#commission",
    },
    {
      title: "Man Cave — Painted Saw",
      desc: "Hand-painted saw blade with caveman scene. Statement piece for any wall.",
      price: "£POA", tag: "FOR SALE", tagColor: "#FF2D55", sold: false,
      img: img('mancave-saw.png'), href: "#commission",
    },
    {
      title: "Winged Eyeball — Skateboard Deck",
      desc: "Hand-painted penny board deck. Winged eyeball on teal. Wall art or ride it.",
      price: "£POA", tag: "FOR SALE", tagColor: "#FF2D55", sold: false,
      img: img('skateboard-eyeball.png'), href: "#commission",
    },
    {
      title: "Dark Portrait — Red Drips Deck",
      desc: "Airbrushed dark portrait with blood-red drips. Full skateboard deck.",
      price: "£POA", tag: "FOR SALE", tagColor: "#FF2D55", sold: false,
      img: img('skateboard-portrait-red.png'), href: "#commission",
    },
    {
      title: "Jason Voorhees — Skateboard Deck",
      desc: "Airbrushed Jason with screaming victims. Full board, wall-ready.",
      price: "£10", tag: "FOR SALE", tagColor: "#FF2D55", sold: false,
      img: img('skateboard-jason.png'), href: "#commission",
    },
    {
      title: "Headache Tool — Painted Sledgehammer",
      desc: '"One 5 Hit" hand-painted sledgehammer. Fairground lettering, fully painted handle.',
      price: "£POA", tag: "FOR SALE", tagColor: "#C9A96E", sold: false,
      img: img('hammer-headache.png'), href: "#commission",
    },
    {
      title: "Custom Street Sign Commission",
      desc: "Your character. Your words. Your sign. Bring the brief — PJ does the rest.",
      price: "From £150", tag: "COMMISSION", tagColor: "#C9A96E", sold: false,
      img: null, href: "#commission",
    },
    {
      title: "Painted Mirror Commission",
      desc: "Custom painted mirrors — pop art, portraits, vintage ads. Any size.",
      price: "Enquire", tag: "COMMISSION", tagColor: "#C9A96E", sold: false,
      img: img('coke-bettyboop-mirror.png'), href: "#commission",
    },
    {
      title: "Live Event Booking",
      desc: "Book PJ to paint live at your event, venue, or brand activation.",
      price: "Enquire", tag: "BOOKING", tagColor: "#C9A96E", sold: false,
      img: null, href: "#commission",
    },
  ]

  const reviews = [
    { name: "Dave T.", type: "Custom Sign", stars: 5, text: "Absolutely unreal. Ordered a custom Batman sign for my garage and it's the first thing everyone talks about when they come round. PJ nailed it." },
    { name: "Sarah M.", type: "Mural Commission", stars: 5, text: "We had a blank wall in our bar that needed something special. PJ delivered beyond anything we imagined — customers photograph it every single night." },
    { name: "Kyle R.", type: "Skateboard Deck", stars: 5, text: "Got a custom deck done for my dad's birthday. The detail on it is insane — looks like something you'd find in a proper gallery. Couldn't be happier." },
    { name: "Jess H.", type: "Portrait Piece", stars: 5, text: "Had a portrait done as a gift. PJ kept me updated throughout, the likeness is spot on, and the style is completely his own. Brilliant." },
    { name: "Andy P.", type: "Helmet Artwork", stars: 5, text: "Best money I've spent on the bike. The helmet ties everything together perfectly. Proper craftsmanship — not a sticker or a vinyl wrap in sight." },
    { name: "Tom W.", type: "Give Way Sign", stars: 5, text: "Picked up the Give Way sign from Old Iron Chop Shop. Insane piece of work — the detail up close is even better than the photos suggest." },
    { name: "Rachael B.", type: "Canvas Work", stars: 5, text: "Commissioned a canvas for the living room. It's bold, it's original, and it's genuinely the best thing on any wall in the house." },
  ]

  const process = [
    { n: "01", title: "The Brief",    desc: "Tell PJ what you want — size, concept, vibe. The more detail the better, but even a rough idea works." },
    { n: "02", title: "The Design",   desc: "PJ sketches up an initial concept for approval. You give feedback, it gets refined until it's exactly right." },
    { n: "03", title: "The Build",    desc: "Work begins. Progress shots shared throughout so you're never in the dark." },
    { n: "04", title: "The Handover", desc: "Finished, sealed, and ready to go. Shipping available for smaller pieces. Installation available locally." },
  ]

  return (
    <div className="app">

      {/* ── Nav ── */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}${menuOpen ? ' nav--open' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <img src={img('logo-blue.png')} alt="PJ Paintworks" className="nav-logo-icon" />
            <span className="nav-logo-text">PJ Paintworks</span>
          </div>
          {/* Desktop links */}
          <div className="nav-links-desktop">
            <a href="#about"      className="nav-link">About</a>
            <a href="#shop"       className="nav-link">Shop</a>
            <a href="#gallery"    className="nav-link">Gallery</a>
            <a href="#commission" className="nav-cta">Commission a Piece <ArrowRight size={14} /></a>
          </div>
          {/* Hamburger */}
          <button className={`hamburger${menuOpen ? ' hamburger--open' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
        {/* Mobile nav overlay */}
        {menuOpen && (
          <div className="mobile-nav">
            <a href="#about"      className="mobile-nav-link" onClick={closeMenu}>About</a>
            <a href="#shop"       className="mobile-nav-link" onClick={closeMenu}>Shop</a>
            <a href="#gallery"    className="mobile-nav-link" onClick={closeMenu}>Gallery</a>
            <a href="#services"   className="mobile-nav-link" onClick={closeMenu}>Services</a>
            <a href="#commission" className="mobile-nav-cta"  onClick={closeMenu}>Commission a Piece <ArrowRight size={16} /></a>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <HeroScene />
        <div className="hero-left">
          <h1 className="hero-title">
            Street<br />art<br /><span className="hero-accent">that hits.</span>
          </h1>
          <div className="hero-cta-wrap">
            <a href="#commission" className="hero-cta">Get a Commission <ArrowRight size={18} /></a>
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

      {/* ── About ── */}
      <section id="about" className="about">
        <div className="about-container">
          <motion.div className="about-content" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="about-text">
              <p className="section-label">About</p>
              <h2 className="about-title">25 years of art<br />on skin and beyond.</h2>
              <div className="about-body">
                <p>PJ has always had an eye for art. What started as a passion for drawing eventually found its place in tattooing, and for more than 25 years he has been turning ideas into permanent works of art on skin. Throughout his career he has worked in a number of studios, learning, evolving and sharpening his craft along the way, before eventually opening his own studio, Rising Phoenix.</p>
                <p>There he built a large and loyal client base, with people returning time and time again for his distinctive style and artistic approach. For PJ, tattooing has never just been a job — it's been a way to bring people's ideas to life. Every piece begins with a conversation, an idea, or even just a feeling, and through his art he transforms it into something personal and lasting.</p>
                <p>But his creativity doesn't stop at the tattoo chair. With a constant drive to create, PJ began exploring artwork beyond skin — canvas, prints, and custom designs. It quickly became clear there was a growing demand for his artwork outside the studio.</p>
                <p>That passion has now grown into PJ Paintworks, an online art shop where PJ can let his creativity run free. From custom artwork to unique pieces, it's a space where his imagination can move beyond the tattoo machine and onto new surfaces — bringing the same passion, detail and individuality to every piece he creates.</p>
              </div>
              <div className="about-links">
                <a href="#commission" className="about-cta">Commission a piece <ArrowRight size={16} /></a>
                <a href="https://www.risingphoenixtattoo.co.uk" target="_blank" rel="noopener noreferrer" className="about-studio">Visit Rising Phoenix Tattoo →</a>
              </div>
            </div>
            <div className="about-logo">
              <img src={img('logo-gold.png')} alt="PJ Paintworks" />
            </div>
          </motion.div>
        </div>
      </section>

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

      {/* ── Work Types ── */}
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
            <a href="#commission" className="cta-band-btn">Start a Commission <ArrowRight size={18} /></a>
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
              { src: img('artwork-batman.png'),          alt: 'Batman STOP — Bring Coffee sign',              large: true },
              { src: img('gas-stop-sign.png'),           alt: 'GAS FTN STOP — monster street sign' },
              { src: img('giveway-sign.png'),            alt: 'Fuck the Rules — painted give way road sign' },
              { src: img('skateboard-portrait-red.png'), alt: 'Dark portrait — red drips skateboard deck',    large: true },
              { src: img('skateboard-jason.png'),        alt: 'Jason Voorhees — airbrushed skateboard deck' },
              { src: img('skateboard-eyeball.png'),      alt: 'Winged eyeball — hand-painted skateboard deck' },
              { src: img('hammer-headache.png'),         alt: 'One 5 Hit Headache Tool — painted sledgehammer' },
              { src: img('portrait-anarchy.png'),        alt: 'Airbrushed anarchy portrait — framed' },
              { src: img('mancave-saw.png'),             alt: 'Man Cave — hand-painted saw blade',            large: true },
              { src: img('coke-bettyboop-mirror.png'),   alt: 'Coca-Cola x Betty Boop — painted mirror' },
            ].map((item, i) => (
              <motion.div key={i} className={`gallery-item${item.large ? ' gallery-item--large' : ''}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}>
                <img src={item.src} alt={item.alt} loading="lazy" />
              </motion.div>
            ))}
          </div>
          <motion.p className="gallery-note"
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
              <motion.a key={i} href={item.href}
                className={`shop-card${item.sold ? ' shop-card--sold' : ''}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 6) * 0.07 }}>
                <div className="shop-card-tag" style={{ '--tag-color': item.tagColor }}>{item.tag}</div>
                {item.img ? (
                  <div className="shop-card-img">
                    <img src={item.img} alt={item.title} loading="lazy" />
                    {item.sold && <div className="shop-card-sold-overlay">SOLD</div>}
                  </div>
                ) : (
                  <div className="shop-card-icon"><ShoppingBag size={28} strokeWidth={1.5} /></div>
                )}
                <h3 className="shop-card-title">{item.title}</h3>
                <p className="shop-card-desc">{item.desc}</p>
                <div className="shop-card-footer">
                  <span className="shop-card-price" style={item.sold ? { textDecoration: 'line-through', opacity: 0.5 } : {}}>{item.price}</span>
                  {!item.sold && (
                    <span className="shop-card-link">
                      {item.tag === 'COMMISSION' || item.tag === 'BOOKING' ? <>Enquire <ArrowRight size={14} /></> : <>Buy / Enquire <ArrowRight size={14} /></>}
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
          <motion.div className="shop-cta"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
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

      {/* ── Commission Enquiry ── */}
      <section id="commission" className="contact">
        <div className="contact-container">
          <motion.div className="contact-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label" style={{ color: '#666' }}>Commission Enquiries</p>
            <h2 className="contact-title">Let's make something.</h2>
            <p className="contact-subtitle">Tell PJ what you're after. Every enquiry gets a personal reply — no autoresponders, no runaround. Got reference images? Attach them below.</p>
          </motion.div>
          <div className="contact-content">
            <motion.div className="contact-info" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="contact-item">
                <Phone size={20} />
                <a href="tel:+44000000000">Call directly</a>
              </div>
              <div className="contact-item">
                <Mail size={20} />
                <a href="mailto:hello@pjpaintworks.co.uk">hello@pjpaintworks.co.uk</a>
              </div>
              <div className="contact-turnaround">
                <Clock size={16} />
                Replies within 24 hours
              </div>
              <div className="contact-reassurance">
                <div className="reassurance-item"><ChevronRight size={14} /> Free initial consultation</div>
                <div className="reassurance-item"><ChevronRight size={14} /> Concept sketches before commitment</div>
                <div className="reassurance-item"><ChevronRight size={14} /> UK-wide — shipping on smaller pieces</div>
                <div className="reassurance-item"><ChevronRight size={14} /> Local collection / installation available</div>
              </div>
              <div className="contact-social">
                <a href="https://instagram.com/pjpaintworks" target="_blank" rel="noopener noreferrer" className="social-link">Instagram →</a>
                <a href="https://www.risingphoenixtattoo.co.uk" target="_blank" rel="noopener noreferrer" className="social-link">Rising Phoenix Tattoo →</a>
              </div>
            </motion.div>
            <motion.div className="contact-form-container" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              {!commSubmitted ? (
                <form className="contact-form" onSubmit={handleCommSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="text" name="name" value={commData.name} onChange={handleCommChange} required placeholder="Your name" />
                    </div>
                    <div className="form-group">
                      <input type="tel" name="phone" value={commData.phone} onChange={handleCommChange} required placeholder="Phone number" />
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" value={commData.email} onChange={handleCommChange} required placeholder="Email address" />
                  </div>
                  <div className="form-group">
                    <textarea name="message" value={commData.message} onChange={handleCommChange} rows="6" required
                      placeholder="Describe your idea — what do you want, what size, what style, any reference points, timescale, budget. The more detail the better." />
                  </div>
                  {/* File attachment */}
                  <div className="form-group">
                    <label className="file-label" onClick={() => fileRef.current?.click()}>
                      <Paperclip size={16} />
                      {commFile ? commFile.name : 'Attach reference images (optional)'}
                    </label>
                    <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
                      onChange={(e) => setCommFile(e.target.files[0] || null)} />
                    {commFile && (
                      <button type="button" className="file-remove" onClick={() => { setCommFile(null); fileRef.current.value = '' }}>
                        Remove ×
                      </button>
                    )}
                  </div>
                  <button type="submit" className="form-submit" disabled={commLoading}>
                    {commLoading ? 'Sending…' : <><span>Send My Enquiry</span> <ArrowRight size={18} /></>}
                  </button>
                  {commError && (
                    <p className="form-error">Something went wrong. Email <a href="mailto:hello@pjpaintworks.co.uk">hello@pjpaintworks.co.uk</a> directly.</p>
                  )}
                </form>
              ) : (
                <motion.div className="form-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                  <CheckCircle2 size={48} />
                  <h3>Enquiry received</h3>
                  <p>PJ will get back to you personally within 24 hours. Let's make something sick.</p>
                  <button onClick={() => { setCommSubmitted(false); setCommData({ name: '', email: '', phone: '', message: '' }); setCommFile(null) }} className="form-reset">
                    Send another message
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact / Support ── */}
      <section id="contact" className="support-section">
        <div className="support-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="section-label">Support</p>
            <h2 className="support-title">Got a question?</h2>
            <p className="support-sub">For order queries, delivery questions, or anything else — drop us a message and we'll get back to you promptly.</p>
            <div className="support-links">
              <a href="mailto:hello@pjpaintworks.co.uk" className="support-email">
                <Mail size={18} /> hello@pjpaintworks.co.uk
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Reviews Slider ── */}
      <section className="reviews-section">
        <div className="reviews-header-wrap">
          <p className="section-label" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>What People Say</p>
          <h2 className="reviews-title">The reception</h2>
        </div>
        <div className="reviews-ticker-wrap">
          <div className="reviews-ticker-track">
            {[...reviews, ...reviews].map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-stars">{'★'.repeat(r.stars)}</div>
                <p className="review-text">"{r.text}"</p>
                <div className="review-author">
                  <span className="review-name">{r.name}</span>
                  <span className="review-type">{r.type}</span>
                </div>
              </div>
            ))}
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
            <a href="#about">About</a>
            <a href="#shop">Shop</a>
            <a href="#gallery">Gallery</a>
            <a href="#commission">Commission</a>
            <a href="https://instagram.com/pjpaintworks" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.risingphoenixtattoo.co.uk" target="_blank" rel="noopener noreferrer">Rising Phoenix Tattoo</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
