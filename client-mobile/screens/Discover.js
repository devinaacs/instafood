import React, { useEffect, useState } from 'react';
import { Box, FlatList, ScrollView, StatusBar, Text } from 'native-base';
import Post from '../components/Post';
import PostButton from '../components/PostButton';
import SearchButton from '../components/SearchButton';
import { useSelector } from 'react-redux';

export default function Discover() {
  const [posts, setPosts] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const { access_token } = useSelector((state) => state.user);

  useEffect(() => {
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
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [access_token]);

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

  // const checkAccessToken = async () => {
  //   try {
  //     return await AsyncStorage.getItem('access_token');
  //   } catch (e) {
  //     return 'error reading access_token';
  //   }
  // };

  // const checkTest = () => {
  //   checkAccessToken()
  //     .then((token) => {
  //       console.log(token)
  //     })
  // }

  return (
    <Box bg={'white'} flex={1} safeAreaTop>
      <StatusBar />
      <SearchButton />
      {/* <Box onTouchEnd={checkTest}>
        <Text>Test</Text>
      </Box> */}
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
