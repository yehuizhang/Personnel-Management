import {
  SET_LOADING,
  UNSET_LOADING,
  SET_NOTIFIER,
  UNSET_NOTIFIER,
} from '../types';

const initialState = {
  isLoading: false,
  notifications: [],
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
    case SET_NOTIFIER:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...payload,
          },
        ],
      };
    case UNSET_NOTIFIER:
      const { key } = payload;
      return {
        ...state,
        notifications: state.notifications.filter(n => n.key !== key),
      };
    default:
      return state;
  }
}
