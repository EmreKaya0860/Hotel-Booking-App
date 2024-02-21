import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

const SearchCity = () => {
  return (

      <TextInput 
       style={styles.searchCity}
        placeholder="City"
        placeholderStyle={styles.placeholderStyle}
       ></TextInput>

  )
}

export default SearchCity

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
    color: '#E5E5E5'
  },
    searchCity:{
        width: "50%",
        height: 50,
        fontSize: 16,
        borderRadius: 10,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: "#E5E5E5",
      },
})