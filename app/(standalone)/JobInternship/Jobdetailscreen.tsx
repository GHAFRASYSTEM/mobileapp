import { View, ScrollView, Text, Linking } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { useColors } from '@/constants/Colors'
import ScreenHeader from '@/components/Headers/ScreenHeader'
import type { Listing } from '@/assets/data/jobInternship.types'

import JobDetailHero from '@/components/Banners/JobDetailHero'
import JobDetailBody from '@/components/Sections/JobDetailsBody'

interface JobDetailScreenProps {
  onBack: () => void
}

const JobDetailScreen = ({ onBack }: JobDetailScreenProps) => {
  const { listing } = useLocalSearchParams()
  const parsedListing: Listing | null = listing ? JSON.parse(listing as string) : null

  const C = useColors()
  const insets = useSafeAreaInsets()

  if (!parsedListing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Listing not found</Text>
      </View>
    )
  }

  const handleEmail = () => Linking.openURL(`mailto:${parsedListing.contact.email}`)
  const handlePhone = () =>
    parsedListing.contact.phone && Linking.openURL(`tel:${parsedListing.contact.phone}`)

  return (
    <View style={{ flex: 1, backgroundColor: C.background }}>
      <ScreenHeader
        variant="page"
        title={parsedListing.title}
        subtitle={parsedListing.company}
        showBack
        onIconPress={onBack}
        icon="chevron.left"
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        <JobDetailHero listing={parsedListing} C={C} />
        <JobDetailBody
          listing={parsedListing}
          C={C}
          onEmail={handleEmail}
          onPhone={handlePhone}
        />
      </ScrollView>
    </View>
  )
}

export default JobDetailScreen