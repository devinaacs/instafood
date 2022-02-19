import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image, Dimensions, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Input, Icon, Stack, Center, Button } from 'native-base';
import NavbarForComment from '../components/NavbarForComment';
const windowWidth = Dimensions.get('window').width;


export default function CommentSection() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <NavbarForComment />
      </View>
      <ScrollView>
        <View style={{ backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', width: '100%', borderBottomWidth: 1, borderColor: '#E4E4E4' }}>
          <View style={{ backgroundColor: 'white', width: '18%', alignItems: 'center' }}>
            <Image
              style={{
                width: 67,
                height: 67,
                resizeMode: 'cover',
                borderRadius: 67 / 2,
                borderWidth: 1,
                borderColor: '#D1D1D1'
              }}
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png',
              }}
            />
          </View>
          <View style={{ backgroundColor: 'white', width: '72%', paddingHorizontal: 7 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 5 }}>John Doe</Text>
            <Text style={{ fontSize: 16 }}>Pizzanya the best!</Text>
          </View>
          <View style={{ backgroundColor: 'white', width: '10%', paddingHorizontal: 7, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity>
              <Ionicons
                name="heart-outline"
                size={24}
                color="#929292"
                style={{}}
              />
            </TouchableOpacity>
          </View>
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
  },
});
