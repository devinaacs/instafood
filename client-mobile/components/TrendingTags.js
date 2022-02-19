import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function TrendingTags() {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingEnd: 10}}>
      <TouchableOpacity style={styles.tagsContainer}>
        <View style={styles.tagsBox}>
          <Text style={styles.text}>#enak</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tagsContainer: { paddingLeft: 10, justifyContent: 'center' },
  tagsBox: {
    backgroundColor: '#BBBBBB',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 15,
  },
  text: { color: 'white', fontSize: 20, fontWeight: 'bold' },
});
