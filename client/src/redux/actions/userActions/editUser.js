import axios from 'axios';
import { RESET_CURRENT_USER } from '../../types';

import { axiosJSONConfig } from '../config';
import { setAlert } from '../notifier';
import { unsetLoading, setLoading } from '../spinner';
import { filterUserData } from '../user';
import { reloadUserList } from '../userList';

const updateUser = (userData, history) => async dispatch => {
  setLoading()(dispatch);

  try {
    userData = await filterUserData(userData);
    await axios.put('/api/user/', userData, axiosJSONConfig);
    setAlert('User successfully updated!', 'success')(dispatch);
    reloadUserList()(dispatch);
    unsetLoading()(dispatch);
    history.push('/');
  } catch (error) {
    unsetLoading()(dispatch);
    setAlert('Updating user failed.')(dispatch);
    console.error(error);
  }
};

export default updateUser;
