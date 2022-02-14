import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigation from './navigation/MainStackNavigation';

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <MainStackNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
