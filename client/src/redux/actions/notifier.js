import { SET_ALERT, REMOVE_ALERT } from '../types';
import uuid from 'uuid/v4';

export const setAlert = (message, variant = 'error') => dispatch => {
  const key = uuid();
  dispatch({
    type: SET_ALERT,
    payload: {
      key,
      message,
      variant,
    },
  });
};

export const removeAlert = key => dispatch => {
  dispatch({
    type: REMOVE_ALERT,
    payload: {
      key,
    },
  });
};
