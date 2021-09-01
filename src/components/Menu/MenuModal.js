import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Avatar } from 'react-native-elements';
import RowInfo from './RowInfo';
import { GlobalSessionContext } from '../../context/sessionContext';
import { menuModalStyles } from '../../styles/modalStyles';
import { followRequests } from '../../utils/mockData';
import { registerImgStyles } from '../../styles/register';
import { useImage } from '../../../hooks/useImage';
import { useCamera } from '../../../hooks/useCamera';
import CameraView from '../Camera/CameraView';

import {
  followersById,
  getContacts,
  pendingRequests,
  updateUserImage,
  updateUserName,
} from '../../api/ApiService';
import CameraPreview from '../Camera/CameraPreview';
import { updateModalStyles } from '../../styles/updateModalStyles';

const MenuModal = () => {
  const navigation = useNavigation();

  const {
    imageConverted,
    convertImage,
    getImageByKey,
    imageStorage,
    converImageBase64,
  } = useImage();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const [nameTest, setNameTest] = useState('');
  const [counterFollowers, setCounterFollowers] = useState(0);
  const [counterFollow, setCounterFollow] = useState(0);
  const [counterContacts, setCounterContacts] = useState(0);
  const [imageProfile, setImageProfile] = useState(null);

  const {
    setPreviewVisible,
    previewVisible,
    handlePermissions,
    hasPermission,
    setCapturedImage,
    capturedImage,
    setSavingState,
    savingState,
    setHasPermission,
  } = useCamera();

  const { sessionState, SessionActions, dispatchSession } =
    useContext(GlobalSessionContext);

  const handleImage = async () => {
    const imageAsync = await AsyncStorage.getItem('userImage');
    convertImage(imageAsync);
  };

  const handleHide = () => dispatchSession(SessionActions.sessionCloseMenu());

  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatchSession(SessionActions.sessionLogout());
    navigation.replace('LogIn');
  };

  const handleEditProfile = e => {
    navigation.navigate('Edit Profile', {
      title: e,
    });
  };

  const handleRequests = async () => {
    const pending = await pendingRequests(2); //quemado
    setCounterFollowers(pending.length);
  };

  const handleContacts = async () => {
    const contacts = await getContacts(2); //quemado
    const contactsArray = contacts.data.data;
    setCounterContacts(contactsArray.length);
  };

  const handleViewRequests = e => {
    navigation.navigate('Follow Requests', {
      title: e,
    });
  };

  const handleEasyAdd = () => {
    dispatchSession(
      SessionActions.sessionEditProfile({ easyAdd: !sessionState.easyAdd })
    );
  };

  const handleChange = e => {
    setNameTest(e);
  };

  const handleUpdate = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('userInfo'));
    const update = await updateUserName(data.userPublicId, nameTest);

    data.userName = nameTest.split(' ')[0];
    data.userLastName = nameTest.split(' ')[1];

    await AsyncStorage.setItem('userInfo', JSON.stringify(data));
    navigation.replace('Home');
    if (update.data) {
      Alert.alert('Swagger', 'Nombre cambiado con exito!');
    }
  };

  const handleUpdateImage = async base64image => {
    const userImg = await AsyncStorage.getItem('userImage');
    const data = JSON.parse(await AsyncStorage.getItem('userInfo'));

    const updateImage = await updateUserImage(2, base64image); //quemado
    await AsyncStorage.setItem('userImage', base64image);

    navigation.replace('Home');
    if (updateImage.data) {
      Alert.alert('Sween', 'Foto cambiada con exito!');
    }
  };

  const handleSave = async capturedImage => {
    setSavingState(true);

    const base64image = await converImageBase64(capturedImage.uri);

    handleUpdateImage(base64image);
  };

  const handleSiguiendo = async id => {
    const siguiendoList = await followersById(id);
    const arraySiguiendo = siguiendoList.data.data;
    setCounterFollow(arraySiguiendo.length);
  };
  const getImageProfile = async () => {
    const image = await AsyncStorage.getItem('userImage');
    setImageProfile(image);
  };

  useEffect(() => {
    setNameTest('');
    handleImage();
    handleRequests();
    handleContacts();
    handleSiguiendo(2); //quemado
    getImageProfile();
  }, []);

  if (hasPermission) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={hasPermission}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setHasPermission(!hasPermission);
        }}
      >
        <CameraView
          permission={hasPermission}
          previewHandler={setPreviewVisible}
          handleCaptureImage={setCapturedImage}
          handlePermission={setHasPermission}
        />
      </Modal>
    );
  } else if (previewVisible && capturedImage) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={previewVisible}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setHasPermission(!hasPermission);
        }}
      >
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
      </Modal>
    );
  }

  if (modalImage) {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalImage}
          onRequestClose={() => {
            setModalImage(!modalImage);
          }}
        >
          <View style={updateModalStyles.centeredViewImage}>
            <View style={updateModalStyles.modalView}>
              <Image
                style={{ width: 275, height: 275 }}
                source={{
                  uri: 'data:image/jpeg;base64,' + imageProfile,
                }}
              ></Image>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  top: 20,
                }}
              >
                <View style={updateModalStyles.space}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setModalImage(!modalImage)}
                  >
                    <Text style={updateModalStyles.textStyle}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  if (modalVisible) {
    return (
      <View style={updateModalStyles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={updateModalStyles.centeredView}>
            <View style={updateModalStyles.modalView}>
              <Text style={updateModalStyles.modalText}>
                Escribe tu nombre ...
              </Text>
              <View>
                <TextInput
                  style={updateModalStyles.input}
                  value={nameTest}
                  onChangeText={e => {
                    handleChange(e);
                  }}
                  minWidth={200}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  top: 20,
                }}
              >
                <View style={updateModalStyles.space}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={updateModalStyles.textStyle}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
                <View style={updateModalStyles.space}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleUpdate()}
                  >
                    <Text style={updateModalStyles.textStyle}>Guardar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={sessionState.menu}
      statusBarTranslucent={true}
      onRequestClose={() => {
        dispatchSession(SessionActions.sessionCloseMenu());
      }}
    >
      <View style={menuModalStyles.backContainer}>
        <View style={menuModalStyles.container}>
          <View style={menuModalStyles.headerContainer}>
            <View style={menuModalStyles.headerImgContainer}>
              <Avatar
                rounded
                size={75}
                source={{
                  uri: imageConverted !== '' ? imageConverted : undefined,
                }}
                onPress={() => {
                  setModalImage(!modalImage);
                }}
              >
                <Avatar.Accessory
                  name="camera"
                  type="font-awesome-5"
                  size={15}
                  style={registerImgStyles.avatarAccesoryEdit}
                  onPress={handlePermissions}
                />
              </Avatar>
            </View>
            <View style={menuModalStyles.closeContainer}>
              <TouchableOpacity
                style={menuModalStyles.closeIconContainer}
                onPress={handleHide}
              >
                <Icon name="expand-more" color="#0EADFF" size={40} />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={menuModalStyles.title}
          >{`${sessionState.name} ${sessionState.lastName}`}</Text>
          <Text style={menuModalStyles.subTitle}>@{sessionState.username}</Text>
          <RowInfo
            title="Nombre"
            body={`${sessionState.name} ${sessionState.lastName}`}
            press={() => setModalVisible(true)}
          />
          <RowInfo title="Nombre de usuario" body={sessionState.username} />
          <RowInfo
            title="Cumpleaños"
            body={sessionState.birthday}
            press={() => handleEditProfile('Cumpleaños')}
          />
          <RowInfo
            title="Número de móvil"
            body={sessionState.phone}
            press={() => handleEditProfile('Número de móvil')}
          />
          <RowInfo title="Contactos" body={counterContacts} badge />
          <RowInfo
            title="Seguidores"
            body={counterFollowers}
            badge
            press={() => handleViewRequests('Solicitudes de seguimiento')}
          />
          <RowInfo
            title="Siguiendo"
            body={counterFollow}
            badge
            press={() => handleViewRequests('Usuarios que sigues')}
          />
          <RowInfo
            title="Configuración de privacidad"
            body=""
            press={() => handleEditProfile('Configuración de privacidad')}
          />
          <RowInfo title="Quién puede contactarme" body="Mis amigos" />
          <RowInfo
            title={`Aparecer en "Añadido fácil"`}
            easyAdd
            easyAddStatus={sessionState.easyAdd}
            press={handleEasyAdd}
          />
          <RowInfo title="Notificar un problema" body="" />
          <RowInfo title="Cerrar sesión" body="" logout press={handleLogout} />
        </View>
      </View>
    </Modal>
  );
};

export default MenuModal;
