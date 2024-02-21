import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'

const ButtonSearch = () => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => console.log("Button pressed")}>
    <Text style={styles.buttonText}>Search a Hotel</Text>
  </TouchableOpacity>
  )
}

export default ButtonSearch

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#52D3D8',
        padding: 10,
        borderRadius: 5,
        margin: 20,
       
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
      },
})