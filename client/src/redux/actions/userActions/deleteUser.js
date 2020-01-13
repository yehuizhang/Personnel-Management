import axios from 'axios';

import { setAlert } from '../notifier';
import { reloadUserList } from '../userList';

const deleteUser = id => async dispatch => {
  try {
    await axios.delete(`/api/user/${id}`);
    setAlert('User deleted', 'success')(dispatch);
    reloadUserList()(dispatch);
  } catch (error) {
    console.error(error);
    setAlert('User deletion failed')(dispatch);
  }
};

export default deleteUser;
