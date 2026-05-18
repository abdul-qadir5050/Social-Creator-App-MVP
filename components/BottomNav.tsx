'use client'

import { useApp, TabId } from '@/lib/context'

const TABS: { id: TabId; label: string; icon: JSX.Element }[] = [
  {
    id: 'feed',
    label: 'Feed',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    id: 'upload',
    label: 'Upload',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
]

export default function BottomNav() {
  const { activeTab, setActiveTab } = useApp()

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-16 bg-[#0e0e18] border-t border-white/7 flex items-start pt-2.5 z-50 backdrop-blur-xl">
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            flex-1 flex flex-col items-center gap-1 cursor-pointer py-1
            text-[10px] font-display font-bold tracking-widest uppercase transition-colors
            ${activeTab === tab.id ? 'text-accent' : 'text-[#505070]'}
          `}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
