import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {
  ActionSheetIOS,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { editPageStyles } from '../styles/editStyles';
import RoomChatHeader from '../components/Header/RoomChatHeader';
import { chats } from '../utils/mockData';
import ChatMsg from '../components/Chat/ChatMsg';
import { chatMsgStyles } from '../styles/chatStyles';
import TextBarChat from '../components/Chat/TextBarChat';
import { GlobalSessionContext } from '../context/sessionContext';
import ChatProfileModal from '../components/Chat/ChatProfileModal';
import AddModal from '../components/Add/AddModal';
import { Platform } from 'react-native';

const RoomChat = ({ route, navigation }) => {
  const { sessionState, SessionActions, dispatchSession } =
    useContext(GlobalSessionContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [chatState, setChatState] = useState({});

  const { id } = route.params;

  useEffect(() => {
    setChatState(chats.filter(chat => chat.id !== id)[0]);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => (
        <RoomChatHeader
          name={`${chatState.name} ${chatState.lastName}`}
          {...props}
        />
      ),
    });
  }, [chatState]);

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

  const handlePermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleSave = () => {
    console.log('object');
  };

  const pickImage = async () => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleAdd = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Más opciones...',
        options: ['Cámara', 'Fotos y videos', 'Contacto', 'GIF', 'Cancelar'],
        cancelButtonIndex: 4,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          handlePermissions();
        } else if (buttonIndex === 1) {
          pickImage();
        } else if (buttonIndex === 2) {
          setResult('🔮');
        }
      }
    );
  };

  if (hasPermission) {
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
        save={handleSave}
        previewHandler={setPreviewVisible}
        handleCaptureImage={setCapturedImage}
        handlePermission={setHasPermission}
      />
    );
  }

  if (image) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={editPageStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={editPageStyles.main}>
          <ScrollView style={editPageStyles.scrollContainer}>
            <Text style={editPageStyles.lastMsgTitle}>HOY</Text>
            <ChatMsg
              author="YO"
              type="text"
              msg="De qué te gustaría que hablara en el live de hoy?"
            />
            <ChatMsg author="YO" type="img" msg="profileImg1.png" />
            <ChatMsg
              author="YO"
              type="text"
              msg="Rex está triste porque no ha salido a pasear 😢"
            />
            <ChatMsg
              author="YO"
              type="text"
              msg="Empezamos transmisión en 5 mins 📹😜🙌 te espero!!"
            />
          </ScrollView>
          <TextBarChat add={handleAdd} />
          {sessionState.profile && (
            <ChatProfileModal show={sessionState.profile} chat={chatState} />
          )}
          {sessionState.shareUser && (
            <AddModal
              show={sessionState.shareUser}
              title="Enviar nombre a ..."
              search="Buscar amigos"
              close={SessionActions.sessionCloseShareUser}
              modalType="share"
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RoomChat;
