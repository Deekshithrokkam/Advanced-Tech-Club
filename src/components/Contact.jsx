import { motion } from 'framer-motion'
import { ArrowRight, Instagram, Mail } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'

export default function Contact() {
  const { content } = useSiteContent()
  const { contact } = content
  const emailSubject = encodeURIComponent(contact.emailSubject)
  const emailBody = encodeURIComponent(contact.emailBody)
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email)}&su=${emailSubject}&body=${emailBody}`

  return (
    <section id="contact" className="relative section-padding bg-zinc-950 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: 'rgba(220,38,38,0.06)' }}
      />

      <div className="absolute inset-0 circuit-grid opacity-15" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8">
        <motion.div
          className="relative glass rounded-3xl overflow-hidden mb-12"
          style={{ border: '1px solid rgba(220,38,38,0.15)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 800 280" fill="none" preserveAspectRatio="xMidYMid slice">
            <path d="M0 140 H200 L240 100 H560 L600 140 H800" stroke="#DC2626" strokeWidth="1" />
            {[100, 200, 300, 500, 600, 700].map((x, i) => (
              <line key={i} x1={x} y1="0" x2={x} y2="280" stroke="#DC2626" strokeWidth="0.5" />
            ))}
            {[[240, 100], [560, 100], [200, 140], [600, 140]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="4" fill="#DC2626" />
            ))}
          </svg>

          <div className="relative z-10 px-8 md:px-16 py-14 text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="section-label justify-center mb-5 block">
                <span className="w-4 h-px bg-red-600" />
                {contact.eyebrow}
                <span className="w-4 h-px bg-red-600" />
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              {contact.headingStart}{' '}
              <span className="text-red-600">{contact.headingHighlight}</span>,<br className="hidden sm:block" />
              {contact.headingEnd}
            </motion.h2>

            <motion.p
              className="text-zinc-400 text-base mb-8 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {contact.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28 }}
            >
              <motion.a
                href={gmailLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Mail size={16} />
                {contact.primaryButton}
                <ArrowRight size={14} />
              </motion.a>

              <motion.a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Instagram size={16} />
                {contact.secondaryButton}
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          <motion.a
            href={gmailLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass rounded-2xl p-6 flex items-center gap-4 transition-all duration-300"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ borderColor: 'rgba(220,38,38,0.25)', y: -3 }}
          >
            <div className="w-11 h-11 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600/20 transition-all">
              <Mail size={18} className="text-red-500" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-zinc-500 font-medium mb-1">{contact.emailLabel}</div>
              <div className="text-sm text-white font-semibold truncate">{contact.email}</div>
            </div>
          </motion.a>

          <motion.a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass rounded-2xl p-6 flex items-center gap-4 transition-all duration-300"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.36 }}
            whileHover={{ borderColor: 'rgba(220,38,38,0.25)', y: -3 }}
          >
            <div className="w-11 h-11 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600/20 transition-all">
              <Instagram size={18} className="text-red-500" />
            </div>
            <div>
              <div className="text-xs text-zinc-500 font-medium mb-1">{contact.instagramLabel}</div>
              <div className="text-sm text-white font-semibold">{contact.instagramHandle}</div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
