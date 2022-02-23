import React, { useEffect, useState } from 'react'
import { Center, Pressable } from 'native-base'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PostButton() {
  const navigation = useNavigation();
  const { access_token } = useSelector((state) => state.user);
  const [token, setToken] = useState(null);

  const checkAccessToken = async () => {
    try {
      const tokenLocal = await AsyncStorage.getItem('access_token');

      setToken(tokenLocal);
    } catch (e) {
      return 'error reading access_token';
    }
  };

  useEffect(() => {
    checkAccessToken()
  }, [access_token])

  if (!token) {
    return null;
  }

  return (
    <Center onTouchEnd={() => {
      if (token) {
        navigation.navigate('CreatePostScreen')
      }
    }} position={'absolute'} right={'5'} bottom={'5'} size={'16'} borderRadius={'full'}>
      <Pressable _pressed={{
        bg: 'red.600'
      }} bg={'red.500'} borderRadius={'full'} size={'full'} shadow={'5'}>
        <Center size={'full'}>
          <AntDesign name="plus" size={30} color="white" />
        </Center>
      </Pressable>
    </Center>
  )
}
