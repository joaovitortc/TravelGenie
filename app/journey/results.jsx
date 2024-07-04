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
import {
  primary,
  secondary,
  positive,
  white,
  lowkey,
  button,
  black,
} from "../../constants/ThemeVariables";
import { Ionicons } from "@expo/vector-icons";

export default function Results() {
  const [response, setResponse] = useState(null);
  const [regenerate, setRegenerate] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [regenerating, setRegenerating] = useState(false); // [1
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
          setRegenerating(false); // Set regenerating to false
        } catch (error) {
          console.error("Error parsing result:", error);
        }
      }
    };

    handleRequest();
  }, [regenerate]); // Empty dependency array ensures this effect runs once on mount

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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


            {response.plan.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleExpanded(index)}>
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
                          <Text style={styles.lowkeyStyling}>
                            {item.address}
                          </Text>
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
                        <Text style={styles.description}>
                          {item.what_to_do}
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}


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
                setRegenerating(true);
              }}>

              <Text style={styles.buttonText}>{regenerating ? "Regenerating..." : "Regenerate"}</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => router.push("/(tabs)")}
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

                }>

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
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: primary,
    marginBottom: 5,
    fontWeight: "bold",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    paddingBottom: 10,
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
  tipContainer: {
    backgroundColor: secondary,
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
    color: lowkey,
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
    borderColor: button,
    borderWidth: 2,
    width: "100%",
  },
  buttonText: {
    color: black,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 80,
  },
  editButton: {
    flex: 1,
    borderColor: black,
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
    backgroundColor: positive,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  saveButtonText: {
    color: white,
    fontSize: 16,
  },

  highlight: {
    color: black,
    fontWeight: "bold",
  },
});
