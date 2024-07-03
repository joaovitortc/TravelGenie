import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const MyPlansScreen = () => {
  const plans = []; // Assuming you fetch the plans and it is empty for now

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My plans</Text>
      {plans.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          {
            <Image
              source={require("../../assets/images/travel_genie_logo.png")}
              style={styles.image}
            />
          }

          <Text style={styles.emptyText}>Not saved plans yet</Text>
        </View>
      ) : (
        <View style={styles.plansContainer}>
          {/* Render saved plans here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F1FB",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
  },
  plansContainer: {
    // Styles for plans container if there are saved plans
  },
});

export default MyPlansScreen;
