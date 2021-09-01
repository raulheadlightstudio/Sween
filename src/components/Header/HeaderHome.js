import React, { useContext, useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { GlobalSessionContext } from '../../context/sessionContext';
import { homeHeaderStyles } from '../../styles/headerStyles';
import { useImage } from '../../../hooks/useImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderHome = ({ navigation }) => {
  const { imageConverted, convertImage, getImageByKey, imageStorage } =
    useImage('');
  const { SessionActions, dispatchSession } = useContext(GlobalSessionContext);
  const handleEdit = () => {
    navigation.navigate('Edit');
  };

  const handleMenu = () => dispatchSession(SessionActions.sessionOpenMenu());

  const handleAddFriend = () =>
    dispatchSession(SessionActions.sessionOpenAddFriend());

  const handleAddChat = () =>
    dispatchSession(SessionActions.sessionOpenAddChat());

  const handleGroup = () => dispatchSession(SessionActions.sessionOpenGroup());

  const handleImage = async () => {
    // getImageByKey('userImage');
    const imageAsync = await AsyncStorage.getItem('userImage');
    convertImage(imageAsync);
    // console.log(imageConverted);
  };

  useEffect(() => {
    handleImage();
  }, []);

  return (
    <View style={homeHeaderStyles.container}>
      <View style={homeHeaderStyles.asides}>
        <View style={homeHeaderStyles.iconContainer}>
          <Icon name="edit" color="#FFF" size={30} onPress={handleEdit} />
          <Icon name="groups" color="#FFF" size={40} onPress={handleGroup} />
        </View>
      </View>
      <View style={homeHeaderStyles.center}>
        <TouchableOpacity
          style={homeHeaderStyles.imgContainer}
          onPress={handleMenu}
        >
          <Image
            style={homeHeaderStyles.img}
            source={{
              uri: imageConverted !== '' ? imageConverted : undefined,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={homeHeaderStyles.asides}>
        <View style={homeHeaderStyles.iconContainer}>
          <TouchableOpacity onPress={handleAddFriend}>
            <Image
              source={require('../../../public/imgs/add-new.png')}
              style={homeHeaderStyles.icon}
              fadeDuration={0}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddChat}>
            <Image
              source={require('../../../public/imgs/chat.png')}
              style={homeHeaderStyles.icon}
              fadeDuration={0}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeaderHome;
