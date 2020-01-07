import { SET_LOADING, UNSET_LOADING } from '../types';

export const setLoading = () => dispatch => {
  dispatch({
    type: SET_LOADING,
  });
};

export const unsetLoading = () => dispatch => {
  dispatch({
    type: UNSET_LOADING,
  });
};
