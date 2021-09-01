import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import EditHeader from '../components/Header/EditHeader';
import { Button } from 'react-native-elements/dist/buttons/Button';
import CameraPreview from '../components/Camera/CameraPreview';
import CameraView from '../components/Camera/CameraView';
import { editPageStyles } from '../styles/editStyles';
import ChatMsg from '../components/Chat/ChatMsg';
import TextBarChat from '../components/Chat/TextBarChat';

const Edit = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [image, setImage] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => <EditHeader {...props} />,
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

  const handleSave = () => {
    console.log('object');
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

          <TextBarChat setPermissions={setHasPermission} setImage={setImage} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Edit;
