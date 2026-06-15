import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// SVG circuit-trace paths for the loading screen
const CircuitSVG = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-30"
    viewBox="0 0 800 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    {/* Horizontal rails */}
    <motion.path
      d="M0 150 H200 L240 190 H560 L600 150 H800"
      stroke="#DC2626" strokeWidth="1.5"
      strokeDasharray="800" strokeDashoffset="800"
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
    />
    <motion.path
      d="M0 450 H180 L220 410 H580 L620 450 H800"
      stroke="#991B1B" strokeWidth="1"
      strokeDasharray="800" strokeDashoffset="800"
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
    />
    {/* Vertical connectors */}
    <motion.path
      d="M240 190 V80 M560 190 V80"
      stroke="#DC2626" strokeWidth="1"
      strokeDasharray="300" strokeDashoffset="300"
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 0.8, delay: 0.8, ease: 'easeInOut' }}
    />
    <motion.path
      d="M220 410 V520 M580 410 V520"
      stroke="#DC2626" strokeWidth="1"
      strokeDasharray="300" strokeDashoffset="300"
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 0.8, delay: 1.0, ease: 'easeInOut' }}
    />
    {/* Corner nodes */}
    {[
      [240, 190], [560, 190], [220, 410], [580, 410],
      [200, 150], [600, 150], [180, 450], [620, 450],
    ].map(([cx, cy], i) => (
      <motion.circle
        key={i} cx={cx} cy={cy} r="4"
        fill="#DC2626"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0.6, 1], scale: 1 }}
        transition={{ duration: 0.4, delay: 0.8 + i * 0.06 }}
      />
    ))}
    {/* Side framing lines */}
    <motion.path
      d="M80 0 V600 M720 0 V600"
      stroke="#991B1B" strokeWidth="0.5"
      strokeDasharray="600" strokeDashoffset="600"
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 1.5, delay: 0.1, ease: 'easeInOut' }}
    />
    <motion.path
      d="M0 80 H800 M0 520 H800"
      stroke="#991B1B" strokeWidth="0.5"
      strokeDasharray="800" strokeDashoffset="800"
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 1.5, delay: 0.1, ease: 'easeInOut' }}
    />
  </svg>
)

// ATC logo image
const ATCShield = ({ size = 80 }) => (
  <img
    src="/atc-logo.jpg"
    alt="Advanced Tech Club"
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      objectFit: 'cover',
      filter: 'drop-shadow(0 0 16px rgba(220,38,38,0.6))',
    }}
  />
)

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0)
  // phase 0: shield fade in
  // phase 1: circuit illuminate
  // phase 2: ATC title appears
  // phase 3: exit transition

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2400),
      setTimeout(() => onComplete(), 3200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-zinc-950 overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {/* Circuit traces background */}
      {phase >= 1 && <CircuitSVG />}

      {/* Radial red glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(220,38,38,0.12) 0%, transparent 70%)',
          transition: 'opacity 1s ease',
          opacity: phase >= 1 ? 1 : 0,
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* NIAT logo — fades in first */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <img
            src="/niat-logo.png"
            alt="NIAT"
            style={{
              width: 56,
              height: 56,
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 10px rgba(220,38,38,0.4))',
            }}
          />
          <motion.span
            className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            NxtWave Institute of Advanced Technologies
          </motion.span>
        </motion.div>

        {/* ATC logo + wordmark — appears after circuit */}
        {phase >= 2 && (
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <img
              src="/atc-logo.jpg"
              alt="Advanced Tech Club"
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                objectFit: 'cover',
                filter: 'drop-shadow(0 0 20px rgba(220,38,38,0.7))',
              }}
            />
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-4xl md:text-5xl font-black tracking-[0.12em] text-white"
                style={{ textShadow: '0 0 40px rgba(220,38,38,0.5)' }}>
                ADVANCED TECH CLUB
              </h1>
              <p className="text-xs tracking-[0.25em] uppercase text-red-500 font-medium">
                Innovating Tomorrow Through Robotics & IoT
              </p>
            </div>
          </motion.div>
        )}

        {/* Progress bar */}
        <motion.div
          className="w-48 h-px bg-zinc-800 relative overflow-hidden mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-red-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase >= 3 ? 1 : phase >= 2 ? 0.85 : phase >= 1 ? 0.4 : 0.1 }}
            style={{ transformOrigin: 'left' }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </div>

      {/* Corner decorators */}
      {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} w-6 h-6 border-red-800`}
          style={{
            borderTopWidth: i < 2 ? '1px' : '0',
            borderBottomWidth: i >= 2 ? '1px' : '0',
            borderLeftWidth: i % 2 === 0 ? '1px' : '0',
            borderRightWidth: i % 2 === 1 ? '1px' : '0',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.2 + i * 0.1 }}
        />
      ))}
    </motion.div>
  )
}
