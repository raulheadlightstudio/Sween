import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { AcceptUser, followersById, RejectUser } from '../../api/ApiService';
import { GlobalSessionContext } from '../../context/sessionContext';
import { requestsStyles } from '../../styles/requestsStyles';

const RequestScreen = ({ request, section, onPress }) => {
  const { sessionState, SessionActions, dispatchSession } =
    useContext(GlobalSessionContext);

  const handleDeleteFollowerApi = async userPublicId => {
    // dispatchSession(
    //   SessionActions.SessionDeleteFollowerRequest(sessionState, followersArray)
    // );

    console.log('userPublicId', userPublicId);
  };

  const handleReject = async id => {
    const data = JSON.pfollowedArrayarse(
      await AsyncStorage.getItem('userInfo')
    );
    const idSession = data.userPublicId;
    RejectUser(idSession, id);
  };

  const [stateRequest, setStateRequest] = useState([]);

  const { imageurl, userName, userLastName, userPublicName, userPublicId } =
    stateRequest;

  const handleAccept = async id => {
    const data = JSON.parse(await AsyncStorage.getItem('userInfo'));
    const idSession = data.userPublicId;
    AcceptUser(idSession, id);
  };

  // const handleUnfollow = async obj => {
  //   const data = JSON.parse(await AsyncStorage.getItem('userInfo'));
  //   const idSession = data.userPublicId;

  //   Alert.alert(
  //     'Sween',
  //     'Estas seguro que quieres dejar de seguir a este usuario?',
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'OK',
  //         onPress: () => handleTesting(idSession, obj),
  //       },
  //     ]
  //   );
  // };

  // const handleTesting = async (id, obj) => {
  //   stateRequest.unshift(obj);
  //   await unfollowUser(id, obj.userPublicId);
  // };

  useEffect(() => {
    setStateRequest(request);
    // console.log('request', request);
  }, []);

  const Item = ({
    imageurl,
    userName,
    userLastName,
    userPublicName,
    userPublicId,
  }) => (
    <View style={requestsStyles.requestContainer}>
      <View style={requestsStyles.imgContainer}>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,' + imageurl,
          }}
          style={requestsStyles.imgRequest}
        />
      </View>
      <View style={requestsStyles.requestInfoContainer}>
        <Text style={requestsStyles.requestName}>
          {userName} {userLastName}
        </Text>
        {section === 'Solicitudes de seguimiento' && (
          <Text style={requestsStyles.requestUsername}>@{userPublicName}</Text>
        )}
      </View>
      {section === 'Solicitudes de seguimiento' && (
        <View style={requestsStyles.actionsContainer}>
          <TouchableOpacity
            style={requestsStyles.add}
            onPress={() => {
              handleAccept(userPublicId);
            }}
          >
            <Icon name="watch-later" color="#FFF" size={20} />
            <Text style={requestsStyles.addText}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={requestsStyles.delete}
            onPress={() => {
              handleReject(userPublicId);
            }}
          >
            <Icon name="close" color="#0EADFF" size={20} />
          </TouchableOpacity>
        </View>
      )}
      <View style={requestsStyles.actionsBlock}>
        <TouchableOpacity
          style={requestsStyles.delete}
          onPress={() => {
            onPress(stateRequest) && console.log(userPublicId);
          }}
        >
          <Icon name="block" color="#0EADFF" size={20} />
        </TouchableOpacity>
      </View>
      {/* {section === 'Usuarios que sigues' &&
      (stateRequest.blocked ? (
        <View style={requestsStyles.actionsContainer}>
          <TouchableOpacity style={requestsStyles.add}>
            <Text style={requestsStyles.addText}>Desbloquear</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={requestsStyles.actionsBlock}>
          <TouchableOpacity
            style={requestsStyles.delete}
            onPress={() => {
              onPress(stateRequest);
            }}
          >
            <Icon name="block" color="#0EADFF" size={20} />
          </TouchableOpacity>
        </View>
      ))} */}
    </View>
  );

  return (
    <View style={requestsStyles.requestContainer}>
      <View style={requestsStyles.imgContainer}>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,' + imageurl,
          }}
          style={requestsStyles.imgRequest}
        />
      </View>
      <View style={requestsStyles.requestInfoContainer}>
        <Text style={requestsStyles.requestName}>
          {userName} {userLastName}
        </Text>
        {section === 'Solicitudes de seguimiento' && (
          <Text style={requestsStyles.requestUsername}>@{userPublicName}</Text>
        )}
      </View>
      {section === 'Solicitudes de seguimiento' && (
        <View style={requestsStyles.actionsContainer} key={userName}>
          <TouchableOpacity
            style={requestsStyles.add}
            onPress={() => {
              handleAccept(userPublicId);
            }}
          >
            <Icon name="watch-later" color="#FFF" size={20} />
            <Text style={requestsStyles.addText}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={requestsStyles.delete}
            onPress={() => {
              handleReject(userPublicId);
            }}
          >
            <Icon name="close" color="#0EADFF" size={20} />
          </TouchableOpacity>
        </View>
      )}
      <View style={requestsStyles.actionsBlock}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ marginRight: 10 }}>
            <Text style={{ color: '#0EADFF', fontSize: 13, top: 5 }}>
              Cancelar Solicitud
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={requestsStyles.delete}
              onPress={() => {
                onPress(stateRequest);
              }}
            >
              <Icon
                name="close-circle-outline"
                type="ionicon"
                color="#0EADFF"
                size={15}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* {section === 'Usuarios que sigues' &&
        (stateRequest.blocked ? (
          <View style={requestsStyles.actionsContainer}>
            <TouchableOpacity style={requestsStyles.add}>
              <Text style={requestsStyles.addText}>Desbloquear</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={requestsStyles.actionsBlock}>
            <TouchableOpacity
              style={requestsStyles.delete}
              onPress={() => {
                onPress(stateRequest);
              }}
            >
              <Icon name="block" color="#0EADFF" size={20} />
            </TouchableOpacity>
          </View>
        ))} */}
    </View>
  );
};

export default RequestScreen;
