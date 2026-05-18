'use client'

import { useState } from 'react'
import { useApp } from '@/lib/context'
import { Avatar, Badge, Button, StatBox } from '@/components/ui'

interface Creator {
  id: string
  name: string
  handle: string
  initials: string
  category: string
  applied: string
  stripe: string
  bank: string
  videos: number
  gradient?: string
  status: 'pending' | 'approved' | 'rejected'
}

const INITIAL_CREATORS: Creator[] = [
  { id: '1', name: 'Sofia Ray',  handle: '@sofiaray', initials: 'SR', category: 'Music',   applied: '2h ago',  stripe: '✅ Connected', bank: '•••4242', videos: 2, status: 'pending' },
  { id: '2', name: 'Kai Moves', handle: '@kaimoves', initials: 'KM', category: 'Dance',   applied: '5h ago',  stripe: '✅ Connected', bank: '•••8891', videos: 7, gradient: 'linear-gradient(135deg,#00c6ff,#0072ff)', status: 'pending' },
  { id: '3', name: 'Jake Lee',  handle: '@jakelee',  initials: 'JL', category: 'Comedy',  applied: '12h ago', stripe: '⚠️ Missing',  bank: 'None',    videos: 0, gradient: 'linear-gradient(135deg,#f093fb,#f5576c)', status: 'pending' },
]

export default function AdminPanel() {
  const { goTo, showToast, pendingCount, approvedCount, approveCreator, rejectCreator, approveProfile } = useApp()
  const [creators, setCreators] = useState(INITIAL_CREATORS)
  const [payoutReleased, setPayoutReleased] = useState(false)

  function handleApprove(id: string) {
    setCreators(c => c.map(cr => cr.id === id ? { ...cr, status: 'approved' } : cr))
    approveCreator()
    if (id === '1') approveProfile()
  }

  function handleReject(id: string) {
    setCreators(c => c.map(cr => cr.id === id ? { ...cr, status: 'rejected' } : cr))
    rejectCreator()
  }

  function releasePayout() {
    setPayoutReleased(true)
    showToast('💸 $9.00 released to Sofia Ray')
  }

  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 flex-shrink-0 border-b border-white/7">
        <button onClick={() => goTo('splash')} className="text-sm text-[#9090b0] hover:text-white transition-colors">← Back</button>
        <div className="font-display text-[22px] font-extrabold tracking-tight"><span className="grad-text">Admin</span></div>
        <Badge variant="purple">Ops</Badge>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        {/* Stats */}
        <div className="flex gap-2.5 mx-4 my-4">
          <StatBox value={pendingCount} label="Pending" valueClass="text-yellow-400" />
          <StatBox value={approvedCount} label="Approved" valueClass="text-[#00e57a]" />
          <StatBox value="$2,847" label="Held tips" valueClass="text-yellow-400" />
        </div>

        {/* Creator queue */}
        <div className="mx-4 mb-1 text-xs font-display font-bold text-[#9090b0] uppercase tracking-widest">Creator review queue</div>

        {creators.map(cr => (
          <div key={cr.id} className="mx-4 mb-3 bg-surface border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 p-4">
              <Avatar initials={cr.initials} size={44} gradient={cr.gradient} />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[15px]">{cr.name}</div>
                <div className="text-xs text-[#9090b0]">{cr.handle} · {cr.category} · {cr.applied}</div>
              </div>
              <Badge variant={cr.status === 'approved' ? 'green' : cr.status === 'rejected' ? 'red' : 'orange'}>
                {cr.status === 'approved' ? 'Approved' : cr.status === 'rejected' ? 'Rejected' : 'Pending'}
              </Badge>
            </div>

            <div className="px-4 pb-3 text-xs text-[#9090b0]">
              Stripe: {cr.stripe} · Bank: {cr.bank} · {cr.videos} video{cr.videos !== 1 ? 's' : ''}
            </div>

            {cr.status === 'pending' && (
              <div className="flex gap-2 px-4 pb-4">
                <Button variant="green" size="sm" onClick={() => handleApprove(cr.id)}>✓ Approve</Button>
                <Button variant="red" size="sm" onClick={() => handleReject(cr.id)}>✗ Reject</Button>
                <Button variant="ghost" size="sm">Review</Button>
              </div>
            )}

            {cr.status !== 'pending' && (
              <div className="px-4 pb-4">
                <Badge variant={cr.status === 'approved' ? 'green' : 'red'} className="text-xs py-2 px-4">
                  {cr.status === 'approved' ? '✓ Approved — payouts enabled' : '✗ Rejected — creator notified'}
                </Badge>
              </div>
            )}
          </div>
        ))}

        {/* Payout flow */}
        <div className="mx-4 mb-1 mt-2 text-xs font-display font-bold text-[#9090b0] uppercase tracking-widest">Payout control</div>

        <div className="mx-4 mb-4">
          {[
            { icon: '✓', done: true,  label: 'Tip received',            sub: '$10.00 from viewer · Stripe captured' },
            { icon: '✓', done: true,  label: 'Platform fee deducted',   sub: '10% = $1.00 · Creator receives $9.00' },
            { icon: payoutReleased ? '✓' : '⏳', done: payoutReleased, active: !payoutReleased, label: payoutReleased ? 'Admin approved' : 'Pending admin approval', sub: payoutReleased ? 'Approval recorded' : '$9.00 held in Stripe escrow' },
            { icon: payoutReleased ? '💸' : '💸', done: payoutReleased, faded: !payoutReleased, label: payoutReleased ? 'Payout released 💸' : 'Payout eligible', sub: 'Released after creator approved' },
          ].map((step, i, arr) => (
            <div key={i}>
              <div className="flex items-start gap-3.5">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 border-2
                  ${step.done ? 'bg-green-500/15 border-green-500/50' : step.active ? 'border-none text-sm' : 'bg-surface border-white/10'}
                  ${step.faded ? 'opacity-40' : ''}
                `}
                style={step.active ? { background: 'linear-gradient(135deg,#ff3d7f,#ff6b35)' } : {}}
                >
                  {step.icon}
                </div>
                <div className={`pt-2 ${step.faded ? 'opacity-40' : ''}`}>
                  <div className="font-bold text-sm">{step.label}</div>
                  <div className="text-xs text-[#9090b0] mt-0.5">{step.sub}</div>
                </div>
              </div>
              {i < arr.length - 1 && <div className="w-0.5 h-6 bg-white/10 ml-5 my-1" />}
            </div>
          ))}
        </div>

        <div className="mx-4 mb-6">
          {!payoutReleased ? (
            <Button onClick={releasePayout}>Release payout — Sofia Ray</Button>
          ) : (
            <Button variant="green" onClick={() => {}}>✓ $9.00 sent to Sofia Ray</Button>
          )}
        </div>

        {/* Content moderation */}
        <div className="mx-4 mb-1 text-xs font-display font-bold text-[#9090b0] uppercase tracking-widest">Content moderation</div>

        <div className="mx-4 bg-surface border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 p-4">
            <div className="text-3xl">🎵</div>
            <div className="flex-1">
              <div className="font-bold text-sm">Ocean Vibes</div>
              <div className="text-xs text-[#9090b0]">@sofiaray · Flagged: auto-review</div>
            </div>
            <Badge variant="orange">Review</Badge>
          </div>
          <div className="flex gap-2 px-4 pb-4">
            <Button variant="green" size="sm" onClick={() => showToast('✅ Content approved')}>Approve</Button>
            <Button variant="red" size="sm" onClick={() => showToast('🚫 Content removed')}>Remove</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
