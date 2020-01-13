import { LOAD_OFFICER } from '../types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_OFFICER:
      return payload;
    default:
      return state;
  }
}
