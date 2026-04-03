import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, TextInput,
} from 'react-native';
import { useColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppHeader from '@/components/Headers/AppHeader';

const POSTS = [
  { id: '1', author: 'Ama Boateng',   time: '2h ago',  body: 'Does anyone know if the April meeting is still happening at the usual venue?',    likes: 4,  replies: 2 },
  { id: '2', author: 'Kofi Mensah',   time: '5h ago',  body: 'Reminder: dues are due by end of month. Pay via the card screen.',                 likes: 11, replies: 5 },
  { id: '3', author: 'Efua Darko',    time: '1d ago',  body: 'Great turnout at the networking event last Saturday! Looking forward to the next.', likes: 18, replies: 7 },
];

export default function CommunityScreen() {
  const C = useColors();
  const [tab, setTab] = useState<'feed' | 'events'>('feed');

  return (
    <View style={[styles.safe, { backgroundColor: C.background }]}>
      {/* Header */}
  <AppHeader
    title="Community"
    rightIcon="bell"
  />

      {/* Tabs */}
      <View style={[styles.tabRow, { backgroundColor: C.surface, borderBottomColor: C.border }]}>
        {(['feed', 'events'] as const).map((t) => (
          <TouchableOpacity key={t} style={styles.tabBtn} onPress={() => setTab(t)}>
            <Text style={[styles.tabLabel, { color: tab === t ? C.primary : C.textMuted }]}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
            {tab === t && <View style={[styles.tabUnderline, { backgroundColor: C.primary }]} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {tab === 'feed' ? (
          <>
            {/* Compose */}
            <View style={[styles.compose, { backgroundColor: C.surface, borderColor: C.border }]}>
              <View style={[styles.composerAvatar, { backgroundColor: C.gold }]}>
                <Text style={{ fontWeight: '700', color: C.cardBg }}>KA</Text>
              </View>
              <TouchableOpacity style={[styles.composerInput, { backgroundColor: C.background, borderColor: C.border }]}>
                <Text style={{ color: C.textMuted, fontSize: 14 }}>Share something with the community…</Text>
              </TouchableOpacity>
            </View>

            {POSTS.map((post) => (
              <View key={post.id} style={[styles.postCard, { backgroundColor: C.surface, borderColor: C.border }]}>
                <View style={styles.postHeader}>
                  <View style={[styles.avatar, { backgroundColor: C.primarySubtle }]}>
                    <Text style={{ color: C.primary, fontWeight: '700', fontSize: 13 }}>
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.postAuthor, { color: C.textPrimary }]}>{post.author}</Text>
                    <Text style={[styles.postTime, { color: C.textMuted }]}>{post.time}</Text>
                  </View>
                </View>
                <Text style={[styles.postBody, { color: C.textSecondary }]}>{post.body}</Text>
                <View style={styles.postActions}>
                  <TouchableOpacity style={styles.postAction}>
                    <IconSymbol size={16} name="heart" color={C.textMuted} />
                    <Text style={[styles.postActionText, { color: C.textMuted }]}>{post.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.postAction}>
                    <IconSymbol size={16} name="bubble.left" color={C.textMuted} />
                    <Text style={[styles.postActionText, { color: C.textMuted }]}>{post.replies}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        ) : (
          <>
            {[
              { title: 'Annual General Meeting', date: 'Apr 20, 2025', loc: 'Accra Community Hall', color: C.primary },
              { title: 'Networking Mixer',        date: 'May 3, 2025',  loc: 'Virtual — Zoom',      color: C.blue   },
              { title: 'Leadership Workshop',     date: 'May 17, 2025', loc: 'Kumasi Branch Office', color: C.gold  },
            ].map((ev) => (
              <View key={ev.title} style={[styles.eventCard, { backgroundColor: C.surface, borderColor: C.border }]}>
                <View style={[styles.eventAccent, { backgroundColor: ev.color }]} />
                <View style={styles.eventBody}>
                  <Text style={[styles.eventTitle, { color: C.textPrimary }]}>{ev.title}</Text>
                  <Text style={[styles.eventMeta, { color: C.textMuted }]}>{ev.date} · {ev.loc}</Text>
                </View>
                <TouchableOpacity style={[styles.rsvpBtn, { borderColor: C.primary }]}>
                  <Text style={[styles.rsvpText, { color: C.primary }]}>RSVP</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe:            { flex: 1 },
  header:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  pageTitle:       { fontSize: 20, fontWeight: '700' },
  tabRow:          { flexDirection: 'row', borderBottomWidth: 1 },
  tabBtn:          { flex: 1, alignItems: 'center', paddingVertical: 12 },
  tabLabel:        { fontSize: 14, fontWeight: '600' },
  tabUnderline:    { height: 2, width: '60%', borderRadius: 2, marginTop: 4 },
  scroll:          { padding: 16 },
  compose:         { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 14, borderWidth: 1, marginBottom: 16 },
  composerAvatar:  { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  composerInput:   { flex: 1, padding: 10, borderRadius: 10, borderWidth: 1 },
  postCard:        { borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 12 },
  postHeader:      { flexDirection: 'row', gap: 10, marginBottom: 8 },
  avatar:          { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  postAuthor:      { fontSize: 14, fontWeight: '600' },
  postTime:        { fontSize: 12, marginTop: 1 },
  postBody:        { fontSize: 14, lineHeight: 20, marginBottom: 12 },
  postActions:     { flexDirection: 'row', gap: 20 },
  postAction:      { flexDirection: 'row', alignItems: 'center', gap: 5 },
  postActionText:  { fontSize: 13 },
  eventCard:       { flexDirection: 'row', alignItems: 'center', borderRadius: 14, borderWidth: 1, marginBottom: 12, overflow: 'hidden' },
  eventAccent:     { width: 5, alignSelf: 'stretch' },
  eventBody:       { flex: 1, padding: 14 },
  eventTitle:      { fontSize: 14, fontWeight: '600', marginBottom: 3 },
  eventMeta:       { fontSize: 12 },
  rsvpBtn:         { margin: 14, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1.5 },
  rsvpText:        { fontSize: 12, fontWeight: '700' },
});