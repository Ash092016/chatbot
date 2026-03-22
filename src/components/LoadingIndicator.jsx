import React from 'react';

export default function LoadingIndicator() {
  return (
    <div className="flex justify-start px-4 animate-message-in">
      <div className="flex items-start gap-3 max-w-[75%]">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-navy-900 animate-spin-slow" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="5" />
            <ellipse cx="50" cy="50" rx="22" ry="38" fill="none" stroke="currentColor" strokeWidth="3" />
            <line x1="12" y1="50" x2="88" y2="50" stroke="currentColor" strokeWidth="3" />
          </svg>
        </div>

        {/* Typing Bubble */}
        <div className="glass rounded-2xl px-5 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2 text-teal-400">
            GeoPulse
          </p>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-teal-400"
                  style={{
                    animation: `pulse-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-slate-400 ml-1">Processing your request...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
