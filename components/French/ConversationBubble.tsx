/**
 * ConversationBubble.tsx
 *
 * Audio-first bubble with automatic playback for the latest assistant message.
 * Supports light + dark mode via useColors().
 *
 * Waveform: each message gets a stable, deterministic "fake amplitude"
 * pattern seeded from its id (so the same message always looks the same,
 * rather than re-randomizing on every render). It fills the full bubble
 * width and a real progress sweep — driven by actual playback position —
 * highlights bars as the audio plays.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  LayoutChangeEvent,
} from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
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

// ── Waveform geometry ───────────────────────────────────────────────────────
const BAR_WIDTH   = 3;
const BAR_GAP     = 2;
const BAR_MIN_H   = 6;
const BAR_MAX_H   = 26;

// ── Deterministic "amplitude" generator ─────────────────────────────────────
// Same message id always produces the same bar pattern. This is a stable
// pseudo-random sequence (mulberry32), not real decoded audio amplitude —
// see PR discussion: a true waveform would need server-side peak extraction.
function seededRandom(seed: number) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return h;
}

/** Generate `count` amplitude values in [0,1], stable per seed string. */
function generateWaveform(seed: string, count: number): number[] {
  const rand = seededRandom(hashString(seed));
  const values: number[] = [];
  // Walk with momentum so neighboring bars don't jump randomly —
  // reads more like a real waveform envelope than pure noise.
  let prev = 0.5;
  for (let i = 0; i < count; i++) {
    const jitter = (rand() - 0.5) * 0.6;
    prev = Math.min(1, Math.max(0.15, prev + jitter));
    values.push(prev);
  }
  return values;
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
  const [progress,        setProgress]        = useState(0); // 0..1 playback position
  const [waveformWidth,   setWaveformWidth]   = useState(0);

  const soundRef      = useRef<Audio.Sound | null>(null);
  const hasAutoPlayed = useRef(false);
  const isAssistant   = message.role === 'assistant';

  // ── Bar count derived from measured width, so it's always full-width ─────
  const barCount = Math.max(8, Math.floor(waveformWidth / (BAR_WIDTH + BAR_GAP)));
  const waveform = React.useMemo(
    () => generateWaveform(message.id, barCount),
    [message.id, barCount],
  );

  const onWaveformLayout = useCallback((e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (Math.abs(w - waveformWidth) > 1) setWaveformWidth(w);
  }, [waveformWidth]);

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
    setProgress(0);
    sound.setOnPlaybackStatusUpdate(status => {
      if (!status.isLoaded) return;
      if (status.durationMillis) {
        setProgress(status.positionMillis / status.durationMillis);
      }
      if (status.didJustFinish) {
        setIsPlaying(false);
        setProgress(1);
      }
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
  const litBarCount = Math.round(progress * waveform.length);

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
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={14}
                color={isPlaying ? C.textInverse : C.primary}
              />
            )}
          </TouchableOpacity>

          <View
            style={styles.waveformContainer}
            onLayout={onWaveformLayout}
          >
            {waveform.map((amp, i) => {
              const lit = i < litBarCount;
              return (
                <View
                  key={i}
                  style={[
                    styles.waveDot,
                    {
                      height:          BAR_MIN_H + amp * (BAR_MAX_H - BAR_MIN_H),
                      backgroundColor: lit ? C.primary : C.primary,
                      opacity:         lit ? 1 : (isPlaying || progress > 0 ? 0.3 : 0.45),
                    },
                  ]}
                />
              );
            })}
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
            <Ionicons
              name={showTranslation ? 'chevron-up' : 'chevron-down'}
              size={13}
              color={C.blue}
            />
            <Text style={[styles.toggleLabel, { color: C.blue }]}>
              {showTranslation ? 'Hide translation' : 'Show translation'}
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
            <Ionicons
              name={showCorrection ? 'chevron-up' : 'alert-circle-outline'}
              size={13}
              color={C.gold}
            />
            <Text style={[styles.toggleLabel, { color: C.gold }]}>
              {showCorrection ? 'Hide correction' : 'See correction'}
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
            <Ionicons name="bulb-outline" size={13} color={C.textSuccess} style={styles.tipIcon} />
            <Text style={[styles.tipText, { color: C.textSuccess }]}>{message.tip}</Text>
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
    width:                  '88%', // fixed width (not maxWidth) so waveform can measure + fill reliably
    gap:                    8,
    borderWidth:            1,
  },

  audioRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:            10,
    marginBottom:   2,
    width:          '100%',
  },
  playBtn: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1,
  },

  waveformContainer: {
    flex:          1,           // fills remaining width next to the play button
    flexDirection: 'row',
    alignItems:    'center',
    gap:           BAR_GAP,
    height:        BAR_MAX_H + 4,
  },
  waveDot: {
    width:        BAR_WIDTH,
    borderRadius: BAR_WIDTH / 2,
  },

  frenchText: { fontSize: 15, lineHeight: 22, fontWeight: '500' },

  toggleRow:        { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 2 },
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
    flexDirection: 'row', alignItems: 'flex-start', gap: 6,
    borderRadius: 8, padding: 8, borderLeftWidth: 2, marginTop: 2,
  },
  tipIcon: { marginTop: 2 },
  tipText: { flex: 1, fontSize: 12, lineHeight: 17 },
});