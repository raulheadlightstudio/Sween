import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterContext from '../context/registerContext';
import RegisterName from '../screens/Register/RegisterName';
import RegisterBirthday from '../screens/Register/RegisterBirthday';
import RegisterPhone from '../screens/Register/RegisterPhone';
import RegisterUsername from '../screens/Register/RegisterUsername';
import RegisterImg from '../screens/Register/RegisterImg';
import { headerStyles } from '../styles/registerRoute';
import RegisterEmail from '../screens/Register/RegisterEmail';

const Stack = createStackNavigator();

const RegisterRouter = ({ navigation }) => {
  return (
    <RegisterContext>
      <Stack.Navigator screenOptions={{ ...headerStyles }}>
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
