import axios from 'axios';

import { setAlert } from './notifier';

import {
  USERLIST_LOAD,
  USERLIST_RESET,
  USERLIST_UPDATE_PARAMS,
} from '../types';

import { axiosJSONConfig } from './config';

export const loadUserList = (params, page) => async dispatch => {
  console.log('>>>loadUser ' + page);
  const body = { ...params, page };
  try {
    const res = await axios.post('/api/user/all', body, axiosJSONConfig);
    const { users, page, totalPages, totalDocs } = res.data;
    dispatch({
      type: USERLIST_LOAD,
      payload: {
        users,
        page: page + 1,
        totalPages,
        totalDocs,
      },
    });
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
    setAlert('Load user list failed!')(dispatch);
  }
};

export const updateParams = params => dispatch => {
  dispatch({
    type: USERLIST_UPDATE_PARAMS,
    payload: params,
  });
};
