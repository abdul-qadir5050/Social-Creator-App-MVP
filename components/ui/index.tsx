'use client'

import { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

// BUTTON
type BtnVariant = 'primary' | 'outline' | 'ghost' | 'green' | 'red'
interface BtnProps {
  children: ReactNode
  variant?: BtnVariant
  size?: 'sm' | 'md'
  full?: boolean
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function Button({ children, variant = 'primary', size = 'md', full = true, onClick, className = '', disabled }: BtnProps) {
  const base = 'flex items-center justify-center gap-2 rounded-full border-none cursor-pointer font-display font-bold tracking-tight transition-all active:scale-95 disabled:opacity-30'
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3.5 text-[15px]' }
  const variants: Record<BtnVariant, string> = {
    primary: 'text-white',
    outline: 'bg-transparent text-white border border-white/20 hover:border-accent hover:text-accent',
    ghost: 'bg-surface2 text-white',
    green: 'bg-[#00e57a] text-black',
    red: 'bg-[#ff4466] text-white',
  }
  const gradStyle = variant === 'primary' ? { background: 'linear-gradient(135deg,#ff3d7f,#ff6b35)' } : {}

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={gradStyle}
      className={`${base} ${sizes[size]} ${variants[variant]} ${full ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  )
}

// BADGE
type BadgeVariant = 'orange' | 'green' | 'purple' | 'red' | 'gold'
interface BadgeProps { children: ReactNode; variant?: BadgeVariant; className?: string }

export function Badge({ children, variant = 'orange', className = '' }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    orange: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
    green:  'bg-green-500/15  text-green-400  border border-green-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
    red:    'bg-red-500/15    text-red-400    border border-red-500/30',
    gold:   'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
  }
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-display font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

// AVATAR
interface AvatarProps { initials: string; size?: number; gradient?: string }
export function Avatar({ initials, size = 44, gradient }: AvatarProps) {
  const bg = gradient || 'linear-gradient(135deg,#ff3d7f,#ff6b35)'
  return (
    <div
      style={{ width: size, height: size, background: bg, fontSize: size * 0.35 }}
      className="rounded-full flex items-center justify-center font-display font-extrabold text-white flex-shrink-0"
    >
      {initials}
    </div>
  )
}

// INPUT
interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label?: string }
export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="mb-3.5">
      {label && <label className="block text-xs font-display font-bold text-[#9090b0] uppercase tracking-widest mb-1.5">{label}</label>}
      <input
        className={`w-full px-4 py-3.5 bg-surface2 border border-white/10 rounded-xl text-[15px] text-white placeholder-[#505070] outline-none focus:border-accent transition-colors appearance-none ${className}`}
        {...props}
      />
    </div>
  )
}

// TEXTAREA
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { label?: string }
export function Textarea({ label, className = '', ...props }: TextareaProps) {
  return (
    <div className="mb-3.5">
      {label && <label className="block text-xs font-display font-bold text-[#9090b0] uppercase tracking-widest mb-1.5">{label}</label>}
      <textarea
        className={`w-full px-4 py-3.5 bg-surface2 border border-white/10 rounded-xl text-[15px] text-white placeholder-[#505070] outline-none focus:border-accent transition-colors resize-none leading-relaxed ${className}`}
        {...props}
      />
    </div>
  )
}

// TOAST
interface ToastProps { message: string; visible: boolean }
export function Toast({ message, visible }: ToastProps) {
  return (
    <div className={`
      fixed top-5 left-1/2 z-[300] -translate-x-1/2
      bg-surface border border-white/10 rounded-xl px-5 py-3
      text-sm font-semibold whitespace-nowrap
      flex items-center gap-2
      transition-all duration-300
      ${visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}
    `}>
      {message}
    </div>
  )
}

// STAT BOX
interface StatBoxProps { value: string | number; label: string; valueClass?: string }
export function StatBox({ value, label, valueClass = '' }: StatBoxProps) {
  return (
    <div className="flex-1 bg-surface border border-white/10 rounded-2xl p-3.5 text-center">
      <div className={`font-display text-2xl font-extrabold tracking-tight ${valueClass}`}>{value}</div>
      <div className="text-[11px] text-[#9090b0] mt-1 font-medium">{label}</div>
    </div>
  )
}
