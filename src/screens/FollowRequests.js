import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { View } from 'react-native';
import { Alert } from 'react-native';
import { Image } from 'react-native';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from 'react-native';
import {
  followersById,
  pendingRequests,
  unfollowUser,
  getContacts,
  RejectUser,
} from '../api/ApiService';
import EditProfileHeader from '../components/Header/EditProfileHeader';
import RequestScreen from '../components/Request/RequestScreen';
import { GlobalSessionContext } from '../context/sessionContext';
import { editProfileStyles } from '../styles/editStyles';
import { loginStyles } from '../styles/login';
import { requestsStyles } from '../styles/requestsStyles';
import { followRequests } from '../utils/mockData';

const FollowRequests = ({ route, navigation }) => {
  const { sessionState, SessionActions, dispatchSession } =
    useContext(GlobalSessionContext);

  const { title } = route.params;
  const [myFollowers, setMyFollowers] = useState([]);
  const [followedByMe, setFollowedByMe] = useState([]);
  const [flag, setFlag] = useState(false);
  const [arrayData, setArrayData] = useState([]);

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const handleShowFriendRequests = () =>
    dispatchSession(SessionActions.SessionOpenFriendRequests);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => (
        <EditProfileHeader {...props} title={title} back={handleBack} />
      ),
    });
  });

  const handleFollowers = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('userInfo'));
    const idSession = data.userPublicId;
    const followers = await pendingRequests(idSession);

    setMyFollowers(followers);
  };

  // const handleFollowers = async () => {
  //   const data = JSON.parse(await AsyncStorage.getItem('userInfo'));
  //   const idSession = data.userPublicId;
  //   const followers = await pendingRequests(idSession);
  //   const promiseFollowed = await followersById(2); //quemado
  //   const arrayFollowed = promiseFollowed.data.data;

  //   // handleDispatchFollowed(sessionState, arrayFollowed);
  //   setMyFollowers(followers);
  // };

  const handleDispatchFollowed = (sessionState, arrayFollowed) => {
    dispatchSession(
      SessionActions.SessionOpenFollowersRequests(sessionState, arrayFollowed)
    );
  };

  const handleFollowed = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('userInfo'));
    const idSession = data.userPublicId;
    const followed = await followersById(idSession);

    const arrayFollowed = followed.data.data;

    handleDispatchFollowed(sessionState, arrayFollowed);

    setArrayData(arrayFollowed);

    setFollowedByMe(arrayFollowed);
    // const followedAsync = await AsyncStorage.setItem(
    //   'arrayFollowed',
    //   JSON.stringify(asyncFollowed)
    // );
    // await AsyncStorage.setItem('followed', JSON.stringify(followedByMe));
  };

  // useEffect(
  //   followedByMe => {
  //     console.log('Cambiaron las propsx', followedByMe);
  //   },
  //   [followedByMe]
  // );

  // const update = () => {
  //   const forceUpdate = useCallback(() => {
  //     setFollowedByMe([]);
  //   }, []);

  //   return forceUpdate;
  // };

  useEffect(() => {
    handleFollowed();
    dispatchSession(SessionActions.sessionCloseMenu());
    handleFollowers();
    console.log('Useffect 1');
  }, []);

  const handleCancelFriendRequest = (sessionState, filterFollowed) => {
    dispatchSession(
      SessionActions.SessionDeleteFollowerRequest(sessionState, filterFollowed)
    );
  };

  const handleFusion = async obj => {
    const data = JSON.parse(await AsyncStorage.getItem('userInfo'));
    const id = data.userPublicId;
    console.log('handleFusion');
    console.log(id, obj.userPublicId);
    await RejectUser(obj.userPublicId, id);
    console.log('Deleted ', obj.userPublicId);
    const followed = await followersById(id);
    const filterFollowed = followed.data.data;
    // console.log('filterFollowed', filterFollowed);
    handleCancelFriendRequest(sessionState, filterFollowed);
    // console.log('arrayfollowed', arrayfollowed); //da anteior
    setArrayData(filterFollowed);
    console.log('sessionState', sessionState); //da correctamente

    setFlag(!flag);

    // if (followedByMe.length === 1) {
    //   setFollowedByMe([]);
    // } else {
    //   const filters = followedByMe.filter(
    //     item => item.userPublicId != obj.userPublicId
    //   );
    //   // console.log('filters', filters);
    //   setFollowedByMe(filters);
    // }

    // Alert.alert(
    //   'Sween',
    //   'Estas seguro que quieres dejar de seguir a este usuario?',
    //   [
    //     {
    //       text: 'Cancel',
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'OK',
    //       onPress: () => unfollowUser(id, obj.userPublicId),
    //     },
    //   ]
    // );
  };

  let arrayfollowed = sessionState.followedRequests;

  useEffect(() => {
    console.log('Ejecutando bandera');
  }, [flag]);

  return (
    <KeyboardAvoidingView style={loginStyles.mainContainer} behavior="padding">
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={requestsStyles.container}>
          {/* {myFollowers.map(req => (
            <RequestScreen request={req} section={title} />
          ))} */}

          {title === 'Solicitudes de seguimiento' ? (
            <ScrollView style={requestsStyles.container}>
              {myFollowers.map(req => (
                <RequestScreen
                  request={req}
                  section={title}
                  key={req.userPublicId}
                />
              ))}
            </ScrollView>
          ) : (
            <ScrollView style={requestsStyles.container}>
              {arrayfollowed.map(req => (
                <RequestScreen
                  request={req}
                  section={title}
                  onPress={handleFusion}
                  key={req.userPublicId}
                />
              ))}
            </ScrollView>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default FollowRequests;
