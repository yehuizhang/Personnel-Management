import React from 'react';

import { makeStyles, Grid, Typography, Button } from '@material-ui/core';

import { rankMap } from '../../util/staticData';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: '100%',
    maxWidth: theme.spacing(35),
  },
}));

const Avatar = ({ user, handleFormChange }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
      item
      xs={12}
      md={6}
    >
      <Grid item xs={12}>
        <Typography component="h6" variant="h6" align="center">
          Avatar
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <img
          src={user.avatar || rankMap.get(user.rank)}
          alt="avatar"
          className={classes.avatar}
        />
      </Grid>
      <Grid item xs={12} align="center">
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
