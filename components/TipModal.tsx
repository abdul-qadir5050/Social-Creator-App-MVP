'use client'

import { useState } from 'react'
import { useApp } from '@/lib/context'
import { Avatar, Button } from '@/components/ui'

const TIP_OPTIONS = [
  { amount: 1,   emoji: '☕', label: '$1' },
  { amount: 5,   emoji: '🔥', label: '$5' },
  { amount: 10,  emoji: '💎', label: '$10' },
  { amount: 20,  emoji: '🌟', label: '$20' },
  { amount: 50,  emoji: '👑', label: '$50' },
  { amount: 100, emoji: '🚀', label: '$100' },
]

export default function TipModal() {
  const { tipModal, closeTip, showToast } = useApp()
  const [selected, setSelected] = useState(5)

  const creatorGets = (selected * 0.9).toFixed(2)
  const initials = tipModal.creator.split(' ').map((w: string) => w[0]).join('')

  function handleSend() {
    closeTip()
    showToast(`🔥 $${selected} tip sent! Creator gets $${creatorGets}`)
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeTip}
        className={`fixed inset-0 bg-black/70 backdrop-blur-md z-[200] transition-opacity duration-300 ${tipModal.open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Sheet */}
      <div className={`
        fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px]
        bg-[#0e0e18] border-t border-white/10 rounded-t-3xl p-6 z-[201]
        transition-transform duration-350
        ${tipModal.open ? 'translate-y-0' : 'translate-y-full'}
      `}
      style={{ transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' }}
      >
        {/* Handle */}
        <div className="w-9 h-1 bg-surface3 rounded-full mx-auto mb-5" />

        {/* Creator */}
        <div className="text-center mb-5">
          <Avatar initials={initials} size={52} />
          <div className="font-display text-[19px] font-extrabold mt-2.5 mb-1">{tipModal.creator}</div>
          <div className="text-sm text-[#9090b0]">{tipModal.handle}</div>
        </div>

        {/* Amounts */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {TIP_OPTIONS.map(opt => (
            <button
              key={opt.amount}
              onClick={() => setSelected(opt.amount)}
              className={`
                flex flex-col items-center justify-center gap-1
                py-3 rounded-xl border transition-all
                ${selected === opt.amount
                  ? 'border-accent bg-accent/10'
                  : 'border-white/10 bg-surface2'}
              `}
            >
              <span className="text-xl">{opt.emoji}</span>
              <span className="font-display text-sm font-bold">{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Fee info */}
        <div className="bg-surface rounded-xl p-3 mb-4 text-sm text-[#9090b0] text-center">
          Platform takes <strong className="text-white">10%</strong> · Creator receives{' '}
          <strong className="text-[#00e57a]">${creatorGets}</strong>
        </div>

        <Button onClick={handleSend}>
          Send ${selected} tip 🔥
        </Button>
      </div>
    </>
  )
}
