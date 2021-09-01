import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Image, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { editProfileHeaderStyles } from '../../styles/headerStyles';

const EditProfileHeader = ({ navigation, title, back }) => {
  return (
    <View style={editProfileHeaderStyles.container}>
      <TouchableOpacity style={editProfileHeaderStyles.left} onPress={back}>
        <Icon name="arrow-back-ios" color="#0EADFF" size={30} />
      </TouchableOpacity>
      <View style={editProfileHeaderStyles.center}>
        <Text style={editProfileHeaderStyles.text}>{title}</Text>
      </View>
    </View>
  );
};

export default EditProfileHeader;
