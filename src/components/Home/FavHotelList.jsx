import { StyleSheet, Text, View ,FlatList,Image, TouchableOpacity, Pressable} from 'react-native'
import React,{useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
const FavHotelList = ({onPress,onLike}) => {
    const DATA = [
   
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
          name:"Lux Hotel with Pool",
          url:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsfGVufDB8fDB8fHww",
          city:"Dubai",
          price:"$200",
          rating:"4.1",
          comment:"532",
          address:"Chestnut StreesRome, NY",
          latitude: 40.7128,
          longitude: -74.0060,
          liked:true
        },
        {
          id: '58694as0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
          url:"https://images.unsplash.com/photo-1596436889106-be35e843f974?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGhvdGVsfGVufDB8fDB8fHww",
          name:"Lux Hotel with Pool",
          city:"Dubai",
          price:"$200",
          rating:"4.8",
          comment:"532",
          address:"Chestnut StreesRome, NY",
          latitude: 40.7128,
          longitude: -74.0060,
          liked:true
        },
        {
          id: '58694a0f-3da1-471f-bkdd96-145571e29d72',
          title: 'Third Item',
          url:"https://images.unsplash.com/photo-1596436889106-be35e843f974?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGhvdGVsfGVufDB8fDB8fHww",
          name:"Lux Hotel with Pool",
          city:"Dubai",
          price:"$200",
          rating:"4.8",
          comment:"532",
          address:"Chestnut StreesRome, NY",
          latitude: 40.7128,
          longitude: -74.0060,
          liked:true
        },
      ];
   
      const renderItem = ({ item, index }) => (
       
        <View  style={styles.container} >
          <View style={styles.imageContainer}>
           <TouchableOpacity onPress={() => onPress(item)}> 
           <Image source={{ uri: item.url }} style={styles.image} />
           </TouchableOpacity> 
           <Pressable style={styles.icon} onPress={() => onLike(item)}>
           <AntDesign  name="heart" size={24}  color={item.liked ? '#D80032' : 'white'} />
           </Pressable>
           
            </View>
            <View style={styles.textContainer}>
            <Text>
            <AntDesign name="star" size={16} color="gold" />{" "}
              <Text style={styles.rating}>{item.rating}</Text> <Text style={styles.generaltext}>({item.comment})</Text>
              </Text>
              <Text style={styles.hotelname}>{item.name}</Text>
              <Text style={styles.generaltext}>{item.address}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>         
            </View>
      );
      return (
        <FlatList
        data={DATA}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onPress={onPress} 
        onLike={onLike}
      />
    );
      
    }

export default FavHotelList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  icon:{
    position: "absolute",
    right: 10,
    top: 10,
  },
  generaltext:{
    color:"#C7C8CC",
    fontSize:12,

  },
  imageContainer: {
    position: "relative",
    width:"100%",
    borderRadius: 16,
  },
  background:{
    padding: 10,
    borderRadius: 16,
  },
  image: {
    width:"100%",
    height: 180,
    borderRadius: 16,
  },
  textContainer: {
    marginTop: 10,
    width:"100%",
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    gap:3
  },
  rating:{
    color:"gold",
    fontWeight:"bold",
    fontSize:12
  },
  hotelname:{
    fontSize:16,
    fontWeight:"bold"
  },
  price:{
    fontSize:16,
    fontWeight:"bold",
    color:"#D63484"
  }
  
})