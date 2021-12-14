import React, {useContext, useLayoutEffect, useState} from 'react';
import {GlobalRegisterContext} from '../../context/registerContext';
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StatusBar
} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  registerErrorStyles,
  registerNameStyles,
  registerPhoneStyles,
  registerUsernameStyles,
} from '../../styles/register';
import {headerButtonsStyles} from '../../styles/registerRoute';
import {getUserForNick} from '../../api/ApiService';

const RegisterUsername = ({navigation}) => {
  const {registerState, RegisterActions, dispatchRegister} = useContext(
    GlobalRegisterContext,
  );

  const handleBack = () => navigation.goBack();
  const handleNext = async () => {
    if (registerState.username === '') {
      return dispatchRegister(
        RegisterActions.registerError(
          'Tu nombre de usuario no puede quedar vacío',
        ),
      );
    }

    try {
      const response = await getUserForNick(registerState.username);
      const rp = response.data;
      if (rp.data[0]) {
        return dispatchRegister(
          RegisterActions.registerError('Tu nombre no esta disponible'),
        );
      }
    } catch (ex) {
      console.log(ex);
      return dispatchRegister(
        RegisterActions.registerError('Algo salio mal...'),
      );
    }

    navigation.navigate('RegisterImg');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={headerButtonsStyles.buttons}
          onPress={handleNext}>
          <Icon name="arrow-forward-ios" color="#0EADFF" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={headerButtonsStyles.buttons}
          onPress={handleBack}>
          <Icon name="arrow-back-ios" color="#0EADFF" />
        </TouchableOpacity>
      ),
    });
  });

  const handleUsername = e => {
    if (e.length === 0) {
      dispatchRegister(
        RegisterActions.registerError(
          'Tu nombre de usuario no puede quedar vacío',
        ),
      );
    } else {
      dispatchRegister(RegisterActions.registerError(''));
    }
    dispatchRegister(RegisterActions.registerUsername(e));
  };

  return (
    <KeyboardAvoidingView
      style={registerNameStyles.mainContainer}
      behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
        <View style={registerNameStyles.container}>
          <Text style={registerNameStyles.titles}>
            Elige un nombre de usuario
          </Text>
          <Text style={registerUsernameStyles.tip}>
            Por tu nombre de usuario es como tus amigos te pueden encontrar en
            Sween
          </Text>
          <View style={registerNameStyles.inputsContainer}>
            <Text style={registerNameStyles.inputsTitle}>
              NOMBRE DE USUARIO
            </Text>
            <TextInput
              autoCorrect={false}
              keyboardType="default"
              clearButtonMode="while-editing"
              style={registerNameStyles.inputs}
              onChangeText={handleUsername}
              autoCapitalize="none"
            />
            {registerState.error !== '' && (
              <Text style={registerErrorStyles.text}>
                {registerState.error}
              </Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterUsername;
