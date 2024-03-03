import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

import { getReservations, getHotelById } from "../service/ReservationStepsApi";

import { auth, firestore } from "../service/firebase";

const BookingsScreen = () => {
  const [tab, setTab] = useState(1);
  const [reservations, setReservations] = useState([]);
  const [previousReservations, setPreviousReservations] = useState([]);
  const [previousHotelDetail, setPreviousHotelDetail] = useState([]);
  const [currentReservations, setCurrentReservations] = useState([]);
  const [currentHotelDetail, setCurrentHotelDetail] = useState([]);

  const user = auth.currentUser;

  console.log("user: ", user.uid);

  useEffect(() => {
    getReservations(user.uid)
      .then((reservations) => {
        setReservations(reservations);
        const currentDate = new Date();
        const previousReservations = reservations
          .filter(
            (reservation) => new Date(reservation.checkOutDate) < currentDate
          )
          .map((reservation) => ({
            ...reservation,
            checkInDate: new Date(reservation.checkInDate).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "short", day: "numeric" }
            ),
            checkOutDate: new Date(reservation.checkOutDate).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "short", day: "numeric" }
            ),
          }));
        setPreviousReservations(previousReservations);

        const currentReservations = reservations
          .filter(
            (reservation) => new Date(reservation.checkOutDate) >= currentDate
          )
          .map((reservation) => ({
            ...reservation,
            checkInDate: new Date(reservation.checkInDate).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "short", day: "numeric" }
            ),
            checkOutDate: new Date(reservation.checkOutDate).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "short", day: "numeric" }
            ),
          }));
        setCurrentReservations(currentReservations);

        Promise.all(
          previousReservations.map((reservation) =>
            getHotelById(reservation.hotelId)
          )
        ).then((hotelDetails) => {
          setPreviousHotelDetail(hotelDetails);
        });

        Promise.all(
          currentReservations.map((reservation) =>
            getHotelById(reservation.hotelId)
          )
        ).then((hotelDetails) => {
          setCurrentHotelDetail(hotelDetails);
        });
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
    console.log("current: ", currentHotelDetail[0]);
  }, []);

  return previousHotelDetail ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Ionicons name="arrow-back" size={20} />
        <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "600" }}>
          My Booking
        </Text>
        <Ionicons name="filter-outline" size={20} />
      </View>
      <View
        style={{
          alignSelf: "center",
          height: 60,
          width: "87%",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 30,
          backgroundColor: "whitesmoke",
          borderRadius: 20,
        }}
      >
        <TouchableOpacity
          style={tab == 1 ? styles.booked : styles.booked2}
          onPress={() => setTab(1)}
        >
          <View>
            <Text
              style={{ textAlign: "center", marginTop: 15, fontWeight: "500" }}
            >
              Booked
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={tab == 1 ? styles.history : styles.history2}
          onPress={() => setTab(2)}
        >
          <View>
            <Text
              style={{ textAlign: "center", marginTop: 15, fontWeight: "500" }}
            >
              History
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={{
            display: tab == 1 ? "block" : "none",
          }}
        >
          {currentReservations.map((reservation, index) => {
            return (
              <View
                style={{
                  alignSelf: "center",
                  height: 200,
                  width: "87%",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 30,
                  backgroundColor: "whitesmoke",
                  borderRadius: 20,
                }}
                key={index}
              >
                <View>
                  {currentHotelDetail.length > 0 &&
                    currentHotelDetail.map((hotel, index) => {
                      return (
                        <View
                          style={{
                            flexDirection: "row",
                            paddingHorizontal: 20,
                            marginTop: 10,
                          }}
                          key={index}
                        >
                          <Image
                            source={{
                              uri: hotel.ImageUrl,
                            }}
                            resizeMode="contain"
                            style={{ width: 140, height: 90, borderRadius: 15 }}
                          />
                          <View style={{ flexDirection: "column" }}>
                            <Text
                              style={{
                                padding: 10,
                                paddingHorizontal: 10,
                                fontSize: 18,
                              }}
                            >
                              {hotel.Name}
                            </Text>
                            <Text style={{ fontSize: 10, marginLeft: 10 }}>
                              {hotel.Address}
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                              <Text
                                style={{
                                  fontSize: 13,
                                  marginTop: 8,
                                  marginLeft: 10,
                                }}
                              >
                                ${reservation.price}{" "}
                              </Text>
                              <Ionicons
                                name="star"
                                size={18}
                                color={"gold"}
                                style={{ top: 6 }}
                              />
                              <Text
                                style={{
                                  fontSize: 13,
                                  marginTop: 8,
                                  marginLeft: 5,
                                  color: "gold",
                                }}
                              >
                                {hotel.Rating}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 13,
                                  marginTop: 8,
                                  marginLeft: 5,
                                }}
                              >
                                ({hotel.Comment} Reviews)
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  <TouchableOpacity>
                    <View
                      style={{
                        alignSelf: "center",
                        justifyContent: "space-around",
                        height: 80,
                        width: "90%",
                        backgroundColor: "white",
                        borderRadius: 20,
                        flexDirection: "row",
                        marginTop: 10,
                      }}
                    >
                      <View style={{ flexDirection: "column" }}>
                        <Text style={{ fontSize: 15, marginTop: 10 }}>
                          Check In
                        </Text>
                        <Text style={{ fontSize: 20, marginTop: 10 }}>
                          {reservation.checkInDate}
                        </Text>
                      </View>
                      <Ionicons
                        name="arrow-forward"
                        size={20}
                        style={{ alignSelf: "center" }}
                      />
                      <View style={{ flexDirection: "column" }}>
                        <Text style={{ fontSize: 15, marginTop: 10 }}>
                          Check Out
                        </Text>
                        <Text style={{ fontSize: 20, marginTop: 10 }}>
                          {reservation.checkOutDate}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        <View
          style={{
            display: tab == 2 ? "block" : "none",
          }}
        >
          {previousReservations.map((reservation, index) => {
            return (
              <View
                style={{
                  alignSelf: "center",
                  height: 200,
                  width: "87%",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 30,
                  backgroundColor: "whitesmoke",
                  borderRadius: 20,
                }}
                key={index}
              >
                <View>
                  {previousHotelDetail.length > 0 &&
                    previousHotelDetail.map((hotel, index) => {
                      return (
                        <View
                          style={{
                            flexDirection: "row",
                            paddingHorizontal: 20,
                            marginTop: 10,
                          }}
                          key={index}
                        >
                          <Image
                            source={{
                              uri: hotel.ImageUrl,
                            }}
                            resizeMode="contain"
                            style={{ width: 140, height: 90, borderRadius: 15 }}
                          />
                          <View style={{ flexDirection: "column" }}>
                            <Text
                              style={{
                                padding: 10,
                                paddingHorizontal: 10,
                                fontSize: 18,
                              }}
                            >
                              {hotel.Name}
                            </Text>
                            <Text style={{ fontSize: 12, marginLeft: 10 }}>
                              {hotel.Address}
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                              <Text
                                style={{
                                  fontSize: 13,
                                  marginTop: 8,
                                  marginLeft: 10,
                                }}
                              >
                                ${reservation.price}{" "}
                              </Text>
                              <Ionicons
                                name="star"
                                size={18}
                                color={"gold"}
                                style={{ top: 6 }}
                              />
                              <Text
                                style={{
                                  fontSize: 13,
                                  marginTop: 8,
                                  marginLeft: 5,
                                  color: "gold",
                                }}
                              >
                                {hotel.Rating}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 13,
                                  marginTop: 8,
                                  marginLeft: 5,
                                }}
                              >
                                ({hotel.Comment} Reviews)
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  <TouchableOpacity>
                    <View
                      style={{
                        alignSelf: "center",
                        justifyContent: "space-around",
                        height: 80,
                        width: "90%",
                        backgroundColor: "white",
                        borderRadius: 20,
                        flexDirection: "row",
                        marginTop: 10,
                      }}
                    >
                      <View style={{ flexDirection: "column" }}>
                        <Text style={{ fontSize: 15, marginTop: 10 }}>
                          Check In
                        </Text>
                        <Text style={{ fontSize: 20, marginTop: 10 }}>
                          {reservation.checkInDate}
                        </Text>
                      </View>
                      <Ionicons
                        name="arrow-forward"
                        size={20}
                        style={{ alignSelf: "center" }}
                      />
                      <View style={{ flexDirection: "column" }}>
                        <Text style={{ fontSize: 15, marginTop: 10 }}>
                          Check Out
                        </Text>
                        <Text style={{ fontSize: 20, marginTop: 10 }}>
                          {reservation.checkOutDate}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <ActivityIndicator size="large" color="dodgerblue" style={{ flex: 1 }} />
  );
};

export default BookingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  booked: {
    height: 50,
    width: 175,
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 5,
  },
  booked2: {
    height: 50,
    width: 175,
    backgroundColor: "whitesmoke",
    borderRadius: 20,
    marginTop: 5,
  },

  history: {
    height: 50,
    width: 175,
    backgroundColor: "whitesmoke",
    borderRadius: 20,
    marginTop: 5,
  },
  history2: {
    height: 50,
    width: 175,
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 5,
  },
});
