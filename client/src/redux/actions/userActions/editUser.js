import axios from 'axios';

import { axiosJSONConfig } from '../config';
import loadOfficers from './loadOfficers';
import { setAlert } from '../notifier';
import { unsetLoading, setLoading } from '../spinner';
import { filterUserData } from '../user';

const updateUser = (userData, history) => async dispatch => {
  setLoading()(dispatch);
  userData = filterUserData(userData);
  try {
    // const body = JSON.stringify(userData);
    // await axios.put('/api/user/', body, axioConfig);
    unsetLoading()(dispatch);
    setAlert('User successfully updated!', 'success')(dispatch);
    loadOfficers()(dispatch);
    // history.push('/');
  } catch (error) {
    unsetLoading()(dispatch);
    setAlert('Updating user failed.')(dispatch);
    console.error(error);
  }
};

export default updateUser;
