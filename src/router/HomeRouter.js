import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SessionContext from '../context/sessionContext';
import Home from '../screens/Home';

const Stack = createStackNavigator();

const HomeRouter = () => {
  return (
    <SessionContext>
      <Stack.Navigator
        headerMode="screen"
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </SessionContext>
  );
};

export default HomeRouter;
