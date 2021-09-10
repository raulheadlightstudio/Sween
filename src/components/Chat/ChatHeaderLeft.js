import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { GlobalSessionContext } from '../../context/sessionContext';

const ChatHeaderLeft = ({ imageurl }) => {
  const navigation = useNavigation();
  const { SessionActions, dispatchSession } = useContext(GlobalSessionContext);

  const handleAddChat = () => {
    console.log('Abriendo chat');
    // dispatchSession(SessionActions.sessionOpenAddChat());
    dispatchSession(SessionActions.SessionCloseAddChat());
  };

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          //    && handleAddChat();
        }}
      >
        <Icon type="ionicon" name={'arrow-back'} color="white" />
      </TouchableOpacity>
      <Avatar
        avatarStyle={{
          borderWidth: 1.5,
          borderColor: 'white',
        }}
        size="small"
        rounded
        onPress={() => console.log('Open Modal')}
        activeOpacity={0.7}
        source={{
          uri: 'data:image/jpeg;base64,' + imageurl,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 100,
  },
});

export default ChatHeaderLeft;
