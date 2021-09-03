import React, { useState, useRef, useEffect } from 'react';
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
import { Input, NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config.js';
import { loginStyles } from '../styles/login';
import { getUserForPhone } from '../api/ApiService';

const Validation = ({ navigation }) => {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [coding, setCoding] = useState('');
  const [verification, setVerification] = useState('');

  useEffect(() => {
    signInWithPhoneNumber();
  }, []);

  const handleRe = () => {
    signInWithPhoneNumber();
  };

  const handleVerify = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verification,
        coding.toString()
      );

      await firebase.auth().signInWithCredential(credential);
      const request = await AsyncStorage.getItem('phone');

      const response = await getUserForPhone(request);

      const rp = response.data;

      const json = {
        userPublicId: rp?.userPublicId,
        userPublicName: rp?.userPublicName,
        userName: rp?.userName,
        userLastName: rp?.userLastName,
        userPhoneNumber: rp?.userPhoneNumber,
        userCountry: 'MX',
        email: rp?.email,
        birthday: rp?.birthday,
      };

      await AsyncStorage.setItem('userInfo', JSON.stringify(json));
      await AsyncStorage.setItem('userImage', rp.imageurl);
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

  const signInWithPhoneNumber = async () => {
    try {
      const number = await AsyncStorage.getItem('phone_ext');
      setPhoneNumber(number);
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const response = await phoneProvider.verifyPhoneNumber(
        number,
        recaptchaVerifier.current
      );
      setVerification(response.toString());
      alert('Hemos enviado tu código');
    } catch (e) {
      Alert.alert('Sween', e, [
        {
          text: 'Confirmar',
        },
      ]);
    }
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        style={loginStyles.mainContainer}
        behavior="padding"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={loginStyles.container}>
            <View style={loginStyles.inputsContainer}>
              <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
              <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
              />
              <Text style={loginStyles.title2}>Autenticación cuenta</Text>
              <Text style={loginStyles.tit2}>
                Ingresa el código de verificación que te enviamos via SMS
              </Text>
              <Text style={loginStyles.titles}>CÓDIGO DE VERIFICACIÓN</Text>
              <Input
                keyboardType="phone-pad"
                clearButtonMode="while-editing"
                onChangeText={text => setCoding(text)}
                defaultValue={coding}
                maxLength={6}
              />
              <TouchableOpacity onPress={handleRe}>
                <Text style={loginStyles.button}>Enviar código</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={loginStyles.Verify}
                onPress={handleVerify}
              >
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
