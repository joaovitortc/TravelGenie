import React, { useState } from "react";
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
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [startAMPM, setStartAMPM] = useState("AM");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [endAMPM, setEndAMPM] = useState("AM");

  const currentStep = 2;
  const totalSteps = 6;
  let data = {
    location: "",
    startHour,
    startMinute,
    startAMPM,
    endHour,
    endMinute,
    endAMPM,
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

  function toggleAMPM(timeOfDay, setTimeOfDay) {
    setTimeOfDay((prev) => (prev === "AM" ? "PM" : "AM"));
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

      <View style={styles.timeContainer}>
        <Text style={styles.label}>Starting time</Text>
        <View style={styles.timeInputRow}>
          <TextInput
            style={styles.timeInput}
            keyboardType="numeric"
            maxLength={2}
            placeholder="00"
            value={startHour}
            onChangeText={setStartHour}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.timeInput}
            keyboardType="numeric"
            maxLength={2}
            placeholder="00"
            value={startMinute}
            onChangeText={setStartMinute}
          />
          <TouchableOpacity
            style={[
              styles.ampmButton,
              startAMPM === "AM" ? styles.ampmButtonSelected : null,
            ]}
            onPress={() => toggleAMPM(startAMPM, setStartAMPM)}>
            <Text style={styles.ampmText}>{startAMPM}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.timeLabel}>Hour</Text>
        <Text style={styles.timeLabel}>Minute</Text>

        <Text style={[styles.label, { marginTop: 20 }]}>End time</Text>
        <View style={styles.timeInputRow}>
          <TextInput
            style={styles.timeInput}
            keyboardType="numeric"
            maxLength={2}
            placeholder="00"
            value={endHour}
            onChangeText={setEndHour}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.timeInput}
            keyboardType="numeric"
            maxLength={2}
            placeholder="00"
            value={endMinute}
            onChangeText={setEndMinute}
          />
          <TouchableOpacity
            style={[
              styles.ampmButton,
              endAMPM === "AM" ? styles.ampmButtonSelected : null,
            ]}
            onPress={() => toggleAMPM(endAMPM, setEndAMPM)}>
            <Text style={styles.ampmText}>{endAMPM}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.timeLabel}>Hour</Text>
        <Text style={styles.timeLabel}>Minute</Text>
      </View>

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
    marginBottom: 30,
    width: "80%",
    textAlign: "center",
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
  timeContainer: {
    width: "80%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: black,
    marginBottom: 5,
  },
  timeInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  timeInput: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: white,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    width: 50,
    backgroundColor: white,
    textAlign: "center",
    fontSize: 14,
  },
  colon: {
    fontSize: 18,
    marginHorizontal: 5,
  },
  ampmButton: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: white,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    width: 50,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center",
  },
  ampmButtonSelected: {
    backgroundColor: button,
  },
  ampmText: {
    fontSize: 14,
    color: black,
  },
  timeLabel: {
    fontSize: 12,
    color: black,
    marginLeft: 10,
    marginBottom: 10,
  },
  navigationButtonBack: {
    borderColor: lowkey,
    borderWidth: 2,
    padding: 10,
    borderRadius: 30,
    width: "45%",
    marginTop: 20,
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
    marginTop: 20,
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
