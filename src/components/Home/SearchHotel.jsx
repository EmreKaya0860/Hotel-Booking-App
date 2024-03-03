import { StyleSheet, TextInput, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
const SearchHotel = ({onSearchHotel}) => {
  const handleSearchHotel = (text) => {
    onSearchHotel(text);
   
  }
  return (
    <View style={styles.container}>

        <AntDesign name="search1" size={24} color="black" />
    <TextInput 
    style={styles.searchHotel}
     placeholder="Find a hotel"
     placeholderStyle={styles.placeholderStyle}
      onChangeText={handleSearchHotel}
    ></TextInput>
    </View>
  )
}

export default SearchHotel

const styles = StyleSheet.create({
      container: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        borderRadius: 10,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        flexDirection: "row",
        gap: 10,
        height: 50,
      },
      searchHotel:{
            width: "80%",
            height: 50,
            fontSize: 16,
          },
          placeholderStyle: {
            fontSize: 16,
            color: '#E5E5E5',
           
    
          },
})