import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

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
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Entypo
            name="menu"
            size={32}
            color="#929292"
            style={{ paddingVertical: 12, paddingRight: 13 }}
          />
        </TouchableOpacity>
      </View>
    </View>
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
