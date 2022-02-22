import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image, Dimensions, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Input, Icon, Stack, Center, Button, Box } from 'native-base';
import NavbarForPlaceDetail from '../components/NavbarForPlaceDetail';
import { useRoute, useNavigation } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import TrendingPost2 from '../components/Post';
import PostDetail from './PostDetail';

export default function PlaceDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { placeDetails } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <NavbarForPlaceDetail />
      </View>
      <ScrollView>
        <View>
          <ScrollView>
            <View style={styles.placeContainer}>
              <View style={{ backgroundColor: 'white', paddingHorizontal: 16, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '78%' }}>
                  <Text style={styles.placeDetailName}>{placeDetails.name}</Text>
                </View>
                <Image
                  source={{ uri: placeDetails.icon }}
                  style={{
                    width: 33,
                    height: 33,
                    resizeMode: 'contain',
                    marginVertical: 6,
                    alignSelf: 'center'
                  }}
                />
              </View>
              <View style={{ backgroundColor: 'white' }}>

                <SwiperFlatList
                  autoplay
                  autoplayDelay={6}
                  autoplayLoop
                  index={0}
                  showPagination
                  paginationStyle={{ height: 13 }}
                  paginationStyleItem={{ width: 10, height: 10, borderRadius: 10 / 2, marginHorizontal: 6, zIndex: 10 }}
                  data={placeDetails.photos}
                  renderItem={({ item }) => (
                    <View style={{ width: windowWidth, justifyContent: 'center', alignItems: 'center', }}>
                      <Box
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          alignSelf: 'center',
                          height: 100,
                          borderBottomLeftRadius: 15,
                          borderBottomRightRadius: 15,
                          zIndex: 2,
                          width: windowWidth * 0.93
                        }}
                        bg={{
                          linearGradient: {
                            colors: ['black', 'transparent'],
                            start: [0, 1],
                            end: [0, 0],
                          },
                        }}
                      />
                      <Image
                        style={{ width: windowWidth * 0.93, height: 320, resizeMode: 'cover', borderRadius: 13 }}
                        source={{
                          uri: `https://hacktiv8-instafood.herokuapp.com/places/photo?ref=${item}`,
                        }}
                      />
                    </View>
                  )}
                />
              </View>
              <View style={{ backgroundColor: 'white', padding: 5, paddingTop: 12, flexDirection: 'row', width: '90%' }}>
                <Ionicons name='location-sharp' size={34} color='#929292' style={{ paddingHorizontal: 10 }} />
                <Text style={{ fontSize: 17, paddingTop: 5, textAlign: 'justify' }}>{placeDetails.address}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={{ paddingHorizontal: 20, paddingBottom: 20, backgroundColor: 'white' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Related Posts</Text>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  placeContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingBottom: 20,
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#E1E1E1',
  },
  placeDetailName: {
    fontSize: 29,
    fontWeight: 'normal',
    paddingLeft: 1
  },
  containerSwiper: { flex: 1, backgroundColor: 'white', margin: 18 },
});

const posts = [
  {
    id: 1,
    imageUrl: [
      'https://images.pexels.com/photos/3779791/pexels-photo-3779791.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80'],
    user: {
      name: 'Bambang',
      profilePicture:
        'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png',
    },
    likes: 781019389,
    place: 'Pizza Hut',
    createdAt: 'February 16, 2022',
    caption: 'Enak bangett!',
    comments: [
      {
        user: 'Daniel',
        comment: 'Bener bangett!',
      },
      {
        user: 'Devina',
        comment: 'Setuju!',
      },
      {
        user: 'Rafi',
        comment: 'Harus coba sih..',
      },
      {
        user: 'Bima',
        comment: 'Jadi pengen..',
      },
    ],
  },
  {
    id: 2,
    imageUrl: [
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    ],
    user: {
      name: 'Jefri',
      profilePicture:
        'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png',
    },
    likes: 7810,
    place: 'Holy Cow',
    createdAt: 'February 12, 2022',
    caption: 'Enak bangett!',
    comments: [
      {
        user: 'Daniel',
        comment: 'Bener bangett!',
      },
      {
        user: 'Devina',
        comment: 'Setuju!',
      },
      {
        user: 'Rafi',
        comment: 'Harus coba sih..',
      },
      {
        user: 'Bima',
        comment: 'Jadi pengen..',
      },
    ],
  },
];