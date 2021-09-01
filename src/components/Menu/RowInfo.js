import React from 'react';
import { Switch } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { rowInfoStyles } from '../../styles/rowInfoStyles';

const RowInfo = ({
  title,
  body,
  badge,
  logout,
  press,
  easyAdd,
  easyAddStatus,
  icon,
}) => {
  return (
    <TouchableOpacity style={rowInfoStyles.container} onPress={press}>
      <Text
        style={{ ...rowInfoStyles.title, color: logout ? '#0EADFF' : 'black' }}
      >
        {title}
      </Text>
      {badge ? (
        <View style={rowInfoStyles.badgeContainer}>
          <Text style={rowInfoStyles.badge}>{body}</Text>
        </View>
      ) : (
        <Text style={rowInfoStyles.link}>{body}</Text>
      )}
      {icon && (
        <View style={rowInfoStyles.badgeContainer}>
          <Icon
            name={icon}
            size={15}
            color="#FFF"
            style={{ transform: [{ rotate: '90deg' }] }}
          />
        </View>
      )}
      {easyAdd && (
        <Switch
          trackColor={{ false: '#000', true: '#0EADFF' }}
          thumbColor="#FFF"
          ios_backgroundColor="#F1F1F1"
          onValueChange={press}
          value={easyAddStatus}
        />
      )}
    </TouchableOpacity>
  );
};

export default RowInfo;
