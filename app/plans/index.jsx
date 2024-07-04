import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import PlanCard from "@/components/PlanCard";
import { router, Stack} from "expo-router";
import Loading from "@/components/Loading";
import {
  black,
  button,
  primary,
  white,
  secondary,
  lowkey,
} from "@/constants/ThemeVariables";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("No authenticated user found");
        }
        console.log("Current user:", user.uid);

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          throw new Error("User document not found");
        }

        const userData = userDoc.data();
        if (!userData.plans || !Array.isArray(userData.plans)) {
          throw new Error("Plans data is missing or not an array");
        }

        const cleanedPlans = Array.isArray(userData.plans)
          ? userData.plans.filter((plan) => Object.keys(plan).length !== 0)
          : [];
        console.log("User's plans:", cleanedPlans);

        if (cleanedPlans.length === 0) {
          setEmpty(true);
          setLoading(false);
          return;
        } else {
          setPlans(cleanedPlans);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching plans:", error);
        setLoading(false);
        setEmpty(true);
      }
    };

    fetchPlans();
  }, []);

  const handleDelete = async (index) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No authenticated user found");
      }

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        throw new Error("User document not found");
      }

      const updatedPlans = [...plans];
      updatedPlans.splice(index, 1);
      await updateDoc(userRef, { plans: updatedPlans });

      setPlans(updatedPlans);
      if (updatedPlans.length === 0) {
        setEmpty(true);
      }
    } catch (error) {
      console.log("Error deleting plan:", error);
    }
  };

  if (loading) {
    return (
      <>
        <Stack.Screen
      options={{
        headerShown: false,
      }}
      />
        <Loading title={"Loading"} />
      </>
    );
  }

  if (empty) {
    return (
      <View>
        <Stack.Screen
      options={{
        headerShown: false,
      }}
      />
        <Text style={styles.title}>My plans</Text>
        <Text>No plans saved yet</Text>
        <View style={styles.footer}>
          <View style={styles.footerButtons}>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => router.push("/")}>
              <Text style={styles.footerButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => router.push("/profile/page")}>
              <Text style={styles.footerButtonText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
      options={{
        headerShown: false,
      }}
      />
      <Text style={styles.title}>My plans</Text>
      <View>
        {plans ? (
          <FlatList
            data={plans}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <PlanCard
                title={item.title}
                plan={item.plan}
                index={index}
                onDelete={() => handleDelete(index)}
              />
            )}
          />
        ) : (
          <Text>No plans saved yet</Text>
        )}

        <View style={styles.footer}>
          <View style={styles.footerButtons}>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => router.back("/")}>
              <Text style={styles.footerButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => router.push("/profile/page")}>
              <Text style={styles.footerButtonText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: secondary,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: black,
    paddingTop: 20,
    paddingBottom: 20,
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
