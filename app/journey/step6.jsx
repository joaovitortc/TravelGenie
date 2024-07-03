import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
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
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedAges, setSelectedAges] = useState([]);
  const currentStep = 6;
  const totalSteps = 6;
  let data = {
    location: "",
    budget: "",
  };

  function handleGoNextStep() {
    data.amount = selectedAmount;
    data.age = selectedAges;
    router.push({
      pathname: "/journey/results",
      params: { data: JSON.stringify(data) },
    });
  }

  function handleGobackAStep() {
    router.back("/");
  }

  const amountOptions = ["1", "2", "3", "4", "5", "6", "7-10", "10+"];
  const ageOptions = ["0-10", "11-15", "16-20", "21-30", "31-50", "51-80"];

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <View style={styles.titlecontainer}>
        <View style={styles.circle}>
          <Text style={styles.number}>6</Text>
        </View>
        <Text style={styles.title}>About your party</Text>
      </View>
      <Text style={styles.paragraph}>How many are you?</Text>

      <View style={styles.amountContainer}>
        {amountOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.amountButton,
              selectedAmount === option && { backgroundColor: button },
            ]}
            onPress={() => setSelectedAmount(option)}>
            <Text
              style={[
                styles.amountText,
                selectedAmount === option && { color: black },
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.paragraph2}>
        <Text style={styles.paragraph}>
          What is the age range? You can select multiple
        </Text>
      </View>

      <View style={styles.ageContainer}>
        {ageOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.ageButton,
              selectedAges.includes(option) && { backgroundColor: button },
            ]}
            onPress={() => {
              if (selectedAges.includes(option)) {
                setSelectedAges(selectedAges.filter((age) => age !== option));
              } else {
                setSelectedAges([...selectedAges, option]);
              }
            }}>
            <Text
              style={[
                styles.ageText,
                selectedAges.includes(option) && { color: black },
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
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
          <Text style={styles.navigationButtonTextNext}>Done!</Text>
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
    marginBottom: 10,
    width: "80%",
  },
  paragraph2: {
    paddingTop: 20,
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
  amountButton: {
    backgroundColor: white,
    padding: 10,
    borderRadius: 18,
    marginBottom: 20,
    marginHorizontal: 2,
    width: "20%",
  },
  amountText: {
    color: black,
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "80%",
  },
  ageButton: {
    backgroundColor: white,
    padding: 10,
    borderRadius: 18,
    marginBottom: 20,
    marginHorizontal: 2,
    width: "30%",
  },
  ageText: {
    color: black,
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },
  ageContainer: {
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
    marginTop: 40,
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
    marginTop: 40,
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
