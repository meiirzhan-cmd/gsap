import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import EmailCard from './EmailCard'
import FloatingBadge from './FloatingBadge'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Glow pulse
      gsap.to(glowRef.current, {
        scale: 1.15,
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Split headline text for word animation
      const split = new SplitText(headlineRef.current, { type: 'words,chars' })

      tl.from(split.chars, {
        opacity: 0,
        y: 40,
        rotateX: -90,
        stagger: 0.018,
        duration: 0.7,
        ease: 'back.out(1.5)',
      })
        .from(
          subRef.current,
          { opacity: 0, y: 24, duration: 0.6 },
          '-=0.3'
        )
        .from(
          ctaRef.current,
          { opacity: 0, y: 20, duration: 0.5 },
          '-=0.2'
        )
        .from(
          orbitRef.current,
          { opacity: 0, scale: 0.85, duration: 0.8, ease: 'back.out(1.2)' },
          '-=0.4'
        )

      // Floating orbit animation
      gsap.to(orbitRef.current, {
        y: -18,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Scroll-driven fade out for hero text
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        opacity: 0.3,
        y: -40,
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(168,85,247,0.12) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Pill badge */}
      <div className="relative z-10 mb-6 flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
        Powered by GPT-4o · Zero inbox anxiety
      </div>

      {/* Headline */}
      <h1
        ref={headlineRef}
        className="relative z-10 max-w-4xl text-center text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #c084fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Your AI Chief of Staff for Every Email
      </h1>

      {/* Subheadline */}
      <p
        ref={subRef}
        className="relative z-10 mt-6 max-w-2xl text-center text-lg text-white/50 leading-relaxed md:text-xl"
      >
        MailMind reads, prioritizes, and drafts replies for your Gmail — so you
        spend minutes on email, not hours. Your smartest inbox yet.
      </p>

      {/* CTA buttons */}
      <div ref={ctaRef} className="relative z-10 mt-10 flex flex-wrap gap-4 justify-center">
        <button className="group relative overflow-hidden rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]">
          <span className="relative z-10">Get Early Access — Free</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
        </button>
        <button className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white">
          Watch Demo
        </button>
      </div>

      {/* Social proof */}
      <div className="relative z-10 mt-8 flex items-center gap-3 text-sm text-white/40">
        <div className="flex -space-x-2">
          {['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'].map((color, i) => (
            <div
              key={i}
              className="h-7 w-7 rounded-full border-2 border-[#020205]"
              style={{ background: color }}
            />
          ))}
        </div>
        <span>Join 4,200+ professionals on the waitlist</span>
      </div>

      {/* Hero visual — email UI mockup */}
      <div ref={orbitRef} className="relative z-10 mt-16 w-full max-w-2xl">
        {/* Floating badges */}
        <FloatingBadge
          text="✦ 47 emails triaged"
          className="absolute -top-6 -left-4 md:-left-12"
          delay={0.2}
        />
        <FloatingBadge
          text="💡 3 action items found"
          className="absolute -top-6 -right-4 md:-right-12"
          delay={0.4}
        />
        <FloatingBadge
          text="⚡ Reply drafted in 2s"
          className="absolute -bottom-6 left-1/2 -translate-x-1/2"
          delay={0.6}
        />

        {/* Inbox card */}
        <div
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl"
          style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)' }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-4 text-xs text-white/30">MailMind — Inbox</span>
          </div>

          {/* Email list */}
          <div className="p-3 space-y-2">
            <EmailCard
              sender="Sarah Chen"
              subject="Q3 Budget Review — need your sign-off"
              preview="Hi, the finance team needs approval by EOD Friday for the Q3..."
              tag="Action Required"
              tagColor="indigo"
              time="2m ago"
              aiSummary="Sarah needs budget approval by Friday EOD."
              index={0}
            />
            <EmailCard
              sender="LinkedIn"
              subject="You appeared in 14 searches this week"
              preview="Your profile is getting noticed! Here's who viewed..."
              tag="Low Priority"
              tagColor="gray"
              time="1h ago"
              index={1}
            />
            <EmailCard
              sender="Marcus Webb"
              subject="Re: Partnership proposal — let's talk"
              preview="Loved your deck. Can we schedule a call next week to..."
              tag="Opportunity"
              tagColor="purple"
              time="3h ago"
              aiSummary="Positive response to partnership proposal. Schedule a call."
              index={2}
            />
            <EmailCard
              sender="AWS Billing"
              subject="Your invoice for $1,284.00 is ready"
              preview="Your monthly statement is now available in your billing..."
              tag="Receipt"
              tagColor="emerald"
              time="5h ago"
              index={3}
            />
          </div>

          {/* AI Bar */}
          <div className="m-3 mt-1 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-3 flex items-start gap-3">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500/30 flex items-center justify-center text-xs">✦</div>
            <div>
              <p className="text-xs font-medium text-indigo-300 mb-0.5">AI Summary</p>
              <p className="text-xs text-white/50 leading-relaxed">
                You have 1 urgent action (budget sign-off due Friday), 1 business opportunity worth following up, and 2 low-priority items. Suggested reply drafted for Sarah.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
