import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'

const ButtonSearch = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>Search a Hotel</Text>
  </TouchableOpacity>
  )
}

export default ButtonSearch

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FEC069',
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