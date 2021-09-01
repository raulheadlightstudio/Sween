import React, { useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { GlobalSessionContext } from '../../context/sessionContext';
import { chatHeaderStyles, homeHeaderStyles } from '../../styles/headerStyles';

const RoomChatHeader = ({ route, navigation, name }) => {
  const { SessionActions, dispatchSession } = useContext(GlobalSessionContext);

  const handleBack = () => navigation.goBack();

  const handleProfile = () =>
    dispatchSession(SessionActions.sessionOpenProfile());

  return (
    <View style={chatHeaderStyles.container}>
      <View style={chatHeaderStyles.iconContainer}>
        <Icon
          name="arrow-back-ios"
          color="#FFF"
          size={30}
          onPress={handleBack}
        />
      </View>
      <View style={chatHeaderStyles.imgAside}>
        <TouchableOpacity
          style={chatHeaderStyles.imgContainer}
          onPress={handleProfile}
        >
          <Image
            source={require('../../../public/imgs/profileImg.png')}
            style={chatHeaderStyles.img}
          />
        </TouchableOpacity>
      </View>
      <View style={chatHeaderStyles.center}>
        <Text style={chatHeaderStyles.text}>{name}</Text>
      </View>
      <View style={chatHeaderStyles.iconRightContainer}>
        <Image
          source={require('../../../public/imgs/friends.png')}
          style={homeHeaderStyles.icon}
          fadeDuration={0}
        />
      </View>
    </View>
  );
};

export default RoomChatHeader;
