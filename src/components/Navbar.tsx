import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.out',
      })
    },
    { scope: navRef }
  )

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10"
      style={{
        background: 'linear-gradient(to bottom, rgba(2,2,5,0.95) 0%, rgba(2,2,5,0) 100%)',
        backdropFilter: 'blur(0px)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-bold">
          M
        </div>
        <span className="text-sm font-semibold text-white/90">MailMind</span>
        <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-medium text-indigo-300">
          AI
        </span>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-6 text-sm text-white/40">
        <a href="#features" className="hover:text-white/80 transition-colors">Features</a>
        <a href="#pricing" className="hover:text-white/80 transition-colors">Pricing</a>
        <a href="#faq" className="hover:text-white/80 transition-colors">FAQ</a>
      </div>

      {/* CTA */}
      <button className="rounded-full bg-white/8 border border-white/10 px-4 py-2 text-sm font-medium text-white/80 transition-all hover:bg-white/12 hover:text-white">
        Join Waitlist
      </button>
    </nav>
  )
}
