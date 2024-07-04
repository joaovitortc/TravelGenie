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
import * as Location from "expo-location";
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
  const [selectedBudget, setSelectedBudget] = useState(null);
  const currentStep = 3;
  const totalSteps = 6;
  let data = {
    location: "",
    budget: "",
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission to access location was denied",
          "We need location permission to use your current location."
        );
      }
    })();
  }, []);

  const handleUseCurrentLocation = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission to access location was denied",
        "We need location permission to use your current location."
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (address.length > 0) {
      setLocation(
        `${address[0].city}, ${address[0].region}, ${address[0].country}`
      );
    }
  };

  function handleGoNextStep() {
    data.location = location;
    data.budget = selectedBudget;
    router.push({
      pathname: "/journey/step4",
      params: { data: JSON.stringify(data) },
    });
  }

  function handleGobackAStep() {
    router.back("/");
  }

  const budgetOptions = [
    "Free",
    "0-10",
    "10-50",
    "50-100",
    "100-200",
    "200-500",
    "500-1000",
    "1000-2000",
    "2000+",
  ];

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <View style={styles.titlecontainer}>
        <View style={styles.circle}>
          <Text style={styles.number}>3</Text>
        </View>
        <Text style={styles.title}>Budget</Text>
      </View>
      <Text style={styles.paragraph}>
        How much are you willing to spend on this trip?
      </Text>

      <View style={styles.moneyContainer}>
        {budgetOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.moneyButton,
              selectedBudget === option && { backgroundColor: button },
            ]}
            onPress={() => setSelectedBudget(option)}>
            <Text
              style={[
                styles.moneyText,
                selectedBudget === option && { color: black },
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.orStyle}>or</Text>
      <TextInput
        onChangeText={setLocation}
        value={location}
        placeholder="Type the amount.."
        style={styles.input}
      />
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
    marginBottom: 15,
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
  moneyButton: {
    backgroundColor: white,
    padding: 10,
    borderRadius: 18,
    marginBottom: 20,
    width: "30%",
  },
  moneyText: {
    color: black,
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },
  moneyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "80%",
  },
  orStyle: {
    color: black,
    marginBottom: 20,
    fontWeight: "bold",
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
