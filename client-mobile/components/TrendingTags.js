import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TrendingTags({ tags }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SearchScreen', { tags })} style={styles.tagsContainer}>
      <View style={styles.tagsBox}>
        <Text style={styles.text}>#{tags.tag}</Text>
      </View>
    </TouchableOpacity>
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
