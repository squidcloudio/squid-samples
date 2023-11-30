import * as React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import LoginButton from './login-button';
import LogoutButton from './logout-button';

interface AuthProps {
  isAuthenticated: Boolean;
}

const NavBar: React.FC<AuthProps> = ({ isAuthenticated }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Invoices
          </Typography>
          {!isAuthenticated && <LoginButton />}
          {isAuthenticated && <LogoutButton />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
