import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ListItem, Avatar, Badge } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView, StatusBar, View } from 'react-native';
import { GlobalSessionContext } from '../context/sessionContext';
import { ScrollView } from 'react-native-gesture-handler';
import ListChat from '../components/Chat/ListChat';
import HeaderHome from '../components/Header/HeaderHome';
import { homeStyles } from '../styles/homeStyles';
import MenuModal from '../components/Menu/MenuModal';
import AddModal from '../components/Add/AddModal';
import {
  getMyGroups,
  getUserForNick,
  getCoGroups,
  getAllUsers,
} from '../api/ApiService';
import { Box, SectionList, Center, NativeBaseProvider } from 'native-base';
import { Text } from 'react-native';
import { opacity, width } from 'styled-system';
import { rowInfoStyles } from '../styles/rowInfoStyles';
import { TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [userImage, setUserImage] = useState('');
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState('');
  const { sessionState, SessionActions, dispatchSession } =
    useContext(GlobalSessionContext);

  const [groups, setGroups] = useState([]);
  const [imageUser, setImageUser] = useState('');

  const handleShowContacts = () =>
    dispatchSession(SessionActions.SessionOpenContacts);

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
  ];

  const validateUser = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    const image = await AsyncStorage.getItem('userImage');

    if (userInfo) {
      const data = JSON.parse(userInfo);
      // setUser(data);
      setUserImage(image);
      getImage();

      // console.log(user);
      // console.log(userImage);

      // console.log(imagen);

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

      // const r = await getUserForNick(sessionState.username);

      // console.log(sessionState);

      // console.log(r.data.data[0].imageurl.length); //system byte

      await AsyncStorage.setItem('id', data.userPublicId.toString());
      // console.log(r.data.data[0].userPublicId);
      // console.log(r.data.data[0].imageurl)

      const id = await AsyncStorage.getItem('id');
      const g = await getMyGroups(id);
      const lg = g.data.data.length;
      let a = [];
      if (lg > 0) {
        //console.log(g.data.data.length)
        for (let i = 0; i < lg; i++) {
          //console.log(g.data.data[i].groupId)
          a.push(g.data.data[i].groupId);
        }
        const co = await getCoGroups(a, id);
        setGroups(co.data); //Guardar a nivel storage, Setbandera(local storage)= para no renderizar muchas veces
        console.log(groups);
      }

      //const contacts = await getContacts(sessionState.id);
      //setContactsState([...contacts]);
    } else {
      navigation.replace('LogIn');
    }
  };

  const getImage = async () => {
    const userImage = await AsyncStorage.getItem('userImage');
    setImageUser('data:image/jpeg;base64,' + userImage);
    // console.log(imageUser);
  };

  const getUsers = async () => {
    const users = await getUserForNick('');
    // console.log(users.data.data);
    setUserList(users.data.data);
  };

  useEffect(() => {
    validateUser();
    getUsers();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => <HeaderHome {...props} />,
    });
  }, [navigation]);

  const handleSelect = index => {
    console.log('index', index);
  };

  return (
    <KeyboardAvoidingView style={homeStyles.main}>
      <StatusBar barStyle="light-content" backgroundColor="#ecf0f1" />
      <View style={homeStyles.container}>
        {/* <ScrollView style={homeStyles.scroll}>
          {groups?.map(chat => (
            <ListChat key={chat.id} chat={chat} />
          ))}
        </ScrollView> */}

        <View>
          {list.map((l, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                console.log('open chat...');
              }}
              activeOpacity={0.5}
            >
              <ListItem key={i} bottomDivider>
                <Avatar source={{ uri: l.avatar_url }} size="medium" rounded />
                <ListItem.Content>
                  <ListItem.Title style={{ fontFamily: 'Metropolis-Regular' }}>
                    {l.name}
                  </ListItem.Title>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      // backgroundColor: 'red',
                      height: 50,
                      width: '100%',
                    }}
                  >
                    <ListItem.Subtitle
                      style={{ fontFamily: 'Metropolis-Regular' }}
                    >
                      {l.message}
                    </ListItem.Subtitle>
                    {/* <View style={{flexDirection:"row",justifyContent:'space-evenly'}}> */}
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        // backgroundColor: 'red',
                        // height:'100%'
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'Metropolis-Regular',
                          fontSize: 14,
                          color: 'gray',
                        }}
                      >
                        11:12 PM
                      </Text>
                      <View style={{ padding: 10 }}>
                        <View
                          style={{
                            backgroundColor: '#0EADFF',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                            width: 20,
                            height: 20,
                            alignSelf: 'center',
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: 'Metropolis-Regular',
                              fontSize: 12,
                              color: '#F0F2F4',
                              fontWeight: 'bold',
                            }}
                          >
                            99
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* </View> */}
                  </View>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
          ))}
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
