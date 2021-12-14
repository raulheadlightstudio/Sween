import {types} from '../types/types';

const sessionAuthenticate = ({
  name,
  lastName,
  email,
  username,
  birthday,
  phone,
  id,
}) => {
  return {
    type: types.SessionAuthenticate,
    payload: {
      id,
      name,
      lastName,
      email,
      username,
      birthday,
      phone,
    },
  };
};

const sessionOpenMenu = () => {
  return {
    type: types.SessionOpenMenu,
    payload: {
      menu: true,
    },
  };
};

const sessionEditProfile = profile => {
  return {
    type: types.SessionEditProfile,
    payload: {...profile},
  };
};

const sessionCloseMenu = () => {
  return {
    type: types.SessionCloseMenu,
    payload: {
      menu: false,
    },
  };
};

const sessionOpenAddFriend = () => {
  return {
    type: types.SessionOpenAddFriend,
    payload: {
      addFriend: true,
    },
  };
};

const sessionCloseAddFriend = () => {
  return {
    type: types.SessionCloseAddFriend,
    payload: {
      addFriend: false,
    },
  };
};

const sessionOpenAddChat = () => {
  console.log('sessionOpenAddChat');
  return {
    type: types.SessionOpenAddChat,
    payload: {
      addChat: true,
    },
  };
};

const sessionCloseAddChat = () => {
  console.log('sessionCloseAddChat');
  return {
    type: types.SessionCloseAddChat,
    payload: {
      addChat: false,
    },
  };
};

const sessionOpenGroup = () => {
  return {
    type: types.SessionOpenGroup,
    payload: {
      group: true,
    },
  };
};

const sessionCloseGroup = () => {
  return {
    type: types.SessionCloseGroup,
    payload: {
      group: false,
    },
  };
};

const sessionOpenProfile = () => {
  return {
    type: types.SessionOpenProfile,
    payload: {
      profile: true,
    },
  };
};

const sessionCloseProfile = () => {
  return {
    type: types.SessionCloseProfile,
    payload: {
      profile: false,
    },
  };
};

const sessionOpenShareUser = () => {
  return {
    type: types.SessionOpenShareUser,
    payload: {
      profile: false,
      shareUser: true,
    },
  };
};

const sessionCloseShareUser = () => {
  return {
    type: types.SessionCloseShareUser,
    payload: {
      shareUser: true,
    },
  };
};

const SessionOpenContacts = (state, contactsArray) => {
  return {
    type: types.SessionOpenContacts,
    payload: {
      ...state,
      contacts: contactsArray,
    },
  };
};

const SessionDeleteContact = (
  state,
  idSession,
  userPublicId,
  filterFollowed,
) => {
  // console.log('unfollowList', unfollowList);
  return {
    type: types.SessionDeleteContact,
    payload: {
      ...state,
      contacts: filterFollowed,
    },
  };
};

const SessionOpenFriendRequests = (state, contactsArray) => {
  console.log('state', state);
  return {
    type: types.SessionOpenFriendRequests,
    payload: {
      ...state,
      contacts: contactsArray,
    },
  };
};

const SessionDeleteFriendRequest = (
  state,
  idSession,
  userPublicId,
  filterFollowed,
) => {
  return {
    type: types.SessionDeleteFriendRequest,
    payload: {
      ...state,
      contacts: filterFollowed,
    },
  };
};

const SessionOpenFollowersRequests = (state, followersArray) => {
  return {
    type: types.SessionOpenFollowersRequests,
    payload: {
      ...state,
      followedRequests: followersArray,
    },
  };
};

const SessionDeleteFollowerRequest = (state, filterFollowed) => {
  // console.log('filterFollowed', filterFollowed);
  return {
    type: types.SessionDeleteFollowerRequest,
    payload: {
      ...state,
      followedRequests: filterFollowed,
    },
  };
};

const sessionLogout = () => ({type: types.SessionLogout, payload: {}});

const SessionActions = {
  sessionAuthenticate,
  sessionLogout,
  sessionOpenMenu,
  sessionCloseMenu,
  sessionOpenAddFriend,
  sessionCloseAddFriend,
  sessionOpenAddChat,
  sessionCloseAddChat,
  sessionOpenGroup,
  sessionCloseGroup,
  sessionOpenProfile,
  sessionCloseProfile,
  sessionEditProfile,
  sessionOpenShareUser,
  sessionCloseShareUser,
  SessionOpenContacts,
  SessionDeleteContact,
  SessionOpenFriendRequests,
  SessionDeleteFriendRequest,
  SessionOpenFollowersRequests,
  SessionDeleteFollowerRequest,
};

export default SessionActions;
