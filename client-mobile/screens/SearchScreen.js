import React, { useState, useEffect } from 'react';
import { Box, Center, Flex, Input, Text, Pressable, FlatList, Image } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Post from '../components/Post';

const windowWidth = Dimensions.get('window').width;

export default function SearchScreen({ navigation }) {
  const textInputRef = React.useRef();
  const [search, setSearch] = useState('Search users');
  const [usersColor, setUsersColor] = useState('red.200')
  const [tagsColor, setTagsColor] = useState('red.200')
  const [placesColor, setPlacesColor] = useState('red.200')
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [foundPlaces, setFoundPlaces] = useState([]);
  const { access_token } = useSelector((state) => state.user);
  const { timeoutState, setTimeoutState } = useState(null);

  const handleSearchPlace = async () => {
    const SERVER_PLACES_URL = `https://hacktiv8-instafood.herokuapp.com/places?name=${inputSearch}`;

    await fetch(SERVER_PLACES_URL)
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
    if (search === 'Search by Users') {
      fetch('https://hacktiv8-instafood.herokuapp.com/users')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject('something went wrong!');
          }
        })
        .then((result) => {
          setUsers(result.filter((el) => el.username.includes(searchBy)))
        })
        .catch((err) => console.log(err))
    }

    if (search === 'Search by Places') {
      handleSearchPlace();
    }

    if (search === 'Search by Tags') {
      fetch('https://hacktiv8-instafood.herokuapp.com/posts')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject('something went wrong!');
          }
        })
        .then(response => {
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
    setSearch('Search by ' + filter);
    if (filter === 'Users') {
      setPosts([]);
      setFoundPlaces([]);
      setUsersColor('red.300')
      setTagsColor('red.200')
      setPlacesColor('red.200')
    }
    if (filter === 'Tags') {
      setUsers([]);
      setFoundPlaces([]);
      setUsersColor('red.200')
      setTagsColor('red.300')
      setPlacesColor('red.200')
    }
    if (filter === 'Places') {
      setUsers([]);
      setPosts([]);
      setUsersColor('red.200')
      setTagsColor('red.200')
      setPlacesColor('red.300')
    }
  };

  const handleInputSearchChange = (inputSearch) => {
    setInputSearch(inputSearch);
  }

  navigation.addListener('focus', focusOnInput);

  return (
    <Box flex={1} bg={'white'}>
      <Flex direction='row' pr={'5'} py={'3'} position={'relative'} bg={'white'}>
        <Center onTouchEnd={() => navigation.goBack()} px={'3'}>
          <Ionicons name='arrow-back' size={30} color='black' />
        </Center>
        <Flex direction={'row'} bg={'gray.100'} borderRadius={'xl'}>
          <Input value={inputSearch} onChangeText={handleInputSearchChange} ref={textInputRef} placeholder={search} w={windowWidth / 1.18} borderWidth={'0'} fontSize={'xl'} px={'5'} />
        </Flex>
      </Flex>

      <Flex direction='row' width={windowWidth} bg={'white'} justifyContent={'space-evenly'}>
        <Pressable bg={usersColor} width={'20'} height={'8'} onPress={() => handleFilter('Users')}>
          <Center width={'20'} height={'8'}>
            <Text>Users</Text>
          </Center>
        </Pressable>
        <Pressable width={'20'} height={'8'} bg={tagsColor} onPress={() => handleFilter('Tags')}>
          <Center width={'20'} height={'8'}>
            <Text>Tags</Text>
          </Center>
        </Pressable>
        <Pressable width={'20'} height={'8'} bg={placesColor} onPress={() => handleFilter('Places')}>
          <Center width={'20'} height={'8'}>
            <Text>Places</Text>
          </Center>
        </Pressable>
      </Flex>

      <Box onTouchEnd={() => handleSearch(inputSearch)}>
        <Text>Search</Text>
      </Box>

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
