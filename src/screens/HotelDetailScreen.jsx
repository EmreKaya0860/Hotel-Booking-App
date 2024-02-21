import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { ImageGallery } from "@georstat/react-native-image-gallery";
import { useState } from "react";
import Facilities from "../components/Home/Facilities";
import Overview from "../components/Home/Overview";
import HotelLocation from "../components/Home/HotelLocation";

const HotelDetailScreen = ({ navigation, route }) => {
  const { itemprops } = route.params;
  const [isOpen, setIsOpen] = useState(false);
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);
  const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsfGVufDB8fDB8fHww",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fHww",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1582533401888-825fb21aedf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fHww",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGhvdGVsfGVufDB8fDB8fHww",
    },
  ];
  const onHandlePress = (item) => {
    navigation.navigate("ReservationStepsRouter", { itemprops: item });
    console.log(item.name);
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.hotelName}>{itemprops.name}</Text>
          <AntDesign name="hearto" size={24} color="white" />
        </View>
        <View>
          <Image source={{ uri: itemprops.url }} style={styles.image} />
          <View style={{ flexDirection: "row" }}>
            <Image source={{ uri: itemprops.url }} style={styles.image2} />
            <Image source={{ uri: itemprops.url }} style={styles.image3} />

            <View
              style={{
                width: "100%",
                height: 100,
                borderBottomRightRadius: 16,
              }}
            >
              <Image source={{ uri: itemprops.url }} style={styles.image4} />
              <TouchableOpacity
                onPress={openGallery}
                style={styles.transparentOverlay}
              >
                <Text style={styles.textContainer}>See All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ImageGallery close={closeGallery} isOpen={isOpen} images={images} />
        <Facilities></Facilities>
        <Overview></Overview>
        <HotelLocation
          latitude={itemprops.latitude}
          longitude={itemprops.longitude}
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
        onPress={onHandlePress}
      >
        <View
          style={{
            backgroundColor: "#37B5B6",
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
    alignItems: "center",
    top: 60,
    zIndex: 100,
    paddingHorizontal: 20,
  },
  hotelName: {
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
    backgroundColor: "rgba(0,0,0,0.5)",
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
