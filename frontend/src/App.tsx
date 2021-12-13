import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { SnackbarProvider } from './contexts/snackbarContext';
import MainApp from './components/MainApp';
import SnackBar from './components/automic/Snackbar';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Router>
        <div className="App">
          <SnackbarProvider>
            <SnackBar />
            <MainApp />
          </SnackbarProvider>
        </div>
      </Router>
    </StyledEngineProvider>
  );
}

export default App;
