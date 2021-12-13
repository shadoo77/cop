import * as React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

export default function ButtonAppBar() {
  const history = useHistory();

  return (
    <div className="app-bar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            <Button
              color="inherit"
              onClick={() => history.push('/')}
            >
              Home
            </Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Eurofiber - Opdracht
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
