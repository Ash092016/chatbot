import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  const isError = message.role === 'error';

  if (isError) {
    return (
      <div className="flex justify-center px-4 animate-message-in">
        <div className="max-w-lg w-full rounded-xl p-4 bg-alert-red/10 border border-alert-red/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-alert-red/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-alert-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-alert-red">Analysis Error</p>
              <p className="text-xs text-slate-300 mt-1 whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-4 animate-message-in`}
    >
      <div className={`flex items-start gap-3 max-w-[85%] sm:max-w-[75%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-gradient-to-br from-gold-500 to-gold-400'
            : 'bg-gradient-to-br from-teal-500 to-teal-400'
        }`}>
          {isUser ? (
            <svg className="w-4 h-4 text-navy-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-navy-900" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="5" />
              <ellipse cx="50" cy="50" rx="22" ry="38" fill="none" stroke="currentColor" strokeWidth="3" />
              <line x1="12" y1="50" x2="88" y2="50" stroke="currentColor" strokeWidth="3" />
            </svg>
          )}
        </div>

        {/* Message Bubble */}
        <div className={`rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-gradient-to-br from-navy-600 to-navy-700 border border-navy-500/40'
            : 'glass'
        }`}>
          {/* Label */}
          <p className={`text-[10px] font-semibold uppercase tracking-widest mb-1.5 ${
            isUser ? 'text-gold-400' : 'text-teal-400'
          }`}>
            {isUser ? 'You' : 'GeoPulse'}
          </p>

          {/* Content */}
          {isUser ? (
            <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="markdown-content text-sm text-slate-200">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}

          {/* Timestamp */}
          {message.timestamp && (
            <p className="text-[10px] text-slate-500 mt-2 text-right">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
