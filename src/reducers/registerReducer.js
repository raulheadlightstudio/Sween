import {types} from '../types/types';

export const initialRegisterState = {
  name: '',
  birthday: '',
  phone: '',
  email: '',
  username: '',
  photo: '',
  error: '',
};

export const registerReducer = (state = initialRegisterState, action) => {
  switch (action.type) {
    case types.RegisterName:
      return {
        ...state,
        ...action.payload,
      };
    case types.RegisterBirthday:
      return {
        ...state,
        ...action.payload,
      };
    case types.RegisterPhone:
      return {
        ...state,
        ...action.payload,
      };
    case types.RegisterEmail:
      return {
        ...state,
        ...action.payload,
      };
    case types.RegisterUsername:
      return {
        ...state,
        ...action.payload,
      };
    case types.RegisterPhoto:
      return {
        ...state,
        ...action.payload,
      };
    case types.RegisterError:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return {
        state,
      };
  }
};
