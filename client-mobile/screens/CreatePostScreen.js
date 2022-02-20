import React, { useState } from 'react';
import { Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Box, Center, Flex, Image, Input, Pressable, ScrollView, StatusBar, Text } from 'native-base';
import { Feather } from '@expo/vector-icons';


export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [place, setPlace] = useState('');
  const [foundPlaces, setFoundPlaces] = useState([]);
  const [pickedPlace, setPickedPlace] = useState('');
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  // Functions:
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (!image) {
        setImage([result.uri]);
      } else {
        setImage([...image, result.uri]);
      }
    }
  };
  const handleUploadPhoto = async () => {
    const SERVER_POSTS_URL = 'https://hacktiv8-instafood.herokuapp.com/posts';

    try {
      if (!image) return;
      if (!pickedPlace) return;

      // Upload the image using the fetch and FormData APIs
      let formData = new FormData();

      image.forEach(el => {
        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = el;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : 'image';

        // Assume "photo" is the name of the form field the server expects
        formData.append('images', { uri: localUri, name: filename, type });
        formData.append('place_id', pickedPlace.place.place_id)
      });

      await fetch(SERVER_POSTS_URL, {
        method: 'POST',
        body: formData,
        headers: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGYxMjFjZDUwNDBjNzM4MGZjN2RlYSIsImVtYWlsIjoidXNlci5vbmVAbWFpbC5jb20iLCJpYXQiOjE2NDUyNDg1MDN9.F6-_Rt1HeADDVfWR-c5mDdouBi5GZLFlhDC-t8GrV5U',
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject('something went wrong!');
          }
        })
        .then(response => {
          console.log('response', response);
        })
        .catch(error => {
          console.log('error', error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancelImage = imageUri => {
    let images = image.filter(el => el !== imageUri);

    if (images.length === 0) {
      setImage(null);
    } else {
      setImage(images);
    }
  };
  const handlePlaceInputChange = async (input) => {
    setPlace(input);
  }
  const handleSearchPlace = async () => {
    const SERVER_PLACES_URL = `https://hacktiv8-instafood.herokuapp.com/places?name=${place}`;

    setLoadingPlaces(true);

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
        setLoadingPlaces(false);
      })
      .catch(error => {
        console.log('error', error);
      });
  }
  const handlePickPlace = (placePick) => {
    setPickedPlace(placePick)
  }
  const handleClearPlaceSearch = () => {
    setPickedPlace('');
    setFoundPlaces([]);
    setPlace('');
  }

  // Components:
  const AddButton = () => {
    if (image) {
      if (image.length < 5) {
        return (
          <Center
            onTouchEnd={pickImage}
            bg={'blue.500'}
            height={'1/6'}
            borderBottomRadius={'lg'}
          >
            <Text color={'white'} fontWeight={'bold'} fontSize={'md'}>
              Add More
            </Text>
          </Center>
        );
      }

      return (
        <Center bg={'gray.500'} height={'1/6'} borderBottomRadius={'lg'}>
          <Text color={'white'} fontWeight={'bold'} fontSize={'md'}>
            Maximum Image Quantity
          </Text>
        </Center>
      );
    }

    return (
      <Center
        onTouchEnd={pickImage}
        bg={'blue.500'}
        height={'1/6'}
        borderBottomRadius={'lg'}
      >
        <Text color={'white'} fontWeight={'bold'} fontSize={'md'}>
          Add Image
        </Text>
      </Center>
    );
  };

  return (
    <Box flex={1} safeArea bg={'white'}>
      <StatusBar></StatusBar>
      <ScrollView>
        {/* Images */}
        <Box width={'full'} height={'80'} px={'4'} pt={'4'}>
          <Flex
            justifyContent={'space-between'}
            width={'full'}
            height={'full'}
            bg={'gray.100'}
            borderRadius={'lg'}
          >
            <Box height={'5/6'} p={'4'}>
              <Flex
                direction="row"
                wrap="wrap"
                alignItems={'center'}
                justifyContent={'center'}
                height={'full'}
              >
                {image ? (
                  image.map((el, i) => (
                    <Box key={i} mx={'2'} mt={'2'} shadow={'5'}>
                      <Center
                        onTouchEnd={() => handleCancelImage(el)}
                        position={'absolute'}
                        zIndex={10}
                        right={'0'}
                        size={'10'}
                      >
                        <Feather name="delete" size={24} color="white" />
                      </Center>
                      <Image
                        source={{ uri: el }}
                        width={100}
                        height={100}
                        borderRadius={'lg'}
                        alt={'alternate'}
                      />
                    </Box>
                  ))
                ) : (
                  <Center
                    bg={'gray.400'}
                    width={'80'}
                    height={'16'}
                    position={'absolute'}
                    top={'40%'}
                    borderRadius={'lg'}
                  >
                    <Text color={'white'} fontWeight={'bold'} fontSize={'md'}>
                      Pick an Image
                    </Text>
                  </Center>
                )}
              </Flex>
            </Box>
            <AddButton />
          </Flex>
        </Box>

        {/* Place Search */}
        {
          pickedPlace ? null : (
            <Box width={'full'} height={'20'} px={'4'} pt={'4'}>
              <Flex alignItems={'center'} direction='row' width={'full'} height={'full'} bg={'gray.100'} px="3" py={'2'} borderRadius={'lg'}>
                <Input onChangeText={handlePlaceInputChange} value={place} width={'5/6'} height={'5/6'}></Input>
                <Pressable onPress={handleSearchPlace} width={'1/6'} height={'5/6'} bg={'green.200'} _pressed={{
                  bg: 'green.300'
                }}>
                  <Center width={'full'} height={'full'}>
                    <Text>Search</Text>
                  </Center>
                </Pressable>
              </Flex>
            </Box>
          )
        }

        {/* Place List */}
        <Flex width={'full'} px={'4'} pt={'4'}>
          {
            pickedPlace ? (
              (
                <Flex direction='row' width={'full'} height={'20'} my={'2'} borderBottomWidth={'1'}>
                  <Center
                    onTouchEnd={() => handleClearPlaceSearch()}
                    position={'absolute'}
                    zIndex={10}
                    right={'0'}
                    size={'10'}
                  >
                    <Feather name="delete" size={24} color="black" />
                  </Center>
                  <Box>
                    <Image borderRadius={'lg'} width={'16'} height={'16'} source={{
                      uri: pickedPlace.photoRef
                    }} alt={'alternate'} />
                  </Box>
                  <Box ml={'4'} mt={'4'}>
                    <Text fontWeight={'bold'}>{pickedPlace.place.name}</Text>
                    <Text>{pickedPlace.place.address.slice(0, 50)}</Text>
                  </Box>
                </Flex >
              )
            ) : (
              foundPlaces.length > 0 && loadingPlaces === false ? foundPlaces.map((el, i) => {

                let photoRef = '';

                if (el.photo_reference) {
                  photoRef = `https://hacktiv8-instafood.herokuapp.com/places/photo?ref=${el.photo_reference}`;
                } else {
                  photoRef = el.icon
                }

                return (
                  <Pressable onPress={() => handlePickPlace({
                    photoRef, place: el
                  })} key={i} _pressed={{
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

              }) : (
                loadingPlaces ? (
                  <Flex alignItems={'center'} width={'full'} height={'20'}>
                    <Image resizeMode={'contain'} height={'20'} source={require('../assets/loading.gif')} alt={'alternate'} />
                  </Flex>
                ) : null
              )
            )
          }
        </Flex>

        {/* Caption */}
        <Box width={'full'} height={'32'} px={'4'} pt={'4'}>
          <Box width={'full'} height={'full'} bg={'gray.200'}></Box>
        </Box>

        {/* Tags */}
        <Box width={'full'} height={'20'} px={'4'} pt={'4'}>
          <Box width={'full'} height={'full'} bg={'gray.200'}></Box>
        </Box>
        <Button title="POST" onPress={handleUploadPhoto} />
      </ScrollView>
    </Box >
  );
}
