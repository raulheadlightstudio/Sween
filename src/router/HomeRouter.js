import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SessionContext from '../context/sessionContext';
import Edit from '../screens/Edit';
import EditProfile from '../screens/EditProfile';
import FollowRequests from '../screens/FollowRequests';
import Home from '../screens/Home';
import RoomChat from '../screens/RoomChat';
import ChatRoom from '../screens/Chat/ChatRoom';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ChatHeaderLeft from '../components/Chat/ChatHeaderLeft';

const Stack = createStackNavigator();

const HomeRouter = () => {
  return (
    <SessionContext>
      <Stack.Navigator headerMode="screen" initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="Follow Requests" component={FollowRequests} />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            gestureDirection: 'horizontal-inverted',
          }}
        />
        <Stack.Screen name="Chat" component={RoomChat} />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={({ route, navigation }) => ({
            headerRight: () => (
              <View style={{ paddingRight: 15 }}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('route', route.params.userPublicId);
                  }}
                >
                  <Icon type="ionicon" name={'chatbubble'} color="white" />
                </TouchableOpacity>
              </View>
            ),
            headerTitle: route.params.dataUser.userName,
            headerLeft: () => <ChatHeaderLeft imageurl={route.params.dataUser.imageurl} />,
            // headerLeft: () => (
            //   <View style={styles.iconContainer}>
            //     <TouchableOpacity
            //       onPress={() => {
            //         navigation.navigate('Home');
            //       }}
            //     >
            //       <Icon type="ionicon" name={'arrow-back'} color="white" />
            //     </TouchableOpacity>
            //     <Avatar
            //       avatarStyle={{
            //         borderWidth: 1.5,
            //         borderColor: 'white',
            //       }}
            //       size="small"
            //       rounded
            //       onPress={() => console.log('ModalImage!')}
            //       activeOpacity={0.7}
            //       source={{
            //         uri:
            //           'data:image/jpeg;base64,' +
            //           route.params.dataUser.imageurl,
            //       }}
            //     />
            //   </View>
            // ),
            headerTitleStyle: { alignSelf: 'flex-start', padding: 25 },
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#0EADFF',
            },
          })}
        />
      </Stack.Navigator>
    </SessionContext>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 100,
  },
});

export default HomeRouter;
