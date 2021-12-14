import {types} from '../types/types';

export const initialSessionState = {
  id: '',
  name: '',
  lastName: '',
  email: '',
  username: '',
  birthday: '',
  phone: '',
  imageurl: null,
  privateProfile: false,
  privateInfo: false,
  easyAdd: false,
  menu: false,
  addFriend: false,
  addChat: false,
  group: false,
  profile: false,
  shareUser: false,
  contacts: [],
  friendRequests: [],
  followedRequests: [],
};

export const sessionReducer = (state = initialSessionState, action) => {
  switch (action.type) {
    case types.SessionAuthenticate:
      return {
        ...state,
        ...action.payload,
      };
    case types.SessionLogout:
      return {
        ...initialSessionState,
      };
    case types.SessionEditProfile:
      return {
        ...state,
        ...action.payload,
      };
    case types.SessionOpenMenu:
      return {
        ...state,
        ...action.payload,
      };
    case types.SessionCloseMenu:
      return {
        ...state,
        ...action.payload,
      };
    case types.SessionOpenAddFriend:
      return {
        ...state,
        ...action.payload,
      };
    case types.SessionCloseAddFriend:
      return {
        ...state,
        ...action.payload,
      };
    case types.SessionOpenAddChat:
      return {
        ...state,
        ...action.payload,
      };
    case types.SessionCloseAddChat:
      return {
        ...state,
        ...action.payload,
      };
    case types.SessionOpenGroup:
      return {
        ...state,
        ...action.payload,
      };
    case types.SessionCloseGroup:
      return {
        ...state,
        ...action.payload,
      };
    case types.SessionOpenProfile:
      return {
        ...state,
        ...action.payload,
      };
    case types.SessionCloseProfile:
      return {
        ...state,
        ...action.payload,
      };
    case types.SessionOpenShareUser:
      return {
        ...state,
        ...action.payload,
      };
    case types.SessionCloseShareUser:
      return {
        ...state,
        ...action.payload,
      };
    case types.SessionOpenContacts:
      return {
        ...state,
        ...action.payload,
      };
    case types.SessionDeleteContact:
      return {
        ...state,
        ...action.payload,
      };

    case types.SessionOpenFriendRequests:
      return {
        ...state,
        ...action.payload,
      };

    case types.SessionDeleteFriendRequest:
      return {
        ...state,
        ...action.payload,
      };

    case types.SessionOpenFollowersRequests:
      return {
        ...state,
        ...action.payload,
      };

    case types.SessionDeleteFollowerRequest:
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
