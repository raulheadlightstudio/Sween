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
import { padding } from 'styled-system';
import { Avatar, Icon } from 'react-native-elements';

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
          options={({ navigation }) => ({
            headerRight: () => (
              <View style={styles.iconContainer}>
                <TouchableOpacity>
                  <Icon type="ionicon" name={'videocam'} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon type="ionicon" name={'call'} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon
                    type="ionicon"
                    name={'ellipsis-vertical'}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            ),
            headerTitle: 'Cesar Briones', //Username
            headerLeft: ({ navigation }) => (
              <View style={styles.iconContainer}>
                <Icon type="ionicon" name={'arrow-back'} color="white" />
                <Avatar
                  avatarStyle={{
                    borderWidth: 1,
                    borderColor: 'white',
                  }}
                  size="small"
                  rounded
                  onPress={() => console.log('ModalImage!')}
                  activeOpacity={0.7}
                  source={{
                    uri: 'https://res.cloudinary.com/dslc2vjcz/image/upload/v1629477020/gettyimages-1282775976-612x612_hy4dwo.jpg',
                  }}
                />
              </View>
            ),
            headerTitleStyle: { alignSelf: 'center' },
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
