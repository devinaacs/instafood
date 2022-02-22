import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import CreatePostScreen from '../screens/CreatePostScreen';
import SearchScreen from '../screens/SearchScreen';
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import PlaceDetail from '../screens/PlaceDetail';
import CommentSection from '../screens/CommentSection';

const Stack = createNativeStackNavigator();

export default function MainStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CommentSection"
        component={CommentSection}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
