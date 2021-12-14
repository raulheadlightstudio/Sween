import axios from 'axios';
const baseURL = 'http://74.208.30.241:5000/api';
// 74.208.30.241

export const registerUser = async user => {
  const response = await axios.post(`${baseURL}/User`, user);
  return response;
};

export const getContacts = async id => {
  const response = await axios.get(`${baseURL}/Contacts/MyContacts?id=${id}`);
  return response;
};

export const getUserForNick = async name => {
  const response = await axios.get(`${baseURL}/User/Nick`, {
    params: {nick: name},
  });
  return response;
};

export const getUserForPhone = async phone => {
  const response = await axios.get(`${baseURL}/User/Cel`, {
    params: {cel: phone},
  });
  return response;
};

export const getCoGroups = async (array, id) => {
  const response = await axios.post(`${baseURL}/UserGroup/CoGroups`, array, {
    params: {id: id},
  });
  return response;
};

export const updateUserName = async (id, name) => {
  const response = await axios.put(
    `${baseURL}/User/Name?id=${id}&name=${name}`,
  );
  return response;
};

export const updateUserImage = async (id, base64image) => {
  const response = await axios.put(`${baseURL}/User/Image?id=${id}`, {
    base64: base64image,
  });

  return response;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${baseURL}/User/All`);

  return response;
};

export const sendFriendRequest = async (userPublicId, userPublicId2) => {
  const response = await axios.post(`${baseURL}/Contacts/Send`, {
    userPublicId: userPublicId,
    userPublicId2: userPublicId2,
  });
  return response;
};

export const pendingRequests = async id => {
  const response = await axios.get(`${baseURL}/Contacts/Pending?id=${id}`);
  const arrayRequests = response.data.data;

  return arrayRequests;
};

export const unfollowUser = async (id1, id2) => {
  const response = await axios.put(
    `${baseURL}/Contacts/Unfollow/${id1}/${id2}`,
  );
  return response;
};

export const followersById = async id => {
  const response = await axios.get(`${baseURL}/Contacts/Follow/?id=${id}`);
  return response;
};

export const AcceptUser = async (id, id2) => {
  const response = await axios.put(`${baseURL}/Contacts/Accept/${id2}/${id}`);
  return response;
};

export const RejectUser = async (id, id2) => {
  const response = await axios.put(`${baseURL}/Contacts/Reject/${id2}/${id}`);
  return response;
};

export const createGroup = async groupInfo => {
  console.log('groupInfo', groupInfo);
  const response = await axios.post(`${baseURL}/Group`, groupInfo);
  return response;
};

export const addUserGroup = async userInfo => {
  const response = await axios.post(`${baseURL}/UserGroup`, userInfo);
  return response;
};

export const getMyGroups = async (nick, id) => {
  const response = await axios.get(
    `${baseURL}/Group/MyGroups?nick=${nick}&id=${id}`,
  );
  return response;
};

export const getMyUserGroup = async id => {
  const response = await axios.get(`${baseURL}/UserGroup/MyGroups?id=${id}`);
  return response;
};

export const getMessagesFromGroup = async (id, pageNumber) => {
  const response = await axios.get(
    `${baseURL}/Message/FromGroup?id=${id}&pageNumber=${pageNumber}`,
  );
  return response;
};

export const addMessages = async messageBody => {
  console.log('messageBody', messageBody);
  const response = await axios.post(`${baseURL}/Message`, messageBody);
  return response;
};
