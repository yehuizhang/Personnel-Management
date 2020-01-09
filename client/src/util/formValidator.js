const nameReg = /^[a-z\s]{1,20}$/i;
const phoneReg = /^([0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4})$/;
const emailReg = /[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
export default ({ name, phone, email }, setAlert) => {
  let isValid = true;
  if (!nameReg.test(name)) {
    isValid = false;
    setAlert(
      'Your name should contain only alphabetic characters and spaces with length less than 20.'
    );
  }

  if (phone.length > 0 && !phoneReg.test(phone)) {
    isValid = false;
    setAlert('Phone number should be either xxx-xxx-xxxx or purely 10 digits.');
  }

  if (email.length > 0 && !emailReg.test(email)) {
    isValid = false;
    setAlert('Email address is invalid.');
  }

  return isValid;
};
