import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import {
  Button,
  FormControl,
  Input,
  Center,
  NativeBaseProvider,
  Modal,
  useDisclose,
  Actionsheet,
  Flex,
} from 'native-base';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Avatar, BottomSheet, ListItem} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalRegisterContext} from '../../context/registerContext';
import {headerButtonsStyles} from '../../styles/registerRoute';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import AWS from 'aws-sdk';
import RNFetchBlob from 'rn-fetch-blob';
import {registerUser} from '../../api/ApiService';
import ImagePicker from 'react-native-image-crop-picker';

import {
  registerImgStyles,
  registerNameStyles,
  registerUsernameStyles,
} from '../../styles/register';

const RegisterImg = ({navigation}) => {
  const {registerState, RegisterActions, dispatchRegister} = useContext(
    GlobalRegisterContext,
  );
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [savingState, setSavingState] = useState(false);
  const [resetState, setResetState] = useState(false);
  const [image, setImage] = useState('');
  const [imageTaken, setImageTaken] = useState(true);
  const [filePath, setFilePath] = useState(
    'http://74.208.30.241:9199/sween-profile/default.jpg',
  );

  const [filePathUpload, setFilePathUpload] = useState('');
  const [minioPath, setMinioPath] = useState('');
  const [showModal, setShowModal] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [localUri, setLocalUri] = useState('');

  const handleBack = () => navigation.goBack();

  const chooseFileCrop = async () => {
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
    }).then(image => {
      setLocalUri(image.path);
      setFilePath(image.path);
      setVar(image.path);
    });
  };

  const setVar = async val => {
    await AsyncStorage.setItem('urlProfile', val);
  };

  const cameraCrop = () => {
    ImagePicker.openCamera({
      width: 800,
      height: 800,
      cropping: false,
    }).then(image => {
      setLocalUri(image.path);
      setFilePath(image.path);
      setVar(image.path);
    });
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const handleNext = async () => {
    const value = await AsyncStorage.getItem('urlProfile');

    const base64 = await RNFS.readFile(value, 'base64');
    const fileName = `SWP-${registerState.username}.jpg`;

    const s3 = new AWS.S3({
      accessKeyId: 'minio',
      secretAccessKey: 'minio123',
      endpoint: 'http://74.208.30.241:9199',
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
    });

    try {
      const signedUrl = await s3.getSignedUrl('putObject', {
        Bucket: 'sween-profile',
        Key: fileName,
        ContentType: 'image/jpeg',
      });
      const upload = await RNFetchBlob.fetch(
        'PUT',
        signedUrl,
        {
          'Content-Type': 'image/jpeg',
        },
        RNFetchBlob.wrap(value),
      );

      setMinioPath(`http://74.208.30.241:9199/sween-profile/${fileName}`);
    } catch (error) {
      console.log('error', error);
    }

    const json = {
      userPublicName: registerState.username,
      userName: registerState.name,
      userLastName: registerState.lastName,
      userPhoneNumber: registerState.phone,
      userCountry: 'MX',
      email: registerState.email,
      birthday: registerState.birthday,
      imageurl: `http://74.208.30.241:9199/sween-profile/SWP-${registerState.username}.jpg`,
    };

    try {
      const response = await registerUser(json);
      if (response.data !== true) {
        return Alert.alert(
          'Hubo un error',
          ``,
          [
            {
              text: 'OK',
              onPress: () => {
                setResetState(true);
                dispatchRegister(RegisterActions.registerReset());
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        setSavingState(false);
        alert(
          `Bienvenido a Sween ${json.userName}, se han registrado tus datos...`,
        );
        setImageTaken(true);
        navigation.replace('Home');
      }
    } catch (error) {
      Alert.alert('Sween', 'Asegurate de tener una conexión a internet!', [
        {
          text: 'Confirmar',
        },
      ]);
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={headerButtonsStyles.buttons}
          onPress={handleBack}>
          <Icon name="arrow-back-ios" color="#0EADFF" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={headerButtonsStyles.buttons}
          onPress={handleNext}>
          <Icon name="arrow-forward-ios" color="#0EADFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const Example = () => {
    return (
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>Foto de Perfil</Text>
          <Flex direction="row" mb="2.5" mt="1.5">
            <TouchableOpacity
              onPress={() => {
                console.log('delete photo');
              }}>
              <Center marginRight="3">
                <Icon
                  reverse
                  reverseColor="#FFF"
                  name="trash"
                  type="ionicon"
                  color="#5DC7FE"
                />
                <Text
                  style={{
                    color: '#5DC7FE',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                  }}>
                  Eliminar
                </Text>
              </Center>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                cameraCrop();
              }}>
              <Center marginRight="3">
                <Icon
                  reverse
                  reverseColor="#FFF"
                  name="camera"
                  type="ionicon"
                  color="#5DC7FE"
                />
                <Text
                  style={{
                    color: '#5DC7FE',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                  }}>
                  Cámara
                </Text>
              </Center>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                chooseFileCrop();
              }}>
              <Center marginRight="3">
                <Icon
                  reverse
                  reverseColor="#FFF"
                  name="image"
                  type="ionicon"
                  color="#5DC7FE"
                />
              </Center>
              <Text
                style={{
                  color: '#5DC7FE',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                Galería
              </Text>
            </TouchableOpacity>
          </Flex>
        </Actionsheet.Content>
      </Actionsheet>
    );
  };

  const cleanAsyncProfileUrl = async () => {
    await AsyncStorage.removeItem('urlProfile');
  };

  useEffect(() => {
    requestCameraPermission();
    requestExternalWritePermission();
    cleanAsyncProfileUrl();
  }, []);

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        style={registerNameStyles.mainContainer}
        behavior="padding">
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
        <View style={registerNameStyles.container}>
          <View style={registerImgStyles.containerAvatar}>
            <Avatar
              rounded
              size={175}
              source={{
                uri: filePath,
              }}>
              <Avatar.Accessory
                name="camera"
                type="font-awesome-5"
                size={20}
                style={registerImgStyles.avatarAccesory}
                onPress={() => {
                  onOpen();
                }}
              />
            </Avatar>
          </View>
          <View style={{marginBottom: 10}}>
            <Text
              style={{fontSize: 25, fontWeight: '400', alignSelf: 'center'}}>
              {registerState.username}
            </Text>
          </View>
          <Text style={registerNameStyles.titles}>
            Elige una foto de perfil
          </Text>
          <Text style={registerUsernameStyles.tip}>
            Por tu foto de perfil es como tus amigos te pueden reconocer en
            Sween
          </Text>
        </View>
        <Example />
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

export default RegisterImg;
