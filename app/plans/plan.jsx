import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import NoPlansScreen from "@/components/NoPlansScreen";

export default function Plan() {
  const { plan: planStr, title } = useLocalSearchParams();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [plan, setPlan] = useState(() => {
    try {
      return JSON.parse(planStr);
    } catch (error) {
      console.error("Error parsing plan: ", error);
      return [];
    }
  });

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleDelete = (index) => {
    const updatedPlan = plan.filter((_, i) => i !== index);
    setPlan(updatedPlan);
  };

  console.log("Plan from plancontainer: ", plan);
  console.log("Title from plancontainer: ", title);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {plan && plan.length > 0 ? (
        plan.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => toggleExpanded(index)}>
            <View
              style={[
                styles.card,
                expandedIndex === index && styles.expandedCard,
              ]}>
              <View style={styles.cardContent}>
                <Text style={styles.place}>{item.place}</Text>
                <Text style={styles.time}>{item.time}</Text>
                {expandedIndex === index && (
                  <Text style={styles.description}>{item.what_to_do}</Text>
                )}
              </View>
              <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => handleDelete(index)}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
                <Text style={styles.arrow}>
                  {expandedIndex === index ? "▲" : "▼"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <NoPlansScreen />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "blue",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  expandedCard: {
    backgroundColor: "#e0e0e0",
  },
  cardContent: {
    flex: 1,
  },
  place: {
    fontSize: 18,
    fontWeight: "bold",
  },
  time: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  description: {
    marginTop: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    color: "red",
    marginRight: 10,
  },
  arrow: {
    fontSize: 20,
  },
  noPlansText: {
    fontSize: 16,
    color: "#666",
  },
});
