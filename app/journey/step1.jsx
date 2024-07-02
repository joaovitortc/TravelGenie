import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { TextInput } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  primary,
  secondary,
  button,
  lowkey,
  positive,
  negative,
  white,
  textcolor,
} from "../../constants/ThemeVariables";

export default function Journey1Step() {
  const [location, setLocation] = useState("");
  let data = {
    location: "",
  };

  function handleGoStep2() {
    data.location = location;
    router.push({
      pathname: "/journey/step2",
      params: { data: JSON.stringify(data) },
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.titlecontainer}>
        <View style={styles.circle}>
          <Text style={styles.number}>1</Text>
        </View>
        <Text style={styles.title}>Location</Text>
      </View>
      <TextInput
        onChangeText={setLocation}
        value={location}
        placeholder="Type your location"
      />
      <TouchableOpacity onPress={handleGoStep2}>
        <Text>Go to step 2</Text>
      </TouchableOpacity>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: secondary,
  },
  titlecontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: secondary,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: primary,
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    color: white,
    fontSize: 30,
    fontWeight: "bold",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 15,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
