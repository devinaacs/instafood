import React from 'react'
import { Box, Flex, Image, Text } from 'native-base';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions, } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const windowWidth = Dimensions.get('window').width;

const TrendingPost2 = ({ post }) => {
  return (
    <Box w={windowWidth}>
      <Box style={{ paddingHorizontal: 14 }} mb={'4'} borderColor={'gray.200'}>
        <Box>
          {/* <Box
            borderTopRadius={'xl'}
            flexDirection={'row'}
            alignItems={'center'}
            bg={{
              linearGradient: {
                colors: ['black', 'transparent'],
                start: [0, 0],
                end: [0, 1]
              }
            }}
            position={'absolute'}
            zIndex={10}
            height={'20'}
            width={'full'}
            px={'3'}
          >
            <Ionicons name='ios-location-sharp' size={30} color='white' />
            <Text ml={'3'} fontSize={'lg'} fontWeight={'bold'} color={'white'}>{post.place}</Text>
          </Box>
          <Image
            borderTopRadius={15}
            width={'full'}
            height={'full'}
            resizeMode={'cover'}
            source={{
              uri: post.imageUrl,
            }}
            alt={'alternate picture'}
          /> */}
          <View style={{ backgroundColor: 'white' }}>
            <SwiperFlatList
              index={0}
              style={{ overflow: 'hidden' }}
              showPagination
              paginationActiveColor={'blue'}
              paginationStyleItem={{ width: 9, height: 9, borderRadius: 9 / 2, marginHorizontal: 5, marginTop: 53, }}
              data={post.imageUrl}
              renderItem={({ item }) => (
                <View style={{ width: windowWidth * 0.9467, justifyContent: 'center', alignItems: 'center', }}>
                  <Image
                    alt='img'
                    style={{ width: '100%', resizeMode: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12, height: 370 }}
                    source={{
                      uri: item,
                    }}
                  />
                </View>
              )}
            />
          </View>

        </Box>
        <Box borderColor={'gray.300'} borderWidth={'1'} borderBottomRadius={'xl'}>

          <Flex direction='row' justify={'space-between'}>
            <Flex direction='row' px={'3'} py={'2'}>
              <Box mr={'4'}>
                <AntDesign name='like2' size={30} color='black' />
              </Box>
              <Box>
                <FontAwesome name='comment-o' size={30} color='black' />
              </Box>
            </Flex>
          </Flex>
          <Box px={'3'}>
            <Text fontSize={'md'} fontWeight={'bold'}>{likesFormat(post.likes)} likes</Text>
          </Box>
          <Flex direction='row' px={'3'} mt={'4'} mb={'3'}>

            <Box size={'16'} borderRadius={'full'} borderColor={'gray.200'}>
              <Image
                width={'full'}
                height={'full'}
                resizeMode={'cover'}
                borderRadius={'full'}
                source={{
                  uri: post.user.profilePicture,
                }}
                alt={'alternate picture'}
              />
            </Box>
            <Box ml={'3'}>
              <Text fontSize={'md'} fontWeight={'bold'}>{post.user.name}</Text>
              <Flex direction='row'>
                <Text fontSize={'md'}>{post.caption}</Text>
              </Flex>
            </Box>
          </Flex>
          <Box px={'3'} mt={'1'} mb={'5'}>
            <Text fontSize={'xs'} color={'gray.400'}>{post.createdAt}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

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

export default TrendingPost2;
