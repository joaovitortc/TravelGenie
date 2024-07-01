import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { TextInput } from 'react-native';
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from 'react';

export default function Journey2Step() {
  let { data } = useLocalSearchParams();
  data = data ? JSON.parse(data) : {};

  const [duration, setDuration] = useState("")

  function handleGoStep3() {
    data.duration = duration
    router.push({
      pathname: "/journey/step3",
      params: { data: JSON.stringify(data) }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 2 - Trip duration</Text>
      <TextInput 
      onChangeText={setDuration} 
      value={duration}
      placeholder="Whats your trip duration"/>
      <TouchableOpacity onPress={handleGoStep3}>
        <Text>Go to step 3</Text>
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
