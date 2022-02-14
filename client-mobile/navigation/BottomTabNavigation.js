import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Highlights from "../screens/Highlights";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Highlights') {
            iconName = focused ? 'home' : 'home-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF1F00',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name='Highlights'
        component={Highlights}
        options={{
          headerShown: false
        }}
      />

    </Tab.Navigator>
  );
}
