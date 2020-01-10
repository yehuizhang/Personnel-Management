import { LOAD_MORE_USER, USERLIST_ERROR } from '../types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_MORE_USER:
      return [...state, ...payload];
    default:
      return state;
  }
}
