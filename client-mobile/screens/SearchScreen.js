import React, { useState, useEffect } from 'react';
import { Box, Center, Flex, Input, Text, Pressable, FlatList, Image } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import Post from '../components/Post';
import { useFocusEffect, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export default function SearchScreen({ navigation }) {
  const textInputRef = React.useRef();
  const [search, setSearch] = useState('Search users');
  const [usersColor, setUsersColor] = useState('red.500');
  const [tagsColor, setTagsColor] = useState('gray.400');
  const [placesColor, setPlacesColor] = useState('gray.400');
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [foundPlaces, setFoundPlaces] = useState([]);
  const [foundSearch, setFoundSearch] = useState(true);
  const [useEffectTrigger, setUseEffectTrigger] = useState('');
  const [userTrigger, setUserTrigger] = useState(false);

  const [usersLoading, setUsersLoading] = useState(false);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [placesLoading, setPlacesLoading] = useState(false);

  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      handleFilter('posts by tags')
      setInputSearch(route.params.tag)
      setUserTrigger(false)
    }

    handleSearch(inputSearch)
    setUseEffectTrigger(' ');
  }, [useEffectTrigger])

  useFocusEffect(
    React.useCallback(() => {
      fetch('https://hacktiv8-instafood.herokuapp.com/users')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject('something went wrong!');
          }
        })
        .then(result => {
          setUsersLoading(false)
          console.log(result)
          setUsers(result)
          setUserTrigger(true)
        })
        .catch(err => console.log(err))
    }, [])
  )

  const handleSearchPlace = () => {
    const SERVER_PLACES_URL = `https://hacktiv8-instafood.herokuapp.com/places?name=${inputSearch}`;
    setPlacesLoading(true);
    fetch(SERVER_PLACES_URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject('something went wrong!');
        }
      })
      .then(response => {
        setFoundPlaces(response);
        setPlacesLoading(false);
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  const handleSearch = (searchBy) => {
    if (!searchBy) return;
    setFoundSearch(true);
    setUsers([]);
    setFoundPlaces([]);
    setPosts([]);
    if (search === 'Search users') {
      setUsersLoading(true);
      fetch('https://hacktiv8-instafood.herokuapp.com/users')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject('something went wrong!');
          }
        })
        .then((result) => {
          if (result.filter((el) => el.username.toLowerCase().includes(searchBy.toLowerCase())).length === 0) {
            setFoundSearch(false)
          }
          setUsers(result.filter((el) => el.username.toLowerCase().includes(searchBy.toLowerCase())))
          setUsersLoading(false)
        })
        .catch((err) => console.log(err))
    }

    if (search === 'Search places') {
      handleSearchPlace();
    }

    if (search === 'Search posts by tags') {
      setTagsLoading(true);
      fetch('https://hacktiv8-instafood.herokuapp.com/posts')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject('something went wrong!');
          }
        })
        .then(response => {
          if (response.items.filter((el) => {
            let flag = false;

            el.tags.forEach((elTag) => {
              if (elTag.toLowerCase().includes(searchBy.toLowerCase())) {
                flag = true;
              }
            })

            return flag;
          }).length === 0) {
            setFoundSearch(false);
          }
          setPosts(response.items.filter((el) => {
            let flag = false;

            el.tags.forEach((elTag) => {
              if (elTag.toLowerCase().includes(searchBy.toLowerCase())) {
                flag = true;
              }
            })

            return flag;
          }))
          setTagsLoading(false)
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  }

  const focusOnInput = e => {
    textInputRef.current.focus();
  };

  const handleFilter = (filter) => {
    setSearch('Search ' + filter);
    setFoundSearch(true);
    if (filter === 'users') {
      setPosts([]);
      setFoundPlaces([]);
      setInputSearch('');
      setUsersColor('red.500')
      setTagsColor('gray.400')
      setPlacesColor('gray.400')
    }
    if (filter === 'posts by tags') {
      setUsers([]);
      setFoundPlaces([]);
      setInputSearch('');
      setUsersColor('gray.400')
      setTagsColor('red.500')
      setPlacesColor('gray.400')
    }
    if (filter === 'places') {
      setUsers([]);
      setPosts([]);
      setInputSearch('');
      setUsersColor('gray.400')
      setTagsColor('gray.400')
      setPlacesColor('red.500')
    }
  };

  const handleInputSearchChange = (inputSearch) => {
    setInputSearch(inputSearch);
  }

  navigation.addListener('focus', focusOnInput);

  return (
    <Box flex={1} bg={'white'} safeArea>
      <Flex direction='row' pr={'5'} py={'3'} position={'relative'} bg={'white'}>
        <Center onTouchEnd={() => navigation.goBack()} px={'3'}>
          <Ionicons name='arrow-back' size={30} color='black' />
        </Center>
        <Flex direction={'row'} bg={'gray.100'} borderRadius={'xl'}>
          <Input value={inputSearch} onChangeText={handleInputSearchChange} ref={textInputRef} placeholder={search} w={windowWidth / 1.34} borderWidth={'0'} fontSize={'xl'} px={'5'} />
          <Box onTouchEnd={() => handleSearch(inputSearch)} justifyContent={'center'} px={3}>
            <Ionicons name='search' size={30} color='gray' />
          </Box>
        </Flex>
      </Flex>

      <Flex direction='row' width={windowWidth} bg={'white'} justifyContent={'space-evenly'} height={'16'} alignItems={'center'} pb={2}>
        <Pressable borderRadius={'xl'} borderBottomWidth={2} borderBottomColor={usersColor} onPress={() => handleFilter('users')}>
          <Box height={'10'} width={windowWidth / 2.73} alignContent={'center'}>
            <Text fontSize={'lg'} alignSelf={'center'} color={usersColor} fontWeight={'bold'}>Users</Text>
          </Box>
        </Pressable>
        <Pressable borderRadius={'xl'} borderBottomWidth={2} borderBottomColor={tagsColor} onPress={() => handleFilter('posts by tags')}>
          <Box height={'10'} width={windowWidth / 2.7}>
            <Text fontSize={'lg'} alignSelf={'center'} color={tagsColor} fontWeight={'bold'}>Tags</Text>
          </Box>
        </Pressable>
        <Pressable borderRadius={'xl'} borderBottomWidth={2} borderBottomColor={placesColor} onPress={() => handleFilter('places')}>
          <Box height={'10'} width={windowWidth / 2.7}>
            <Text fontSize={'lg'} alignSelf={'center'} color={placesColor} fontWeight={'bold'}>Places</Text>
          </Box>
        </Pressable>
      </Flex>

      {
        usersLoading ? <Image alt='loading'
          style={{
            height: 60,
            width: 60,
            marginTop: 120,
            resizeMode: 'cover',
            borderRadius: 10,
            alignSelf: 'center',
            justifyContent: 'center', alignItems: 'center', alignContent: 'center'
          }}
          source={require('../assets/loading.gif')}
        /> : null
      }


      {
        tagsLoading ? <Image alt='loading'
          style={{
            height: 60,
            width: 60,
            marginTop: 120,
            resizeMode: 'cover',
            borderRadius: 10,
            alignSelf: 'center',
            justifyContent: 'center', alignItems: 'center', alignContent: 'center'
          }}
          source={require('../assets/loading.gif')}
        /> : null
      }


      {
        placesLoading ? <Image alt='loading'
          style={{
            height: 60,
            width: 60,
            marginTop: 120,
            resizeMode: 'cover',
            borderRadius: 10,
            alignSelf: 'center',
            justifyContent: 'center', alignItems: 'center', alignContent: 'center'
          }}
          source={require('../assets/loading.gif')}
        /> : null
      }

      {
        foundSearch ? null : (
          <Center height={'full'} width={'full'}>
            <Box justifyContent={'center'} alignItems={'center'} mb={250}>
              <Text fontSize={25} py={3} fontWeight={'bold'} color={'#ef4444'}>Sorry.. </Text>
              <Text fontSize={20}>We cannot find what you're looking for :(</Text>
            </Box>
          </Center>
        )
      }

      {
        users.length > 0 && posts.length === 0 && userTrigger ? (
          <FlatList
            data={users}
            renderItem={({ item }) => (
              <Box key={item.id}>
                <Pressable onPress={() => navigation.navigate('OtherUserProfile', { post: { user: { id: item.id } } })} _pressed={{
                  bg: 'gray.100'
                }} height={'20'} borderBottomWidth={'1'} borderBottomColor={'gray.300'}>
                  <Flex direction='row' width={'full'} height={'20'} my={'2'}>
                    <Box >
                      <Image borderRadius={'full'} width={'16'} height={'16'} source={{
                        uri: item.image_url || 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651__340.png'
                      }} alt={'alternate'} />
                    </Box>
                    <Box ml={'4'} mt={'4'}>
                      <Text fontWeight={'bold'} fontSize={20}>{item.username}</Text>
                    </Box>
                  </Flex >
                </Pressable>
              </Box>
            )}
            keyExtractor={item => item.id}
          />
        ) : null
      }

      {
        posts.length > 0 ? (
          <FlatList
            data={posts}
            renderItem={({ item }) => <Post post={item} key={item.id} />}
            keyExtractor={item => item.id}
          />
        ) : null
      }
      <Box px={5}>


        {foundPlaces.length > 0 ?
          foundPlaces.map((el, i) => {
            let photoRef = '';

            if (el.photo_reference) {
              photoRef = `https://hacktiv8-instafood.herokuapp.com/places/photo?ref=${el.photo_reference}`;
            } else {
              photoRef = el.icon;
            }

            return (
              <Pressable key={i} onPress={() => navigation.navigate('PlaceDetail', { placeId: el.place_id })} _pressed={{
                bg: 'gray.100'
              }} height={'20'} borderBottomWidth={'1'} borderBottomColor={'gray.400'}>
                <Flex direction='row' width={'full'} height={'20'} my={'2'}>
                  <Box>
                    <Image borderRadius={'lg'} width={'16'} height={'16'} source={{
                      uri: photoRef
                    }} alt={'alternate'} />
                  </Box>
                  <Box ml={'4'} mt={'4'}>
                    <Text fontWeight={'bold'}>{el.name}</Text>
                    <Text>{el.address.slice(0, 50)}</Text>
                  </Box>
                </Flex >
              </Pressable>
            );
          }) : null
        }
      </Box>

    </Box>
  )
}
