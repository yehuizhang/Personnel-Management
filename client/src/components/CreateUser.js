import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
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

const ranks = [
  ['Private', 'https://i.ibb.co/wSjWFhy/rank-0.jpg'],
  ['Specialist', 'https://i.ibb.co/8rNRX7h/rank-1.jpg'],
  ['Corporal', 'https://i.ibb.co/GW18ZW2/rank-2.jpg'],
  ['Sergeant', 'https://i.ibb.co/fFS560p/rank-3.jpg'],
  ['Warrant Officer', 'https://i.ibb.co/pdDhmp1/rank-4.jpg'],
  ['Lieutenant', 'https://i.ibb.co/p1PWjD4/rank-5.jpg'],
  ['Captain', 'https://i.ibb.co/PGZXVXm/rank-6.jpg'],
  ['Major', 'https://i.ibb.co/xqgzDHG/rank-7.jpg'],
  ['Colonel', 'https://i.ibb.co/LdbrgQW/rank-8.jpg'],
  ['General', 'https://i.ibb.co/xqnKFnm/rank-9.jpg'],
];

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
  // serverError: {
  //   color: 'red',
  // },
}));

const CreateUser = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    avatar: ranks[0][1],
    name: '',
    rank: 0,
    sex: '',
    startDate: '',
    phone: '',
    email: '',
    superior: '',
  });

  const handleFormChange = e => {
    switch (e.target.name) {
      case 'rank':
        if (formData.avatar === ranks[formData.rank][1]) {
          const newRank = Number(e.target.value);
          setFormData({
            ...formData,
            avatar: ranks[newRank][1],
            rank: newRank,
          });
        } else {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        }
        break;
      case 'avatar':
        console.log(e.target.files);
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
    console.log(formData);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create New Soldier
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid item xs={12}>
                <img src={formData.avatar} alt="user avatar" />
              </Grid>
              <Grid item xs={12}>
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
                  autoFocus
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel>Rank</InputLabel>
                  <Select
                    name="rank"
                    value={formData.rank}
                    onChange={handleFormChange}
                  >
                    {ranks.map((rank, i) => (
                      <MenuItem value={i} key={i}>
                        {rank[0]} ({i})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Sex</FormLabel>
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
                  onChange={handleFormChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              // disabled={!noEmptyField()}
              // fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add user
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default CreateUser;
