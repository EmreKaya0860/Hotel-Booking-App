import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import CardImage from "../../assets/ReservationSteps/CreditCard.png";

import { useTranslation } from "react-i18next";

const PaymentInfoScreen = ({ route, navigation }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardOwner, setCardOwner] = useState("");
  const [cardExpDate, setCardExpDate] = useState("");

  const { reservationDetails, selectedRoom } = route.params;

  const { t } = useTranslation();

  const goBackButton = () => {
    navigation.goBack();
  };

  const goToCompleteButton = () => {
    navigation.navigate("ReservationCompleteScreen", {
      reservationDetails: reservationDetails,
      selectedRoom: selectedRoom,
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
        <View style={styles.progressBar}>
          <Text style={styles.progressBarText}>3</Text>
        </View>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.body}
      >
        <View>
          <Image source={CardImage} />
          <View style={styles.cardInfoContainer}>
            {cardNumber.length > 0 && (
              <Text style={styles.cardInfoText}>
                {cardNumber.match(/.{1,4}/g).join(" ")}
              </Text>
            )}
            <View style={styles.nameAndExpDateContainer}>
              <Text style={styles.cardInfoText}>{cardOwner}</Text>
              <Text style={styles.cardInfoText}>{cardExpDate}</Text>
            </View>
          </View>
        </View>
        <View style={styles.inputContainers}>
          <TextInput
            style={styles.infoInputStyle}
            placeholder={t("paymentInfo.cardNumberInputLabel")}
            onChangeText={(text) => setCardNumber(text.replace(/\D/g, ""))}
            maxLength={16}
            value={cardNumber}
            inputMode="numeric"
          />
          <View style={styles.expAndCVVContainer}>
            <TextInput
              style={[styles.infoInputStyle, styles.expAndCvvWidth]}
              placeholder={t("paymentInfo.cardExpirationInputLabel")}
              inputMode="numeric"
              onChangeText={(text) => {
                const cleanedText = text.replace(/\D/g, "");

                let formattedText = cleanedText.slice(0, 2);
                if (cleanedText.length > 2) {
                  formattedText += "/" + cleanedText.slice(2, 4);
                }

                setCardExpDate(formattedText);
              }}
              value={cardExpDate}
            />
            <TextInput
              style={[styles.infoInputStyle, styles.expAndCvvWidth]}
              placeholder={t("paymentInfo.cardCVVInputLabel")}
              inputMode="numeric"
            />
          </View>
          <TextInput
            style={styles.infoInputStyle}
            placeholder={t("paymentInfo.cardOwnerInputLabel")}
            onChangeText={(text) => setCardOwner(text.toUpperCase())}
            value={cardOwner}
          />
        </View>
        <TouchableOpacity onPress={goToCompleteButton}>
          <LinearGradient
            colors={["#F8A170", "#FFCD61"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.goToCompleteButton}
          >
            <Text style={styles.goToCompleteButtonText}>
              {t("paymentInfo.goToCompleteButtonTitle")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PaymentInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 60,
  },
  header: {
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
    marginLeft: 20,
    position: "absolute",
    alignSelf: "flex-start",
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
    marginTop: 50,
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
    width: "100%",
    alignSelf: "center",
    marginVertical: 10,
  },
  cardInfoContainer: {
    width: "80%",
    position: "absolute",
    bottom: 20,
    marginHorizontal: 20,
    gap: 10,
  },
  nameAndExpDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  cardInfoText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
  inputContainers: {
    width: "90%",
    marginTop: 20,
  },
  expAndCVVContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  infoInputStyle: {
    backgroundColor: "#DFDEDE",
    opacity: 0.6,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  expAndCvvWidth: {
    width: "45%",
  },
  goToCompleteButton: {
    backgroundColor: "#F8A170",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    height: 70,
  },
  goToCompleteButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
});
