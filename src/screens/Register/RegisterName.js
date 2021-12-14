import React, {useContext, useLayoutEffect, useState} from 'react';
import {GlobalRegisterContext} from '../../context/registerContext';
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StatusBar,
} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {registerNameStyles, registerErrorStyles} from '../../styles/register';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {headerButtonsStyles} from '../../styles/registerRoute';

const RegisterName = ({navigation}) => {
  const {registerState, RegisterActions, dispatchRegister} = useContext(
    GlobalRegisterContext,
  );

  const handleBack = () => navigation.goBack();
  const handleNext = () => {
    if (registerState.name === '') {
      return dispatchRegister(
        RegisterActions.registerError('Tu nombre no puede quedar vacío'),
      );
    } else if (
      registerState.lastName === '' ||
      registerState.lastName === undefined
    ) {
      return dispatchRegister(
        RegisterActions.registerError('Tu apellido no puede quedar vacío'),
      );
    }
    navigation.navigate('RegisterBirthday');
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

  const handleName = e => {
    if (e.trim().length === 0) {
      dispatchRegister(
        RegisterActions.registerError('Tu nombre no puede quedar vacío'),
      );
    } else {
      dispatchRegister(RegisterActions.registerError(''));
    }
    dispatchRegister(RegisterActions.registerName(e));
  };

  return (
    <KeyboardAvoidingView
      style={registerNameStyles.mainContainer}
      behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
        <View style={registerNameStyles.container}>
          <Text style={registerNameStyles.titles}>¿Cómo te llamas?</Text>
          <View style={registerNameStyles.inputsContainer}>
            <Text style={registerNameStyles.inputsTitle}>
              Nombre y Apellido
            </Text>
            <TextInput
              autoCorrect={false}
              keyboardType="default"
              clearButtonMode="while-editing"
              style={registerNameStyles.inputs}
              onChangeText={handleName}
              maxLength={35}
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

export default RegisterName;
