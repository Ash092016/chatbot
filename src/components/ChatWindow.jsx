import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import LoadingIndicator from './LoadingIndicator';

export default function ChatWindow({ messages, isLoading }) {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto py-6 pb-[96px] space-y-4"
      id="chat-window"
    >
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} message={msg} />
      ))}
      {isLoading && <LoadingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
