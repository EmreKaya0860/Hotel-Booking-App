import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchHotel from "../components/Home/SearchHotel";
import { Ionicons } from "@expo/vector-icons";
import HotelList from "../components/Home/HotelList";
import { db } from "../service/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  getDocs,
  query,
  where,
  orderBy,
  startAt,
  endAt,
  doc,
  updateDoc,
} from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
const HotelsScreen = ({ navigation, route }) => {
  const { city, guestCount } = route.params;
  const [hotels, setHotels] = useState([]);
  const [hotelname, setHotelName] = useState("");
  const [documentName, setDocumentName] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;
  const userEmail = user.email;
  console.log("user", user.uid);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchHotels);
    fetchHotels();
    return unsubscribe;
  }, [city, guestCount, hotelname, userEmail, navigation]);
  const fetchHotels = async () => {
    try {
      let hotelQuery = collection(db, "Hotels");

      let likedHotels = collection(db, "Users");
      likedHotels = query(likedHotels, where("Email", "==", userEmail));
      const querySnapshot = await getDocs(likedHotels);
      likedHotels = [];
      querySnapshot.forEach((doc) => {
        likedHotels = doc.data().LikedHotels;
      });

      if (city) {
        hotelQuery = query(hotelQuery, where("City", "==", city));
      }

      if (hotelname) {
        const startAtName = hotelname;
        const endAtName = startAtName + "\uf8ff";
        hotelQuery = query(
          hotelQuery,
          orderBy("Name"),
          where("Name", ">=", hotelname),
          where("Name", "<=", endAtName)
        );
      }
      const unsubscribe = onSnapshot(hotelQuery, (snapshot) => {
        let hotelList = [];
        let documentname = [];
        snapshot.forEach((doc) => {
          const hotelData = doc.data();
          documentname.push(doc.id);
          const rooms = hotelData.Rooms;
          let available = false;

          for (const roomKey in rooms) {
            const room = rooms[roomKey];
            if (room.GuestNumber >= guestCount) {
              available = true;
              break;
            }
          }
          if (available) {
            if (likedHotels.includes(doc.id)) {
              hotelList.push({ ...hotelData, DocId: doc.id, Liked: true });
            } else {
              hotelList.push({ ...hotelData, DocId: doc.id, Liked: false });
            }
          }
        });
        setHotels(hotelList);

        setDocumentName(documentname);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };
  const handleLike = async (item) => {
    try {
      const userQuery = query(
        collection(db, "Users"),
        where("Email", "==", userEmail)
      );
      const userSnapshot = await getDocs(userQuery);

      userSnapshot.docs.forEach((doc) => {
        const userData = doc.data();
        if (userData.Email === userEmail) {
          const userId = doc.id;

          const likedHotels = userData.LikedHotels || [];

          if (likedHotels.includes(item.DocId)) {
            //
            const updatedLikedHotels = likedHotels.filter(
              (hotelId) => hotelId !== item.DocId
            );

            updateLikedHotels(userId, updatedLikedHotels);
          } else {
            const updatedLikedHotels = [...likedHotels, item.DocId];

            updateLikedHotels(userId, updatedLikedHotels);
          }
        }
      });
      fetchHotels();
    } catch (error) {
      console.error("Error updating liked hotels:", error);
    }
  };
  const updateLikedHotels = async (userId, updatedLikedHotels) => {
    try {
      const userRef = doc(db, "Users", userId);
      await updateDoc(userRef, { LikedHotels: updatedLikedHotels });
      // console.log("Liked hotels updated successfully!");
    } catch (error) {
      console.error("Error updating liked hotels:", error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.container2}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => onHandlePress(item.DocId, item.Name, item.Id)}
        >
          <Image source={{ uri: item.ImageUrl }} style={styles.image2} />
        </TouchableOpacity>
        <Pressable style={styles.icon} onPress={() => handleLike(item)}>
          <AntDesign
            name="heart"
            size={24}
            color={item.Liked ? "#D80032" : "white"}
          />
        </Pressable>
      </View>
      <View style={styles.textContainer}>
        <Text>
          <AntDesign name="star" size={16} color="gold" />{" "}
          <Text style={styles.rating}>{item.Rating}</Text>{" "}
          <Text style={styles.generaltext}>({item.Comment})</Text>
        </Text>
        <Text style={styles.hotelname}>{item.Name}</Text>
        <Text style={styles.generaltext}>{item.Address}</Text>
        <Text style={styles.price}>{item.Price}</Text>
      </View>
    </View>
  );

  const onHandlePress = (docid, name, id) => {
    navigation.navigate("HotelDetailScreen", {
      selectedHotelId: docid,
      hotelName: name,
      hotelId: id,
      userId: user.uid,
    });
  };
  const [liked, setLiked] = useState(false);

  const handleSearchHotel = (hotelname) => {
    setHotelName(hotelname);
    console.log(hotelname);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <SearchHotel onSearchHotel={handleSearchHotel} />
      </View>
      <FlatList
        data={hotels}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        // onPress={onPress}
        // onLike={onLike}
      />
    </View>
  );
};

export default HotelsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  container2: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 30,
    height: 30,
  },
  generaltext: {
    color: "#C7C8CC",
    fontSize: 12,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    borderRadius: 16,
  },
  background: {
    padding: 10,
    borderRadius: 16,
  },
  image2: {
    width: "100%",
    height: 180,
    borderRadius: 16,
  },
  textContainer: {
    marginTop: 10,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 3,
  },
  rating: {
    color: "gold",
    fontWeight: "bold",
    fontSize: 12,
  },
  hotelname: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D63484",
  },
});
