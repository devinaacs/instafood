import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import NavbarForProfile from '../components/NavbarForProfile';
import UserPost from '../components/UserPost';
import PostButton from '../components/PostButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const navigation = useNavigation();

  const [userIdLocal, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const checkUserId = async () => {
    try {
      const userIdStorage = await AsyncStorage.getItem('userId');

      return userIdStorage
    } catch (e) {
      return 'error reading access_token';
    }
  };


  useEffect(() => {
    checkUserId()
      .then((userId) => {
        setUserId(userId)
      })
      .catch((err) => console.log(err))

    fetch(`https://hacktiv8-instafood.herokuapp.com/users/${userIdLocal}`)
      .then(response => response.json())
      .then(result => setUserProfile(result))
      .catch(err => console.log(err));

    fetch(
      `https://hacktiv8-instafood.herokuapp.com/posts/?user_id=${userIdLocal}`
    )
      .then(response => response.json())
      .then(result => setUserPosts(result))
      .catch(err => console.log(err));
  }, [userIdLocal]);

  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      fetch(`https://hacktiv8-instafood.herokuapp.com/users/${userIdLocal}`)
        .then(response => response.json())
        .then(result => {
          setUserProfile(result)
        })
        .catch(err => console.log(err));

      fetch(
        `https://hacktiv8-instafood.herokuapp.com/posts/?user_id=${userIdLocal}`
      )
        .then(response => response.json())
        .then(result => setUserPosts(result))
        .catch(err => console.log(err));
    })

    return refresh;
  }, [navigation, userIdLocal])

  if (!userProfile) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <NavbarForProfile />
      </View>
      <View>
        <ScrollView>
          <View style={styles.profileContainer}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{ width: '39%', paddingHorizontal: 12 }}
              >
                <Ionicons name="arrow-back" size={34} color="#929292" />
              </TouchableOpacity>
              <Text style={styles.myProfileText}>My Profile</Text>
            </View>
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
              <Image
                style={styles.profilePic}
                source={{
                  uri: userProfile.image_url || 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png',
                }}
              />
              {
                userProfile ? (
                  <View>
                    <Text style={styles.profileName}>{userProfile.username}</Text>
                    <Text style={{ color: 'gray' }}>{userProfile.email}</Text>
                  </View>
                ) :
                  <View>
                    <Text style={styles.profileName}></Text>
                    <Text style={{ color: 'gray' }}></Text>
                  </View>
              }

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
            <UserPost post={userPosts} />
          </ScrollView>
        </ScrollView>
      </View>
      <PostButton />
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
    textAlign: 'center'
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
