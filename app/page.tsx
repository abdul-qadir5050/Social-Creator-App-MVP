'use client'

import { AppProvider, useApp } from '@/lib/context'
import { Toast } from '@/components/ui'
import TipModal from '@/components/TipModal'
import BottomNav from '@/components/BottomNav'
import FeedScreen from '@/app/feed/FeedScreen'
import ProfileScreen from '@/app/feed/ProfileScreen'
import UploadScreen from '@/app/upload/UploadScreen'
import AdminPanel from '@/app/admin/AdminPanel'
import OnboardScreen from '@/app/onboard/OnboardScreen'
import { useState } from 'react'

function SplashScreen() {
  const { goTo } = useApp()
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080810]">
      <div className="text-center">
        <div className="font-display text-[64px] font-extrabold tracking-tight grad-text mb-2">FLARE</div>
        <div className="text-[#9090b0] text-base mb-12">Creator monetization platform</div>
        <button
          onClick={() => goTo('auth')}
          className="px-12 py-4 rounded-full font-display text-[17px] font-bold text-white mb-4"
          style={{ background: 'linear-gradient(135deg,#ff3d7f,#ff6b35)' }}
        >
          Get started
        </button>
        <br />
        <button
          onClick={() => goTo('admin')}
          className="px-7 py-2.5 rounded-full font-display text-sm font-bold text-white bg-surface2 mt-2"
        >
          View admin demo
        </button>
      </div>
    </div>
  )
}

function AuthScreen() {
  const { goTo } = useApp()
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="font-display text-[22px] font-extrabold"><span className="grad-text">FLARE</span></div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-10">
        <div className="mb-8 mt-2">
          <div className="font-display text-3xl font-extrabold tracking-tight mb-1.5">Welcome back</div>
          <div className="text-[#9090b0]">Sign in to continue</div>
        </div>
        <div className="mb-3.5">
          <label className="block text-xs font-display font-bold text-[#9090b0] uppercase tracking-widest mb-1.5">Email</label>
          <input className="w-full px-4 py-3.5 bg-surface2 border border-white/10 rounded-xl text-[15px] text-white placeholder-[#505070] outline-none focus:border-accent transition-colors" type="email" placeholder="you@example.com" defaultValue="sofia@example.com" />
        </div>
        <div className="mb-3.5">
          <label className="block text-xs font-display font-bold text-[#9090b0] uppercase tracking-widest mb-1.5">Password</label>
          <input className="w-full px-4 py-3.5 bg-surface2 border border-white/10 rounded-xl text-[15px] text-white placeholder-[#505070] outline-none focus:border-accent transition-colors" type="password" placeholder="••••••••" defaultValue="password" />
        </div>
        <button onClick={() => goTo('role')} className="w-full py-3.5 rounded-full font-display text-[15px] font-bold text-white mb-4" style={{ background: 'linear-gradient(135deg,#ff3d7f,#ff6b35)' }}>
          Sign in
        </button>
        <div className="text-center text-[#505070] text-sm mb-4">— or —</div>
        <button onClick={() => goTo('role')} className="w-full py-3.5 rounded-full font-display text-[15px] font-bold text-white bg-transparent border border-white/20">
          Continue with Google
        </button>
        <div className="text-center mt-5 text-sm text-[#9090b0]">
          New here?{' '}
          <span className="text-accent font-semibold cursor-pointer" onClick={() => goTo('role')}>Create account</span>
        </div>
      </div>
    </div>
  )
}

function RoleScreen() {
  const { goTo } = useApp()
  const [selected, setSelected] = useState<'creator' | 'viewer' | null>(null)
  function proceed() {
    if (selected === 'creator') goTo('onboard')
    else goTo('app')
  }
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="text-center pt-12 pb-8 px-6">
        <div className="font-display text-2xl font-extrabold tracking-tight mb-2">Join as a...</div>
        <div className="text-[#9090b0] text-sm">Choose how you want to use FLARE</div>
      </div>
      {(['creator', 'viewer'] as const).map(role => (
        <div
          key={role}
          onClick={() => setSelected(role)}
          className={`flex items-center gap-4 mx-4 mb-3 p-5 rounded-2xl border-2 cursor-pointer transition-all active:scale-[0.98] ${selected === role ? 'border-accent bg-accent/8' : 'border-white/10 bg-surface'}`}
        >
          <div className="w-14 h-14 bg-surface2 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
            {role === 'creator' ? '🎬' : '👀'}
          </div>
          <div>
            <div className="font-display text-lg font-bold mb-1 capitalize">{role}</div>
            <div className="text-xs text-[#9090b0] leading-relaxed">
              {role === 'creator'
                ? 'Upload content, earn tips, get paid. Build your audience and monetize your work.'
                : 'Discover creators, support your favorites. Tip and engage with content you love.'}
            </div>
          </div>
        </div>
      ))}
      <div className="px-4 mt-4">
        <button onClick={proceed} disabled={!selected} className="w-full py-3.5 rounded-full font-display text-[15px] font-bold text-white disabled:opacity-30 transition-opacity" style={{ background: 'linear-gradient(135deg,#ff3d7f,#ff6b35)' }}>
          Continue
        </button>
      </div>
    </div>
  )
}

function AppShell() {
  const { activeTab } = useApp()
  return (
    <div className="absolute inset-0">
      {activeTab === 'feed'    && <FeedScreen />}
      {activeTab === 'upload'  && <UploadScreen />}
      {activeTab === 'profile' && <ProfileScreen />}
      <BottomNav />
    </div>
  )
}

function Root() {
  const { screen, toastMsg, toastVisible } = useApp()

  return (
    <div className="relative w-full max-w-[430px] mx-auto h-screen overflow-hidden bg-[#080810]">
      {screen === 'splash' && <SplashScreen />}
      {screen === 'auth'   && <AuthScreen />}
      {screen === 'role'   && <RoleScreen />}
      {screen === 'onboard'&& <OnboardScreen />}
      {screen === 'app'    && <AppShell />}
      {screen === 'admin'  && <AdminPanel />}
      <TipModal />
      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  )
}
