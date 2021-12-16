import React, {useState, useRef, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
  Keyboard,
  Alert,
} from 'react-native';
import {Input, NativeBaseProvider} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginStyles} from '../styles/login';
import {getUserForPhone} from '../api/ApiService';
import auth from '@react-native-firebase/auth';

const Validation = ({navigation}) => {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verification, setVerification] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  useEffect(() => {
    signInWithPhoneNumber();
  }, []);

  const handleRe = () => {
    signInWithPhoneNumber();
  };

  //+56 52 56 3491 5423
  const handleVerify = async () => {
    try {
      await confirm.confirm(code);

      const request = await AsyncStorage.getItem('phone');
      const response = await getUserForPhone(request);

      navigation.navigate('Home');
      Alert.alert('Sween', 'Autenticación correcta', [
        {
          text: 'Confirmar',
        },
      ]);
    } catch (e) {
      Alert.alert('Sween', 'Intenta de nuevo!', [
        {
          text: 'Confirmar',
        },
      ]);
    }
  };

  async function signInWithPhoneNumber(phoneNumber) {
    const number = await AsyncStorage.getItem('phone_ext');
    const confirmation = await auth().signInWithPhoneNumber(number);
    setConfirm(confirmation);
  }

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        style={loginStyles.mainContainer}
        behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={loginStyles.container}>
            <View style={loginStyles.inputsContainer}>
              <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
              <Text style={loginStyles.title2}>Autenticación cuenta</Text>
              <Text style={loginStyles.tit2}>
                Ingresa el código de verificación que te enviamos via SMS
              </Text>
              <Text style={loginStyles.titles}>CÓDIGO DE VERIFICACIÓN</Text>
              <Input
                keyboardType="phone-pad"
                clearButtonMode="while-editing"
                onChangeText={text => setCode(text)}
                defaultValue={code}
                maxLength={6}
              />
              <TouchableOpacity onPress={handleRe}>
                <Text style={loginStyles.button}>Enviar código</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={loginStyles.Verify}
                onPress={handleVerify}>
                <Text style={loginStyles.logInText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

export default Validation;
