import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;

const numColumns = 3;

export default function UserPost({ post }) {
  const navigation = useNavigation();
  return (
    <FlatList
      nestedScrollEnabled={true}
      data={post.items}
      style={styles.container}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.push('PostDetail', { item });
          }}
        >
          <Image
            style={{ width: windowWidth / 3.04, height: 175, margin: 1 }}
            source={{
              uri: item.images[0],
            }}
          />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
