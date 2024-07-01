import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View} from '@/components/Themed';
import { TextInput} from 'react-native';
import { router } from "expo-router";
import { useState, useEffect } from 'react';

export default function Journey1Step() {
  const [preferences, setPreferences] = useState("")
  let data = {
    preferences: "",
  }

  function handleGoStep2() {
    data.preferences = preferences
    router.push({
      pathname: "/journey/step2",
      params: { data: JSON.stringify(data) }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 1 - Preferences</Text>
      <TextInput 
      onChangeText={setPreferences} 
      value={preferences}
      placeholder="Type your preferences"/>
      <TouchableOpacity onPress={handleGoStep2}>
        <Text>Go to step 2</Text>
      </TouchableOpacity>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
