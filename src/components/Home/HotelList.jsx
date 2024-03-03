import { StyleSheet, Text, View ,FlatList,Image, TouchableOpacity, Pressable} from 'react-native'
import React,{useState,useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { db } from "../../service/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { getDocs, query, where } from "firebase/firestore";
const HotelList = ({onPress,onLike}) => {
  const [hotels, sethotels] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const hotelQuery = collection(db, "Hotels");
    onSnapshot(hotelQuery, (snapshot) => {
      let hotelList = [];
      snapshot.forEach((doc) => {
        hotelList.push(doc.data());
  
      });
      setLoading(false);
      sethotels(hotelList);
   
    });
  }, []);

    // const DATA = [
    //     {
    //       id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    //       title: 'First Item',
    //       url:"https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGhvdGVsfGVufDB8fDB8fHww",
    //       name:"Lux Hotel with Pool",
    //       city:"New York",
    //       price:"$200",
    //       rating:"4.2",
    //       comment:"532",
    //       address:"Chestnut StreesRome, NY",
    //       latitude: 40.7128,
    //       longitude: -74.0060,
    //       liked:false
    //     },
    //     {
    //       id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    //       title: 'Second Item',
    //       name:"Lux Hotel with Pool",
    //       url:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsfGVufDB8fDB8fHww",
    //       city:"Dubai",
    //       price:"$200",
    //       rating:"4.1",
    //       comment:"532",
    //       address:"Chestnut StreesRome, NY",
    //       latitude: 40.7128,
    //       longitude: -74.0060,
    //       liked:true
    //     },
    //     {
    //       id: '58694as0f-3da1-471f-bd96-145571e29d72',
    //       title: 'Third Item',
    //       url:"https://images.unsplash.com/photo-1596436889106-be35e843f974?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGhvdGVsfGVufDB8fDB8fHww",
    //       name:"Lux Hotel with Pool",
    //       city:"Dubai",
    //       price:"$200",
    //       rating:"4.8",
    //       comment:"532",
    //       address:"Chestnut StreesRome, NY",
    //       latitude: 40.7128,
    //       longitude: -74.0060,
    //       liked:true
    //     },
    //     {
    //       id: 'bd7afhacbea-c1b1-46c2-aed5-3ad53abb28ba',
    //       title: 'First Item',
    //       url:"https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGhvdGVsfGVufDB8fDB8fHww",
    //       name:"Lux Hotel with Pool",
    //       city:"New York",
    //       price:"$200",
    //       rating:"4.2",
    //       comment:"532",
    //       address:"Chestnut StreesRome, NY",
    //       latitude: 40.7128,
    //       longitude: -74.0060,
    //       liked:false
    //     },
    //     {
    //       id: '3acjd68afc-c605-48d3-a4f8-fbd91aa97f63',
    //       title: 'Second Item',
    //       name:"Lux Hotel with Pool",
    //       url:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsfGVufDB8fDB8fHww",
    //       city:"Dubai",
    //       price:"$200",
    //       rating:"4.1",
    //       comment:"532",
    //       address:"Chestnut StreesRome, NY",
    //       latitude: 40.7128,
    //       longitude: -74.0060,
    //       liked:false
    //     },
    //     {
    //       id: '58694a0f-3da1-471f-bkdd96-145571e29d72',
    //       title: 'Third Item',
    //       url:"https://images.unsplash.com/photo-1596436889106-be35e843f974?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGhvdGVsfGVufDB8fDB8fHww",
    //       name:"Lux Hotel with Pool",
    //       city:"Dubai",
    //       price:"$200",
    //       rating:"4.8",
    //       comment:"532",
    //       address:"Chestnut StreesRome, NY",
    //       latitude: 40.7128,
    //       longitude: -74.0060,
    //       liked:true
    //     },
    //   ];
   
    const renderItem = ({ item, index }) => (
       
      <View  style={styles.container2} >
      <View style={styles.imageContainer}>
       <TouchableOpacity onPress={() => onPress(item)}> 
       <Image source={{ uri: item.ImageUrl }} style={styles.image2} />
       </TouchableOpacity> 
       <Pressable style={styles.icon} onPress={() => onLike(item)}>
       <AntDesign  name="heart" size={24}  color={item.liked ? '#D80032' : 'white'} />
       </Pressable>
       
        </View>
        <View style={styles.textContainer}>
        <Text>
        <AntDesign name="star" size={16} color="gold" />{" "}
          <Text style={styles.rating}>{item.Rating}</Text> <Text style={styles.generaltext}>({item.Comment})</Text>
          </Text>
          <Text style={styles.hotelname}>{item.Name}</Text>
          <Text style={styles.generaltext}>{item.Address}</Text>
          <Text style={styles.price}>{item.Price}</Text>
        </View>         
        </View>
    );
      return (
        <FlatList
        data={hotels}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onPress={onPress} 
        onLike={onLike}
      />
    );
      
    }

export default HotelList

const styles = StyleSheet.create({
  container2: {
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
  image2: {
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