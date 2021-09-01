import React, { useState } from 'react';
import { Camera } from 'expo-camera';
import { ActionSheetIOS } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Contacts from 'expo-contacts';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { chatMsgStyles } from '../../styles/chatStyles';
import {
  BottomSheet,
  BottomSheetProps,
  Button,
  ListItem,
  Text,
} from 'react-native-elements';

// const TextBarChat = ({ setPermissions, setImage }) => {
const TextBarChat = () => {
  const [isVisible, setIsVisible] = useState(false);
  // const handlePermissions = async () => {
  //   const { status } = await Camera.requestPermissionsAsync();
  //   setPermissions(status === 'granted');
  // };

  // const pickImage = async () => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const { status } =
  //         await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   })();

  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };

  const handleContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        sort: Contacts.SortTypes.FirstName,
      });

      if (data.length > 0) {
        const contact = data[0];
        console.log(data);
      }
    }
  };

  // const handleAdd = () => {
  //   ActionSheetIOS.showActionSheetWithOptions(
  //     {
  //       title: 'Más opciones...',
  //       options: ['Cámara', 'Fotos y videos', 'Contacto', 'GIF', 'Cancelar'],
  //       cancelButtonIndex: 4,
  //     },
  //     buttonIndex => {
  //       if (buttonIndex === 0) {
  //         handlePermissions();
  //       } else if (buttonIndex === 1) {
  //         pickImage();
  //       } else if (buttonIndex === 2) {
  //         handleContacts();
  //       }
  //     }
  //   );
  // };

  const handleAdd = () => {
    console.log('uwu');
  };

  return (
    <View style={chatMsgStyles.assetsContainer}>
      {/* <TouchableOpacity> */}
      <TouchableOpacity onPress={handleContacts}>
        <Icon name="add-circle" color="#5DC7FE" size={30} />
      </TouchableOpacity>
      <View style={chatMsgStyles.textBox}>
        <TextInput
          placeholder="Toca para chatear"
          style={chatMsgStyles.textInput}
          numberOfLines={1}
        >
          {/* <Icon name="gif" size={20} color="red" /> */}
        </TextInput>
      </View>
      <View style={chatMsgStyles.micContainer}>
        <Icon name="mic" color="#5DC7FE" size={30} />
      </View>
    </View>
  );
};

export default TextBarChat;
