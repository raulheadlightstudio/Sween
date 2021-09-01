import React, { useState } from 'react';
import { Camera } from 'expo-camera';
import { Text, View, TouchableOpacity } from 'react-native';
import { cameraViewStyles } from '../../styles/cameraStyles';
import { Icon } from 'react-native-elements';

let camera;

const CameraView = ({
  permission,
  previewHandler,
  handleCaptureImage,
  handlePermission,
}) => {
  const [type, setType] = useState(Camera.Constants.Type.back);

  const handleCancel = () => {
    handlePermission(false);
  };

  const handlePicture = async () => {
    if (!permission) return;
    const photo = await camera.takePictureAsync();
    previewHandler(true);
    console.log('CameraView', photo);
    handleCaptureImage(photo);
    handlePermission(false);
  };

  return (
    <View style={cameraViewStyles.container}>
      <Camera
        style={cameraViewStyles.camera}
        type={type}
        ref={r => {
          camera = r;
        }}
      >
        <View style={cameraViewStyles.buttonsContainer}>
          <View style={cameraViewStyles.buttonsView}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={cameraViewStyles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
          <View style={cameraViewStyles.buttonsView}>
            <TouchableOpacity
              style={cameraViewStyles.takePictureOut}
              onPress={handlePicture}
            >
              <View style={cameraViewStyles.takePictureIn}></View>
            </TouchableOpacity>
          </View>
          <View style={cameraViewStyles.buttonsView}>
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Icon name="flip-camera-ios" size={50} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
};

export default CameraView;
