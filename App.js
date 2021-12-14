import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterRouter from './src/router/RegisterRouter';
import HomeRouter from './src/router/HomeRouter';
import LogIn from './src/screens/LogIn';
import Validation from './src/screens/Validation';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="Home" component={HomeRouter} />
            <Stack.Screen name="Register" component={RegisterRouter} />
            <Stack.Screen name="Validation" component={Validation} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
