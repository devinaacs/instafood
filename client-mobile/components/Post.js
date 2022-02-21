import React from 'react';
import { Box, Flex, Image, Text } from 'native-base';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { View, Dimensions, } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const windowWidth = Dimensions.get('window').width;

const Post = ({ post }) => {
  return (
    <Box w={windowWidth}>
      <Box
        mx={'4'}
        mb={'4'}
        borderWidth={'1'}
        borderRadius={'xl'}
        borderColor={'gray.200'}
      >

        {/* <Box
            borderTopRadius={'xl'}
            flexDirection={'row'}
            alignItems={'center'}
            bg={{
              linearGradient: {
                colors: ['black', 'transparent'],
                start: [0, 0],
                end: [0, 1],
              },
            }}
            position={'absolute'}
            zIndex={10}
            height={'20'}
            width={'full'}
            px={'3'}
          >
            <Ionicons name="ios-location-sharp" size={30} color="white" />
            <Text ml={'3'} fontSize={'lg'} fontWeight={'bold'} color={'white'}>
              {post.place}
            </Text>
          </Box>
          <Image
            borderTopRadius={'lg'}
            width={'full'}
            height={'full'}
            resizeMode={'cover'}
            source={{
              uri: post.imageUrl[0],
            }}
            alt={'alternate picture'}
          /> */}
        <View style={{ backgroundColor: 'white' }}>
          {
            post.images.length === 1 ? (
              <View style={{ width: windowWidth * 0.9347, justifyContent: 'center', alignItems: 'center', }}>
                <Image
                  alt='img'
                  style={{ width: '100%', resizeMode: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 470 }}
                  source={{
                    uri: post.images[0],
                  }}
                />
              </View>
            ) : (
              <SwiperFlatList
                index={0}
                style={{ overflow: 'hidden' }}
                showPagination
                paginationActiveColor={'blue'}
                paginationStyleItem={{ width: 9, height: 9, borderRadius: 9 / 2, marginHorizontal: 5, marginTop: 53, }}
                data={post.images}
                renderItem={({ item }) => (
                  <View style={{ width: windowWidth * 0.9347, justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                      alt='img'
                      style={{ width: '100%', resizeMode: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 470 }}
                      source={{
                        uri: item,
                      }}
                    />
                  </View>
                )}
              />
            )
          }
        </View>

        <Box
          borderColor={'gray.300'}
          borderWidth={'1'}
          borderBottomRadius={'xl'}
        >
          <Flex direction="row" justify={'space-between'}>
            <Flex direction="row" px={'3'} py={'2'}>
              <Box mr={'4'}>
                <AntDesign name="like2" size={30} color="black" />
              </Box>
              <Box>
                <FontAwesome name="comment-o" size={30} color="black" />
              </Box>
            </Flex>
          </Flex>
          <Box px={'3'}>
            <Text fontSize={'md'} fontWeight={'bold'}>
              {likesFormat(post.likes.length)} likes
            </Text>
          </Box>
          <Flex direction="row" px={'3'} mt={'4'} mb={'3'}>
            <Box size={'16'} borderRadius={'full'} borderColor={'gray.200'}>
              <Image
                width={'full'}
                height={'full'}
                resizeMode={'cover'}
                borderRadius={'full'}
                source={{
                  uri: post.user.profilePicture || 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png',
                }}
                alt={'alternate picture'}
              />
            </Box>
            <Box ml={'3'}>
              <Text fontSize={'md'} fontWeight={'bold'}>
                {post.user.username}
              </Text>
              <Flex direction="row">
                <Text fontSize={'md'}>{post.caption}</Text>
              </Flex>
            </Box>
          </Flex>
          <Box px={'3'} mt={'1'} mb={'5'}>
            <Text fontSize={'xs'} color={'gray.400'}>
              {dateFormat(post.created_at)}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const dateFormat = (createdAt) => {
  let slicedDate = createdAt.slice(0, 10);
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let reversedDate = slicedDate.split('-').reverse().join('-');
  let splitReversedDate = reversedDate.split('-');
  splitReversedDate[1] = months[+splitReversedDate[1] - 1];
  let newDate = ["", "", ""];

  newDate[0] = splitReversedDate[1];
  newDate[1] = splitReversedDate[0];
  newDate[2] = splitReversedDate[2];

  let outputDate = []

  newDate.forEach((el, i) => {
    if (i === 0) outputDate.push(`${el} `)
    if (i === 1) outputDate.push(`${el}, `)
    if (i === 2) outputDate.push(el)
  })

  return outputDate;
}

const likesFormat = likes => {
  let stringifiedLikes = likes + '';
  stringifiedLikes = stringifiedLikes.split('').reverse();
  let formattedLikes = '';

  stringifiedLikes.forEach((el, i) => {
    if ((i + 1) % 3 === 0 && i !== stringifiedLikes.length - 1) {
      formattedLikes += el + ',';
    } else {
      formattedLikes += el;
    }
  });

  return formattedLikes.split('').reverse();
};

export default Post;
