import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Globe from './components/Globe';
import SuggestedPrompts from './components/SuggestedPrompts';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import ApiKeyModal from './components/ApiKeyModal';
import { SUGGESTED_PROMPTS } from './constants';
import { initializeChat, sendMessage, resetChat } from './gemini';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('geopulse_api_key') || '');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize chat with API key
  const handleApiKeySubmit = useCallback((key) => {
    try {
      initializeChat(key);
      setApiKey(key);
      setIsInitialized(true);
      localStorage.setItem('geopulse_api_key', key);
    } catch (err) {
      console.error('Failed to initialize:', err);
    }
  }, []);

  // Auto-initialize if key exists in localStorage
  React.useEffect(() => {
    if (apiKey && !isInitialized) {
      handleApiKeySubmit(apiKey);
    }
  }, []); // Only run on mount

  // Send a message
  const handleSend = useCallback(async (text) => {
    if (isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: text, timestamp: Date.now() }]);
    setIsLoading(true);

    try {
      const stream = await sendMessage(text);

      // Add empty bot message placeholder
      setMessages(prev => [...prev, { role: 'assistant', content: '', timestamp: Date.now() }]);

      // Throttle state updates using requestAnimationFrame
      // so React re-renders at ~60fps instead of on every tiny chunk
      let fullText = '';
      let rafId = null;

      const flush = () => {
        const captured = fullText;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], content: captured };
          return updated;
        });
        rafId = null;
      };

      for await (const chunk of stream) {
        fullText += chunk;
        if (!rafId) {
          rafId = requestAnimationFrame(flush);
        }
      }

      // Final flush to ensure last chunk is shown
      if (rafId) cancelAnimationFrame(rafId);
      flush();

    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'error', content: err.message || 'An unexpected error occurred. Please try again.', timestamp: Date.now() },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // Reset conversation
  const handleReset = useCallback(() => {
    setMessages([]);
    setIsLoading(false);
    resetChat();
  }, []);

  // Handle suggested prompt selection
  const handlePromptSelect = useCallback((prompt) => {
    handleSend(prompt);
  }, [handleSend]);

  const hasMessages = messages.length > 0;

  return (
    <div className="h-screen flex flex-col bg-navy-950 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-right glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        {/* Bottom-left glow */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* API Key Modal */}
      {!isInitialized && <ApiKeyModal onSubmit={handleApiKeySubmit} />}

      {/* Header */}
      <Header onReset={handleReset} hasMessages={hasMessages} />

      {/* Main Content */}
      {hasMessages ? (
        /* Chat Mode — padded so messages clear the fixed input bar */
        <ChatWindow messages={messages} isLoading={isLoading} />
      ) : (
        /* Landing Mode */
        <div className="flex-1 overflow-y-auto relative z-10">
          <div className="flex flex-col items-center pt-4 pb-[96px] gap-5">
            <div className="animate-fade-in">
              <Globe />
            </div>
            <div className="text-center animate-slide-up px-4">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
                Geopolitical Intelligence,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-gold-400">
                  On Demand
                </span>
              </h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                Ask about international relations, conflicts, alliances, sanctions, and global strategy.
                Get expert-level analysis powered by AI.
              </p>
            </div>
            <div className="animate-slide-up w-full" style={{ animationDelay: '0.15s' }}>
              <SuggestedPrompts prompts={SUGGESTED_PROMPTS} onSelect={handlePromptSelect} />
            </div>
          </div>
        </div>
      )}

      {/* Chat Input — fixed to the very bottom of the viewport, never moves */}
      {isInitialized && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <ChatInput onSend={handleSend} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
}
