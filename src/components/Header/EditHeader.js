import React from 'react';
import { Image, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { chatHeaderStyles } from '../../styles/headerStyles';

const EditHeader = ({ navigation }) => {
  const handleBack = () => navigation.goBack();

  return (
    <View style={chatHeaderStyles.container}>
      <View style={chatHeaderStyles.imgAside}>
        <View style={chatHeaderStyles.imgContainer}>
          <Image
            source={require('../../../public/imgs/profileImg.png')}
            style={chatHeaderStyles.img}
          />
        </View>
      </View>
      <View style={chatHeaderStyles.center}>
        <Text style={chatHeaderStyles.text}>Mis seguidores</Text>
      </View>
      <View style={chatHeaderStyles.iconContainer}>
        <Icon
          name="arrow-forward-ios"
          color="#FFF"
          size={30}
          onPress={handleBack}
        />
      </View>
    </View>
  );
};

export default EditHeader;
