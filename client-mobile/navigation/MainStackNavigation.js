import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator();

export default function MainStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
