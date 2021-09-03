import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import LogIn from './src/screens/LogIn';
import RegisterRouter from './src/router/RegisterRouter';
import HomeRouter from './src/router/HomeRouter';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Validation from './src/screens/Validation';
import firebase from 'firebase';
import { firebaseConfig } from './src/config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const Stack = createStackNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    'Metropolis-Regular': require('./assets/fonts/Metropolis-Regular.otf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Home" component={HomeRouter} />
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="Validation" component={Validation} />
            <Stack.Screen name="Register" component={RegisterRouter} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
