import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { cameraPreviewStyles } from '../../styles/cameraStyles';
import { Icon } from 'react-native-elements';

const CameraPreview = ({
  img,
  save,
  previewHandler,
  handleCaptureImage,
  handlePermission,
  saving,
}) => {
  const handleRetake = async () => {
    previewHandler(false);
    handleCaptureImage(null);
    handlePermission(true);
  };
  console.log('CP', img);

  return (
    <View style={cameraPreviewStyles.previewContainer}>
      <ImageBackground
        source={{ uri: img && img.uri }}
        style={cameraPreviewStyles.imgBck}
      >
        <View style={cameraPreviewStyles.previewButtonsContainer}>
          <TouchableOpacity
            style={{
              height: 65,
              width: 65,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}
            activeOpacity={0.7}
            onPress={handleRetake}
          >
            <Icon
              size={30}
              reverse
              name="close-outline"
              type="ionicon"
              color="#0EADFF"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 65,
              width: 65,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}
            activeOpacity={0.7}
            onPress={save}
          >
            <Icon
              size={30}
              reverse
              name="checkmark-outline"
              type="ionicon"
              color="#0EADFF"
            />
          </TouchableOpacity>
        </View>
        {saving && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,.5)',
            }}
          >
            <ActivityIndicator size="large" color="#5DC7FE" />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default CameraPreview;
