import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import useLocation from "../../hooks/useLocation";
const HotelLocation = ({ latitude, longitude }) => {
  const location = useLocation();
  const initialRegion = location
    ? {
        latitude: location ? location.coords.latitude : 41.0082,
        longitude: location ? location.coords.longitude : 28.9784,
        //zoom değerleri
        latitudeDelta: 50,
        longitudeDelta: 50,
      }
    : null;

  const coordinate = initialRegion
    ? {
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
      }
    : null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Location</Text>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {coordinate && (
          <Marker
            coordinate={coordinate}
            title="You are Here!"
           
          >
            <Image
              source={require("../../../assets/rec.png")}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          </Marker>
        )}

        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title="Hotel Location!"
        
        >
          <Image
            source={require("../../../assets/locationpin.png")}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </Marker>
      </MapView>
    </View>
  );
};

export default HotelLocation;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    padding: 20,
    gap: 20,
    marginBottom: 110,
  },
  infoBox: {
    position: "absolute",
    bottom: 70,
    backgroundColor: "rgba(0, 195, 255, 0.8)",
    width: "100%",
    height: 160,
    padding: 10,
    gap: 10,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 14,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
