import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColors } from '@/constants/Colors'

const services = [
  {
    icon: '🤝',
    title: 'Member Support',
    description: 'Dedicated assistance for all our community members',
  },
  {
    icon: '🏥',
    title: 'Health & Wellness',
    description: 'Connecting you to healthcare resources and guidance',
  },
  {
    icon: '📋',
    title: 'Social Services',
    description: 'Helping navigate social support and community programs',
  },
  {
    icon: '💬',
    title: 'Counseling',
    description: 'Compassionate support when you need someone to talk to',
  },
]

const ghafra_care = () => {
  const C = useColors()
  const insets = useSafeAreaInsets()

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: C.background, marginBottom:100 }}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 48,
        paddingBottom: insets.bottom + 24,
      }}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.iconCircle, { backgroundColor: C.dangerSubtle }]}>
          <Text style={styles.headerIcon}>❤️</Text>
        </View>
        <Text style={[styles.title, { color: C.textPrimary }]}>GhaFra Care</Text>
        <Text style={[styles.subtitle, { color: C.textSecondary }]}>
          Our mission is to give back to society — supporting our members and
          serving our community with care and compassion.
        </Text>
      </View>

      {/* Services */}
      <Text style={[styles.sectionTitle, { color: C.textPrimary }]}>How We Help</Text>
      <View style={styles.servicesGrid}>
        {services.map((service, index) => (
          <View
            key={index}
            style={[
              styles.serviceCard,
              {
                backgroundColor: C.surface,
                borderColor: C.border,
              },
            ]}
          >
            <Text style={styles.serviceIcon}>{service.icon}</Text>
            <Text style={[styles.serviceTitle, { color: C.textPrimary }]}>
              {service.title}
            </Text>
            <Text style={[styles.serviceDesc, { color: C.textSecondary }]}>
              {service.description}
            </Text>
          </View>
        ))}
      </View>

      {/* CTA */}
      <View style={[styles.ctaCard, { backgroundColor: C.primary }]}>
        <Text style={[styles.ctaTitle, { color: C.textInverse }]}>Need Assistance?</Text>
        <Text style={[styles.ctaText, { color: C.primarySubtle }]}>
          Reach out to our care team. We're here to support you and your family.
        </Text>
      </View>
    </ScrollView>
  )
}

export default ghafra_care

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerIcon: {
    fontSize: 34,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 14,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  serviceCard: {
    borderRadius: 14,
    padding: 16,
    width: '47.5%',
    borderWidth: 1,
  },
  serviceIcon: {
    fontSize: 26,
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  ctaCard: {
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  ctaButton: {
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 32,
  },
  ctaButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
})