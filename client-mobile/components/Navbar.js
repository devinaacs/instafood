import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function Navbar() {
  return (
    <ScrollView>
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
          <TouchableOpacity>
            <Entypo
              name="heart-outlined"
              size={24}
              color="#9F9F9F"
              style={{ paddingVertical: 17, paddingHorizontal: 13 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo
              name="menu"
              size={24}
              color="#9F9F9F"
              style={{ paddingVertical: 15, paddingRight: 13 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  nav: {
    flex: 1,
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
