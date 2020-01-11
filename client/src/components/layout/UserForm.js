import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { setAlert } from '../../redux/actions/notifier';
import { setLoading, unsetLoading } from '../../redux/actions/spinner';
import { addUser, updateUser } from '../../redux/actions/user';

import { rankMap, rankLevels } from '../../util/staticData';
import formValidator from '../../util/formValidator';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormLabel } from '@material-ui/core';

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
  uploadImage: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    width: '100%',
    maxWidth: theme.spacing(35),
  },
}));

const UserForm = ({
  isNewUser,
  userData,
  history,
  officers,
  setAlert,
  setLoading,
  unsetLoading,
}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    avatar: userData.avatar || null,
    avatarFile: null,
    name: userData.name || '',
    rank: userData.rank || 'Private',
    sex: userData.sex || '',
    startDate: userData.startDate || '',
    phone: userData.phone || '',
    email: userData.email || '',
    superior: userData.superior || '',
  });

  useEffect(() => {
    const updatedData = { ...formData, ...userData };
    if (updatedData.superior) {
      updatedData.superior = officers.filter(
        officer => officer._id === updatedData.superior._id
      )[0];
    }
    setFormData(updatedData);
  }, [userData]);

  const handleFormChange = e => {
    switch (e.target.name) {
      case 'avatar':
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
      setLoading();
      if (isNewUser) {
        addUser(formData, setAlert, unsetLoading, history);
      } else {
        updateUser(formData, setAlert, unsetLoading, history);
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
            <Grid container item xs={12} md={6}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h6" align="center">
                  Avatar
                </Typography>
              </Grid>
              <Grid item xs={12} align="center">
                <img
                  src={formData.avatar || rankMap.get(formData.rank)[1]}
                  alt="avatar"
                  className={classes.avatar}
                />
              </Grid>
              <Grid item xs={12} align="center">
                <input
                  type="file"
                  accept="image/*"
                  name="avatar"
                  id="contained-button-file"
                  multiple
                  className={classes.uploadImage}
                  onChange={handleFormChange}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload your own
                  </Button>
                </label>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Full name"
                  name="name"
                  value={formData.name}
                  autoFocus
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend" required>
                    Sex
                  </FormLabel>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="sex"
                          checked={formData.sex === 'Male'}
                          onChange={handleFormChange}
                          value="Male"
                          color="primary"
                        />
                      }
                      label="Male"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="sex"
                          checked={formData.sex === 'Female'}
                          onChange={handleFormChange}
                          value="Female"
                          color="primary"
                        />
                      }
                      label="Female"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl} required>
                  <InputLabel>Rank</InputLabel>
                  <Select
                    name="rank"
                    value={formData.rank}
                    onChange={handleFormChange}
                  >
                    {rankLevels.map(
                      (rank, i) =>
                        i >= userData.minRank &&
                        (formData.superior ? (
                          i < formData.superior.rank && (
                            <MenuItem value={rank} key={rank}>
                              {rank} ({i})
                            </MenuItem>
                          )
                        ) : (
                          <MenuItem value={rank} key={rank}>
                            {rank} ({i})
                          </MenuItem>
                        ))
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel>Superior</InputLabel>
                  <Select
                    name="superior"
                    value={formData.superior}
                    onChange={handleFormChange}
                  >
                    <MenuItem value={''}>None</MenuItem>
                    {officers.map(
                      officer =>
                        officer.rank > rankMap.get(formData.rank)[0] && (
                          <MenuItem value={officer} key={officer._id}>
                            {officer.name} ({rankLevels[officer.rank]})
                          </MenuItem>
                        )
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="startDate"
                  label="Start Date"
                  type="date"
                  value={formData.startDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Office phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </Grid>
            </Grid>
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

export default connect(mapStateToProps, { setAlert, setLoading, unsetLoading })(
  UserForm
);
