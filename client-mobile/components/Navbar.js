import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default function Navbar() {
  const navigation = useNavigation();
  return (
    <View style={styles.nav}>
      <View>
        <Image
          source={require('../assets/logo_black.png')}
          style={{
            width: 140,
            height: 54,
            resizeMode: 'contain',
            marginLeft: 10,
          }}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        {/* <TouchableOpacity>
          <Entypo
            name="heart-outlined"
            size={31}
            color="#929292"
            style={{ paddingVertical: 13, paddingHorizontal: 13 }}
          />
        </TouchableOpacity> */}
        <TouchableOpacity>
          <Menu>
            <MenuTrigger>
              <Entypo
                name="menu"
                size={32}
                color="#929292"
                style={{ paddingVertical: 12, paddingRight: 13 }}
              /></MenuTrigger>
            <MenuOptions optionsContainerStyle={{ marginTop: 45, marginLeft: -21 }} >
              <MenuOption onSelect={() => navigation.navigate('Highlights')}>
              <Text style={{ color: 'black' , padding: 10}}>Highlights</Text>
              </MenuOption>
              <MenuOption onSelect={() => navigation.navigate('Discover')} >
                <Text style={{ color: 'black', padding: 10 }}>Discover</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </TouchableOpacity>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: 'white',
    width: '100%',
    height: 63,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E7E7E7',
  },
  nav_text: {
    padding: 15,
    fontWeight: 'bold',
    color: '#03B200',
    fontSize: 16,
  },
});
