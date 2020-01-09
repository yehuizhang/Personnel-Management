import axios from 'axios';
import { rankMap } from '../../util/staticData';
import { LOAD_OFFICER } from '../types';

export const loadOfficers = setAlert => async dispatch => {
  try {
    const res = await axios.get('/api/user/officers');
    const officers = res.data.map(officer => ({
      ...officer,
      rank: rankMap.get(officer.rank)[0],
    }));
    dispatch({
      type: LOAD_OFFICER,
      payload: officers,
    });
  } catch (error) {
    console.error(error);
    setAlert('Load officer failed');
  }
};
