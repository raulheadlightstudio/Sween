import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from 'react-native';
import { followersById, pendingRequests, RejectUser } from '../api/ApiService';
import EditProfileHeader from '../components/Header/EditProfileHeader';
import RequestScreen from '../components/Request/RequestScreen';
import { GlobalSessionContext } from '../context/sessionContext';
import { editProfileStyles } from '../styles/editStyles';
import { loginStyles } from '../styles/login';
import { requestsStyles } from '../styles/requestsStyles';

const FollowRequests = ({ route, navigation }) => {
  const { sessionState, SessionActions, dispatchSession } =
    useContext(GlobalSessionContext);

  const { title } = route.params;
  const [myFollowers, setMyFollowers] = useState([]);

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
  };
  useEffect(() => {
    handleFollowed();
    dispatchSession(SessionActions.sessionCloseMenu());
    handleFollowers();
  }, []);

  const handleCancelFriendRequest = (sessionState, filterFollowed) => {
    dispatchSession(
      SessionActions.SessionDeleteFollowerRequest(sessionState, filterFollowed)
    );
  };

  const handleFusion = async obj => {
    const data = JSON.parse(await AsyncStorage.getItem('userInfo'));
    const id = data.userPublicId;
    await RejectUser(obj.userPublicId, id);
    const followed = await followersById(id);
    const filterFollowed = followed.data.data;
    handleCancelFriendRequest(sessionState, filterFollowed);
  };

  let arrayfollowed = sessionState.followedRequests;

  return (
    <KeyboardAvoidingView style={loginStyles.mainContainer} behavior="padding">
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={requestsStyles.container}>
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
