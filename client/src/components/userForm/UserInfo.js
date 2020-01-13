import React from 'react';
import { numberToRank, rankToNumber } from '../../util/staticData';

import {
  makeStyles,
  Typography,
  Grid,
  TextField,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const UserInfo = ({ handleFormChange, user, officers }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Full name"
          name="name"
          value={user.name}
          autoFocus
          onChange={handleFormChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" required>
            Sex
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  name="sex"
                  checked={user.sex === 'Male'}
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
                  checked={user.sex === 'Female'}
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
          <Select name="rank" value={user.rank} onChange={handleFormChange}>
            {numberToRank.map(
              (rank, i) =>
                i >= user.minRank &&
                (user.superior ? (
                  i < rankToNumber[user.superior.rank] && (
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
            value={user.superior}
            onChange={handleFormChange}
          >
            <MenuItem value={''}>None</MenuItem>
            {officers.map(
              officer =>
                rankToNumber[officer.rank] > rankToNumber[user.rank] && (
                  <MenuItem value={officer} key={officer.id}>
                    {officer.name} ({rankToNumber[officer.rank]})
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
          value={user.startDate}
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
          value={user.phone}
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
          value={user.email}
          onChange={handleFormChange}
        />
      </Grid>
      {user.dsList && user.dsList.length > 0 && (
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Direct Subordinates
          </Typography>
          <List>
            {user.dsList.map(ds => (
              <ListItem>
                <ListItemIcon>
                  <FaceIcon />
                </ListItemIcon>
                <ListItemText primary={ds.name} secondary={ds.rank} />
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
    </Grid>
  );
};

export default UserInfo;
