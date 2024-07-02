import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { db, auth } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import Plan from '@/components/Plan';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error('No authenticated user found');
        }
        console.log("Current user:", user.uid)
        
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          throw new Error('User document not found');
        }

        const userData = userDoc.data();
        if (!userData.plans || !Array.isArray(userData.plans)) {
          throw new Error('Plans data is missing or not an array');
        }

        console.log("User's plans:", userData.plans);
        setPlans(userData.plans);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plans:', error);
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading plans...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>User's Plans:</Text>
      <FlatList
  data={plans}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <Plan title={item.title} plan={item.plan}/>
  )}
/>
    </View>
  );
};

export default Plans;
