import React, { useState } from 'react';
import { Button, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Box, Center, Flex, Image, StatusBar, Text } from 'native-base';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';

const SERVER_URL = 'https://hacktiv8-instafood.herokuapp.com/posts'

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

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
        setImage([...image, result.uri])
      }
    }
  };

  const handleUploadPhoto = async () => {
    try {
      if (!image) return;

      // Upload the image using the fetch and FormData APIs
      let formData = new FormData();

      image.forEach((el) => {
        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = el;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Assume "photo" is the name of the form field the server expects
        formData.append('images', { uri: localUri, name: filename, type });
      })

      console.log(formData);

      await fetch(SERVER_URL, {
        method: 'POST',
        body: formData,
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGYxMjFjZDUwNDBjNzM4MGZjN2RlYSIsImVtYWlsIjoidXNlci5vbmVAbWFpbC5jb20iLCJpYXQiOjE2NDUyNDg1MDN9.F6-_Rt1HeADDVfWR-c5mDdouBi5GZLFlhDC-t8GrV5U'
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            return Promise.reject('something went wrong!')
          }
        })
        .then((response) => {
          console.log('response', response);
        })
        .catch((error) => {
          console.log('error', error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelImage = (imageUri) => {
    console.log(image)
    let images = image.filter((el) => el !== imageUri);

    if (images.length === 0) {
      setImage(null)
    } else {
      setImage(images)
    }

  }

  const AddButton = () => {
    if (image) {
      if (image.length < 5) {
        return (
          <Center onTouchEnd={pickImage} bg={'blue.500'} height={'1/6'} borderBottomRadius={'lg'}><Text color={'white'} fontWeight={'bold'} fontSize={'md'}>Add More</Text></Center>
        )
      }

      return <Center bg={'gray.500'} height={'1/6'} borderBottomRadius={'lg'}><Text color={'white'} fontWeight={'bold'} fontSize={'md'}>Maximum Image Quantity</Text></Center>;
    }

    return <Center onTouchEnd={pickImage} bg={'blue.500'} height={'1/6'} borderBottomRadius={'lg'}><Text color={'white'} fontWeight={'bold'} fontSize={'md'}>Add Image</Text></Center>;
  }

  return (
    <Box flex={1} safeArea bg={'white'}>
      <StatusBar></StatusBar>
      {/* Images */}
      <Box width={'full'} height={'80'} px={'4'} pt={'4'}>
        <Flex justifyContent={'space-between'} width={'full'} height={'full'} bg={'gray.200'} borderRadius={'lg'}>
          <Box height={'5/6'} p={'4'}>
            <Flex direction='row' wrap='wrap' alignItems={'center'} justifyContent={'center'} height={'full'}>
              {
                image ? image.map((el, i) => (
                  <Box key={i} mx={'2'} mt={'2'} shadow={'5'}>
                    <Center onTouchEnd={() => handleCancelImage(el)} position={'absolute'} zIndex={10} right={'0'} size={'10'}>
                      <Feather name="delete" size={24} color="white" />
                    </Center>
                    <Image source={{ uri: el }} width={100} height={100} borderRadius={'lg'} alt={'alternate'} />
                  </Box>
                )) : (
                  <Center bg={'gray.400'} width={'80'} height={'16'} position={'absolute'} top={"40%"} borderRadius={'lg'}>
                    <Text color={'white'} fontWeight={'bold'} fontSize={'md'}>Pick an Image</Text>
                  </Center>
                )
              }
            </Flex>
          </Box>
          <AddButton />
        </Flex>
      </Box>

      {/* Place Search */}
      <Box width={'full'} height={'20'} px={'4'} pt={'4'}>
        <Box width={'full'} height={'full'} bg={'gray.200'}>

        </Box>
      </Box>

      {/* Caption */}
      <Box width={'full'} height={'32'} px={'4'} pt={'4'}>
        <Box width={'full'} height={'full'} bg={'gray.200'}>

        </Box>
      </Box>

      {/* Tags */}
      <Box width={'full'} height={'20'} px={'4'} pt={'4'}>
        <Box width={'full'} height={'full'} bg={'gray.200'}>

        </Box>
      </Box>
      <Button title="POST" onPress={handleUploadPhoto} />
    </Box>
  );
}