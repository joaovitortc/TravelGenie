import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  primary,
  secondary,
  white,
  lowkey,
  button,
  black,
} from "../../constants/ThemeVariables";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
    </View>
  );
};

export default function Journey5Step() {
  const [customDislikedActivity, setCustomDislikedActivity] = useState("");
  const currentStep = 5;
  const totalSteps = 6;
  const [selectedDislikedActivities, setSelectedDislikedActivities] = useState(
    []
  );
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false); // State to manage button enable/disable
  let { data } = useLocalSearchParams();
  data = data ? JSON.parse(data) : {};

  useEffect(() => {
    setIsNextButtonEnabled(
      selectedDislikedActivities.length > 0 ||
        customDislikedActivity.trim().length > 0
    ); // Enable the button if any disliked activity is selected or custom activity is not empty
  }, [selectedDislikedActivities, customDislikedActivity]);

  const toggleDislikedActivity = (activity) => {
    setSelectedDislikedActivities((prevSelected) =>
      prevSelected.includes(activity)
        ? prevSelected.filter((item) => item !== activity)
        : [...prevSelected, activity]
    );
  };

  const handleGoNextStep = (skip = false) => {
    if (!isNextButtonEnabled && !skip) {
      return;
    }
    let dislikedActivitiesToSubmit = [...selectedDislikedActivities];
    if (customDislikedActivity.trim() && !skip) {
      dislikedActivitiesToSubmit.push(customDislikedActivity.trim());
    }

    data.dislikedActivities = dislikedActivitiesToSubmit.join(" ");
    console.log("Disliked Activities:", data.dislikedActivities);
    router.push({
      pathname: "/journey/step6",
      params: { data: JSON.stringify(data) },
    });
  };

  const handleGobackAStep = () => {
    router.back("/");
  };

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <View style={styles.titlecontainer}>
        <View style={styles.circle}>
          <Text style={styles.number}>5</Text>
        </View>
        <Text style={styles.title}>Disliked Activities</Text>
      </View>
      <Text style={styles.paragraph}>
        Choose activities you would{" "}
        <Text style={styles.highlight}>not like</Text> to do
      </Text>

      <ScrollView contentContainerStyle={styles.activitiesContainer}>
        {activities.map((activity, index) => {
          const isSelected = selectedDislikedActivities.includes(activity.name);
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.activityButton,
                isSelected && styles.activityButtonSelected,
              ]}
              onPress={() => toggleDislikedActivity(activity.name)}
            >
              <Ionicons
                name={activity.icon}
                size={30}
                color={isSelected ? "#FFF" : "#000"}
              />
              <Text
                style={[
                  styles.activityText,
                  isSelected && styles.activityTextSelected,
                ]}
              >
                {activity.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Text style={styles.orStyle}>or</Text>
      <TextInput
        onChangeText={setCustomDislikedActivity}
        value={customDislikedActivity}
        placeholder="Type your disliked activity..."
        style={styles.input}
      />
      <View style={styles.navigationbuttons}>
        <TouchableOpacity
          onPress={handleGobackAStep}
          style={styles.navigationButtonBack}
        >
          <Ionicons
            name="arrow-back-outline"
            size={20}
            color={lowkey}
            paddingTop={5}
          />
          <Text style={styles.navigationButtonTextBack}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleGoNextStep(false)}
          style={[
            styles.navigationButtonNext,
            { backgroundColor: isNextButtonEnabled ? button : "#ccc" }, // Change color if not enabled
          ]}
          disabled={!isNextButtonEnabled} // Disable button if not enabled
        >
          <Text
            style={[
              styles.navigationButtonTextNext,
              { color: isNextButtonEnabled ? black : "#888" },
            ]}
          >
            Next
          </Text>
          <Ionicons
            name="arrow-forward-outline"
            size={20}
            color={isNextButtonEnabled ? black : "#888"}
            paddingTop={5}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => handleGoNextStep(true)}
        style={styles.navigationButtonSkip}
      >
        <Text style={styles.navigationButtonTextSkip}>Skip this step</Text>
      </TouchableOpacity>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const activities = [
  { name: "Walking", icon: "walk-outline" },
  { name: "Eating", icon: "restaurant" },
  { name: "Museums", icon: "planet-outline" },
  { name: "Shop", icon: "cart" },
  { name: "Tasting", icon: "wine" },
  { name: "Extreme", icon: "rocket-outline" },
  { name: "Photo", icon: "camera" },
  { name: "Sports", icon: "football" },
  { name: "Cycling", icon: "bicycle" },
  { name: "Cinema", icon: "film" },
  { name: "Beach", icon: "sunny" },
  { name: "Music", icon: "musical-notes-outline" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: secondary,
    padding: 20,
  },
  titlecontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    paddingLeft: 32,
    marginBottom: 20,
    backgroundColor: secondary,
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: primary,
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    color: white,
    fontSize: 25,
    fontWeight: "bold",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 20,
  },
  paragraph: {
    fontSize: 15,
    color: black,
    marginBottom: 25,
    width: "75%",
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

  highlight: {
    color: "#BE1D29",
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  activitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  activityButton: {
    width: "30%",
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#BE1D29",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#FFF",
  },
  activityButtonSelected: {
    backgroundColor: "#BE1D29",
  },
  activityText: {
    fontSize: 14,
    color: "#000",
    marginTop: 5,
  },
  activityTextSelected: {
    color: "#FFF",
  },

  progressContainer: {
    width: "80%",
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginBottom: 70,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: primary,
  },
  input: {
    height: 40,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: white,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "80%",
    backgroundColor: white,
    fontSize: 14,
  },
  navigationButtonBack: {
    borderColor: lowkey,
    borderWidth: 2,
    padding: 10,
    borderRadius: 30,
    width: "45%",
    marginTop: 80,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navigationButtonTextBack: {
    color: lowkey,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
  navigationButtonNext: {
    padding: 10,
    borderRadius: 30,
    width: "45%",
    marginTop: 80,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navigationButtonTextNext: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
  locationButton: {
    backgroundColor: button,
    padding: 10,
    borderRadius: 18,
    marginBottom: 20,
    width: "80%",
  },
  locationButtonText: {
    color: black,
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: "center",
  },
  orStyle: {
    color: black,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 0,
    fontWeight: "bold",
    fontSize: 14,
  },
  navigationbuttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  navigationButtonSkip: {
    marginTop: 30,
  },
  navigationButtonTextSkip: {
    color: lowkey,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
