import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Avatar from './Avatar';
import UserInfo from './UserInfo';

import { setAlert } from '../../redux/actions/notifier';
import addUser from '../../redux/actions/userActions/addUser';
import updateUser from '../../redux/actions/userActions/editUser';

import formValidator from '../../util/formValidator';

import {
  makeStyles,
  Container,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserForm = ({
  history,
  isNewUser,
  userData,
  officers,
  setAlert,
  addUser,
  updateUser,
}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    avatar: userData.avatar || null,
    avatarFile: null,
    name: userData.name || '',
    rank: userData.rank || 'Private',
    minRank: userData.minRank || 0,
    sex: userData.sex || '',
    startDate: userData.startDate || '',
    phone: userData.phone || '',
    email: userData.email || '',
    superior: userData.superior || '',
  });

  useEffect(() => {
    if (userData.superior && officers) {
      userData.superior = officers.filter(
        officer => officer.id === userData.superior.id
      )[0];
    }
    setFormData({ ...formData, ...userData });
  }, [userData, officers]);

  const handleCancelClick = () => {
    history.push('/');
  };

  const handleFormChange = e => {
    switch (e.target.name) {
      case 'avatarFile':
        if (!e.target) {
          return;
        }
        const file = e.target.files[0];
        if (file.size > 1 << 21) {
          setAlert('Sorry, your image exceeds the allowed maximum size(2 MB)');
          return;
        }
        setFormData({
          ...formData,
          avatar: URL.createObjectURL(file),
          avatarFile: file,
        });
        break;
      default:
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formValidator(formData, setAlert)) {
      if (isNewUser) {
        addUser(formData, history);
      } else {
        updateUser(formData, history);
      }
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {isNewUser ? 'Create New Soldier' : 'Edit User'}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2} justify="center">
            <Avatar user={formData} handleFormChange={handleFormChange} />
            <UserInfo
              user={formData}
              handleFormChange={handleFormChange}
              officers={officers}
            />
            <Grid
              item
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={4}
            >
              <Grid item>
                <Button
                  variant="contained"
                  onClick={handleCancelClick}
                  className={classes.submit}
                >
                  Return
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  disabled={!formData.name || !formData.sex}
                  // fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {isNewUser ? 'Add user' : 'Update user'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = state => ({
  isNewUser: state.user.isNew,
  userData: state.user.userData,
  officers: state.officers,
});

export default connect(mapStateToProps, {
  setAlert,
  addUser,
  updateUser,
})(UserForm);
