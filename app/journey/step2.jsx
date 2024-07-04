import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Keyboard,
} from "react-native";
import { router, useLocalSearchParams, Stack } from "expo-router";
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
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [startAMPM, setStartAMPM] = useState("AM");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [endAMPM, setEndAMPM] = useState("AM");

  const currentStep = 2;
  const totalSteps = 6;
  
  let { data } = useLocalSearchParams();
  data = data ? JSON.parse(data) : {};

  function handleGoNextStep() {
    data.startHour = startHour;
    data.startMinute = startMinute;
    data.startAMPM = startAMPM;
    data.endHour = endHour;
    data.endMinute = endMinute;
    data.endAMPM = endAMPM;
    console.log("Data from step2: ", data)
    router.push({
      pathname: "/journey/step3",
      params: { data: JSON.stringify(data) },
    });
  }

  function handleGobackAStep() {
    router.back("/");
  }

  function handleToggleAMPM(type, value) {
    if (type === "start") {
      setStartAMPM(value);
    } else {
      setEndAMPM(value);
    }
  }

  function handleInputBlur() {
    Keyboard.dismiss();
  }

  function validateHour(value, setHour) {
    const hour = parseInt(value, 10);
    if (!isNaN(hour)) {
      if (hour > 12) {
        setHour("12");
      } else if (hour < 0) {
        setHour("00");
      } else {
        setHour(value);
      }
    } else {
      setHour("");
    }
  }

  function validateMinute(value, setMinute) {
    const minute = parseInt(value, 10);
    if (!isNaN(minute)) {
      if (minute > 59) {
        setMinute("59");
      } else if (minute < 0) {
        setMinute("00");
      } else {
        setMinute(value);
      }
    } else {
      setMinute("");
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
      options={{
        headerShown: false,
      }}
      />
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <View style={styles.titlecontainer}>
        <View style={styles.circle}>
          <Text style={styles.number}>2</Text>
        </View>
        <Text style={styles.title}>Trip Duration</Text>
      </View>
      <Text style={styles.paragraph}>
        Choose what time you would like to start and end your trip
      </Text>

      <View style={styles.timeContainer}>
        <Text style={styles.label}>Starting time</Text>
        <View style={styles.timeInputRow}>
          <TextInput
            style={styles.timeInput}
            keyboardType="numeric"
            maxLength={2}
            placeholder="00"
            value={startHour}
            onChangeText={(text) => validateHour(text, setStartHour)}
            onBlur={handleInputBlur}
            returnKeyType="done"
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.timeInput}
            keyboardType="numeric"
            maxLength={2}
            placeholder="00"
            value={startMinute}
            onChangeText={(text) => validateMinute(text, setStartMinute)}
            onBlur={handleInputBlur}
            returnKeyType="done"
          />
          <View style={styles.ampmContainer}>
            <TouchableOpacity
              style={[
                styles.amButton,
                startAMPM === "AM" ? styles.ampmButtonSelected : null,
              ]}
              onPress={() => handleToggleAMPM("start", "AM")}>
              <Text style={styles.ampmText}>AM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.pmButton,
                startAMPM === "PM" ? styles.ampmButtonSelected : null,
              ]}
              onPress={() => handleToggleAMPM("start", "PM")}>
              <Text style={styles.ampmText}>PM</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.timeLabels}>
          <Text style={styles.timeLabelTextH}>Hour</Text>
          <Text style={styles.timeLabelTextM}>Minute</Text>
        </View>

        <Text style={[styles.label, { marginTop: 20 }]}>End time</Text>
        <View style={styles.timeInputRow}>
          <TextInput
            style={styles.timeInput}
            keyboardType="numeric"
            maxLength={2}
            placeholder="00"
            value={endHour}
            onChangeText={(text) => validateHour(text, setEndHour)}
            onBlur={handleInputBlur}
            returnKeyType="done"
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.timeInput}
            keyboardType="numeric"
            maxLength={2}
            placeholder="00"
            value={endMinute}
            onChangeText={(text) => validateMinute(text, setEndMinute)}
            onBlur={handleInputBlur}
            returnKeyType="done"
          />
          <View style={styles.ampmContainer}>
            <TouchableOpacity
              style={[
                styles.amButton,
                endAMPM === "AM" ? styles.ampmButtonSelected : null,
              ]}
              onPress={() => handleToggleAMPM("end", "AM")}>
              <Text style={styles.ampmText}>AM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.pmButton,
                endAMPM === "PM" ? styles.ampmButtonSelected : null,
              ]}
              onPress={() => handleToggleAMPM("end", "PM")}>
              <Text style={styles.ampmText}>PM</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.timeLabels}>
          <Text style={styles.timeLabelTextH}>Hour</Text>
          <Text style={styles.timeLabelTextM}>Minute</Text>
        </View>
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
    marginBottom: 25,
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
    marginBottom: 40,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: primary,
  },
  timeContainer: {
    width: "80%",
    marginBottom: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: black,
    marginBottom: 5,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    paddingLeft: 15,
    fontWeight: "bold",
  },
  timeInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  timeInput: {
    height: 70,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: white,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    width: 80,
    backgroundColor: white,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  colon: {
    fontSize: 24,
    color: black,
    fontWeight: "bold",
    paddingLeft: 5,
    paddingRight: 5,
  },
  ampmContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  amButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 5,
    backgroundColor: white,
    borderColor: white,
    borderWidth: 1,
  },
  pmButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginHorizontal: 5,
    backgroundColor: white,
    borderColor: white,
    borderWidth: 1,
  },
  ampmButtonSelected: {
    backgroundColor: button,
    borderColor: button,
  },
  ampmText: {
    color: black,
    fontSize: 12,
    fontWeight: "bold",
  },
  timeLabels: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
  timeLabelTextH: {
    fontSize: 12,
    color: black,
    marginLeft: 10,
    marginBottom: 10,
  },
  timeLabelTextM: {
    fontSize: 12,
    paddingLeft: 62,
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
