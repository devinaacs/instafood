import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigation from './navigation/MainStackNavigation';
import { MenuProvider } from 'react-native-popup-menu';
import { LinearGradient } from 'expo-linear-gradient';
import DrawerNavigator from './navigation/DrawerNavigator';
import { Provider } from 'react-redux';
import store from './store/store';
import { LogBox } from 'react-native';

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

export default function App() {
  LogBox.ignoreLogs(["Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function."]);
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
