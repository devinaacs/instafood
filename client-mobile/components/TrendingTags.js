import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function TrendingTags() {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <TouchableOpacity style={styles.tagsContainer}>
        <View style={styles.tagsBox}>
          <Text style={{ color: '#545454', fontSize: 20 }}>#Enak</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tagsContainer: { paddingLeft: 15, justifyContent: 'center' },
  tagsBox: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9F9F9F',
  },

});
