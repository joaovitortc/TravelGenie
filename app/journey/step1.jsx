import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View} from '@/components/Themed';
import { TextInput} from 'react-native';
import { router } from "expo-router";
import { useState, useEffect } from 'react';

export default function Journey1Step() {
  const [location, setLocation] = useState("")
  let data = {
    location: "",
  }

  function handleGoStep2() {
    data.location = location
    router.push({
      pathname: "/journey/step2",
      params: { data: JSON.stringify(data) }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 1 - Location</Text>
      <TextInput 
      onChangeText={setLocation} 
      value={location}
      placeholder="Type your location"/>
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
