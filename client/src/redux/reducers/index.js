import { combineReducers } from 'redux';

import feedback from './feedback';
import notifier from './notifier';
import user from './user';
import userList from './userList';

export default combineReducers({
  feedback,
  notifier,
  user,
  userList,
});
