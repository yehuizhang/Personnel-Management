import { LOAD_MORE_USER, USERLIST_ERROR } from '../types';

const initialState = {
  userList: [],
  searchParams: {
    keyword: '',
    sortBy: '',
    direction: '',
  },
  totalPages: 1,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_MORE_USER:
      return {
        ...state,
        userList: [...state.userList, ...payload.users],
        totalPages: payload.totalPages,
      };
    default:
      return state;
  }
}
