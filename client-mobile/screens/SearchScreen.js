import React from 'react';
import { Center, Flex, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function SearchScreen({ navigation }) {
  const textInputRef = React.useRef();

  const focusOnInput = e => {
    textInputRef.current.focus();
  };

  navigation.addListener('focus', focusOnInput);

  return (
    <Flex direction='row' pr={'5'} py={'3'} position={'relative'} bg={'white'}>
      <Center onTouchEnd={() => navigation.goBack()} px={'3'}>
        <Ionicons name='arrow-back' size={30} color='black' />
      </Center>
      <Flex direction={'row'} bg={'gray.100'} borderRadius={'xl'}>
        <Input ref={textInputRef} placeholder='Search' w={windowWidth / 1.18} borderWidth={'0'} fontSize={'xl'} px={'5'} />
      </Flex>
    </Flex>
  )
}
