import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { Formik } from "formik";

import { Entypo } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import { useTranslation } from "react-i18next";

const initialValues = {
  tarih: "",
  misafirSayisi: "",
  ad: "",
  soyad: "",
  emailAdresi: "",
  il: "",
  ilce: "",
  telefonNo: "",
};

const ReservationDetailScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const goBackButton = () => {
    navigation.goBack();
  };

  const goToPaymentButton = () => {
    navigation.navigate("PaymentInfoScreen");
  };

  return (
    <Formik initialValues={initialValues}>
      {({ handleChange, handleSubmit, values }) => (
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
            <View style={styles.progressBar}>
              <Text style={styles.progressBarText}>2</Text>
            </View>
            <View style={styles.hr} />
            <View style={styles.progressBar}>
              <Text style={styles.progressBarText}>3</Text>
            </View>
          </View>
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.body}
          >
            <TextInput
              style={styles.infoInputStyle}
              placeholder={t("reservationDetail.nameInputLabel")}
            />
            <TextInput
              style={styles.infoInputStyle}
              placeholder={t("reservationDetail.surnameInputLabel")}
            />
            <TextInput
              style={styles.infoInputStyle}
              placeholder={t("reservationDetail.numberOfGuestsInputLabel")}
              inputMode="numeric"
            />
            <TextInput
              style={styles.infoInputStyle}
              placeholder={t("reservationDetail.emailInputLabel")}
            />
            <TextInput style={styles.infoInputStyle} placeholder="İl" />
            <TextInput style={styles.infoInputStyle} placeholder="İlçe" />
            <TextInput
              style={styles.infoInputStyle}
              placeholder="Telefon Numarası"
            />
            <TextInput style={styles.infoInputStyle} placeholder="Tarih" />

            <TouchableOpacity onPress={goToPaymentButton}>
              <LinearGradient
                colors={["#F8A170", "#FFCD61"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.goToPaymentButton}
              >
                <Text style={styles.goToPaymentButtonText}>
                  {t("reservationDetail.goToPaymentButtonTitle")}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

export default ReservationDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  body: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
  },
  infoInputStyle: {
    backgroundColor: "#DFDEDE",
    opacity: 0.6,
    borderRadius: 10,
    height: 50,
    padding: 15,
    marginVertical: 10,
  },
  goToPaymentButton: {
    backgroundColor: "#F8A170",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    height: 70,
  },
  goToPaymentButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
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
});
