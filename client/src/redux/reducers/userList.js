import { combineReducers } from 'redux';
import {
  USERLIST_INITIAL_LOAD,
  USERLIST_MORE_LOAD,
  USERLIST_UPDATE_PARAMS,
} from '../types';

// full params = {sortBy, sortDirection, search, users} and page stored in data.
const params = function(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case USERLIST_UPDATE_PARAMS:
      return payload;
    default:
      return state;
  }
};

const initialData = {
  users: [],
  page: 1,
  totalPages: 1,
};

const data = function(state = initialData, action) {
  const { type, payload } = action;
  switch (type) {
    case USERLIST_INITIAL_LOAD:
      return payload;
    case USERLIST_MORE_LOAD:
      return {
        ...state,
        users: [...state.users, ...payload.users],
        page: Math.max(state.page, payload.page),
      };
    default:
      return state;
  }
};

export default combineReducers({ params, data });
