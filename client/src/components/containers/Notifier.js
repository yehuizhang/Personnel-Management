import React from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Notifier = ({ alerts }) => {
  const displayed = [];
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const removeKey = key => {
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
          removeKey(key);
        },
      });
    });
    console.log(displayed);
  }, [alerts]);

  return null;
};

const mapStateToProps = state => ({
  alerts: state.notifier,
});
export default connect(mapStateToProps)(Notifier);
