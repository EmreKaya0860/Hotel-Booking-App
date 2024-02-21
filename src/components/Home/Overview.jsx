import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Overview = () => {
  return (
    <View>
      <Text style={styles.header}>Overview</Text>
      <Text  style={styles.overview}>Discover our hotel's 
        prime location, stylish accommodations, 
        and exceptional service. Experience comfort
         and convenience at its finest during your stay with us.</Text>
    </View>
  )
}

export default Overview

const styles = StyleSheet.create({
    header:{
        fontSize: 20,
        fontWeight: "bold",
        margin: 20
    },
    overview:{
        marginHorizontal: 20,
        fontSize: 14
    }
})