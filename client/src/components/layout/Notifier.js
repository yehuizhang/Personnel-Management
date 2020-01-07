import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { unsetNotifier } from '../../redux/actions/notifier';

const Notifier = ({ notifications, unsetNotifier }) => {
  const [displayed, setDisplayed] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    notifications.forEach(({ key, variant, message }) => {
      if (!displayed.includes(key)) {
        console.log('called', key);
        enqueueSnackbar(message, {
          key,
          variant,
          action: key => (
            <IconButton
              size="small"
              aria-label="close"
              onClick={() => {
                closeSnackbar(key);
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          ),
          onExited: (event, key) => {
            unsetNotifier(key);
            setDisplayed(displayed.filter(id => id !== key));
          },
        });
        setDisplayed([...displayed, key]);
      }
    });
  });
  return null;
};

const mapStateToProps = state => ({
  notifications: state.feedback.notifications,
});

export default connect(mapStateToProps, { unsetNotifier })(Notifier);
