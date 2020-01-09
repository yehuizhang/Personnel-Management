import axios from 'axios';
import { LOAD_USER_SUCCESS, RESET_CURRENT_USER } from '../types';

const filterUserData = ({
  id,
  name,
  sex,
  rank,
  avatar,
  startDate,
  phone,
  email,
  superior,
}) => {
  const user = { name, sex, rank };
  if (id) {
    user.id = id;
  }
  if (avatar) {
    user.avatar = avatar;
  }
  if (startDate) {
    user.startDate = startDate;
  }
  if (phone) {
    user.phone =
      phone.length === 10
        ? `${phone.substring(0, 3)}-${phone.substring(3, 6)}-${phone.substring(
            6
          )}`
        : phone;
  }
  if (email) {
    user.email = email;
  }
  if (superior) {
    user.superior = superior._id;
  }
  return user;
};

export const addUser = async (userData, setAlert, unsetLoading, history) => {
  userData = filterUserData(userData);

  try {
    const body = JSON.stringify(userData);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.post('/api/user', body, config);
    unsetLoading();
    setAlert('User successfully added!', 'success');
    history.push('/');
  } catch (error) {
    unsetLoading();
    setAlert('Adding user failed.');
    console.error(error.response.data);
  }
};

export const updateUser = async (userData, setAlert, unsetLoading, history) => {
  try {
    if (userData.avatarFile) {
      const imagefd = new FormData();
      imagefd.append('image', userData.avatarFile, userData.avatarFile.name);
      const imageRes = await axios.post('/api/user/upload', imagefd);
      userData.avatar = imageRes.data.imageUrl;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    userData = filterUserData(userData);
    const body = JSON.stringify(userData);
    await axios.put('/api/user/', body, config);
    unsetLoading();
    setAlert('User successfully updated!', 'success');
    // history.push('/');
  } catch (error) {
    unsetLoading();
    setAlert('Updating user failed.');
    console.error(error);
  }
};

export const loadUserById = (
  id,
  unsetLoading,
  setAlert,
  history
) => async dispatch => {
  try {
    const res = await axios.get(`/api/user/${id}`);
    // const avatarRes = await axios.get(`/api/user/avatar/${id}`);
    // console.log(avatarRes.data);
    const userData = res.data;
    userData.id = userData._id;
    delete userData._id;
    if (userData.startDate) {
      userData.startDate = userData.startDate.substring(0, 10);
    }
    unsetLoading();
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: userData,
    });
  } catch (error) {
    unsetLoading();
    setAlert('Loading user failed.');
    history.push('/');
  }
};

export const resetCurrentUser = () => dispatch => {
  dispatch({
    type: RESET_CURRENT_USER,
  });
};
