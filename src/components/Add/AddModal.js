import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-elements';
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {
  followersById,
  getContacts,
  getUserForNick,
} from '../../api/ApiService';
import { GlobalSessionContext } from '../../context/sessionContext';
import { addModalStyles } from '../../styles/modalStyles';
import { addUsers } from '../../utils/mockData';
import AddContactRow from './AddContactRow';
import ContactModal from './ContactModal';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native';

const AddModal = ({ show, close, title, search, modalType, data }) => {
  const { sessionState, SessionActions, dispatchSession } =
    useContext(GlobalSessionContext);
  const [chatsSelected, setChatsSelected] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [contactsApi, setContactsApi] = useState([]);
  const [modalTypeState, setModalTypeState] = useState(modalType);
  const [arrayFollowers, setArrayFollowers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const modalCreateGroup = () => {
    console.log('modal');
  };

  const handleFirebase = (groupname, integrants, admins, image) => {
    const dbh = firebase.firestore();
    try {
      dbh.collection('groups').add({
        integrants: [
          'a4cde450-01ff-11ec-9a03-0242ac130003',
          'fc7156b4-0200-11ec-9a03-0242ac130003',
          '03ed8764-0201-11ec-9a03-0242ac130003',
          '1f15afbc-0201-11ec-9a03-0242ac130003',
          '3c77e9bc-0201-11ec-9a03-0242ac130003',
          '4077e2a6-0201-11ec-9a03-0242ac130003',
        ],
        admins: ['a4cde450-01ff-11ec-9a03-0242ac130003'],
        groupImage:
          '/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMA///////////////////////////////////////////////////////////////////////////////////////bAEMB///////////////////////////////////////////////////////////////////////////////////////AABEIASwBLAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQID/8QAIBABAQEAAgMBAQADAAAAAAAAAAERITESQVGBAmFxkf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AwAAs7QBsBFAAQUA01BUNRQEFBUFECNMtKgDINCcqCiKAlUBjKmX46IDmrYDBigGAAsCAMAoIoAsVIqAAKAAAAIoCAaAGgCxBUaRZQEABUAA0ANXWVBdSgCCgIKoFQAZAAAAaYbnQACKCamg0msiounJlay/QZxcawBnDxaATxMUAw/2AAJv0DBQEF4OAQXDAQXDAQUAFNBMVN+J+gyAAACLqKByLUk0Ey1qfz9aUEyCgAAAAIKgAGgAAJ/X1VBz02hgLp5JIoHlF8oAHlDyhkTJ8BfI1MhgL+jOGA0icmgAAAAgAL23GJ22CgACIDQyl37QbGZWgAY0GqyuoC6rLUBQAZsRusAAooAAAAAAigIKAyAIIoCAAOkc3SdAKAJUABlrlnKBO3RmTGgGL3W2aCC4uAzmtRQAABlpKCAIoAAAAAAAAABYzmNlVGEaxAQXDARv+emV/kGwAQMAFAAABLNUBFEoKmpqA1qsxeACigyAKAIAAAAAAAAKAqIKAyKgBOwBsABFZvwDyJWVBpWeVBRAFTIoDOGVQCAoIogFZaY6oNCKigAAAAAAAKAqAAIACAoKqKCM2Ns0GVWwgKAAAAqKAACKzzrQCKgKxY2lBjppk6BoTVRQAAAAAFAVAABFQBFQGoqRQAAQDYAAAAAAAACXuKnuKAJ7/ABQAUGBagIapgGqzhyDQzporQzpoNigiAAAAiNICiKAACVlagNRQAAAAAT/KoBpE/wCLAX2HugAAFZaQEFEVBQEMUBMFAaAVBAAAASrgCKigAAze0WoDYQAAAAATpQE6TVOQJ7UAAAEqlBlQRQAAAAAFFFRFAAAEFQEVFAABKy2yBK0w1KCgAAAAACAKIAogCggCNVlBRFFAAAAaAVAAAAAAEAAAAM0AZyrIoAAACfgAaAAAAmgoigCKC+mWolBAEVRAFABoBUAAAAAAEVAAAALcAYt05q4DU6AARQE/AMAQAQAUNEBrViEEWLUq+gZFRFAAVFQGwFQAAAAAASqUEAAZt6aYvINSq5tSg0JaaCpVQAAEABBUFAxQABFpCIC1GqygACgANgKgAAAAAAACAAM8NJ+AyjWW9rkBhToBeVZmtAAgAAAAAAAICwovoFnSUhQQBFAAbBNVFE05BRFwDU1QE5OVAQWoAAAACWJjSAdAAIAAACL2UBAAAAWIsAaZrUBmi1EAAVrFRVQAAAAAAAARUABAUQAABANA6FAQMhAWIqewEKAAAAAvohEBustemaACIr//2Q==',
        nameGroup: 'Familia Gonzales 😬',
      });

      console.log('Registro creado');
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleHide = () => {
    dispatchSession(close());
    if (modalTypeState === 'share') {
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

  // console.log('renderizado', modalType);

  const handleUsers = async e => {
    // console.log('handleUsers', e);
    const users = await getUserForNick(e);
    setFilteredUsers(users.data.data);
    // const userFil = filteredUsers.filter(
    //   filteredUsers => filteredUsers.userPublicId === sessionState.id
    // );

    // console.log(userFil)

    // console.log(users.filter(data=> ))
    // sessionState.id

    // console.log(
    //   filteredUsers.filter(
    //     filteredUsers => filteredUsers.userPublicId != sessionState.id
    //   )
    // );

    // console.log('filteredUsers', filteredUsers);
  };

  const handleSearchContacts = async e => {
    const contacts = await handleContacts();
    contacts.filter(name => name.userPublicName.includes(e));
    // .map(contact => console.log(contact.userPublicName));
  };

  const handleTest = (sessionState, contactsArray) => {
    dispatchSession(
      SessionActions.SessionOpenContacts(sessionState, contactsArray)
    );
  };

  const handleContacts = async () => {
    const myContacts = await getContacts(2); //quemado
    await AsyncStorage.setItem(
      'storageContacts',
      JSON.stringify(myContacts.data.data)
    );
    setContactsApi(myContacts.data.data);

    const arrcon = myContacts.data.data;

    handleTest(sessionState, arrcon);

    return myContacts.data.data;
  };

  const getMyAsyncContacts = async () => {
    const contacts = await AsyncStorage.getItem('storageContacts');

    return contacts;
  };

  useEffect(() => {
    handleFilterContacts();
    if (modalTypeState === 'myContacts') {
      handleContacts();
    } else if (modalTypeState === 'addFriend') {
      handleUsers('');
    } else if (modalTypeState === 'addChat') {
      handleContacts();
      setModalTypeState('addChat');
    } else {
      return;
    }
  }, [modalTypeState]);

  const handleFilterContacts = async () => {
    const followers = await followersById(2); //quemado
    setArrayFollowers(followers.data.data);
  };

  const arraycontactos = sessionState.contacts;
  // console.log('arraycontactos', arraycontactos);

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
                <Text style={addModalStyles.title}>{title}</Text>
                <View style={addModalStyles.closeContainer}>
                  <TouchableOpacity
                    style={addModalStyles.closeIconContainer}
                    onPress={handleHide}
                  >
                    <Icon name="close" color="#0EADFF" size={30} />
                  </TouchableOpacity>
                </View>
              </View>

              {modalTypeState === 'addFriend' ? (
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
              ) : null}

              {modalVisible ? modalCreateGroup() : console.log('Cerrar')}

              {modalTypeState !== 'addChat' ? (
                <View style={addModalStyles.quickAddContainer}>
                  {modalTypeState === 'addFriend' ? (
                    <>
                      <Text style={addModalStyles.quickAddText}>
                        Añadido fácil
                      </Text>
                      <TouchableOpacity
                        style={addModalStyles.allContactsContainer}
                        onPress={() => {
                          setModalTypeState('myContacts');
                        }}
                        activeOpacity={0.9}
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
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          setModalTypeState('addFriend');
                        }}
                        activeOpacity={0.9}
                      >
                        <Text
                          style={{
                            ...addModalStyles.quickAddText,
                            ...addModalStyles.unselected,
                          }}
                        >
                          Añadido fácil
                        </Text>
                      </TouchableOpacity>
                      <View style={addModalStyles.allContactsContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            getMyAsyncContacts();
                          }}
                        >
                          <Text
                            style={{
                              ...addModalStyles.allContactsText,
                              ...addModalStyles.selected,
                            }}
                          >
                            Todos los contactos
                          </Text>
                          <Icon
                            name="arrow-forward-ios"
                            size={15}
                            color="#9A9FA7"
                          />
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </View>
              ) : null}

              <View>
                {modalTypeState === 'addFriend' ? (
                  <ScrollView
                    style={addModalStyles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    activeOpacity={0.9}
                  >
                    {filteredUsers
                      .filter(
                        filteredUsers =>
                          filteredUsers.userPublicId !== sessionState.id &&
                          !arrayFollowers.includes(filteredUsers.userPublicId)
                      )
                      .map(user => (
                        <AddContactRow
                          key={user.userPublicId}
                          contact={user}
                          type={modalTypeState}
                          select={handleChat}
                          unselect={handleUnchat}
                          selected={chatsSelected.find(chat =>
                            chat === user.userPublicId ? true : false
                          )}
                        />
                      ))}
                  </ScrollView>
                ) : (
                  <ScrollView
                    style={addModalStyles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                  >
                    {arraycontactos.map(user => (
                      <AddContactRow
                        key={user.userPublicId}
                        contact={user}
                        type={modalTypeState}
                        select={handleChat}
                        unselect={handleUnchat}
                        selected={chatsSelected.find(chat =>
                          chat === user.userPublicId ? true : false
                        )}
                      />
                    ))}
                  </ScrollView>
                )}
              </View>

              {/* {modalTypeState === 'addChat' && (
                <TouchableOpacity
                  style={
                    chatsSelected.length === 0
                      ? addModalStyles.chatButtonDisabled
                      : addModalStyles.chatButton
                  }
                >
                  <Text style={addModalStyles.chatTitle}>Chatear</Text>
                </TouchableOpacity>
              )} */}

              {modalTypeState === 'group' && (
                <TouchableOpacity
                  onPress={() => {
                    handleFirebase();
                    // setModalVisible(!modalVisible);
                  }}
                  style={
                    chatsSelected.length === 0
                      ? addModalStyles.chatButtonDisabled
                      : addModalStyles.chatButton
                  }
                >
                  <Text style={addModalStyles.chatTitle}>Crear</Text>
                </TouchableOpacity>
              )}

              {modalTypeState === 'share' && (
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AddModal;
