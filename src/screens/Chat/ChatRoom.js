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
import { Icon, Chip } from 'react-native-elements';
import SystemMsg from '../../components/Chat/SystemMsg';

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
            <SystemMsg messageType="systemDateMessage" />
            <SystemMsg
              messageType="privacyTerm"
              msg="🔒 Los mensajes enviados a este chat ahora estan seguros con cifrado
            de extremo a extermo. Pulsa para mas informacion."
            />
            <ChatMsg
              author="YO"
              type="text"
              msg="Empezamos transmisión en 5 mins 📹😜🙌 te espero!!"
            />
            <SystemMsg messageType="userAdded" />
            <ChatMsg
              author="Caesar Briones"
              type="img"
              msg="Hola grupo, me presento me llamo Cesar Briones 👋"
            />
            <ChatMsg
              author="YO"
              type="text"
              msg="Hola Cesar, un gusto tenerte en el grupo"
            />
            <ChatMsg
              author="Raul Martinez"
              type="text"
              msg="Saludos a todos🙌"
            />
          </ScrollView>
          <TextBarChat />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
