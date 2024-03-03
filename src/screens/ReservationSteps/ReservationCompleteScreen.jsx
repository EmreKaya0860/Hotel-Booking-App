import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";

import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import HotelImage from "../../assets/ReservationSteps/hotelImage.png";

import { useTranslation } from "react-i18next";

import { saveReservation } from "../../service/ReservationStepsApi";

const ReservationCompleteScreen = ({ route, navigation }) => {
  const { reservationDetails, selectedRoom } = route.params;

  const { t } = useTranslation();

  const goBackButton = () => {
    navigation.goBack();
  };

  const completeReservation = () => {
    saveReservation(reservationDetails).then((response) => {
      if (response) {
        alert("Reservation is completed successfully");
        navigation.navigate("HomeScreen");
      } else {
        alert("Reservation is not completed");
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBackButton}>
          <Entypo name="chevron-left" size={30} color="#393939" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {t("reservationSteps.reservation")}
        </Text>
      </View>
      <View style={styles.progressBarContainer}>
        <LinearGradient
          colors={["#F8A170", "#FFCD61"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.progressBar}
        >
          <Text style={styles.progressBarText}>1</Text>
        </LinearGradient>
        <LinearGradient
          colors={["#F8A170", "#FFCD61"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.hr}
        />
        <LinearGradient
          colors={["#F8A170", "#FFCD61"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.progressBar}
        >
          <Text style={styles.progressBarText}>2</Text>
        </LinearGradient>
        <LinearGradient
          colors={["#F8A170", "#FFCD61"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.hr}
        />
        <LinearGradient
          colors={["#F8A170", "#FFCD61"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.progressBar}
        >
          <Text style={styles.progressBarText}>3</Text>
        </LinearGradient>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.body}
      >
        <View>
          <Image source={HotelImage} style={styles.imageStyle} />
          <Text style={styles.hotelNameText}>Beach Resort Lux</Text>
        </View>
        <View style={styles.reservationInfoContainer}>
          <Text style={styles.reservationInfoText}>
            {reservationDetails.numberOfGuests} People
          </Text>
          <Text style={styles.reservationInfoText}>{selectedRoom.type}</Text>
          <Text style={styles.reservationInfoText}>
            {reservationDetails.numberOfStayDate} days
          </Text>
          <Text style={styles.reservationInfoText}>
            {reservationDetails.checkInDate} to{" "}
            {reservationDetails.checkOutDate}
          </Text>
        </View>
        <View style={styles.footerHr} />
        <Text style={styles.totalPriceText}>
          $ {reservationDetails.price} USD
        </Text>
        <TouchableOpacity onPress={completeReservation}>
          <LinearGradient
            colors={["#FEC069", "#FEC069"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.completeButton}
          >
            <Text style={styles.completeButtonText}>
              {t("reservationComplete.completeTitle")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ReservationCompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 60,
  },
  header: {
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
    marginLeft: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#393939",
  },
  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    width: 36,
    height: 36,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "#DFDEDE",
  },
  hr: {
    width: 25,
    height: 2,
    backgroundColor: "#DFDEDE",
  },
  progressBarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  body: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
  },
  imageStyle: {
    width: "100%",
    height: 210,
    borderRadius: 10,
    marginVertical: 20,
  },
  hotelNameText: {
    position: "absolute",
    bottom: 40,
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    letterSpacing: -0.44,
    marginHorizontal: 20,
  },
  reservationInfoContainer: {
    gap: 10,
  },
  reservationInfoText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#616167",
    letterSpacing: -0.32,
  },
  footerHr: {
    width: "100%",
    height: 1,
    backgroundColor: "#DFDEDE",
    marginVertical: 20,
  },
  totalPriceText: {
    color: "#393939",
    fontSize: 36,
    fontWeight: "700",
    letterSpacing: -0.72,
  },
  completeButton: {
    backgroundColor: "#F8A170",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    height: 70,
  },
  completeButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
});
