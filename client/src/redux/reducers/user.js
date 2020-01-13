import { LOAD_USER_SUCCESS, RESET_CURRENT_USER } from '../types';

const initialState = {
  isNew: true,
  userData: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER_SUCCESS:
      return {
        isNew: false,
        userData: payload,
      };
    case RESET_CURRENT_USER:
      return initialState;
    default:
      return state;
  }
}
