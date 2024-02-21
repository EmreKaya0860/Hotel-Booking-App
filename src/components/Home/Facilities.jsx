import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FacilityPlate from './FacilityPlate'

const Facilities = () => {
  return (
    <View>
        
      <Text style={styles.header}>Common Facilities</Text>
      
      <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
        <FacilityPlate name="AC" icon="air"/>
        <FacilityPlate name="Restauranat" icon="bowl"/>
        <FacilityPlate name="Swimming" icon="grooveshark"/>
        <FacilityPlate name="Wifi" icon="rss"/>
        </View>
    </View>
  )
}

export default Facilities

const styles = StyleSheet.create({
    header:{
        fontSize: 20,
        fontWeight: "bold",
        margin: 20
    },
    
})