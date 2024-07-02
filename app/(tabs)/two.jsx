// app/Profile.jsx
import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>👤</Text>
      </View>
      <TextInput style={styles.input} placeholder="Your full name" />
      <TextInput style={styles.input} placeholder="Your email address" />
      <TextInput style={styles.input} placeholder="Where are you located?" />
      <Button title="Save" onPress={() => alert("Hello")} color="#D89A2B" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F4F8",
    padding: 20,
  },
  avatar: {
    backgroundColor: "#CBD2E0",
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 50,
    color: "#FFFFFF",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "80%",
  },
});

export default Profile;
