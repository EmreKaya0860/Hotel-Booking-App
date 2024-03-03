import { StyleSheet, Text, View ,FlatList,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
const RecommendedHotels = () => {
  const DATA = [
    {
      id:"5",
      docId: 'q2Wnpc0PYxpRUMVQCJcy',
      title: 'Four Seasons Resort',
      url:"https://i.hizliresim.com/sn68mom.",
      name:"Four Seasons Resort",
      city:"Bora Bora",
      price:"6.250₺",
      rating:"4.1"
    },
    {
      id:"4",
      docId: 'cBDoZi45RaRJSFDy1hsu',
      title: 'Second Item',
      name:"Burj Al Arab",
      url:"https://i.hizliresim.com/rz8ggkd.",
      city:"Dubai",
      price:"18.837₺",
      rating:"3.6"
    },
    {
      id:"1",
      docId: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      url:"https://i.hizliresim.com/54gjpmt.",
      name:"CuisinArt Golf Resort ",
      city:"Anguilla",
      price:"9.000₺",
      rating:"3.8"
    },
  ];

  const renderItem = ({ item, index }) => (
    <View style={styles.container} >
    <View >
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