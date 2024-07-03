import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  ActionSheetProvider,
  connectActionSheet,
} from "@expo/react-native-action-sheet";

const Profile = ({ showActionSheetWithOptions }) => {
  const defaultAvatarUri =
    "data:image/png;base64,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"; // Remplacer par l'URI de l'avatar par défaut
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(defaultAvatarUri);

  const handleSave = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Location:", location);
    console.log("Profile Image URI:", image);
  };

  const chooseImage = async () => {
    const options = ["Take Photo", "Choose from Library", "Cancel"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            setImage(uri);
            console.log("Image captured URI:", uri);
          }
        } else if (buttonIndex === 1) {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            setImage(uri);
            console.log("Image selected URI:", uri);
          }
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={chooseImage}
        style={styles.profilePicContainer}
      >
        <Image source={{ uri: image }} style={styles.profilePic} />
      </TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Add your name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#A9A9A9"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Add your email address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#A9A9A9"
      />
      <Text style={styles.label}>Your Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Add your Location?"
        value={location}
        onChangeText={setLocation}
        placeholderTextColor="#A9A9A9"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F4FA",
    padding: 20,
  },
  profilePicContainer: {
    marginBottom: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "10%",
    marginBottom: 5,
    fontWeight: "bold",
    color: "#1D80C3",
  },
  input: {
    height: 40,
    borderColor: "#A9A9A9",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "80%",
    backgroundColor: "#FFFFFF",
  },
  saveButton: {
    backgroundColor: "#F3A61E",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

const ConnectedProfile = connectActionSheet(Profile);

const App = () => (
  <ActionSheetProvider>
    <ConnectedProfile />
  </ActionSheetProvider>
);

export default App;
