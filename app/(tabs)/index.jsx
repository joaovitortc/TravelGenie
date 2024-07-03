import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, View } from "@/components/Themed";
import { router } from "expo-router";
import { black, button, primary, white } from "@/constants/ThemeVariables";

export default function TabOneScreen() {
  function handleStartJourney() {
    router.push("/journey/step1");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Your perfect trip is only <Text style={styles.link}>one click</Text>{" "}
        away. Let TravelGenie plan it for you!
      </Text>

      {
        <Image
          source={require("../../assets/images/genie_logo.png")}
          style={styles.image}
        />
      }
      <TouchableOpacity style={styles.button} onPress={handleStartJourney}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() =>  router.push("/profile/page")}>
            <Text style={styles.footerButtonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() =>  router.push("/plans")}>
            <Text style={styles.footerButtonText}>My Plans</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: white,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  link: {
    color: primary,
  },
  image: {
    width: 400,
    height: 400,
    marginRight: 170,
  },
  button: {
    backgroundColor: button,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    position: "absolute",
    top: 180,
    borderRadius: 30,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    marginBottom: 10,
  },
  footerButtons: {
    flexDirection: "row",
  },
  footerButton: {
    borderColor: button,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  footerButtonText: {
    color: black,
    fontSize: 16,
    fontWeight: "bold",
  },
});
