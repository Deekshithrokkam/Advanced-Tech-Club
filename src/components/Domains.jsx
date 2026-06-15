import { motion } from 'framer-motion'
import { ArrowRight, Bot, Wifi } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useSiteContent } from '../context/SiteContentContext'

const ICONS = { Bot, Wifi }

const TechGrid = ({ color }) => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 400 300" fill="none" preserveAspectRatio="xMidYMid slice">
    {Array.from({ length: 7 }).map((_, i) => (
      <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="300" stroke={color} strokeWidth="0.5" />
    ))}
    {Array.from({ length: 6 }).map((_, i) => (
      <line key={`h${i}`} x1="0" y1={i * 60} x2="400" y2={i * 60} stroke={color} strokeWidth="0.5" />
    ))}
    {[[60, 60], [180, 120], [300, 60], [120, 180], [240, 240], [360, 180]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="3" fill={color} />
    ))}
  </svg>
)

export default function Domains() {
  const { content } = useSiteContent()
  const { domains } = content
  const [ref, visible] = useScrollReveal()

  return (
    <section id="domains" className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #09090B 0%, #0f0f10 50%, #09090B 100%)' }}
    >
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
            {domains.eyebrow}
            <span className="w-4 h-px bg-red-600" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            {domains.titlePrefix}{' '}
            <span className="text-red-600">{domains.titleHighlight}</span>
            {domains.titleSuffix && ` ${domains.titleSuffix}`}
          </h2>
          <p className="text-zinc-500 mt-4 max-w-xl mx-auto">
            {domains.description}
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 gap-6">
          {domains.items.map(({ icon, label, title, subtitle, description, features, color }, i) => {
            const Icon = ICONS[icon] ?? Bot

            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative glass rounded-3xl p-8 overflow-hidden cursor-default transition-all duration-500"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                whileHover={{ y: -4 }}
              >
                <TechGrid color={color} />

                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, ${color}80, ${color}, ${color}40)` }}
                />

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
                  style={{ boxShadow: `0 0 80px ${color}20, inset 0 0 40px ${color}08` }}
                />

                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                  >
                    <Icon size={26} style={{ color }} />
                  </div>
                  <span
                    className="text-xs font-mono tracking-widest font-medium"
                    style={{ color: `${color}80` }}
                  >
                    {label}
                  </span>
                </div>

                <div className="relative z-10 mb-4">
                  <h3 className="text-3xl font-black text-white mb-1">{title}</h3>
                  <p className="text-sm font-medium" style={{ color }}>{subtitle}</p>
                </div>

                <p className="text-sm text-zinc-500 leading-relaxed mb-6 relative z-10">
                  {description}
                </p>

                <div className="relative z-10 flex flex-wrap gap-2">
                  {features.map(feature => (
                    <span
                      key={feature}
                      className="text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300"
                      style={{
                        background: `${color}0f`,
                        border: `1px solid ${color}20`,
                        color: `${color}cc`,
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="relative z-10 mt-6 pt-5 border-t border-white/[0.04]">
                  <button
                    onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 text-xs font-semibold transition-all duration-300 group-hover:gap-3"
                    style={{ color }}
                  >
                    {domains.ctaLabel}
                    <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
