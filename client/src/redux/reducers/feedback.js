import { SET_LOADING, UNSET_LOADING } from '../types';

const initialState = {
  isLoading: false,
  errors: [],
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case UNSET_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
