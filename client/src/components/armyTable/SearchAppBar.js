import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function SearchAppBar({
  handleSearchText,
  handleReset,
  handleCreateNewSoldier,
}) {
  const classes = useStyles();
  const [searchText, setSearchText] = useState({ text: '' });

  const handleSearchTextChange = e => {
    const text = e.target.value;
    setSearchText(prev => {
      if (prev.timeout) {
        clearTimeout(prev.timeout);
      }
      return {
        text: text,
        timeout: setTimeout(() => {
          handleSearchText(text);
        }, 1000),
      };
    });
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={searchText.text}
              onChange={handleSearchTextChange}
            />
          </div>
          <div className={classes.grow} />
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleCreateNewSoldier}
          >
            New Soldier
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
