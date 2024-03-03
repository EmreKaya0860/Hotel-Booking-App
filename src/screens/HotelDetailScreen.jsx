import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { ImageGallery } from "@georstat/react-native-image-gallery";
import Facilities from "../components/Home/Facilities";
import Overview from "../components/Home/Overview";
import HotelLocation from "../components/Home/HotelLocation";
import { db } from "../service/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  getDocs,
  query,
  where,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
const HotelDetailScreen = ({ navigation, route }) => {
  const { selectedHotelId, hotelName, hotelId, userId } = route.params;

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);
  const onHandlePress = () => {
    navigation.navigate("ReservationStepsRouter", {
      selectedHotelId: selectedHotelId,
      hotelName: hotelName,
      userId: userId,
    });
  };
  const [hotelDetails, setHotelDetails] = useState({});

  const [firstImage, setFirstImage] = useState("");
  const [secondImage, setSecondImage] = useState("");
  const [thirdImage, setThirdImage] = useState("");
  const [fourthImage, setFourthImage] = useState("");

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const hotelsRef = collection(db, "Hotels");
        const q = query(hotelsRef, where("Id", "==", hotelId));

        const querySnapshot = await getDocs(q);

        let hotelDetails = {};
        let firstImage1 = "";
        let secondImage2 = "";
        let thirdImage3 = "";
        let fourthImage4 = "";
        let images = [];
        querySnapshot.forEach((doc) => {
          hotelDetails = doc.data();
          images = hotelDetails.ImageGallery;
          console.log(images);
          firstImage1 = hotelDetails.ImageUrl;
          secondImage2 = images[0].url;
          thirdImage3 = images[1].url;
          fourthImage4 = images[2].url;
        });

        setHotelDetails(hotelDetails);
        setFirstImage(firstImage1);
        setSecondImage(secondImage2);
        setThirdImage(thirdImage3);
        setFourthImage(fourthImage4);

        setLatitude(hotelDetails.HotelLocation.latitude);
        setLongitude(hotelDetails.HotelLocation.longitude);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotelDetails();

    console.log("hotelId", hotelId);
  }, [hotelId]);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.hotelName}>{hotelDetails.Name}</Text>
        </View>
        <View>
          <Image source={{ uri: firstImage }} style={styles.image} />
          <View style={{ flexDirection: "row" }}>
            <Image source={{ uri: secondImage }} style={styles.image2} />
            <Image source={{ uri: thirdImage }} style={styles.image3} />

            <View
              style={{
                width: "100%",
                height: 100,
                borderBottomRightRadius: 16,
              }}
            >
              <Image source={{ uri: fourthImage }} style={styles.image4} />
              <TouchableOpacity
                onPress={openGallery}
                style={styles.transparentOverlay}
              >
                <Text style={styles.textContainer}>See All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ImageGallery
          close={closeGallery}
          isOpen={isOpen}
          images={hotelDetails.ImageGallery}
        />
        <Facilities></Facilities>
        <Overview text={hotelDetails.OverView}></Overview>
        <HotelLocation
          latitude={latitude}
          longitude={longitude}
        ></HotelLocation>
      </ScrollView>
      <Pressable
        style={{
          width: "100%",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          position: "absolute",
          bottom: 10,
          padding: 10,
        }}
        onPress={() => onHandlePress()}
      >
        <View
          style={{
            backgroundColor: "#FEC069",
            width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            position: "absolute",
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
            Select Room
          </Text>
        </View>
      </Pressable>
    </>
  );
};

export default HotelDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    top: 60,
    zIndex: 100,
    paddingHorizontal: 20,
  },
  hotelName: {
    flex: 1,
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 300,
  },
  image2: {
    width: "33.5%",
    height: 100,
    borderBottomLeftRadius: 16,
  },
  image3: {
    width: "33.5%",
    height: 100,
  },
  image4: {
    width: "33.5%",
    height: 100,
    borderBottomRightRadius: 16,
  },
  transparentOverlay: {
    position: "absolute",
    width: "33.5%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 16,
  },
  textContainer: {
    position: "absolute",

    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
