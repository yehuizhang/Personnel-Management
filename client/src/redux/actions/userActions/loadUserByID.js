import axios from 'axios';

import { LOAD_USER_SUCCESS } from '../../types';
import { setAlert } from '../notifier';
import { setLoading, unsetLoading } from '../spinner';

export const loadUserById = (id, history) => async dispatch => {
  setLoading()(dispatch);
  try {
    const res = await axios.get(`/api/user/${id}`);
    const user = res.data;
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: user,
    });
  } catch (error) {
    setAlert('Loading user failed.')(dispatch);
    history.push('/');
  }
  unsetLoading()(dispatch);
};
