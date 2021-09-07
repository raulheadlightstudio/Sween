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
              // <View style={styles.iconContainer}>
              //   {/*
              //   <TouchableOpacity>
              //     <Icon type="ionicon" name={'chatbubble'} color="white" />
              //   </TouchableOpacity>
              //   <TouchableOpacity>
              //     <Icon type="ionicon" name={'call'} color="white" />
              //   </TouchableOpacity>
              //   <TouchableOpacity>
              //     <Icon
              //       type="ionicon"
              //       name={'ellipsis-vertical'}
              //       color="white"
              //     />
              //   </TouchableOpacity> */}
              // </View>
              <View style={{ paddingRight: 15 }}>
                <TouchableOpacity>
                  <Icon type="ionicon" name={'chatbubble'} color="white" />
                </TouchableOpacity>
              </View>
            ),
            headerTitle: 'Sween',
            headerLeft: ({ navigation }) => (
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('goBack');
                  }}
                >
                  <Icon type="ionicon" name={'arrow-back'} color="white" />
                </TouchableOpacity>
                <Avatar
                  avatarStyle={{
                    borderWidth: 1.5,
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
