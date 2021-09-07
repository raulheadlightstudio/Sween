import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  KeyboardAvoidingView,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { GlobalSessionContext } from '../context/sessionContext';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderHome from '../components/Header/HeaderHome';
import { homeStyles } from '../styles/homeStyles';
import MenuModal from '../components/Menu/MenuModal';
import AddModal from '../components/Add/AddModal';
import {
  getMyGroups,
  getUserForNick,
  getCoGroups,
  getContacts,
} from '../api/ApiService';
import { SafeAreaView } from 'react-native';
import SystemMsg from '../components/Chat/SystemMsg';

const Home = ({ navigation }) => {
  const { sessionState, SessionActions, dispatchSession } =
    useContext(GlobalSessionContext);

  const [userList, setUserList] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupList, setGroupList] = useState([]);

  const list = [
    {
      name: 'Amy Farha',
      avatar_url:
        'https://res.cloudinary.com/dslc2vjcz/image/upload/v1618681932/Users/avataaars_33_fnjiva.png',
      message: 'I like your ideas',
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://res.cloudinary.com/dslc2vjcz/image/upload/v1618681932/Users/avataaars_34_dztzng.png',
      message: 'I have a heard',
    },
    {
      name: 'Familia Gonzales 😬',
      avatar_url:
        'https://res.cloudinary.com/dslc2vjcz/image/upload/v1629725666/family_mzg2lp.jpg',
      message: 'Hola Familia, como estan?',
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://res.cloudinary.com/dslc2vjcz/image/upload/v1618681932/Users/avataaars_34_dztzng.png',
      message: 'I have a heard',
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://res.cloudinary.com/dslc2vjcz/image/upload/v1618681932/Users/avataaars_34_dztzng.png',
      message: 'I have a heard',
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://res.cloudinary.com/dslc2vjcz/image/upload/v1618681932/Users/avataaars_34_dztzng.png',
      message: 'I have a heard',
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://res.cloudinary.com/dslc2vjcz/image/upload/v1618681932/Users/avataaars_34_dztzng.png',
      message: 'I have a heard',
    },
    {
      name: 'Chris Jacksons',
      avatar_url:
        'https://res.cloudinary.com/dslc2vjcz/image/upload/v1618681932/Users/avataaars_34_dztzng.png',
      message: 'I have a heard',
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://res.cloudinary.com/dslc2vjcz/image/upload/v1618681932/Users/avataaars_34_dztzng.png',
      message: 'I have a heard',
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://res.cloudinary.com/dslc2vjcz/image/upload/v1618681932/Users/avataaars_34_dztzng.png',
      message: 'I have a heard',
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://res.cloudinary.com/dslc2vjcz/image/upload/v1618681932/Users/avataaars_34_dztzng.png',
      message: 'I have a heard',
    },
  ];

  const validateUser = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');

    if (userInfo) {
      const data = JSON.parse(userInfo);
      getImage();
      dispatchSession(
        SessionActions.sessionAuthenticate({
          id: data.userPublicId,
          name: data.userName,
          lastName: data.userLastName,
          email: data.email,
          username: data.userPublicName,
          birthday: data.birthday,
          phone: data.userPhoneNumber,
        })
      );

      //   await AsyncStorage.setItem('id', data.userPublicId.toString());
      //   const id = await AsyncStorage.getItem('id');
      //   const g = await getMyGroups(id);
      //   const lg = g.data.data.length;
      //   let a = [];
      //   if (lg > 0) {
      //     for (let i = 0; i < lg; i++) {
      //       a.push(g.data.data[i].groupId);
      //     }
      //     const co = await getCoGroups(a, id);
      //     setGroups(co.data);
      //     console.log('groups', groups);
      //   }
      // } else {
      //   navigation.replace('LogIn');
    }
  };

  const getImage = async () => {
    const userImage = await AsyncStorage.getItem('userImage');
  };

  const getUsers = async () => {
    const users = await getUserForNick('');
    setUserList(users.data.data);
  };

  const asyncGetMyGroups = async () => {
    const resp = await getMyGroups('Cesar');
    setGroupList(resp);
    // console.log(groupList.data)
  };

  useEffect(() => {
    validateUser();
    getUsers();
    asyncGetMyGroups();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => <HeaderHome {...props} />,
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView style={homeStyles.main}>
      <StatusBar barStyle="light-content" backgroundColor="#ecf0f1" />
      <View style={homeStyles.container}>
        <View>
          <ScrollView style={homeStyles.scroll}>
            {list.map((l, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  console.log('open chat...'); //Open Chat
                }}
                activeOpacity={0.5}
              >
                <ListItem key={i} bottomDivider topDivider>
                  <Avatar
                    source={{ uri: l.avatar_url }}
                    size="medium"
                    rounded
                  />
                  <ListItem.Content>
                    <ListItem.Title style={homeStyles.listItemTitle}>
                      {l.name}
                    </ListItem.Title>
                    <View style={homeStyles.listItemSubtitleContainer}>
                      <ListItem.Subtitle style={homeStyles.listItemSubtitle}>
                        {l.message}
                      </ListItem.Subtitle>
                      <View style={homeStyles.messageTimeContainer}>
                        <Text style={homeStyles.messageTime}>11:12 PM</Text>
                        <View style={homeStyles.padding}>
                          <View style={homeStyles.messageBadgeContainer}>
                            <Text style={homeStyles.messageBadgeText}>99</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </ListItem.Content>
                </ListItem>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {sessionState.menu && <MenuModal />}
        {sessionState.addFriend && (
          <AddModal
            close={SessionActions.sessionCloseAddFriend}
            show={sessionState.addFriend}
            title="Añadir amigos"
            search="Buscar usuarios"
            modalType="addFriend"
            data={userList}
          />
        )}
        {sessionState.addChat && (
          <AddModal
            close={SessionActions.sessionCloseAddChat}
            show={sessionState.addChat}
            title="Nuevo Chat"
            search="Buscar amigos"
            modalType="addChat"
          />
        )}
        {sessionState.group && (
          <AddModal
            close={SessionActions.sessionCloseGroup}
            show={sessionState.group}
            title="Agregar participantes..."
            search="Buscar amigos"
            modalType="group"
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Home;
