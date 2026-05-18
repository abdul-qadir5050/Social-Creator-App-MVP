'use client'

import { useApp } from '@/lib/context'
import { Avatar, Badge, StatBox } from '@/components/ui'

export default function ProfileScreen() {
  const { profileApproved } = useApp()

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4 pb-3 flex-shrink-0">
        <div className="font-display text-[22px] font-extrabold tracking-tight">
          <span className="grad-text">Profile</span>
        </div>
        <Badge variant={profileApproved ? 'green' : 'orange'}>
          {profileApproved ? 'Approved' : 'Pending'}
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
        {/* Avatar + name */}
        <div className="text-center px-5 pb-5">
          <Avatar initials="SR" size={80} />
          <div className="font-display text-[22px] font-extrabold tracking-tight mt-3 mb-1">Sofia Ray</div>
          <div className="text-[#9090b0] mb-3.5">@sofiaray · 🎵 Music</div>
          <Badge variant={profileApproved ? 'green' : 'gold'}>
            {profileApproved ? '✅ Payouts enabled' : '⏳ Pending admin approval'}
          </Badge>
        </div>

        {/* Stats */}
        <div className="flex gap-2.5 mx-4 mb-3">
          <StatBox value="—" label="Earnings" />
          <StatBox value="2" label="Videos" />
          <StatBox value={profileApproved ? '$9.00' : '$0'} label="Pending tips" valueClass="text-yellow-400" />
        </div>

        {/* Payout card */}
        <div className="mx-4 bg-surface border border-white/10 rounded-2xl p-4 mb-3">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-bold">Payout status</span>
            <Badge variant={profileApproved ? 'green' : 'orange'}>
              {profileApproved ? 'Active' : 'Locked'}
            </Badge>
          </div>
          <p className="text-sm text-[#9090b0] leading-relaxed mb-3">
            {profileApproved
              ? 'Your account is approved. Payouts process weekly every Friday.'
              : 'Tips are held securely until your account is approved. Once approved, payouts happen weekly.'}
          </p>
          <div className="bg-black/30 rounded-xl p-3">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#9090b0]">Pending tips</span>
              <span className="font-bold text-yellow-400">{profileApproved ? '$9.00' : '$0.00'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#9090b0]">Platform fee (10%)</span>
              <span className="text-[#505070]">{profileApproved ? '$1.00' : '$0.00'}</span>
            </div>
          </div>
        </div>

        {/* Stripe status */}
        <div className="mx-4 bg-surface border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl">🔵</span>
            <div>
              <div className="font-bold text-sm">Stripe Connect</div>
              <div className="text-xs text-[#9090b0]">Bank: •••• 4242</div>
            </div>
            <Badge variant={profileApproved ? 'green' : 'orange'} className="ml-auto">
              {profileApproved ? 'Ready' : 'Pending'}
            </Badge>
          </div>
          <div className="text-xs text-[#9090b0]">
            You keep 90% of every tip · Platform fee 10%
          </div>
        </div>
      </div>
    </div>
  )
}
