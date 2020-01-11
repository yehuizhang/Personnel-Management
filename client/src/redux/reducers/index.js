import { combineReducers } from 'redux';

import feedback from './feedback';
import notifier from './notifier';
import officers from './officers';
import user from './user';
import userList from './userList';

export default combineReducers({
  feedback,
  notifier,
  officers,
  user,
  userList,
});
