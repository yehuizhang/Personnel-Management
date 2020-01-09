import { combineReducers } from 'redux';

import feedback from './feedback';
import notifier from './notifier';
import officers from './officers';

export default combineReducers({ feedback, notifier, officers });
