import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useSiteContent } from '../context/SiteContentContext'

function PlaceholderImage({ item, onClick }) {
  const aspectMap = { tall: '2/3', wide: '3/2', square: '1/1' }
  const [imgStatus, setImgStatus] = useState(item.src ? 'loading' : 'no-src')

  const handleLoad = () => setImgStatus('loaded')
  const handleError = () => setImgStatus('error')

  return (
    <motion.div
      className="masonry-item group relative cursor-pointer overflow-hidden rounded-xl"
      style={{ aspectRatio: aspectMap[item.aspect] ?? '1/1' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(item)}
    >
      {item.src && imgStatus !== 'error' ? (
        <img
          src={item.src}
          alt={item.label}
          className="w-full h-full object-cover block"
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 30% 30%, rgba(${item.hue},0.4) 0%, transparent 60%),
                linear-gradient(135deg, rgba(${item.hue},0.15) 0%, rgba(9,9,11,0.9) 100%)
              `,
            }}
          />

          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 200" fill="none" preserveAspectRatio="xMidYMid slice">
            <path d="M0 100 H60 L80 80 H120 L140 100 H200" stroke={`rgb(${item.hue})`} strokeWidth="0.8" />
            <path d="M100 0 V60 L120 80 V120 L100 140 V200" stroke={`rgb(${item.hue})`} strokeWidth="0.8" />
            <circle cx="60" cy="100" r="3" fill={`rgb(${item.hue})`} />
            <circle cx="140" cy="100" r="3" fill={`rgb(${item.hue})`} />
            <circle cx="100" cy="60" r="3" fill={`rgb(${item.hue})`} />
            <circle cx="100" cy="140" r="3" fill={`rgb(${item.hue})`} />
            <rect x="75" y="75" width="50" height="50" rx="2" stroke={`rgb(${item.hue})`} strokeWidth="0.5" fill="none" />
          </svg>
        </>
      )}

      {(!item.src || imgStatus === 'error') && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-xs font-semibold text-center px-3"
            style={{ color: `rgba(${item.hue},0.9)`, textShadow: `0 0 20px rgba(${item.hue},0.5)` }}
          >
            {item.label}
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: `rgba(${item.hue},0.2)`, border: `1px solid rgba(${item.hue},0.4)` }}
        >
          <ZoomIn size={16} style={{ color: `rgb(${item.hue})` }} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-xs text-white font-medium">{item.label}</p>
      </div>
    </motion.div>
  )
}

function Lightbox({ item, attribution, onClose }) {
  if (!item) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

        <motion.div
          className="relative z-10 max-w-2xl w-full rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          onClick={event => event.stopPropagation()}
        >
          <div
            className="w-full"
            style={{
              aspectRatio: item.aspect === 'tall' ? '2/3' : item.aspect === 'wide' ? '16/9' : '1/1',
            }}
          >
            {item.src ? (
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(ellipse at 30% 30%, rgba(${item.hue},0.5) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(${item.hue},0.2) 0%, #09090B 100%)
                  `,
                }}
              >
                <span className="text-lg font-bold" style={{ color: `rgb(${item.hue})` }}>
                  {item.label}
                </span>
              </div>
            )}
          </div>

          <div className="glass px-5 py-4 flex items-center justify-between"
            style={{ background: 'rgba(9,9,11,0.9)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="text-xs text-zinc-600 mt-0.5">{attribution}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Gallery() {
  const { content } = useSiteContent()
  const { gallery } = content
  const [selected, setSelected] = useState(null)
  const [ref, visible] = useScrollReveal()

  return (
    <>
      <section id="gallery" className="relative section-padding bg-zinc-950 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label justify-center mb-4 block">
              <span className="w-4 h-px bg-red-600" />
              {gallery.eyebrow}
              <span className="w-4 h-px bg-red-600" />
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              {gallery.titlePrefix}{' '}
              <span className="text-red-600">{gallery.titleHighlight}</span>
              {gallery.titleSuffix && ` ${gallery.titleSuffix}`}
            </h2>
            <p className="text-zinc-500 max-w-lg mx-auto text-base">
              {gallery.description}
            </p>
          </motion.div>

          <motion.div
            ref={ref}
            className="masonry-grid"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ duration: 0.25 }}
          >
            {gallery.items.map((item, i) => (
              <motion.div
                key={item.id || item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <PlaceholderImage item={item} onClick={setSelected} />
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-center text-zinc-700 text-xs mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            {gallery.note}
          </motion.p>
        </div>
      </section>

      {selected && <Lightbox item={selected} attribution={gallery.attribution} onClose={() => setSelected(null)} />}
    </>
  )
}
