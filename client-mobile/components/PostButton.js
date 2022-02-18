import React from 'react'
import { Box, Text, Circle, Center, Pressable } from 'native-base'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PostButton() {
  const navigation = useNavigation();

  return (
    <Center onTouchEnd={() => navigation.navigate('CreatePostScreen')} position={'absolute'} right={'5'} bottom={'5'} size={'16'} borderRadius={'full'}>
      <Pressable _pressed={{
        bg: 'red.700'
      }} bg={'red.600'} borderRadius={'full'} size={'full'}>
        <Center size={'full'}>
          <AntDesign name="plus" size={30} color="white" />
        </Center>
      </Pressable>
    </Center>
  )
}
