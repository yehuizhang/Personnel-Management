import axios from 'axios';
import { LOAD_OFFICER } from '../../types';
import { setAlert } from '../notifier';

const loadOfficers = () => async dispatch => {
  try {
    const res = await axios.get('/api/user/officers');
    dispatch({
      type: LOAD_OFFICER,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
    setAlert('Load officer failed')(dispatch);
  }
};

export default loadOfficers;
