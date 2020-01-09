import axios from 'axios';

export const addUser = async (
  { name, sex, rank, avatar, avatarFile, startDate, phone, email, superior },
  setAlert,
  unsetLoading,
  history
) => {
  const user = { name, sex, rank };

  if (avatar) {
    user.avatar = avatarFile;
  }
  if (startDate) {
    user.startDate = startDate;
  }
  if (phone) {
    user.phone =
      phone.length === 10
        ? `${phone.substring(0, 3)}-${phone.substring(3, 6)}-${phone.substring(
            6
          )}`
        : phone;
  }
  if (email) {
    user.email = email;
  }
  if (superior) {
    user.superior = superior._id;
  }

  try {
    const body = JSON.stringify(user);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.post('/api/user', body, config);
    unsetLoading();
    setAlert('User successfully added!', 'success');
    history.push('/');
  } catch (error) {
    unsetLoading();
    setAlert('Adding user failed.');
    console.error(error.response.data);
  }
};
