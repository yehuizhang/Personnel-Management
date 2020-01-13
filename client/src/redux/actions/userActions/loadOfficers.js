import axios from 'axios';
import { LOAD_OFFICER } from '../types';

export const loadOfficers = setAlert => async dispatch => {
  try {
    const res = await axios.get('/api/user/officers');
    dispatch({
      type: LOAD_OFFICER,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
    setAlert('Load officer failed');
  }
};
