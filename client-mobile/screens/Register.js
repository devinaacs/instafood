import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Icon, Stack, Center, Text, Button } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const windowHeight = Dimensions.get('window').height;

export default function Register() {
  const navigation = useNavigation();
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/register_pic.png')}
        style={{
          width: 200,
          height: 200,
          resizeMode: 'contain',
          alignSelf: 'center',
          marginVertical: 24
        }}
      />
      <Stack space={6} w='100%' alignItems='center'>
        <Input
          borderWidth={2} borderColor='muted.300' borderRadius='xl'
          w={{ base: '80%', md: '20%' }}
          InputLeftElement={<Icon as={<MaterialIcons name='email' />} size={6} ml='2' color='muted.500' />} placeholder='email address' />
           <Input
          borderWidth={2} borderColor='muted.300' borderRadius='xl'
          w={{ base: '80%', md: '20%' }}
          InputLeftElement={<Icon as={<MaterialIcons name='person' />} size={6} ml='2' color='muted.500' />} placeholder='username' />
        <Input
          borderWidth={2} borderColor='muted.300' borderRadius='xl'
          type={show ? 'text' : 'password'} w={{ base: '80%', md: '20%' }}
          InputRightElement={<Icon as={<MaterialIcons name='visibility-off' onPress={handleClick} />} size={6} mr='2' color='muted.500' />} placeholder='Password' />
        <Button colorScheme='blue' w={{ base: '80%', md: '20%' }} h={12} borderRadius='lg'>
          <Text fontWeight="bold" color={'white'} fontSize={17}>Register</Text>
        </Button>
      </Stack>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, flexDirection: 'row' }}>
        <Text style={{ fontSize: 15 }}>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Sign in.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: windowHeight,
    justifyContent: 'center',
    paddingBottom: windowHeight / 5.5
  },
});
