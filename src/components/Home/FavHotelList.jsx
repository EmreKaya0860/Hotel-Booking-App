import { StyleSheet, Text, View ,FlatList,Image, TouchableOpacity, Pressable} from 'react-native'
import React,{useState, useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { db } from "../../service/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { getDocs, query, where,orderBy, startAt , endAt,doc, updateDoc} from "firebase/firestore";
const FavHotelList = ({onPress,onLike}) => {
  const [hotels, setHotels] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const userEmail=user.email;
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchLikedHotels);

    return unsubscribe;

  }, [userEmail,navigation]);

  const fetchLikedHotels = async () => {
    try {
     
      const userQuery = query(collection(db, 'Users'), where('Email', '==', userEmail));
      const userSnapshot = await getDocs(userQuery);

      let likedHotels = [];
      userSnapshot.forEach((doc) => {
        
        likedHotels = doc.data().LikedHotels || [];
      });

    
      const hotelQuery = collection(db, 'Hotels');
      const hotelSnapshot = await getDocs(hotelQuery);

      let hotelList = [];
      hotelSnapshot.forEach((doc) => {
        const hotelData = doc.data();
        const hotelId = doc.id;

       
        const isLiked = likedHotels.includes(hotelId);

        if (isLiked) {
          const hotelWithLikedStatus = { ...hotelData, DocId: hotelId, Liked: isLiked };
          hotelList.push(hotelWithLikedStatus);
        }
      
      });

   
      setHotels(hotelList);
    
    } catch (error) {
      console.error('Error fetching liked hotels:', error);
    }
  };
  const handleLike = async (item) => {
    try {

      const userQuery = query(collection(db, 'Users'), where('Email', '==', userEmail));
      const userSnapshot = await getDocs(userQuery);
  
      userSnapshot.docs.forEach((doc) => {
        const userData = doc.data();
        if (userData.Email === userEmail) {
          
          const userId = doc.id;
        
          const likedHotels = userData.LikedHotels || [];
      
         
          if (likedHotels.includes(item.DocId)) {
          
            const updatedLikedHotels = likedHotels.filter((hotelId) => hotelId !== item.DocId);
       
            updateLikedHotels(userId, updatedLikedHotels);

          } else {
         
            const updatedLikedHotels = [...likedHotels, item.DocId];
           
            updateLikedHotels(userId, updatedLikedHotels);
          }
        }
      });
      fetchLikedHotels();
    } catch (error) {
      console.error('Error updating liked hotels:', error);
    }
  };
  const updateLikedHotels = async (userId, updatedLikedHotels) => {
    try {
      const userRef = doc(db, 'Users', userId);
      await updateDoc(userRef,{ LikedHotels: updatedLikedHotels });
      // console.log("Liked hotels updated successfully!");
    } catch (error) {
      console.error('Error updating liked hotels:', error);
    }
  };
  
   
  const renderItem = ({ item, index }) => (
       
    <View  style={styles.container} >
    <View style={styles.imageContainer}>
     <TouchableOpacity onPress={() =>onHandlePress(item.Id)}> 
     <Image source={{ uri: item.ImageUrl }} style={styles.image} />
     </TouchableOpacity> 
     <Pressable style={styles.icon} onPress={() => handleLike(item)}>
     <AntDesign  name="heart" size={24}  color={item.Liked ? '#D80032' : 'white'} />
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