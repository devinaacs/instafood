import React from "react";
import { StyleSheet, View, ScrollView, FlatList, Image, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Highlights() {
  return (
    <SafeAreaView style={styles.container}>
        <View>
        <Text>Highlights Page</Text>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
});
