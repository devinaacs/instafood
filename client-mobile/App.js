import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigation from './navigation/MainStackNavigation';
import { MenuProvider } from 'react-native-popup-menu';
import { LinearGradient } from 'expo-linear-gradient';
import DrawerNavigator from './navigation/DrawerNavigator';
import { Provider } from 'react-redux';
import store from './store/store';

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

export default function App() {
  return (
    <NativeBaseProvider config={config}>
      <SafeAreaProvider>
        <Provider store={store}>
          <MenuProvider>
            <NavigationContainer>
              {/* <MainStackNavigation /> */}
              <DrawerNavigator />
            </NavigationContainer>
          </MenuProvider>
        </Provider>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
