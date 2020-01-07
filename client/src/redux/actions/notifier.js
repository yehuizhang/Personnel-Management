import { SET_NOTIFIER, UNSET_NOTIFIER } from '../types';
import uuid from 'uuid/v4';

export const setNotifier = (variant = 'error', message) => dispatch => {
  const key = uuid();
  dispatch({
    type: SET_NOTIFIER,
    payload: {
      key,
      variant,
      message,
    },
  });
};

export const unsetNotifier = key => dispatch => {
  dispatch({
    type: UNSET_NOTIFIER,
    payload: {
      key,
    },
  });
};
