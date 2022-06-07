import React from 'react';
import 'firebase/auth';

import { Grid, Box } from '@mui/material';

import SignInForm from './SignInForm';

const SignInScreen: React.FC = () => {
  return (
    <>
      <Box
        height="100vh"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container spacing={1} sm={9}>
          <Grid item sm={6} style={{ height: '100vh' }}>
            <div
              style={{
                backgroundImage: 'url(./LoginImage.png)',
                backgroundSize: 'contain',
                width: '100%',
                height: '100%',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </Grid>
          <Grid
            item
            sm={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <SignInForm />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignInScreen;
