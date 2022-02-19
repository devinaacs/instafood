import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../components/Navbar';

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Navbar />
      </View>
      <ScrollView>
        <View style={{ marginTop: 10, backgroundColor: 'white', flexDirection: 'column', paddingBottom: 20, width: '100%' }} >
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ width: '39%', paddingHorizontal: 12 }}>
              <Ionicons name="arrow-back" size={34} color="#929292" />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, fontWeight: 'bold', alignSelf: 'center', alignItems: 'center' }}>My Profile</Text>
          </View>
          <View style={{ alignItems: 'center', marginVertical: 24 }}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'cover',
                borderRadius: 100 / 2,
                borderWidth: 1,
                borderColor: '#D1D1D1'
              }}
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png',
              }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 8 }}>Dummy Username</Text>
            <Text style={{ color: 'gray' }}>dummy@email.com</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', paddingTop: 5 }}>
            <View style={{ width: '35%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 16 }}>Posts</Text>
              <Text style={{ alignSelf: 'center', paddingVertical: 6, fontSize: 20, fontWeight: 'bold' }}>50</Text>
            </View>
            <View style={{ width: '35%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 16 }}>Likes</Text>
              <Text style={{ alignSelf: 'center', paddingVertical: 6, fontSize: 20, fontWeight: 'bold' }}>1500</Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: 'pink', padding: 15 }}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', alignItems: 'center' }}>Posts</Text>
          </View>
              
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
  },
});
