import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { editPageStyles } from '../../styles/editStyles';

const SystemMsg = ({ messageType, msg }) => {
  return (
    <View>
      {messageType === 'privacyTerm' ? (
        <View
          style={{
            backgroundColor: 'rgba(14, 173, 255, 0.70)',
            borderRadius: 10,
            padding: 15,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontFamily: 'Metropolis-Regular',
              textAlign: 'auto',
              fontSize: 13,
            }}
          >
            {msg}
          </Text>
        </View>
      ) : null}
      {messageType === 'userAdded' ? (
        <View
          style={{
            backgroundColor: 'rgba(14, 173, 255, 0.70)',
            borderRadius: 10,
            padding: 15,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontFamily: 'Metropolis-Regular',
              textAlign: 'auto',
              fontSize: 13,
            }}
          >
            🙍‍♂️ Añadiste al usuario "CesarBriones2354" al grupo ...
          </Text>
        </View>
      ) : null}
      {messageType === 'systemDateMessage' ? (
        <View style={{ paddingBottom: 10 }}>
          <Text style={editPageStyles.lastMsgTitle}>24 de Agosto de 2021</Text>
        </View>
      ) : null}
    </View>
  );
};

export default SystemMsg;
