import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import DateTimePicker from '@react-native-community/datetimepicker';
import 'moment/locale/es-mx';
import moment from 'moment';
import EditSection from '../components/Edit/EditSection';
import EditProfileHeader from '../components/Header/EditProfileHeader';
import { GlobalSessionContext } from '../context/sessionContext';
import { editProfileStyles } from '../styles/editStyles';
import { loginStyles } from '../styles/login';
import { registerErrorStyles } from '../styles/register';

moment.locale('es-mx');

const EditProfile = ({ navigation, route }) => {
  const { sessionState, SessionActions, dispatchSession } =
    useContext(GlobalSessionContext);

  const [date, setDate] = useState(new Date());

  const [profileState, setProfileState] = useState({});

  const { name, birthday, username, phone, privateInfo, privateProfile } =
    sessionState;

  const { title } = route.params;

  const onChange = (_, selectedDate) => {
    setDate(selectedDate);
    handleDate(selectedDate);
  };

  const handleDate = value => {
    const section = selectSection(title);
    setProfileState(
      Object.assign({}, profileState, { [section]: moment(value).format('LL') })
    );
  };

  const handleBack = () => {
    dispatchSession(SessionActions.sessionEditProfile(profileState));
    navigation.navigate('Home');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => (
        <EditProfileHeader {...props} title={title} back={handleBack} />
      ),
    });
  });

  useEffect(() => {
    dispatchSession(SessionActions.sessionCloseMenu());
    setProfileState({
      name,
      birthday,
      username,
      phone,
      privateInfo,
      privateProfile,
    });

    if (birthday !== '') {
      let date = birthday.split('-');
      let day = date[2];
      let month = moment().month(date[1]).get('month');
      let year = date[0];
      month = month < 10 ? `0${month + 1}` : month + 1;

      setDate(new Date(moment(`${year}-${month}-${day}`)));
    }
  }, []);

  const selectToolTip = () => {
    switch (title) {
      case 'Nombre':
        return 'De esta manera aparecer??s en Sween, as?? que elige un nombre con el que te conozcan tus amigos.';
      case 'Cumplea??os':
        return 'Elige con cuidado, solo puedes cambiar tu fecha de nacimiento una cantidad limitada de veces.';
      case 'Nombre de usuario':
        return 'De esta manera aparecer??s en Sween, as?? que elige un nombre con el que te conozcan tus amigos.';
      case 'N??mero de m??vil':
        return 'De esta manera aparecer??s en Sween, as?? que elige un nombre con el que te conozcan tus amigos.';
      case 'Contrase??a':
        return 'Para configurar una nueva contrase??a, escribe primero tu contrase??a actual';
      case 'Configuraci??n de privacidad':
        return 'De esta manera aparecer??s en Sween, as?? que elige un nombre con el que te conozcan tus amigos.';
      default:
        break;
    }
  };

  const selectSection = section => {
    switch (section) {
      case 'Nombre':
        return 'name';
      case 'Cumplea??os':
        return 'birthday';
      case 'N??mero de m??vil':
        return 'phone';
      case 'Nombre de usuario':
        return 'username';
      case 'Configuraci??n de privacidad':
        return 'privateProfile';
      default:
        break;
    }
  };

  const handleEdit = (value, target) => {
    const section = selectSection(title);

    if (target) {
      setProfileState(
        Object.assign({}, profileState, { [target]: !profileState[target] })
      );
      return;
    }

    setProfileState(Object.assign({}, profileState, { [section]: value }));
  };

  return (
    <KeyboardAvoidingView style={loginStyles.mainContainer} behavior="padding">
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={editProfileStyles.container}>
          <Text style={editProfileStyles.toolTip}>{selectToolTip()}</Text>
          <EditSection
            section={title}
            change={handleEdit}
            profile={profileState}
          />
          {moment(birthday).format('LL') === moment().format('LL') && (
            <Text style={registerErrorStyles.text}>
              T?? edad debe ser mayor a 18
            </Text>
          )}
          {title === 'Contrase??a' && (
            <TouchableOpacity>
              <Text style={loginStyles.button}>??Olvidaste tu contrase??a?</Text>
            </TouchableOpacity>
          )}
          {title === 'Cumplea??os' && (
            <DateTimePicker
              value={date}
              maximumDate={date}
              minimumDate={new Date(new Date().getFullYear() - 100)}
              mode="date"
              display="spinner"
              locale="es-ES"
              onChange={onChange}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
