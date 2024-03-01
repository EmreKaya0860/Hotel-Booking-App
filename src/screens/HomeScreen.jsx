import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React , {useState, useEffect} from "react";
import DropdownGuest from "../components/Home/DropDownGuest";
import SearchCity from "../components/Home/SearchCity";
import ButtonSearch from "../components/Home/ButtonSearch";
import RecommendedHotels from "../components/Home/RecommendedHotels";

const HomeScreen = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const handleSearch = () => {
  navigation.navigate("HotelsScreen", {city, guestCount})
  };
  const handleCityChange = (city) => {
    setCity(city);
  };
  const handleGuestCount = (guestCount) => {
    setGuestCount(guestCount);
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/sara-dubler-Koei_7yYtIo-unsplash (1).jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.textContainer}>
          <Text style={styles.heroHeader}>Find a perfect place to stay</Text>
        </View>
      </ImageBackground>

      <View style={styles.herocard}>
        <View style={styles.selectionContainer}>
        <SearchCity onSelectCity={handleCityChange} />
        <DropdownGuest onSelectGuestCount={handleGuestCount} />
        </View>
        <ButtonSearch onPress={handleSearch} />

        <View>
          <View style={styles.rcheader}>
            <Text style={styles.recommended}>Recommended</Text>
            <TouchableOpacity
             onPress={() => {
              navigation.navigate("HotelsScreen", { city: "", guestCount: 1 });
            }}
            >
              <Text style={styles.seeall}>See All</Text>
            </TouchableOpacity>
          </View>
          <RecommendedHotels></RecommendedHotels>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  image: {
    flex: 0.6,
    justifyContent: "space-between",
    alignItems: "Flex-start",
  },
  heroHeader: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  herocard: {
    position: "absolute",
    bottom: 0,
    height: "50%",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  selectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginHorizontal: 20,
  },
  button: {
    width: "50%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  rcheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  recommended: {
    fontSize: 20,
    fontWeight: "bold",
  },
  seeall: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF776F",
  },
});
