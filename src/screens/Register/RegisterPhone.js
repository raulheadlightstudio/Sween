import React, {useContext, useLayoutEffect, useRef, useState} from 'react';
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
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {GlobalRegisterContext} from '../../context/registerContext';
import {loginStyles} from '../../styles/login';
import {registerErrorStyles, registerPhoneStyles} from '../../styles/register';
import {headerButtonsStyles} from '../../styles/registerRoute';
import {
  Select,
  CheckIcon,
  NativeBaseProvider,
  extendTheme,
  HStack,
  Stack,
} from 'native-base';
import {getUserForPhone} from '../../api/ApiService';

const theme = extendTheme({
  components: {
    Select: {
      baseStyle: {
        width: 10,
      },
      defaultProps: {},
      variants: {},
      sizes: {},
    },
  },
});

const RegisterPhone = ({navigation}) => {
  const {registerState, RegisterActions, dispatchRegister} = useContext(
    GlobalRegisterContext,
  );
  const [ext, setExt] = useState('');

  const handleBack = () => navigation.goBack();
  const handleNext = async () => {
    if (registerState.phone === '') {
      console.log('Entro a handleNext', registerState.phone);

      return dispatchRegister(
        RegisterActions.registerError('Tu número móvil no puede quedar vacío'),
      );
    }

    try {
      const response = await getUserForPhone(registerState.phone);
      const rp = response.data;

      if (rp.data != null) {
        return dispatchRegister(
          RegisterActions.registerError('Este número ya esta registrado'),
        );
      }
    } catch (ex) {
      console.log(ex);
      return dispatchRegister(
        RegisterActions.registerError('Algo salio mal...'),
      );
    }

    navigation.navigate('RegisterEmail');
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

  const handlePhone = e => {
    if (e.length === 0) {
      dispatchRegister(
        RegisterActions.registerError('Tu número móvil no puede quedar vacío'),
      );
    } else {
      dispatchRegister(RegisterActions.registerError(''));
    }
    dispatchRegister(RegisterActions.registerPhone(e));
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        style={registerPhoneStyles.mainContainer}
        behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
          <View style={registerPhoneStyles.container}>
            <Text style={registerPhoneStyles.titles}>
              ¿Cuál es tu número de móvil?
            </Text>
            <View style={registerPhoneStyles.inputsContainer}>
              <Text style={registerPhoneStyles.inputsTitle}>MÓVIL</Text>
              <View>
                <Stack>
                  <HStack space={2} alignItems="center">
                    <Select
                      selectedValue={ext}
                      minWidth={20}
                      accessibilityLabel="+1"
                      placeholder="+1"
                      onValueChange={itemValue => setExt(itemValue)}
                      _selectedItem={{
                        bg: 'cyan.600',
                        endIcon: <CheckIcon size={3} />,
                      }}>
                      <Select.Item label="+1" value="+1" />
                      <Select.Item label="+52" value="+52" />
                      <Select.Item label="+57" value="+57" />
                    </Select>
                    <TextInput
                      autoCorrect={false}
                      autoCapitalize="none"
                      keyboardType="phone-pad"
                      clearButtonMode="while-editing"
                      style={loginStyles.inputs}
                      onChangeText={handlePhone}
                      minWidth={200}
                    />
                  </HStack>
                </Stack>
              </View>
              <Text style={registerPhoneStyles.tip}>
                Te enviaremos un código de verificación por SMS.
              </Text>
              {registerState.error !== '' && (
                <Text style={registerErrorStyles.text}>
                  {registerState.error}
                </Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

export default RegisterPhone;
