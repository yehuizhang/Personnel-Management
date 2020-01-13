import axios from 'axios';

import { axiosJSONConfig } from '../config';
import { setAlert } from '../notifier';
import { unsetLoading, setLoading } from '../spinner';
import { filterUserData } from '../user';

const addUser = (userData, history) => async dispatch => {
  setLoading()(dispatch);
  userData = filterUserData(userData);
  try {
    const body = userData;
    console.log(userData);
    // await axios.post('/api/user', body, axiosJSONConfig);
    unsetLoading()(dispatch);
    setAlert('User successfully added!', 'success')(dispatch);
    history.push('/');
  } catch (error) {
    unsetLoading()(dispatch);
    setAlert('Adding user failed.');
    console.error(error);
  }
};

export default addUser;
