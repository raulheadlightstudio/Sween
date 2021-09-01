import { useScrollToTop } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { getUserForNick } from '../../api/ApiService';
import { GlobalSessionContext } from '../../context/sessionContext';
import { addModalStyles } from '../../styles/modalStyles';
import { addUsers } from '../../utils/mockData';
import AddContactRow from './AddContactRow';

const ContactModal = ({ show, close, title, search, modalType, data }) => {
  const { sessionState, SessionActions, dispatchSession } =
    useContext(GlobalSessionContext);
  const [chatsSelected, setChatsSelected] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleHide = () => {
    dispatchSession(close());
    if (modalType === 'share') {
      setTimeout(() => {
        dispatchSession(SessionActions.sessionOpenProfile());
      }, 500);
    }
  };

  const handleChat = id => {
    let chats = [...chatsSelected, id];

    setChatsSelected([...chats]);
  };

  const handleUnchat = id => {
    let chats = [...chatsSelected];

    const nChats = chats.filter(chat => chat !== id);

    setChatsSelected([...nChats]);
  };

  const handleUsers = async e => {
    const users = await getUserForNick(e);
    setFilteredUsers(users.data.data);
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={show}
          statusBarTranslucent={true}
          onRequestClose={handleHide}
        >
          <View style={addModalStyles.backContainer}>
            <View style={addModalStyles.container}>
              <View style={addModalStyles.headerContainer}>
                <Text style={addModalStyles.title}>Title</Text>
                <View style={addModalStyles.closeContainer}>
                  <TouchableOpacity
                    style={addModalStyles.closeIconContainer}
                    onPress={handleHide}
                  >
                    <Icon name="close" color="#0EADFF" size={30} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={addModalStyles.searchContainer}>
                <Icon
                  name="search"
                  color="#9A9FA7"
                  size={25}
                  style={addModalStyles.searchIcon}
                />
                <TextInput
                  placeholder={search}
                  style={addModalStyles.searchInput}
                  placeholderTextColor="#9A9FA7"
                  onChangeText={e => {
                    handleUsers(e);
                  }}
                />
              </View>
              <View style={addModalStyles.quickAddContainer}>
                {modalType === 'addFriend' ? (
                  <>
                    <Text style={addModalStyles.quickAddText}>
                      Añadido fácil
                    </Text>
                    <TouchableOpacity
                      style={addModalStyles.allContactsContainer}
                      onPress={() => {
                        // console.log('Navigate to Contacts');
                        handleHide();
                      }}
                    >
                      <Text style={addModalStyles.allContactsText}>
                        Todos los contactos
                      </Text>
                      <Icon
                        name="arrow-forward-ios"
                        size={15}
                        color="#9A9FA7"
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text style={addModalStyles.friendsTitle}>Amigos</Text>
                )}
              </View>
              <ScrollView
                style={addModalStyles.scrollContainer}
                showsVerticalScrollIndicator={false}
              >
                {addUsers.map(user => (
                  <AddContactRow
                    key={user.userPublicId}
                    contact={user}
                    type={modalType}
                    select={handleChat}
                    unselect={handleUnchat}
                    selected={chatsSelected.find(chat =>
                      chat === user.userPublicId ? true : false
                    )}
                  />
                ))}
              </ScrollView>
              {modalType === 'addChat' && (
                <TouchableOpacity
                  style={
                    chatsSelected.length === 0
                      ? addModalStyles.chatButtonDisabled
                      : addModalStyles.chatButton
                  }
                >
                  <Text style={addModalStyles.chatTitle}>Chatear</Text>
                </TouchableOpacity>
              )}
              {modalType === 'group' && (
                <TouchableOpacity
                  style={
                    chatsSelected.length === 0
                      ? addModalStyles.chatButtonDisabled
                      : addModalStyles.chatButton
                  }
                >
                  <Text style={addModalStyles.chatTitle}>Crear</Text>
                </TouchableOpacity>
              )}
              {modalType === 'share' && (
                <TouchableOpacity
                  style={
                    chatsSelected.length === 0
                      ? addModalStyles.chatButtonDisabled
                      : addModalStyles.chatButton
                  }
                >
                  <Text style={addModalStyles.chatTitle}>Enviar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ContactModal;
