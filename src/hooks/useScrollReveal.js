import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (options.once !== false) {
            observer.unobserve(el)
          }
        }
      },
      {
        threshold: options.threshold ?? 0.05,
        rootMargin: options.rootMargin ?? '0px 0px 20px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin, options.once])

  return [ref, isVisible]
}

export function useCounter(target, duration = 2000, isVisible = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const start = Date.now()
    const end = start + duration

    const tick = () => {
      const now = Date.now()
      const progress = Math.min((now - start) / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (now < end) requestAnimationFrame(tick)
      else setCount(target)
    }

    requestAnimationFrame(tick)
  }, [target, duration, isVisible])

  return count
}
