import React from "react";
import { StyleSheet, View, ScrollView, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { AntDesign, Entypo } from '@expo/vector-icons';

export default function Highlights() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Navbar />
      </View>
      <ScrollView>
        <View style={{ marginTop: 10, backgroundColor: 'red', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Trending Places</Text>
          </View>
          <TouchableOpacity style={{ marginRight: 5, marginTop: 5 }}>
            <Text style={{ color: '#FF8F00' }}>see all</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: 'blue', height: 220, paddingVertical: 10 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={{ height: 200, width: 182, marginLeft: 13, borderRadius: 8 }}>
              <Image
                style={{ height: 200, width: 182, resizeMode: "cover", borderRadius: 8 }}
                source={{ uri: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80' }}
              />
              <View style={{ flexDirection: 'row', position: 'absolute', bottom: 12, left: 6, alignSelf: 'center', backgroundColor: 'rgba(52, 52, 52, 0.4)', borderRadius: 6 }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginHorizontal: 3 }}>Place Name Here</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 200, width: 182, backgroundColor: 'pink', marginLeft: 13, borderRadius: 8 }}>
              <Image
                style={{ height: 200, width: 182, resizeMode: "cover", borderRadius: 8 }}
                source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' }}
              />
              <View style={{ flexDirection: 'row', position: 'absolute', bottom: 12, left: 6, alignSelf: 'center', backgroundColor: 'rgba(52, 52, 52, 0.4)', borderRadius: 6 }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginHorizontal: 3 }}>Place Name Here</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 200, width: 182, backgroundColor: 'pink', marginLeft: 13, borderRadius: 8 }}>
              <Image
                style={{ height: 200, width: 182, resizeMode: "cover", borderRadius: 8 }}
                source={{ uri: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=780&q=80' }}
              />
              <View style={{ flexDirection: 'row', position: 'absolute', bottom: 12, left: 6, alignSelf: 'center', backgroundColor: 'rgba(52, 52, 52, 0.4)', borderRadius: 6 }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginHorizontal: 3 }}>Place Name Here</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 200, width: 182, backgroundColor: 'pink', marginLeft: 13, borderRadius: 8 }}>
              <Image
                style={{ height: 200, width: 182, resizeMode: "cover", borderRadius: 8 }}
                source={{ uri: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80' }}
              />
              <View style={{ flexDirection: 'row', position: 'absolute', bottom: 12, left: 6, alignSelf: 'center', backgroundColor: 'rgba(52, 52, 52, 0.4)', borderRadius: 6 }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginHorizontal: 3 }}>Place Name Here</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={{ marginTop: 14, backgroundColor: 'red', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Trending Tags</Text>
          </View>
          <TouchableOpacity style={{ marginRight: 5, marginTop: 5 }}>
            <Text style={{ color: '#FF8F00' }}>see all</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: 'white', height: 50, paddingVertical: 10 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={{ paddingLeft: 15 }}>
              <View style={{ backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, borderWidth: 1, borderColor: '#B8B8B8' }}>
                <Text style={{ color: '#545454' }}>#Enak</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingLeft: 15 }}>
              <View style={{ backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, borderWidth: 1, borderColor: '#B8B8B8' }}>
                <Text style={{ color: '#545454' }}>#Kenyang</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={{ marginTop: 6, backgroundColor: 'red', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Trending Posts</Text>
          </View>
          <TouchableOpacity style={{ marginRight: 5, marginTop: 5 }}>
            <Text style={{ color: '#FF8F00' }}>see all</Text>
          </TouchableOpacity>
        </View>

        <View style={{width: '100%', backgroundColor: 'green', padding: 13, paddingBottom: 20}}>
        <ScrollView>
          <TouchableOpacity style={{backgroundColor:'blue', height: 280, flexDirection: 'column', borderRadius: 15}}>
            <View style={{height: '72%', width: '100%',backgroundColor: 'pink', borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
            <Image
                style={{ height: "100%", width: "100%", resizeMode: "cover", borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
                source={{ uri: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' }}
              />
            </View>
            <View style={{height: '28%', width: '100%', padding: 8,backgroundColor: 'white', borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
              <Text>Text sect</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
    width: '100%',
    height: '100%',
  },
});
