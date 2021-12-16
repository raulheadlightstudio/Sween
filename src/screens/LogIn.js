import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Select,
  CheckIcon,
  NativeBaseProvider,
  extendTheme,
  HStack,
  Stack,
} from 'native-base';
import {loginStyles} from '../styles/login';
import {registerErrorStyles} from '../styles/register';
import {getUserForPhone} from '../api/ApiService';

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

const LogIn = ({navigation}) => {
  const [logState, setLogState] = useState({
    phone: '',
  });
  const [errorState, setErrorState] = useState({
    name: '',
  });

  const [ext, setExt] = useState('');

  const handlePhone = e => {
    if (e.length === 0) {
      setErrorState(
        Object.assign({}, errorState, {
          name: 'Por favor, Introduce un número telefónico válido',
        }),
      );
    } else {
      setErrorState(Object.assign({}, errorState, {name: ''}));
    }
    setLogState(Object.assign({}, logState, {phone: e}));
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const lenghtObject = () => {
    var element_count = 0;
    for (var e in myArray) if (myArray.hasOwnProperty(e)) element_count++;
  };

  const handleLogIn = async () => {
    if (logState.phone.length > 9) {
      await AsyncStorage.setItem('phone_ext', ext + logState.phone);
      console.log('setted', ext + logState.phone);
    } else {
      Alert.alert('Sween', 'Por favor ingresa 10 digitos válidos', [
        {
          text: 'Confirmar',
        },
      ]);
    }

    try {
      await AsyncStorage.setItem('phone', logState.phone);
      const response = await getUserForPhone(logState.phone);
      const rp = response.data;
      console.log('rpprprprprpr', response.data);
      const {birthday} = response.data;
      if (birthday === undefined) {
        Alert.alert('Sween', 'Eres nuevo por aqui? Registrate', [
          {
            text: 'Confirmar',
          },
        ]);
      } else {
        navigation.navigate('Validation');
      }
    } catch (ex) {
      Alert.alert('Sween', 'Asegurate de estar conectado a una red', [
        {
          text: 'Confirmar',
        },
      ]);
    }
  };

  return (
    <NativeBaseProvider theme={theme}>
      <KeyboardAvoidingView
        style={loginStyles.mainContainer}
        behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={loginStyles.container}>
            <View style={loginStyles.inputsContainer}>
              <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
              <Text style={loginStyles.title}>Inicia sesión</Text>
              <Text style={loginStyles.tit}>
                Si tienes una cuenta ingresa tus datos o crea una nueva
              </Text>
              <Text style={loginStyles.titles}>Nombre de Usuario o Movil</Text>
              <Stack space={2} alignItems="center">
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
                    maxLength={10}
                  />
                </HStack>
              </Stack>
              {errorState.name !== '' && (
                <Text style={registerErrorStyles.text}>{errorState.name}</Text>
              )}
              <TouchableOpacity onPress={handleRegister}>
                <Text style={loginStyles.button}>Regístrate</Text>
              </TouchableOpacity>
            </View>
            <View style={loginStyles.shadowButton}>
              <TouchableOpacity
                style={loginStyles.logIn}
                onPress={handleLogIn}
                activeOpacity={0.75}>
                <Text style={loginStyles.logInText}>Iniciar Sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

export default LogIn;
