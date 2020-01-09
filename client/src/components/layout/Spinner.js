import React from 'react';
import { connect } from 'react-redux';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ColorCircularProgress = withStyles({
  root: {
    color: '#fb8c00',
  },
})(CircularProgress);

const Spinner = ({ isLoading }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <ColorCircularProgress size={90} />
    </Backdrop>
  );
};

const mapStateToProps = state => ({
  isLoading: state.feedback.isLoading,
});

export default connect(mapStateToProps)(Spinner);
