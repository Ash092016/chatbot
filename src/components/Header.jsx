import React from 'react';

export default function Header({ onReset, hasMessages }) {
  return (
    <header className="glass-strong sticky top-0 z-50 px-4 sm:px-6 py-3 flex items-center justify-between">
      {/* Logo & Brand */}
      <div className="flex items-center gap-3">
        <div className="relative w-9 h-9 flex items-center justify-center">
          {/* Radar ring */}
          <div className="absolute inset-0 rounded-full border border-teal-500/30 animate-[glow-pulse_3s_ease-in-out_infinite]" />
          {/* Globe icon */}
          <svg viewBox="0 0 100 100" className="w-7 h-7 relative z-10">
            <defs>
              <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1abc9c" />
                <stop offset="100%" stopColor="#c9a84c" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="none" stroke="url(#hg)" strokeWidth="3" />
            <ellipse cx="50" cy="50" rx="26" ry="42" fill="none" stroke="url(#hg)" strokeWidth="1.5" />
            <line x1="8" y1="50" x2="92" y2="50" stroke="url(#hg)" strokeWidth="1.5" />
            <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="url(#hg)" strokeWidth="1" />
          </svg>
        </div>
        <div>
          <h1 className="font-display text-lg sm:text-xl font-bold tracking-tight">
            <span className="text-teal-400">Geo</span>
            <span className="text-gold-400">Pulse</span>
          </h1>
          <p className="text-[10px] sm:text-xs text-slate-400 -mt-0.5 tracking-widest uppercase">
            Intelligence Briefing
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {hasMessages && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 
                       rounded-lg border border-navy-600 hover:border-teal-500/40 hover:text-teal-400 
                       transition-all duration-200 cursor-pointer"
            title="Start new conversation"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">New Chat</span>
          </button>
        )}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-teal-500/10 border border-teal-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-[pulse-dot_2s_ease-in-out_infinite]" />
          <span className="text-[10px] text-teal-400 font-medium uppercase tracking-wider">Live</span>
        </div>
      </div>
    </header>
  );
}
