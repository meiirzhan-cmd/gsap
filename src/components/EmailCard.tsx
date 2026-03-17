import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface EmailCardProps {
  sender: string
  subject: string
  preview: string
  tag: string
  tagColor: 'indigo' | 'gray' | 'purple' | 'emerald'
  time: string
  aiSummary?: string
  index: number
}

const tagStyles: Record<string, string> = {
  indigo: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/20',
  gray: 'bg-white/5 text-white/30 border-white/10',
  purple: 'bg-purple-500/15 text-purple-300 border-purple-500/20',
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
}

export default function EmailCard({
  sender,
  subject,
  preview,
  tag,
  tagColor,
  time,
  aiSummary,
  index,
}: EmailCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from(cardRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.5,
        delay: 0.8 + index * 0.1,
        ease: 'power2.out',
      })
    },
    { scope: cardRef }
  )

  return (
    <div
      ref={cardRef}
      className="group flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-3 transition-all duration-200 cursor-pointer hover:bg-white/[0.05] hover:border-white/10"
    >
      {/* Avatar */}
      <div
        className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold"
        style={{
          background: `hsl(${(sender.charCodeAt(0) * 17) % 360}, 60%, 35%)`,
          color: `hsl(${(sender.charCodeAt(0) * 17) % 360}, 80%, 80%)`,
        }}
      >
        {sender[0]}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="text-xs font-semibold text-white/80 truncate">{sender}</span>
          <span className="flex-shrink-0 text-[10px] text-white/25">{time}</span>
        </div>
        <p className="text-xs font-medium text-white/60 truncate mb-0.5">{subject}</p>
        <p className="text-[11px] text-white/30 truncate">{preview}</p>
        {aiSummary && (
          <p className="mt-1.5 text-[10px] text-indigo-400/70 flex items-center gap-1">
            <span>✦</span> {aiSummary}
          </p>
        )}
      </div>

      {/* Tag */}
      <span
        className={`flex-shrink-0 self-start rounded-full border px-2 py-0.5 text-[10px] font-medium ${tagStyles[tagColor]}`}
      >
        {tag}
      </span>
    </div>
  )
}
