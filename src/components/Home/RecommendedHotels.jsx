import { StyleSheet, Text, View ,FlatList,Image} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
const RecommendedHotels = () => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      url:"https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGhvdGVsfGVufDB8fDB8fHww",
      name:"Lux Hotel with Pool",
      city:"Dubai",
      price:"$200",
      rating:"4.5"
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      name:"Lux Hotel with Pool",
      url:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsfGVufDB8fDB8fHww",
      city:"Dubai",
      price:"$200",
      rating:"4.5"
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      url:"https://images.unsplash.com/photo-1596436889106-be35e843f974?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGhvdGVsfGVufDB8fDB8fHww",
      name:"Lux Hotel with Pool",
      city:"Dubai",
      price:"$200",
      rating:"4.5"
    },
  ];
  
  const renderItem = ({ item, index }) => (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.url }} style={styles.image} />
        <View style={styles.textContainer}>
        <LinearGradient
      colors={[ 'transparent','rgba(0, 0, 0, 0.95)',]}
      style={styles.background}

    >
      
          <Text style={styles.hotelname}>{item.name}</Text>
         <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={styles.overlayText}>{item.city}</Text>
          <View style={{flexDirection:"row"}}>
          <Text style={styles.overlayText}>
            
            {item.price}{"~   "}</Text>
          <Text style={styles.overlayText}>
          <AntDesign name="star" size={12} color="gray" />
          {""} {item.rating}</Text>
          </View>
          </View>
          </LinearGradient>
        </View>
        
      </View>

    </View>
  );
  return (
    <FlatList
    data={DATA}
    horizontal={true}
    renderItem={renderItem}
    keyExtractor={(item, index) => index.toString()}
    showsHorizontalScrollIndicator={false}
  />
);
  
}

export default RecommendedHotels

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  imageContainer: {
    position: "relative",
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
  },
  background:{
    padding: 10,
    borderRadius: 16,
  },
  image: {
    width:250,
    height: 180,
    borderRadius: 16,
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    width:"100%",
    borderRadius: 12,
    
  },
  hotelname: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  overlayText: {
    color: "white",
    fontSize: 12,
  
  },
})