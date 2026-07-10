// context/FrenchAIContext.tsx
//
// Single shared state for the whole French AI feature: current CEFR level
// and the tutor config (levels + roleplay scenes), fetched once. Every
// screen under app/(standalone)/frenchAI/ reads/writes level from here —
// no more passing it via route params or props.

import React, { createContext, useContext, useState, useCallback } from 'react';
import { type CefrLevel, type TutorConfig } from '@/hooks/useFrenchAI/types';
import {useConfig} from '@/hooks/useFrenchAI/useConfig';

const LEVEL_ORDER: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

interface FrenchAIContextValue {
  level: CefrLevel;
  setLevel: (l: CefrLevel) => void;
  cycleLevel: () => void;
  config: TutorConfig | null;
  configLoading: boolean;
  configError: string | null;
  reloadConfig: () => void;
}

const FrenchAIContext = createContext<FrenchAIContextValue | null>(null);

export function FrenchAIProvider({ children }: { children: React.ReactNode }) {
  const [level, setLevel] = useState<CefrLevel>('A1');
  const { config, loading: configLoading, error: configError, reload: reloadConfig } = useConfig();

  const cycleLevel = useCallback(() => {
    setLevel(prev => {
      const i = LEVEL_ORDER.indexOf(prev);
      return LEVEL_ORDER[(i + 1) % LEVEL_ORDER.length];
    });
  }, []);

  return (
    <FrenchAIContext.Provider
      value={{ level, setLevel, cycleLevel, config, configLoading, configError, reloadConfig }}
    >
      {children}
    </FrenchAIContext.Provider>
  );
}

export function useFrenchAIContext() {
  const ctx = useContext(FrenchAIContext);
  if (!ctx) throw new Error('useFrenchAIContext must be used within FrenchAIProvider');
  return ctx;
}