// profile.jsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { router, useLocalSearchParams } from "expo-router";

const Profile = () => {
  let { data } = useLocalSearchParams();
  data = data ? JSON.parse(data) : {};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between sign-up and log-in

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
        } else {
          // If user somehow signed in without existing plans
          await setDoc(doc(db, "users", user.uid), { plans: [data || {}] });
        }
      }

      router.push("/plans"); // Redirect to home page after successful login/signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isSignUp ? "Sign Up" : "Log In"}</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setIsSignUp(!isSignUp)}
      >
        <Text style={styles.switchButtonText}>
          {isSignUp ? "Switch to Log In" : "Switch to Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#E6EFFC",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  button: {
    height: 50,
    backgroundColor: "#F3A61E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 20,
    marginTop: 30,
  },
  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  switchButton: {
    alignItems: "center",
  },
  switchButtonText: {
    color: "#000000",
    fontSize: 16,
  },
});

export default Profile;