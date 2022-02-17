import React from 'react';
import { Box, Center, Flex, Image, Input, ScrollView, StatusBar, Text } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

export default function Discover() {
  return (
    <Box bg={'white'} flex={1} safeAreaTop>
      <StatusBar />
      <Box px={'3'} py={'3'}>
        <Flex direction={'row'} bg={'gray.100'} borderRadius={'xl'}>
          <Center px={'3'}>
            <AntDesign name="search1" size={24} color="black" />
          </Center>
          <Input placeholder="Search" w={'full'} borderWidth={'0'} fontSize={'xl'} />
        </Flex>
      </Box>
      <ScrollView>
        <Box w={'full'} maxHeight={700}>
          <Box p={'3'} w={'full'}>
            <Text fontSize={'xl'}>Jakarta</Text>
          </Box>
          <Image
            width={'full'}
            height={'full'}
            resizeMode={'cover'}
            source={{
              uri: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
            }}
            alt={'alternate picture'}
          />
        </Box>
      </ScrollView>
    </Box>
  );
}
