import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCigIWZFCgsrT22HCSOes7LJItv2oj0poc",
  authDomain: "travel-genie-c85eb.firebaseapp.com",
  projectId: "travel-genie-c85eb",
  storageBucket: "travel-genie-c85eb.appspot.com",
  messagingSenderId: "65601710193",
  appId: "1:65601710193:web:89df9514f2cb0669a0d3d0",
  measurementId: "G-ZMZ6YV8XR5",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const storage = getStorage(app);
