import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Text } from 'native-base';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import { View, Dimensions, TouchableOpacity, } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

const Post = ({ post }) => {
  const [postDetails, setPostDetails] = useState([]);
  const [likeStatus, setLikeStatus] = useState(false);
  const [likes, setLikes] = useState('');
  const [userIdLocal, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [filteredLikes, setFilteredLikes] = useState([]);
  const [disableLike, setDisableLike] = useState(false);
  const { access_token } = useSelector((state) => state.user);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`https://hacktiv8-instafood.herokuapp.com/posts/${post.id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject('something went wrong!');
        }
      })
      .then(response => {
        setPostDetails(response);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [access_token]);

  const checkUserId = async () => {
    try {
      const userIdStorage = await AsyncStorage.getItem('userId');

      setUserId(userIdStorage);
    } catch (e) {
      return 'error reading access_token';
    }
  };

  const checkAccessToken = async () => {
    try {
      const access_token_storage = await AsyncStorage.getItem('access_token');

      setToken(access_token_storage);
    } catch (e) {
      return 'error reading access_token';
    }
  };

  useEffect(() => {
    checkUserId()
      .then(() => {
        let foundUser = false;

        post.likes.forEach((el) => {
          if (el.user.id === userIdLocal) {
            foundUser = true
          }
        })

        if (foundUser) {
          setLikeStatus(true);
        } else {
          setLikeStatus(false);
        }

      })
      .catch((err) => console.log(err))

    setLikes(post.likes.length);
    setFilteredLikes(post.likes);
    checkAccessToken()
  }, [userIdLocal, post])

  const handleLike = () => {
    if (!token) return;
    if (disableLike) return;
    let likeFound = false;
    let likeId = '';

    filteredLikes.forEach((el) => {
      if (el.user.id === userIdLocal) {
        likeFound = true;
        likeId = el.id;
      }
    })

    if (!likeFound) {
      setDisableLike(true);
      setLikeStatus(true);
      setLikes(likes + 1);
      fetch('https://hacktiv8-instafood.herokuapp.com/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: token
        },
        body: JSON.stringify({ post_id: post.id })
      })
        .then((response) => response.json())
        .then((result) => {
          setDisableLike(false);
          setFilteredLikes([...filteredLikes, {
            user: {
              id: userIdLocal,
            },
            id: result._id
          }])
        })
        .catch((err) => console.log(err));
    } else {
      setDisableLike(true);
      setLikeStatus(false);
      setLikes(likes - 1);
      setFilteredLikes(post.likes.filter((el) => el.user.id !== userIdLocal))
      fetch(`https://hacktiv8-instafood.herokuapp.com/likes/${likeId}`, {
        method: 'DELETE',
        headers: {
          access_token: token
        }
      })
        .then(() => {
          setDisableLike(false);
        })
        .catch((err) => console.log(err));
    }
  }

  if (postDetails.length === 0) {
    return null;
  }

  return (
    <Box w={windowWidth}>
      <Box
        mx={'4'}
        mb={'4'}
        borderWidth={'1'}
        borderRadius={'xl'}
        borderColor={'gray.200'}
      >

        <View style={{ backgroundColor: 'white' }}>
          <Box
            style={{
              position: 'absolute',
              top: 0,
              zIndex: 10,
              alignSelf: 'center',
              height: 150,
              width: '100%',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
            bg={{
              linearGradient: {
                colors: ['black', 'transparent'],
                start: [0, 0],
                end: [0, 1],
              },
            }}
          />
          <View style={{
            flexDirection: 'row',
            position: 'absolute',
            zIndex: 10,
            top: 20,
            left: 10,
            alignSelf: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}>
            <Box flexDirection={'row'}>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('PlaceDetail', { placeId: post.place_id });
                }}
                style={{ flexDirection: 'row', width: '80%' }}>
                <Ionicons
                  name='ios-location-sharp'
                  size={28}
                  color='white'
                  style={{ paddingTop: 1, paddingRight: 4 }}
                />
                <Text style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginHorizontal: 3,
                  paddingTop: 6,
                }}>{post.place_name}</Text>
              </TouchableOpacity>
            </Box>
            <Box px={'6'} mt={'1'} position={'absolute'} top={0} right={0}>
              <Text fontSize={'sm'} color={'#E7E7E7'}>
                {dateFormat(post.created_at)}
              </Text>
            </Box>
          </View>
          <Flex direction='row' py={5} style={{ zIndex: 10, position: 'absolute', bottom: 0, left: 0, width: '100%', }}>
            <Box
              style={{
                position: 'absolute',
                bottom: 0,
                alignSelf: 'center',
                height: 100,
                width: '100%',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}
              bg={{
                linearGradient: {
                  colors: ['gray.900', 'transparent'],
                  start: [0, 1],
                  end: [0, 0],
                },
              }}
            />
            <Box px={5} flexDirection={'row'}>
              <Box size={'12'} borderRadius={'full'} borderColor={'gray.200'}>
                {
                  likeStatus ? (
                    <Box mr={'4'} mt={2} onTouchEnd={handleLike}>
                      <AntDesign name='like1' size={32} color='white' />
                    </Box>
                  ) : (
                    <Box mr={'4'} mt={2} onTouchEnd={handleLike}>
                      <AntDesign name='like2' size={32} color='white' />
                    </Box>

                  )
                }
              </Box>
              <Box mt={4}>
                <Text fontSize={'md'} color={'white'}>{likesFormat(likes)} likes</Text>
              </Box>
            </Box>
          </Flex>
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
                paginationActiveColor={'white'}
                paginationStyleItem={{ width: 9, height: 9, borderRadius: 9 / 2, marginHorizontal: 5, marginTop: -10, zIndex: 16, }}
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
          <Flex direction='row' justify={'space-between'}>
            <Flex direction='row' px={'3'} py={'2'}>
            </Flex>
          </Flex>
          <Flex direction="row" justifyContent={'space-between'}>
            <Flex direction='row' px={'3'} mb={'3'} width={'80%'}>
              <Box size={'16'} borderRadius={'full'} borderColor={'gray.200'}>
                <TouchableOpacity onPress={() => {
                  if (post.user.id === userIdLocal) {
                    navigation.navigate('Profile');
                  } else {
                    navigation.navigate('OtherUserProfile', { post });
                  }
                }}>
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
                </TouchableOpacity>
              </Box>
              <Box ml={'3'} >
                <Text fontSize={'md'} fontWeight={'bold'}>
                  {post.user.username}
                </Text>
                <Flex direction='row' >
                  <Text fontSize={'md'}>{post.caption}{post.tags.map((tag, index) => {
                    return (
                      <Text onPress={() => navigation.navigate('SearchScreen', { tag })} key={index} fontSize={'lg'} style={{ color: '#ef4444', fontWeight: 'bold', }}> #{tag}</Text>
                    );
                  })}</Text>
                </Flex>
              </Box>
            </Flex>
            <TouchableOpacity style={{ justifyContent: 'center', paddingBottom: 10, paddingEnd: 7 }}>
              <Menu>
                <MenuTrigger>
                  <Entypo name='dots-three-vertical' size={30} color='gray' />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{ marginTop: 20, marginLeft: -10 }} >
                  <MenuOption onSelect={() => navigation.navigate('PostDetail', {item : postDetails})}>
                    <Text style={{ color: 'black', padding: 10 }}>See details</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </TouchableOpacity>
          </Flex>
          <Box px={'6'} mb={'5'} >
            <TouchableOpacity
              onPress={() => {
                navigation.push('CommentSection', { postDetails });
              }}
            >
              <Text fontSize={'sm'} color={'gray.500'}>View all {post.comments.length} comments</Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const dateFormat = (createdAt) => {
  let slicedDate = createdAt.slice(0, 10);
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let reversedDate = slicedDate.split('-').reverse().join('-');
  let splitReversedDate = reversedDate.split('-');
  splitReversedDate[1] = months[+splitReversedDate[1] - 1];
  let newDate = ['', '', ''];

  newDate[0] = splitReversedDate[1];
  newDate[1] = splitReversedDate[0];
  newDate[2] = splitReversedDate[2];

  let outputDate = [];

  newDate.forEach((el, i) => {
    if (i === 0) outputDate.push(`${el} `);
    if (i === 1) outputDate.push(`${el}, `);
    if (i === 2) outputDate.push(el);
  });

  return outputDate;
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

export default Post;
