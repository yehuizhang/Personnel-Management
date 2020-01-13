import axios from 'axios';

import { axiosJSONConfig } from '../config';
import { setAlert } from '../notifier';
import { unsetLoading, setLoading } from '../spinner';
import { filterUserData } from '../user';

const updateUser = (userData, history) => async dispatch => {
  setLoading()(dispatch);

  try {
    userData = await filterUserData(userData);
    await axios.put('/api/user/', userData, axiosJSONConfig);
    unsetLoading()(dispatch);
    setAlert('User successfully updated!', 'success')(dispatch);
    // history.push('/');
  } catch (error) {
    unsetLoading()(dispatch);
    setAlert('Updating user failed.')(dispatch);
    console.error(error);
  }
};

export default updateUser;
