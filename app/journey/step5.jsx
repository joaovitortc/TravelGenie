import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { router, useLocalSearchParams } from "expo-router";
import { TextInput } from "react-native";
import { useState } from "react";

export default function Journey4Step() {
  const [dislikedActivities, setDislikedActivities] = useState("");
  let { data } = useLocalSearchParams();
  data = data ? JSON.parse(data) : {};

  function handleGoStep6() {
    data.dislikedActivities = dislikedActivities;
    router.push({
      pathname: "/journey/step6",
      params: { data: JSON.stringify(data) }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 5 - Disliked Activities</Text>
      <TextInput 
      onChangeText={setDislikedActivities} 
      value={dislikedActivities}
      placeholder="Preferences for the trip?"/>
      <TouchableOpacity onPress={handleGoStep6}>
        <Text>Go to step 6</Text>
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
