// profile.jsx
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { router, useLocalSearchParams } from "expo-router";

const Profile = () => {
  let { data } = useLocalSearchParams();
  data = data ? JSON.parse(data) : {};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between sign-up and log-in

  if (auth.currentUser) { 
    console.log("User was already previously signed-in");

    async function addPlans() {
      const user = auth.currentUser;

      // Check if plans exist for this user
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const currentPlans = userDoc.data().plans || [];

        // Append new plan to the current plans array
        const updatedPlans = [...currentPlans, data];

        // Update the document with the updated plans array
        await updateDoc(doc(db, "users", user.uid), {
          plans: updatedPlans,
        });
      }

      router.push("/plans");
    }

    addPlans();
  } 
  else {

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        console.log("Creating new user");
        // Check if the user already exists
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Create or update user document with plans array
        await setDoc(doc(db, "users", user.uid), { plans: [data || {}] });
      } else {
        // Sign in existing user
        console.log("Signin in existing user");
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Check if plans exist for this user
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const currentPlans = userDoc.data().plans || [];

          // Append new plan to the current plans array
          const updatedPlans = [...currentPlans, data];

          // Update the document with the updated plans array
          await updateDoc(doc(db, "users", user.uid), {
            plans: updatedPlans,
          });
        }
      }

      router.push("/plans"); // Redirect to home page after successful login/signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={isSignUp ? "Sign Up" : "Log In"} onPress={handleAuth} />
      {error ? <Text>{error}</Text> : null}
      <Button
        title={isSignUp ? "Switch to Log In" : "Switch to Sign Up"}
        onPress={() => setIsSignUp(!isSignUp)}
      />
    </View>
  );
};
}

export default Profile;