import React from 'react';
import PropTypes from 'prop-types';
import { Camera } from 'expo-camera';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useCamera = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [savingState, setSavingState] = useState(false);

  const handlePermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    {
      status === 'granted'
        ? setHasPermission(true)
        : Alert.alert('Sween', 'Asegurate de darle los permisos adecuados', [
            {
              text: 'Confirmar',
            },
          ]);
    }
  };

  return {
    setHasPermission,
    setPreviewVisible,
    previewVisible,
    setCapturedImage,
    capturedImage,
    setSavingState,
    savingState,
    handlePermissions,
    hasPermission,
  };
};
