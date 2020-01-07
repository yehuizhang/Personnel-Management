export const addUser = ({
  name,
  sex,
  rank,
  avatar,
  avatarFile,
  startDate,
  phone,
  email,
  superior,
}) => {
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
    user.superior = superior.id;
  }

  console.log(user);
};
