import {types} from '../types/types';

const registerName = fullName => {
  const [name, lastName] = fullName.split(' ');
  return {
    type: types.RegisterName,
    payload: {
      name,
      lastName,
    },
  };
};

const registerBirthday = birthday => {
  return {
    type: types.RegisterBirthday,
    payload: {
      birthday,
    },
  };
};

const registerPhone = phone => {
  return {
    type: types.RegisterPhone,
    payload: {
      phone,
    },
  };
};

const registerEmail = email => {
  return {
    type: types.RegisterEmail,
    payload: {
      email,
    },
  };
};

const registerUsername = username => {
  return {
    type: types.RegisterUsername,
    payload: {
      username,
    },
  };
};

const registerPhoto = photo => {
  return {
    type: types.RegisterPhoto,
    payload: {
      photo,
    },
  };
};

const registerError = error => {
  return {
    type: types.RegisterPhoto,
    payload: {
      error,
    },
  };
};

const registerReset = () => {
  return {
    type: types.RegisterReset,
  };
};

const RegisterActions = {
  registerName,
  registerBirthday,
  registerPhone,
  registerEmail,
  registerUsername,
  registerReset,
  registerPhoto,
  registerError,
};

export default RegisterActions;
