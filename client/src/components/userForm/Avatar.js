import React from 'react';

import { makeStyles, Grid, Typography, Button } from '@material-ui/core';

import { rankMap } from '../../util/staticData';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: '100%',
    maxWidth: theme.spacing(35),
  },
  uploadImage: {
    display: 'none',
  },
}));

const Avatar = ({ user, handleFormChange }) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      direction="column"
      justify="space-around"
      alignItems="center"
      xs={12}
      md={6}
    >
      <Grid item align="center">
        <Typography component="h6" variant="h6" align="center">
          Avatar
        </Typography>
      </Grid>
      <Grid item align="center">
        <img
          src={user.avatar || rankMap.get(user.rank)}
          alt="avatar"
          className={classes.avatar}
        />
      </Grid>
      <Grid item align="center">
        <input
          type="file"
          accept="image/*"
          name="avatarFile"
          id="contained-button-file"
          className={classes.uploadImage}
          onChange={handleFormChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Replace Avatar
          </Button>
        </label>
      </Grid>
    </Grid>
  );
};

export default Avatar;
