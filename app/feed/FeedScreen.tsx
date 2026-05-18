'use client'

import { useState, useRef } from 'react'
import { useApp } from '@/lib/context'
import { Avatar, Button } from '@/components/ui'

const VIDEOS = [
  {
    id: 0,
    creator: 'Sofia Ray',
    handle: '@sofiaray',
    initials: 'SR',
    gradient: 'linear-gradient(160deg,#1a0a2e,#2d1b69,#1a0a2e)',
    caption: 'New track just dropped 🌊 Ocean Vibes is out now #music #songwriter #vibes',
    likes: 1200,
    emoji: '🎵',
    label: 'Ocean Vibes',
    following: false,
  },
  {
    id: 1,
    creator: 'Kai Moves',
    handle: '@kaimoves',
    initials: 'KM',
    gradient: 'linear-gradient(160deg,#0a2e1a,#1b5e20,#0a2e1a)',
    avatarGrad: 'linear-gradient(135deg,#00c6ff,#0072ff)',
    caption: 'Tutorial dropping Friday 🔥 This routine goes HARD #dance #choreography #trending',
    likes: 3800,
    emoji: '💃',
    following: true,
  },
  {
    id: 2,
    creator: 'Jake Lee',
    handle: '@jakelee',
    initials: 'JL',
    gradient: 'linear-gradient(160deg,#2e0a1a,#5e1b2e,#2e0a1a)',
    avatarGrad: 'linear-gradient(135deg,#f093fb,#f5576c)',
    caption: 'When you nail the timing 😂 #comedy #relatable #foryou',
    likes: 9200,
    emoji: '😂',
    following: false,
  },
]

function formatNum(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return String(n)
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill={filled ? 'white' : 'none'} stroke="white" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}

export default function FeedScreen() {
  const { openTip } = useApp()
  const [likes, setLikes] = useState<Record<number, { liked: boolean; count: number }>>(
    Object.fromEntries(VIDEOS.map(v => [v.id, { liked: false, count: v.likes }]))
  )
  const [floatingEmoji, setFloatingEmoji] = useState<{ id: number; x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  function toggleLike(videoId: number, e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const appRect = containerRef.current?.getBoundingClientRect()
    if (appRect) {
      setFloatingEmoji({ id: Date.now(), x: rect.left - appRect.left + rect.width / 2, y: rect.top - appRect.top })
    }
    setLikes(prev => ({
      ...prev,
      [videoId]: {
        liked: !prev[videoId].liked,
        count: prev[videoId].liked ? prev[videoId].count - 1 : prev[videoId].count + 1,
      },
    }))
    setTimeout(() => setFloatingEmoji(null), 1300)
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Floating emoji */}
      {floatingEmoji && (
        <div
          className="absolute pointer-events-none text-2xl animate-float z-50"
          style={{ left: floatingEmoji.x - 12, top: floatingEmoji.y }}
        >
          ❤️
        </div>
      )}

      <div className="h-full overflow-y-scroll snap-container no-scrollbar">
        {VIDEOS.map(video => (
          <div
            key={video.id}
            className="snap-item h-full flex-shrink-0 relative"
            style={{ height: '100%' }}
          >
            {/* Background */}
            <div className="w-full h-full relative flex items-center justify-center" style={{ background: video.gradient }}>
              {/* Content */}
              <div className="flex flex-col items-center gap-3">
                <div className="text-6xl">{video.emoji}</div>
                {video.label && (
                  <div className="text-sm text-white/50 font-medium">{video.label}</div>
                )}
                {video.label && (
                  <div className="flex gap-1 items-end">
                    {[20, 30, 15, 25, 18, 22].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 rounded-sm bg-accent"
                        style={{
                          height: h,
                          animation: `pulseBar ${0.5 + i * 0.1}s ease-in-out infinite alternate`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="absolute right-3 bottom-24 flex flex-col gap-5 items-center">
                {/* Like */}
                <button
                  onClick={(e) => toggleLike(video.id, e)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={`w-11 h-11 rounded-full border border-white/20 flex items-center justify-center transition-all backdrop-blur-md ${likes[video.id].liked ? 'bg-accent border-accent' : 'bg-white/15'}`}>
                    <HeartIcon filled={likes[video.id].liked} />
                  </div>
                  <span className="text-white text-xs font-display font-bold">{formatNum(likes[video.id].count)}</span>
                </button>

                {/* Tip */}
                <button
                  onClick={() => openTip(video.creator, video.handle)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-11 h-11 rounded-full bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-md">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <span className="text-white text-xs font-display font-bold">Tip</span>
                </button>

                {/* Share */}
                <button className="flex flex-col items-center gap-1">
                  <div className="w-11 h-11 rounded-full bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-md">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                  </div>
                  <span className="text-white text-xs font-display font-bold">Share</span>
                </button>
              </div>

              {/* Bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 pb-20" style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.9) 0%,transparent 100%)' }}>
                {/* Creator row */}
                <div className="flex items-center gap-3 mb-2.5">
                  <Avatar initials={video.initials} size={36} gradient={video.avatarGrad} />
                  <div>
                    <div className="font-bold text-[15px] text-white">{video.creator}</div>
                    <div className="text-xs text-white/70">{video.handle}</div>
                  </div>
                  <div className="ml-auto">
                    <Button
                      variant={video.following ? 'outline' : 'primary'}
                      size="sm"
                      full={false}
                      className="px-4 py-1.5 text-xs border-white/40 text-white"
                    >
                      {video.following ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">{video.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
