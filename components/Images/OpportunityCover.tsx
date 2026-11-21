import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { isHttpUrl } from '@/utils/opportunities'

interface OpportunityCoverProps {
  uri: string | null | undefined
  backgroundColor?: string
}

/**
 * 16:9 cover image for an opportunity. Renders nothing when there is no
 * http(s) URL or the image fails to load, so callers fall back to their
 * no-image layout. The fixed aspect ratio reserves the space up front so a
 * list doesn't shift while images load.
 */
const OpportunityCover = ({ uri, backgroundColor }: OpportunityCoverProps) => {
  const [failedUri, setFailedUri] = useState<string | null>(null)

  const src = uri?.trim() ?? null
  if (!src || !isHttpUrl(src) || failedUri === src) return null

  return (
    <Image
      source={{ uri: src }}
      style={[styles.cover, { backgroundColor }]}
      contentFit="cover"
      accessible={false}
      onError={() => setFailedUri(src)}
    />
  )
}

export default OpportunityCover

const styles = StyleSheet.create({
  cover: { width: '100%', aspectRatio: 16 / 9 },
})
