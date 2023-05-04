import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import MainContainer from '../pages/MainContainer';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const IsAuthContainer = () => {
  const navigate = useNavigate();

  const { isLoading } = useAuth0();

  if (window.location.pathname === '/') {
    navigate('/today', { replace: true });
    return null;
  }

  return (
    <>
      {isLoading ? (
        <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <Box>
            <CircularProgress />
          </Box>
        </Stack>
      ) : (
        <MainContainer />
      )}
    </>
  );
};

export default IsAuthContainer;
