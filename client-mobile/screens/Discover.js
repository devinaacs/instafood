import React from 'react';
import { Box, Center, Divider, Flex, Input, ScrollView, StatusBar } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import Post from '../components/Post';

export default function Discover() {
  return (
    <Box bg={'white'} flex={1} safeAreaTop>
      <StatusBar />
      <Box px={'3'} py={'3'} position={'relative'}>
        <Flex direction={'row'} bg={'gray.100'} borderRadius={'xl'}>
          <Center px={'3'}>
            <AntDesign name="search1" size={24} color="black" />
          </Center>
          <Input placeholder="Search" w={'full'} borderWidth={'0'} fontSize={'xl'} />
        </Flex>
      </Box>
      <Divider />
      <ScrollView>
        {
          posts.map((post) => (
            <Post post={post} key={post.id} />
          ))
        }
      </ScrollView>
    </Box>
  );
}

const posts = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    user: {
      name: 'Bambang',
      profilePicture: 'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png'
    },
    likes: 781019389,
    place: 'Pizza Hut',
    createdAt: 'February 16, 2022',
    caption: 'Enak bangett!',
    comments: [
      {
        user: 'Daniel',
        comment: 'Bener bangett!'
      },
      {
        user: 'Devina',
        comment: 'Setuju!'
      },
      {
        user: 'Rafi',
        comment: 'Harus coba sih..'
      },
      {
        user: 'Bima',
        comment: 'Jadi pengen..'
      }
    ]
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    user: {
      name: 'Jefri',
      profilePicture: 'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png'
    },
    likes: 7810,
    place: 'Holy Cow',
    createdAt: 'February 12, 2022',
    caption: 'Enak bangett!',
    comments: [
      {
        user: 'Daniel',
        comment: 'Bener bangett!'
      },
      {
        user: 'Devina',
        comment: 'Setuju!'
      },
      {
        user: 'Rafi',
        comment: 'Harus coba sih..'
      },
      {
        user: 'Bima',
        comment: 'Jadi pengen..'
      }
    ]
  }
]
