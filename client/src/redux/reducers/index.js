import { combineReducers } from 'redux';

import feedback from './feedback';
import notifier from './notifier';

export default combineReducers({ feedback, notifier });
