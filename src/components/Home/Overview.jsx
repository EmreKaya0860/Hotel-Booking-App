import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Overview = ({text}) => {
  return (
    <View>
      <Text style={styles.header}>Overview</Text>
      <Text  style={styles.overview}>{text}</Text>
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