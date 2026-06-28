// hooks/useFrenchAI/useChat.ts
//
// Sends a conversation turn (chat, correction, or roleplay mode) to the
// backend and returns the assistant's reply as a BubbleMessage.

import { useCallback, useState } from 'react';
import type { BubbleMessage } from '@/components/French/ConversationBubble';
import { api } from '@/services/api';
import type { ChatAPIResponse, ChatPayload } from './types';

export function useChat() {
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const send = useCallback(async (
    payload: ChatPayload,
  ): Promise<BubbleMessage | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.post<ChatAPIResponse>(
        '/french-ai/chat',
        payload as Record<string, unknown>,
      );
      if (data.suggestions?.length) setSuggestions(data.suggestions);
      return {
        id:          Date.now().toString(),
        role:        'assistant',
        text:        data.reply,
        translation: data.translation,
        correction:  data.correction ?? undefined,
        tip:         data.tip ?? undefined,
      };
    } catch (e: any) {
      console.error('Chat error:', e);
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSuggestions = useCallback(() => setSuggestions([]), []);

  return { send, loading, error, suggestions, clearSuggestions };
}