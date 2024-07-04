import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import NoPlansScreen from "@/components/NoPlansScreen";
import {
  black,
  button,
  primary,
  white,
  secondary,
  lowkey,
} from "@/constants/ThemeVariables";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Plan() {
  const { plan: planStr, title } = useLocalSearchParams();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [plan, setPlan] = useState(() => {
    try {
      return JSON.parse(planStr);
    } catch (error) {
      console.error("Error parsing plan: ", error);
      return [];
    }
  });

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleDelete = (index) => {
    const updatedPlan = plan.filter((_, i) => i !== index);
    setPlan(updatedPlan);
  };

  console.log("Plan from plancontainer: ", plan);
  console.log("Title from plancontainer: ", title);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {plan && plan.length > 0 ? (
        plan.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => toggleExpanded(index)}>
            <View
              style={[
                styles.card,
                expandedIndex === index && styles.expandedCard,
              ]}>
              <View
                style={[
                  styles.cardContent,
                  expandedIndex === index
                    ? styles.expandedCardContent
                    : styles.collapsedCardContent,
                ]}>
                <View style={styles.titleAndIcon}>
                  <Text style={styles.place}>{item.place}</Text>
                  <View style={styles.actionsContainer}>
                    <Ionicons
                      name={
                        expandedIndex === index
                          ? "close-outline"
                          : "chevron-down-outline"
                      }
                      size={24}
                      color={black}
                    />
                  </View>
                </View>
                <View style={styles.flexIconsAndText}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color={lowkey}
                    paddingTop={5}
                  />
                  <Text style={styles.lowkeyStyling}>{item.time}</Text>
                </View>
                {expandedIndex === index && (
                  <>
                    <View style={styles.flexIconsAndText}>
                      <Ionicons
                        name="navigate-outline"
                        size={20}
                        color={lowkey}
                        paddingTop={5}
                      />
                      <Text style={styles.lowkeyStyling}>{item.address}</Text>
                    </View>
                    <View style={styles.flexIconsAndText}>
                      <Ionicons
                        name="cash-outline"
                        size={20}
                        color={lowkey}
                        paddingTop={5}
                      />
                      <Text style={styles.lowkeyStyling}>{item.price}</Text>
                    </View>
                    <Text style={styles.description}>{item.what_to_do}</Text>
                  </>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <NoPlansScreen />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: white,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: black,
    paddingTop: 20,
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: white,
  },
  expandedCard: {
    backgroundColor: secondary,
  },
  cardContent: {
    flex: 1,
    borderRadius: 10,
  },
  flexIconsAndText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  titleAndIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  place: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lowkeyStyling: {
    fontSize: 14,
    color: lowkey,
    marginTop: 5,
    paddingLeft: 5,
  },
  description: {
    marginTop: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    fontSize: 20,
  },
  noPlansText: {
    fontSize: 16,
    color: lowkey,
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
    marginBottom: 20,
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
