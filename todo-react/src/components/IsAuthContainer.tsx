import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import MainContainer from '../pages/MainContainer';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';

const IsAuthContainer = () => {
  const { isLoading } = useAuth0();
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
