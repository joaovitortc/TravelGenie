import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, View } from "@/components/Themed";
import { router } from "expo-router";
import { black, button, primary, white } from "@/constants/ThemeVariables";

export default function TabOneScreen() {
  function handleStartJourney() {
    console.log("Handle start journey");
    router.push("/journey/step1");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Your perfect trip is only <Text style={styles.link}>one click</Text>{" "}
        away. Let TravelGenie plan it for you!
      </Text>

      <Image
        source={require("../../assets/images/travel_genie_logo.png")}
        style={styles.image}
      />
      <TouchableOpacity style={styles.button} onPress={handleStartJourney}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => router.push("/profile/page")}
          >
            <Text style={styles.footerButtonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => router.push("/plans")}
          >
            <Text style={styles.footerButtonText}>My Plans</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.loginLinkText}>Create an account or log in</Text>
        </TouchableOpacity>
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
    marginTop: 30, // Added this line to move the text higher
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
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 30,
    position: "absolute",
    top: 130,
  },
  buttonText: {
    color: "#000",
    fontSize: 25,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerButtons: {
    flexDirection: "row",
    marginBottom: 20,
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
  loginLink: {
    marginTop: 10,
  },
  loginLinkText: {
    fontSize: 14,
    color: primary,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
