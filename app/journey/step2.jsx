import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
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

export default function Journey1Step() {
  const [location, setLocation] = useState("");
  const currentStep = 2;
  const totalSteps = 6;
  let data = {
    location: "",
  };

  function handleGoNextStep() {
    data.location = location;
    router.push({
      pathname: "/journey/step3",
      params: { data: JSON.stringify(data) },
    });
  }

  function handleGobackAStep() {
    router.back("/");
  }

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <View style={styles.titlecontainer}>
        <View style={styles.circle}>
          <Text style={styles.number}>2</Text>
        </View>
        <Text style={styles.title}>Trip Duration</Text>
      </View>
      <Text style={styles.paragraph}>How long should your trip take?</Text>

      <View style={styles.navigationbuttons}>
        <TouchableOpacity
          onPress={handleGobackAStep}
          style={styles.navigationButtonBack}>
          <Ionicons
            name="arrow-back-outline"
            size={20}
            color={lowkey}
            paddingTop={5}
          />
          <Text style={styles.navigationButtonTextBack}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleGoNextStep}
          style={styles.navigationButtonNext}>
          <Text style={styles.navigationButtonTextNext}>Next</Text>
          <Ionicons
            name="arrow-forward-outline"
            size={20}
            color={black}
            paddingTop={5}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleGoNextStep}
        style={styles.navigationButtonSkip}>
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
    fontSize: 14,
    color: black,
    marginBottom: 80,
    width: "80%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
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
    backgroundColor: button,
    padding: 10,
    borderRadius: 30,
    width: "45%",
    marginTop: 80,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navigationButtonTextNext: {
    color: black,
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
    marginBottom: 20,
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
