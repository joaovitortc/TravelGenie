import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you are using Expo for the icon
import { router } from "expo-router";

export default function PlanCard({ title, plan, index }) {
  console.log("Plan Card receiveing: ", title, plan);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: `plans/plan`,
          params: { plan: JSON.stringify(plan), title: title },
        })
      }
    >
      <Image
        source={{ uri: images[index % images.length] }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{title}</Text>
      </View>
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
    backgroundColor: "white", // Optional: Add background color to each user item
    borderRadius: 8, // Optional: Add border radius for rounded corners
    shadowColor: "#000",
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
    color: "grey",
  },
  icon: {
    marginLeft: "auto", // Align the icon to the right
  },
});

const images = [
  "https://cdn.britannica.com/22/922-050-6D3067E8/Guild-houses-Lys-River-Belgium-Ghent.jpg",
  "https://cdn.britannica.com/22/922-050-6D3067E8/Guild-houses-Lys-River-Belgium-Ghent.jpg",
  "https://example.com/image3.jpg",
  "https://example.com/image4.jpg",
  "https://example.com/image5.jpg",
  "https://example.com/image6.jpg",
  "https://example.com/image7.jpg",
  "https://example.com/image8.jpg",
  "https://example.com/image9.jpg",
  "https://example.com/image10.jpg",
  "https://example.com/image11.jpg",
  "https://example.com/image12.jpg",
  "https://example.com/image13.jpg",
  "https://example.com/image14.jpg",
  "https://example.com/image15.jpg",
];
