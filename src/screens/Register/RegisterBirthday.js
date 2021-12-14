import React, {useContext, useLayoutEffect, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StatusBar,
} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import 'moment/locale/es-mx';
import {
  registerBirthdayStyles,
  registerErrorStyles,
} from '../../styles/register';
import {GlobalRegisterContext} from '../../context/registerContext';
import {headerButtonsStyles} from '../../styles/registerRoute';

moment.locale('es-mx');

const RegisterBirthday = ({navigation}) => {
  const {registerState, RegisterActions, dispatchRegister} = useContext(
    GlobalRegisterContext,
  );
  const [date, setDate] = useState(new Date(Date.now()));
  const [limitDate] = useState(Date.now());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDateCorrect, setIsDateCorrect] = useState(false);

  useEffect(() => {
    showDatePicker();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDate(date);
    hideDatePicker();

    const dat = moment(date).format('YYYY-MM-DD');
    const limit = moment(limitDate).subtract(13, 'years');
    const isValid = moment(date).isBefore(limit);

    if (!isValid) {
      return dispatchRegister(
        RegisterActions.registerError('Tu edad debe ser mayor de 13xd años'),
      );
    } else {
      setIsDateCorrect(true);
      dispatchRegister(RegisterActions.registerError(''));
    }

    handleDate(dat);
  };

  const handleBack = () => {
    setDate(new Date());
    navigation.goBack();
  };
  const handleNext = () =>
    moment(date).format('LL') !== moment().format('LL') &&
    navigation.navigate('RegisterPhone') &&
    isDateCorrect;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={headerButtonsStyles.buttons}
          onPress={handleNext}>
          <Icon name="arrow-forward-ios" color="#0EADFF" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={headerButtonsStyles.buttons}
          onPress={handleBack}>
          <Icon name="arrow-back-ios" color="#0EADFF" />
        </TouchableOpacity>
      ),
    });
  });

  const handleDate = value => {
    dispatchRegister(RegisterActions.registerBirthday(value));
  };

  return (
    <KeyboardAvoidingView
      style={registerBirthdayStyles.mainContainer}
      behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
        <View style={registerBirthdayStyles.container}>
          <Text style={registerBirthdayStyles.titles} onPress={() => {}}>
            ¿Cuándo es tu cumpleaños?
          </Text>
          <View style={registerBirthdayStyles.inputsContainer}>
            <TouchableOpacity onPress={showDatePicker} activeOpacity={0.9}>
              <Text style={registerBirthdayStyles.inputsTitle}>CUMPLEAÑOS</Text>
              <TextInput
                autoCorrect={false}
                editable={false}
                keyboardType="numeric"
                clearButtonMode="while-editing"
                placeholder="Día/Mes/Año"
                value={registerState.birthday}
                style={registerBirthdayStyles.inputs}
              />
            </TouchableOpacity>

            {registerState.error !== '' && (
              <Text style={registerErrorStyles.text}>
                Tú edad debe ser mayor a 13
              </Text>
            )}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              display="spinner"
              onChange={handleDate}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterBirthday;
