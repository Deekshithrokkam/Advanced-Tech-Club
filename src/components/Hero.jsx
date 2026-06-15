import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Zap, ChevronDown } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'

// Animated circuit board SVG overlay
const CircuitBoard = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    viewBox="0 0 1400 900"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(220,38,38,0.15)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>

    {/* Background center glow */}
    <rect width="1400" height="900" fill="url(#centerGlow)" />

    {/* Main horizontal rails */}
    {[180, 300, 450, 600, 750].map((y, i) => (
      <motion.path
        key={`h-${i}`}
        d={`M0 ${y} H${i % 2 === 0 ? 400 : 200} L${i % 2 === 0 ? 440 : 240} ${y + 40} H${i % 2 === 0 ? 960 : 1160} L${i % 2 === 0 ? 1000 : 1200} ${y} H1400`}
        stroke={i % 2 === 0 ? '#DC2626' : '#991B1B'}
        strokeWidth={i === 2 ? 1.5 : 0.8}
        strokeDasharray="1400"
        strokeDashoffset="1400"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2 + i * 0.3, delay: 0.2 + i * 0.15, ease: 'easeInOut', repeat: Infinity, repeatDelay: 6 }}
        opacity="0.4"
      />
    ))}

    {/* Vertical connectors */}
    {[200, 400, 700, 1000, 1200].map((x, i) => (
      <motion.line
        key={`v-${i}`}
        x1={x} y1="0" x2={x} y2="900"
        stroke="#DC2626"
        strokeWidth="0.5"
        strokeDasharray="900"
        strokeDashoffset="900"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.5, delay: 0.5 + i * 0.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 5 }}
        opacity="0.15"
      />
    ))}

    {/* Circuit nodes */}
    {[
      [200,180],[400,300],[700,180],[1000,300],[1200,450],
      [200,600],[400,450],[700,600],[1000,450],[1200,300],
      [400,750],[700,750],[1000,600],
    ].map(([cx, cy], i) => (
      <motion.circle
        key={`node-${i}`}
        cx={cx} cy={cy} r="3"
        fill="#DC2626"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 0.8, 0.3, 0.8], scale: [0, 1, 0.8, 1] }}
        transition={{ duration: 0.5, delay: 0.8 + i * 0.08, repeat: Infinity, repeatDelay: 5 }}
      />
    ))}

    {/* IC-style component blocks */}
    {[[580, 360, 240, 180], [100, 200, 120, 80], [1100, 600, 120, 80]].map(([x, y, w, h], i) => (
      <motion.rect
        key={`ic-${i}`}
        x={x} y={y} width={w} height={h} rx="4"
        stroke={i === 0 ? '#DC2626' : '#7F1D1D'}
        strokeWidth={i === 0 ? 1.5 : 0.8}
        fill={i === 0 ? 'rgba(220,38,38,0.04)' : 'transparent'}
        initial={{ opacity: 0 }}
        animate={{ opacity: i === 0 ? 0.7 : 0.3 }}
        transition={{ delay: 1.2 + i * 0.2 }}
      />
    ))}
  </svg>
)

// Floating robot/IoT orb visual
const HeroOrb = ({ logo, name }) => (
  <motion.div
    className="relative w-64 h-64 md:w-80 md:h-80 animate-float"
    style={{ animationDelay: '0s' }}
  >
    {/* Outer ring SVG */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320" fill="none">
      <motion.circle
        cx="160" cy="160" r="150"
        stroke="url(#ringGrad)"
        strokeWidth="1"
        strokeDasharray="12 8"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '160px 160px' }}
      />
      <motion.circle
        cx="160" cy="160" r="120"
        stroke="url(#ringGrad)"
        strokeWidth="0.5"
        strokeDasharray="6 14"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '160px 160px' }}
      />
      {/* Orbiting nodes */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x = 160 + 120 * Math.cos(rad)
        const y = 160 + 120 * Math.sin(rad)
        return (
          <motion.circle
            key={i} cx={x} cy={y} r="4"
            fill="#DC2626"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
          />
        )
      })}
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#991B1B" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#DC2626" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>

    {/* ATC Logo in center */}
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.img
        src={logo}
        alt={name}
        className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover"
        style={{
          boxShadow: '0 0 40px rgba(220,38,38,0.5), 0 0 80px rgba(220,38,38,0.2)',
          border: '2px solid rgba(220,38,38,0.4)',
        }}
        animate={{ boxShadow: [
          '0 0 30px rgba(220,38,38,0.4), 0 0 60px rgba(220,38,38,0.15)',
          '0 0 50px rgba(220,38,38,0.7), 0 0 100px rgba(220,38,38,0.3)',
          '0 0 30px rgba(220,38,38,0.4), 0 0 60px rgba(220,38,38,0.15)',
        ]}}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>

    {/* Glow effect under orb */}
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-10 blur-2xl rounded-full"
      style={{ background: 'rgba(220,38,38,0.3)' }}
    />
  </motion.div>
)

export default function Hero() {
  const { content } = useSiteContent()
  const { brand, hero } = content
  const containerRef = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 120])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  const scrollToEvents = () => {
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950"
    >
      {/* Animated circuit board */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <CircuitBoard />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 circuit-grid opacity-30" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(220,38,38,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent" />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-5 max-w-5xl mx-auto pt-24"
        style={{ opacity }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <span className="section-label">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {hero.eyebrow}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.06em] text-white mb-6"
          style={{ textShadow: '0 0 80px rgba(220,38,38,0.25)' }}
        >
          {hero.titleLine1}<br />
          <span className="text-red-600 text-glow-red">{hero.titleLine2}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-zinc-400 font-light tracking-wide mb-4 max-w-xl"
        >
          {hero.tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm md:text-base text-zinc-500 max-w-2xl mb-12 leading-relaxed"
        >
          {hero.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center mb-16"
        >
          <motion.button
            onClick={scrollToEvents}
            className="btn-primary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {hero.primaryButton}
            <ArrowRight size={16} />
          </motion.button>
          <motion.button
            onClick={scrollToContact}
            className="btn-secondary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Zap size={15} />
            {hero.secondaryButton}
          </motion.button>
        </motion.div>

        {/* Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroOrb logo={brand.logo} name={brand.name} />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 hover:text-red-500 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ y: 3 }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">{hero.scrollLabel}</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  )
}
