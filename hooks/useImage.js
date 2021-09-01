import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';

export const useImage = () => {
  const format = 'data:image/jpeg;base64,';
  const [imageConverted, setImageConverted] = useState('');
  const [imageStorage, setImageStorage] = useState('');

  // const getImageByKey = async key => {
  //   const image = await AsyncStorage.getItem(key);
  //   setImageStorage(image);
  //   console.log('getImageByKey', imageStorage);
  // };
  const convertImage = base64image => {
    setImageConverted(format + base64image);
    // console.log('convertImage', imageConverted);
  };

  const converImageBase64 = async uri => {
    console.log('uri', uri);
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 500, height: 500 } }],
        { compress: 0.5, base64: true }
      );
      const { base64 } = manipResult;

      return base64;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    convertImage,
    imageConverted,
    // getImageByKey,
    converImageBase64,
    imageStorage,
  };
};

// useImage.propTypes = {
//   base: PropTypes.string,
//   imageBase64: PropTypes.string,
// };
