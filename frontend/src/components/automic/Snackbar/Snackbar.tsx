import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useSnackbar } from '../../../contexts/snackbarContext';

function SnackBar() {
  const { clearSnackbar, successSnackbarMessage, successSnackbarOpen, severity } = useSnackbar();

  return (
    <div className="snackbar">
      <Snackbar open={successSnackbarOpen} autoHideDuration={2000} onClose={() => clearSnackbar()}>
        <Alert
          onClose={() => clearSnackbar()}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {successSnackbarMessage}
        </Alert>
      </Snackbar>

    </div>
  );
}

export default SnackBar;
