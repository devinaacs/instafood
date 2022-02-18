import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import TrendingPostCard from '../components/TrendingPostCard';
import TrendingPlacesCard from '../components/TrendingPlacesCard';
import TrendingTags from '../components/TrendingTags';
import PostButton from '../components/PostButton';

export default function Highlights() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Navbar />
      </View>
      <ScrollView>
        <View style={styles.trendingPlaces}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              Trending Places
            </Text>
          </View>
          <TouchableOpacity style={{ marginRight: 5, marginTop: 5 }}>
            <Text style={{ color: '#FF8F00', fontSize: 18 }}>see all</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: 'white', height: 260, paddingVertical: 10}}>
          <TrendingPlacesCard />
        </View>
        <View style={styles.trendingTags}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              Trending Tags
            </Text>
          </View>
          <TouchableOpacity style={{ marginRight: 5, marginTop: 5 }}>
            <Text style={{ color: '#FF8F00', fontSize: 18 }}>see all</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: 'white', height: 65 }}>
          <TrendingTags />
        </View>
        <View style={styles.trendingPosts}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              Trending Posts
            </Text>
          </View>
          <TouchableOpacity style={{ marginRight: 5, marginTop: 5 }}>
            <Text style={{ color: '#FF8F00', fontSize: 18 }}>see all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.trendingPostContainer}>
          <TrendingPostCard />
        </View>
      </ScrollView>
      <PostButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  trendingPlaces: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5
  },
  trendingPostContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 13,
    paddingHorizontal: 15,
  },
  trendingTags: {
    marginTop: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5
  },
  trendingPosts: {
    marginTop: 6,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5
  },
});
