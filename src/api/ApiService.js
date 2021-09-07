import axios from 'axios';
const baseURL = 'http://62.151.178.246:8080/sweenapi/api';

export const registerUser = async user => {
  const response = await axios.post(`${baseURL}/User`, user);
  return response;
};

export const getContacts = async id => {
  console.log(id);
  const response = await axios.get(`${baseURL}/Contacts/MyContacts?id=${id}`);
  return response;
};

export const getUserForNick = async name => {
  const response = await axios.get(`${baseURL}/User/Nick`, {
    params: { nick: name },
  });
  return response;
};

export const getUserForPhone = async phone => {
  const response = await axios.get(`${baseURL}/User/Cel`, {
    params: { cel: phone },
  });
  return response;
};

export const getCoGroups = async (array, id) => {
  const response = await axios.post(`${baseURL}/UserGroup/CoGroups`, array, {
    params: { id: id },
  });
  return response;
};

export const updateUserName = async (id, name) => {
  console.log('id', id, 'name', name);
  const response = await axios.put(
    `${baseURL}/User/Name?id=${id}&name=${name}`
  );
  return response;
};

export const updateUserImage = async (id, base64image) => {
  // console.log('JSON.stringify(base64image)', JSON.stringify(base64image));
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
    `${baseURL}/Contacts/Unfollow/${id1}/${id2}`
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
  console.log('userInfo', userInfo);
  const response = await axios.post(`${baseURL}/UserGroup`, userInfo);
  return response;
};

export const getMyGroups = async nick => {
  const response = await axios.get(`${baseURL}/Group/MyGroups?nick=${nick}`);
  return response;
};
