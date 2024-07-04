import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import callOpenAI from "../openai";
import { router, useLocalSearchParams, Stack } from "expo-router";
import Loading from "@/components/Loading";

export default function Results() {
  const [response, setResponse] = useState(null);
  const [regenerate, setRegenerate] = useState("");
  let { data } = useLocalSearchParams();
  data = data ? JSON.parse(data) : {};
  console.log(data);
  // const response = {
  //   title: "Travel Plan for Paris",
  //   plan: [
  //     {
  //       place: "Louvre Museum",
  //       time: "10am-2pm",
  //       what_to_do: "Visit one of the most famous museums in the world, housing thousands of works of art.",
  //     },
  //     {
  //       place: "Eiffel Tower",
  //       time: "3pm-5pm",
  //       what_to_do: "Visit the iconic landmark and enjoy panoramic views of the city.",
  //     },
  //   ],
  // }

  useEffect(() => {
    const generatedPrompt = createPrompt(data);

    console.log("Generated Prompt is: ", generatedPrompt);

    const handleRequest = async () => {
      if (!generatedPrompt) return;

      let result = await callOpenAI(generatedPrompt);

      if (result) {
        console.log("Result is: ", result);
        try {
          const parsedResult = JSON.parse(result); // Ensure the result is parsed
          setResponse(parsedResult); // Set the response from OpenAI
        } catch (error) {
          console.error("Error parsing result:", error);
        }
      }
    };

    handleRequest();
  }, [regenerate]); // Empty dependency array ensures this effect runs once on mount

  return (
    <>
      {response ? (
        <ScrollView style={{ flex: 1 }}>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
          />
          <View style={styles.container}>
            {/* <View>
            {response.plan.map((item, index) => (
              <View key={index}>
                <Text>Place: {item.place}</Text>
                <Text>Time: {item.time}</Text>
                <Text>What to do: {item.what_to_do}</Text>
              </View>
            ))}
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/profile",
                  params: { data: JSON.stringify(response) },
                })
              }
            >
              <Text style={{ color: "white" }}>Save</Text>
            </TouchableOpacity>
          </View> */}

            <Text style={styles.title}>All Done!</Text>
            <Text style={styles.subtitle}>{response.title}</Text>

            <View style={styles.timeline}>
              {response.plan.map((item, index) => (
                <View key={index} style={styles.timelineItem}>
                  <Text style={styles.time}>{item.time}</Text>
                  <View style={styles.timelineContent}>
                    {index !== response.plan.length - 1 && (
                      <View style={styles.line} />
                    )}
                    <View style={styles.circle} />
                    <Text style={styles.activityPlace}>{item.place}</Text>
                    <Text style={styles.activityPlace}>{item.price}</Text>
                    <Text style={styles.activityPlace}>{item.address}</Text>
                    {/* <Ionicons name="chevron-down" size={24} color="black" /> */}
                  </View>
                </View>
              ))}
            </View>

            {response.tip ? (
              <View style={styles.tipContainer}>
                <Text style={styles.tipTitle}>Tip!</Text>
                <Text style={styles.tipText}>{response.tip}</Text>
              </View>
            ) : null}

            <Text style={styles.regenerateText}>
              To get a new plan for your trip, click on{" "}
              <Text style={styles.highlight}>Regenerate</Text> button
            </Text>

            <TouchableOpacity
              style={styles.regenerateButton}
              onPress={() => {
                setRegenerate(regenerate + "1");
              }}
            >
              <Text style={styles.buttonText}>Regenerate</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push("/(tabs)")}
              >
                <Text style={styles.editButtonText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() =>
                  router.push({
                    pathname: "/profile",
                    params: { data: JSON.stringify(response) },
                  })
                }
              >
                <Text style={styles.saveButtonText}>Save plan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (<>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
          />
          <Loading title="Loading plan" />
            </>
      )}
    </>
  );
}

function createPrompt(data) {
  return `
Create a travel plan based on user information:
Instructions:
- Generate a travel itinerary for ${data.location} within $${data.budget} budget, 
avoiding these type of activities: (${data.dislikedActivities}),
having in mind the user's preference for activities: (${data.activities}) and size of party ${data.amount}, 
take into consideration that there will be people from the ${data.age} range.
The duration of the trip will be ${data.startHour}:${data.startMinute}${data.startAMPM} - ${data.endHour}:${data.endMinute}${data.endAMPM}. 
Don't use broken times. I want only fixed o'clock start and ends activities within the range.

- For each day of the trip, suggest:
  - Place: Provide details about the recommended locations.
  - Time: Recommend the best time or duration to visit each place.
  - What to do: Suggest activities or attractions aligned with the user's interests.
  - Price: Estimated price, try to match user's overall budget
  - Adress: Specific address of attraction

Please format the response as an object with the specified structure. 
Please don't include any additional information, only an object. No backticks.
For the time, don't give me half an hour starts-ends. It should be fixed times like 1pm-2pm.

Response example: 
{
    "title": "Travel Plan for Paris",
    "plan": [
        {
            "place": {Louvre Museum},
            "time": {10am-2pm},
            "what_to_do": {Visit one of the most famous museums in the world, housing thousands of works of art.},
            "price": {20 euros},
            "address":  75001 Paris, France
        },
        {
            "place": {Eiffel Tower},
            "time": {3pm-5pm},
            "what_to_do": {Visit the iconic landmark and enjoy panoramic views of the city.},
            "price": Free,
            "address":   Av. Gustave Eiffel, 75007 Paris, France
        }
        // Add more entries as needed for the duration of the trip
      "tip": "Remember to bring snacks to keep up with your budget!"
    ]
}

`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#28A745",
  },
  subtitle: {
    fontSize: 16,
    color: "#007BFF",
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  timeline: {
    marginBottom: 10,
    marginTop: 10,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 10,
  },
  time: {
    width: 75,
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
  },
  timelineContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  line: {
    position: "absolute",
    top: 40,
    left: 8,
    height: "100%",
    width: 2,
    backgroundColor: "#007BFF",
  },

  circle: {
    width: 15,
    height: 15,
    borderRadius: 20,

    marginRight: 10,
    borderColor: "#1D80C3",
    borderWidth: 2,
  },
  activityPlace: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  tipContainer: {
    backgroundColor: "#E9F1FB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 0,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tipText: {
    fontSize: 14,
    color: "#555",
  },
  regenerateText: {
    textAlign: "left",
    marginTop: 20,
    fontSize: 14,
  },
  regenerateButton: {
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
    borderColor: "#F3A61E",
    borderWidth: 2,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 80,
  },
  editButton: {
    flex: 1,
    borderColor: "#000",
    borderWidth: 1,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginRight: 10,
  },
  editButtonText: {
    color: "#000",
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
  },

  highlight: {
    color: "#000",
    fontWeight: "bold",
  },
});
