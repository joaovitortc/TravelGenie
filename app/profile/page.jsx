import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  ActionSheetProvider,
  connectActionSheet,
} from "@expo/react-native-action-sheet";
import { db, auth, storage} from "../firebase"; // Import your Firebase configuration
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { router } from "expo-router";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Profile = ({ showActionSheetWithOptions }) => {
  if (!auth.currentUser) {
    router.push("/profile");
  }

  const [name, setName] = useState(
    auth.currentUser
      ? auth.currentUser.displayName ||
          auth.currentUser.email.split("@")[0].charAt(0).toUpperCase() + auth.currentUser.email.split("@")[0].slice(1)
      : ""
  );
  const [email, setEmail] = useState(auth.currentUser?.email || "");
  const [location, setLocation] = useState(
    auth.currentUser?.displayLocation || "Louve-la-Neuve, Belgium"
  );
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data:", userData);    
        setImage(userData.photoURL || null);
        setLocation(userData.location || "Louve-la-Neuve, Belgium");
      }
    };

    fetchProfileData();
  }, []);

  const handleSave = async () => {
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);

    let imageUrl = image;
    if (image && image.startsWith('file:')) {
      const imageRef = ref(storage, `profileImages/${userId}/${Date.now()}`);
      try {
        const response = await fetch(image);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);
      } catch (error) {
        console.error("Error uploading image:", error);
        return; // Stop the function if image upload fails
      }
    }

    try {
      console.log("Location is:", location);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: imageUrl, // The URL of the uploaded image
      });
      await updateDoc(userRef, {
        displayName: name,
        photoURL: imageUrl,
        location: location,
      });
      console.log("Firebase Auth profile successfully updated!");
    } catch (error) {
      console.error("Error updating Firebase Auth profile:", error);
    }
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
          permissionResult = await ImagePicker.requestCameraPermissionsAsync();
          if (permissionResult.granted === false) {
            alert("Permission to access camera is required!");
            return;
          }

          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
            allowsEditing: true,
            quality: 1,
          });
          if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri);
            console.log("Image URI:", uri);
          }
        } else if (buttonIndex === 1) {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
            allowsEditing: true,
            quality: 1,
          });
          if (!result.canceled) {
            setImage(result.uri);
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
        {image ? (
          <Image source={{ uri: image }} style={styles.profilePic} />
        ) : (
          <View style={styles.profilePicPlaceholder}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
        )}
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
        placeholder="Add your email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#A9A9A9"
      />
      <Text style={styles.label}>Your Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Add your location"
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
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profilePicPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1D80C3",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 50,
    color: "#FFFFFF",
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
