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
import { Ionicons } from '@expo/vector-icons';

export default function TrendingPostCard() {
  return (
    <ScrollView>
      <TouchableOpacity style={styles.trendingPostCardContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}
          />
          <Box
            style={styles.topImageShadow}
            bg={{
              linearGradient: {
                colors: ['black', 'transparent'],
                start: [0, 0],
                end: [0, 1],
              },
            }}
          />
          <View style={styles.topImageStyling}>
            <Ionicons
              name="ios-location-sharp"
              size={28}
              color="white"
              style={{ paddingTop: 1, paddingRight: 4 }}
            />
            <Text style={styles.topImageText}>Pizza Hut</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomContent}>
            <View style={styles.bottomContentProfilePicContainer}>
              <Image
                style={styles.bottomProfPicStyle}
                source={{
                  uri: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png',
                }}
              />

            </View>
            <View
              style={{
                backgroundColor: 'white',
                width: '75%',
                borderBottomRightRadius: 15,
                paddingTop: 15,
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 20, paddingTop: 3 }}>
                Bambang
              </Text>
              <Text style={{ fontSize: 17, paddingTop: 6 }}>
                Enak banget pizza-nya!{' '}
                <Text style={{ color: 'purple' }}>#pizza</Text>
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  trendingPostCardContainer: {
    backgroundColor: 'white',
    height: 420,
    flexDirection: 'column',
    borderRadius: 15,
    marginBottom: 32,
  },
  imageContainer: {
    height: '74%',
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  topImageShadow: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    height: '30%',
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  topImageStyling: {
    flexDirection: 'row',
    position: 'absolute',
    top: 12,
    left: 6,
    alignSelf: 'center',
  },
  topImageText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 3,
    paddingTop: 1,
  },
  bottomContainer: {
    height: '29%',
    width: '100%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 1,
    borderColor: '#6C6C6C',
  },
  bottomContent: { flexDirection: 'row', height: '100%' },
  bottomContentProfilePicContainer: {
    width: '25%',
    backgroundColor: 'white',
    padding: 12,
    borderBottomLeftRadius: 15,
    alignItems: 'center',
  },
  bottomProfPicStyle: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 80 / 2,
    borderWidth: 1,
    borderColor: '#D1D1D1'
  }
});
