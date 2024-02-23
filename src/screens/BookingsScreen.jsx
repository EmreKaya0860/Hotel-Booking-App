import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const BookingsScreen = () => {
  const [tab, setTab] = useState(1);

  return (
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
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 20,
                  marginTop: 10,
                }}
              >
                <Image
                  source={{
                    uri: "https://digital.ihg.com/is/image/ihg/voco-new-york-6671510166-16x9",
                  }}
                  resizeMode="contain"
                  style={{ width: 140, height: 90, borderRadius: 15 }}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{ padding: 10, paddingHorizontal: 10, fontSize: 18 }}
                  >
                    The Franklin New York
                  </Text>
                  <Text style={{ fontSize: 12, marginLeft: 10 }}>
                    164 East 87 Street New York 10128
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{ fontSize: 13, marginTop: 8, marginLeft: 10 }}
                    >
                      $35/Night{" "}
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
                      4.2
                    </Text>
                    <Text style={{ fontSize: 13, marginTop: 8, marginLeft: 5 }}>
                      (84 Reviews)
                    </Text>
                  </View>
                </View>
              </View>
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
                    <Text style={{ fontSize: 20, marginTop: 10 }}>12 June</Text>
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
                    <Text style={{ fontSize: 20, marginTop: 10 }}>28 June</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
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
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 20,
                  marginTop: 10,
                }}
              >
                <Image
                  source={{
                    uri: "https://images.trvl-media.com/lodging/2000000/1870000/1866500/1866407/47e1e07e.jpg?impolicy=resizecrop&rw=1200&ra=fit",
                  }}
                  resizeMode="contain"
                  style={{ width: 140, height: 90, borderRadius: 15 }}
                />
                <View style={{ flexDirection: "column", width: "65%" }}>
                  <Text
                    style={{ padding: 10, paddingHorizontal: 10, fontSize: 18 }}
                  >
                    SIXTY Lower East Side
                  </Text>
                  <Text
                    style={{ maxWidth: "90%", fontSize: 12, marginLeft: 10 }}
                  >
                    190 Allen Street, New York, NY, 10002
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{ fontSize: 13, marginTop: 8, marginLeft: 10 }}
                    >
                      $35/Night{" "}
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
                      4.2
                    </Text>
                    <Text style={{ fontSize: 13, marginTop: 8, marginLeft: 5 }}>
                      (84 Reviews)
                    </Text>
                  </View>
                </View>
              </View>
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
                      12 September
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
                      28 September
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            display: tab == 2 ? "block" : "none",
          }}
        >
          <View style={{ alignSelf: "center", marginTop: 30 }}>
            <Text style={{ textAlign: "center", color: "darkgray" }}>
              Doldurulabilir Alan
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
