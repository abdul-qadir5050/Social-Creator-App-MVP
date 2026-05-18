'use client'

import { useState } from 'react'
import { useApp } from '@/lib/context'
import { Button, Input, Textarea, Badge } from '@/components/ui'

export default function OnboardScreen() {
  const { goTo } = useApp()
  const [step, setStep] = useState(1)

  function next() {
    if (step < 3) setStep(s => s + 1)
    else goTo('app')
  }

  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
        <span className="text-xs font-display font-bold text-[#9090b0] uppercase tracking-widest">Setup</span>
        <span className="text-xs text-[#505070]">Step {step} of 3</span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 px-5 mb-6">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              flex: i === step ? 2 : 1,
              background: i < step ? '#00e57a' : i === step ? 'linear-gradient(135deg,#ff3d7f,#ff6b35)' : 'var(--surface3)',
            }}
          />
        ))}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-10 px-5">
        {/* Step 1: Profile */}
        {step === 1 && (
          <>
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#ff3d7f,#ff6b35)' }}>✨</div>
              <div className="font-display text-2xl font-extrabold tracking-tight mb-2">Build your profile</div>
              <div className="text-[#9090b0] text-sm">First impressions matter. Make it count.</div>
            </div>
            <Input label="Display name" placeholder="e.g. Sofia Ray" defaultValue="Sofia Ray" />
            <div className="mb-3.5">
              <label className="block text-xs font-display font-bold text-[#9090b0] uppercase tracking-widest mb-1.5">Category</label>
              <select className="w-full px-4 py-3.5 bg-surface2 border border-white/10 rounded-xl text-[15px] text-white outline-none focus:border-accent transition-colors appearance-none">
                <option>🎵 Music</option>
                <option>💃 Dance</option>
                <option>😂 Comedy</option>
                <option>🎮 Gaming</option>
                <option>✨ Lifestyle</option>
              </select>
            </div>
            <Textarea label="Bio" rows={3} placeholder="Tell your audience who you are..." defaultValue="Singer-songwriter 🎵 Creating music that moves you" />
          </>
        )}

        {/* Step 2: Stripe */}
        {step === 2 && (
          <>
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#ff3d7f,#ff6b35)' }}>💳</div>
              <div className="font-display text-2xl font-extrabold tracking-tight mb-2">Set up payouts</div>
              <div className="text-[#9090b0] text-sm">Connect your bank to receive tips from fans</div>
            </div>

            <div className="bg-surface border border-white/10 rounded-2xl p-5 mb-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-8 translate-x-8" style={{ background: 'radial-gradient(circle,rgba(255,61,127,0.15),transparent)' }} />
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🔵</span>
                <div>
                  <div className="font-bold text-sm">Stripe Connect</div>
                  <div className="text-xs text-[#9090b0]">Secure payout processing</div>
                </div>
                <Badge variant="orange" className="ml-auto">Pending</Badge>
              </div>
              <div className="bg-black/30 rounded-xl p-3 text-sm text-[#9090b0] leading-relaxed">
                Platform takes <strong className="text-white">10%</strong> on all tips.<br />
                You keep <strong className="text-[#00e57a]">90%</strong> of every tip received.<br />
                First payout requires admin approval.
              </div>
            </div>

            <Input label="Bank account (last 4)" placeholder="•••• •••• •••• 4242" defaultValue="•••• •••• •••• 4242" />
          </>
        )}

        {/* Step 3: Pending */}
        {step === 3 && (
          <>
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 border-2 border-yellow-400" style={{ background: 'rgba(255,215,0,0.1)' }}>⏳</div>
              <div className="font-display text-2xl font-extrabold tracking-tight mb-2">Under review</div>
              <div className="text-[#9090b0] text-sm max-w-[260px] mx-auto leading-relaxed">
                Your account is being reviewed. You can upload content while we verify your payout details.
              </div>
            </div>

            <div className="bg-surface border border-white/10 rounded-2xl p-4 mb-3">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="font-semibold text-sm flex-1">Account verification</div>
                <Badge variant="gold">In review</Badge>
              </div>
              <div className="text-xs text-[#9090b0]">Typically 24–48 hours. You'll be notified when approved.</div>
            </div>

            <div className="bg-surface border border-white/10 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <div className="font-semibold text-sm flex-1">Content upload</div>
                <Badge variant="green">Enabled</Badge>
              </div>
              <div className="text-xs text-[#9090b0]">Start uploading now. Tips will be held until approval.</div>
            </div>
          </>
        )}

        <Button onClick={next}>
          {step === 1 ? 'Continue →' : step === 2 ? 'Connect Stripe →' : 'Start creating →'}
        </Button>

        {step === 2 && (
          <Button variant="ghost" onClick={next} className="mt-2.5">Skip for now</Button>
        )}
      </div>
    </div>
  )
}
