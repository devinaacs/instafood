import React from 'react';
import { Box, ScrollView, StatusBar } from 'native-base';
import Post from '../components/Post';
import PostButton from '../components/PostButton';
import SearchButton from '../components/SearchButton';

export default function Discover() {
  return (
    <Box bg={'white'} flex={1} safeAreaTop>
      <StatusBar />
      <SearchButton />
      <ScrollView>
        {posts.map(post => (
          <Post post={post} key={post.id} />
        ))}
      </ScrollView>
      <PostButton />
    </Box>
  );
}

const posts = [
  {
    id: 1,
    imageUrl:[
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
    imageUrl:[
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
