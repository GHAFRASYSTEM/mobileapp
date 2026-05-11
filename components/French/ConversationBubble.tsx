/**
 * ConversationBubble.tsx
 *
 * Audio-first bubble with automatic playback for the latest assistant message.
 * Supports light + dark mode via useColors().
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Audio } from 'expo-av';
import { useColors } from '@/constants/Colors';

export interface BubbleMessage {
  id:          string;
  role:        'user' | 'assistant';
  text:        string;
  translation?: string;
  correction?:  string;
  tip?:         string;
  audioUri?:    string;
}

interface Props {
  message:     BubbleMessage;
  onPlay?:     (text: string) => Promise<string | null>;
  ttsLoading?: boolean;
  isLatest?:   boolean;
}

// ── Shared helper: reset audio session before every play ──────────────────────
// Without this, iOS ducks the session after the first sound finishes,
// causing all subsequent plays to be significantly quieter.
async function prepareAudioSession() {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS:         false,
    playsInSilentModeIOS:       true,   // respect the ringer switch
    staysActiveInBackground:    false,
    shouldDuckAndroid:          false,  // don't let other apps lower our volume
    playThroughEarpieceAndroid: false,
  });
}

export default function ConversationBubble({
  message,
  onPlay,
  ttsLoading,
  isLatest = false,
}: Props) {
  const C = useColors();

  const [showTranslation, setShowTranslation] = useState(false);
  const [showCorrection,  setShowCorrection]  = useState(false);
  const [isPlaying,       setIsPlaying]       = useState(false);
  const [audioLoading,    setAudioLoading]    = useState(false);

  const soundRef      = useRef<Audio.Sound | null>(null);
  const hasAutoPlayed = useRef(false);
  const isAssistant   = message.role === 'assistant';

  // ── Shared playback logic ─────────────────────────────────────────────────
  const playUri = async (uri: string) => {
    // Always reset the audio session right before creating the sound.
    // This is what prevents the volume drop on the 2nd+ plays.
    await prepareAudioSession();

    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true, isLooping: false, volume: 1.0 },
    );
    soundRef.current = sound;
    setIsPlaying(true);
    sound.setOnPlaybackStatusUpdate(status => {
      if (status.isLoaded && status.didJustFinish) setIsPlaying(false);
    });
  };

  // ── Auto-play latest assistant message ────────────────────────────────────
  useEffect(() => {
    if (!isAssistant || !isLatest || !onPlay || hasAutoPlayed.current) return;

    const autoPlay = async () => {
      hasAutoPlayed.current = true;
      setAudioLoading(true);
      try {
        if (soundRef.current) {
          await soundRef.current.unloadAsync();
          soundRef.current = null;
        }
        const uri = await onPlay(message.text);
        if (!uri) return;
        await playUri(uri);
      } catch (e) {
        console.error('Auto-play error:', e);
      } finally {
        setAudioLoading(false);
      }
    };

    const timer = setTimeout(autoPlay, 600);
    return () => clearTimeout(timer);
  }, [isAssistant, isLatest, onPlay, message.text]);

  // ── Manual play ───────────────────────────────────────────────────────────
  const handleManualPlay = async () => {
    if (!onPlay || audioLoading || isPlaying) return;
    setAudioLoading(true);
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      const uri = await onPlay(message.text);
      if (!uri) return;
      await playUri(uri);
    } catch (e) {
      console.error('Manual playback error', e);
    } finally {
      setAudioLoading(false);
    }
  };

  useEffect(() => {
    return () => { soundRef.current?.unloadAsync(); };
  }, []);

  // ── User bubble ───────────────────────────────────────────────────────────
  if (!isAssistant) {
    return (
      <View style={[styles.row, styles.rowUser]}>
        <View style={[styles.userBubble, { backgroundColor: C.primarySubtle, borderColor: C.borderFocus }]}>
          <Text style={[styles.userText, { color: C.textPrimary }]}>{message.text}</Text>
        </View>
      </View>
    );
  }

  // ── Assistant bubble ──────────────────────────────────────────────────────
  return (
    <View style={[styles.row, styles.rowAssistant]}>
      <View style={[styles.assistantBubble, { backgroundColor: C.surface, borderColor: C.border }]}>

        {/* Audio player row */}
        <View style={styles.audioRow}>
          <TouchableOpacity
            onPress={handleManualPlay}
            style={[
              styles.playBtn,
              { backgroundColor: C.primarySubtle, borderColor: C.primary },
              isPlaying && { backgroundColor: C.primary },
            ]}
            disabled={audioLoading}
          >
            {audioLoading ? (
              <ActivityIndicator size="small" color={C.primary} />
            ) : (
              <Text style={[styles.playIcon, { color: isPlaying ? C.textInverse : C.primary }]}>
                {isPlaying ? '⏸' : '▶'}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.waveformPlaceholder}>
            {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.4, 0.7, 1, 0.6].map((h, i) => (
              <View
                key={i}
                style={[
                  styles.waveDot,
                  { height: 6 + h * 16, backgroundColor: C.primary, opacity: isPlaying ? 0.9 : 0.35 },
                ]}
              />
            ))}
          </View>
        </View>

        {/* French text */}
        <Text style={[styles.frenchText, { color: C.textPrimary }]}>{message.text}</Text>

        {/* Translation toggle */}
        {message.translation && (
          <TouchableOpacity
            onPress={() => setShowTranslation(v => !v)}
            style={styles.toggleRow}
          >
            <Text style={[styles.toggleLabel, { color: C.blue }]}>
              {showTranslation ? '▲ Hide translation' : '▼ Show translation'}
            </Text>
          </TouchableOpacity>
        )}
        {showTranslation && message.translation && (
          <View style={[styles.translationBox, { backgroundColor: C.blueSubtle, borderLeftColor: C.blue }]}>
            <Text style={[styles.translationText, { color: C.textLink }]}>{message.translation}</Text>
          </View>
        )}

        {/* Correction toggle */}
        {message.correction && (
          <TouchableOpacity
            onPress={() => setShowCorrection(v => !v)}
            style={[styles.toggleRow, styles.correctionToggle]}
          >
            <Text style={[styles.toggleLabel, { color: C.gold }]}>
              {showCorrection ? '▲ Hide correction' : '❌ See correction'}
            </Text>
          </TouchableOpacity>
        )}
        {showCorrection && message.correction && (
          <View style={[styles.correctionBox, { backgroundColor: C.goldSubtle, borderLeftColor: C.gold }]}>
            <Text style={[styles.correctionText, { color: C.textWarning }]}>{message.correction}</Text>
          </View>
        )}

        {/* Tip */}
        {message.tip && (
          <View style={[styles.tipBox, { backgroundColor: C.primarySubtle, borderLeftColor: C.primary }]}>
            <Text style={[styles.tipText, { color: C.textSuccess }]}>💡 {message.tip}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row:          { marginVertical: 4, paddingHorizontal: 12 },
  rowUser:      { alignItems: 'flex-end' },
  rowAssistant: { alignItems: 'flex-start' },

  userBubble: {
    borderRadius:            18,
    borderBottomRightRadius: 4,
    paddingHorizontal:       14,
    paddingVertical:         10,
    maxWidth:                '80%',
    borderWidth:             1,
  },
  userText: { fontSize: 14, lineHeight: 20 },

  assistantBubble: {
    borderRadius:           18,
    borderBottomLeftRadius: 4,
    paddingHorizontal:      14,
    paddingVertical:        12,
    maxWidth:               '88%',
    gap:                    8,
    borderWidth:            1,
  },

  audioRow:            { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 2 },
  playBtn:             {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1,
  },
  playIcon:            { fontSize: 14 },
  waveformPlaceholder: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 2, height: 28,
  },
  waveDot:             { width: 3, borderRadius: 2 },

  frenchText: { fontSize: 15, lineHeight: 22, fontWeight: '500' },

  toggleRow:        { flexDirection: 'row', alignItems: 'center', paddingVertical: 2 },
  correctionToggle: { marginTop: 2 },
  toggleLabel:      { fontSize: 11, fontWeight: '600' },

  translationBox: {
    borderRadius: 8, padding: 8, borderLeftWidth: 2,
  },
  translationText: { fontSize: 13, lineHeight: 18, fontStyle: 'italic' },

  correctionBox: {
    borderRadius: 8, padding: 8, borderLeftWidth: 2,
  },
  correctionText: { fontSize: 12, lineHeight: 18 },

  tipBox: {
    borderRadius: 8, padding: 8, borderLeftWidth: 2, marginTop: 2,
  },
  tipText: { fontSize: 12, lineHeight: 17 },
});