import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Text } from 'native-base';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;

const TrendingPost2 = ({ post }) => {
  const [postDetails, setPostDetails] = useState([]);
  const [placeDetails, setPlaceDetails] = useState('');
  const navigation = useNavigation();

  const [likeStatus, setLikeStatus] = useState(false);
  const [likes, setLikes] = useState('');
  const [userIdLocal, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [filteredLikes, setFilteredLikes] = useState([]);
  const [disableLike, setDisableLike] = useState(false);
  const { access_token } = useSelector((state) => state.user);

  useEffect(() => {
    fetch(`https://hacktiv8-instafood.herokuapp.com/places/${post.place_id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject('something went wrong!');
        }
      })
      .then(response => {
        setPlaceDetails(response);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

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

        post.likes.forEach(el => {
          if (el.user === userIdLocal) {
            foundUser = true;
          }
        });

        if (foundUser) {
          setLikeStatus(true);
        } else {
          setLikeStatus(false);
        }
      })
      .catch(err => console.log(err));

    setLikes(post.likes.length);
    setFilteredLikes(post.likes);
    checkAccessToken();
  }, [userIdLocal, post, access_token]);

  const handleLike = () => {
    if (!token) return;
    if (disableLike) return;
    let likeFound = false;
    let likeId = '';

    filteredLikes.forEach(el => {
      if (el.user === userIdLocal) {
        likeFound = true;
        likeId = el.id;
      }
    });

    if (!likeFound) {
      setDisableLike(true);
      setLikeStatus(true);
      setLikes(likes + 1);
      fetch('https://hacktiv8-instafood.herokuapp.com/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: token,
        },
        body: JSON.stringify({ post_id: post.id }),
      })
        .then(response => response.json())
        .then(result => {
          setDisableLike(false);
          setFilteredLikes([
            ...filteredLikes,
            {
              user: {
                id: userIdLocal,
              },
              id: result._id,
            },
          ]);
        })
        .catch(err => console.log(err));
    } else {
      setDisableLike(true);
      setLikeStatus(false);
      setLikes(likes - 1);
      setFilteredLikes(postDetails.likes.filter(el => el.user.id !== userIdLocal));
      fetch(`https://hacktiv8-instafood.herokuapp.com/likes/${likeId}`, {
        method: 'DELETE',
        headers: {
          access_token: token,
        },
      })
        .then(() => {
          setDisableLike(false);
        })
        .catch(err => console.log(err));
    }
  };

  if (postDetails.length === 0) {
    return null;
  }

  return (
    <Box w={windowWidth}>
      <Box style={{ paddingHorizontal: 14 }} mb={'4'} borderColor={'gray.200'}>
        <Box>
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
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                zIndex: 10,
                top: 20,
                left: 10,
                alignSelf: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Box flexDirection={'row'}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('PlaceDetail', { placeDetails });
                  }}
                  style={{ flexDirection: 'row' }}>
                  <Ionicons
                    name="ios-location-sharp"
                    size={28}
                    color="white"
                    style={{ paddingTop: 1, paddingRight: 4 }}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginHorizontal: 3,
                      paddingTop: 6,
                    }}
                  >
                    {placeDetails.name}
                  </Text>
                </TouchableOpacity>
              </Box>
              <Box px={'6'} mt={'1'}>
                <Text fontSize={'sm'} color={'#E7E7E7'}>
                  {dateFormat(post.created_at)}
                </Text>
              </Box>
            </View>
            <Flex
              direction="row"
              py={5}
              style={{
                zIndex: 10,
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
              }}
            >
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
                  <Text fontSize={'md'} color={'white'}>
                    {likesFormat(likes)} likes
                  </Text>
                </Box>
              </Box>
            </Flex>
            {post.images.length === 1 ? (
              <View
                style={{
                  width: windowWidth * 0.9467,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  alt="img"
                  style={{
                    width: '100%',
                    resizeMode: 'cover',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    height: 420,
                  }}
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
                paginationStyleItem={{
                  width: 9,
                  height: 9,
                  borderRadius: 9 / 2,
                  marginHorizontal: 5,
                  marginTop: -10,
                  zIndex: 16,
                }}
                data={post.images}
                renderItem={({ item }) => (
                  <View
                    style={{
                      width: windowWidth * 0.9467,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      alt="img"
                      style={{
                        width: '100%',
                        resizeMode: 'cover',
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        height: 420,
                      }}
                      source={{
                        uri: item,
                      }}
                    />
                  </View>
                )}
              />
            )}
          </View>
        </Box>
        <Box
          borderColor={'gray.300'}
          borderWidth={'1'}
          borderBottomRadius={'xl'}
        >
          <Flex direction="row" justify={'space-between'}>
            <Flex direction="row" px={'3'} py={'2'}>
              {/* <Box mr={'4'}>
                <AntDesign name='like2' size={30} color='black' />
              </Box> */}
              {/* <Box>
                <FontAwesome name='comment-o' size={30} color='black' />
              </Box> */}
            </Flex>
          </Flex>
          {/* <Box px={'3'}>
            <Text fontSize={'md'} fontWeight={'bold'}>{likesFormat(post.likes)} likes</Text>
          </Box> */}
          <Flex direction="row" px={'3'} mb={'3'}>
            <Box size={'16'} borderRadius={'full'} borderColor={'gray.200'}>
              <Image
                width={'full'}
                height={'full'}
                resizeMode={'cover'}
                borderRadius={'full'}
                source={{
                  uri:
                    post.user.profilePicture ||
                    'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png',
                }}
                alt={'alternate picture'}
              />
            </Box>
            <Box ml={'3'} pt={1}>
              <Text fontSize={'md'} fontWeight={'bold'}>
                {post.user.username}
              </Text>
              <Flex direction="row">
                <Text fontSize={'md'}>{post.caption}</Text>
              </Flex>
            </Box>
          </Flex>
          <Box px={'6'} mb={'5'}>
            <TouchableOpacity
              onPress={() => {
                navigation.push('CommentSection', { postDetails });
              }}
            >
              <Text fontSize={'sm'} color={'gray.500'}>
                View all {postDetails.comments.length} comments
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const dateFormat = createdAt => {
  let slicedDate = createdAt.slice(0, 10);
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
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

export default TrendingPost2;
