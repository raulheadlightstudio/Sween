import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { Badge, Avatar } from 'react-native-elements';
import {
  addUserGroup,
  createGroup,
  getContacts,
  getMyGroups,
  sendFriendRequest,
  unfollowUser,
} from '../../api/ApiService';
import { GlobalSessionContext } from '../../context/sessionContext';
import { addContactRowStyles } from '../../styles/modalStyles';
import { registerImgStyles } from '../../styles/register';
import { useNavigation } from '@react-navigation/native';

const AddContactRow = ({
  contact: { userName, userPublicId, userPublicName, imageurl },
  type,
  select,
  unselect,
  selected,
}) => {
  const addChat = () => select(id);
  const subtractChat = () => unselect(id);

  const navigation = useNavigation();

  const verified = true;
  const online = true;
  const follow = true;
  const [friendRequest, setFriendRequest] = useState(false);
  const [groupType, setGroupType] = useState(1);
  const [groupList, setGroupList] = useState([]);
  const [found, setFound] = useState(false);
  const { sessionState, SessionActions, dispatchSession } =
    useContext(GlobalSessionContext);

  const asyncGetMyGroups = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('userInfo'));
    const username = data.userPublicName;
    const resp = await getMyGroups(username);
    setGroupList(resp.data.data);
  };

  const handleChat = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('userInfo'));
    const username = data.userPublicName;
    const userId = data.userPublicId;

    if (groupType === 1) {
      const json = {
        groupType: groupType,
        groupDescription: 'sween14',
        xuser: username,
      };

      // const myGroups = asyncGetMyGroups();

      // for (var i = 0; i < groupList.length; i++) {
      //   // console.log(groupList[i].groupDescription)
      //   if (groupList[i].groupDescription === 'string') {
      //     setFound(true);
      //   } else {
      //     setFound(false);
      //   }
      // }

      // if (found) {
      //   console.log('No crear el chat ya que ya existe');
      // } else {
      //   console.log('Logica apra crear el chat');
      // }

      console.log('Zacks id', userPublicId);

      try {
        const response = await createGroup(json);
        console.log('response.data.groupId', response.data.groupId);
        const json2 = {
          userId: userId,
          groupId: response.data.groupId,
        };
        const json3 = {
          userId: userPublicId,
          groupId: response.data.groupId,
        };
        try {
          const resp = await addUserGroup(json2);
          const resp2 = await addUserGroup(json3);

          Alert.alert('Sween', 'Grupo creado con Exito!', [
            {
              text: 'Confirmar',
            },
          ]);
          navigation.navigate('ChatRoom');
        } catch (error) {
          Alert.alert('Sween', error, [
            {
              text: 'Confirmar',
            },
          ]);
        }
      } catch (error) {
        Alert.alert('Sween', error, [
          {
            text: 'Confirmar',
          },
        ]);
      }
    } else {
      Alert.alert('Sween', 'Invalid group Type', [
        {
          text: 'Confirmar',
        },
      ]);
    }
  };

  const handleDeleteContact = (
    sessionState,
    idSession,
    userPublicId,
    unfollowList
  ) => {
    dispatchSession(
      SessionActions.SessionDeleteContact(
        sessionState,
        idSession,
        userPublicId,
        unfollowList
      )
    );
  };

  const handleDeleteContactApi = async userPublicId => {
    const data = JSON.parse(await AsyncStorage.getItem('userInfo'));
    const idSession = data.userPublicId;
    await unfollowUser(idSession, userPublicId);
    const followed = await getContacts(idSession);
    const filterFollowed = followed.data.data;
    handleDeleteContact(sessionState, idSession, userPublicId, filterFollowed);
  };

  const handleUnfollowUser = async userPublicId => {
    const data = JSON.parse(await AsyncStorage.getItem('userInfo'));
    const idSession = data.userPublicId;

    Alert.alert(
      'Sween',
      'Estas seguro de borrar a este usuario de tu lista de amigos?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleDeleteContactApi(userPublicId),
        },
      ]
    );
  };

  const handleAddUser = async idRequest => {
    const data = JSON.parse(await AsyncStorage.getItem('userInfo'));
    const idSession = data.userPublicId;

    setFriendRequest(!friendRequest);
    sendFriendRequest(idSession, idRequest);
  };

  return (
    <View style={addContactRowStyles.container}>
      <View style={addContactRowStyles.imgContainer}>
        <Avatar
          rounded
          size="medium"
          source={{
            uri: 'data:image/jpeg;base64,' + imageurl,
          }}
        >
          {verified ? (
            <Avatar.Accessory
              name="checkmark-outline"
              type="ionicon"
              size={15}
              style={registerImgStyles.verifiedAccesory}
            />
          ) : null}
        </Avatar>
        {online ? (
          <Badge
            status="success"
            containerStyle={{ position: 'absolute', top: 5, right: 20 }}
          />
        ) : (
          <Badge
            status="error"
            containerStyle={{ position: 'absolute', top: 5, right: 20 }}
          />
        )}
      </View>
      <View style={addContactRowStyles.titlesContainer}>
        <Text style={addContactRowStyles.title}>{userName}</Text>
        <Text style={addContactRowStyles.subTitle}>@{userPublicName}</Text>
      </View>

      {type === 'myContacts' ? (
        follow ? (
          <TouchableOpacity
            onPress={() => {
              handleUnfollowUser(userPublicId);
            }}
            style={addContactRowStyles.pendingContainer}
          >
            <View>
              <Text style={addContactRowStyles.pendingTitle}>Unfriend</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={addContactRowStyles.pendingContainer}>
            <Text style={addContactRowStyles.pendingTitle}>Follow</Text>
          </View>
        )
      ) : null}

      {type === 'addChat' ? (
        follow ? (
          <TouchableOpacity
            onPress={() => {
              handleChat();
            }}
            style={addContactRowStyles.pendingContainer}
          >
            <View>
              <Text style={addContactRowStyles.pendingTitle}>Chatxd</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={addContactRowStyles.pendingContainer}>
            <Text style={addContactRowStyles.pendingTitle}>Follow</Text>
          </View>
        )
      ) : null}

      {type === 'addFriend' ? (
        friendRequest ? (
          <View style={addContactRowStyles.pendingContainer}>
            <TouchableOpacity
              onPress={() => {
                handleAddUser(userPublicId);
              }}
            >
              <Text style={addContactRowStyles.pendingTitle}>Unfollow</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={addContactRowStyles.pendingContainer}>
            <TouchableOpacity
              onPress={() => {
                handleAddUser(userPublicId);
              }}
            >
              <Text style={addContactRowStyles.pendingTitle}>Follow</Text>
            </TouchableOpacity>
          </View>
        )
      ) : null}
    </View>
  );
};

export default AddContactRow;
