import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'

const ATCLogo = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-10 h-10 rounded-full object-cover"
    style={{ filter: 'drop-shadow(0 0 6px rgba(220,38,38,0.5))' }}
  />
)

export default function Navbar() {
  const { content } = useSiteContent()
  const { brand, hero, nav } = content
  const navLinks = nav.links
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      // Track active section
      const sections = navLinks.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [navLinks])

  const handleNav = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-zinc-950/80 backdrop-blur-2xl border-b border-white/[0.04]'
            : 'py-5 bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="focus-ring"
            aria-label="Back to top"
          >
            <ATCLogo src={brand.logo} alt={brand.name} />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => {
              const id = href.slice(1)
              return (
                <button
                  key={href}
                  onClick={() => handleNav(href)}
                  className={`relative px-3.5 py-2 text-xs font-medium tracking-wide uppercase transition-colors duration-200 rounded-md focus-ring
                    ${activeSection === id
                      ? 'text-red-500'
                      : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  {label}
                  {activeSection === id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500"
                    />
                  )}
                </button>
              )
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => handleNav('#contact')}
              className="hidden sm:inline-flex btn-primary text-xs"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Zap size={13} />
              {hero.secondaryButton}
            </motion.button>

            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors focus-ring"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-[4.5rem] bg-zinc-950/95 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col gap-1 px-5 py-6">
              {navLinks.map(({ label, href }, i) => (
                <motion.button
                  key={href}
                  onClick={() => handleNav(href)}
                  className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-left text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/[0.06]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {label}
                  <span className="text-zinc-700 text-xs">→</span>
                </motion.button>
              ))}
              <motion.button
                onClick={() => handleNav('#contact')}
                className="mt-4 btn-primary justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Zap size={14} />
                Join {brand.name}
              </motion.button>
            </div>

            {/* Decorative bottom border */}
            <div className="h-px mx-5 bg-gradient-to-r from-transparent via-red-900/40 to-transparent mt-auto mb-8" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
