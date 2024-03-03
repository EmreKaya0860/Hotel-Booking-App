import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const TABLE = "Hotels";

export const getRooms = async (selectedHotelId) => {
  const hotelsCollection = collection(db, TABLE);
  const queryy = query(hotelsCollection);
  const snapshot = await getDocs(queryy);

  const rooms = snapshot.docs
    .filter((doc) => doc.id === selectedHotelId)
    .map((doc) => doc.data().Rooms);

  const roomsInfos = Object.keys(rooms[0]).map((roomKey) => {
    const room = rooms[0][roomKey];
    return {
      type: roomKey,
      guestNumber: room.GuestNumber,
      image: room.Image,
      price: room.Price,
    };
  });

  roomsInfos.sort((a, b) => b.price - a.price);

  return roomsInfos;
};

export const saveReservation = async (reservationDetails) => {
  const usersCollection = collection(db, "Reservation");
  await addDoc(usersCollection, reservationDetails);
  return true;
};

export const getReservations = async (uId) => {
  const reservationsCollection = collection(db, "Reservation");
  const queryy = query(reservationsCollection, orderBy("checkInDate"));
  const snapshot = await getDocs(queryy);
  const reservations = snapshot.docs
    .filter((doc) => doc.data().userId === uId)
    .map((doc) => doc.data());
  return reservations;
};

export const getHotelById = async (hotelId) => {
  const hotelsCollection = collection(db, TABLE);
  const queryy = query(hotelsCollection);
  const snapshot = await getDocs(queryy);
  const hotel = snapshot.docs
    .filter((doc) => doc.id === hotelId)
    .map((doc) => doc.data());
  return hotel[0];
};
