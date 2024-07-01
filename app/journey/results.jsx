import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import callOpenAI from "../openai";

export default function Results() {
  const [response, setResponse] = useState(null);
  let { data } = useLocalSearchParams();
  data = data ? JSON.parse(data) : {};

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
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <ScrollView style={{ flex: 1 }}>
      {response ? (
        <View>
          <Text style={{ fontSize: 30 }}>{response.title}</Text>
          {response.plan.map((item, index) => (
            <View key={index}>
              <Text>Place: {item.place}</Text>
              <Text>Time: {item.time}</Text>
              <Text>What to do: {item.what_to_do}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
  
}

function createPrompt(data) {
  return `
Create a travel plan based on user information:
Instructions:
- Generate a travel itinerary (ONLY AN OBJECT) for ${data.location} within ${data.budget} budget, 
avoiding these type of activities ${data.dislikedActivities},
having in mind the user's preference for activities ${data.activities} and size of party ${data.party}.
For the duration of ${data.duration}

- For each day of the trip, suggest:
  - Place: Provide details about the recommended locations.
  - Time: Recommend the best time or duration to visit each place.
  - What to do: Suggest activities or attractions aligned with the user's interests (e.g., museums, shopping).

Please format the response as an object with the specified structure. Please don't include any additional information, only an object.
Include detailed information and variety in the suggested places to visit,
 ensuring a diverse and enjoyable travel experience for the user.

Response example:
{
    "title": "Travel Plan for Paris",
    "plan": [
        {
            "place": {Louvre Museum},
            "time": {10am-2pm},
            "what_to_do": {Visit one of the most famous museums in the world, housing thousands of works of art.}
        },
        {
            "place": {Eiffel Tower},
            "time": {3pm-5pm},
            "what_to_do": {Visit the iconic landmark and enjoy panoramic views of the city.}
        }
        // Add more entries as needed for the duration of the trip
    ]
}

`;
}
