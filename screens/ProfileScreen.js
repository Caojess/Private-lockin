import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function ProfileScreen() {
  const screenWidth = Dimensions.get('window').width;

  const generalAnalyticsData = [2, 3, 2.5, 3.5, 4, 3, 2];
  const tiktokData = [1.2, 1.5, 1.4, 1.6, 1.8, 1.4, 1.2];
  const imessageData = [1.0, 1.2, 1.3, 1.4, 1.5, 1.3, 1.1];
  const instagramData = [1.3, 1.5, 1.7, 1.8, 2.0, 1.6, 1.4];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={require('../images/Mia.png')} // Profile picture
            style={styles.profileImage}
          />
          <Text style={styles.title}>Your Analytics</Text>
        </View>

        {/* Dropdown Section */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownText}>This Week</Text>
        </View>

        {/* General Analytics Section */}
        <View style={styles.generalBanner}>
          <Text style={styles.sectionTitle}>General Analytics</Text>
          <View style={styles.chartContainer}>
            <BarChart
              data={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{ data: generalAnalyticsData }],
              }}
              width={screenWidth - 80}
              height={220}
              yAxisSuffix="h"
              chartConfig={chartConfig}
              style={[styles.chart, styles.roundedChart]}
            />
          </View>
        </View>

        {/* TikTok Section */}
        <View style={styles.compressedBanner}>
          <Text style={styles.sectionTitle}>You used TikTok for an avg 1.5 hours/day</Text>
          <View style={styles.timeSpentContainer}>
            <Image
              source={require('../images/tiktok-icon.png')}
              style={styles.icon}
            />
            <BarChart
              data={{
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                datasets: [{ data: tiktokData }],
              }}
              width={screenWidth - 120}
              height={180}
              yAxisSuffix="h"
              chartConfig={chartConfig}
              style={[styles.chart, styles.roundedChart]}
            />
          </View>
        </View>

        {/* iMessage Section */}
        <View style={styles.compressedBanner}>
          <Text style={styles.sectionTitle}>You used iMessage for an avg 1.2 hours/day</Text>
          <View style={styles.timeSpentContainer}>
            <Image
              source={require('../images/message-icon.png')}
              style={styles.icon}
            />
            <BarChart
              data={{
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                datasets: [{ data: imessageData }],
              }}
              width={screenWidth - 120}
              height={180}
              yAxisSuffix="h"
              chartConfig={chartConfig}
              style={[styles.chart, styles.roundedChart]}
            />
          </View>
        </View>

        {/* Instagram Section */}
        <View style={styles.compressedBanner}>
          <Text style={styles.sectionTitle}>You used Instagram for an avg 1.8 hours/day</Text>
          <View style={styles.timeSpentContainer}>
            <Image
              source={require('../images/instagram-icon.png')}
              style={styles.icon}
            />
            <BarChart
              data={{
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                datasets: [{ data: instagramData }],
              }}
              width={screenWidth - 120}
              height={180}
              yAxisSuffix="h"
              chartConfig={chartConfig}
              style={[styles.chart, styles.roundedChart]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(221, 58, 58, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  fillShadowGradient: '#DD3A3A',
  fillShadowGradientOpacity: 1,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  scrollContent: {
    paddingBottom: 20, // Ensure there's space at the bottom of the scroll
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Circular image
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DD3A3A',
    flex: 1, // Takes remaining space
    marginLeft: 10, // Adds space between profile picture and title
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  generalBanner: {
    backgroundColor: 'rgba(220, 53, 69, 0.5)',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    padding: 10, // Added padding around the chart
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  compressedBanner: {
    backgroundColor: 'rgba(220, 53, 69, 0.5)',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  chart: {
    borderRadius: 10,
    marginVertical: 10,
  },
  roundedChart: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  timeSpentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 15,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 12,
  },
});
