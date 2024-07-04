import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming Expo for icons

const PlanScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>All Done!</Text>
      <Text style={styles.subtitle}>(GENERATED TITLE)</Text>
      <Text style={styles.date}>(place and date)</Text>

      <View style={styles.timeline}>
        {activities.map((activity, index) => (
          <View key={index} style={styles.timelineItem}>
            <Text style={styles.time}>{activity.time}</Text>
            <View style={styles.timelineContent}>
              {index !== activities.length - 1 && <View style={styles.line} />}
              <View style={styles.circle} />
              <Text style={styles.activityPlace}>{activity.place}</Text>
              {/* <Ionicons name="chevron-down" size={24} color="black" /> */}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tipContainer}>
        <Text style={styles.tipTitle}>Tip!</Text>
        <Text style={styles.tipText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et.
        </Text>
      </View>

      <Text style={styles.regenerateText}>
        To get a new plan for your trip, click on{" "}
        <Text style={styles.highlight}>Regenerate</Text> button
      </Text>

      <TouchableOpacity style={styles.regenerateButton}>
        <Text style={styles.buttonText}>Regenerate</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save plan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const activities = [
  { time: "11:50", place: "10 minutes of walking through the city" },
  { time: "12:00", place: "First beer tasting" },
  { time: "12:05", place: "Lunch" },
  { time: "12:40", place: "Brussels Museum Visit" },
  { time: "11:50", place: "10 minutes of walking through the city" },
  { time: "12:00", place: "First beer tasting" },
  { time: "12:05", place: "Lunch" },
  { time: "12:40", place: "Brussels Museum Visit" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#007BFF",
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  timeline: {
    marginBottom: 10,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 10,
  },
  time: {
    width: 50,
    fontSize: 16,
    fontWeight: "bold",
  },
  timelineContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  line: {
    position: "absolute",
    top: 40,
    left: 8,
    height: "100%",
    width: 2,
    backgroundColor: "#007BFF",
  },

  circle: {
    width: 15,
    height: 15,
    borderRadius: 20,

    marginRight: 10,
    borderColor: "#1D80C3",
    borderWidth: 2,
  },
  activityPlace: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  tipContainer: {
    backgroundColor: "#E9F1FB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 0,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tipText: {
    fontSize: 14,
    color: "#555",
  },
  regenerateText: {
    textAlign: "left",
    marginTop: 20,
    fontSize: 14,
  },
  regenerateButton: {
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
    borderColor: "#F3A61E",
    borderWidth: 2,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 80,
  },
  editButton: {
    flex: 1,
    borderColor: "#000",
    borderWidth: 1,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginRight: 10,
  },
  editButtonText: {
    color: "#000",
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
  },

  highlight: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default PlanScreen;
