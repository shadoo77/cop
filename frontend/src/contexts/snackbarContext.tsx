import { AlertColor } from '@mui/material';
import React, { createContext, useState } from 'react';

interface IState {
  successSnackbarOpen: boolean;
  successSnackbarMessage: string;
  errorSnackbarOpen: boolean;
  infoSnackbarOpen: boolean;
  severity: AlertColor | undefined;
}

interface ISnackbarContext extends IState {
  showSnackbar: (message: string, severity: AlertColor | undefined) => void;
  clearSnackbar: () => void;
}

const initialState = {
  successSnackbarOpen: false,
  successSnackbarMessage: '',
  errorSnackbarOpen: false,
  infoSnackbarOpen: false,
  severity: undefined
};

const SnackbarContext = createContext<ISnackbarContext | undefined>(undefined);

export function SnackbarProvider(props: any) {
  const [state, setState] = useState<IState>(initialState);

  const showSnackbar = (successSnackbarMessage: string, severity: AlertColor | undefined) => {
    setState((prevState: IState) => ({
      ...prevState,
      successSnackbarOpen: true,
      successSnackbarMessage,
      severity
    }));
  };

  const clearSnackbar = () => {
    setState((prevState: IState) => ({
      ...prevState,
      successSnackbarOpen: false,
      errorSnackbarOpen: false,
      infoSnackbarOpen: false
    }));
  };

  return (
    <SnackbarContext.Provider
      value={{
        ...state,
        showSnackbar,
        clearSnackbar
      }}
    >
      {props.children}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = React.useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
}
