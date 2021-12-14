import React, {useContext, useLayoutEffect} from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  View,
  TextInput,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {GlobalRegisterContext} from '../../context/registerContext';
import {
  registerErrorStyles,
  registerNameStyles,
  registerPhoneStyles,
} from '../../styles/register';
import {headerButtonsStyles} from '../../styles/registerRoute';

const RegisterEmail = ({navigation}) => {
  const {registerState, RegisterActions, dispatchRegister} = useContext(
    GlobalRegisterContext,
  );

  const handleBack = () => navigation.goBack();
  const handleNext = () => {
    if (registerState.email.length === 0) {
      return dispatchRegister(
        RegisterActions.registerError('Tu email no puede ser registrado'),
      );
    }
    navigation.navigate('RegisterUsername');
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

  const handleEmail = e => {
    if (e.length === 0) {
      dispatchRegister(
        RegisterActions.registerError('Tu email no puede quedar vacío!!!'),
      );
    } else {
      dispatchRegister(RegisterActions.registerError(''));
      dispatchRegister(RegisterActions.registerEmail(e));
    }
  };

  const validateEmail = email => {
    var regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(email);
  };

  return (
    <KeyboardAvoidingView
      style={registerPhoneStyles.mainContainer}
      behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
        <View style={registerPhoneStyles.container}>
          <Text style={registerPhoneStyles.titles}>¿Cuál es tu email?</Text>
          <View style={registerPhoneStyles.inputsContainer}>
            <Text style={registerPhoneStyles.inputsTitle}>Email</Text>
            <View>
              <TextInput
                autoCorrect={false}
                keyboardType="email-address"
                clearButtonMode="while-editing"
                style={registerNameStyles.inputs}
                onChangeText={handleEmail}
                autoCapitalize={'none'}
                maxLength={30}
              />
            </View>
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

export default RegisterEmail;
