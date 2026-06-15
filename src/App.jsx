import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import WhyJoin from './components/WhyJoin'
import Domains from './components/Domains'
import Events from './components/Events'
import Leadership from './components/Leadership'
import Gallery from './components/Gallery'
import Achievements from './components/Achievements'
import Vision from './components/Vision'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AdminPlatform from './components/admin/AdminPlatform'
import AdminLogin from './components/admin/AdminLogin'
import { SiteContentProvider } from './context/SiteContentContext'

function MainWebsite() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <div className="relative min-h-screen bg-zinc-950">
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen
            key="loader"
            onComplete={() => setLoading(false)}
          />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />

          <main>
            <Hero />
            <About />
            <WhyJoin />
            <Domains />
            <Events />
            <Leadership />
            <Gallery />
            <Achievements />
            <Vision />
            <Contact />
          </main>

          <Footer />
          <ScrollToTop />
        </>
      )}
    </div>
  )
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    setLoggedIn(auth === 'true')
  }, [])

  const isAdmin =
    typeof window !== 'undefined' &&
    (
      window.location.pathname.replace(/\/$/, '') === '/admin' ||
      window.location.hash === '#admin' ||
      window.location.hash === '#/admin'
    )

  return (
    <SiteContentProvider>
      {isAdmin ? (
        loggedIn ? (
          <AdminPlatform />
        ) : (
          <AdminLogin
            onLogin={() => setLoggedIn(true)}
          />
        )
      ) : (
        <MainWebsite />
      )}
    </SiteContentProvider>
  )
}