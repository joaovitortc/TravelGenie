import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Loading = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const dotText = ".".repeat(dots);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/travel_genie_logo.png")}
        style={styles.image}
      />
      <Text style={styles.text}>Generating plan{dotText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D80C3",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Loading;
