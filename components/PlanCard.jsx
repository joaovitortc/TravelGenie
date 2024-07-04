import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { lowkey, negative, white, black } from "../constants/ThemeVariables";

export default function PlanCard({ title, plan, index, onDelete }) {
  console.log("Plan Card receiveing: ", title, plan);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: `plans/plan`,
          params: { plan: JSON.stringify(plan), title: title },
        })
      }>
      <Image
        source={require("../assets/images/travel_genie_logo.png")}
        style={styles.image}
      />

      <View style={styles.textContainer}>
        <Text style={styles.name}>{title}</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(index)}>
        <Ionicons
          name="trash-outline"
          size={20}
          color={negative}
          paddingTop={5}
          paddingRight={10}
        />
      </TouchableOpacity>
      <View style={styles.arrow} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 20, // Increase margin bottom between users
    backgroundColor: white, // Optional: Add background color to each user item
    borderRadius: 8, // Optional: Add border radius for rounded corners
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
  },
  title: {
    color: lowkey,
  },
  icon: {
    marginLeft: "auto", // Align the icon to the right
  },
});
