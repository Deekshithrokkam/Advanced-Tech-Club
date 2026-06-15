import { motion } from 'framer-motion'
import { BrainCircuit, Handshake, Star, Wrench } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useSiteContent } from '../context/SiteContentContext'

const ICONS = { Wrench, BrainCircuit, Handshake, Star }

export default function WhyJoin() {
  const { content } = useSiteContent()
  const { whyJoin } = content
  const [ref, visible] = useScrollReveal()

  return (
    <section className="relative section-padding bg-zinc-950 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(220,38,38,0.04)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label justify-center mb-4 block">
            <span className="w-4 h-px bg-red-600" />
            {whyJoin.eyebrow}
            <span className="w-4 h-px bg-red-600" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            {whyJoin.titlePrefix}{' '}
            <span className="text-red-600">{whyJoin.titleHighlight}</span>
            {whyJoin.titleSuffix && ` ${whyJoin.titleSuffix}`}
          </h2>
          <p className="text-zinc-500 mt-4 max-w-xl mx-auto text-base">
            {whyJoin.description}
          </p>
        </motion.div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyJoin.cards.map(({ icon, title, description, accent }, i) => {
            const Icon = ICONS[icon] ?? Wrench

            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative glass rounded-2xl p-6 cursor-default transition-all duration-500 hover:border-red-600/30 overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ boxShadow: 'inset 0 0 40px rgba(220,38,38,0.08), 0 0 40px rgba(220,38,38,0.12)' }}
                />

                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/0 to-transparent group-hover:via-red-600/60 transition-all duration-500" />

                <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center mb-5 group-hover:bg-red-600/20 group-hover:border-red-600/40 transition-all duration-300">
                  <Icon size={22} className="text-red-500" />
                </div>

                <h3 className="text-base font-bold text-white mb-3 group-hover:text-red-100 transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-5">
                  {description}
                </p>

                <div className="text-xs font-semibold text-red-600/70 group-hover:text-red-500 transition-colors tracking-wide">
                  {accent}
                </div>

                <svg className="absolute bottom-3 right-3 w-12 h-12 opacity-5 group-hover:opacity-10 transition-opacity" viewBox="0 0 48 48" fill="none">
                  <path d="M48 24 H32 L24 32 V48" stroke="#DC2626" strokeWidth="1" />
                  <circle cx="32" cy="24" r="2" fill="#DC2626" />
                  <circle cx="24" cy="32" r="2" fill="#DC2626" />
                </svg>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
