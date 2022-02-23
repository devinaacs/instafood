import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Box, Image } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../components/Navbar';
import UserPost from '../components/UserPost';
import PostButton from '../components/PostButton';
import { useNavigation, useRoute, } from '@react-navigation/native';

export default function OtherUserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { post } = route.params;
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    fetch(`https://hacktiv8-instafood.herokuapp.com/users/${post.user.id}`)
      .then(response => response.json())
      .then(result => setUserProfile(result))
      .catch(err => console.log(err));

    fetch(
      `https://hacktiv8-instafood.herokuapp.com/posts/?user_id=${post.user.id}`
    )
      .then(response => response.json())
      .then(result => setUserPosts(result))
      .catch(err => console.log(err));
  }, []);

  if (!userProfile) {
    return null;
  }

  if (userPosts.length === 0) {
    return null;
  }

  console.log(userPosts);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Navbar />
      </View>
      <View>
        <ScrollView>
          <View style={styles.profileContainer}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{ width: '43%', paddingHorizontal: 12 }}
              >
                <Ionicons name="arrow-back" size={34} color="#929292" />
              </TouchableOpacity>
              <Text style={styles.myProfileText}>Profile</Text>
            </View>
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
              <Image
                alt='profilepic'
                style={styles.profilePic}
                source={{
                  uri: userProfile.image_url || 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png',
                }}
              />
              <Text style={styles.profileName}>{userProfile.username}</Text>
              <Text style={{ color: 'gray' }}>{userProfile.email}</Text>
            </View>
            <View style={styles.post}>
              <View style={{ width: '35%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 16 }}>Posts</Text>
                {
                  userPosts.items ? (
                    <View>
                      <Text style={styles.postsCount}>{userPosts.items.length}</Text>
                    </View>
                  ) :
                    <View>
                      <Text style={styles.postsCount}>0</Text>
                    </View>
                }
              </View>

            </View>
          </View>
          <View style={styles.postsTextContainer}>
            <View>
              <Text style={styles.postsText}>Posts</Text>
            </View>
          </View>
          <ScrollView horizontal={true} style={{ marginBottom: 80 }}>
            {/* <UserPost /> */}
            {
              userPosts.items.length > 0 ? <UserPost post={userPosts} /> :
                <Box justifyContent={'center'} width={windowWidth} mt={12}>
                  <Image alignSelf={'center'} mb={3} resizeMode={'contain'} width={'150'} height={'150'} source={require('../assets/camera.png')} alt={'alternate'} />
                  <Text style={{fontSize:24, fontWeight: 'bold', alignSelf:'center', color:'#373737'}}>No post yet</Text>
                </Box>
            }
          </ScrollView>
        </ScrollView>
      </View>
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
  profileContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingBottom: 20,
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#E1E1E1',
  },
  profilePic: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: '#D1D1D1',
  },
  myProfileText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
  },
  post: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    paddingTop: 5,
  },
  postsCount: {
    alignSelf: 'center',
    paddingVertical: 6,
    fontSize: 20,
    fontWeight: 'bold',
  },
  likesCount: {
    alignSelf: 'center',
    paddingVertical: 6,
    fontSize: 20,
    fontWeight: 'bold',
  },
  postsTextContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 15,
  },
  postsText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});
