import React from 'react';
import uuid from 'uuid/v4';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default (closeSnackbar, variant = 'error') => {
  const key = uuid();
  return {
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
  };
};
