import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { router, useLocalSearchParams } from "expo-router";
import { TextInput } from "react-native";
import { useState } from "react";

export default function Journey4Step() {
  const [activities, setActivities] = useState("");
  let { data } = useLocalSearchParams();
  data = data ? JSON.parse(data) : {};

  function handleGoStep5() {
    data.activities = activities;
    router.push({
      pathname: "/journey/step5",
      params: { data: JSON.stringify(data) }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 4 - Activities</Text>
      <TextInput 
      onChangeText={setActivities} 
      value={activities}
      placeholder="Preferences for the trip?"/>
      <TouchableOpacity onPress={handleGoStep5}>
        <Text>Go to step 5</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
