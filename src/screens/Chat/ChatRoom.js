import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Keyboard } from 'react-native';
import { ScrollView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native';
import { View, Text } from 'react-native';
import AddModal from '../../components/Add/AddModal';
import ChatMsg from '../../components/Chat/ChatMsg';
import ChatProfileModal from '../../components/Chat/ChatProfileModal';
import TextBarChat from '../../components/Chat/TextBarChat';
import { GlobalSessionContext } from '../../context/sessionContext';
import { chatMsgStyles } from '../../styles/chatStyles';
import { editPageStyles } from '../../styles/editStyles';
import { Icon } from 'react-native-elements';

const ChatRoom = () => {
  const { sessionState, SessionActions, dispatchSession } =
    useContext(GlobalSessionContext);

  return (
    <KeyboardAvoidingView
      style={editPageStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={editPageStyles.main}>
          <ScrollView style={editPageStyles.scrollContainer}>
            <Text style={editPageStyles.lastMsgTitle}>02/02/2022</Text>
            <ChatMsg
              author="YO"
              type="text"
              msg="Empezamos transmisión en 5 mins 📹😜🙌 te espero!!"
            />
            <ChatMsg author="Caesar Briones" type="img" msg="Soy yo" />
            <ChatMsg
              author="YO"
              type="text"
              msg="Ya Iniciamos la transmisión 📹😜🙌"
            />
            <ChatMsg
              author="Caesar Briones"
              type="text"
              msg="Enterado 📹😜🙌"
            />
            <Text style={editPageStyles.lastMsgTitle}>Hoy</Text>
            <ChatMsg
              author="Caesar Briones"
              type="text"
              msg="Hola, como estas?"
            />
            <ChatMsg author="YO" type="text" msg="Bien y tu?" />
          </ScrollView>
          <TextBarChat />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
