import React from 'react';
import { Box, Center, Flex, Input, ScrollView, StatusBar, Text } from 'native-base';
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
        <Box w={'full'} bg={'blue.200'} h={'96'}></Box>
        <Box w={'full'} bg={'green.200'} h={'96'}></Box>
        <Box w={'full'} bg={'red.200'} h={'96'}></Box>
        <Box w={'full'} bg={'yellow.200'} h={'96'}></Box>
        <Box w={'full'} bg={'orange.200'} h={'96'}></Box>
        <Box w={'full'} bg={'pink.200'} h={'96'}></Box>
        <Box w={'full'} bg={'blue.200'} h={'96'}></Box>
      </ScrollView>
    </Box>
  );
}
