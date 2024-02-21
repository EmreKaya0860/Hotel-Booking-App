import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
const FacilityPlate = (props) => {
  return (
    <View style={styles.container}>
        <View style={styles.circle}>
        <Entypo name={props.icon} size={24} color="black" />
        </View>
        <Text>{props.name}</Text>
    </View>
  )
}

export default FacilityPlate

const styles = StyleSheet.create({
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        backgroundColor: "#EFECEC",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    container:{
        flexDirection:"column",
        alignItems:"center",
    }
})