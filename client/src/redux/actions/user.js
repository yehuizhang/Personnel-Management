import { RESET_CURRENT_USER } from '../types';
import base64Img from 'base64-img';

export const filterUserData = async formData => {
  const user = { ...formData };

  if (!user.avatar) {
    delete user.avatar;
  }

  if (user.avatarFile) {
    user.avatar = await convertImgToBinary(user.avatarFile);
  }
  if (!user.startDate) {
    delete user.startDate;
  }
  if (!user.phone) {
    delete user.phone;
  } else if (user.phone.length === 10) {
    user.phone = `${user.phone.substring(0, 3)}-${user.phone.substring(
      3,
      6
    )}-${user.phone.substring(6)}`;
  }
  if (!user.email) {
    delete user.email;
  }
  delete user.dsList;
  if (user.superior) {
    user.superior = user.superior.id;
  } else {
    delete user.superior;
  }
  delete user.avatarFile;
  delete user.minRank;
  return user;
};

export const resetCurrentUser = () => dispatch => {
  dispatch({
    type: RESET_CURRENT_USER,
  });
};

const convertImgToBinary = async file => {
  const fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = () => {
      fileReader.abort();
      reject('Converting image to binary failed.');
    };
    fileReader.readAsDataURL(file);
  });
};
