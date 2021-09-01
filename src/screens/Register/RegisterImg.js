import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';
import {
  KeyboardAvoidingView,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalRegisterContext } from '../../context/registerContext';
import { headerButtonsStyles } from '../../styles/registerRoute';
import CameraView from '../../components/Camera/CameraView';
import CameraPreview from '../../components/Camera/CameraPreview';
import { registerUser } from '../../api/ApiService';
import {
  registerImgStyles,
  registerNameStyles,
  registerUsernameStyles,
} from '../../styles/register';

const RegisterImg = ({ navigation }) => {
  const { registerState, RegisterActions, dispatchRegister } = useContext(
    GlobalRegisterContext
  );
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [savingState, setSavingState] = useState(false);
  const [resetState, setResetState] = useState(false);
  const [image, setImage] = useState('');
  const [imageTaken, setImageTaken] = useState(true);

  const handleBack = () => navigation.goBack();

  const handleNext = async () => {
    //Validar si se tomo la foto o no
    // if (registerState.photo === '') {
    //   return dispatchRegister(
    //     RegisterActions.registerError('Tu imagen no puede quedar vacía')
    //   );
    // }
    // dispatchRegister(RegisterActions.registerError(''));

    const json = {
      userPublicName: registerState.username,
      userName: registerState.name,
      userLastName: registerState.lastName,
      userPhoneNumber: registerState.phone,
      userCountry: 'MX',
      email: registerState.email,
      birthday: registerState.birthday,
      imageurl: await AsyncStorage.getItem('img'),
      // imageurl: registerState.photo,
    };

    // console.log('Response', JSON.stringify(json, null, 4)); //

    try {
      const response = await registerUser(json);
      // console.log(response);

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
          { cancelable: false }
        );
      } else {
        setSavingState(false);
        alert(
          `Bienvenido a sween ${json.userName}, se hah registrado tus datos...`
        );
        setImageTaken(true);
        removeItemValue('img');
        navigation.replace('Home');
      }
    } catch (error) {
      alert('Asegurate de tener una conexión a internet!');
      console.log(error);
    }
  };

  const handlePermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    {
      status === 'granted'
        ? setHasPermission(true)
        : alert('Asegurate de darle los permisos adecuados');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={headerButtonsStyles.buttons}
          onPress={handleBack}
        >
          <Icon name="arrow-back-ios" color="#0EADFF" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={headerButtonsStyles.buttons}
          onPress={handleNext}
        >
          <Icon name="arrow-forward-ios" color="#0EADFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    if (hasPermission === true || previewVisible === true) {
      navigation.setOptions({
        headerShown: false,
      });
    } else {
      navigation.setOptions({
        headerShown: true,
      });
    }
  }, [hasPermission]);

  useEffect(() => {
    handleImage();
  }, [image]);

  const handleImage = async () => {
    setImage(await AsyncStorage.getItem('img'));
  };

  useEffect(() => {
    if (savingState) {
      // handleNext();
    }
  }, [registerState.photo]);

  useEffect(() => {
    if (resetState) {
      navigation.replace('Register');
    }
  }, [registerState]);

  const dispatchPhoto = async base64 => {
    // dispatchRegister(RegisterActions.registerPhoto(base64));
    await AsyncStorage.setItem('img', base64);
  };

  const handleDecodeImage = base64 => {
    const base = 'data:image/jpeg;base64,';
    if (base64 === '') {
      let imageDecoded = null;
      imageDecoded =
        'https://res.cloudinary.com/dslc2vjcz/image/upload/v1627574434/IAFOR-Blank-Avatar-Image-1_bo2yr5.jpg';
      return imageDecoded;
    } else {
      const imageDecoded = `${base}${base64}`;
      return imageDecoded;
    }
  };

  const handleConvert = async ({ height, width, uri }) => {
    // const { height, width, uri } = capturedImage;
    // console.log(photo)
    // console.log(typeof uri);
    // console.log('uri', uri);
    // console.log('capturedImagecapturedImagecapturedImage', capturedImage);
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 500, height: 500 } }],
        { compress: 0.5, base64: true }
      );
      const { base64 } = manipResult;

      // const base64 = await FileSystem.readAsStringAsync(uri, {
      //   encoding: FileSystem.EncodingType.Base64,
      //   length: 100,
      // });
      // console.log('Convertido a base 64');
      // console.log('Tamano', base64.length);

      handleDecodeImage(base64);
      dispatchPhoto(base64);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemValue = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  };

  const handleSave = capturedImage => {
    setSavingState(true);
    // console.log('Entrando al handleSave', capturedImage);
    handleConvert(capturedImage);

    navigation.replace('RegisterImg');

    // setHasPermission(false);
    // console.log('setHasPermission', setHasPermission);
  };

  if (hasPermission) {
    //capturedImage obj{height,uri,width}
    // console.log('Se obtubieron permisos:', hasPermission);
    // console.log('previewVisible', previewVisible);
    // console.log('capturedImage', capturedImage);

    // if (capturedImage) {
    //   handleSave(capturedImage);
    //   console.log('Se tomo la foto!', capturedImage);
    //   // console.log(savingState);
    // }

    return (
      <CameraView
        permission={hasPermission}
        previewHandler={setPreviewVisible}
        handleCaptureImage={setCapturedImage}
        handlePermission={setHasPermission}
      />
    );
  } else if (previewVisible && capturedImage) {
    return (
      <CameraPreview
        img={capturedImage}
        save={() => {
          handleSave(capturedImage);
        }}
        previewHandler={setPreviewVisible}
        handleCaptureImage={setCapturedImage}
        handlePermission={setHasPermission}
        saving={savingState}
      />
    );
  } else {
    const avatarImg = handleDecodeImage(image);

    return (
      <KeyboardAvoidingView
        style={registerNameStyles.mainContainer}
        behavior="padding"
      >
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
        <View style={registerNameStyles.container}>
          <View style={registerImgStyles.containerAvatar}>
            <Avatar
              rounded
              size={175}
              source={{
                uri: avatarImg,
              }}
            >
              <Avatar.Accessory
                name="camera"
                type="font-awesome-5"
                size={20}
                style={registerImgStyles.avatarAccesory}
                onPress={handlePermissions}
              />
            </Avatar>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{ fontSize: 25, fontWeight: '400', alignSelf: 'center' }}
            >
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
      </KeyboardAvoidingView>
    );
  }
};

export default RegisterImg;
