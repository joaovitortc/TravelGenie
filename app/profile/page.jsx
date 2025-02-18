import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  ActionSheetProvider,
  connectActionSheet,
} from "@expo/react-native-action-sheet";
import { db, auth, storage } from "../firebase"; // Import your Firebase configuration
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { router, Stack } from "expo-router";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  primary,
  secondary,
  white,
  lowkey,
  button,
  black,
} from "../../constants/ThemeVariables";
import { signOut } from "firebase/auth";

const Profile = ({ showActionSheetWithOptions }) => {
  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/profile");
    }
  }, [auth]);

  const [name, setName] = useState(
    auth.currentUser
      ? auth.currentUser.displayName ||
          auth.currentUser.email.split("@")[0].charAt(0).toUpperCase() +
            auth.currentUser.email.split("@")[0].slice(1)
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
    if (image && image.startsWith("file:")) {
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
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity
        onPress={chooseImage}
        style={styles.profilePicContainer}>
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
        placeholderTextColor="lowkey"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Add your email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="lowkey"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          try {
            await signOut(auth);
            router.push("/"); // Redirect to the login screen after logout
          } catch (error) {
            console.error("Error signing out: ", error);
          }
        }}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => router.push("/")}>
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => router.push("/plans")}>
          <Text style={styles.footerButtonText}>My Plans</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: secondary,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
    backgroundColor: primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 50,
    color: white,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "10%",
    marginBottom: 5,
    fontWeight: "bold",
    color: black,
  },
  input: {
    height: 40,
    borderColor: white,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "80%",
    backgroundColor: white,
  },
  saveButton: {
    backgroundColor: button,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
    width: "80%",
  },
  saveButtonText: {
    color: black,
    fontWeight: "bold",
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: secondary,
    borderColor: lowkey,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
    width: "80%",
  },
  logoutButtonText: {
    color: lowkey,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  footerButton: {
    borderColor: button,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  footerButtonText: {
    color: black,
    fontSize: 16,
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
