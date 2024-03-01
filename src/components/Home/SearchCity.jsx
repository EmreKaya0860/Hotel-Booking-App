import { StyleSheet, TextInput, View } from 'react-native'
import React ,{useState} from 'react'

const SearchCity = ({ onSelectCity }) => {

  const handleCityChange = (text) => {
    onSelectCity(text); 
  };
  return (

      <TextInput 
      onChangeText={handleCityChange}
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