import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions, } from 'react-native';
import { Box, Flex, Image, Text, Button, Center, Modal } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import NavbarForPostDetail from '../components/NavbarForPostDetail';
const windowWidth = Dimensions.get('window').width;
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PostDetail() {
  const route = useRoute();
  const { item } = route.params;
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const [placeDetails, setPlaceDetails] = useState('');
  const [userIdLocal, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [post, setPost] = useState(null);

  const getUserId = async () => {
    try {
      return await AsyncStorage.getItem('userId');
    } catch (err) {
      return err;
    }
  };

  const checkAccessToken = async () => {
    try {
      return await AsyncStorage.getItem('access_token');
    } catch (e) {
      return 'error reading access_token';
    }
  };

  useEffect(() => {
    getUserId()
      .then(response => {
        setUserId(response);
      })
      .catch(err => {
        console.log(err);
      });
    checkAccessToken()
      .then((response) => {
        setToken(response);
      })
      .catch((err) => console.log(err))
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetch(`https://hacktiv8-instafood.herokuapp.com/places/${item.place_id}`)
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
      fetch(`https://hacktiv8-instafood.herokuapp.com/posts/${item.id}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject('something went wrong!');
          }
        })
        .then(response => {
          setPost(response);
        })
        .catch(error => {
          console.log('error', error);
        });

    }, [])
  )

  // console.log(post.comments)

  const handleDeletePost = () => {
    fetch(`https://hacktiv8-instafood.herokuapp.com/posts/${item.id}`, {
      method: 'DELETE',
      headers: {
        access_token: token
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject('something went wrong!');
        }
      })
      .then(response => {
        console.log(response);
        setShowModal(false);
        navigation.goBack();
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  let deleteButton;

  if (userIdLocal === item.user.id) {
    deleteButton = <Flex direction='row' px={'2'} py={'3'}>
      <TouchableOpacity mr={'4'} onPress={() => setShowModal(true)}>
        <Ionicons name='trash-outline' size={31} color='#9B9B9B' />
      </TouchableOpacity>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Body>
            <Center pt={10}>
              <Text style={{ fontSize: 20 }}>Are you sure, you want to delete this post?</Text>
            </Center>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setShowModal(false);
              }}>
                Cancel
              </Button>
              <Button px={6} colorScheme="red" onPress={handleDeletePost}>
                Yes
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Flex>;
  } else {
    deleteButton = <Flex></Flex>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <NavbarForPostDetail />
      </View>
      <ScrollView>

        <Box w={windowWidth}>
          <Box style={{ paddingHorizontal: 14 }} mb={'4'} borderColor={'gray.200'}>
            <Box>
              <View style={{ backgroundColor: 'white' }}>
                <Box
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    zIndex: 16,
                    top: 0,
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: 100,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }}
                  bg={{
                    linearGradient: {
                      colors: ['gray.900', 'transparent'],
                      start: [0, 0],
                      end: [0, 1],
                    },
                  }}
                >
                  <Box flexDirection={'row'} py={5} px={3} width={'70%'}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.push('PlaceDetail', { placeId: item.place_id });
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
                          paddingTop: 0,
                          lineHeight: 30,
                        }}
                      >
                        {placeDetails.name}
                      </Text>
                    </TouchableOpacity>
                  </Box>
                  <Box px={'5'} mt={'6'}>
                    <Text fontSize={'sm'} color={'#E7E7E7'}>
                      {dateFormat(item.created_at)}
                    </Text>
                  </Box>
                </Box>
                <Box
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    alignSelf: 'center',
                    height: 100,
                    width: '100%',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    zIndex: 10,
                  }}
                  bg={{
                    linearGradient: {
                      colors: ['gray.900', 'transparent'],
                      start: [0, 1],
                      end: [0, 0],
                    },
                  }}
                />
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
                    <Box mb={1}>
                      <Text fontSize={'md'} color={'white'}>
                        {likesFormat(item.likes.length)} Likes
                      </Text>
                    </Box>
                  </Box>
                </Flex>
                {item.images.length === 1 ? (
                  <View style={{ width: windowWidth * 0.9467, justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                      alt='img'
                      style={{ width: '100%', resizeMode: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12, height: 470 }}
                      source={{
                        uri: item.images[0],
                      }}
                    />
                  </View>
                ) : (
                  <SwiperFlatList
                    index={0}
                    style={{ overflow: 'hidden' }}
                    showPagination
                    paginationActiveColor={'white'}
                    paginationStyleItem={{ width: 9, height: 9, borderRadius: 9 / 2, marginHorizontal: 5, marginTop: -10, zIndex: 20 }}
                    data={item.images}
                    renderItem={({ item }) => (
                      <View style={{ width: windowWidth * 0.9467, justifyContent: 'center', alignItems: 'center', }}>
                        <Image
                          alt='img'
                          style={{ width: '100%', resizeMode: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12, height: 470 }}
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
            <Box borderColor={'gray.300'} borderWidth={'1'} borderBottomRadius={'xl'}>

              <Flex direction='row' justify={'space-between'}>
                <Flex direction='row' px={'4'} py={'2'}>
                  <Box>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.push('CommentSection', { postDetails: item });
                      }}
                    >
                      <FontAwesome name='commenting-o' size={32} color='#929292' />
                    </TouchableOpacity>
                  </Box>
                </Flex>
                {deleteButton}
              </Flex>
              <Flex direction='row' px={'3'} mt={'0'} mb={'1'}>

                <Box size={'12'} borderRadius={'full'} borderColor={'gray.200'}>
                  <Image
                    width={'full'}
                    height={'full'}
                    resizeMode={'cover'}
                    borderRadius={'full'}
                    source={{
                      uri: item.user.image_url || 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png',
                    }}
                    alt={'alternate picture'}
                  />
                </Box>
                <Box ml={'3'} width={'90%'}>
                  <Text fontSize={'lg'} fontWeight={'bold'} pb={1}>{item.user.username}</Text>
                  <Flex direction='row'>
                    <View style={{ flexDirection: 'row' }}>
                      <Text lineHeight={28} fontSize={'lg'}>{item.caption}{item.tags.map((tag, index) => {
                        return (
                          <Text onPress={() => navigation.navigate('SearchScreen', { tag })} key={index} fontSize={'lg'} style={{ color: '#ef4444', fontWeight: 'bold' }}> #{tag}</Text>
                        );
                      })}</Text>

                    </View>

                  </Flex>
                </Box>
              </Flex>
              <Box px={'3'} mt={'1'} mb={'4'}>
                <Text fontSize={'xs'} color={'gray.400'}>{dateFormat(item.created_at)}</Text>
              </Box>
              {/*  */}
              {
                post ? (
                  post.comments.length === 0 ? (
                    <Box><Text>Kosong buangg..</Text></Box>
                  ) : (
                    post.comments.map((comment) => {
                      return (
                        <Flex key={comment.id} direction='row' px={'3'} mt={'3'} mb={'6'}>
                          <Box size={'12'} borderRadius={'full'} borderColor={'gray.200'}>
                            <Image
                              width={'full'}
                              height={'full'}
                              resizeMode={'cover'}
                              borderRadius={'full'}
                              source={{
                                uri: comment.user.image_url || 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png',
                              }}
                              alt={'alternate picture'}
                            />
                          </Box>
                          <Box ml={'3'}>
                            <Text fontSize={'md'} fontWeight={'bold'}>{comment.user.username}</Text>
                            <Flex direction='row'>
                              <Text fontSize={'md'}>{comment.comment}</Text>
                            </Flex>
                          </Box>
                        </Flex>
                      );
                    })
                  )
                ) : null
              }

              {/* 
              post.comments.map((comment) => {
                    return (
                      <Flex key={comment.id} direction='row' px={'3'} mt={'3'} mb={'6'}>
                        <Box size={'12'} borderRadius={'full'} borderColor={'gray.200'}>
                          <Image
                            width={'full'}
                            height={'full'}
                            resizeMode={'cover'}
                            borderRadius={'full'}
                            source={{
                              uri: comment.user.image_url || 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png',
                            }}
                            alt={'alternate picture'}
                          />
                        </Box>
                        <Box ml={'3'}>
                          <Text fontSize={'md'} fontWeight={'bold'}>{comment.user.username}</Text>
                          <Flex direction='row'>
                            <Text fontSize={'md'}>{comment.comment}</Text>
                          </Flex>
                        </Box>
                      </Flex>
                    );
                  }) 
                  */}
            </Box>
          </Box>
        </Box>

      </ScrollView>

    </SafeAreaView>
  );
}

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  placeContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingBottom: 20,
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#E1E1E1',
  },
  placeDetailName: {
    fontSize: 35,
    fontWeight: 'normal',
    paddingLeft: 1
  },
  containerSwiper: { flex: 1, backgroundColor: 'white', margin: 18 },
});

