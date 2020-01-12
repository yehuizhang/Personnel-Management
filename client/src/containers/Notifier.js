import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { removeAlert } from '../redux/actions/notifier';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Notifier = ({ alerts, removeAlert }) => {
  const displayed = [];
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const cleanup = key => {
    removeAlert(key);
    const index = displayed.indexOf(key);
    if (index > -1) {
      displayed.splice(index, 1);
    }
  };

  useEffect(() => {
    alerts.forEach(alert => {
      if (displayed.includes(alert.key)) {
        return;
      }
      const { key, message, variant } = alert;
      displayed.push(key);
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
          cleanup(key);
        },
      });
    });
  }, [alerts]);

  return null;
};

const mapStateToProps = state => ({
  alerts: state.notifier,
});
export default connect(mapStateToProps, { removeAlert })(Notifier);
