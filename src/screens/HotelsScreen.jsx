import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import SearchHotel from '../components/Home/SearchHotel'
import { Ionicons } from '@expo/vector-icons';
import HotelList from '../components/Home/HotelList'

const HotelsScreen = ({navigation}) => {
  const onHandlePress = (item) => {
    navigation.navigate('HotelDetailScreen', {itemprops :item})
    console.log(item.name)
  }
  const [liked, setLiked] = useState(false);

  const toggleLike = (item) => {
    console.log("like")
   item.liked = !item.liked;
  };
  return (
    <View style={styles.container}>
 
      <View style={{  flexDirection: "row",justifyContent:"center",alignItems:"center",marginTop:50}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back-outline" size={30} color="black" />
      </TouchableOpacity>
      <SearchHotel />
      </View>
      <HotelList onPress={onHandlePress} onLike={toggleLike}/>
    </View>
  )
}

export default HotelsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  
  },
})