'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Screen =
  | 'splash'
  | 'auth'
  | 'role'
  | 'onboard'
  | 'app'
  | 'admin'

export type Role = 'creator' | 'viewer' | null

export type TabId = 'feed' | 'upload' | 'profile'

interface AppState {
  screen: Screen
  role: Role
  activeTab: TabId
  pendingCount: number
  approvedCount: number
  toastMsg: string
  toastVisible: boolean
  tipModal: { open: boolean; creator: string; handle: string }
  profileApproved: boolean
  goTo: (s: Screen) => void
  setRole: (r: Role) => void
  setActiveTab: (t: TabId) => void
  showToast: (msg: string) => void
  openTip: (creator: string, handle: string) => void
  closeTip: () => void
  approveCreator: () => void
  rejectCreator: () => void
  approveProfile: () => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>('splash')
  const [role, setRoleState] = useState<Role>(null)
  const [activeTab, setActiveTab] = useState<TabId>('feed')
  const [pendingCount, setPendingCount] = useState(3)
  const [approvedCount, setApprovedCount] = useState(12)
  const [toastMsg, setToastMsg] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [profileApproved, setProfileApproved] = useState(false)
  const [tipModal, setTipModal] = useState({ open: false, creator: '', handle: '' })

  function goTo(s: Screen) { setScreen(s) }
  function setRole(r: Role) { setRoleState(r) }
  function switchTab(t: TabId) { setActiveTab(t) }

  function showToast(msg: string) {
    setToastMsg(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  function openTip(creator: string, handle: string) {
    setTipModal({ open: true, creator, handle })
  }
  function closeTip() { setTipModal(m => ({ ...m, open: false })) }

  function approveCreator() {
    setPendingCount(p => Math.max(0, p - 1))
    setApprovedCount(a => a + 1)
    showToast('✅ Creator approved — payouts unlocked')
  }

  function rejectCreator() {
    setPendingCount(p => Math.max(0, p - 1))
    showToast('🚫 Creator rejected & notified')
  }

  function approveProfile() {
    setProfileApproved(true)
    showToast('✅ Your account is approved!')
  }

  return (
    <AppContext.Provider value={{
      screen, role, activeTab, pendingCount, approvedCount,
      toastMsg, toastVisible, tipModal, profileApproved,
      goTo, setRole, setActiveTab: switchTab, showToast,
      openTip, closeTip, approveCreator, rejectCreator, approveProfile,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
