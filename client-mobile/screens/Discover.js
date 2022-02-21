import React, { useEffect, useState } from 'react';
import { Box, ScrollView, StatusBar, Text } from 'native-base';
import Post from '../components/Post';
import PostButton from '../components/PostButton';
import SearchButton from '../components/SearchButton';
import { useDispatch } from 'react-redux';

export default function Discover() {
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

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
        setPosts(response.items)
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [])

  return (
    <Box bg={'white'} flex={1} safeAreaTop>
      <StatusBar />
      <SearchButton />
      <ScrollView>
        {posts.length > 0 ?
          posts.map(post => (
            <Post post={post} key={post.id} />
          )) : null
        }
      </ScrollView>
      <PostButton />
    </Box>
  );
}
