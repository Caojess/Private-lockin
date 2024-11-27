import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Picker, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit'; // For the bar charts
import { Dimensions } from 'react-native';

export default function ProfileScreen() {
  const screenWidth = Dimensions.get('window').width;

  // Sample data for the charts
  const generalAnalyticsData = [2, 3, 2.5, 3.5, 4, 3, 2];
  const timeSpentData = [1.5, 2, 1.8, 2.2, 2.5, 1.5, 1];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://placekitten.com/200/200' }} // Placeholder for profile image
          style={styles.profileImage}
        />
        <Text style={styles.title}>Your Analytics</Text>
        <TouchableOpacity style={styles.helpIcon}>
          <Ionicons name="help-circle-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Dropdown */}
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue="This week"
          style={styles.picker}
          onValueChange={(itemValue) => console.log(itemValue)}
        >
          <Picker.Item label="This week" value="This week" />
          <Picker.Item label="Last week" value="Last week" />
          <Picker.Item label="This month" value="This month" />
        </Picker>
      </View>

      {/* General Analytics Section */}
      <Text style={styles.sectionTitle}>General Analytics</Text>
      <BarChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data: generalAnalyticsData }],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="h"
        chartConfig={chartConfig}
        style={styles.chart}
      />

      {/* Time Spent Section */}
      <Text style={styles.sectionTitle}>You spend the most time on...</Text>
      <View style={styles.timeSpentContainer}>
        <Ionicons name="logo-youtube" size={32} color="#FF0000" />
        <BarChart
          data={{
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            datasets: [{ data: timeSpentData }],
          }}
          width={screenWidth - 90}
          height={220}
          yAxisSuffix="h"
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
}

// Chart Configuration
const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(255, 87, 51, ${opacity})`, // Matching the accent color
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  fillShadowGradient: '#DD3A3A',
  fillShadowGradientOpacity: 1,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce4e4',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DD3A3A',
  },
  helpIcon: {
    padding: 10,
  },
  dropdownContainer: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  picker: {
    height: 50,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  chart: {
    borderRadius: 10,
    marginVertical: 10,
  },
  timeSpentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

