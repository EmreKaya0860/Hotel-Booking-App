import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import { useTranslation } from "react-i18next";

import { getRooms } from "../../service/ReservationStepsApi";

const SelectRoomScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState("loading");
  const [roomsInfos, setRoomsInfos] = useState([]);

  const { selectedHotelId, hotelName, userId } = route.params;

  const goBackButton = () => {
    navigation.goBack();
  };

  useEffect(() => {
    selectedHotelId &&
      getRooms(selectedHotelId).then((rooms) => {
        setRoomsInfos(rooms);
        roomsInfos && setStatus("idle");
      });
  }, [status]);

  const goReservationDetailScreen = (room) => {
    navigation.navigate("ReservationDetailScreen", {
      selectedRoom: room,
      selectedHotelId: selectedHotelId,
      userId: userId,
    });
  };

  return (
    <View style={styles.container}>
      {status === "loading" ? (
        <ActivityIndicator
          size="large"
          color="dodgerblue"
          style={{ flex: 1 }}
        />
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBackButton}>
              <Entypo name="chevron-left" size={30} color="#393939" />
            </TouchableOpacity>
            <Text style={styles.headerText}>{hotelName}</Text>
          </View>
          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {roomsInfos.map((room, index) => {
              return (
                <View style={styles.roomCard} key={index}>
                  <Image
                    source={{ uri: room.image }}
                    style={styles.roomImage}
                  />
                  <View style={styles.roomDetailsContainer}>
                    <View style={styles.roomTypeHeaderContainer}>
                      <Text style={styles.roomTypeText}>{room.type}</Text>
                      <TouchableOpacity>
                        <FontAwesome
                          name="info-circle"
                          size={24}
                          color="#FEC069"
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.roomOptionsContainer}>
                      <View style={styles.roomOptionRow}>
                        <FontAwesome5 name="coins" size={20} color="#DFDEDE" />
                        <Text style={styles.roomOptionText}>
                          {t("selectRoom.roomOptionRefundable")}
                        </Text>
                      </View>
                      <View style={styles.roomOptionRow}>
                        <FontAwesome name="coffee" size={20} color="#DFDEDE" />
                        <Text style={styles.roomOptionText}>
                          {t("selectRoom.roomOptionBreakfast")}
                        </Text>
                      </View>
                      <View style={styles.roomOptionRow}>
                        <FontAwesome5 name="wifi" size={20} color="#DFDEDE" />
                        <Text style={styles.roomOptionText}>
                          {t("selectRoom.roomOptionWifi")}
                        </Text>
                      </View>
                      <View style={styles.roomOptionRow}>
                        <FontAwesome5
                          name="temperature-low"
                          size={20}
                          color="#DFDEDE"
                        />
                        <Text style={styles.roomOptionText}>
                          {t("selectRoom.roomOptionAirConditioning")}
                        </Text>
                      </View>
                      <View style={styles.roomOptionRow}>
                        <FontAwesome5 name="bath" size={20} color="#DFDEDE" />
                        <Text style={styles.roomOptionText}>
                          {t("selectRoom.roomOptionBath")}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.priceAndSelectButtonContainer}>
                      <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>{room.price} $</Text>
                        <Text style={styles.nightText}>
                          2 {t("selectRoom.nightsText")}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => goReservationDetailScreen(room)}
                      >
                        <LinearGradient
                          colors={["#FEC069", "#F6D5A5"]}
                          style={styles.selectButton}
                        >
                          <Text style={styles.selectButtonText}>
                            {t("selectRoom.roomCardSelectButtonTitle")}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default SelectRoomScreen;

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
    flex: 1,
  },
  roomCard: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    height: 490,
    marginVertical: 20,
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.05)",
    borderRadius: 10,
  },
  roomImage: {
    width: "100%",
    height: 190,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  roomDetailsContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  roomTypeHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roomTypeText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#393939",
    letterSpacing: -0.44,
  },
  roomOptionsContainer: {
    marginTop: 20,
  },
  roomOptionRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 10,
  },
  roomOptionText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#616167",
    letterSpacing: -0.28,
  },
  priceAndSelectButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  priceText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#393939",
    letterSpacing: -0.44,
  },
  nightText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#999",
    letterSpacing: -0.24,
  },
  selectButton: {
    width: 185,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
  },
  selectButtonText: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    letterSpacing: -0.44,
  },
});
