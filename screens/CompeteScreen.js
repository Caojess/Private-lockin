import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const CompeteScreen = ({ route, navigation }) => {
  const { competitionName, competitors, screenLimit, timeLimit } = route.params;

  return (
    <View style={styles.container}>
      {/* Full-Width Header */}
      <View style={styles.headerContainer}>
        <Text
          style={styles.headerText}
        >{`${competitionName} `}</Text>
      </View>

      {/* Competitors Section */}
      <Text style={styles.subheader}>Competitors</Text>
      <FlatList
        data={competitors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.competitorRow}>
            {/* Avatar */}
            <Image source={item.avatar} style={styles.avatar} />
            <Text style={styles.competitorName}>{item.name}</Text>
            <Text style={styles.competitorTime}>{item.time}</Text>
          </View>
        )}
      />

      {/* Screen Limit & Timeline */}
      <Text style={styles.limit}>
        Screen Limit: <Text style={styles.bold}>{screenLimit}</Text>
      </Text>
      <Text style={styles.limit}>
        Timeline: <Text style={styles.bold}>{timeLimit}</Text>
      </Text>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate("Join")}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 16,
  },
  headerContainer: {
    backgroundColor: "#DD3A3A",
    paddingVertical: 20,
    alignItems: "center",
    width: "100%", // Ensures the header spans full width
  },
  headerText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  subheader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#DD3A3A",
    textAlign: "center",
    marginVertical: 8,
  },
  competitorRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#DD3A3A",
    marginRight: 12,
  },
  competitorName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  competitorTime: {
    fontSize: 16,
    color: "#666",
  },
  limit: {
    fontSize: 18,
    marginVertical: 8,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
    color: "#DD3A3A",
  },
  continueButton: {
    backgroundColor: "#DD3A3A",
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 16,
    alignSelf: "center",
    width: "50%",
    marginBottom: 20,
  },
  continueButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CompeteScreen;
