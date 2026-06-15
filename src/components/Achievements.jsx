import { motion } from 'framer-motion'
import { BookOpen, Rocket, Trophy, Users } from 'lucide-react'
import { useCounter, useScrollReveal } from '../hooks/useScrollReveal'
import { useSiteContent } from '../context/SiteContentContext'

const ICONS = { Users, BookOpen, Rocket, Trophy }

function StatCounter({ stat, icon: Icon, index, visible }) {
  const count = useCounter(Number(stat.value) || 0, 2200, visible)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group glass rounded-2xl p-6 text-center transition-all duration-400"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      whileHover={{
        borderColor: 'rgba(220,38,38,0.25)',
        boxShadow: '0 0 40px rgba(220,38,38,0.08)',
      }}
    >
      <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/20 transition-all">
        <Icon size={20} className="text-red-500" />
      </div>
      <div className="text-4xl font-black text-white mb-1">
        {count}{stat.suffix}
      </div>
      <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{stat.label}</div>
    </motion.div>
  )
}

function TimelineItem({ milestone, index, visible, isLast }) {
  const isLeft = index % 2 === 0

  return (
    <div className={`flex gap-0 md:gap-6 items-start ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      <motion.div
        className={`flex-1 glass rounded-2xl p-5 transition-all duration-300
          ${isLeft ? 'md:text-right' : 'md:text-left'}`}
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={visible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.3, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ borderColor: 'rgba(220,38,38,0.2)', y: -2 }}
      >
        <div className="text-xs font-mono text-red-500 font-semibold mb-2 tracking-widest">
          {milestone.year}
        </div>
        <h4 className="text-sm font-bold text-white mb-1.5">{milestone.title}</h4>
        <p className="text-xs text-zinc-500 leading-relaxed">{milestone.description}</p>
      </motion.div>

      <div className="relative flex flex-col items-center flex-shrink-0 w-10 md:w-12">
        <motion.div
          className="w-3 h-3 rounded-full bg-red-600 flex-shrink-0 z-10 mt-4"
          style={{ boxShadow: '0 0 12px rgba(220,38,38,0.6)' }}
          initial={{ scale: 0 }}
          animate={visible ? { scale: 1 } : {}}
          transition={{ delay: 0.15 + index * 0.1, type: 'spring', stiffness: 300 }}
        />
        {!isLast && (
          <motion.div
            className="absolute top-6 w-px bg-gradient-to-b from-red-600/40 to-transparent"
            style={{ height: 'calc(100% + 1.25rem)' }}
            initial={{ scaleY: 0 }}
            animate={visible ? { scaleY: 1 } : {}}
            transition={{ delay: 0.25 + index * 0.1, duration: 0.4 }}
          />
        )}
      </div>

      <div className="hidden md:block flex-1" />
    </div>
  )
}

export default function Achievements() {
  const { content } = useSiteContent()
  const { achievements } = content
  const [statsRef, statsVisible] = useScrollReveal()
  const [timeRef, timeVisible] = useScrollReveal()

  return (
    <section
      id="achievements"
      className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #09090B 0%, #0d0d0e 50%, #09090B 100%)' }}
    >
      <div
        className="absolute left-0 top-1/3 w-80 h-80 rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(220,38,38,0.04)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label justify-center mb-4 block">
            <span className="w-4 h-px bg-red-600" />
            {achievements.eyebrow}
            <span className="w-4 h-px bg-red-600" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {achievements.titlePrefix}{' '}
            <span className="text-red-600">{achievements.titleHighlight}</span>
            {achievements.titleSuffix && ` ${achievements.titleSuffix}`}
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            {achievements.description}
          </p>
        </motion.div>

        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {achievements.stats.map((stat, i) => {
            const Icon = ICONS[stat.icon] ?? Users
            return (
              <StatCounter key={stat.label} stat={stat} icon={Icon} index={i} visible={statsVisible} />
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28 }}
          className="mb-8"
        >
          <h3 className="text-center text-xl font-bold text-white mb-10">
            {achievements.timelineTitlePrefix}{' '}
            <span className="text-red-600">{achievements.timelineTitleHighlight}</span>{' '}
            {achievements.timelineTitleSuffix}
          </h3>
        </motion.div>

        <div ref={timeRef} className="flex flex-col gap-6 max-w-2xl mx-auto">
          {achievements.milestones.map((milestone, i) => (
            <TimelineItem
              key={`${milestone.year}-${milestone.title}`}
              milestone={milestone}
              index={i}
              visible={timeVisible}
              isLast={i === achievements.milestones.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
