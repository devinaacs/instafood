import React, { useState, useEffect } from 'react';
import { Box, Center, Flex, Input, Text, Pressable, FlatList, Image } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Post from '../components/Post';
import { useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export default function SearchScreen({ navigation }) {
  const textInputRef = React.useRef();
  const [search, setSearch] = useState('Search users');
  const [usersColor, setUsersColor] = useState('gray.300');
  const [tagsColor, setTagsColor] = useState('gray.100');
  const [placesColor, setPlacesColor] = useState('gray.100');
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [foundPlaces, setFoundPlaces] = useState([]);
  const [foundSearch, setFoundSearch] = useState(true);
  const { access_token } = useSelector((state) => state.user);
  const { timeoutState, setTimeoutState } = useState(null);

  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      handleFilter('posts by tags')
      setInputSearch(route.params.tags.tag)
    }

    handleSearch(inputSearch);
  }, [inputSearch])

  const handleSearchPlace = () => {
    const SERVER_PLACES_URL = `https://hacktiv8-instafood.herokuapp.com/places?name=${inputSearch}`;

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
      fetch('https://hacktiv8-instafood.herokuapp.com/users')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject('something went wrong!');
          }
        })
        .then((result) => {
          if (result.filter((el) => el.username.includes(searchBy)).length === 0) {
            setFoundSearch(false)
          }
          setUsers(result.filter((el) => el.username.includes(searchBy)))
        })
        .catch((err) => console.log(err))
    }

    if (search === 'Search places') {
      handleSearchPlace();
    }

    if (search === 'Search posts by tags') {
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
              if (elTag.includes(searchBy)) {
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
              if (elTag.includes(searchBy)) {
                flag = true;
              }
            })

            return flag;
          }))
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
      setUsersColor('gray.300')
      setTagsColor('gray.100')
      setPlacesColor('gray.100')
    }
    if (filter === 'posts by tags') {
      setUsers([]);
      setFoundPlaces([]);
      setInputSearch('');
      setUsersColor('gray.100')
      setTagsColor('gray.300')
      setPlacesColor('gray.100')
    }
    if (filter === 'places') {
      setUsers([]);
      setPosts([]);
      setInputSearch('');
      setUsersColor('gray.100')
      setTagsColor('gray.100')
      setPlacesColor('gray.300')
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
          <Input value={inputSearch} onChangeText={handleInputSearchChange} ref={textInputRef} placeholder={search} w={windowWidth / 1.18} borderWidth={'0'} fontSize={'xl'} px={'5'} />
        </Flex>
      </Flex>

      <Flex direction='row' width={windowWidth} bg={'white'} justifyContent={'space-evenly'} height={'16'} alignItems={'center'}>
        <Pressable borderRadius={'xl'} bg={usersColor} width={'20'} height={'10'} onPress={() => handleFilter('users')}>
          <Center width={'20'} height={'10'}>
            <Text fontSize={'lg'} color={'white'} fontWeight={'bold'}>Users</Text>
          </Center>
        </Pressable>
        <Pressable borderRadius={'xl'} width={'20'} height={'10'} bg={tagsColor} onPress={() => handleFilter('posts by tags')}>
          <Center width={'20'} height={'10'}>
            <Text fontSize={'lg'} color={'white'} fontWeight={'bold'}>Tags</Text>
          </Center>
        </Pressable>
        <Pressable borderRadius={'xl'} width={'20'} height={'10'} bg={placesColor} onPress={() => handleFilter('places')}>
          <Center width={'20'} height={'10'}>
            <Text fontSize={'lg'} color={'white'} fontWeight={'bold'}>Places</Text>
          </Center>
        </Pressable>
      </Flex>

      <Box onTouchEnd={() => handleSearch(inputSearch)}>
        <Text>Search</Text>
      </Box>

      {
        foundSearch ? null : (
          <Center height={'full'} width={'full'}>
            <Text>Sorry.. We cannot find what you're looking for</Text>
          </Center>
        )
      }

      {
        users.length > 0 ? (
          <FlatList
            data={users}
            renderItem={({ item }) => (
              <Box key={item.id}>
                <Text>{item.username}</Text>
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

      {foundPlaces.length > 0 ?
        foundPlaces.map((el, i) => {
          let photoRef = '';

          if (el.photo_reference) {
            photoRef = `https://hacktiv8-instafood.herokuapp.com/places/photo?ref=${el.photo_reference}`;
          } else {
            photoRef = el.icon
          }

          return (
            <Pressable key={i} onPress={() => console.log(el.name)} _pressed={{
              bg: 'gray.100'
            }} height={'20'} borderBottomWidth={'1'}>
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
          )
        }) : null
      }

    </Box>
  )
}
