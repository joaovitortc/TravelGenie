import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { router, useLocalSearchParams } from "expo-router";
import { TextInput } from "react-native";
import { useState } from "react";

export default function Journey3Step() {
  const [budget, setBudget] = useState("");
  let { data } = useLocalSearchParams();
  data = data ? JSON.parse(data) : {};

  function handleGoStep4() {
    data.budget = budget;
    router.push({
      pathname: "/journey/step4",
      params: { data: JSON.stringify(data) }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 3 - Budget available</Text>
      <TextInput 
      onChangeText={setBudget} 
      value={budget}
      placeholder="Whats your budget?"/>
      <TouchableOpacity onPress={handleGoStep4}>
        <Text>Go to step 4</Text>
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
