import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Plan = ({ title, plan }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpanded = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Collapse if already expanded
    } else {
      setExpandedIndex(index); // Expand the clicked plan
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {plan.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => toggleExpanded(index)}>
          <View style={[styles.card, expandedIndex === index && styles.expandedCard]}>
            <View style={styles.cardContent}>
              <Text style={styles.place}>{item.place}</Text>
              <Text style={styles.time}>{item.time}</Text>
              {expandedIndex === index && (
                <Text style={styles.description}>{item.what_to_do}</Text>
              )}
            </View>
            <View style={styles.arrowContainer}>
              <Text style={styles.arrow}>{expandedIndex === index ? '▲' : '▼'}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  expandedCard: {
    backgroundColor: '#e0e0e0',
  },
  cardContent: {
    flex: 1,
  },
  place: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  description: {
    marginTop: 10,
  },
  arrowContainer: {
    width: 30,
    alignItems: 'center',
  },
  arrow: {
    fontSize: 20,
  },
});

export default Plan;
