import { combineReducers } from 'redux';
import {
  USERLIST_UPDATE_PARAMS,
  USERLIST_LOAD,
  USERLIST_RELOAD,
} from '../types';

// full params = {sortBy, sortDirection, search, users} and page stored in data.
const initialState = {
  params: {},
  data: {
    users: [],
    page: 1,
    totalPages: 1,
    totalDocs: 0,
  },
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USERLIST_LOAD:
      const { users, page } = state.data;
      if (page === payload.page) return state;
      return {
        ...state,
        data: {
          users: [...users, ...payload.users],
          page: Math.max(page, payload.page),
          totalPages: payload.totalPages,
          totalDocs: payload.totalDocs,
        },
      };
    case USERLIST_RELOAD:
      return {
        ...state,
        data: initialState.data,
      };
    case USERLIST_UPDATE_PARAMS:
      return {
        params: payload,
        data: initialState.data,
      };
    default:
      return state;
  }
}
