import React, { useContext } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { GlobalSessionContext } from '../../context/sessionContext';
import { chatModalStyles, menuModalStyles } from '../../styles/modalStyles';
import AddModal from '../Add/AddModal';

import RowInfo from '../Menu/RowInfo';

const ChatProfileModal = ({ chat }) => {
  const { sessionState, SessionActions, dispatchSession } =
    useContext(GlobalSessionContext);

  const handleHide = () =>
    dispatchSession(SessionActions.sessionCloseProfile());

  const handleShowShare = () =>
    dispatchSession(SessionActions.sessionOpenShareUser());

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={sessionState.profile}
      statusBarTranslucent={true}
      onRequestClose={() => {
        dispatchSession(SessionActions.sessionCloseProfile());
      }}
    >
      <View style={menuModalStyles.backContainer}>
        <View style={chatModalStyles.container}>
          <View style={menuModalStyles.headerContainer}>
            <View style={menuModalStyles.headerImgContainer}>
              <Image
                source={require('../../../public/imgs/profileImg.png')}
                style={menuModalStyles.headerImg}
              />
            </View>
            <View style={menuModalStyles.closeContainer}>
              <TouchableOpacity
                style={menuModalStyles.closeIconContainer}
                onPress={handleHide}
              >
                <Icon name="expand-more" color="#0EADFF" size={40} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={menuModalStyles.title}>Loni Bowcher</Text>
          <Text style={menuModalStyles.subTitle}>loni_bowcher</Text>
          <RowInfo title="Denunciar" body="" logout />
          <RowInfo title="Bloquear" body="" logout />
          <RowInfo title="Dejar de seguir" body="" />
          <RowInfo title="Notificación de Mensajes" body="Todos los mensajes" />
          <RowInfo
            title="Silenciar la conversación"
            easyAdd
            easyAddStatus={chat.silenced}
          />
          <RowInfo title="Eliminar conversación" body="" />
          <RowInfo
            title="Enviar nombre de usuario a..."
            body=""
            icon="navigation"
            press={handleShowShare}
          />
          <Text>Archivos compartidos</Text>
          <ScrollView></ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ChatProfileModal;
