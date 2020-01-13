import { combineReducers } from 'redux';

import feedback from './feedback';
import notifier from './notifier';
import user from './user';
import userList from './userList';
import officers from './officers';

export default combineReducers({
  feedback,
  notifier,
  user,
  userList,
  officers,
});
