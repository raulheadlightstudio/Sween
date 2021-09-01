import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { listChatStyles } from '../../styles/listChat';

const ListChat = ({ chat: { id, name, lastName, hour, recents } }) => {
  const navigation = useNavigation();

  const handleChat = () => {
    navigation.navigate('Chat', {
      id,
    });
  };

  return (
    <TouchableOpacity style={listChatStyles.container} onPress={handleChat}>
      <View style={listChatStyles.imgContainer}>
        <Image
          style={listChatStyles.img}
          source={require('../../../public/imgs/profileImg.png')}
        />
      </View>
      <View style={listChatStyles.details}>
        <Text style={listChatStyles.userChat}>
          {name} {lastName}
        </Text>
        <Text style={listChatStyles.textChat}>
          {recents[recents.length - 1].seen && `Tú:`}{' '}
          {recents[recents.length - 1].msg}
        </Text>
      </View>
      <View style={listChatStyles.timeContainer}>
        <Text style={listChatStyles.time}>{hour}</Text>
        {!recents[recents.length - 1].seen && (
          <View style={listChatStyles.counterContainer}>
            <Text style={listChatStyles.counter}>{recents.length}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ListChat;
