import React, { useEffect, useState } from 'react';
import { Box, FlatList, ScrollView, StatusBar, Text } from 'native-base';
import { View, Image, Dimensions } from 'react-native';
import Post from '../components/Post';
import PostButton from '../components/PostButton';
import SearchButton from '../components/SearchButton';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

export default function Discover() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const { access_token } = useSelector((state) => state.user);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    setLoading(true);
    fetch('https://hacktiv8-instafood.herokuapp.com/posts')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject('something went wrong!');
        }
      })
      .then(response => {
        setLoading(false);
        setPosts(response.items);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [access_token]);

  useFocusEffect(
    React.useCallback(() => {
      setPosts([]);
      setLoading(true);
      fetch('https://hacktiv8-instafood.herokuapp.com/posts')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject('something went wrong!');
          }
        })
        .then(response => {
          setLoading(false);
          setPosts(response.items);
        })
        .catch(error => {
          console.log('error', error);
        });
    }, [])
  )

  const handleRefresh = () => {
    setRefetch(true);

    fetch('https://hacktiv8-instafood.herokuapp.com/posts')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject('something went wrong!');
        }
      })
      .then(response => {
        setPosts(response.items);
        setRefetch(false);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  return (
    <Box bg={'white'} flex={1} safeAreaTop>
      <StatusBar />
      <SearchButton />
      {
        loading ? (
          <View style={{ height: windowHeight, width: windowWidth, justifyContent: 'center' }}>
            <Image
              style={{
                height: 80,
                width: 80,
                resizeMode: 'cover',
                borderRadius: 10,
                alignSelf: 'center',
                marginBottom: 250
              }}
              source={require('../assets/loading.gif')}
            />
          </View>
        ) : null
      }
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} key={item.id} />}
        keyExtractor={item => item.id}
        refreshing={refetch}
        onRefresh={handleRefresh}
      />
      <PostButton />
    </Box>
  );
}
