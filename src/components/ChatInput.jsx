import React, { useState, useRef, useEffect } from 'react';

export default function ChatInput({ onSend, isLoading }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="glass-strong border-t border-white/5 px-4 py-3">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto flex items-end gap-3"
      >
        {/* Input Area */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about geopolitics, conflicts, alliances..."
            disabled={isLoading}
            rows={1}
            className="w-full resize-none rounded-xl bg-navy-800/80 border border-navy-600 
                       text-sm text-slate-100 placeholder-slate-500 px-4 py-3 pr-12
                       focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20
                       transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {/* Character hint */}
          <div className="absolute right-3 bottom-2 text-[10px] text-slate-600">
            {input.length > 0 && (
              <span>{input.length}</span>
            )}
          </div>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-teal-400 
                     flex items-center justify-center flex-shrink-0
                     hover:from-teal-400 hover:to-teal-300 hover:shadow-lg hover:shadow-teal-500/25
                     disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none
                     transition-all duration-200 cursor-pointer group"
          title="Send message"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
          ) : (
            <svg
              className="w-5 h-5 text-navy-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          )}
        </button>
      </form>
      <p className="text-center text-[10px] text-slate-600 mt-2 max-w-3xl mx-auto">
        GeoPulse provides AI analysis for informational purposes. Always verify with authoritative sources.
      </p>
    </div>
  );
}
