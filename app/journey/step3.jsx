import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { router, useLocalSearchParams } from "expo-router";

export default function Journey3Step() {
  let { data } = useLocalSearchParams();
  data = data ? JSON.parse(data) : {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 3</Text>
      <Text>Name: {data.name}</Text>
      <Text>Preferences: {data.preferences}</Text>
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
