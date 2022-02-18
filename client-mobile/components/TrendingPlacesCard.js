import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Box } from 'native-base';

export default function TrendingPlacesCard() {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <TouchableOpacity style={styles.cardContainer}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
          }}
        />
        <View style={styles.bottomTextContainer}>
          <Box
            style={{
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
              height: 150,
              width: '100%',
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
            bg={{
              linearGradient: {
                colors: ['black', 'transparent'],
                start: [0, 1],
                end: [0, 0],
              },
            }}
          />
          <Text style={styles.textStyle}>Place Name Here!</Text>
        </View>
      </TouchableOpacity>
 
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: { height: 240, width: 232, marginLeft: 15, borderRadius: 10 },
  imageStyle: {
    height: 240,
    width: 232,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    alignSelf: 'center',
    borderRadius: 6,
    width: '100%',
  },
  textStyle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 3,
    bottom: 17,
    left: 6,
  },
});
