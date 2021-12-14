import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterName from '../screens/Register/RegisterName';
import {headerStyles} from '../styles/registerRoute';
import RegisterContext from '../context/registerContext';
import RegisterBirthday from '../screens/Register/RegisterBirthday';
import RegisterEmail from '../screens/Register/RegisterEmail';
import RegisterPhone from '../screens/Register/RegisterPhone';
import RegisterUsername from '../screens/Register/RegisterUsername';
import RegisterImg from '../screens/Register/RegisterImg';

const Stack = createStackNavigator();

const RegisterRouter = () => {
  return (
    <RegisterContext>
      <Stack.Navigator screenOptions={{...headerStyles}}>
        <Stack.Screen name="RegisterName" component={RegisterName} />
        <Stack.Screen name="RegisterBirthday" component={RegisterBirthday} />
        <Stack.Screen name="RegisterPhone" component={RegisterPhone} />
        <Stack.Screen name="RegisterEmail" component={RegisterEmail} />
        <Stack.Screen name="RegisterUsername" component={RegisterUsername} />
        <Stack.Screen name="RegisterImg" component={RegisterImg} />
      </Stack.Navigator>
    </RegisterContext>
  );
};

export default RegisterRouter;
