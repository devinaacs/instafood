import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import Highlights from '../screens/Highlights';

const Stack = createNativeStackNavigator();

export default function MainStackNavigation () {
  return (
    <Stack.Navigator>
    <Stack.Screen name='BottomTabNavigation' component={BottomTabNavigation} options={{headerShown: false}}/>
    <Stack.Screen name='Highlights' component={Highlights} options={{ headerShown: false }} />
  </Stack.Navigator>
  )
}