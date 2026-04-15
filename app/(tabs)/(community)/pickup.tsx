import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UpcomingScreen from '@/components/Screens/UpcomingScreen'

const volunteer = () => {
        return (
          <UpcomingScreen
            title="Volunteer"
            message="We're working on a better way for you to get involved with our volunteer opportunities."
          />
        )
}

export default volunteer

const styles = StyleSheet.create({})