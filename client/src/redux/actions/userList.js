import axios from 'axios';

import { setAlert } from './notifier';

import {
  USERLIST_INITIAL_LOAD,
  USERLIST_MORE_LOAD,
  USERLIST_UPDATE_PARAMS,
} from '../types';

import { axiosJSONConfig } from './config';

export const initialLoad = params => async dispatch => {
  const body = { ...params, page: 1 };
  try {
    const res = await axios.post('/api/user/all', body, axiosJSONConfig);
    const { users, page, totalPages } = res.data;
    dispatch({
      type: USERLIST_INITIAL_LOAD,
      payload: {
        users,
        page,
        totalPages,
      },
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response.data);
    }
    setAlert('Load user list failed!')(dispatch);
  }
};

export const moreLoad = (params, page) => async dispatch => {
  const body = { ...params, page };
  try {
    const res = await axios.post('/api/user/all', body, axiosJSONConfig);
    const { users, page } = res.data;
    dispatch({
      type: USERLIST_MORE_LOAD,
      payload: {
        users,
        page,
      },
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response.data);
    }
    setAlert('Load user list (more) failed!')(dispatch);
  }
};

export const updateParams = params => dispatch => {
  dispatch({
    type: USERLIST_UPDATE_PARAMS,
    payload: params,
  });
};
