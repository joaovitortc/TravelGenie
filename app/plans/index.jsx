import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import PlanCard from '@/components/PlanCard';
import { router } from 'expo-router';
import Loading from '@/components/Loading';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);

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
        
        const cleanedPlans = Array.isArray(userData.plans) ? userData.plans.filter(plan => Object.keys(plan).length !== 0) : [];
        console.log("User's plans:", cleanedPlans);
       
        if(cleanedPlans.length === 0) {
          setEmpty(true);
          setLoading(false);
          return;
        } else {
          setPlans(cleanedPlans);
          setLoading(false);
        }

      } catch (error) {
        console.log('Error fetching plans:', error);
        setLoading(false);
        setEmpty(true);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <View>
        <Loading title={"Loading"}/>
      </View>
    );
  }

  if(empty) {
    return(
    <View>
    <Text>No plans saved yet</Text>
    <TouchableOpacity onPress={() => router.back()}>
        <Text>Go back to home page</Text>
    </TouchableOpacity>
    </View>
    )
  }

  return (
    <View>
      {plans ? <FlatList
  data={plans}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item,index }) => (
    <PlanCard title={item.title} plan={item.plan} index={index}/>
  )}/> : <Text>No plans saved yet</Text>}
    

    </View>
  );
};
