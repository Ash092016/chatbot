import React, { useState } from 'react';

export default function ApiKeyModal({ onSubmit }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = key.trim();
    if (!trimmed) {
      setError('Please enter your API key');
      return;
    }
    setError('');
    onSubmit(trimmed);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/90 backdrop-blur-sm animate-fade-in">
      <div className="glass-strong rounded-2xl p-8 max-w-md w-full mx-4 animate-slide-up shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-teal-500/20 to-gold-500/20 
                          flex items-center justify-center mb-4 border border-teal-500/20">
            <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
          </div>
          <h2 className="font-display text-xl font-bold text-slate-100">Connect to GeoPulse</h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Enter your Google Gemini API key to activate the geopolitical intelligence engine.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="api-key" className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
              Gemini API Key
            </label>
            <input
              id="api-key"
              type="password"
              value={key}
              onChange={(e) => { setKey(e.target.value); setError(''); }}
              placeholder="AIza..."
              className="w-full rounded-xl bg-navy-800/80 border border-navy-600 text-sm text-slate-100 
                         placeholder-slate-500 px-4 py-3 focus:outline-none focus:border-teal-500/50 
                         focus:ring-1 focus:ring-teal-500/20 transition-all duration-200"
              autoFocus
            />
            {error && (
              <p className="text-xs text-alert-red mt-1.5">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 
                       text-navy-900 font-semibold text-sm hover:from-teal-400 hover:to-teal-300 
                       hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-200 cursor-pointer"
          >
            Activate Intelligence Engine
          </button>
        </form>

        {/* Help text */}
        <p className="text-center text-[11px] text-slate-500 mt-4 leading-relaxed">
          Get your free API key from{' '}
          <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-300 underline underline-offset-2 transition-colors"
          >
            Google AI Studio
          </a>
          . Your key stays in your browser — it&apos;s never sent to our servers.
        </p>
      </div>
    </div>
  );
}
