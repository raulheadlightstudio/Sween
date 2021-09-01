import React, { useState } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Switch } from 'react-native';
import { TextInput } from 'react-native';
import { GlobalSessionContext } from '../../context/sessionContext';
import { editProfileStyles } from '../../styles/editStyles';

const EditSection = ({ section, change, profile }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const { name, birthday, username, phone, privateInfo, privateProfile } =
    profile;

  const renderContent = () => {
    switch (section) {
      case 'Nombre':
        return (
          <>
            <TextInput
              style={editProfileStyles.content}
              value={name}
              onChangeText={change}
            />
            <TextInput
              style={editProfileStyles.content}
              value={name}
              onChangeText={change}
            />
          </>
        );
        break;
      case 'Cumpleaños':
        return (
          <TextInput
            style={editProfileStyles.content}
            value={birthday}
            onChangeText={change}
          />
        );
        break;
      case 'Nombre de usuario':
        return (
          <TextInput
            style={editProfileStyles.content}
            value={username}
            onChangeText={change}
          />
        );
        break;
      case 'Número de móvil':
        return (
          <TextInput
            style={editProfileStyles.content}
            value={phone}
            onChangeText={change}
            keyboardType="numeric"
          />
        );
        break;
      case 'Contraseña':
        return (
          <TextInput
            style={editProfileStyles.content}
            placeholder="Contraseña actual"
            placeholderTextColor="#9A9FA7"
            onChangeText={change}
          />
        );
        break;
      case 'Configuración de privacidad':
        return (
          <>
            <View style={editProfileStyles.privacyContainer}>
              <Text style={editProfileStyles.privacyTitle}>Perfil Privado</Text>
              <Switch
                trackColor={{ false: '#000', true: '#0EADFF' }}
                thumbColor="#FFF"
                ios_backgroundColor="#F1F1F1"
                onValueChange={() => change(!true, 'privateProfile')}
                value={privateProfile}
              />
            </View>
            <View style={editProfileStyles.privacyContainer}>
              <Text style={editProfileStyles.privacyTitle}>
                Mantener privada mi información
              </Text>
              <Switch
                trackColor={{ false: '#000', true: '#0EADFF' }}
                thumbColor="#FFF"
                ios_backgroundColor="#F1F1F1"
                onValueChange={() => change(!true, 'privateInfo')}
                value={privateInfo}
              />
            </View>
          </>
        );
        break;

      default:
        break;
    }
  };

  return renderContent();
};

export default EditSection;
