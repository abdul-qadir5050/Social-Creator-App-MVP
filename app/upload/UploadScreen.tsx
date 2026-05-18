'use client'

import { useState } from 'react'
import { useApp } from '@/lib/context'
import { Button, Textarea, Input } from '@/components/ui'

export default function UploadScreen() {
  const { showToast, setActiveTab } = useApp()
  const [stage, setStage] = useState<'idle' | 'uploading' | 'ready'>('idle')

  function simulateUpload() {
    setStage('uploading')
    setTimeout(() => setStage('ready'), 1200)
  }

  function submit() {
    showToast('🎬 Video posted! Tips held until approval.')
    setTimeout(() => {
      setStage('idle')
      setActiveTab('feed')
    }, 300)
  }

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4 pb-3 flex-shrink-0">
        <div className="font-display text-[22px] font-extrabold tracking-tight">
          <span className="grad-text">Upload</span>
        </div>
        <span className="text-sm text-[#9090b0]">New post</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-28 px-4">
        {/* Upload zone */}
        {stage === 'idle' && (
          <div
            onClick={simulateUpload}
            className="border-2 border-dashed border-surface3 bg-surface rounded-2xl p-12 text-center cursor-pointer mb-4 transition-colors hover:border-accent/50"
          >
            <div className="text-5xl mb-3">📱</div>
            <div className="font-display text-lg font-bold mb-1.5">Upload video</div>
            <div className="text-sm text-[#9090b0] mb-4">Tap to select from camera roll</div>
            <div className="flex items-center justify-center gap-2">
              <span className="bg-purple-500/15 text-purple-400 border border-purple-500/30 text-[11px] font-display font-bold px-2.5 py-1 rounded-full tracking-widest uppercase">Vertical 9:16</span>
              <span className="text-[#505070]">·</span>
              <span className="bg-purple-500/15 text-purple-400 border border-purple-500/30 text-[11px] font-display font-bold px-2.5 py-1 rounded-full tracking-widest uppercase">Max 60s</span>
            </div>
          </div>
        )}

        {/* Uploading */}
        {stage === 'uploading' && (
          <div className="border-2 border-accent/50 bg-surface rounded-2xl p-12 text-center mb-4">
            <div className="text-5xl mb-3">⬆️</div>
            <div className="font-display text-lg font-bold mb-1.5">Uploading...</div>
            <div className="text-sm text-[#9090b0]">Processing your video</div>
          </div>
        )}

        {/* Preview + form */}
        {stage === 'ready' && (
          <>
            <div className="rounded-2xl overflow-hidden mb-4 relative" style={{ aspectRatio: '9/16', maxHeight: 300, background: 'linear-gradient(135deg,#1a0a2e,#2d1b69)' }}>
              <div className="absolute inset-0 flex items-center justify-center text-6xl">🎬</div>
              <div className="absolute top-3 right-3 bg-green-500/15 text-green-400 border border-green-500/30 text-[11px] font-display font-bold px-2.5 py-1 rounded-full tracking-widest uppercase">Ready</div>
            </div>

            <Textarea label="Caption" rows={3} defaultValue="New content dropping 🔥 Can't wait for you to see this!" />
            <Input label="Tags" defaultValue="#music #creator #flare" />

            <div className="bg-surface border border-white/10 rounded-2xl p-4 mb-5 text-sm text-[#9090b0] leading-relaxed">
              ⚡ Your content goes live immediately. Tips earned while pending approval will be held securely and released when your account is verified.
            </div>

            <Button onClick={submit}>Post video</Button>
          </>
        )}
      </div>
    </div>
  )
}
