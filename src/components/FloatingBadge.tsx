import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface FloatingBadgeProps {
  text: string
  className?: string
  delay?: number
}

export default function FloatingBadge({ text, className = '', delay = 0 }: FloatingBadgeProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from(ref.current, {
        opacity: 0,
        scale: 0.8,
        y: 10,
        duration: 0.5,
        delay: 1.2 + delay,
        ease: 'back.out(2)',
      })

      gsap.to(ref.current, {
        y: -6,
        duration: 2.5 + delay * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5 + delay,
      })
    },
    { scope: ref }
  )

  return (
    <div
      ref={ref}
      className={`rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-md whitespace-nowrap ${className}`}
      style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
    >
      {text}
    </div>
  )
}
