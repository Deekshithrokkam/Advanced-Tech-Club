import { motion } from 'framer-motion'
import { useSiteContent } from '../context/SiteContentContext'

const QuoteMark = () => (
  <svg className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-20 h-20 opacity-[0.07]" viewBox="0 0 80 80" fill="none">
    <path d="M10 50 C10 30 22 15 40 10 L44 18 C32 22 26 32 26 42 L36 42 L36 70 L10 70 Z" fill="#DC2626" />
    <path d="M46 50 C46 30 58 15 76 10 L80 18 C68 22 62 32 62 42 L72 42 L72 70 L46 70 Z" fill="#DC2626" />
  </svg>
)

export default function Vision() {
  const { content } = useSiteContent()
  const { vision } = content

  return (
    <section
      id="vision"
      className="relative overflow-hidden"
      style={{
        padding: '8rem 0',
        background: 'linear-gradient(180deg, #09090B 0%, #0f0008 40%, #09090B 100%)',
      }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(220,38,38,0.07) 0%, transparent 70%)',
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(220,38,38,0.12) 0%, transparent 70%)',
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(220,38,38,0.07) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 circuit-grid opacity-15" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-900/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-900/40 to-transparent" />

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-red-600/30"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="section-label justify-center">
            <span className="w-4 h-px bg-red-600" />
            {vision.eyebrow}
            <span className="w-4 h-px bg-red-600" />
          </span>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <QuoteMark />

          <p
            className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-[1.25] mb-8 text-balance"
            style={{ textShadow: '0 0 60px rgba(220,38,38,0.15)' }}
          >
            {vision.quoteStart}{' '}
            <span className="text-red-600">{vision.quoteHighlight}</span>{' '}
            {vision.quoteEnd}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-600/50" />
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-600 font-medium">
              {vision.attribution}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-600/50" />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {vision.coreValues.map((value, i) => (
              <motion.span
                key={value}
                className="text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(220,38,38,0.08)',
                  border: '1px solid rgba(220,38,38,0.18)',
                  color: 'rgba(220,38,38,0.8)',
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.07 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(220,38,38,0.4)' }}
              >
                {value}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
