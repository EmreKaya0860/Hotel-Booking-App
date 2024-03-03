import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";

import { Entypo } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import { useTranslation } from "react-i18next";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, differenceInDays } from "date-fns";

const initialValues = {
  name: "",
  surname: "",
  numberOfGuests: "",
  email: "",
  city: "",
  town: "",
  phone: "",
  checkInDate: "",
  checkOutDate: "",
  hotelId: "",
  roomType: "",
  userId: "",
  price: "",
  numberOfStayDate: "",
};

const ReservationDetailScreen = ({ route, navigation }) => {
  const [showCheckInDatePicker, setShowCheckInDatePicker] = useState(false);
  const [showCheckOutDatePicker, setShowCheckOutDatePicker] = useState(false);
  const [showCheckOutDateWarning, setShowCheckOutDateWarning] = useState(false);
  const [checkInDate, setcheckInDate] = useState(new Date());
  const [checkOutDate, setcheckOutDate] = useState(new Date());
  const { t } = useTranslation();

  const { selectedRoom, selectedHotelId, userId } = route.params;

  const daysDifference = differenceInDays(checkOutDate, checkInDate);

  const totalPrice = selectedRoom.price * daysDifference;

  const goBackButton = () => {
    navigation.goBack();
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Name is required";
        }
        if (!values.surname) {
          errors.surname = "Surname is required";
        }
        if (!values.numberOfGuests) {
          errors.numberOfGuests = "Number of guests is required";
        }
        if (!values.email) {
          errors.email = "Email is required";
        }
        if (!values.city) {
          errors.city = "City is required";
        }
        if (!values.town) {
          errors.town = "Town is required";
        }
        if (!values.phone) {
          errors.phone = "Phone is required";
        }
        if (!values.checkInDate) {
          errors.checkInDate = "Check in date is required";
        }
        if (!values.checkOutDate) {
          errors.checkOutDate = "Check out date is required";
        }
        return errors;
      }}
      onSubmit={(values) => {
        values.hotelId = selectedHotelId;
        values.roomType = selectedRoom.type;
        values.userId = userId;
        values.price = totalPrice.toString();
        values.numberOfStayDate = daysDifference.toString();
        navigation.navigate("PaymentInfoScreen", {
          reservationDetails: values,
          selectedRoom: selectedRoom,
        });
      }}
    >
      {({ handleChange, handleSubmit, setFieldValue, values, errors }) => (
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
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}
            <TextInput
              style={styles.infoInputStyle}
              placeholder={t("reservationDetail.nameInputLabel")}
              value={values.name}
              onChangeText={handleChange("name")}
            />
            {errors.surname && (
              <Text style={styles.error}>{errors.surname}</Text>
            )}
            <TextInput
              style={styles.infoInputStyle}
              placeholder={t("reservationDetail.surnameInputLabel")}
              value={values.surname}
              onChangeText={handleChange("surname")}
            />
            {errors.numberOfGuests && (
              <Text style={styles.error}>{errors.numberOfGuests}</Text>
            )}
            <TextInput
              style={styles.infoInputStyle}
              placeholder={t("reservationDetail.numberOfGuestsInputLabel")}
              inputMode="numeric"
              value={values.numberOfGuests}
              onChangeText={handleChange("numberOfGuests")}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <TextInput
              style={styles.infoInputStyle}
              placeholder={t("reservationDetail.emailInputLabel")}
              value={values.email}
              onChangeText={handleChange("email")}
            />
            {errors.city && <Text style={styles.error}>{errors.city}</Text>}
            <TextInput
              style={styles.infoInputStyle}
              placeholder="City"
              value={values.city}
              onChangeText={handleChange("city")}
            />
            {errors.town && <Text style={styles.error}>{errors.town}</Text>}
            <TextInput
              style={styles.infoInputStyle}
              placeholder="Town"
              value={values.town}
              onChangeText={handleChange("town")}
            />
            {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
            <TextInput
              style={styles.infoInputStyle}
              placeholder={t("reservationDetail.phoneInputLabel")}
              inputMode="numeric"
              value={values.phone}
              onChangeText={handleChange("phone")}
            />
            <View>
              <TouchableOpacity onPress={() => setShowCheckInDatePicker(true)}>
                {errors.checkInDate && (
                  <Text style={styles.error}>{errors.checkInDate}</Text>
                )}
                <TextInput
                  style={styles.infoInputStyle}
                  placeholder="Check-in Date"
                  value={
                    values.checkInDate
                      ? format(new Date(values.checkInDate), "dd MMM yyyy")
                      : ""
                  }
                  editable={false}
                />
              </TouchableOpacity>
              {showCheckInDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={checkInDate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={(event, date) => {
                    setShowCheckInDatePicker(false);
                    if (date) {
                      setcheckInDate(date);
                      setFieldValue(
                        "checkInDate",
                        date.toISOString().split("T")[0]
                      );
                    }
                  }}
                />
              )}
            </View>
            <View>
              {!values.checkInDate && showCheckOutDatePicker && (
                <Text style={styles.error}>
                  Please select a check-in date first
                </Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  if (values.checkInDate) {
                    setShowCheckOutDatePicker(true);
                    setShowCheckOutDateWarning(false);
                  } else {
                    setShowCheckOutDateWarning(true);
                  }
                }}
              >
                {errors.checkOutDate && (
                  <Text style={styles.error}>{errors.checkOutDate}</Text>
                )}
                <TextInput
                  style={styles.infoInputStyle}
                  placeholder="Check-out Date"
                  value={
                    values.checkOutDate
                      ? format(new Date(values.checkOutDate), "dd MMM yyyy")
                      : ""
                  }
                  editable={false}
                />
              </TouchableOpacity>
              {showCheckOutDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={checkOutDate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  minimumDate={checkInDate}
                  onChange={(event, date) => {
                    setShowCheckOutDatePicker(false);
                    setShowCheckOutDateWarning(false);
                    if (date) {
                      setcheckOutDate(date);
                      setFieldValue(
                        "checkOutDate",
                        date.toISOString().split("T")[0]
                      );
                    }
                  }}
                />
              )}
              {showCheckOutDateWarning && (
                <Text style={styles.error}>
                  Please select a check-in date first
                </Text>
              )}
            </View>

            <TouchableOpacity onPress={handleSubmit}>
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
  error: {
    color: "red",
    fontSize: 12,
  },
});
